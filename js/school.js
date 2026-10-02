'use strict';
/* Twin Pets: pet school. Practicing school words, the art easel, and block building. */

/* ---------- pictures ---------- */
Object.assign(ICONS, {
  roomSchool: '<svg viewBox="0 0 100 100"><rect x="10" y="14" width="80" height="54" rx="5" fill="#3f7a5a" stroke="#b07f4f" stroke-width="5"/><path d="M24 34 h20 M24 46 h34" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".85"/><path d="M64 30 l3 6 l6 1 l-5 4 l1 6 l-5 -3 l-5 3 l1 -6 l-5 -4 l6 -1z" fill="#ffd23f"/><rect x="18" y="74" width="20" height="16" rx="3" fill="#ff8fb8"/><rect x="40" y="74" width="20" height="16" rx="3" fill="#7fc4ff"/><rect x="62" y="74" width="20" height="16" rx="3" fill="#ffd23f"/></svg>',
  words: '<svg viewBox="0 0 100 100"><rect x="8" y="16" width="84" height="56" rx="6" fill="#3f7a5a" stroke="#b07f4f" stroke-width="5"/><text x="50" y="54" text-anchor="middle" font-family="ui-rounded, sans-serif" font-weight="900" font-size="28" fill="#fff">cat</text><path d="M28 82 h44" stroke="#b07f4f" stroke-width="6" stroke-linecap="round"/></svg>',
  easel: '<svg viewBox="0 0 100 100"><path d="M30 92 L46 14 M70 92 L54 14 M50 70 V94" stroke="#b07f4f" stroke-width="6" stroke-linecap="round"/><rect x="18" y="18" width="64" height="48" rx="4" fill="#fff" stroke="#c99a6b" stroke-width="4"/><circle cx="36" cy="38" r="9" fill="#ff7a9a"/><circle cx="56" cy="46" r="10" fill="#7fc4ff"/><path d="M60 30 q8 -8 14 0" stroke="#ffd23f" stroke-width="5" fill="none" stroke-linecap="round"/></svg>',
  blocksBtn: '<svg viewBox="0 0 100 100"><rect x="10" y="56" width="38" height="34" rx="5" fill="#ff8fb8" stroke="#e0609c" stroke-width="3"/><rect x="52" y="56" width="38" height="34" rx="5" fill="#7fc4ff" stroke="#4a9be0" stroke-width="3"/><rect x="30" y="20" width="40" height="34" rx="5" fill="#ffd23f" stroke="#e0b030" stroke-width="3"/><text x="50" y="45" text-anchor="middle" font-family="ui-rounded, sans-serif" font-weight="900" font-size="22" fill="#fff">A</text></svg>',
  doghouse: '<svg viewBox="0 0 100 100"><path d="M10 46 L50 12 L90 46Z" fill="#ff8a7a" stroke="#d9604f" stroke-width="4" stroke-linejoin="round"/><rect x="18" y="44" width="64" height="46" fill="#ffd27a" stroke="#d9a23a" stroke-width="4"/><path d="M38 90 V70 C 38 58, 62 58, 62 70 V90Z" fill="#7a5a3a"/></svg>',
  den: '<svg viewBox="0 0 100 100"><path d="M8 88 C 8 40, 28 18, 50 18 C 72 18, 92 40, 92 88Z" fill="#c9cfdb" stroke="#8b94a3" stroke-width="4"/><path d="M30 88 C 30 62, 40 50, 50 50 C 60 50, 70 62, 70 88Z" fill="#5d6676"/><circle cx="26" cy="44" r="5" fill="#eef1f6"/><circle cx="72" cy="38" r="4" fill="#eef1f6"/></svg>',
  fort: '<svg viewBox="0 0 100 100"><path d="M10 84 L22 30 C 40 40, 60 40, 78 30 L90 84Z" fill="#a6d8ff" stroke="#5aa9ff" stroke-width="4" stroke-linejoin="round"/><path d="M34 84 C 34 64, 66 64, 66 84Z" fill="#fff4dd"/><path d="M50 36 V8 L66 14 L50 20" fill="#ff8fb8" stroke="#e0609c" stroke-width="3" stroke-linejoin="round"/><circle cx="26" cy="54" r="4" fill="#ffd23f"/><circle cx="74" cy="54" r="4" fill="#ffd23f"/></svg>',
  done: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#5cc77a"/><path d="M30 52 L45 66 L72 36" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  add: '<svg viewBox="0 0 100 100"><rect x="18" y="38" width="64" height="48" rx="7" fill="currentColor" stroke="#fff" stroke-width="4"/><path d="M50 8 V30 M40 20 L50 30 L60 20" stroke="#8b7fd1" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
});

