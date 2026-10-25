'use strict';
/* Twin Pets: the library. Four little games, each needing both girls: tell a story (each girl picks a hero, a place and
   a thing, and the pets act it out), catch the flying books (each girl onto her own shelves), hide and seek (one hides the friend, one
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

/* ---------- 2. flying books: books flap out of the bookcases; each girl catches them onto her own shelves ---------- */
const BOOKS_NEED = 9;
TRIP_PLAY.catchgame = function (a, side) {
  const g = townStart(a, {
    id: 'catch', n: { left: 0, right: 0 }, flying: 0, gold: false,
    plan: (s, g) => (g.gold ? { acts: ['goldbook'], defs: { goldbook: { icon: 'bookstack', label: 'Book' } }, clsOf: { goldbook: 'invite' } } : { acts: [], defs: {} }),
  }, 'bookstack', 'books');
  if (!g) { hopPet(side); return; }
  SIDES.forEach(s => {
    const unit = el('div', 'shunit ' + s, '<div class="shrow"><div class="shbooks"></div></div>'.repeat(3));
    g.field.append(unit);
    popIn(unit);
    g['unit' + s] = unit;
  });
  Sound.play('page');
  g.timers.push(setInterval(() => catchSpawn(a, g), 650));
};
function catchSpawn(a, g) {
  if (!g.on || a.data.game !== g || g.gold || scene !== 'act' || g.flying >= 5) return;
  const [, color, icon] = pick(LIBRARY_BOOKS);
  const e = el('div', 'fbook', '<i class="wing l"></i><i class="wing r"></i>' + bookCover(color, icon));
  const fromLeft = Math.random() < 0.5, y = rand(0.3, 0.5);
  const x0 = fromLeft ? 0.2 : 0.8, x1 = fromLeft ? 0.85 : 0.15, W_ = W(), H_ = H();
  e.dataset.color = color; e.dataset.icon = icon;
  Object.assign(e.style, { left: 0, top: 0 });
  g.field.append(e);
  g.flying++;
  const pts = [0, 0.25, 0.5, 0.75, 1].map((t, i) => ({ transform: `translate(${(x0 + (x1 - x0) * t) * W_}px, ${(y + (i % 2 ? -0.07 : 0.05)) * H_}px)`, offset: t }));
  const an = e.animate(pts, { duration: rand(3800, 5000), easing: 'ease-in-out' });
  let caught = false;
  tgHit(e, ev => {
    if (caught || !g.on) return;
    caught = true;
    an.pause();
    catchBook(a, g, e, sideOfTap(ev));
  });
  an.onfinish = () => { if (!caught) { e.remove(); } g.flying--; if (caught) return; };
}
async function catchBook(a, g, e, side) {
  Sound.play('lbflap');
  const unit = g['unit' + side], rows = unit.querySelectorAll('.shbooks'), n = g.n[side];
  if (n >= BOOKS_NEED) { e.remove(); g.flying--; hopPet(side); return; }                 // her shelves are full: it flies off, nothing lost
  g.n[side]++;
  const r = e.getBoundingClientRect(), slot = rows[Math.floor(n / 3)].getBoundingClientRect();
  e.style.pointerEvents = 'none';
  const to = { x: slot.left + (n % 3) * 0.9 * 8 * 8.2 + 40, y: slot.top + slot.height / 2 };
  await tween(420, t => { e.style.transform = `translate(${r.left + (to.x - r.left) * t}px, ${r.top + (to.y - r.top) * t - Math.sin(t * Math.PI) * 60}px) scale(${1 - 0.3 * t})`; });
  g.flying--;
  e.remove();
  if (!g.on) return;
  rows[Math.floor(n / 3)].append(el('i', '', bookCover(e.dataset.color, e.dataset.icon)));
  Sound.play('block');
  hopPet(side);
  mood(pets[side], 'happy', 800);
  if (g.n[side] >= BOOKS_NEED) { Sound.play('wish'); floatHearts(pets[side], 3); sparkles(to.x, to.y, 10); }
  if (!g.gold && SIDES.every(s => g.n[s] >= BOOKS_NEED)) {                              // both shelves are full: a golden book flies in for both girls
    g.gold = true;
    g.field.querySelectorAll('.fbook').forEach(b => b.remove());
    g.gb = el('div', 'fbook gold tg-hit', '<i class="wing l"></i><i class="wing r"></i>' + bookCover('#ffd23f', 'star'));
    g.field.append(g.gb);
    onTap(g.gb, ev => bothTap('goldbook', sideOfTap(ev), () => catchFinish(a, g)));
    Sound.play('wish');
    showHint('bookstack', 'golden book');
    renderColumns();
  }
}
TRIP_PLAY.goldbook = function (a, side) {
  const g = a.data.game;
  if (!g || g.id !== 'catch' || !g.gold) return;
  hopPet(side);
  Sound.play('pop');
  bothTap('goldbook', side, () => catchFinish(a, g));
};
async function catchFinish(a, g) {                                                       // every book bursts out and flutters round the room
  if (g.finishing) return;
  g.finishing = true;
  Sound.play('lbflap');
  for (let i = 0; i < 12; i++) {
    const [, color, icon] = pick(LIBRARY_BOOKS);
    const e = el('div', 'fbook', '<i class="wing l"></i><i class="wing r"></i>' + bookCover(color, icon));
    e.style.pointerEvents = 'none';
    g.field.append(e);
    e.animate([{ transform: `translate(${W() / 2}px, ${H() * 0.45}px) scale(.3)`, opacity: 1 }, { transform: `translate(${rand(0.15, 0.85) * W()}px, ${rand(0.1, 0.5) * H()}px) scale(1)`, opacity: 1, offset: 0.6 }, { transform: `translate(${rand(0.1, 0.9) * W()}px, ${-0.2 * H()}px) scale(1)`, opacity: 0 }], { duration: 2200, delay: i * 90, fill: 'forwards' });
  }
  g.gb.remove();
  SIDES.forEach(s => doTrick(s, 'spin', true));
  Sound.play('tada');
  await wait(2800);
  townEnd(a, true, 'catch');
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
Object.assign(BUTTONS, { storygame: { icon: 'openbook', label: 'Story' }, catchgame: { icon: 'bookstack', label: 'Catch' }, hidegame: { icon: 'friend-mouse', label: 'Hide' }, shhgame: { icon: 'shh', label: 'Shh' } });
Object.assign(BOOK_LINES, {
  story: { line: 'told a story together.', icon: 'openbook', rank: 96.4 },
  catch: { line: 'caught the flying books and found the golden book.', icon: 'bookstack', rank: 96.4 },
  hide: { line: 'played hide and seek in the library.', icon: 'friend-mouse', rank: 96.4 },
  shh: { line: 'tiptoed past the sleepy librarian cat.', icon: 'shh', rank: 96.4 },
});
Sound.add('lbgiggle', s => { [88, 92, 90, 95].forEach((m, i) => s.tone(s.NOTE(m), i * 0.09, 0.1, { type: 'triangle', vol: 0.05 })); });
Sound.add('lbflap', s => { [0, 0.08, 0.16].forEach(t => s.noise(t, 0.07, { filter: 'bandpass', freq: 900, q: 1, vol: 0.05 })); });
Sound.add('lbtip', s => { s.noise(0, 0.05, { filter: 'bandpass', freq: 1800, q: 1.5, vol: 0.03 }); });
Sound.add('lbpurr', s => { for (let i = 0; i < 16; i++) s.tone(110, i * 0.09, 0.07, { type: 'sawtooth', vol: 0.03 }); });
