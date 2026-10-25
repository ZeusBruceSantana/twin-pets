'use strict';
/* Twin Pets: the Playground, a new place in town. A super swing (pump to go high, then jump into the leaves),
   a twisty slide into the sandpit, a merry-go-round that spins faster the more both girls push, and a
   sandpit to dig treasures in. Nobody can fail: every game ends happily. */

const leafSvg = c => `<svg viewBox="0 0 100 100"><path d="M50 8 C 90 30, 90 70, 50 94 C 10 70, 10 30, 50 8Z" fill="${c}"/><path d="M50 20 V90" stroke="#fff" stroke-opacity=".5" stroke-width="5"/></svg>`;
Object.assign(ICONS, {
  playground: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#d9f2ff"/><path d="M0 70 H100 V100 H0Z" fill="#a6dd86"/><path d="M14 80 L26 24 L38 80 M20 26 H70" stroke="#ff8a7a" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 26 V56 M56 26 V56" stroke="#9aa6bd" stroke-width="2.500"/><rect x="40" y="55" width="20" height="5" rx="2.500" fill="#ffd23f"/><path d="M66 40 C 76 40, 80 66, 92 72" stroke="#a77bff" stroke-width="8" fill="none" stroke-linecap="round"/></svg>',
  superswingBtn: '<svg viewBox="0 0 100 100"><path d="M8 94 L22 10 L36 94 M64 94 L78 10 L92 94 M16 12 H84" stroke="#ff8a7a" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 12 L30 62 M50 12 L70 62" stroke="#9aa6bd" stroke-width="3"/><rect x="26" y="60" width="48" height="8" rx="4" fill="#ffd23f"/><path d="M80 40 Q92 30 88 18" stroke="#5aa9ff" stroke-width="5" fill="none" stroke-linecap="round"/></svg>',
  twistyBtn: '<svg viewBox="0 0 100 100"><path d="M16 92 V22 M32 92 V22 M16 40 H32 M16 58 H32 M16 76 H32 M12 22 H36" stroke="#7fc4ff" stroke-width="5" stroke-linecap="round"/><path d="M36 28 C 90 28, 90 48, 56 52 C 20 56, 30 76, 60 76 C 78 76, 84 82, 92 88" stroke="#ff8fb8" stroke-width="11" fill="none" stroke-linecap="round"/></svg>',
  merryBtn: '<svg viewBox="0 0 100 100"><circle cx="50" cy="52" r="40" fill="#ffe9a6" stroke="#ff8fb8" stroke-width="6"/><path d="M50 12 V92 M10 52 H90 M22 24 L78 80 M78 24 L22 80" stroke="#ff8fb8" stroke-width="3"/><circle cx="50" cy="52" r="8" fill="#a77bff"/><circle cx="50" cy="20" r="6" fill="#5aa9ff"/><circle cx="82" cy="52" r="6" fill="#6cc551"/><circle cx="50" cy="84" r="6" fill="#ff7a7a"/><circle cx="18" cy="52" r="6" fill="#ffd23f"/></svg>',
  digBtn: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="80" rx="42" ry="14" fill="#f2d28a"/><path d="M30 80 Q50 50 70 80Z" fill="#e0b564"/><path d="M60 8 L72 40" stroke="#b07f4f" stroke-width="8" stroke-linecap="round"/><path d="M62 38 C 80 38, 84 62, 70 66 C 60 68, 52 50, 62 38Z" fill="#9aa6bd"/></svg>',
  pumpBtn: '<svg viewBox="0 0 100 100"><path d="M24 62 C 30 30, 70 30, 76 62" stroke="#5aa9ff" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M62 54 L78 64 L84 46" stroke="#5aa9ff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 20 V8 M30 26 L22 16 M70 26 L78 16" stroke="#ffd23f" stroke-width="6" stroke-linecap="round"/></svg>',
  jumpBtn: '<svg viewBox="0 0 100 100"><path d="M10 80 C 30 10, 70 10, 90 60" stroke="#ff8fb8" stroke-width="7" fill="none" stroke-dasharray="3 12" stroke-linecap="round"/><path d="M50 30 L57 48 L77 49 L62 61 L67 80 L50 69 L33 80 L38 61 L23 49 L43 48Z" fill="#ffd23f"/></svg>',
  leaf1: leafSvg('#ff9a3c'), leaf2: leafSvg('#e8503a'), leaf3: leafSvg('#ffd23f'),
});

