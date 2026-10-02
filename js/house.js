'use strict';
/* Twin Pets: The pets' house: rooms, kitchen, bathroom, backyard and playroom. */

/* =====================================================================
   THE HOUSE: rooms
   Both pets are always in the same room. To move, both girls tap the
   same room on the house map (see map.js).
   ===================================================================== */
const ROOMS = {
  playroom: { word: 'playroom', icon: 'roomPlay',    door: '#ffd98a', acts: ['play', 'tricks', 'fivegame', 'dress'] },
  kitchen:  { word: 'kitchen',  icon: 'roomKitchen', door: '#9fd8f0', acts: ['apple', 'fish', 'bone', 'treat'] },
  bathroom: { word: 'bathroom', icon: 'roomBath',    door: '#9fe3cf', acts: ['bath', 'brush'] },
  backyard: { word: 'backyard', icon: 'roomYard',    door: '#b5e39b', acts: ['bounce', 'climb', 'ballgame', 'seesawgame'] },
  bedroom:  { word: 'bedroom',  icon: 'roomBed',     door: '#cdb9f4', acts: ['sleep', 'book'] },
};
const ROOM_ORDER = Object.keys(ROOMS);
// Buttons that only appear once their "new thing" has unlocked: button -> unlock name
const LOCKED_BY = { treat: 'treat', ballgame: 'ball', seesawgame: 'seesaw', fivegame: 'highfive', book: 'book' };
const roomOfAct = act => ROOM_ORDER.find(r => ROOMS[r].acts.includes(act));

const ROOM_MARKUP = {};   // rooms added by other parts of the game draw themselves here
function roomMarkup(room) {
  if (ROOM_MARKUP[room]) return ROOM_MARKUP[room]();
  const tints = '<div class="tint l"></div><div class="tint r"></div>';
  const both = fn => SIDES.map(fn).join('');
  if (room === 'playroom') return `<div class="wall"></div><div class="floor"></div>${tints}
    <div class="deco rug">${ICONS.rug}</div>
    <div class="shelf l"><div class="toys" id="toys-left"></div></div><div class="shelf r"><div class="toys" id="toys-right"></div></div>`;
  if (room === 'kitchen') return `<div class="wall"></div><div class="counter"></div><div class="floor"></div>${tints}
    ${both(s => `<div class="deco bowl side-${s}">${ICONS.bowl}</div>`)}`;
  if (room === 'bathroom') return `<div class="wall"></div><div class="floor"></div>${tints}
    ${both(s => `<div class="deco towel side-${s}">${ICONS.towelHook}</div>`)}
    ${[10, 36, 64, 90].map((x, i) => `<div class="bub" style="left:${x}%; animation-delay:${-i * 3.5}s; animation-duration:${12 + i * 2}s"></div>`).join('')}`;
  if (room === 'backyard') return `<div class="sky"></div>
    <div class="cloud" style="top:14%; animation-delay:-20s"></div>
    <div class="cloud" style="top:27%; animation-delay:-65s; animation-duration:120s"></div>
    <div class="fence"></div>
    <svg class="ground" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 58 C 160 22, 320 44, 500 52 C 690 60, 850 22, 1000 50 L1000 200 L0 200Z" fill="#cdeeb6"/>
      <path d="M0 96 C 200 66, 360 86, 500 90 C 650 94, 810 64, 1000 92 L1000 200 L0 200Z" fill="#b8e29e"/>
    </svg>
    ${both(s => `<div class="deco tramp side-${s}">${ICONS.trampDeco}</div>`)}`;
  return `<div class="wall"></div><div class="floor"></div>${tints}
    ${both(s => `<div class="deco bwindow side-${s}">${ICONS.window}</div>`)}
    <div class="deco cushion">${ICONS.cushion}</div>
    ${both(s => `<div class="deco bed side-${s}">${ICONS.bed}</div>`)}`;
}
const ROOM_EXTRAS = [];   // other parts of the game add things to each room once it's built: (roomEl, room)
const ROOM_HOOKS = [];    // called every time the girls arrive in a room: (room)
function buildRooms() {
  const box = $('#rooms');
  ROOM_ORDER.forEach(r => {
    const d = el('div', 'room room-' + r, roomMarkup(r));
    d.dataset.room = r;
    box.append(d);
    ROOM_EXTRAS.forEach(f => f(d, r));
  });
}
function showRoom(room) {
  S.room = room;
  document.body.dataset.room = room;
  document.querySelectorAll('.room').forEach(r => r.classList.toggle('on', r.dataset.room === room));
  SIDES.forEach(s => tummyLook(s));
  renderCenter();
  renderThings();
  ROOM_HOOKS.forEach(f => f(room));
}

