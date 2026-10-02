'use strict';
/* Twin Pets: the photo booth. The camera in the middle takes a picture of the game
   (not the tablet's camera) and puts it in the memory book. */

ICONS.camera = '<svg viewBox="0 0 100 100"><rect x="8" y="28" width="84" height="58" rx="12" fill="#8b7fd1" stroke="#6a5fb0" stroke-width="4"/><path d="M34 28 L40 16 H60 L66 28" fill="#8b7fd1" stroke="#6a5fb0" stroke-width="4" stroke-linejoin="round"/><circle cx="50" cy="57" r="19" fill="#fff" stroke="#6a5fb0" stroke-width="4"/><circle cx="50" cy="57" r="10" fill="#7fc4ff"/><circle cx="46" cy="53" r="3.5" fill="#fff"/><circle cx="78" cy="40" r="4" fill="#ffd23f"/></svg>';
const MAX_PHOTOS = 24;

/* ---------- taking a picture: 3, 2, 1, smile! ---------- */
let snapping = false;
async function snapPhoto() {
  if (snapping || scene !== 'play') return;
  snapping = true;
  closeAllPanels();
  setScene('photo');
  // both pets come together and smile
  SIDES.forEach(s => { const p = pets[s]; begin(p, 5000); if (p.asleep) wakePet(s, true); p.root.querySelectorAll('.say').forEach(b => b.remove()); });
  const to = S.room === 'kitchen' || S.room === 'bathroom' ? HOME : CUDDLE;
  await Promise.all(SIDES.map(s => movePet(s, to[s].x, to[s].y, 600)));
  const count = el('div', 'countdown');
  stage.append(count);
  for (const n of [3, 2, 1]) {
    count.textContent = n;
    animate(count, [{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1.15)', opacity: 1, offset: 0.4 }, { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }], { duration: 650, fill: 'both' });
    Sound.play('tick');
    await wait(800);
  }
  count.remove();
  SIDES.forEach(s => mood(pets[s], 'happy', 2500));
  pets.left.lean.style.transform = 'rotate(5deg)';
  pets.right.lean.style.transform = 'rotate(-5deg)';
  await wait(250);
  // click!
  Sound.play('shutter');
  const flash = el('div', 'flash');
  stage.append(flash);
  animate(flash, [{ opacity: 0.95 }, { opacity: 0 }], { duration: 600, easing: 'ease-out', fill: 'forwards' }).then(() => flash.remove());
  const shot = takeShot();
  S.photos.push(shot);
  while (S.photos.length > MAX_PHOTOS) S.photos.shift();
  logDay('photo');
  save();
  await wait(400);
  // the picture flies into the memory book
  const card = el('div', 'photo flying');
  card.append(photoView(shot, 0.5));
  stage.append(card);
  await animate(card, [{ transform: 'translate(-50%,-50%) scale(1) rotate(0)', opacity: 1 }, { transform: 'translate(-50%,-50%) scale(1.05) rotate(-4deg)', opacity: 1, offset: 0.35 },
    { transform: 'translate(-50%,-160%) scale(.15) rotate(10deg)', opacity: 0 }], { duration: 1500, easing: 'ease-in', fill: 'forwards' });
  card.remove();
  SIDES.forEach(s => { pets[s].lean.style.transform = ''; });
  await Promise.all(SIDES.map(s => movePet(s, HOME[s].x, HOME[s].y, 600)));
  SIDES.forEach(s => { pets[s].busyUntil = 0; });
  snapping = false;
  endScene();
}
/* What's in the picture: the room and how both pets look right now. */
function takeShot() {
  const pet = s => {
    const p = pets[s], copy = p.root.cloneNode(true);
    copy.querySelectorAll('.say, .thought, .tag, .zzz').forEach(e => e.remove());
    const cls = ['happy', 'fluffy', 'sparkly', 'asleep', 'wag'].filter(c => p.root.classList.contains(c)).join(' ');
    return { x: p.x, y: p.y, cls, html: copy.innerHTML };
  };
  return { day: todayKey(), at: Date.now(), room: S.room, left: pet('left'), right: pet('right') };
}
/* A small copy of the whole screen, drawn from the saved picture. */
function photoView(shot, k = 0.3) {
  const box = el('div', 'shot');
  const inner = el('div', 'shot-in');
  Object.assign(box.style, { width: W() * k + 'px', height: H() * k + 'px' });
  Object.assign(inner.style, { width: W() + 'px', height: H() + 'px', transform: `scale(${k})` });
  const markup = roomMarkup(shot.room).replace(/ id="[^"]*"/g, '');
  inner.append(el('div', 'room room-' + shot.room + ' on', markup));
  SIDES.forEach(s => {
    const d = shot[s];
    const p = el('div', 'pet side-' + s + ' ' + d.cls, d.html);
    p.style.left = d.x + '%'; p.style.bottom = d.y + '%';
    inner.append(p);
  });
  box.append(inner);
  return box;
}

/* ---------- photos in the memory book ---------- */
const photosOn = day => S.photos.filter(p => p.day === day);
BOOK_PAGE_HOOKS.push((box, day) => {
  const list = photosOn(day);
  if (!list.length) return;
  let i = list.length - 1;
  const frame = el('div', 'photo');
  const show = () => {
    frame.innerHTML = '';
    frame.append(photoView(list[i], Math.min(0.31, (box.clientWidth * 0.43) / W())));
    if (list.length > 1) frame.append(el('div', 'pdots', list.map((_, n) => `<i class="${n === i ? 'on' : ''}"></i>`).join('')));
  };
  show();
  box.querySelector('.book-pets').replaceWith(frame);
  onPress(frame, () => { i = (i + 1) % list.length; Sound.play('page'); show(); });   // tap for the next picture
});
BOOK_LINES.photo = { line: 'took a picture together.', icon: 'camera', rank: 10 };
CENTER_BUTTONS.push({ key: 'camera', icon: 'camera', show: () => has('camera'), tap: snapPhoto });
NEW_THINGS.push({ key: 'camera', order: 8, acts: ['camera'], icon: 'camera', word: 'camera' });

Sound.add('tick', s => { s.tone(s.NOTE(79), 0, 0.12, { vol: 0.07 }); });
Sound.add('shutter', s => { s.noise(0, 0.06, { filter: 'highpass', freq: 3000, vol: 0.09 }); s.noise(0.09, 0.08, { filter: 'highpass', freq: 2500, vol: 0.07 }); s.tone(s.NOTE(91), 0.15, 0.5, { vol: 0.05, echo: 1 }); });
