'use strict';
/* Twin Pets: the Fun Fair, a new place in town. A claw machine (one girl slides, one drops, and they swap
   each round; it always wins in the end), peekaboo pop-ups (critters peek out of holes and giggle when
   booped; a golden twin critter needs both girls) and a ferris wheel for both pets. */

Object.assign(ICONS, {
  fair: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#ffe9f6"/><circle cx="50" cy="44" r="28" fill="none" stroke="#a77bff" stroke-width="4"/><path d="M50 16 V72 M22 44 H78 M30 24 L70 64 M70 24 L30 64" stroke="#a77bff" stroke-width="2.500"/><circle cx="50" cy="44" r="4" fill="#ff8fb8"/><g fill="#ff7a9a"><rect x="44" y="10" width="12" height="9" rx="3"/><rect x="74" y="40" width="12" height="9" rx="3"/><rect x="44" y="68" width="12" height="9" rx="3"/><rect x="14" y="40" width="12" height="9" rx="3"/></g><path d="M34 92 L50 62 L66 92" stroke="#a77bff" stroke-width="4" fill="none"/></svg>',
  wheelBtn: '<svg viewBox="0 0 100 100"><circle cx="50" cy="44" r="30" fill="none" stroke="#a77bff" stroke-width="5"/><path d="M50 14 V74 M20 44 H80 M29 23 L71 65 M71 23 L29 65" stroke="#a77bff" stroke-width="3"/><circle cx="50" cy="44" r="5" fill="#ff8fb8"/><g fill="#ff7a9a"><rect x="43" y="8" width="14" height="10" rx="3"/><rect x="76" y="38" width="14" height="10" rx="3"/><rect x="43" y="70" width="14" height="10" rx="3"/><rect x="10" y="38" width="14" height="10" rx="3"/></g><path d="M32 94 L50 66 L68 94" stroke="#a77bff" stroke-width="5" fill="none"/></svg>',
  clawBtn: '<svg viewBox="0 0 100 100"><rect x="18" y="10" width="64" height="80" rx="8" fill="#a6d8ff" stroke="#5aa9ff" stroke-width="4"/><rect x="26" y="18" width="48" height="46" rx="4" fill="#fff" opacity=".85"/><path d="M50 18 V36 M40 44 C 40 34, 60 34, 60 44" stroke="#9aa6bd" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="36" cy="56" r="6" fill="#ff8fb8"/><circle cx="60" cy="56" r="6" fill="#ffd23f"/><rect x="30" y="72" width="40" height="10" rx="4" fill="#ff7a7a"/></svg>',
  moleBtn: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="78" rx="38" ry="13" fill="#5d3a22"/><circle cx="50" cy="56" r="23" fill="#b98a5a" stroke="#8a5a3c" stroke-width="3"/><circle cx="42" cy="52" r="3.400" fill="#3e3a4f"/><circle cx="58" cy="52" r="3.400" fill="#3e3a4f"/><ellipse cx="50" cy="62" rx="6" ry="4.500" fill="#ff8fab"/><path d="M12 78 C 12 70, 88 70, 88 78 C 88 88, 12 88, 12 78Z" fill="#7a5238"/></svg>',
  mole: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="56" rx="34" ry="36" fill="#b98a5a" stroke="#8a5a3c" stroke-width="3"/><circle cx="40" cy="46" r="3.600" fill="#3e3a4f"/><circle cx="60" cy="46" r="3.600" fill="#3e3a4f"/><ellipse cx="50" cy="60" rx="8" ry="6" fill="#ff8fab"/><path d="M44 70 Q50 76 56 70" stroke="#3e3a4f" stroke-width="2.500" fill="none" stroke-linecap="round"/><rect x="16" y="76" width="18" height="12" rx="6" fill="#d9a074"/><rect x="66" y="76" width="18" height="12" rx="6" fill="#d9a074"/></svg>',
});

