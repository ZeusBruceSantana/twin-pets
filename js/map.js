'use strict';
/* Twin Pets: the house map. Both girls tap the same room to travel together. */

/* =====================================================================
   THE HOUSE MAP
   The house button in the shared middle opens a map of the house.
   Each room on the map has two halves: Livvie's face on the left half,
   Avery Peach's face on the right half. Both girls tap the same room
   (each on her own half) within a few seconds, and off they go.
   ===================================================================== */
// where each room sits on the map: [column, row, columns wide, rows tall]
const MAP_SPOTS = {
  frontyard: [1, 2, 1, 2],
  bedroom:   [2, 2, 1, 1],
  bathroom:  [3, 2, 1, 1],
  school:    [4, 2, 1, 1],
  playroom:  [2, 3, 1, 1],
  kitchen:   [3, 3, 2, 1],
  backyard:  [5, 2, 1, 2],
};
// a room is on the map once its "new thing" has appeared
const roomOpen = room => !!ROOMS[room] && (!ROOMS[room].feature || has(ROOMS[room].feature));

/* ---------- voting: both girls choose the same thing ---------- */
const votes = { left: null, right: null };
function castVote(side, key, container, onAgree) {
  const t = now(), o = votes[other(side)];
  votes[side] = { key, t };
  if (o && o.key === key && t - o.t < SETTINGS.doorWindowMs) {
    votes.left = votes.right = null;
    showVotes(container);
    onAgree(key);
    return;
  }
  Sound.play('knock');
  showVotes(container);
  setTimeout(() => showVotes(container), SETTINGS.doorWindowMs + 60);
}
/* The chosen tile glows; the sister's pet face blinks to invite her. */
function showVotes(container) {
  const t = now();
  container.querySelectorAll('.mtile[data-key]').forEach(d => SIDES.forEach(s => {
    const v = votes[s];
    d.classList.toggle('vote-' + s, !!(v && v.key === d.dataset.key && t - v.t < SETTINGS.doorWindowMs));
  }));
}
/* A tile with two halves, one for each girl. */
function voteTile(key, icon, word, color, onTap) {
  const d = el('div', 'mtile', `<div class="ico">${icon}</div><div class="lbl">${word}</div>
    <div class="half l"><div class="face"></div></div><div class="half r"><div class="face"></div></div>`);
  d.dataset.key = key;
  d.style.setProperty('--tile', color);
  fillFace(d.querySelector('.half.l .face'), 'left');
  fillFace(d.querySelector('.half.r .face'), 'right');
  onPress(d.querySelector('.half.l'), () => onTap('left', d));
  onPress(d.querySelector('.half.r'), () => onTap('right', d));
  return d;
}

/* ---------- the map ---------- */
let mapTouched = 0;
function openMap() {
  if (scene !== 'play') return;
  closeAllPanels();
  votes.left = votes.right = null;
  setScene('map');
  renderMap();
  $('#map').classList.add('show');
  mapTouched = now();
  Sound.play('door');
}
function closeMap() {
  $('#map').classList.remove('show');
  votes.left = votes.right = null;
  if (scene === 'map') setScene('play');
}
function renderMap() {
  const grid = $('#map .map-grid');
  grid.innerHTML = '<div class="map-roof"></div><div class="map-walls"></div><div class="map-lawn l"></div><div class="map-lawn r"></div>';
  const jarFull = S.unlocked.jar && S.jar >= SETTINGS.jarSize;
  Object.entries(MAP_SPOTS).forEach(([room, [c, r, cw = 1, rh = 1]]) => {
    let tile;
    if (roomOpen(room)) {
      const R = ROOMS[room];
      tile = voteTile(room, ICONS[R.icon], R.word, R.door, (side, d) => {
        mapTouched = now();
        if (room === S.room) { nudge(d); return; }
        castVote(side, room, grid, () => { closeMap(); goToRoom(room); });
      });
      if (room === S.room) tile.classList.add('here');
      else {
        const badge = room === 'playroom' && jarFull ? ICONS.gift : S.doorNew[room] ? ICONS.star : '';
        if (badge) tile.append(el('div', 'badge', badge));
      }
    } else {
      tile = el('div', 'mtile closed', `<div class="ico">${room === 'frontyard' || room === 'backyard' ? ICONS.roomYard : ICONS.window}</div>`);
    }
    Object.assign(tile.style, { gridColumn: `${c} / span ${cw}`, gridRow: `${r} / span ${rh}` });
    grid.append(tile);
  });
  showVotes(grid);
}

/* ---------- the buttons in the shared middle of every room ---------- */
const CENTER_BUTTONS = [];   // other parts of the game add buttons here: { key, icon, show(), tap() }
function renderCenter() {
  const box = $('#midbtns');
  box.innerHTML = '';
  const jarFull = S.unlocked.jar && S.jar >= SETTINGS.jarSize;
  const m = el('div', 'cbtn mapbtn', ICONS.houseMap);
  const elsewhereNew = Object.keys(S.doorNew).some(r => S.doorNew[r] && r !== S.room);
  const badge = jarFull && S.room !== 'playroom' ? ICONS.gift : elsewhereNew ? ICONS.star : '';
  if (badge) m.append(el('div', 'badge', badge));
  onPress(m, openMap);
  box.append(m);
  CENTER_BUTTONS.forEach(b => {
    if (!b.show()) return;
    const e = el('div', 'cbtn small ' + b.key, ICONS[b.icon]);
    if ((newUntil[b.key] || 0) > Date.now()) e.classList.add('new');
    onPress(e, () => { if (scene === 'play') b.tap(e); });
    box.append(e);
  });
}
