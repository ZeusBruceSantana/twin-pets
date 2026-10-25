'use strict';
/* Twin Pets: the garage. Each pet picks an instrument and jams, and the two of them play in a band
   together with their animal friends cheering in the crowd. Every note is in the same happy scale,
   so nothing can sound wrong. */

/* ---------- pictures ---------- */
Object.assign(ICONS, {
  roomGarage: '<svg viewBox="0 0 100 100"><path d="M10 88 V40 L50 14 L90 40 V88Z" fill="#e8d8c4" stroke="#b9a58a" stroke-width="4" stroke-linejoin="round"/><rect x="22" y="48" width="56" height="40" fill="#fff" stroke="#b9a58a" stroke-width="3"/><path d="M22 58 H78 M22 68 H78 M22 78 H78" stroke="#c9bba6" stroke-width="3"/><path d="M44 36 V26 L58 22 V32" fill="none" stroke="#ff7a9a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="42" cy="37" r="4" fill="#ff7a9a"/><circle cx="56" cy="33" r="4" fill="#ff7a9a"/></svg>',
  guitar: '<svg viewBox="0 0 100 100"><path d="M60 40 L88 12" stroke="#8a5a3c" stroke-width="7" stroke-linecap="round"/><rect x="80" y="2" width="14" height="10" rx="2" fill="#5d4a3a" transform="rotate(-45 87 7)"/><path d="M40 34 C 52 28, 60 36, 58 46 C 68 50, 66 64, 56 72 C 46 86, 22 86, 16 72 C 10 58, 22 52, 28 48 C 26 38, 32 34, 40 34Z" fill="#ff9a4d" stroke="#c25e10" stroke-width="3" stroke-linejoin="round"/><circle cx="40" cy="60" r="8" fill="#5d3a22"/><path d="M42 58 L72 32" stroke="#fff" stroke-width="1.5"/></svg>',
  keys: '<svg viewBox="0 0 100 100"><rect x="6" y="28" width="88" height="48" rx="6" fill="#3e3a4f" stroke="#2b2838" stroke-width="3"/><rect x="12" y="44" width="76" height="26" rx="3" fill="#fff"/><path d="M24 44 V70 M36 44 V70 M48 44 V70 M60 44 V70 M72 44 V70" stroke="#9aa6bd" stroke-width="1.5"/><g fill="#3e3a4f"><rect x="20" y="44" width="8" height="15"/><rect x="32" y="44" width="8" height="15"/><rect x="56" y="44" width="8" height="15"/><rect x="68" y="44" width="8" height="15"/></g><circle cx="20" cy="36" r="2.4" fill="#ffd23f"/><circle cx="30" cy="36" r="2.4" fill="#ff8fb8"/></svg>',
  drumkit: '<svg viewBox="0 0 100 100"><path d="M20 72 V52 C 20 44, 80 44, 80 52 V72 C 80 82, 20 82, 20 72Z" fill="#ff9ab4" stroke="#c23b5e" stroke-width="3"/><ellipse cx="50" cy="52" rx="30" ry="9" fill="#fff4f8" stroke="#c23b5e" stroke-width="3"/><path d="M26 56 L38 76 L50 56 L62 76 L74 56" fill="none" stroke="#c23b5e" stroke-width="2.5"/><path d="M16 14 L42 40 M84 14 L58 40" stroke="#b07f4f" stroke-width="5" stroke-linecap="round"/><circle cx="14" cy="12" r="5" fill="#ffd23f"/><circle cx="86" cy="12" r="5" fill="#ffd23f"/></svg>',
  tambourine: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="#ffd23f" stroke="#e0a800" stroke-width="5"/><circle cx="50" cy="50" r="25" fill="#fff4cf" stroke="#e0a800" stroke-width="3"/><g fill="#c9a000"><circle cx="50" cy="14" r="5"/><circle cx="86" cy="50" r="5"/><circle cx="50" cy="86" r="5"/><circle cx="14" cy="50" r="5"/></g><path d="M38 54 q12 -14 24 0" stroke="#ff7a9a" stroke-width="4" fill="none" stroke-linecap="round"/></svg>',
  trumpet: '<svg viewBox="0 0 100 100"><path d="M10 50 H62 L90 30 V70 L62 50" fill="#ffd23f" stroke="#c9a000" stroke-width="4" stroke-linejoin="round"/><path d="M26 44 V32 M40 44 V32 M54 44 V32" stroke="#c9a000" stroke-width="5" stroke-linecap="round"/><path d="M10 50 C 4 50, 4 64, 12 64 H56" fill="none" stroke="#c9a000" stroke-width="4" stroke-linecap="round"/></svg>',
  bandBtn: '<svg viewBox="0 0 100 100"><path d="M26 66 L40 18 H60 L74 66Z" fill="#fff6c8" opacity=".7"/><rect x="8" y="64" width="84" height="24" rx="5" fill="#a77bff" stroke="#6a3fc7" stroke-width="3"/><path d="M50 12 l5 11 l12 1 l-9 8 l3 12 l-11 -6.500 l-11 6.500 l3 -12 l-9 -8 l12 -1z" fill="#ffd23f" stroke="#e0a800" stroke-width="2"/></svg>',
});