Object.assign(PLACES, { playground: { word: 'playground', icon: 'playground', color: '#cfeeff', acts: ['superswing', 'twisty', 'merry', 'dig', 'puzzle'], need: 'playground' } });
Object.assign(BUTTONS, { superswing: { icon: 'superswingBtn', label: 'Swing' }, twisty: { icon: 'twistyBtn', label: 'Slide' }, merry: { icon: 'merryBtn', label: 'Spin' }, dig: { icon: 'digBtn', label: 'Dig' } });
NEW_THINGS.push({ key: 'playground', order: 24.9, requires: 'trips', icon: 'playground', word: 'playground' });
Object.assign(BOOK_LINES, {
  playground: { line: 'went to the playground.', icon: 'playground', rank: 98 },
  superswing: { line: 'jumped from the super swing into the leaves.', icon: 'superswingBtn', rank: 96.8 },
  merry: { line: 'spun the merry-go-round.', icon: 'merryBtn', rank: 96.7 },
  dig: { line: 'dug up treasure in the sandpit.', icon: 'digBtn', rank: 96.6 },
});

/* the scenery that is always there; each game adds its own pieces when it starts */
PLACE_MARKUP.playground = () => `<div class="tsky playground"></div><div class="cloud" style="top:9%; animation-delay:-8s"></div>
  <div class="ttree l"></div><div class="ttree r"></div><div class="grass"></div>
  <div class="pgpit"><div class="pgsand"></div></div>`;

