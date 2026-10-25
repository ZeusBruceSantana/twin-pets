'use strict';
/* Twin Pets: the library. Four little games, each needing both girls: tell a story (each girl picks a hero, a place and
   a thing, and the pets act it out), shelve the books (each girl her own shelves), hide and seek (one hides the friend, one
   finds it, then they swap) and the quiet game (tiptoe past the sleepy librarian cat; freeze when she looks). A miss never ends a game. */

Object.assign(ICONS, {
  toesBtn: '<svg viewBox="0 0 100 100"><g fill="#a77bff"><ellipse cx="34" cy="64" rx="13" ry="17"/><circle cx="22" cy="40" r="5"/><circle cx="32" cy="34" r="5"/><circle cx="43" cy="36" r="5"/><ellipse cx="68" cy="50" rx="13" ry="17"/><circle cx="56" cy="26" r="5"/><circle cx="66" cy="20" r="5"/><circle cx="77" cy="22" r="5"/></g></svg>',
});
townPlan('library');

/* ---------- 1. the story corner: a hero, a place and a thing from picture cards; the pets act it out ---------- */
const STORY_STEPS = [
  { key: 'hero', opts: [['bunny', 'Bunny', k => friendArt(k)], ['owl', 'Owl', k => friendArt(k)], ['dragon', 'Dragon', k => friendArt(k)]] },
  { key: 'place', opts: [['beach', 'Beach', k => ICONS[k]], ['snowhill', 'Snow', k => ICONS[k]], ['farm', 'Farm', k => ICONS[k]]] },
  { key: 'thing', opts: [['fish', 'Fish', k => ICONS[k]], ['ball', 'Ball', k => ICONS[k]], ['apple', 'Apple', k => ICONS[k]]] },
];
const storyArt = (step, k) => STORY_STEPS[step].opts.find(o => o[0] === k)[2](k);
TRIP_PLAY.storygame = function (a, side) {
  const g = townStart(a, {
    id: 'story', step: { left: 0, right: 0 }, pick: { left: [], right: [] },
    plan: (s, g) => {
      const st = g.step[s];
      if (st >= STORY_STEPS.length) return { acts: [], defs: {} };
      const opts = STORY_STEPS[st].opts;
      return { acts: opts.map(o => 'sty_' + o[0]), defs: Object.fromEntries(opts.map(o => ['sty_' + o[0], { svg: storyArt(st, o[0]), label: o[1] }])) };
    },
  }, 'openbook', 'story');
  if (!g) { hopPet(side); return; }
  SIDES.forEach(s => {
    const sc = g.scene = g.scene || {};
    const e = sc[s] = el('div', 'stscene ' + s, '<div class="stbg"></div><div class="sthero"></div><div class="stthing"></div>');
    g.field.append(e);
    popIn(e);
    ['stbg', 'sthero', 'stthing'].forEach((c, i) => tgHit(e.querySelector('.' + c), () => { if (g.pick[s][i]) Speech.say(STORY_STEPS[i].opts.find(o => o[0] === g.pick[s][i])[1]); }));
  });
  Sound.play('page');
};
STORY_STEPS.forEach((step, si) => step.opts.forEach(o => {
  TRIP_PLAY['sty_' + o[0]] = (a, side) => {
    const g = a.data.game;
    if (!g || g.id !== 'story' || g.step[side] !== si) return;
    g.pick[side][si] = o[0];
    g.step[side]++;
    const e = g.scene[side].querySelector(['.sthero', '.stbg', '.stthing'][si]);
    e.innerHTML = si === 1 ? ICONS[o[0]].replace('<svg ', '<svg preserveAspectRatio="xMidYMid slice" ') : o[2](o[0]);
    popIn(e);
    Speech.say(o[1]);
    Sound.play(si === 0 ? BUDDIES[o[0]].sound : 'pop');
    hopPet(side);
    mood(pets[side], 'happy', 900);
    renderColumn(side);
    if (SIDES.every(s => g.step[s] >= STORY_STEPS.length)) storyPlay(a);
  };
}));
async function storyPlay(a) {                                               // both stories are told: the pictures come alive and the pets act them out
  const g = a.data.game;
  await wait(900);
  if (!g.on) return;
  Sound.play('tada');
  SIDES.forEach(s => {
    g.scene[s].classList.add('alive');
    doTrick(s, 'wave', true);
    floatHearts(pets[s], 2);
  });
  await wait(2600);
  if (!g.on) return;
  SIDES.forEach(s => doTrick(s, 'dance', true));
  Sound.play('fmdance');
  await wait(2200);
  townEnd(a, true, 'story');
}