/* ---------- the garage room ---------- */
ROOMS.garage = { word: 'garage', icon: 'roomGarage', door: '#ffd0a6', acts: ['jam', 'instrument', 'band', 'dance'], feature: 'garage' };
FEATURE_OF.dance = 'dance';
ROOM_ORDER.push('garage');
ROOM_MARKUP.garage = () => `<div class="wall"></div><div class="floor"></div><div class="tint l"></div><div class="tint r"></div>
  <div class="deco gdoor"></div><div class="deco gamp l"><i></i><i></i></div><div class="deco gamp r"><i></i><i></i></div>
  <div class="deco gposter l">${ICONS.guitar}</div><div class="deco gposter r">${ICONS.drumkit}</div>`;
DECOR_ROOMS.push('garage');
const INSTRUMENTS = { guitar: 'guitar', keys: 'keys', drumkit: 'drums', mic: 'mic', tambourine: 'tambourine', trumpet: 'trumpet' };
Object.assign(BUTTONS, {
  jam: { icon: 'note', label: 'Jam' }, instrument: { icon: 'guitar', label: 'Pick' }, band: { icon: 'bandBtn', label: 'Band' }, dance: { icon: 'wave', label: 'Dance' },
});
NEW_THINGS.push({ key: 'garage', order: 27, requires: 'puzzles', room: 'garage', acts: ['jam', 'instrument', 'band'], icon: 'roomGarage', word: 'garage' });   // (Dance comes a little later)
BOOK_LINES.band = { line: 'played music in a band.', icon: 'note', rank: 97.6 };
COOLDOWN.bandjam = 20000;
const myInstrument = side => (INSTRUMENTS[S.band && S.band[side]] ? S.band[side] : side === 'left' ? 'guitar' : 'keys');

/* The instrument each pet is holding in the garage. */
function renderInstrument(side) {
  const p = pets[side];
  if (!p) return;
  let e = p.root.querySelector('.instr');
  const kind = myInstrument(side);
  if (!e) { e = el('div', 'instr side-' + side); p.root.append(e); }
  if (e.dataset.kind !== kind) { e.dataset.kind = kind; e.innerHTML = ICONS[kind]; }
}
DRESS_HOOKS.push(renderInstrument);