/* ---------- 1. the super swing ---------- */
const SW_W0 = 7, SW_DAMP = 0.18, SW_MAX = 0.45, SW_HIGH = 0.3;     // pendulum: ω² = 7, slow damping, highest swing, "high enough" to jump
PLACE_PLAN.playground = (a, side) => {
  const sw = a.data.sw;
  if (!sw || !sw.on) return null;
  const q = sw[side];
  const acts = ['pump'];
  if (q.canJump) acts.push('jump');
  acts.push('swquit');
  return { acts, defs: { pump: { icon: 'pumpBtn', label: 'Pump' }, jump: { icon: 'jumpBtn', label: 'Jump!' }, swquit: { icon: 'back', label: 'Back' } }, clsOf: { pump: 'invite', jump: 'invite' } };
};
const swAmp = q => Math.hypot(q.th, q.w / Math.sqrt(SW_W0));
function swApply(p, q) { p.bounce.style.transform = `rotate(${q.th * 57.3}deg)`; }
TRIP_PLAY.superswing = function (a, side, p) {
  if (a.data.sw && a.data.sw.on) return;
  if (a.data.slide && (a.data.slide.busy.left || a.data.slide.busy.right)) return;      // wait for the slide
  const sw = a.data.sw = { on: true, last: now(), left: null, right: null };
  SIDES.forEach(s => {
    const pp = pets[s];
    begin(pp, 600000);
    pp.bounce.style.transformOrigin = '50% -70%';
    const rig = el('div', 'swrig', '<i class="rope l"></i><i class="rope r"></i><i class="seat"></i>');
    pp.bounce.prepend(rig);
    sw[s] = { th: s === 'left' ? 0.2 : -0.2, w: 0, jumps: 0, flying: false, canJump: false, rig };
    swApply(pp, sw[s]);
  });
  sw.frames = ['l', 'r'].map(k => actProp(a, '<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M3 4 H97 M8 4 L0 100 M92 4 L100 100 M22 4 L14 100" stroke="#ff8a7a" stroke-width="9" fill="none" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>',
    { left: k === 'l' ? '10%' : '55%', width: '35%', top: 'calc(88% - 56.1vmin)', height: 'calc(56.1vmin + 4%)' }, 6));
  sw.pile = actProp(a, `<div class="leafpile">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<i style="left:${8 + i * 11}%; bottom:${(i % 3) * 10}%; transform:rotate(${i * 47}deg)">${ICONS['leaf' + (i % 3 + 1)]}</i>`).join('')}</div>`,
    { left: '50%', bottom: '5%', width: '30vmin', height: '11vmin', transform: 'translateX(-50%)' }, 9);
  popIn(sw.pile);
  Sound.play('door');
  const loop = () => {
    if (!sw.on || act !== a) return;
    const t = now(), dt = Math.min(0.05, (t - sw.last) / 1000);
    sw.last = t;
    SIDES.forEach(s => {
      const q = sw[s];
      if (q.flying) return;
      q.w += (-SW_W0 * Math.sin(q.th) - SW_DAMP * q.w) * dt;
      q.th += q.w * dt;
      swApply(pets[s], q);
      const can = swAmp(q) > SW_HIGH && q.jumps < 2;
      if (can !== q.canJump) { q.canJump = can; renderColumn(s); if (can) Sound.play('pick'); }
    });
    sw.raf = requestAnimationFrame(loop);
  };
  sw.raf = requestAnimationFrame(loop);
  a.cleanup.push(() => swStop(sw));
  showHint('superswingBtn', 'swing');
  renderColumns();
};
function swStop(sw) {
  sw.on = false;
  cancelAnimationFrame(sw.raf);
  sw.frames.forEach(f => f.remove());
  if (sw.pile) sw.pile.remove();
  SIDES.forEach(s => {
    const p = pets[s];
    if (sw[s] && sw[s].rig) sw[s].rig.remove();
    p.bounce.style.transform = ''; p.bounce.style.transformOrigin = '';
    p.busyUntil = 0;
  });
}
TRIP_PLAY.pump = function (a, side, p) {
  const sw = a.data.sw, q = sw && sw[side];
  if (!q || q.flying) return;
  const dir = Math.abs(q.w) < 0.05 ? (side === 'left' ? 1 : -1) : Math.sign(q.w);
  q.w += dir * 0.5 * (1 - 0.6 * Math.min(1, Math.abs(q.th) / SW_MAX));          // a bigger push near the bottom
  const amp = swAmp(q);
  if (amp > SW_MAX) q.w *= SW_MAX / amp;
  Sound.play('swing');
  mood(p, 'happy', 700);
};
TRIP_PLAY.jump = async function (a, side, p) {
  const sw = a.data.sw, q = sw && sw[side];
  if (!q || q.flying || !q.canJump) return;
  q.flying = true; q.canJump = false;
  renderColumn(side);
  q.rig.style.visibility = 'hidden';
  const s = petSize(), th = q.th;
  const x0 = p.x - 1.2 * s * Math.sin(th) / W() * 100, y0 = p.y + 1.2 * s * (1 - Math.cos(th)) / H() * 100;      // where the swing let her go
  setPos(p, x0, y0);
  p.bounce.style.transformOrigin = '50% 100%';
  const tx = side === 'left' ? 44 : 56, ty = 14, spin = (side === 'left' ? 1 : -1) * 360, deg0 = th * 57.3;
  p.bounce.style.transform = `rotate(${deg0}deg)`;
  Sound.play('whee');
  sayBubble(p, 'Whee!', 1500);
  mood(p, 'happy', 2200);
  await tween(1000, t => { setPos(p, x0 + (tx - x0) * t, y0 + (ty - y0) * t + 24 * 4 * t * (1 - t)); p.bounce.style.transform = `rotate(${deg0 * (1 - t) + spin * t}deg)`; }, ease.linear);
  p.bounce.style.transform = '';
  Sound.play('leaves');
  const pt = petPoint(p, 0.5, 0.95);
  sparkles(pt.x, pt.y, 10, ['#ff9a3c', '#e8503a', '#ffd23f']);
  for (let i = 0; i < 6; i++) { const lf = prop(ICONS['leaf' + (i % 3 + 1)], 4, pt.x, pt.y); lf.style.zIndex = 31; animate(lf.firstChild, [{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: `translate(${rand(-14, 14)}vmin, ${-rand(12, 24)}vmin) rotate(${rand(-300, 300)}deg)`, opacity: 0 }], { duration: 1200, easing: 'ease-out', fill: 'both' }).then(() => lf.remove()); }
  animate(sw.pile, [{ transform: 'translateX(-50%) scale(1,1)' }, { transform: 'translateX(-50%) scale(1.1,.85)' }, { transform: 'translateX(-50%) scale(1,1)' }], { duration: 500 });
  floatHearts(p, 3);
  celebrate(pt.x, pt.y - 40, 8);
  q.jumps++;
  await wait(900);
  await movePet(side, HOME[side].x, HOME[side].y, 700);
  if (!sw.on) return;
  p.bounce.style.transformOrigin = '50% -70%';
  q.th = 0; q.w = (side === 'left' ? 1 : -1) * 1.2;
  swApply(p, q);
  q.rig.style.visibility = '';
  q.flying = false;
  if (sw.left.jumps >= 2 && sw.right.jumps >= 2) {                // each has jumped twice: a happy ending
    Sound.play('yay');
    swStop(sw);
    togetherMoment('superswing');
    SIDES.forEach(x => { floatHearts(pets[x], 3); mood(pets[x], 'happy', 2000); });
  }
  renderColumns();
};
TRIP_PLAY.swquit = function (a) {
  const sw = a.data.sw;
  if (!sw || !sw.on || SIDES.some(s => sw[s].flying)) return;
  swStop(sw);
  renderColumns();
};

/* ---------- 2. the twisty slide ---------- */
const SL_TOP = 46, SL_X0 = 24, SL_X1 = 45, SL_LADDER = 17;       // deck height (% up), where the deck and the sandpit are (% across)
const slidePoint = (side, t) => {                                // t: 0 at the top, 1 in the sand; the chute winds from side to side
  const m = side === 'left' ? 1 : -1;
  const x = SL_X0 + (SL_X1 - SL_X0) * t + Math.sin(t * Math.PI * 3) * 5 * (1 - t) * 0.9;
  return { x: side === 'left' ? x : 100 - x, y: SL_TOP + (14 - SL_TOP) * Math.pow(t, 0.85) + Math.sin(t * Math.PI * 3 + 1) * 1.2 * m };
};
function slideDraw(side) {
  const pts = Array.from({ length: 41 }, (_, i) => slidePoint(side, i / 40)).map(q => `${(q.x / 100 * 1000).toFixed(1)} ${((100 - q.y) * 10).toFixed(1)}`);
  const d = 'M' + pts.join(' L');
  const dk = side === 'left' ? SL_X0 : 100 - SL_X0, lad = side === 'left' ? SL_LADDER : 100 - SL_LADDER;
  const rungs = Array.from({ length: 8 }, (_, i) => `<path d="M${lad * 10 - 25} ${(100 - 12 - i * 5) * 10} h50" stroke="#7fc4ff" stroke-width="6" stroke-linecap="round"/>`).join('');
  return `<svg viewBox="0 0 1000 1000" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%">
    <path d="M${lad * 10 - 25} ${(100 - SL_TOP) * 10} V${(100 - 12) * 10} M${lad * 10 + 25} ${(100 - SL_TOP) * 10} V${(100 - 12) * 10}" stroke="#5aa9ff" stroke-width="8" stroke-linecap="round" vector-effect="non-scaling-stroke"/>${rungs}
    <path d="M${dk * 10 - 70} ${(100 - SL_TOP) * 10 + 10} h140" stroke="#ff7a9a" stroke-width="18" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    <path d="M${dk * 10} ${(100 - SL_TOP) * 10} V${(100 - 12) * 10}" stroke="#5aa9ff" stroke-width="8" vector-effect="non-scaling-stroke"/>
    <path d="${d}" fill="none" stroke="#c5589a" stroke-width="62" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" transform="translate(0 30)"/>
    <path d="${d}" fill="none" stroke="#ff8fb8" stroke-width="56" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" transform="translate(0 20)"/>
    <path d="${d}" fill="none" stroke="#ffd0e3" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" transform="translate(0 14)"/></svg>`;
}
TRIP_PLAY.twisty = async function (a, side, p) {
  const live = () => act === a;
  const sl = a.data.slide || (a.data.slide = { busy: { left: false, right: false }, drawn: {} });
  if (!sl.drawn[side]) { sl.drawn[side] = actProp(a, slideDraw(side), { inset: 0 }, 5); popIn(sl.drawn[side]); }
  if (sl.busy[side]) return;
  sl.busy[side] = true;
  begin(p, 8000);
  const stop = () => { sl.busy[side] = false; };
  const m = side === 'left' ? 1 : -1, lad = side === 'left' ? SL_LADDER : 100 - SL_LADDER, p0 = slidePoint(side, 0);
  await movePet(side, lad, 12, 450);
  if (!live()) return stop();
  p.root.classList.add('walking');                              // climb the ladder
  Sound.play('climb');
  const tick = setInterval(() => Sound.play('click'), 260);
  await tween(1500, t => live() && setPos(p, lad + Math.sin(t * 18) * 0.5, 12 + (SL_TOP - 12) * t), ease.linear);
  clearInterval(tick);
  if (!live()) return stop();
  p.root.classList.remove('walking');
  await tween(300, t => live() && setPos(p, lad + (p0.x - lad) * t, SL_TOP));
  if (!live()) return stop();
  sayBubble(p, 'Wheee!', 1600);
  Sound.play('slidewhee');
  await tween(1700, t => { if (!live()) return; const q = slidePoint(side, t); setPos(p, q.x, q.y); p.bounce.style.transform = `rotate(${Math.sin(t * Math.PI * 3) * 18 * m + t * 360 * m * (t > .6 ? 1 : 0)}deg)`; }, ease.out);
  if (!live()) return stop();
  p.bounce.style.transform = '';
  Sound.play('sandplop');
  const pt = petPoint(p, 0.5, 0.97);
  sparkles(pt.x, pt.y, 12, ['#f2d28a', '#e0b564', '#fff4d6']);
  animate(p.bounce, [{ transform: 'scale(1.1,.88)' }, { transform: 'scale(1,1)' }], { duration: 400, easing: 'ease-out' });
  mood(p, 'happy', 1500);
  floatHearts(p, 2);
  await wait(700);
  if (!live()) return stop();
  await movePet(side, HOME[side].x, HOME[side].y, 700);
  p.busyUntil = 0;
  sl.busy[side] = false;
};