/* ---------- 2. shelve the books: tap the shelf that matches the book (each girl has her own shelves) ---------- */
const SHELF_BOOKS = ['moon', 'sun', 'apple'].map(w => LIBRARY_BOOKS.find(b => b[0] === w));
TRIP_PLAY.shelvegame = function (a, side) {
  const g = townStart(a, { id: 'shelve', q: {}, plan: () => ({ acts: [], defs: {} }) }, 'bookstack', 'books');
  if (!g) { hopPet(side); return; }
  SIDES.forEach(s => {
    const q = g.q[s] = { books: shuffle([0, 0, 1, 1, 2, 2]), n: 0, miss: 0, done: false, rows: [] };
    const unit = el('div', 'shunit ' + s);
    shuffle([0, 1, 2]).forEach(b => {
      const row = el('div', 'shrow', `<div class="shtab">${bookCover(SHELF_BOOKS[b][1], SHELF_BOOKS[b][2])}</div><div class="shbooks"></div>`);
      row.dataset.b = b;
      tgHit(row, () => shelfPut(a, s, row));
      q.rows[b] = row;
      unit.append(row);
    });
    g.field.append(unit);
    popIn(unit);
    q.unit = unit;
    shelfNext(g, s);
  });
  Sound.play('page');
};
function shelfNext(g, s) {
  const q = g.q[s];
  if (q.cur) q.cur.remove();
  if (q.n >= q.books.length) return;
  const [, color, icon] = SHELF_BOOKS[q.books[q.n]];
  q.cur = el('div', 'shcur ' + s, bookCover(color, icon));
  g.field.append(q.cur);
  popIn(q.cur);
}
async function shelfPut(a, s, row) {
  const g = a.data.game;
  const q = g && g.id === 'shelve' && g.q[s];
  if (!q || q.done || q.busy) return;
  const b = +row.dataset.b;
  if (b !== q.books[q.n]) {                                                 // the wrong shelf: the book wiggles, and after two tries the right shelf glows
    Sound.play('soft');
    animate(q.cur, [-6, 6, -4, 4, 0].map(r => ({ transform: `rotate(${r}deg)` })), { duration: 400 });
    if (++q.miss >= 2) { const r = q.rows[q.books[q.n]]; r.classList.add('hint'); setTimeout(() => r.classList.remove('hint'), 1800); }
    return;
  }
  q.busy = true;
  q.miss = 0;
  const [, color, icon] = SHELF_BOOKS[b];
  const from = q.cur.getBoundingClientRect(), slot = row.querySelector('.shbooks').getBoundingClientRect();
  const fly = prop(bookCover(color, icon), 11, from.left + from.width / 2, from.top + from.height / 2);
  fly.style.zIndex = 33;
  q.cur.style.visibility = 'hidden';
  await arc(fly, { x: from.left + from.width / 2, y: from.top + from.height / 2 }, { x: slot.left + slot.width / 2 + row.querySelector('.shbooks').children.length * 40, y: slot.top + slot.height / 2 }, 500, 70);
  fly.remove();
  q.busy = false;
  if (!g.on) return;
  row.querySelector('.shbooks').append(el('i', '', bookCover(color, icon)));
  Sound.play('block');
  hopPet(s);
  mood(pets[s], 'happy', 800);
  q.n++;
  shelfNext(g, s);
  if (q.n >= q.books.length) {                                              // her shelves are full
    q.done = true;
    Sound.play('wish');
    const r = q.unit.getBoundingClientRect();
    sparkles(r.left + r.width / 2, r.top + r.height / 2, 12);
    floatHearts(pets[s], 3);
    if (SIDES.every(x => g.q[x].done)) {
      await wait(900);
      if (!g.on) return;
      const cat = el('div', 'libcat', friendArt('kitten'));                 // the librarian cat peeks out to say well done
      g.field.append(cat);
      popIn(cat);
      Sound.play('shh');
      await wait(1700);
      townEnd(a, true, 'shelve');
    }
  }
}