/* ---------- playing a note ---------- */
const PENTA = [0, 2, 4, 7, 9, 12, 14, 16];        // a happy scale: any order sounds good
const MELODY = [0, 1, 2, 1, 0, 1, 2, 4, 3, 2, 1, 0, 2, 3, 4, 5, 4, 3, 2, 1];
Sound.add('inst-guitar', (s, n) => { const m = 52 + PENTA[n % PENTA.length]; s.tone(s.NOTE(m), 0, 0.7, { type: 'triangle', vol: 0.09, attack: 0.005, echo: 1 }); s.tone(s.NOTE(m + 12), 0, 0.3, { type: 'sine', vol: 0.03 }); });
Sound.add('inst-keys', (s, n) => { const m = 72 + PENTA[n % PENTA.length]; s.tone(s.NOTE(m), 0, 0.6, { vol: 0.07, echo: 1 }); s.tone(s.NOTE(m - 12), 0, 0.5, { type: 'triangle', vol: 0.03 }); });
Sound.add('inst-mic', (s, n) => { const m = 64 + PENTA[n % PENTA.length]; s.tone(s.NOTE(m), 0, 0.7, { to: s.NOTE(m + 1), type: 'sine', vol: 0.08, attack: 0.08, echo: 1 }); });
Sound.add('inst-trumpet', (s, n) => { const m = 60 + PENTA[n % PENTA.length]; s.tone(s.NOTE(m), 0, 0.55, { type: 'sawtooth', vol: 0.03, attack: 0.04 }); s.tone(s.NOTE(m), 0, 0.55, { type: 'triangle', vol: 0.05, attack: 0.04 }); });
Sound.add('inst-tambourine', s => { [0, 0.05, 0.1].forEach(t => s.noise(t, 0.07, { filter: 'highpass', freq: 6000, vol: 0.05 })); s.tone(s.NOTE(100), 0, 0.12, { vol: 0.02 }); });
Sound.add('inst-drumkit', (s, n) => {
  const k = n % 4;
  if (k === 0) { s.tone(110, 0, 0.25, { to: 45, vol: 0.2 }); s.noise(0, 0.05, { filter: 'lowpass', freq: 400, vol: 0.05 }); }
  else if (k === 2) { s.noise(0, 0.18, { filter: 'bandpass', freq: 1800, q: 0.8, vol: 0.08 }); s.tone(190, 0, 0.1, { to: 140, vol: 0.06 }); }
  else if (k === 1) s.noise(0, 0.05, { filter: 'highpass', freq: 7000, vol: 0.05 });
  else s.tone(150, 0, 0.3, { to: 85, vol: 0.12 });
});
Sound.add('bandbeat', (s, step) => {
  if (step % 4 === 0) s.tone(100, 0, 0.2, { to: 45, vol: 0.09 });
  if (step % 4 === 2) s.noise(0, 0.1, { filter: 'bandpass', freq: 1800, q: 0.8, vol: 0.035 });
  s.noise(0, 0.03, { filter: 'highpass', freq: 7500, vol: 0.015 });
  if (step % 8 === 0) s.tone(s.NOTE(40), 0, 0.5, { vol: 0.05, type: 'sine' });
  if (step % 8 === 4) s.tone(s.NOTE(43), 0, 0.5, { vol: 0.05, type: 'sine' });
});
Sound.add('bandchord', s => { [60, 64, 67, 72].forEach(m => s.tone(s.NOTE(m), 0, 0.9, { vol: 0.06, echo: 1 })); });
Sound.add('cheer', s => { s.noise(0, 0.9, { filter: 'bandpass', freq: 1500, q: 0.5, vol: 0.07, attack: 0.15 }); [76, 79, 83].forEach((m, i) => s.tone(s.NOTE(m), 0.1 + i * 0.1, 0.4, { vol: 0.05, echo: 1 })); });

function notePlay(side, n) {
  const kind = myInstrument(side);
  Sound.play('inst-' + kind, n);
  const p = pets[side];
  const lean = side === 'left' ? 1 : -1;
  const moves = {
    guitar: [{ transform: 'rotate(0)' }, { transform: `rotate(${-4 * lean}deg) translateY(-3%)` }, { transform: `rotate(${3 * lean}deg)` }, { transform: 'rotate(0)' }],
    keys: [{ transform: 'translateY(0)' }, { transform: 'translateY(-6%)' }, { transform: 'translateY(0)' }],
    drumkit: [{ transform: 'scale(1)' }, { transform: 'scale(1.05,.94)' }, { transform: 'scale(1)' }],
    mic: [{ transform: 'translateY(0)' }, { transform: 'translateY(-5%) scale(1.04)' }, { transform: 'translateY(0)' }],
    tambourine: [{ transform: 'rotate(0)' }, { transform: 'rotate(-7deg)' }, { transform: 'rotate(7deg)' }, { transform: 'rotate(-4deg)' }, { transform: 'rotate(0)' }],
    trumpet: [{ transform: 'rotate(0)' }, { transform: `rotate(${-6 * lean}deg) translateY(-5%)` }, { transform: 'rotate(0)' }],
  };
  begin(p, 300);
  petAnim(p, moves[kind], { duration: 360, easing: 'ease-out' });
  const pt = petPoint(p, rand(0.3, 0.7), 0.1);
  const nt = prop(ICONS.note, rand(3.4, 4.6), pt.x, pt.y);
  nt.style.color = (colorById(S.colors[side]) || COLORS[0]).main;
  nt.style.zIndex = 31;
  animate(nt.firstChild, [{ transform: 'translate(0,0) scale(.4)', opacity: 1 }, { transform: `translate(${rand(-5, 5)}vmin, ${-rand(12, 18)}vmin) scale(1) rotate(${rand(-25, 25)}deg)`, opacity: 0 }], { duration: 1300, easing: 'ease-out', fill: 'both' }).then(() => nt.remove());
  const e = p.root.querySelector('.instr');
  if (e) animate(e, [{ transform: 'scale(1)' }, { transform: 'scale(1.15) rotate(-6deg)' }, { transform: 'scale(1)' }], { duration: 300 });
}