/* =====================================================================
   THE SCHOOL ROOM
   ===================================================================== */
ROOMS.school = { word: 'school', icon: 'roomSchool', door: '#c8e7a6', acts: ['words', 'art', 'blocks'], feature: 'school' };
ROOM_ORDER.push('school');
ROOM_MARKUP.school = () => `<div class="wall"></div><div class="floor"></div><div class="tint l"></div><div class="tint r"></div>
  <div class="deco shelfbooks l"></div><div class="deco shelfbooks r"></div>`;
Object.assign(BUTTONS, {
  words:  { icon: 'words',     label: 'Words' },
  art:    { icon: 'easel',     label: 'Art' },
  blocks: { icon: 'blocksBtn', label: 'Blocks' },
});
FEATURE_OF.art = 'art';
FEATURE_OF.blocks = 'blocks';
NEW_THINGS.push(
  { key: 'school', order: 9,  room: 'school', acts: ['words'],  icon: 'roomSchool', word: 'school' },
  { key: 'art',    order: 15, room: 'school', acts: ['art'],    icon: 'easel',      word: 'art' },
  { key: 'blocks', order: 17, room: 'school', acts: ['blocks'], icon: 'blocksBtn',  word: 'blocks' },
);
Object.assign(BOOK_LINES, {
  school:          { line: 'practiced words at pet school.', icon: 'words', rank: 93 },
  art:             { line: 'painted a picture together.',    icon: 'easel', rank: 95 },
  'blocks-doghouse': { line: 'built a doghouse with blocks.',  icon: 'doghouse', rank: 92 },
  'blocks-den':      { line: 'built a cozy den with blocks.',  icon: 'den',      rank: 92 },
  'blocks-fort':     { line: 'built a blanket fort.',          icon: 'fort',     rank: 92 },
});

/* =====================================================================
   SCHOOL WORDS: a word on the chalkboard; each girl taps it to hear it,
   and her pet says it too. When both pets have said it, the next word.
   ===================================================================== */
const STARTER_WORDS = ['cat', 'dog', 'sun', 'big', 'fun', 'hop', 'red', 'play', 'love', 'jump', 'happy', 'friend'];
const board = roomThing('board', 'school', 'school',
  `<div class="board-in"><div class="chalk"></div><div class="stars"></div></div>`,
  { left: '50%', top: 'calc(51vmin + var(--safe-top))', width: '34vmin', height: '20vmin' });
