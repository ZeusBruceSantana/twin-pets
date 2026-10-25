'use strict';
/* Twin Pets: Bubble Party at the park. Each pet blows bubbles; the girls pop them and every pop is a
   rising note. When both have popped enough, a giant bubble with both pets inside floats up, and
   both girls tap it together. Nothing is ever lost: bubbles just float away. */

ICONS.bubble = '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#dff4ff" fill-opacity=".6" stroke="#7fc4ff" stroke-width="4"/><path d="M26 40 C 30 28, 40 22, 52 22" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="70" cy="68" r="5" fill="#fff" opacity=".7"/><path d="M62 90 L86 66" stroke="#b07f4f" stroke-width="5" stroke-linecap="round"/></svg>';
BUTTONS.bubbles = { icon: 'bubble', label: 'Bubbles' };
NEW_THINGS.push({ key: 'bubbles', order: 25.5, requires: 'trips', icon: 'bubble', word: 'bubbles' });
BOOK_LINES.bubbles = { line: 'had a bubble party in the park.', icon: 'bubble', rank: 96.7 };
const BUBBLE_NEED = 10;                                  // pops each girl needs before the giant bubble
const BUBBLE_SCALE = [0, 2, 4, 7, 9, 12, 14, 16];
Sound.add('bubblepop', (s, n) => { const m = 76 + BUBBLE_SCALE[n % BUBBLE_SCALE.length]; s.tone(s.NOTE(m), 0, 0.35, { vol: 0.07, echo: 1 }); s.noise(0, 0.04, { filter: 'highpass', freq: 5000, vol: 0.04 }); });
Sound.add('wandblow', s => { s.noise(0, 0.35, { filter: 'bandpass', freq: 2200, q: 0.6, vol: 0.04, attack: 0.1 }); });

TRIP_PLAY.bubbles = function (a, side, p) {
  if (!a.data.bub) startBubbles(a);
  const b = a.data.bub;
  if (b.giant) { hopPet(side); return; }
  blowBubbles(a, side);
};
function startBubbles(a) {
  const field = actProp(a, '<div class="bubmeter c"></div>', { inset: 0 }, 29);
  field.classList.add('bubfield');
  const b = a.data.bub = { field, pops: { left: 0, right: 0 }, alive: [], giant: null, taps: { left: false, right: false } };
  a.cleanup.push(() => { b.alive.forEach(e => e.remove()); });
  renderBubMeters(a);
  showHint('bubble', 'bubbles');
}
function renderBubMeters(a) {                       // one shared meter: both girls fill it together
  const b = a.data.bub, m = b.field.querySelector('.bubmeter');
  const on = SIDES.reduce((n, s) => n + Math.min(BUBBLE_NEED, b.pops[s]), 0);
  m.innerHTML = Array.from({ length: BUBBLE_NEED * 2 }, (_, i) => `<i class="${i < on ? 'on' : ''}"></i>`).join('');
}
function blowBubbles(a, side) {
  const b = a.data.bub, p = pets[side];
  Sound.play('wandblow');
  begin(p, 900);
  mood(p, 'happy', 900);
  petAnim(p, [{ transform: 'scale(1)' }, { transform: 'scale(1.06,.94)' }, { transform: 'scale(1)' }], { duration: 500 });
  const col = (colorById(S.colors[side]) || COLORS[0]).main;
  for (let i = 0; i < 4; i++) {
    if (b.alive.length > 16) { const old = b.alive.shift(); old.remove(); }
    const m = petPoint(p, 0.5, 0.12);
    const size = rand(7, 11);
    const e = el('div', 'bub', '<i></i>');
    Object.assign(e.style, { left: m.x + rand(-6, 6) * 8 + 'px', top: m.y + 'px', width: size + 'vmin', height: size + 'vmin', '--c': col, '--dur': rand(9, 13) + 's', animationDelay: i * 0.18 + 's', '--sway': rand(-9, 9) + 'vmin' });
    e.dataset.side = side;
    onPress(e, ev => popBubble(a, e, ev));
    b.field.append(e);
    b.alive.push(e);
    setTimeout(() => { b.alive = b.alive.filter(x => x !== e); e.remove(); }, 14000);
  }
}
function popBubble(a, e, ev) {
  const b = a.data.bub;
  if (!b || e.popped) return;
  e.popped = true;
  const tapper = ev && ev.clientX < W() / 2 ? 'left' : 'right';
  const r = e.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top + r.height / 2, 6, ['#bfe6ff', '#ffffff', e.style.getPropertyValue('--c') || '#ff8fb8']);
  Sound.play('bubblepop', b.pops[tapper]);
  e.classList.add('popped');
  setTimeout(() => e.remove(), 250);
  b.alive = b.alive.filter(x => x !== e);
  if (e.dataset.side !== tapper) { floatHearts(pets[e.dataset.side], 1); }          // popped a bubble her sister blew: a heart for her sister
  b.pops[tapper] = Math.min(BUBBLE_NEED, b.pops[tapper] + 1);
  mood(pets[tapper], 'happy', 700);
  renderBubMeters(a);
  if (b.pops.left >= BUBBLE_NEED && b.pops.right >= BUBBLE_NEED && !b.giant) giantBubble(a);
}
function giantBubble(a) {
  const b = a.data.bub;
  const g = el('div', 'bub giant', `<i></i><div class="inside"></div>`);
  const inside = g.querySelector('.inside');
  SIDES.forEach(s => { const f = el('div', 'rider'); f.append(faceDrawing(s)); inside.append(f); });
  Object.assign(g.style, { left: '50%', top: '58%', width: '30vmin', height: '30vmin', '--c': '#ffd9f0' });
  b.field.append(g);
  b.giant = g;
  b.alive.forEach(x => x.remove());
  b.alive = [];
  Sound.play('wish');
  SIDES.forEach(s => invite(s, 'bubbles', 10000));
  onPress(g, ev => {
    const s = ev.clientX < W() / 2 ? 'left' : 'right';
    if (b.taps[s]) return;
    b.taps[s] = true;
    Sound.play('bubblepop', 3);
    animate(g, [{ transform: 'translate(-50%,-50%) scale(1)' }, { transform: 'translate(-50%,-50%) scale(1.08)' }, { transform: 'translate(-50%,-50%) scale(1)' }], { duration: 300 });
    g.classList.add(s === 'left' ? 'tapl' : 'tapr');
    if (b.taps.left && b.taps.right) endGiant(a);
    else setTimeout(() => { if (a.data.bub === b && !(b.taps.left && b.taps.right)) { b.taps.left = b.taps.right = false; g.classList.remove('tapl', 'tapr'); } }, SETTINGS.doorWindowMs);
  });
}
async function endGiant(a) {
  const b = a.data.bub;
  Sound.play('yay');
  const r = b.giant.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top + r.height / 2, 20, ['#bfe6ff', '#ffffff', '#ff8fb8', '#ffd23f', '#a6e08a']);
  celebrate(r.left + r.width / 2, r.top + r.height / 2, 24);
  b.giant.classList.add('popped');
  SIDES.forEach(s => { floatHearts(pets[s], 4); mood(pets[s], 'happy', 2000); });
  await wait(500);
  b.giant.remove();
  b.field.remove();
  a.data.bub = null;
  togetherMoment('bubbles');
}
