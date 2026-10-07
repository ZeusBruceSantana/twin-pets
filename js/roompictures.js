'use strict';
/* Twin Pets: pictures of the outdoor rooms (the front yard and the backyard).
   A drawing or photo replaces the built-in scenery. Grown-ups can change them from the
   tablet itself (grown-up corner -> Pictures). Pictures chosen there stay on the tablet
   and are kept in backups. The picture that comes with the game is set in ROOM_ART
   (js/settings.js). */

ICONS.frame = '<svg viewBox="0 0 100 100"><rect x="10" y="14" width="80" height="68" rx="8" fill="#fff4dd" stroke="#c99a6b" stroke-width="6"/><rect x="20" y="24" width="60" height="48" rx="3" fill="#bfe9fb"/><circle cx="64" cy="38" r="7" fill="#ffd23f"/><path d="M20 72 L40 46 L54 62 L62 54 L80 72Z" fill="#8fd16a"/></svg>';

const PICTURE_ROOMS = Object.keys(ROOM_ART);
const ROOM_PIC = {};            // room -> the picture showing now (a file name or a saved picture), or null
const picToken = {};

/* ---------- showing a room's picture ---------- */
function pictureSources(room) {
  const mine = S.roomPictures && S.roomPictures[room];
  return [mine && mine.img, ROOM_ART[room]].filter(Boolean);       // a picture from the tablet first, then the one that comes with the game
}
function tryPicture(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}
async function applyRoomPicture(room) {
  const box = document.querySelector(`#rooms .room-${room}`);
  if (!box) return;
  const token = picToken[room] = (picToken[room] || 0) + 1;
  let shown = null;
  for (const src of pictureSources(room)) {
    const img = await tryPicture(src);
    if (token !== picToken[room]) return;                          // a newer choice came along
    if (img) { shown = img; img.dataset.src = src; break; }
  }
  box.querySelectorAll('.room-picture').forEach(e => e.remove());
  box.classList.toggle('has-picture', !!shown);
  ROOM_PIC[room] = shown ? shown.dataset.src : null;
  if (shown) {
    shown.className = 'room-picture';
    shown.alt = ''; shown.draggable = false;
    box.prepend(shown);
  }
}
const applyRoomPictures = () => Promise.all(PICTURE_ROOMS.map(applyRoomPicture));
DRESS_HOOKS.push(side => { if (side === 'left') applyRoomPictures(); });
// a little picture of the room, for the house map
function roomIconHtml(room) {
  return ROOM_PIC[room] ? `<img class="room-thumb" src="${ROOM_PIC[room]}" alt="" draggable="false">` : ICONS[ROOMS[room].icon];
}

/* ---------- choosing a picture on the tablet ---------- */
// Any picture the browser can open, shrunk so it saves small and loads fast.
async function pictureFromFile(file) {
  if (!file || !(/^image\//.test(file.type) || /\.(jpe?g|png|webp|gif|heic|heif|avif|bmp)$/i.test(file.name || ''))) throw new Error('not a picture');
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error('cannot open'));
      i.src = url;
    });
    const w = img.naturalWidth, h = img.naturalHeight;
    if (!w || !h) throw new Error('empty');
    const k = Math.min(1, 1400 / Math.max(w, h));
    const c = document.createElement('canvas');
    c.width = Math.round(w * k); c.height = Math.round(h * k);
    const g = c.getContext('2d');
    g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height);
    g.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg', 0.75);
  } finally { URL.revokeObjectURL(url); }
}
/* Returns 'ok', 'bad' (not a picture) or 'full' (no room on this device). */
async function setRoomPicture(room, file) {
  let img;
  try { img = await pictureFromFile(file); } catch (e) { return 'bad'; }
  const before = S.roomPictures[room];
  S.roomPictures[room] = { img, at: Date.now() };
  if (!saveNow()) {
    if (before) S.roomPictures[room] = before; else delete S.roomPictures[room];
    saveNow();
    return 'full';
  }
  await applyRoomPicture(room);
  return 'ok';
}
function useOriginalPicture(room) {
  delete S.roomPictures[room];
  saveNow();
  return applyRoomPicture(room);
}

/* ---------- the grown-up corner page ---------- */
let pictureMsg = '';
function choosePicture(room) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';          // on the iPad this offers the photo library or the camera
  input.addEventListener('change', async () => {
    const file = input.files && input.files[0];
    if (!file) return;
    pictureMsg = 'Working on it...';
    renderParent();
    const result = await setRoomPicture(room, file);
    pictureMsg = result === 'ok' ? `The ${ROOMS[room].word} has a new picture.`
      : result === 'full' ? "There isn't enough room on this device for that picture. Try a smaller one."
      : "That file couldn't be opened as a picture.";
    renderParent();
  });
  input.click();
}
PARENT_PAGES.pictures = {
  order: 2, icon: 'frame', label: () => 'Pictures',
  render(panel) {
    const rows = PICTURE_ROOMS.map(room => {
      const mine = !!(S.roomPictures[room] && S.roomPictures[room].img);
      const thumb = ROOM_PIC[room] ? `<img src="${ROOM_PIC[room]}" alt="">` : ICONS[ROOMS[room].icon];
      const which = mine ? 'Your picture' : ROOM_PIC[room] ? 'The one that came with the game' : 'The built-in scenery';
      return `<div class="pic-row"><div class="pic-thumb">${thumb}</div>
        <div class="pic-info"><b>${ROOMS[room].word}</b><span>${which}</span></div>
        <div class="pbtn go" data-pick="${room}">Choose a photo</div>
        ${mine ? `<div class="pbtn" data-original="${room}">Use the original</div>` : ''}</div>`;
    }).join('');
    parentShell(panel, 'Room pictures', `<div class="pic-rows">${rows}</div>
      <div class="note big">${pictureMsg || '&nbsp;'}</div>
      <div class="note">Take a photo of a drawing, or pick one from the photo library. Wide pictures fit best.
        Pictures you choose stay on this tablet, and backups keep them.</div>`, () => { pictureMsg = ''; });
    bindP(panel, '[data-pick]', b => choosePicture(b.dataset.pick));
    bindP(panel, '[data-original]', async b => { await useOriginalPicture(b.dataset.original); pictureMsg = `The ${ROOMS[b.dataset.original].word} has its original picture again.`; renderParent(); });
  },
};
PARENT_CLOSE_HOOKS.push(() => { pictureMsg = ''; });