/* ---------- 3. the merry-go-round ---------- */
const MG_TOP = 520;                                              // top speed, in degrees a second
TRIP_PLAY.merry = function (a, side, p) {
  let m = a.data.merry;
  if (!m) {
    const kinds = (S.friends.have.length >= 3 ? S.friends.have : ['bunny', 'owl', 'duck']).slice(0, 4);
    const seats = [['face', 'left'], kinds[0], ['face', 'right'], kinds[1 % kinds.length], kinds[2 % kinds.length], kinds[3 % kinds.length]];
    const disc = actProp(a, `<div class="mgspin"><i class="mgrim"></i>${[0, 1, 2, 3, 4, 5].map(i => `<div class="mgseat" style="left:${50 + 34 * Math.sin(i * Math.PI / 3)}%; top:${50 - 34 * Math.cos(i * Math.PI / 3)}%"><div class="mgrider"></div></div>`).join('')}<i class="mghub"></i></div>`,
      { left: '50%', bottom: '24%', width: '40vmin', height: '40vmin', transform: 'translateX(-50%)' }, 8);
    m = a.data.merry = { v: 0, ang: 0, last: now(), disc, spin: disc.querySelector('.mgspin'), cheered: false, hearted: false, coast: 0, pressed: { left: -1e9, right: -1e9 }, seats: [...disc.querySelectorAll('.mgrider')] };
    m.seats.forEach((r, i) => { const s = seats[i]; if (Array.isArray(s)) r.append(faceDrawing(s[1])); else r.innerHTML = friendArt(s); });
    popIn(disc);
    showHint('merryBtn', 'merry-go-round');
  }
  const t = now();
  const both = t - m.pressed[other(side)] < 1500;                // when both keep it going it spins more
  m.pressed[side] = t;
  m.v = Math.min(MG_TOP, m.v + (both ? 95 : 60));
  if (!(a.data.slide && a.data.slide.busy[side])) hopPet(side);
  Sound.play('whoosh', Math.min(2, Math.floor(m.v / (MG_TOP / 3))));
  if (!m.running) { m.running = true; m.last = now(); requestAnimationFrame(function loop() { mgFrame(a, m, loop); }); }
};
function mgFrame(a, m, loop) {
  if (act !== a) { m.running = false; return; }
  const t = now(), dt = Math.min(0.05, (t - m.last) / 1000);
  m.last = t;
  m.ang = (m.ang + m.v * dt) % 360;
  m.spin.style.transform = `rotate(${m.ang}deg)`;
  m.seats.forEach(r => { r.style.transform = `rotate(${-m.ang}deg)`; });
  m.v *= Math.exp(-(m.coast > t ? 1.3 : 0.28) * dt);              // friction (a little more right after a cheer, so it eases down)
  if (m.v >= MG_TOP * 0.9 && !m.cheered) {
    m.cheered = true; m.coast = t + 3500;
    Sound.play('yay');
    const r = m.disc.getBoundingClientRect();
    celebrate(r.left + r.width / 2, r.top, 22);
    SIDES.forEach(s => { floatHearts(pets[s], 3); mood(pets[s], 'happy', 2200); });
    if (!m.hearted) { m.hearted = true; togetherMoment('merry'); }
  }
  if (m.v < MG_TOP * 0.35) m.cheered = false;
  if (m.v < 1) { m.v = 0; m.running = false; return; }
  requestAnimationFrame(loop);
}