/* ---------- pet faces (for the map) ---------- */
function faceDrawing(side) {
  const svg = document.getElementById(PET_ART[side].drawing).content.querySelector('svg').cloneNode(true);
  svg.setAttribute('viewBox', PET_ART[side].face);
  return svg;
}
function fillFace(box, side) {
  box.innerHTML = '';
  if (PET_ART[side].awake) {
    const img = new Image();
    img.alt = ''; img.draggable = false;
    img.onerror = () => { box.innerHTML = ''; box.append(faceDrawing(side)); };
    img.src = PET_ART[side].awake;
    box.append(img);
  } else {
    box.append(faceDrawing(side));
  }
}
async function fadePets(show) {
  await Promise.all(SIDES.map(s => {
    const r = pets[s].root;
    const frames = [{ opacity: 0, transform: 'translateX(-50%) scale(.7)' }, { opacity: 1, transform: 'translateX(-50%) scale(1)' }];
    const done = animate(r, show ? frames : frames.slice().reverse(), { duration: 280, fill: 'forwards' });
    return done.then(() => { r.style.opacity = show ? '' : '0'; if (done.anim) done.anim.cancel(); });
  }));
}
async function goToRoom(room) {
  setScene('moving');
  Sound.play('door');
  closeSideModes();
  SIDES.forEach(s => {
    const p = pets[s];
    begin(p, 4000);
    if (p.asleep) wakePet(s, true);
    p.root.querySelectorAll('.say').forEach(b => b.remove());
  });
  await Promise.all([movePet('left', 45, 12, 600), movePet('right', 55, 12, 600)]);
  await fadePets(false);
  showRoom(room);
  save();
  await wait(380);
  await fadePets(true);
  await Promise.all([movePet('left', HOME.left.x, HOME.left.y, 650), movePet('right', HOME.right.x, HOME.right.y, 650)]);
  SIDES.forEach(s => { pets[s].busyUntil = 0; });
  endScene();
  if (!S.seen[room]) firstVisitHint(room);
  else if (S.doorNew[room]) {
    delete S.doorNew[room]; save();
    ROOMS[room].acts.forEach(a => { if (LOCKED_BY[a]) newUntil[a] = Date.now() + 6000; });
    renderColumns(); renderCenter();
  }
  glowFreshActs(room);
}
/* The little banner in the middle: a picture and a word you can tap to hear. */
function showHint(icon, word, isNew) {
  const h = $('#hint');
  h.innerHTML = (isNew ? `<div class="hint-new">${ICONS.star}</div>` : '') + `<div class="hint-ico">${ICONS[icon] || ''}</div><div class="hint-word"></div>`;
  sayableInto(h.querySelector('.hint-word'), word);
  h.classList.add('show');
  clearTimeout(h.timer);
  h.timer = setTimeout(() => h.classList.remove('show'), 4500);
  Sound.play('unlock');
}
/* A gentle hint the first time a room is visited: its name and its buttons glow. */
function firstVisitHint(room) {
  S.seen[room] = true;
  delete S.doorNew[room];
  save();
  showHint(ROOMS[room].icon, ROOMS[room].word);
  ROOMS[room].acts.forEach(a => { newUntil[a] = Date.now() + 6000; });
  renderColumns();
  if (room === 'playroom') {        // the first time: show where the house map is
    const m = $('#midbtns .mapbtn');
    if (m) { m.classList.add('hint'); setTimeout(() => m.classList.remove('hint'), 4600); }
  }
}
/* Leaving a room (or changing colors) tidies away anything half-done. */
const sideMode = { left: null, right: null };
const modeTouched = { left: 0, right: 0 };
function closeSideModes() {
  SIDES.forEach(s => { sideMode[s] = null; endBath(s); });
  closeAllPanels();
}

/* =====================================================================
   THE KITCHEN: tummies
   A tummy fills as the pet eats and empties slowly over real time.
   It's drawn as a rounder tummy (only in the kitchen), never a number.
   ===================================================================== */
const HOUR = 3600000;
function tummy(side) {
  const t = S.pets[side];
  return Math.max(0, Math.min(1, t.tummy - (Date.now() - t.tummyAt) / (SETTINGS.tummyHours * HOUR)));
}
function setTummy(side, v) {
  const t = S.pets[side];
  t.tummy = Math.max(0, Math.min(1, v));
  t.tummyAt = Date.now();
  save();
  tummyLook(side);
}
const isFull = side => tummy(side) >= 0.9;
const isHungry = side => tummy(side) < 0.2;
function tummyLook(side) {
  const body = pets[side] && pets[side].art.querySelector('.pet-svg .body');
  if (!body) return;
  const t = S.room === 'kitchen' ? tummy(side) : 0;
  body.style.transform = t > 0.02 ? `scale(${1 + 0.17 * t}, ${1 + 0.05 * t})` : '';
}
function sayFull(p) {
  begin(p, 1400);
  Sound.play('full');
  sayBubble(p, "No thanks, I'm full!");
  petAnim(p, [{ transform: 'rotate(0)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(5deg)' }, { transform: 'rotate(-3deg)' }, { transform: 'rotate(0)' }], { duration: 700 });
}