/* ---------- the garage buttons ---------- */
const jamN = { left: 0, right: 0 }, lastJam = { left: -1e9, right: -1e9 };
ACT_HANDLERS.jam = side => {
  notePlay(side, MELODY[jamN[side]++ % MELODY.length]);
  lastJam[side] = now();
  if (now() - lastJam[other(side)] < 1000) {              // both playing at once: a happy chord
    Sound.play('bandchord');
    const m = midPets();
    sparkles(m.x, m.y - H() * 0.2, 8, ['#ffd23f', '#ff8fb8', '#7fd1ff']);
    togetherMoment('bandjam');
    lastJam.left = lastJam.right = -1e9;
  }
};
ACT_HANDLERS.instrument = side => {
  Sound.play('door');
  openPanel(side, {
    head: side, cols: 3, keepOpen: true,
    items: Object.entries(INSTRUMENTS).map(([k, w]) => ({ key: k, icon: ICONS[k], word: w, cls: myInstrument(side) === k ? 'on' : '' })),
    onPick: (k, card) => {
      S.band[side] = k;
      save();
      renderInstrument(side);
      notePlay(side, 2);
      panels[side] && panels[side].querySelectorAll('.scard').forEach(c => c.classList.toggle('on', c.dataset.key === k));
    },
  });
};
const bandTaps = { left: -1e9, right: -1e9 };
ACT_HANDLERS.band = side => {                                   // both tap Band: the show begins
  bandTaps[side] = now();
  notePlay(side, 4);
  if (now() - bandTaps[other(side)] < SETTINGS.doorWindowMs) { bandTaps.left = bandTaps.right = -1e9; startActivity('band', side); }
  else invite(other(side), 'band', SETTINGS.doorWindowMs);
};