/* ---------- the place ---------- */
Object.assign(PLACES, { fair: { word: 'fun fair', icon: 'fair', color: '#fbd9ee', acts: ['claw', 'popup', 'wheel', 'puzzle'], need: 'fair' } });
Object.assign(BUTTONS, { claw: { icon: 'clawBtn', label: 'Claw' }, popup: { icon: 'moleBtn', label: 'Pop-ups' }, wheel: { icon: 'wheelBtn', label: 'Wheel' } });
NEW_THINGS.push({ key: 'fair', order: 28, requires: 'puzzles', icon: 'fair', word: 'fun fair' });
Object.assign(BOOK_LINES, { fair: { line: 'went to the fun fair.', icon: 'fair', rank: 98 }, popups: { line: 'booped the pop-up critters.', icon: 'mole', rank: 96.8 } });
const WHEEL_SVG = '<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="86" fill="none" stroke="#a77bff" stroke-width="7"/><circle cx="100" cy="100" r="60" fill="none" stroke="#c9b6ff" stroke-width="3"/><g stroke="#a77bff" stroke-width="4"><path d="M100 14 V186 M14 100 H186 M39 39 L161 161 M161 39 L39 161"/></g><circle cx="100" cy="100" r="11" fill="#ff8fb8"/></svg>';
PLACE_MARKUP.fair = () => `<div class="tsky fair"></div><div class="cloud" style="top:10%; animation-delay:-18s"></div>
  <div class="bunting"></div>
  <div class="fairwheel"><div class="wspin">${WHEEL_SVG}${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<div class="gond g${i}" style="--a:${i * 45}deg"><div class="seat"></div></div>`).join('')}</div><div class="wlegs"></div></div>
  <div class="fairtent a"></div><div class="fairtent b"></div><div class="fairground"></div>`;

/* ---------- the claw machine ---------- */
const CLAW_X = [0.2, 0.5, 0.8];
const clawKinds = () => (S.friends.have.length >= 3 ? S.friends.have : ['bunny', 'owl', 'duck', 'kitten', 'frog']).slice();
PLACE_PLAN.fair = (a, side) => {
  const c = a.data.claw;
  if (!c || !c.on) return null;
  const mover = c.round % 2 === 0 ? 'left' : 'right';                         // the girls swap jobs every round
  return { acts: [side === mover ? 'clawmove' : 'clawdrop', 'clawquit'], defs: { clawmove: { icon: 'next', label: 'Slide' }, clawdrop: { icon: 'clawBtn', label: 'Drop!' }, clawquit: { icon: 'back', label: 'Back' } }, cls: 'invite' };
};
function clawStock(c) { const ks = shuffle(clawKinds()); c.stack = CLAW_X.map((_, i) => [ks[i % ks.length], ks[(i + 3) % ks.length]]); }
function clawRender(a) {
  const c = a.data.claw;
  c.glass.querySelectorAll('.plush').forEach(e => e.remove());
  c.stack.forEach((col, i) => col.forEach((k, j) => {
    const e = el('div', 'plush', friendArt(k));
    Object.assign(e.style, { left: CLAW_X[i] * 100 + '%', bottom: 2 + j * 24 + '%' });
    e.dataset.col = i; e.dataset.level = j;
    c.glass.append(e);
  }));
  c.arm.style.left = CLAW_X[c.col] * 100 + '%';
}
TRIP_PLAY.claw = function (a, side, p) {
  if (a.data.claw && a.data.claw.on) { hopPet(side); return; }
  const cab = actProp(a, `<div class="clawcab"><div class="clawglass"><div class="clawrail"></div><div class="clawarm"><div class="clawline"></div><svg class="clawhand" viewBox="0 0 60 50"><path d="M30 2 V16 M30 16 C 8 16, 4 36, 12 46 M30 16 C 52 16, 56 36, 48 46" stroke="#9aa6bd" stroke-width="5" fill="none" stroke-linecap="round"/></svg></div></div><div class="clawchute"></div></div>`,
    { left: '50%', bottom: '17%', width: '25vmin', height: '36vmin', transform: 'translateX(-50%)' }, 11);
  const c = a.data.claw = { on: true, round: 0, col: 1, tries: 0, busy: false, cab, glass: cab.querySelector('.clawglass'), arm: cab.querySelector('.clawarm'), stack: [] };
  clawStock(c);
  clawRender(a);
  popIn(cab);
  Sound.play('door');
  showHint('clawBtn', 'claw');
  renderColumns();
};
TRIP_PLAY.clawmove = async function (a, side) {
  const c = a.data.claw;
  if (!c || c.busy) return;
  c.col = (c.col + 1) % CLAW_X.length;
  c.arm.style.left = CLAW_X[c.col] * 100 + '%';
  Sound.play('click');
  hopPet(side);
};
TRIP_PLAY.clawdrop = async function (a, side, p) {
  const c = a.data.claw;
  if (!c || c.busy) return;
  c.busy = true;
  const hand = c.arm.querySelector('.clawhand');
  Sound.play('clawdown');
  await animate(c.arm, [{ height: '14%' }, { height: '62%' }], { duration: 700, easing: 'ease-in', fill: 'forwards' });
  const col = c.stack[c.col];
  const miss = !col.length || (c.tries === 0 && Math.random() < 0.5);          // the first try can slip, but never the second
  if (miss) {
    c.tries++;
    Sound.play('soft');
    animate(hand, [{ transform: 'rotate(0)' }, { transform: 'rotate(-12deg)' }, { transform: 'rotate(10deg)' }, { transform: 'rotate(0)' }], { duration: 500 });
    sayBubble(pets[side], 'Almost!', 1400);
    await animate(c.arm, [{ height: '62%' }, { height: '14%' }], { duration: 600, easing: 'ease-out', fill: 'forwards' });
    if (!col.length) clawStock(c), clawRender(a);
    c.busy = false;
    return;
  }
  const kind = col.pop();
  const plush = c.glass.querySelector(`.plush[data-col="${c.col}"][data-level="${col.length}"]`);
  Sound.play('pop');
  if (plush) { plush.style.transition = 'none'; c.arm.append(plush); Object.assign(plush.style, { left: '50%', bottom: 'auto', top: '90%', transform: 'translate(-50%, 0)' }); }
  await animate(c.arm, [{ height: '62%' }, { height: '14%' }], { duration: 800, easing: 'ease-out', fill: 'forwards' });
  await tween(600, t => { c.arm.style.left = CLAW_X[c.col] * 100 + (8 - CLAW_X[c.col] * 100) * t + '%'; });          // over to the chute
  if (plush) animate(plush, [{ transform: 'translate(-50%, 0)', opacity: 1 }, { transform: 'translate(-50%, 160%)', opacity: 0 }], { duration: 500, fill: 'forwards' });
  Sound.play('plop');
  await wait(450);
  if (plush) plush.remove();
  c.arm.style.left = '50%';
  c.col = 1; c.tries = 0; c.round++;
  Sound.play('yay');
  celebrate(W() / 2, H() * 0.4, 12);
  SIDES.forEach(s => { mood(pets[s], 'happy', 1800); floatHearts(pets[s], 2); });
  showHint('friend-' + kind, BUDDIES[kind].name, true);
  if (!a.data.clawWon) { a.data.clawWon = true; owePrize(); save(); logDay('claw'); }   // the first win each visit is a prize
  clawRender(a);
  c.busy = false;
  renderColumns();
};
TRIP_PLAY.clawquit = function (a) {
  const c = a.data.claw;
  if (!c) return;
  c.on = false;
  animate(c.cab, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' }).then(() => c.cab.remove());
  renderColumns();
};
BOOK_LINES.claw = { line: 'won a prize at the claw machine.', icon: 'clawBtn', rank: 96.9 };

/* ---------- peekaboo pop-ups ---------- */
const POP_HOLES = { left: [20, 33, 45], right: [55, 67, 80] };
const popKinds = () => ['bunny', 'mole', 'chick', 'duck'];
const popArt = k => (k === 'mole' ? ICONS.mole : k === 'chick' ? ICONS.chick : k === 'duck' ? ICONS.duck : friendArt(k));
const POP_NEED = 8;
TRIP_PLAY.popup = function (a, side) {
  if (a.data.pop) { hopPet(side); return; }
  const field = actProp(a, '', { inset: 0 }, 13);
  const st = a.data.pop = { field, count: { left: 0, right: 0 }, holes: [], twin: null, done: false };
  SIDES.forEach(s => POP_HOLES[s].forEach(x => {
    const h = el('div', 'phole', '<div class="pclip"><div class="critter"></div></div><div class="plip"></div>');
    Object.assign(h.style, { left: x + '%', top: '40%' });
    h.dataset.side = s;
    h.critter = h.querySelector('.critter');
    onPress(h.querySelector('.pclip'), () => boop(a, h));
    field.append(h);
    st.holes.push(h);
  }));
  st.basket = el('div', 'pbasket', `${ICONS.basket}<div class="pcount"></div>`);
  Object.assign(st.basket.style, { left: '50%', top: '66%' });
  field.append(st.basket);
  st.timer = setInterval(() => popTick(a), 650);
  a.cleanup.push(() => clearInterval(st.timer));
  Sound.play('door');
  showHint('moleBtn', 'pop-ups');
};
function popTick(a) {
  const st = a.data.pop;
  if (!st || st.done || act !== a || a.busy) return;
  SIDES.forEach(s => {
    if (st.count[s] >= POP_NEED) return;
    const mine = st.holes.filter(h => h.dataset.side === s);
    if (mine.filter(h => h.up).length >= 2 || Math.random() < 0.3) return;
    const h = pick(mine.filter(x => !x.up));
    if (h) peek(h, popKinds());
  });
}
async function peek(h, kinds, golden) {
  h.up = true;
  h.kind = pick(kinds);
  h.critter.innerHTML = popArt(h.kind);
  h.critter.classList.toggle('golden', !!golden);
  await animate(h.critter, [{ transform: 'translateY(105%)' }, { transform: 'translateY(0)' }], { duration: 380, easing: 'cubic-bezier(.3,1.5,.6,1)', fill: 'forwards' });
  if (golden) return;
  await wait(2600);
  if (h.up) {                                                   // nobody booped it: it ducks back down (nothing lost)
    await animate(h.critter, [{ transform: 'translateY(0)' }, { transform: 'translateY(105%)' }], { duration: 300, fill: 'forwards' });
    h.up = false;
  }
}
async function boop(a, h) {
  const st = a.data.pop;
  if (!st || !h.up || h.booped) return;
  if (h.classList.contains('mid')) { twinTap(a, h); return; }
  h.booped = true;
  const s = h.dataset.side;
  Sound.play('ducksqueak');
  const r = h.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top, 5);
  animate(h.critter, [{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(-14%) rotate(-12deg)' }, { transform: 'translateY(105%) rotate(10deg)' }], { duration: 500, fill: 'forwards' });
  const carrot = prop(ICONS.carrot, 5, r.left + r.width / 2, r.top);
  carrot.style.zIndex = 33;
  const b = st.basket.getBoundingClientRect();
  arc(carrot, { x: r.left + r.width / 2, y: r.top }, { x: b.left + b.width / 2, y: b.top + 10 }, 600, 70, 180).then(() => { carrot.remove(); Sound.play('pick'); });
  st.count[s]++;
  st.basket.querySelector('.pcount').textContent = st.count.left + st.count.right;
  mood(pets[s], 'happy', 900);
  hopPet(s);
  await wait(500);
  h.up = false; h.booped = false;
  if (st.count.left >= POP_NEED && st.count.right >= POP_NEED && !st.twin) goldenTwin(a);
}
function goldenTwin(a) {                                       // a shiny critter in the middle: both girls tap it
  const st = a.data.pop;
  st.twin = { left: false, right: false };
  st.holes.forEach(h => { if (h.up) { animate(h.critter, [{ transform: 'translateY(0)' }, { transform: 'translateY(105%)' }], { duration: 250, fill: 'forwards' }); h.up = false; } });
  const h = el('div', 'phole mid', '<div class="pclip"><div class="critter"></div></div><div class="plip"></div>');
  Object.assign(h.style, { left: '50%', top: '40%' });
  h.critter = h.querySelector('.critter');
  onPress(h.querySelector('.pclip'), ev => twinTap(a, h, ev));
  st.field.append(h);
  st.mid = h;
  Sound.play('wish');
  peek(h, ['bunny'], true);
  SIDES.forEach(s => invite(s, 'popup', 8000));
}
async function twinTap(a, h, ev) {
  const st = a.data.pop;
  if (!st || !st.twin || st.done) return;
  const s = ev && ev.clientX < W() / 2 ? 'left' : 'right';
  if (st.twin[s]) return;
  st.twin[s] = true;
  Sound.play('ducksqueak');
  hopPet(s);
  animate(h.critter, [{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }], { duration: 300 });
  if (!(st.twin.left && st.twin.right)) { setTimeout(() => { if (!st.done) st.twin = { left: false, right: false }; }, SETTINGS.doorWindowMs); return; }
  st.done = true;                                              // both tapped: a twin spin!
  clearInterval(st.timer);
  Sound.play('yay');
  SIDES.forEach(side => doTrick(side, 'spin', true));
  const r = h.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top, 16);
  celebrate(W() / 2, H() * 0.4, 20);
  await wait(1800);
  st.field.remove();
  a.data.pop = null;
  togetherMoment('popups');
}

/* ---------- the ferris wheel ---------- */
TRIP_PLAY.wheel = async function (a, side) {
  if (a.data.riding) { hopPet(side); return; }
  a.data.riding = true;
  const wheel = a.data.bg.querySelector('.fairwheel');
  const seats = [wheel.querySelector('.g0 .seat'), wheel.querySelector('.g4 .seat')];
  SIDES.forEach((s, i) => { const f = el('div', 'rider'); f.append(faceDrawing(s)); seats[i].append(f); });
  wheel.classList.add('ride');
  Sound.play('wheelcrank');
  SIDES.forEach(s => mood(pets[s], 'happy', 7000));
  for (let i = 0; i < 4; i++) { await wait(1700); SIDES.forEach(s => floatHearts(pets[s], 1)); }
  wheel.classList.remove('ride');
  seats.forEach(x => { x.innerHTML = ''; });
  a.data.riding = false;
};
Sound.add('wheelcrank', s => { for (let i = 0; i < 14; i++) s.noise(i * 0.45, 0.04, { filter: 'bandpass', freq: 1400 + i * 60, q: 2, vol: 0.03 }); [72, 76, 79, 84, 79, 76].forEach((m, i) => s.tone(s.NOTE(m), i * 0.9, 0.7, { vol: 0.04, echo: 1 })); });
Sound.add('clawdown', s => { s.tone(s.NOTE(84), 0, 0.6, { to: s.NOTE(60), type: 'triangle', vol: 0.05 }); });