/* ---------- 3. hide and seek: one girl hides the friend among the book stacks, the other finds it, then they swap ---------- */
const NOOK_X = [20, 31, 42, 58, 69, 80];
const HIDE_FRIENDS = ['kitten', 'mouse', 'owl', 'bunny'];
TRIP_PLAY.hidegame = function (a, side) {
  const g = townStart(a, {
    id: 'hide', round: 0, phase: 'hiding', nooks: [], spot: -1,
    plan: (s, g) => (g.phase === 'seeking' && s === hideHider(g)
      ? { acts: ['giggle'], defs: { giggle: { icon: 'note', label: 'Giggle' } }, clsOf: { giggle: 'invite' } }
      : { acts: [], defs: {} }),
  }, 'friend-mouse', 'hide');
  if (!g) { hopPet(side); return; }
  NOOK_X.forEach((x, i) => {
    const n = el('div', 'hnook', `<div class="hfriend"></div>${ICONS.bookstack}`);
    n.style.left = x + '%';
    tgHit(n, ev => hideTap(a, i, sideOfTap(ev)));
    g.field.append(n);
    g.nooks.push(n);
  });
  hideRound(a);
};
const hideHider = g => (g.round % 2 === 0 ? 'left' : 'right');
function hideRound(a) {                                                     // a friend waits in the middle to be hidden
  const g = a.data.game;
  g.phase = 'hiding';
  g.spot = -1;
  g.kind = HIDE_FRIENDS[g.round % HIDE_FRIENDS.length];
  g.nooks.forEach(n => { n.classList.remove('tried', 'wiggle'); n.classList.add('pick'); });
  if (g.friend) g.friend.remove();
  g.friend = el('div', 'hbuddy', friendArt(g.kind));
  g.field.append(g.friend);
  popIn(g.friend);
  Sound.play(BUDDIES[g.kind].sound);
  showHint('friend-' + g.kind, BUDDIES[g.kind].name);
  invite(hideHider(g), 'giggle', 1);
  renderColumns();
}
async function hideTap(a, i, side) {
  const g = a.data.game;
  if (!g || g.id !== 'hide' || g.busy) return;
  const nook = g.nooks[i];
  if (g.phase === 'hiding') {                                               // the hider picks the spot: the friend tiptoes over and slips behind the books
    g.busy = true;
    g.spot = i;
    g.nooks.forEach(n => n.classList.remove('pick'));
    Sound.play('lbtip');
    const f = g.friend, nr = nook.getBoundingClientRect();
    await tween(700, t => { f.style.left = 50 + (NOOK_X[i] - 50) * t + '%'; f.style.top = 56 - 20 * t + '%'; });
    f.style.opacity = 0;
    g.busy = false;
    if (!g.on) return;
    Sound.play('lbtip');
    sparkles(nr.left + nr.width / 2, nr.top, 3);
    g.phase = 'seeking';
    renderColumns();
    return;
  }
  if (g.phase !== 'seeking' || nook.classList.contains('tried')) return;
  hopPet(side);
  if (i !== g.spot) {                                                       // not here: the books wobble and a little puff
    nook.classList.add('tried');
    Sound.play('soft');
    animate(nook, [-5, 5, -3, 3, 0].map(r => ({ transform: `translateX(-50%) rotate(${r}deg)` })), { duration: 400 });
    return;
  }
  g.phase = 'found';
  g.busy = true;
  const f = g.friend;
  f.style.opacity = 1;
  Sound.play('lbgiggle');
  Sound.play(BUDDIES[g.kind].sound);
  animate(f, [{ transform: 'translateX(-50%) scale(.5)' }, { transform: 'translateX(-50%) scale(1.25)' }, { transform: 'translateX(-50%) scale(1)' }], { duration: 500 });
  const r = f.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top, 10);
  SIDES.forEach(s => { mood(pets[s], 'happy', 1800); floatHearts(pets[s], 2); });
  renderColumns();
  await wait(1800);
  g.busy = false;
  if (!g.on) return;
  g.round++;
  if (g.round >= HIDE_FRIENDS.length) { townEnd(a, true, 'hide'); return; }
  hideRound(a);
}
TRIP_PLAY.giggle = function (a, side) {                                     // a clue from the hider: the right stack giggles and wobbles
  const g = a.data.game;
  if (!g || g.id !== 'hide' || g.phase !== 'seeking') return;
  hopPet(side);
  Sound.play('lbgiggle');
  const n = g.nooks[g.spot];
  n.classList.add('wiggle');
  setTimeout(() => n.classList.remove('wiggle'), 900);
};