/* ---------- the band plays a show ---------- */
const BAND_NOTES = 10;                                           // notes each girl plays to finish the song
ACTIVITIES.band = {
  async start(a) {
    a.data.n = { left: 0, right: 0 };
    a.data.step = 0;
    document.body.classList.add('on-stage');
    a.cleanup.push(() => document.body.classList.remove('on-stage'));
    // the stage: curtains, lights and a crowd of animal friends
    actProp(a, '<div class="curtain l"></div><div class="curtain r"></div><div class="stagefloor"></div>', { inset: 0 }, 6).classList.add('stagebg');
    a.data.lights = [0, 1].map(i => actProp(a, '<div class="beam"></div>', { left: (i ? 62 : 38) + '%', top: 0, width: '30vmin', height: '70%', transform: 'translateX(-50%)' }, 7));
    a.data.lights.forEach((l, i) => l.classList.add('spot', i ? 'r' : 'l'));
    const crowd = (S.friends.have.length ? S.friends.have : ['bunny', 'owl', 'duck']).slice(0, 8);
    a.data.crowd = crowd.map((k, i) => {
      const x = 14 + (72 / Math.max(1, crowd.length - 1)) * i;
      const e = actProp(a, `<div class="fan">${friendArt(k)}</div>`, { left: (crowd.length === 1 ? 50 : x) + '%', bottom: '1%', width: '9vmin', height: '9vmin', transform: 'translateX(-50%)' }, 12);
      e.dataset.kind = k;
      return e;
    });
    await Promise.all([movePet('left', 36, 14, 700), movePet('right', 64, 14, 700)]);
    SIDES.forEach(s => { renderInstrument(s); mood(pets[s], 'happy', 1400); });
    Sound.play('bandchord');
    a.data.beat = setInterval(() => { if (act === a && !a.ending) Sound.play('bandbeat', a.data.step++ % 8); }, 330);
    a.cleanup.push(() => clearInterval(a.data.beat));
    showHint('bandBtn', 'band');
  },
  plan(a, side) {
    const kind = myInstrument(side);
    return { acts: ['bandplay'], big: true, defs: { bandplay: { svg: ICONS[kind], label: '' } }, cls: a.data.n[side] >= BAND_NOTES ? 'done' : 'invite' };
  },
  async press(a, side) {
    const d = a.data;
    notePlay(side, MELODY[d.n[side]++ % MELODY.length]);
    const crowd = d.crowd[Math.floor(Math.random() * d.crowd.length)];            // someone in the crowd dances along
    animate(crowd.firstChild, [{ transform: 'translateY(0)' }, { transform: 'translateY(-30%) rotate(8deg)' }, { transform: 'translateY(0)' }], { duration: 400, easing: 'ease-out' });
    animate(d.lights[side === 'left' ? 0 : 1], [{ opacity: 0.5 }, { opacity: 1 }, { opacity: 0.5 }], { duration: 400 });
    if (d.n[side] === BAND_NOTES) { renderColumn(side); invite(other(side), 'bandplay', 6000); }
    if (d.n.left >= BAND_NOTES && d.n.right >= BAND_NOTES && !d.ending) {
      d.ending = true;
      a.busy = true;
      await wait(700);
      clearInterval(d.beat);
      Sound.play('bandchord');                                                      // the big finish
      await wait(500);
      Sound.play('cheer');
      d.crowd.forEach((c, i) => animate(c.firstChild, [{ transform: 'translateY(0)' }, { transform: 'translateY(-60%) rotate(-10deg)' }, { transform: 'translateY(0)' }, { transform: 'translateY(-40%) rotate(10deg)' }, { transform: 'translateY(0)' }], { duration: 1200, delay: i * 90, easing: 'ease-out' }));
      SIDES.forEach(s => { floatHearts(pets[s], 4); animate(pets[s].bounce, [{ transform: 'rotate(0)' }, { transform: 'rotate(8deg) translateY(8%)' }, { transform: 'rotate(0)' }], { duration: 900 }); });
      celebrate(W() / 2, H() * 0.4, 26);
      await wait(2200);
      endActivity(true, 'band', a);
    }
  },
};
BUTTONS.bandplay = { icon: 'note', label: '' };

/* ---------- Dance Paws: paw prints drift down to each pet; tap when one reaches the ring and she dances.
   Missing one just makes a little wiggle (the music never stops). A big star needs both girls: a twin spin. ---------- */