function boardWord(word) {
  const c = board.querySelector('.chalk');
  if (!word) { c.innerHTML = ''; return; }
  sayableInto(c, word);
  c.style.fontSize = Math.min(8, 52 / Math.max(4, word.length)) + 'vmin';     // long words get smaller
  animate(c, [{ opacity: 0, transform: 'scale(.7)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 350, easing: 'ease-out' });
}
onPress(board, () => { if (scene === 'play') ACT_HANDLERS.words(); });
function hideBoard(a) {          // the chalkboard steps aside for the easel and the blocks
  board.style.visibility = 'hidden';
  a.cleanup.push(() => { board.style.visibility = ''; });
}
ACT_HANDLERS.words = side => { thingTapped('board'); startActivity('school', side); };
ACTIVITIES.school = {
  async start(a) {
    const pool = S.schoolWords.length ? S.schoolWords : STARTER_WORDS;
    a.data.words = shuffle(pool.slice()).slice(0, Math.min(4, pool.length));
    a.data.i = 0;
    a.data.said = { left: false, right: false };
    board.querySelector('.stars').innerHTML = '';
    a.cleanup.push(() => { boardWord(''); board.querySelector('.stars').innerHTML = ''; });
    Sound.play('pick');
    boardWord(a.data.words[0]);
    await wait(400);
  },
  plan(a, side) {
    const w = a.data.words[a.data.i] || '';
    return { acts: ['sayword'], big: true, defs: { sayword: { icon: 'speaker', label: w, speak: true } }, cls: a.data.said[side] ? 'done' : 'invite' };
  },
  async press(a, side) {
    const d = a.data, w = d.words[d.i];
    Speech.say(w);
    const p = pets[side];
    begin(p, 1600);
    mood(p, 'happy', 1400);
    sayBubble(p, w, 1800);
    hopPet(side);
    if (d.said[side]) return;            // she can hear it again as many times as she likes
    d.said[side] = true;
    renderColumn(side);
    if (!(d.said.left && d.said.right)) return;
    a.busy = true;
    await wait(900);
    Sound.play('wish');
    board.querySelector('.stars').append(el('i', '', ICONS.star));
    const r = board.getBoundingClientRect();
    sparkles(r.left + r.width / 2, r.top + r.height / 2, 10);
    await wait(900);
    d.i++;
    if (d.i >= d.words.length) { endActivity(true, 'school'); return; }
    d.said = { left: false, right: false };
    boardWord(d.words[d.i]);
    a.busy = false;
    renderColumns();
  },
};
function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [list[i], list[j]] = [list[j], list[i]]; }
  return list;
}

/* =====================================================================
   THE ART EASEL: one canvas, half each. Finger-paint, then hang it on a wall.
   ===================================================================== */
const PAINTS = ['#ff5d7a', '#ffb020', '#3fb6ff', '#5cc45c', '#a77bff', '#5d4a3a'];
const ART_SPOT = {   // where a painting hangs in each room: [left %, top %]
  playroom: [50, 58], kitchen: [35, 26], bathroom: [36, 27], bedroom: [37, 25], school: [34, 25],
};
ACT_HANDLERS.art = side => startActivity('art', side);
ACTIVITIES.art = {
  async start(a) {
    a.data.color = { left: colorById(S.colors.left).main, right: colorById(S.colors.right).main };
    a.data.done = { left: false, right: false };
    hideBoard(a);
    await Promise.all([movePet('left', 20, 4, 600), movePet('right', 80, 4, 600)]);
    const easel = actProp(a, `<svg class="legs" viewBox="0 0 100 60" preserveAspectRatio="none"><path d="M24 0 L10 60 M76 0 L90 60" stroke="#b07f4f" stroke-width="4" stroke-linecap="round"/></svg><canvas width="480" height="320"></canvas>`,
      { left: '50%', top: '20%', width: '60vmin', height: '40vmin', transform: 'translateX(-50%)' }, 12);
    easel.classList.add('easel');
    easel.style.pointerEvents = 'auto';
    const cv = a.data.canvas = easel.querySelector('canvas');
    const g = cv.getContext('2d');
    g.fillStyle = '#fffdf8'; g.fillRect(0, 0, 480, 320);
    paintDivider(g);
    setupPainting(a, cv, g);
    await popIn(easel);
  },
  plan(a, side) {
    const c = a.data.color[side];
    const acts = PAINTS.slice(0, 4).map((col, i) => 'paint' + i);
    const defs = {}, clsOf = {};
    acts.forEach((k, i) => {
      const col = paintFor(side, i);
      defs[k] = { svg: `<svg viewBox="0 0 100 100"><path d="M50 8 C 72 34, 86 50, 86 64 C 86 82, 70 94, 50 94 C 30 94, 14 82, 14 64 C 14 50, 28 34, 50 8Z" fill="${col}" stroke="#fff" stroke-width="5"/></svg>`, label: '' };
      clsOf[k] = col === c ? 'chosen' : '';
    });
    defs.artdone = { icon: 'done', label: 'Done' };
    clsOf.artdone = a.data.done[side] ? 'done' : '';
    return { acts: [...acts, 'artdone'], defs, clsOf };
  },
  async press(a, side, key) {
    if (key === 'artdone') {
      a.data.done[side] = true;
      Sound.play('pick');
      hopPet(side);
      renderColumn(side);
      if (a.data.done.left && a.data.done.right) await finishPainting(a);
      return;
    }
    a.data.color[side] = paintFor(side, +key.slice(5));
    Sound.play('dab');
    renderColumn(side);
  },
};
// each girl's paints start with her own color
const paintFor = (side, i) => (i === 0 ? colorById(S.colors[side]).main : PAINTS[(i - 1 + (side === 'left' ? 0 : 2)) % PAINTS.length]);
function paintDivider(g) {
  g.save();
  g.strokeStyle = '#e6dccb'; g.lineWidth = 3; g.setLineDash([10, 10]);
  g.beginPath(); g.moveTo(240, 6); g.lineTo(240, 314); g.stroke();
  g.restore();
}
function setupPainting(a, cv, g) {
  const strokes = {};   // one for each finger
  const at = e => {
    const r = cv.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * 480, y: (e.clientY - r.top) / r.height * 320 };
  };
  const dot = (s, x1, y1, x2, y2) => {
    g.save();
    g.beginPath(); g.rect(s.side === 'left' ? 0 : 242, 0, 238, 320); g.clip();   // each girl paints on her own half
    g.strokeStyle = s.color; g.lineWidth = 16; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke();
    g.restore();
  };
  cv.addEventListener('pointerdown', e => {
    e.preventDefault();
    if (!act || act !== a || a.ending) return;
    a.lastPress = now();
    const pt = at(e), side = pt.x < 240 ? 'left' : 'right';
    if (a.data.done[side]) { a.data.done[side] = false; renderColumn(side); }   // still painting
    const s = strokes[e.pointerId] = { side, color: a.data.color[side], x: pt.x, y: pt.y };
    try { cv.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    dot(s, pt.x, pt.y, pt.x + 0.1, pt.y);
    Sound.play('dab');
  });
  cv.addEventListener('pointermove', e => {
    const s = strokes[e.pointerId];
    if (!s) return;
    const pt = at(e);
    dot(s, s.x, s.y, pt.x, pt.y);
    s.x = pt.x; s.y = pt.y;
    a.lastPress = now();
  });
  ['pointerup', 'pointercancel'].forEach(ev => cv.addEventListener(ev, e => { delete strokes[e.pointerId]; }));
}
async function finishPainting(a) {
  a.busy = true;
  const cv = a.data.canvas;
  const small = document.createElement('canvas');
  small.width = 360; small.height = 240;
  small.getContext('2d').drawImage(cv, 0, 0, 360, 240);
  const img = small.toDataURL('image/jpeg', 0.75);
  const easel = cv.parentNode;
  easel.classList.add('framed');
  Sound.play('ding');
  const r = easel.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top + r.height / 2, 14);
  await wait(900);
  await endActivity(true, 'art');
  hangPainting(img);
}
/* Both girls tap the same room on the map to choose where it hangs. */
function hangPainting(img) {
  const hangIn = room => {
    S.paintings = (S.paintings || []).filter(p => p.room !== room);
    S.paintings.push({ img, room, at: Date.now() });
    save();
    renderPaintings();
    if (room === S.room) {
      const pic = $(`.room-${room} .painting`);
      if (pic) animate(pic, [{ transform: 'translate(-50%,-50%) scale(0) rotate(-20deg)' }, { transform: 'translate(-50%,-50%) scale(1.15) rotate(4deg)' }, { transform: 'translate(-50%,-50%) scale(1) rotate(0)' }], { duration: 600, easing: 'ease-out' });
    } else {
      S.doorNew[room] = true;
      save();
      renderCenter();
    }
    Sound.play('ding');
    showHint(ROOMS[room].icon, ROOMS[room].word);
  };
  let picked = false;
  const tryOpen = (n = 0) => {
    if (scene !== 'play') { if (n < 20) setTimeout(() => tryOpen(n + 1), 300); else hangIn(S.room); return; }
    openMap({
      what: `<img src="${img}" alt="">`,
      allow: room => !!ART_SPOT[room],
      pick: room => { picked = true; hangIn(room); },
      cancel: () => { if (!picked) { picked = true; hangIn(S.room in ART_SPOT ? S.room : 'school'); } },
    });
  };
  tryOpen();
}
function renderPaintings() {
  document.querySelectorAll('#rooms .painting').forEach(p => p.remove());
  (S.paintings || []).forEach(p => {
    const box = $(`#rooms .room-${p.room}`), spot = ART_SPOT[p.room];
    if (!box || !spot) return;
    const d = el('div', 'deco painting', `<img src="${p.img}" alt="" draggable="false">`);
    Object.assign(d.style, { left: spot[0] + '%', top: spot[1] + '%' });
    box.append(d);
  });
}
DRESS_HOOKS.push(side => { if (side === 'left') renderPaintings(); });