/* ---------- 4. the quiet game: tiptoe to the reading corner; when the librarian cat looks, freeze ---------- */
const SHH_STEPS = 10, SHH_END = { left: 37, right: 63 };
TRIP_PLAY.shhgame = function (a, side) {
  const g = townStart(a, {
    id: 'shh', step: { left: 0, right: 0 }, frozen: { left: 0, right: 0 }, looking: false,
    plan: (s, g) => ({ acts: ['tiptoe'], defs: { tiptoe: { icon: 'toesBtn', label: 'Tiptoe' } }, clsOf: { tiptoe: g.step[s] >= SHH_STEPS ? 'done' : 'invite' } }),
  }, 'shh', 'shh');
  if (!g) { hopPet(side); return; }
  g.start = { left: pets.left.x, right: pets.right.x };
  g.cat = el('div', 'shhcat', `${friendArt('kitten')}<div class="shhsign">${ICONS.shh}</div><div class="shhzz">${ICONS.moon}</div>`);
  g.field.append(g.cat);
  popIn(g.cat);
  const loop = async () => {                                                // she naps, then looks around for a moment
    while (g.on) {
      await wait(rand(2200, 3800));
      if (!g.on) return;
      g.looking = true;
      g.cat.classList.add('looking');
      Sound.play('shh');
      await wait(1400);
      g.looking = false;
      g.cat && g.cat.classList.remove('looking');
    }
  };
  loop();
};
TRIP_PLAY.tiptoe = async function (a, side) {
  const g = a.data.game;
  if (!g || g.id !== 'shh' || g.step[side] >= SHH_STEPS) { hopPet(side); return; }
  const p = pets[side];
  if (g.looking) {                                                          // she is looking: freeze (nothing is lost)
    g.frozen[side] = now() + 1100;
    sayBubble(p, 'Shh!', 900);
    Sound.play('soft');
    return;
  }
  if (now() < g.frozen[side] || now() - ((g.last && g.last[side]) || 0) < 380) return;       // gentle taps, one soft step at a time
  (g.last = g.last || {})[side] = now();
  g.step[side]++;
  Sound.play('lbtip');
  begin(p, 500);
  const x = g.start[side] + (SHH_END[side] - g.start[side]) * g.step[side] / SHH_STEPS;
  movePet(side, x, 12, 320);
  if (g.step[side] >= SHH_STEPS) { floatHearts(p, 2); renderColumn(side); }
  if (SIDES.every(s => g.step[s] >= SHH_STEPS) && !g.ending) {
    g.ending = true;
    await wait(500);
    if (!g.on) return;
    g.looking = false;
    g.cat.classList.remove('looking');
    g.cat.classList.add('purr');
    Sound.play('lbpurr');
    sparkles(W() / 2, H() * 0.55, 10);
    await wait(1800);
    townEnd(a, true, 'shh');
  }
};

/* ---------- memory book and sounds ---------- */
Object.assign(BUTTONS, { storygame: { icon: 'openbook', label: 'Story' }, shelvegame: { icon: 'bookstack', label: 'Shelve' }, hidegame: { icon: 'friend-mouse', label: 'Hide' }, shhgame: { icon: 'shh', label: 'Shh' } });
Object.assign(BOOK_LINES, {
  story: { line: 'told a story together.', icon: 'openbook', rank: 96.4 },
  shelve: { line: 'put every book on its shelf.', icon: 'bookstack', rank: 96.4 },
  hide: { line: 'played hide and seek in the library.', icon: 'friend-mouse', rank: 96.4 },
  shh: { line: 'tiptoed past the sleepy librarian cat.', icon: 'shh', rank: 96.4 },
});
Sound.add('lbgiggle', s => { [88, 92, 90, 95].forEach((m, i) => s.tone(s.NOTE(m), i * 0.09, 0.1, { type: 'triangle', vol: 0.05 })); });
Sound.add('lbtip', s => { s.noise(0, 0.05, { filter: 'bandpass', freq: 1800, q: 1.5, vol: 0.03 }); });
Sound.add('lbpurr', s => { for (let i = 0; i < 16; i++) s.tone(110, i * 0.09, 0.07, { type: 'sawtooth', vol: 0.03 }); });