/* ---------- 4. digging in the sandpit ---------- */
const DIG_THINGS = ['bone', 'ball', 'star', 'heart', 'duck', 'shell'];
TRIP_PLAY.dig = async function (a, side, p) {
  const d = a.data.dig || (a.data.dig = { found: 0, row: actProp(a, '<div class="digrow"></div>', { left: '50%', bottom: '58%', transform: 'translateX(-50%)', width: '40vmin', height: '7vmin' }, 12), busy: { left: false, right: false }, golden: false });
  if (a.data.slide && a.data.slide.busy[side]) return;           // she is on the slide
  if (d.busy[side] || d.golden) { hopPet(side); return; }
  d.busy[side] = true;
  begin(p, 1600);
  const m = side === 'left' ? 1 : -1;
  const pit = a.data.bg.querySelector('.pgsand').getBoundingClientRect(), px = pit.left + pit.width * (side === 'left' ? 0.32 : 0.68), py = pit.top + pit.height * 0.5;
  Sound.play('dig');
  await petAnim(p, [{ transform: 'translateY(0) rotate(0)' }, { transform: `translateY(4%) rotate(${m * 12}deg)` }, { transform: 'translateY(0) rotate(0)' }, { transform: `translateY(4%) rotate(${m * 12}deg)` }, { transform: 'translateY(0) rotate(0)' }], { duration: 800, easing: 'ease-in-out' });
  if (d.found >= DIG_THINGS.length) { d.busy[side] = false; return; }       // the row is full: the golden star is on its way
  sparkles(px, py, 8, ['#f2d28a', '#e0b564', '#fff4d6']);
  const kind = DIG_THINGS[d.found % DIG_THINGS.length], slot = d.found++;
  const t = prop(ICONS[kind], 9, px, py);
  t.style.zIndex = 30;
  Sound.play('treasure');
  await arc(t, { x: px, y: py }, { x: px, y: py - 20 }, 450, 110, 0);
  sparkles(px, py - 120, 8);
  const row = d.row.getBoundingClientRect(), tx = row.left + row.width * (0.08 + slot * 0.168), ty = row.top + row.height / 2;
  await arc(t, { x: px, y: py - 20 }, { x: tx, y: ty }, 600, 60, 0);
  t.remove();
  d.row.append(el('i', '', ICONS[kind]));
  mood(p, 'happy', 1000);
  floatHearts(p, 1);
  d.busy[side] = false;
  p.busyUntil = 0;
  if (d.found >= DIG_THINGS.length && !d.golden) goldenStar(a, d);
};
async function goldenStar(a, d) {
  d.golden = true;
  const pit = a.data.bg.querySelector('.pgsand').getBoundingClientRect(), x = pit.left + pit.width / 2, y = pit.top + pit.height / 2;
  const star = prop(ICONS.star, 4, x, y);
  star.style.zIndex = 30; star.style.color = '#ffd23f';
  Sound.play('wish');
  await tween(1200, t => { star.style.top = y - t * H() * 0.3 + 'px'; star.style.width = star.style.height = 4 + t * 12 + 'vmin'; });
  Sound.play('yay');
  sparkles(x, y - H() * 0.3, 18);
  celebrate(x, y - H() * 0.3, 20);
  SIDES.forEach(s => { floatHearts(pets[s], 3); mood(pets[s], 'happy', 2200); });
  if (S.digPrizeDay !== todayKey()) { S.digPrizeDay = todayKey(); owePrize(); save(); }     // the first golden star each day is a prize
  if (!a.data.digHeart) { a.data.digHeart = true; togetherMoment('dig'); }
  await wait(1500);
  star.remove();
  d.row.innerHTML = ''; d.found = 0; d.golden = false;           // and the sand is ready for more treasure
};