/* =====================================================================
   THE BATHROOM: bath (fill, bubbles, duck, scrub, dry) and brushing
   ===================================================================== */
const bath = { left: null, right: null };
const bathAct = side => (!bath[side] ? 'bath' : bath[side].step === 'dry' ? 'dry' : 'scrub');
function bathStep(side) {
  const b = bath[side];
  if (!b) return startBath(side);
  if (b.busy) return;
  if (b.step === 'scrub') return scrubPet(side);
  if (b.step === 'dry') return dryPet(side);
}
async function startBath(side) {
  const p = pets[side];
  begin(p, 2600);
  const b = bath[side] = { step: 'scrub', scrubs: 0, busy: true, bubbles: [] };
  const s = petSize(), base = petPoint(p, 0.5, 1), top = base.y - s * 0.4;
  b.tub = el('div', 'tub side-' + side, ICONS.tub);
  Object.assign(b.tub.style, { left: base.x + 'px', top: top + 'px', width: s * 1.2 + 'px', height: s * 0.5 + 'px' });
  world.append(b.tub);
  Sound.play('water');
  const water = b.tub.querySelector('.water');
  water.style.transform = 'scaleY(0)';
  await animate(b.tub, [{ transform: 'translateX(-50%) translateY(40%)', opacity: 0 }, { transform: 'translateX(-50%) translateY(0)', opacity: 1 }], { duration: 450, easing: 'ease-out' });
  if (bath[side] !== b) return;
  await tween(900, t => { water.style.transform = `scaleY(${t})`; }, ease.out);
  if (bath[side] !== b) return;
  for (let i = 0; i < 9; i++) {
    const f = el('div', 'foamball');
    const sz = rand(3.5, 6.5);
    Object.assign(f.style, { left: base.x + (i / 8 - 0.5) * s * 1.05 + rand(-6, 6) + 'px', top: top + s * rand(0.0, 0.05) + 'px', width: sz + 'vmin', height: sz + 'vmin' });
    world.append(f);
    b.bubbles.push(f);
    animate(f, [{ transform: 'translate(-50%,-50%) scale(0)' }, { transform: 'translate(-50%,-50%) scale(1.15)' }, { transform: 'translate(-50%,-50%) scale(1)' }], { duration: 300, delay: i * 70, fill: 'both' });
    setTimeout(() => Sound.play('pop'), i * 70);
  }
  b.duck = el('div', 'duck', ICONS.duck);
  Object.assign(b.duck.style, { left: base.x + s * (side === 'left' ? 0.42 : -0.42) + 'px', top: top - s * 0.02 + 'px' });
  if (side === 'right') b.duck.firstChild.style.transform = 'scaleX(-1)';
  world.append(b.duck);
  onTap(b.duck, () => {
    Sound.play('squeak');
    animate(b.duck.firstChild, [{ transform: b.duck.firstChild.style.transform + ' translateY(0)' }, { transform: b.duck.firstChild.style.transform + ' translateY(-40%)' }, { transform: b.duck.firstChild.style.transform + ' translateY(0)' }], { duration: 400, easing: 'ease-out' });
  });
  b.busy = false;
  mood(p, 'happy', 1500);
  if (has('bathtoys')) sideMode[side] = 'bath';     // bath toys come out
  renderColumn(side);
}
function addFoam(p) {
  const f = el('div', 'foam');
  const sz = rand(10, 16);
  Object.assign(f.style, { left: rand(22, 68) + '%', top: rand(18, 62) + '%', width: sz + '%', height: sz + '%' });
  p.art.append(f);
  animate(f, [{ transform: 'scale(0)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }], { duration: 300, easing: 'ease-out' });
}
async function scrubPet(side) {
  const p = pets[side], b = bath[side];
  if (!b || b.step !== 'scrub' || b.busy) return;
  b.busy = true;
  begin(p, 900);
  Sound.play('scrub');
  const a = petPoint(p, 0.3, 0.42), c = petPoint(p, 0.72, 0.62);
  const sp = prop(ICONS.sponge, 9, a.x, a.y);
  sp.style.zIndex = 14;
  await tween(520, t => {
    sp.style.left = a.x + (c.x - a.x) * t + 'px';
    sp.style.top = a.y + (c.y - a.y) * t + Math.sin(t * Math.PI * 4) * petSize() * 0.05 + 'px';
  });
  sp.remove();
  for (let i = 0; i < 3; i++) addFoam(p);
  mood(p, 'happy', 900);
  petAnim(p, [{ transform: 'rotate(0)' }, { transform: 'rotate(-4deg)' }, { transform: 'rotate(4deg)' }, { transform: 'rotate(0)' }], { duration: 400 });
  S.pets[side].mud = Math.max(0, Math.ceil(S.pets[side].mud) - 1);
  renderMud(side);
  save();
  b.scrubs++;
  if (b.scrubs >= 3) { b.step = 'dry'; renderColumn(side); }
  b.busy = false;
}
async function dryPet(side) {
  const p = pets[side], b = bath[side];
  if (!b || b.busy) return;
  b.busy = true;
  begin(p, 2400);
  const a = petPoint(p, 0.5, 0.05), c = petPoint(p, 0.5, 0.7);
  const tw = prop(ICONS.towel, 16, a.x, a.y);
  tw.classList.add('side-' + side);
  tw.style.zIndex = 14;
  Sound.play('scrub');
  await tween(650, t => {
    tw.style.left = a.x + Math.sin(t * Math.PI * 3) * petSize() * 0.12 + 'px';
    tw.style.top = a.y + (c.y - a.y) * t + 'px';
  });
  tw.remove();
  p.art.querySelectorAll('.foam').forEach(f => f.remove());
  Sound.play('shake');
  petAnim(p, [{ transform: 'rotate(0)' }, { transform: 'rotate(-8deg)' }, { transform: 'rotate(8deg)' }, { transform: 'rotate(-8deg)' }, { transform: 'rotate(8deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(0)' }], { duration: 650 });
  const m = petPoint(p, 0.5, 0.4);
  sparkles(m.x, m.y, 12, ['#9fd8ff', '#c9ecff', '#ffffff', '#7fc4ff']);
  const water = b.tub.querySelector('.water');
  await tween(500, t => { water.style.transform = `scaleY(${1 - t})`; });
  b.bubbles.forEach(f => f.remove());
  if (b.duck) b.duck.remove();
  await animate(b.tub, [{ transform: 'translateX(-50%) translateY(0)', opacity: 1 }, { transform: 'translateX(-50%) translateY(40%)', opacity: 0 }], { duration: 400, fill: 'forwards' });
  endBath(side);
  S.pets[side].mud = 0;
  renderMud(side);
  save();
  mood(p, 'happy', 1800);
  floatHearts(p, 3);
  grantWish(p, 'bath');
  renderColumn(side);
}
function endBath(side) {
  const b = bath[side];
  if (!b) return;
  [b.tub, b.duck, ...(b.bubbles || [])].forEach(e => e && e.remove());
  pets[side].art.querySelectorAll('.foam').forEach(f => f.remove());
  bath[side] = null;
  if (sideMode[side] === 'bath') sideMode[side] = null;
}
const isFluffy = side => Date.now() < S.pets[side].fluffyUntil;
function renderFluffy(side) { pets[side].root.classList.toggle('fluffy', isFluffy(side)); }
async function brushPet(side) {
  const p = pets[side];
  begin(p, 1100);
  grantWish(p, 'brush');
  Sound.play('brush');
  const a = petPoint(p, 0.3, 0.25), c = petPoint(p, 0.7, 0.6);
  const br = prop(ICONS.brush, 10, a.x, a.y);
  br.style.zIndex = 14;
  await tween(560, t => {
    br.style.left = a.x + (c.x - a.x) * t + 'px';
    br.style.top = a.y + (c.y - a.y) * t + Math.sin(t * Math.PI * 4) * petSize() * 0.04 + 'px';
    br.firstChild.style.transform = `rotate(${Math.sin(t * Math.PI * 4) * 20}deg)`;
  });
  br.remove();
  sparkles(c.x, c.y, 4, ['#fff6c8', '#ffffff', '#ffe066']);
  p.brushes = (p.brushes || 0) + 1;
  const was = isFluffy(side);
  if (p.brushes >= 3 || was) {
    p.brushes = 0;
    S.pets[side].fluffyUntil = Date.now() + SETTINGS.fluffyMinutes * 60000;
    save();
    renderFluffy(side);
    if (!was) {
      Sound.play('wish');
      const m = petPoint(p, 0.5, 0.4);
      sparkles(m.x, m.y, 16, ['#fff6c8', '#ffffff', '#ffe066', '#ffd1e6']);
      floatHearts(p, 3);
    }
  }
  mood(p, 'happy', 1200);
}

/* =====================================================================
   THE BACKYARD: trampolines, rainbow climb, mud
   ===================================================================== */
const MUD_SPOTS = [[37, 74, 17], [64, 62, 15], [62, 22, 10]];   // [left %, top %, size %]
function renderMud(side, pop) {
  const box = pets[side].art;
  box.querySelectorAll('.mud').forEach(m => m.remove());
  const n = Math.min(3, Math.floor(S.pets[side].mud));
  MUD_SPOTS.slice(0, n).forEach(([x, y, sz], i) => {
    const m = el('div', 'mud', ICONS.mud);
    Object.assign(m.style, { left: x - sz / 2 + '%', top: y + '%', width: sz + '%', height: sz + '%' });
    box.append(m);
    if (pop && i === n - 1) animate(m, [{ transform: 'scale(0)' }, { transform: 'scale(1.3)' }, { transform: 'scale(1)' }], { duration: 350, easing: 'ease-out' });
  });
}
function addMud(side, amount) {
  const before = Math.floor(S.pets[side].mud);
  S.pets[side].mud = Math.min(3, S.pets[side].mud + amount);
  save();
  if (Math.floor(S.pets[side].mud) > before) { renderMud(side, true); Sound.play('splat'); }
}
const lastBounce = { left: -1e9, right: -1e9 };
function bounce(side) {
  if (!canAct()) return;
  const t = now(), o = other(side);
  grantWish(pets[side], 'bounce');
  if (t - lastBounce[o] < 650) {
    // both girls tapped at the same time: both pets bounce higher!
    lastBounce.left = lastBounce.right = -1e9;
    SIDES.forEach(s => { jump(s, true); addMud(s, 0.15); });
    Sound.play('boing', true);
    setTimeout(() => { const m = midPets(); sparkles(m.x, m.y - H() * 0.25, 14); }, 450);
    togetherMoment('trampoline');
    return;
  }
  lastBounce[side] = t;
  jump(side, false);
  Sound.play('boing', false);
  addMud(side, 0.12);
}
function jump(side, big) {
  const p = pets[side], ms = big ? 1150 : 760;
  begin(p, ms + 100);
  mood(p, 'happy', ms + 300);
  petAnim(p, [
    { transform: 'translateY(0) scale(1.06,.92)' },
    { transform: `translateY(${big ? -95 : -42}%) scale(.96,1.05)`, offset: 0.45 },
    { transform: 'translateY(0) scale(1.08,.9)', offset: 0.9 },
    { transform: 'translateY(0) scale(1,1)' },
  ], { duration: ms, easing: 'ease-in-out' });
  const mat = document.querySelector(`.room-backyard .tramp.side-${side} .mat`);
  if (mat) animate(mat, [{ transform: 'translateY(0)' }, { transform: 'translateY(5px) scaleY(1.3)', offset: 0.08 }, { transform: 'translateY(0)', offset: 0.25 },
    { transform: 'translateY(0)', offset: 0.84 }, { transform: 'translateY(5px) scaleY(1.3)', offset: 0.92 }, { transform: 'translateY(0)' }], { duration: ms });
}

/* --- Rainbow climb: each girl taps to climb her own side. The pets meet
       at the top and slide down together. Whoever gets there first waits. --- */
const CLIMB_STEPS = 8;
let climb = null;
function climbSpot(side, f) {
  const th = side === 'left' ? Math.PI - f * (Math.PI / 2 - 0.14) : f * (Math.PI / 2 - 0.14);
  return { x: 50 + 29.9 * Math.cos(th), y: 10 + 43.9 * Math.sin(th) };
}
async function startClimb() {
  if (!canAct()) return;
  const c = climb = { cur: { left: 0, right: 0 }, target: { left: 0, right: 0 }, top: { left: false, right: false }, busy: true, lastPress: now() };
  SIDES.forEach(s => begin(pets[s], 1e9));
  setScene('climb');
  c.el = el('div', 'rainbow', ICONS.rainbowArc);
  world.append(c.el);
  Sound.play('rainbow');
  animate(c.el, [{ transform: 'translateX(-50%) scaleY(0)', opacity: 0 }, { transform: 'translateX(-50%) scaleY(1)', opacity: 1 }], { duration: 800, easing: 'ease-out' });
  SIDES.forEach(s => { pets[s].lean.style.transform = 'scale(.55)'; mood(pets[s], 'happy', 1500); });
  await Promise.all(SIDES.map(s => { const q = climbSpot(s, 0); return movePet(s, q.x, q.y, 700); }));
  if (climb !== c) return;
  c.busy = false;
  renderColumns();
  requestAnimationFrame(climbLoop);
}
function climbLoop() {
  const c = climb;
  if (!c || c.busy || c.ending) return;
  SIDES.forEach(side => {
    const d = c.target[side] - c.cur[side];
    if (d <= 0) return;
    c.cur[side] += Math.min(d, 0.03);
    const q = climbSpot(side, c.cur[side]);
    setPos(pets[side], q.x, q.y + Math.abs(Math.sin(c.cur[side] * CLIMB_STEPS * Math.PI)) * 2.2);
    if (c.cur[side] >= 1 && !c.top[side]) reachTop(side);
  });
  if (climb === c && !c.busy) requestAnimationFrame(climbLoop);
}
function climbPress(side) {
  const c = climb;
  if (!c || c.busy || c.ending) return;
  c.lastPress = now();
  if (c.top[side]) { hopPet(side); Sound.play('giggle'); return; }   // already up: a happy wiggle while she waits
  c.target[side] = Math.min(1, c.target[side] + 1 / CLIMB_STEPS);
  Sound.play('climbStep', Math.round(c.target[side] * CLIMB_STEPS));
}
function reachTop(side) {
  const c = climb, p = pets[side];
  c.top[side] = true;
  mood(p, 'happy', 60000);
  const m = petPoint(p, 0.5, 0.75);
  sparkles(m.x, m.y, 8);
  Sound.play('pick');
  renderColumn(side);
  if (c.top[other(side)]) slideDown();
  else invite(other(side), 'climbup', 30000);
}
async function slideDown() {
  const c = climb;
  c.busy = true;
  Sound.play('yay');
  pets.left.lean.style.transform = 'scale(.55) rotate(9deg)';
  pets.right.lean.style.transform = 'scale(.55) rotate(-9deg)';
  SIDES.forEach(s => floatHearts(pets[s], 2));
  await wait(1100);
  Sound.play('slide');
  pets.left.lean.style.transform = 'scale(.55) rotate(-22deg)';
  pets.right.lean.style.transform = 'scale(.55) rotate(22deg)';
  await tween(1400, t => SIDES.forEach(s => { const q = climbSpot(s, 1 - t); setPos(pets[s], q.x, q.y); }), t => t * t);
  SIDES.forEach(s => { pets[s].lean.style.transform = 'scale(.55)'; hopPet(s); });
  const m = midPets();
  sparkles(m.x, H() * 0.8, 14);
  togetherMoment('rainbow');
  SIDES.forEach(s => addMud(s, 0.5));
  await wait(700);
  endClimb();
}
async function endClimb() {
  const c = climb;
  if (!c || c.ending) return;
  c.ending = true;
  animate(c.el, [{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: 'forwards' }).then(() => c.el.remove());
  SIDES.forEach(s => { pets[s].lean.style.transform = ''; pets[s].root.classList.remove('happy'); });
  await Promise.all([movePet('left', HOME.left.x, HOME.left.y, 800), movePet('right', HOME.right.x, HOME.right.y, 800)]);
  SIDES.forEach(s => { pets[s].busyUntil = 0; });
  climb = null;
  endScene();
}

/* =====================================================================
   THE PLAYROOM: trick cards
   Tap a card to hear the word. The pet tries the trick and learns it
   after a few tries. Then it does the trick whenever the card is tapped.
   ===================================================================== */
const TRICKS = [
  { key: 'sit',   word: 'sit',       icon: 'trickSit' },
  { key: 'spin',  word: 'spin',      icon: 'trickSpin' },
  { key: 'roll',  word: 'roll over', icon: 'trickRoll' },
  { key: 'wave',  word: 'wave',      icon: 'trickWave' },
  { key: 'dance', word: 'dance',     icon: 'trickDance' },
];
const trickBy = key => TRICKS.find(t => t.key === key);
// pets can wish to show off a trick they know
TRICKS.forEach(t => { WISHES[t.word] = { icon: t.icon, act: 'trick:' + t.key }; });
const knows = (side, key) => (S.pets[side].tricks[key] || 0) >= SETTINGS.triesToLearn;
function renderTrickList(side) {
  const box = $('#tricks-' + side);
  box.innerHTML = '';
  TRICKS.filter(t => knows(side, t.key)).forEach(t => box.append(el('div', '', ICONS[t.icon])));
}
async function trickCard(side, key) {
  if (!canAct()) return;
  const tr = trickBy(key), p = pets[side];
  Speech.say(tr.word);
  modeTouched[side] = now();
  if (knows(side, key)) {
    grantWish(p, 'trick:' + key);
    await doTrick(side, key, true);
    return;
  }
  const tries = (S.pets[side].tricks[key] || 0) + 1;
  S.pets[side].tricks[key] = tries;
  save();
  if (tries < SETTINGS.triesToLearn) {   // still learning: a wobbly try
    Sound.play('tryTrick');
    await doTrick(side, key, false);
    return;
  }
  await doTrick(side, key, true);         // learned it!
  Sound.play('unlock');
  const m = petPoint(p, 0.5, 0.35);
  sparkles(m.x, m.y, 16);
  celebrate(m.x, m.y, 12);
  floatHearts(p, 3);
  sayBubble(p, 'I can ' + tr.word + '!');
  renderTrickList(side);
  renderColumn(side);
}
const DANCE_GROOVE = [
  { transform: 'translateY(0) rotate(0) scaleX(1)' }, { transform: 'translateY(-8%) rotate(-8deg) scaleX(1)', offset: 0.125 },
  { transform: 'translateY(0) rotate(0) scaleX(1)', offset: 0.25 }, { transform: 'translateY(-8%) rotate(8deg) scaleX(1)', offset: 0.375 },
  { transform: 'translateY(0) rotate(0) scaleX(1)', offset: 0.5 }, { transform: 'translateY(-10%) rotate(0) scaleX(-1)', offset: 0.625 },
  { transform: 'translateY(0) rotate(0) scaleX(1)', offset: 0.75 }, { transform: 'translateY(-12%) rotate(0) scaleX(1)', offset: 0.875 },
  { transform: 'translateY(0) rotate(0) scaleX(1)' },
];
async function doTrick(side, key, full) {
  const p = pets[side], dir = side === 'left' ? 1 : -1;
  begin(p, 2300);
  mood(p, 'happy', 2000);
  if (key === 'sit') {
    const sq = full ? 'translateY(6%) scale(1.06,.86)' : 'translateY(2%) scale(1.02,.95)';
    if (full) { p.root.classList.add('wag'); setTimeout(() => p.root.classList.remove('wag'), 1600); }
    return petAnim(p, [{ transform: 'none' }, { transform: sq, offset: 0.3 }, { transform: sq, offset: 0.75 }, { transform: 'none' }], { duration: 1400, easing: 'ease-in-out' });
  }
  if (key === 'spin') {
    return petAnim(p, full
      ? [{ transform: 'translateY(0) scaleX(1)' }, { transform: 'translateY(-8%) scaleX(-1)', offset: 0.25 }, { transform: 'translateY(-8%) scaleX(1)', offset: 0.5 }, { transform: 'translateY(-8%) scaleX(-1)', offset: 0.75 }, { transform: 'translateY(0) scaleX(1)' }]
      : [{ transform: 'scaleX(1) rotate(0)' }, { transform: 'scaleX(.2) rotate(6deg)', offset: 0.45 }, { transform: 'scaleX(1) rotate(-4deg)', offset: 0.75 }, { transform: 'scaleX(1) rotate(0)' }],
      { duration: full ? 1200 : 900, easing: 'ease-in-out' });
  }
  if (key === 'roll') {
    return petAnim(p, full
      ? [{ transform: 'translateY(0) rotate(0)' }, { transform: `translateY(-50%) rotate(${dir * 90}deg)` }, { transform: `translateY(-100%) rotate(${dir * 180}deg)` }, { transform: `translateY(-50%) rotate(${dir * 270}deg)` }, { transform: `translateY(0) rotate(${dir * 360}deg)` }]
      : [{ transform: 'translateY(0) rotate(0)' }, { transform: `translateY(-10%) rotate(${dir * 40}deg)`, offset: 0.5 }, { transform: 'translateY(0) rotate(0)' }],
      { duration: full ? 1300 : 800, easing: 'ease-in-out' });
  }
  if (key === 'wave') {
    const pt = petPoint(p, side === 'left' ? 0.9 : 0.1, full ? 0.22 : 0.42);
    const paw = prop(pawSvg(side), 10, pt.x, pt.y);
    paw.style.zIndex = 12;
    paw.firstChild.style.transformOrigin = '50% 100%';
    await animate(paw.firstChild, full
      ? [{ transform: 'rotate(-22deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(0)' }]
      : [{ transform: 'translateY(30%) rotate(0)' }, { transform: 'translateY(0) rotate(-10deg)' }, { transform: 'translateY(30%) rotate(0)' }],
      { duration: full ? 1500 : 800, easing: 'ease-in-out' });
    paw.remove();
    return;
  }
  // dance
  return petAnim(p, full ? DANCE_GROOVE : DANCE_GROOVE.slice(0, 4).concat([{ transform: 'none' }]), { duration: full ? 2000 : 900 });
}

/* =====================================================================
   THE PLAYROOM: presents
   A full friendship jar brings two wrapped presents. Each girl gives
   hers to her sister's pet. Then there's a party and the jar starts over.
   ===================================================================== */
function itemColor(side, item) { return colorById(S.pets[side].gifted[item]) || colorById(S.colors[side]) || COLORS[0]; }
function renderWear(side) {
  const box = pets[side].art, wear = S.pets[side].wear;
  box.querySelectorAll('.wear').forEach(w => w.remove());
  ['back', 'neck', 'face', 'head'].forEach(slot => {
    const item = wear[slot];
    if (!item || !ITEM_ART[item]) return;
    const [x, y, w, h] = WEAR_SPOT[item];
    const e = el('div', 'wear ' + slot, ITEM_ART[item](itemColor(side, item)));
    Object.assign(e.style, { left: x - w / 2 + '%', top: y + '%', width: w + '%', height: h + '%' });
    box.append(e);
  });
}
function renderToys(side) {
  const box = $('#toys-' + side);
  box.innerHTML = '';
  S.pets[side].owned.filter(i => TOYS.includes(i)).slice(-4).forEach(t => box.append(el('div', '', ITEM_ART[t](itemColor(side, t)))));
}
const NOT_PRESENTS = [];   // things to wear that never come as presents (like Halloween costumes)
function choosePresent(to) {
  const owned = S.pets[to].owned, all = [...Object.keys(WEARABLES).filter(i => !NOT_PRESENTS.includes(i)), ...TOYS];
  let choices = all.filter(i => !owned.includes(i));
  if (!owned.some(i => WEARABLES[i])) choices = choices.filter(i => WEARABLES[i]);   // the first present is something to wear
  return pick(choices.length ? choices : all);
}
let presents = null;
function startPresents() {
  setScene('presents');
  const pr = presents = { given: { left: false, right: false }, box: {} };
  Sound.play('unlock');
  SIDES.forEach(side => {
    const c = colorById(S.colors[side]) || COLORS[0];
    const b = el('div', 'present', ITEM_ART.present(c));
    Object.assign(b.style, { left: (side === 'left' ? 0.19 : 0.81) * W() + 'px', top: H() * 0.83 + 'px' });
    world.append(b);
    pr.box[side] = b;
    animate(b, [{ transform: 'translate(-50%,-50%) translateY(-60vh)' }, { transform: 'translate(-50%,-50%) translateY(2vh)', offset: 0.75 }, { transform: 'translate(-50%,-50%)' }], { duration: 900, delay: side === 'left' ? 0 : 200, easing: 'ease-in', fill: 'backwards' });
    mood(pets[side], 'happy', 1500);
  });
  renderColumns();
}
async function givePresent(side, btn) {
  const pr = presents;
  if (!pr || pr.given[side]) { nudge(btn); return; }
  pr.given[side] = true;
  renderColumn(side);
  const to = other(side), pt = pets[to], b = pr.box[side];
  const c = colorById(S.colors[side]) || COLORS[0];
  const item = choosePresent(to);
  Sound.play('toss');
  await arc(b, { x: parseFloat(b.style.left), y: parseFloat(b.style.top) }, () => petPoint(pt, 0.5, 0.86), 1000, H() * 0.3);
  Sound.play('ribbon');
  animate(b.querySelector('.plid'), [{ transform: 'translateY(0) rotate(0)', opacity: 1 }, { transform: 'translateY(-60%) rotate(-30deg)', opacity: 0 }], { duration: 600, fill: 'forwards' });
  await wait(350);
  Sound.play('open');
  const r = b.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top + r.height * 0.3, 14);
  const g = prop(ITEM_ART[item](c), 10, r.left + r.width / 2, r.top + r.height * 0.3);
  g.style.zIndex = 34;
  const lift = animate(g.firstChild, [{ transform: 'translateY(0) scale(.3)' }, { transform: 'translateY(-14vmin) scale(1.25)' }], { duration: 650, easing: 'ease-out', fill: 'forwards' });
  await lift;
  await wait(450);
  animate(b, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' }).then(() => b.remove());
  const gr = g.firstChild.getBoundingClientRect();
  if (lift.anim) lift.anim.cancel();
  g.style.left = gr.left + gr.width / 2 + 'px';
  g.style.top = gr.top + gr.height / 2 + 'px';
  // remember it
  const ps = S.pets[to];
  if (!ps.owned.includes(item)) ps.owned.push(item);
  ps.gifted[item] = S.colors[side];
  let target;
  if (WEARABLES[item]) {
    ps.wear[WEARABLES[item]] = item;
    const [x, y, , h] = WEAR_SPOT[item];
    target = petPoint(pt, x / 100, (y + h / 2) / 100);
  } else {
    const tb = $('#toys-' + to).getBoundingClientRect();
    target = { x: tb.left + tb.width / 2, y: tb.bottom - H() * 0.03 };
  }
  save();
  await arc(g, { x: parseFloat(g.style.left), y: parseFloat(g.style.top) }, target, 600, H() * 0.06);
  g.remove();
  renderWear(to);
  renderToys(to);
  mood(pt, 'happy', 2400);
  floatHearts(pt, 4);
  Sound.play('thanks');
  sayBubble(pt, 'Thank you, ' + SETTINGS.players[side].girl + '!');
  if (pr.given.left && pr.given.right && !pr.partying) {
    pr.partying = true;
    await wait(2800);
    presentsParty();
  }
}
async function presentsParty() {
  logDay('presents');
  const kind = SURPRISES[S.surprise % SURPRISES.length];
  S.surprise++;
  save();
  setScene('surprise');
  await SURPRISE[kind]();
  logDay(kind);
  await emptyJar();
  SIDES.forEach(s => { pets[s].lean.style.transform = ''; });
  await Promise.all([movePet('left', HOME.left.x, HOME.left.y, 900), movePet('right', HOME.right.x, HOME.right.y, 900)]);
  presents = null;
  save();
  renderCenter();
  endScene();
  PARTY_HOOKS.forEach(f => f());
}
const PARTY_HOOKS = [];   // after the presents party
/* Dress: try on the different hats, bows and crowns the pet was given. */
function cycleDress(side) {
  const ps = S.pets[side], heads = [...new Set(ps.owned.filter(i => WEARABLES[i] === 'head'))];
  if (!heads.length) return;
  const order = [...heads, null];
  ps.wear.head = order[(order.indexOf(ps.wear.head) + 1) % order.length];
  save();
  renderWear(side);
  Sound.play('pick');
  hopPet(side);
  mood(pets[side], 'happy', 900);
  const w = pets[side].art.querySelector('.wear.head');
  if (w) animate(w, [{ transform: 'scale(0)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 350, easing: 'ease-out' });
}