NEW_THINGS.push({ key: 'dance', order: 27.5, requires: 'garage', room: 'garage', acts: ['dance'], icon: 'wave', word: 'dance' });
BOOK_LINES.dance = { line: 'danced to the music in the garage.', icon: 'wave', rank: 97.4 };
const danceTaps = { left: -1e9, right: -1e9 };
ACT_HANDLERS.dance = side => {
  danceTaps[side] = now();
  notePlay(side, 2);
  if (now() - danceTaps[other(side)] < SETTINGS.doorWindowMs) { danceTaps.left = danceTaps.right = -1e9; startActivity('dance', side); }
  else invite(other(side), 'dance', SETTINGS.doorWindowMs);
};
const PAW_TOTAL = 12, PAW_FALL = 1800, PAW_WINDOW = 450;
const DANCE_MOVES = ['spin', 'sit', 'roll', 'wave', 'dance'];
ACTIVITIES.dance = {
  async start(a) {
    const d = a.data;
    d.hits = { left: 0, right: 0 };
    d.spawned = { left: 0, right: 0 };
    d.paws = [];
    d.step = 0;
    d.star = null;
    const glow = actProp(a, '', { inset: 0 }, 5);
    glow.classList.add('discoglow');
    SIDES.forEach(s => {
      const ring = prop('<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="7" stroke-dasharray="10 9"/></svg>', 11, petPoint(pets[s], 0.5, 0.0).x, petPoint(pets[s], 0.5, 0.0).y);
      ring.style.color = (colorById(S.colors[s]) || COLORS[0]).main;
      ring.style.zIndex = 14;
      a.cleanup.push(() => ring.remove());
      d.ring = d.ring || {};
      d.ring[s] = ring;
    });
    Sound.play('bandchord');
    showHint('wave', 'dance');
    d.beat = setInterval(() => danceTick(a), 600);
    a.cleanup.push(() => { clearInterval(d.beat); d.paws.forEach(p => p.el.remove()); });
  },
  plan(a, side) { return { acts: ['dancepaw'], big: true, defs: { dancepaw: { icon: 'wave', label: '' } }, cls: 'invite' }; },
  press(a, side) { danceHit(a, side); },
};
function danceTick(a) {
  const d = a.data;
  if (act !== a || a.ending) return;
  Sound.play('bandbeat', d.step % 8);
  d.step++;
  SIDES.forEach((s, i) => {
    if (d.step % 2 === i % 2 && d.spawned[s] < PAW_TOTAL) { d.spawned[s]++; spawnPaw(a, s, false); }
  });
  if (d.step % 8 === 4 && d.step > 4 && !d.star) spawnPaw(a, 'star', true);
  const live = d.paws.filter(p => !p.gone);
  if (d.spawned.left >= PAW_TOTAL && d.spawned.right >= PAW_TOTAL && !live.length && !d.ending) danceFinale(a);
}
function spawnPaw(a, side, star) {
  const d = a.data;
  const tgt = star ? { x: W() / 2, y: petPoint(pets.left, 0.5, 0.0).y } : petPoint(pets[side], 0.5, 0.0);
  const y0 = H() * 0.16;
  const e = prop(star ? ICONS.star : pawSvg(side === 'left' ? 'left' : 'right'), star ? 10 : 8, tgt.x, y0);
  e.style.zIndex = 15;
  if (star) e.style.color = '#ffc93c';
  e.classList.add('dpaw');
  const o = { el: e, side, star, arrive: now() + PAW_FALL, gone: false, hit: { left: false, right: false } };
  d.paws.push(o);
  if (star) d.star = o;
  animate(e, [{ top: y0 + 'px' }, { top: tgt.y + 'px' }], { duration: PAW_FALL, easing: 'linear', fill: 'forwards' });
  e.style.pointerEvents = 'auto';
  onPress(e, ev => danceHit(a, ev.clientX < W() / 2 ? 'left' : 'right'));
  setTimeout(() => { if (!o.gone) { o.gone = true; if (star) d.star = null; animate(e, [{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: 'forwards' }).then(() => e.remove()); if (!star) { mood(pets[side], 'happy', 500); } } }, PAW_FALL + PAW_WINDOW);
}
function danceHit(a, side) {
  const d = a.data;
  if (a.ending) return;
  const t = now();
  const near = d.paws.filter(p => !p.gone && !p.hit[side] && (p.side === side || p.star) && Math.abs(p.arrive - t) < PAW_WINDOW).sort((x, y) => Math.abs(x.arrive - t) - Math.abs(y.arrive - t))[0];
  if (!near) { petAnim(pets[side], [{ transform: 'rotate(-3deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(0)' }], { duration: 300 }); return; }   // no paw yet: just a wiggle
  near.hit[side] = true;
  const r = near.el.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top + r.height / 2, 6);
  if (near.star) {
    Sound.play('inst-keys', 5);
    if (near.hit.left && near.hit.right) {                                     // both girls: a twin spin
      near.gone = true; d.star = null;
      near.el.remove();
      Sound.play('bandchord');
      SIDES.forEach(s => { doTrick(s, 'spin', true); floatHearts(pets[s], 3); });
      celebrate(W() / 2, H() * 0.4, 14);
    }
    return;
  }
  near.gone = true;
  near.el.remove();
  d.hits[side]++;
  Sound.play('inst-keys', MELODY[d.hits[side] % MELODY.length]);
  doTrick(side, DANCE_MOVES[d.hits[side] % DANCE_MOVES.length], false);
  mood(pets[side], 'happy', 900);
}
async function danceFinale(a) {
  const d = a.data;
  d.ending = true;
  a.busy = true;
  clearInterval(d.beat);
  Sound.play('cheer');
  SIDES.forEach(s => { doTrick(s, 'dance', true); floatHearts(pets[s], 4); });
  celebrate(W() / 2, H() * 0.4, 24);
  await wait(2300);
  endActivity(true, 'dance', a);
}