/* =====================================================================
   BLOCK BUILDING: choose what to build, then take turns adding blocks
   ===================================================================== */
// each piece: [svg shape, colored by the girl who adds it?]
const BUILDS = {
  doghouse: { word: 'doghouse', pieces: [
    ['<rect x="40" y="112" width="40" height="28" rx="4"/>', 1], ['<rect x="120" y="112" width="40" height="28" rx="4"/>', 1],
    ['<rect x="40" y="84" width="40" height="28" rx="4"/>', 1], ['<rect x="120" y="84" width="40" height="28" rx="4"/>', 1],
    ['<rect x="40" y="62" width="120" height="22" rx="4"/>', 1],
    ['<path d="M30 64 L100 14 L100 64Z"/>', 1], ['<path d="M100 14 L170 64 L100 64Z"/>', 1],
    ['<path d="M100 30 C 94 24, 86 28, 90 34 L100 44 L110 34 C 114 28, 106 24, 100 30Z" fill="#ff6f91"/>', 0],
  ] },
  den: { word: 'den', pieces: [
    ['<rect x="22" y="110" width="36" height="30" rx="12"/>', 1], ['<rect x="142" y="110" width="36" height="30" rx="12"/>', 1],
    ['<rect x="26" y="78" width="34" height="30" rx="12"/>', 1], ['<rect x="140" y="78" width="34" height="30" rx="12"/>', 1],
    ['<rect x="44" y="48" width="38" height="30" rx="12"/>', 1], ['<rect x="118" y="48" width="38" height="30" rx="12"/>', 1],
    ['<rect x="76" y="32" width="48" height="26" rx="12"/>', 1],
    ['<ellipse cx="100" cy="132" rx="38" ry="9" fill="#ffd9e8"/>', 0],
  ] },
  fort: { word: 'blanket fort', pieces: [
    ['<rect x="26" y="70" width="12" height="70" rx="4"/>', 1], ['<rect x="162" y="70" width="12" height="70" rx="4"/>', 1],
    ['<rect x="24" y="96" width="34" height="10" rx="4"/>', 1], ['<rect x="142" y="96" width="34" height="10" rx="4"/>', 1],
    ['<path d="M16 76 C 60 50, 140 50, 184 76 L176 134 C 150 120, 50 120, 24 134Z" opacity=".92"/>', 1],
    ['<ellipse cx="72" cy="134" rx="22" ry="8" fill="#fff4dd" stroke="#e0c08a" stroke-width="2"/>', 0],
    ['<ellipse cx="128" cy="134" rx="22" ry="8" fill="#fff4dd" stroke="#e0c08a" stroke-width="2"/>', 0],
    ['<path d="M100 58 V24 L122 31 L100 38" fill="#ffd23f" stroke="#e0b030" stroke-width="2" stroke-linejoin="round"/>', 0],
  ] },
};
ACT_HANDLERS.blocks = side => openPanel(side, {
  items: Object.entries(BUILDS).map(([k, b]) => ({ key: k, icon: ICONS[k === 'fort' ? 'fort' : k], word: b.word })),
  onPick: key => startActivity('blocks', side, { build: key }),
});
const blockTurn = a => (a.data.n % 2 === 0 ? a.starter : other(a.starter));
ACTIVITIES.blocks = {
  async start(a) {
    a.data.b = BUILDS[a.opts.build];
    a.data.n = 0;
    hideBoard(a);
    await Promise.all([movePet('left', 22, 6, 600), movePet('right', 78, 6, 600)]);
    a.data.el = actProp(a, `<svg viewBox="0 0 200 150">${a.data.b.pieces.map(([shape], i) => `<g class="pc" data-i="${i}" style="opacity:0">${shape}</g>`).join('')}</svg>`,
      { left: '50%', bottom: '6%', width: '46vmin', height: '34.5vmin', transform: 'translateX(-50%)' }, 9);
    a.data.el.classList.add('build');
    Sound.play('pick');
  },
  plan(a, side) {
    const mine = blockTurn(a) === side;
    return { acts: ['addblock'], big: true, defs: { addblock: { icon: 'add', label: 'Block' } }, cls: mine ? 'invite' : 'done' };
  },
  async press(a, side) {
    if (blockTurn(a) !== side) { hopPet(side); return; }       // her sister's turn: a little hop
    a.busy = true;
    const d = a.data, i = d.n, [, colored] = d.b.pieces[i];
    const g = d.el.querySelector(`.pc[data-i="${i}"]`);
    if (colored) g.style.fill = side === 'left' ? 'var(--L)' : 'var(--R)';
    if (colored) g.style.stroke = '#fff';
    g.style.opacity = 1;
    Sound.play('block');
    await animate(g, [{ transform: 'translateY(-140px)' }, { transform: 'translateY(0)', offset: 0.7 }, { transform: 'translateY(-8px)', offset: 0.85 }, { transform: 'translateY(0)' }], { duration: 520, easing: 'ease-in' });
    mood(pets[side], 'happy', 900);
    d.n++;
    if (d.n >= d.b.pieces.length) { await finishBuild(a); return; }
    a.busy = false;
    renderColumns();
  },
};
async function finishBuild(a) {
  Sound.play('yay');
  const r = a.data.el.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top + r.height / 2, 16);
  await wait(500);
  SIDES.forEach(s => { hopPet(s); floatHearts(pets[s], 3); mood(pets[s], 'happy', 2000); });
  await wait(1200);
  endActivity(true, 'blocks-' + a.opts.build);
}
Sound.add('block', s => { const k = s.k3(); s.tone(s.NOTE(55 + k), 0.36, 0.16, { type: 'triangle', vol: 0.12 }); s.tone(s.NOTE(79 + k), 0.4, 0.2, { vol: 0.05 }); });