/* ---------- sounds ---------- */
Sound.add('whee', s => { s.tone(s.NOTE(72), 0, 0.9, { to: s.NOTE(91), type: 'triangle', vol: 0.06, echo: 1 }); });
Sound.add('leaves', s => { s.noise(0, 0.45, { filter: 'bandpass', freq: 3000, to: 900, q: 0.8, vol: 0.06 }); s.tone(s.NOTE(79), 0.1, 0.3, { vol: 0.05, echo: 1 }); });
Sound.add('climb', s => { [60, 64, 67, 72].forEach((m, i) => s.tone(s.NOTE(m), i * 0.3, 0.2, { type: 'triangle', vol: 0.04 })); });
Sound.add('sandplop', s => { s.noise(0, 0.3, { filter: 'lowpass', freq: 900, q: 0.5, vol: 0.07 }); s.tone(s.NOTE(55), 0, 0.2, { to: s.NOTE(48), vol: 0.06 }); });
Sound.add('dig', s => { [0, 0.2, 0.4].forEach(t => s.noise(t, 0.16, { filter: 'bandpass', freq: 1800, to: 700, q: 0.7, vol: 0.05 })); });
Sound.add('treasure', s => { [84, 88, 91].forEach((m, i) => s.tone(s.NOTE(m), i * 0.07, 0.4, { vol: 0.06, echo: 1 })); });
Sound.add('whoosh', (s, level = 0) => { s.noise(0, 0.5, { freq: 500 + level * 500, to: 1800 + level * 1200, q: 1.3, vol: 0.04 + level * 0.015 }); s.tone(s.NOTE(60 + level * 5), 0, 0.4, { to: s.NOTE(72 + level * 5), vol: 0.04 }); });
