'use strict';
/* Twin Pets: The heart of the game: saving, sounds, the pets, together moments, the jar, games, wishes and the memory book. */

/* =====================================================================
   4. SAVING (local storage on this device)
   ===================================================================== */
const SAVE_KEY = 'twin-pets-save-v1';
function freshPet() {
  return {
    asleep: false,
    tummy: 0.35, tummyAt: Date.now(),   // how full the tummy is (0 to 1) and when that was
    mud: 0,                             // 0 to 3 muddy spots
    fluffyUntil: 0,                     // brushed fur sparkles until this time
    tricks: {},                         // tries for each trick: { spin: 2 }
    owned: [],                          // presents this pet has been given
    gifted: {},                         // who gave each present (her color)
    wear: { head: null, neck: null, face: null },   // what the pet is wearing
    spa: {},                            // spa day looks (just for today)
  };
}
function freshSave() {
  return {
    version: 2,
    colors: { left: null, right: null },
    pets: { left: freshPet(), right: freshPet() },
    together: 0,            // how many together moments so far
    jar: 0,                 // hearts in the friendship jar
    surprise: 0,            // which surprise comes next
    unlocked: {},           // which new things have appeared
    book: {},               // memory book: { '2026-10-01': ['chase', 'treat'] }
    sound: { muted: false, volume: 0.7 },
    room: 'playroom',
    seen: {},               // rooms already visited (for the first-visit hint)
    doorNew: {},            // rooms with something new inside
    features: {},           // new things that have introduced themselves
    intro: { session: 0, given: 0 },
    freshActs: [],          // new buttons waiting in another room
    fridge: {},             // food from the garden: { tomato: 2 }
    garden: [null, null, null, null],   // what grows in each garden spot
    letters: [],            // letters from the grown-up corner: { text, at, read }
    schoolWords: [],        // this week's school words (typed in the grown-up corner)
    timer: { minutes: 0, endsAt: 0 },   // the play timer (0 = off)
    bedtime: false,         // the play timer ran out: asleep until a grown-up wakes them
    birthday: null,         // the pets' birthday: { month: 1-12, day: 1-31 }
    photos: [],             // photo booth pictures for the memory book
    kindPending: 0,         // kindness hearts a grown-up added, waiting to drop in the jar
    paintings: [],          // paintings from the art easel, hanging on the walls: { img, room }
    decor: {},              // decorations in each room: { playroom: { wp, rug, items: [] } }
  };
}
function merge(base, extra) {
  if (!extra || typeof extra !== 'object') return base;
  for (const k of Object.keys(extra)) {
    const v = extra[k];
    if (v && typeof v === 'object' && !Array.isArray(v) && base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) merge(base[k], v);
    else base[k] = v;
  }
  return base;
}
function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) return merge(freshSave(), JSON.parse(raw));
  } catch (e) { /* no saving available: play anyway */ }
  return freshSave();
}
let S = loadSave();
let erasing = false;   // true while "Start over" is wiping everything
function save() {
  if (erasing) return;
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
}

/* =====================================================================
   5. LITTLE HELPERS
   ===================================================================== */
const $ = (sel, root = document) => root.querySelector(sel);
const SIDES = ['left', 'right'];
const other = side => (side === 'left' ? 'right' : 'left');
const wait = ms => new Promise(r => setTimeout(r, ms));
const rand = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const now = () => performance.now();
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}
const ease = {
  inOut: t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  out: t => 1 - Math.pow(1 - t, 3),
  linear: t => t,
};
/* Run fn(progress) every frame for ms milliseconds. */
function tween(ms, fn, easing = ease.inOut) {
  return new Promise(resolve => {
    const t0 = now();
    function frame() {
      const t = Math.min(1, (now() - t0) / ms);
      fn(easing(t));
      if (t < 1) requestAnimationFrame(frame); else resolve();
    }
    requestAnimationFrame(frame);
  });
}
/* Play a Web Animation; resolves when it ends or is cancelled. */
function animate(elm, frames, opts) {
  try {
    const a = elm.animate(frames, opts);
    const done = new Promise(r => { a.onfinish = r; a.oncancel = r; });
    done.anim = a;
    return done;
  } catch (e) { return Promise.resolve(); }
}
function todayKey(d = new Date()) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
const colorById = id => COLORS.find(c => c.id === id);

/* Tap handling: react the instant a finger touches (so both girls can tap at once). */
function onTap(elm, fn) {
  elm.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    Sound.unlock();
    fn(e);
  });
}
/* For things browsers only allow on a finished tap (starting sound, full screen):
   look pressed when the finger goes down, act when it lifts. */
function onRelease(elm, fn) {
  let armed = false;
  elm.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    armed = true;
    elm.classList.add('down');
  });
  const cancel = () => { armed = false; elm.classList.remove('down'); };
  elm.addEventListener('pointerup', e => {
    if (!armed) return;
    cancel();
    Sound.unlock();
    fn(e);
  });
  elm.addEventListener('pointercancel', cancel);
  elm.addEventListener('pointerleave', cancel);
}
/* Same, plus a pressed-down look. */
function onPress(elm, fn) {
  onTap(elm, e => {
    elm.classList.add('down');
    setTimeout(() => elm.classList.remove('down'), 160);
    fn(e);
  });
}

/* =====================================================================
   6. SOUNDS — all made in code, kept soft and gentle
   ===================================================================== */
const Sound = (() => {
  let ctx = null, master = null, echo = null, music = null, noiseBuf = null, primed = false;
  const NOTE = m => 440 * Math.pow(2, (m - 69) / 12);

  function init() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC(); } catch (e) { return null; }
    master = ctx.createGain();
    const soft = ctx.createBiquadFilter(); soft.type = 'lowpass'; soft.frequency.value = 5000;
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -20; comp.ratio.value = 4;
    master.connect(soft); soft.connect(comp); comp.connect(ctx.destination);
    // a soft echo makes chimes sparkle
    echo = ctx.createGain();
    const d = ctx.createDelay(1); d.delayTime.value = 0.22;
    const fb = ctx.createGain(); fb.gain.value = 0.28;
    const wet = ctx.createGain(); wet.gain.value = 0.22;
    echo.connect(d); d.connect(fb); fb.connect(d); d.connect(wet); wet.connect(master);
    newMusicBus();
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const ch = noiseBuf.getChannelData(0);
    for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
    applyVolume();
    return ctx;
  }
  function newMusicBus() { music = ctx.createGain(); music.connect(master); }
  function applyVolume() {
    if (!master) return;
    const v = S.sound.muted ? 0 : S.sound.volume * S.sound.volume;
    master.gain.setTargetAtTime(v, ctx.currentTime, 0.02);
  }
  function unlock() {
    const c = init();
    if (!c) return;
    if (c.state !== 'running') { try { c.resume(); } catch (e) { /* ignore */ } }
    if (!primed) { // iPad needs a sound started during a tap
      const b = c.createBuffer(1, 1, 22050), s = c.createBufferSource();
      s.buffer = b; s.connect(c.destination); s.start(0); primed = true;
    }
  }
  function tone(f, at, dur, o = {}) {
    const t = ctx.currentTime + at;
    const osc = ctx.createOscillator();
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(f, t);
    if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t + (o.glide || dur));
    const g = ctx.createGain();
    const v = o.vol == null ? 0.15 : o.vol;
    const a = o.attack == null ? 0.012 : o.attack;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g); g.connect(o.music ? music : master);
    if (o.echo) g.connect(echo);
    osc.start(t); osc.stop(t + dur + 0.05);
  }
  function noise(at, dur, o = {}) {
    const t = ctx.currentTime + at;
    const s = ctx.createBufferSource(); s.buffer = noiseBuf;
    const f = ctx.createBiquadFilter(); f.type = o.filter || 'bandpass';
    f.frequency.setValueAtTime(o.freq || 1200, t);
    if (o.to) f.frequency.exponentialRampToValueAtTime(o.to, t + dur);
    f.Q.value = o.q == null ? 1 : o.q;
    const g = ctx.createGain(); const v = o.vol == null ? 0.05 : o.vol;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + (o.attack || 0.01));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(o.music ? music : master);
    s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
  }
  // notes: [[midiNote or null for a rest, beats], ...]
  function melody(notes, bpm, o = {}) {
    const beat = 60 / bpm;
    let at = o.at || 0;
    for (const [m, b] of notes) {
      if (m != null) tone(NOTE(m + (o.shift || 0)), at, Math.max(0.12, b * beat * (o.legato || 0.9)),
        { type: o.type || 'triangle', vol: o.vol == null ? 0.1 : o.vol, attack: o.attack, echo: o.echo, music: o.music });
      at += b * beat;
    }
    return at;
  }
  const k3 = () => pick([0, 2, 4, 7]); // small pitch changes keep repeats pleasant

  const lib = {
    tap() { tone(NOTE(pick([72, 74, 76, 79, 81])), 0, 0.12, { vol: 0.06 }); },
    soft() { tone(NOTE(62), 0, 0.16, { type: 'triangle', vol: 0.06 }); },
    pick() { const k = k3(); tone(NOTE(76 + k), 0, 0.3, { vol: 0.09, echo: 1 }); tone(NOTE(83 + k), 0.09, 0.4, { vol: 0.08, echo: 1 }); },
    eat() {
      const k = k3();
      for (let i = 0; i < 3; i++) tone(NOTE(57 + k), i * 0.22, 0.14, { type: 'triangle', to: NOTE(50 + k), vol: 0.14 });
      tone(NOTE(79 + k), 0.72, 0.3, { vol: 0.08, echo: 1 });
      tone(NOTE(84 + k), 0.84, 0.45, { vol: 0.08, echo: 1 });
    },
    play() {
      const k = k3();
      tone(NOTE(60 + k), 0, 0.26, { to: NOTE(72 + k), vol: 0.12 });
      [72, 76, 79].forEach((m, i) => tone(NOTE(m + k), 0.26 + i * 0.09, 0.22, { type: 'triangle', vol: 0.08, echo: 1 }));
    },
    giggle() { const k = k3(); [84, 88, 84, 88, 91].forEach((m, i) => tone(NOTE(m + k), i * 0.07, 0.09, { vol: 0.05, to: NOTE(m + k + 2) })); },
    sleep() { [79, 76, 72, 67].forEach((m, i) => tone(NOTE(m), i * 0.3, 0.7, { vol: 0.08, attack: 0.05, echo: 1 })); },
    wake() { [72, 76, 79, 84].forEach((m, i) => tone(NOTE(m), i * 0.1, 0.32, { type: 'triangle', vol: 0.08, echo: 1 })); },
    toss() { noise(0, 0.5, { freq: 500, to: 2200, q: 1.4, vol: 0.05 }); },
    catch() { tone(NOTE(79), 0, 0.12, { to: NOTE(86), vol: 0.1 }); },
    thanks() {
      tone(NOTE(79), 0, 0.2, { type: 'triangle', vol: 0.11, to: NOTE(81) });
      tone(NOTE(76), 0.2, 0.36, { type: 'triangle', vol: 0.11, to: NOTE(72), glide: 0.3 });
      tone(NOTE(88), 0.6, 0.5, { vol: 0.05, echo: 1 });
    },
    unlock() { [72, 74, 76, 79, 81, 84, 88].forEach((m, i) => tone(NOTE(m), i * 0.08, 0.5, { vol: 0.06, echo: 1 })); },
    chase() {
      const tune = [[72, .5], [76, .5], [79, .5], [76, .5], [74, .5], [77, .5], [81, .5], [77, .5],
                    [76, .5], [79, .5], [84, .5], [79, .5], [77, .5], [74, .5], [72, 1],
                    [72, .5], [76, .5], [79, .5], [84, .5], [81, .5], [79, .5], [76, .5], [74, .5], [72, 1.5]];
      melody(tune, 200, { vol: 0.07, legato: 0.5, music: 1 });
      melody([[48, 1], [55, 1], [50, 1], [57, 1], [52, 1], [59, 1], [53, 1], [55, 1], [48, 1], [55, 1], [53, 1], [55, 1], [48, 2]], 200, { vol: 0.07, type: 'sine', legato: 0.5, music: 1 });
    },
    lullaby() {
      const tune = [[67, 1], [76, 1], [74, 1], [72, 2], [null, 1], [69, 1], [72, 1], [74, 3],
                    [67, 1], [76, 1], [74, 1], [72, 2], [null, 1], [74, 1], [71, 1], [72, 4]];
      melody(tune, 92, { type: 'sine', vol: 0.09, legato: 1, attack: 0.06, echo: 1, music: 1 });
      [[48, 0, 6], [55, 0, 6], [53, 6.5, 6], [48, 6.5, 6]].forEach(([m, at, d]) => tone(NOTE(m), at, d, { vol: 0.035, attack: 1.2, music: 1 }));
    },
    heart() { [88, 91, 96].forEach((m, i) => tone(NOTE(m), i * 0.08, 0.4, { vol: 0.06, echo: 1 })); },
    gameStart() { [67, 72, 76].forEach((m, i) => tone(NOTE(m), i * 0.09, 0.25, { type: 'triangle', vol: 0.08 })); },
    throw() { noise(0, 0.35, { freq: 700, to: 2600, q: 1.4, vol: 0.045 }); tone(NOTE(72), 0, 0.25, { to: NOTE(84), vol: 0.06 }); },
    seesaw() {
      const k = k3();
      tone(NOTE(67 + k), 0, 0.4, { to: NOTE(79 + k), vol: 0.09 });
      tone(NOTE(55 + k), 0.05, 0.35, { to: NOTE(48 + k), type: 'triangle', vol: 0.06 });
    },
    pawUp() { tone(NOTE(76), 0, 0.16, { to: NOTE(81), vol: 0.06 }); },
    clap() {
      noise(0, 0.12, { filter: 'highpass', freq: 1500, vol: 0.12 });
      noise(0.025, 0.1, { filter: 'bandpass', freq: 2500, vol: 0.08 });
      [84, 88, 91].forEach((m, i) => tone(NOTE(m), 0.05 + i * 0.06, 0.4, { vol: 0.06, echo: 1 }));
    },
    yay() {
      [72, 76, 79, 84].forEach((m, i) => tone(NOTE(m), i * 0.1, 0.3, { type: 'triangle', vol: 0.08, echo: 1 }));
      [72, 76, 79].forEach(m => tone(NOTE(m), 0.42, 0.8, { vol: 0.05, echo: 1 }));
    },
    ribbon() { noise(0, 0.3, { freq: 3000, to: 6000, vol: 0.035 }); tone(NOTE(88), 0.08, 0.35, { vol: 0.06, echo: 1 }); },
    open() {
      tone(NOTE(60), 0, 0.14, { to: NOTE(84), vol: 0.12 });
      [96, 93, 91, 88, 84, 88, 91, 96].forEach((m, i) => tone(NOTE(m), 0.12 + i * 0.07, 0.4, { vol: 0.045, echo: 1 }));
    },
    picnic() {
      const tune = [[72, 1], [76, 1], [79, 1], [81, 2], [79, 1], [76, 1], [74, 1], [72, 1], [74, 3],
                    [76, 1], [79, 1], [81, 1], [84, 2], [81, 1], [79, 1], [76, 1], [74, 1], [72, 3]];
      melody(tune, 168, { vol: 0.08, legato: 0.55, music: 1, echo: 1 });
      const bass = [[48, 3], [55, 3], [53, 3], [55, 3], [48, 3], [53, 3], [55, 3], [48, 3]];
      melody(bass, 168, { vol: 0.07, type: 'sine', legato: 0.4, music: 1 });
    },
    dance() {
      const bpm = 120, beat = 60 / bpm;
      const bass = [36, 48, 36, 48, 33, 45, 33, 45, 29, 41, 29, 41, 31, 43, 31, 43];
      for (let i = 0; i < 16; i++) {
        tone(150, i * beat, 0.2, { to: 45, vol: 0.18, music: 1 });                       // soft kick
        noise(i * beat + beat / 2, 0.05, { filter: 'highpass', freq: 7000, vol: 0.025, music: 1 }); // tick
        tone(NOTE(bass[i]), i * beat, 0.25, { type: 'triangle', vol: 0.08, music: 1 });
      }
      const riff = [[79, .5], [76, .5], [79, .5], [81, 1], [79, .5], [76, 1], [72, .5], [74, .5], [76, 1], [null, 2],
                    [79, .5], [76, .5], [79, .5], [84, 1], [81, .5], [79, 1], [76, .5], [74, .5], [72, 1], [null, 2]];
      melody(riff, bpm, { vol: 0.07, legato: 0.6, music: 1, echo: 1 });
    },
    balloons() {
      const up = [72, 74, 76, 79, 81, 84, 86, 88];
      for (let i = 0; i < 32; i++) tone(NOTE(up[i % 8] - (Math.floor(i / 8) % 2) * 5), i * 0.25, 0.3, { vol: 0.05, echo: 1, music: 1 });
      [[48, 0], [53, 2], [55, 4], [48, 6]].forEach(([m, at]) => tone(NOTE(m), at, 2, { vol: 0.04, attack: 0.3, music: 1 }));
    },
    bubble() { tone(NOTE(72), 0, 0.22, { vol: 0.06, to: NOTE(74) }); tone(NOTE(76), 0.2, 0.3, { vol: 0.06, to: NOTE(79) }); },
    wish() { [84, 88, 91, 96].forEach((m, i) => tone(NOTE(m), i * 0.07, 0.45, { vol: 0.055, echo: 1 })); },
    page() { noise(0, 0.25, { freq: 2500, to: 1200, q: 0.8, vol: 0.04 }); },
    // ----- the house -----
    knock() { tone(NOTE(67), 0, 0.12, { type: 'triangle', vol: 0.08 }); tone(NOTE(72), 0.11, 0.2, { type: 'triangle', vol: 0.08 }); },
    door() { noise(0, 0.5, { freq: 600, to: 1800, q: 0.8, vol: 0.03 }); [72, 79, 84].forEach((m, i) => tone(NOTE(m), 0.12 + i * 0.1, 0.5, { vol: 0.06, echo: 1 })); },
    water() { noise(0, 1.3, { filter: 'lowpass', freq: 500, to: 1400, vol: 0.06, attack: 0.25 }); for (let i = 0; i < 5; i++) tone(rand(700, 1200), 0.4 + i * 0.16, 0.07, { to: rand(1300, 1800), vol: 0.035 }); },
    pop() { const f = rand(800, 1300); tone(f, 0, 0.07, { to: f * 1.6, vol: 0.035 }); },
    squeak() { tone(NOTE(88), 0, 0.12, { to: NOTE(93), vol: 0.07, type: 'triangle' }); tone(NOTE(93), 0.12, 0.1, { to: NOTE(86), vol: 0.06, type: 'triangle' }); },
    scrub() { for (let i = 0; i < 3; i++) noise(i * 0.17, 0.14, { freq: 2600, q: 2, vol: 0.035 }); },
    shake() { for (let i = 0; i < 6; i++) noise(i * 0.07, 0.05, { freq: 3200, vol: 0.03 }); [84, 88].forEach((m, i) => tone(NOTE(m), 0.45 + i * 0.08, 0.35, { vol: 0.05, echo: 1 })); },
    brush() { noise(0, 0.4, { freq: 4200, to: 2200, q: 1, vol: 0.03 }); tone(NOTE(96 - k3()), 0.32, 0.3, { vol: 0.03, echo: 1 }); },
    boing(big) {
      const k = k3();
      tone(NOTE(55 + k), 0, big ? 0.5 : 0.35, { to: NOTE((big ? 84 : 72) + k), vol: 0.1 });
      if (big) [79, 84, 88].forEach((m, i) => tone(NOTE(m + k), 0.3 + i * 0.08, 0.4, { vol: 0.05, echo: 1 }));
    },
    rainbow() { [72, 76, 79, 83, 86, 88, 91].forEach((m, i) => tone(NOTE(m), i * 0.07, 0.6, { vol: 0.045, echo: 1 })); },
    climbStep(n) { const up = [60, 62, 64, 67, 69, 72, 74, 76, 79]; tone(NOTE(up[Math.min(8, n)] + 12), 0, 0.25, { type: 'triangle', vol: 0.07, echo: 1 }); },
    slide() { tone(NOTE(86), 0, 1.3, { to: NOTE(62), vol: 0.07 }); tone(NOTE(79), 0.05, 1.3, { to: NOTE(55), vol: 0.04, type: 'triangle' }); },
    full() { tone(NOTE(76), 0, 0.2, { type: 'triangle', vol: 0.08 }); tone(NOTE(72), 0.2, 0.32, { type: 'triangle', vol: 0.08 }); },
    splat() { noise(0, 0.16, { filter: 'lowpass', freq: 520, vol: 0.09 }); tone(NOTE(48), 0, 0.12, { to: NOTE(43), vol: 0.06 }); },
    tryTrick() { tone(NOTE(72), 0, 0.15, { vol: 0.06, type: 'triangle' }); tone(NOTE(74), 0.16, 0.28, { vol: 0.05, type: 'triangle', to: NOTE(76) }); },
    morning() { [67, 72, 76, 79, 84].forEach((m, i) => tone(NOTE(m), i * 0.12, 0.5, { type: 'triangle', vol: 0.07, echo: 1 })); },
  };

  return {
    unlock,
    applyVolume,
    /* Other parts of the game add their own sounds: Sound.add('name', (s, ...args) => s.tone(...)) */
    add(name, maker) { lib[name] = (...args) => maker({ tone, noise, melody, NOTE, k3 }, ...args); },
    play(name, ...args) {
      if (S.sound.muted) return;
      const c = init();
      if (!c || !lib[name]) return;
      if (c.state !== 'running') { try { c.resume(); } catch (e) { /* ignore */ } }
      try { lib[name](...args); } catch (e) { /* never let a sound break the game */ }
    },
    stopMusic() {
      if (!ctx || !music) return;
      const old = music;
      old.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
      setTimeout(() => old.disconnect(), 1500);
      newMusicBus();
    },
  };
})();

/* =====================================================================
   7. TAP-TO-HEAR (the browser's built-in voice)
   ===================================================================== */
const Speech = {
  voice: null,
  init() {
    if (!('speechSynthesis' in window)) return;
    const choose = () => {
      const voices = speechSynthesis.getVoices().filter(v => /^en[-_]/i.test(v.lang));
      const liked = [/Aria/i, /Jenny/i, /Ava/i, /Samantha/i, /Natural/i, /Zira/i, /Karen/i, /Google US English/i];
      for (const re of liked) {
        const v = voices.find(x => re.test(x.name));
        if (v) { this.voice = v; return; }
      }
      this.voice = voices.find(v => /en[-_]US/i.test(v.lang)) || voices[0] || null;
    };
    choose();
    if (speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', choose);
    else speechSynthesis.onvoiceschanged = choose;
  },
  say(text) {
    if (!text || S.sound.muted || !('speechSynthesis' in window)) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; u.rate = 0.8; u.pitch = 1.1;
      u.volume = Math.max(0.3, S.sound.volume);
      if (this.voice) u.voice = this.voice;
      if (speechSynthesis.speaking || speechSynthesis.pending) {
        speechSynthesis.cancel();
        setTimeout(() => speechSynthesis.speak(u), 80);
      } else {
        speechSynthesis.speak(u);
      }
    } catch (e) { /* ignore */ }
  },
};
/* Turn text into words that can each be tapped and heard. */
function wordsInto(container, text) {
  container.innerHTML = '';
  text.split(' ').forEach((w, i) => {
    if (i) container.append(' ');
    const s = el('span', 'word');
    s.textContent = w;
    s.dataset.say = w.replace(/[^A-Za-z']/g, '');
    container.append(s);
  });
}
/* One tappable chunk (for names). */
function sayableInto(container, text) {
  container.innerHTML = '';
  const s = el('span', 'word');
  s.textContent = text; s.dataset.say = text;
  container.append(s);
}
let wordDown = null;
document.addEventListener('pointerdown', e => {
  wordDown = e.target.closest && e.target.closest('.word');
  if (wordDown) e.preventDefault();
});
document.addEventListener('pointerup', e => {
  const w = e.target.closest && e.target.closest('.word');
  if (!w || w !== wordDown) return;
  wordDown = null;
  Sound.unlock();
  Speech.say(w.dataset.say || w.textContent);
  w.classList.remove('said'); void w.offsetWidth; w.classList.add('said');
});

/* =====================================================================
   8. THE SCREEN
   ===================================================================== */
const stage = $('#stage');
const world = $('#world');
const cols = { left: $('#col-left'), right: $('#col-right') };
const pets = {};
const HOME   = { left: { x: 29.5, y: 12 }, right: { x: 70.5, y: 12 } };
const CUDDLE = { left: { x: 41.5, y: 12 }, right: { x: 58.5, y: 12 } };

let scene = 'boot';   // boot, pick, title, play, chase, goodnight, night, morning
function setScene(s) {
  if (s !== 'play') SIDES.forEach(side => { inviteUntil[side] = {}; });
  scene = s;
  document.body.dataset.scene = s;
  renderColumns();
}

function applyColors(left = S.colors.left, right = S.colors.right) {
  const r = document.documentElement.style;
  const L = colorById(left), R = colorById(right);
  const set = (p, c) => {
    if (c) { r.setProperty(p, c.main); r.setProperty(p + '-light', c.light); r.setProperty(p + '-dark', c.dark); }
    else { r.removeProperty(p); r.removeProperty(p + '-light'); r.removeProperty(p + '-dark'); }
  };
  set('--L', L); set('--R', R);
}

function fillArt(box, side, useDrawing) {
  const cfg = PET_ART[side];
  box.innerHTML = '';
  const photo = cfg.awake && !useDrawing;
  box.classList.toggle('photo', !!photo);
  box.classList.toggle('has-asleep', !!(photo && cfg.asleep));
  if (photo) {
    const add = (src, cls) => {
      const img = new Image();
      img.className = cls; img.alt = ''; img.draggable = false;
      img.onerror = () => {                          // file missing? use the drawing
        fillArt(box, side, true);
        if (pets[side] && box === pets[side].art) { renderMud(side); renderWear(side); tummyLook(side); }
      };
      img.src = src;
      box.append(img);
    };
    add(cfg.awake, 'img-awake');
    if (cfg.asleep) add(cfg.asleep, 'img-asleep');
  } else {
    box.append(document.getElementById(cfg.drawing).content.cloneNode(true));
  }
}

function buildScene() {
  buildRooms();
  // stars for night time
  const night = $('#night');
  $('#moon').innerHTML = ICONS.moonBig;
  for (let i = 0; i < 26; i++) {
    const s = el('div', 'star');
    s.style.left = rand(3, 97) + '%'; s.style.top = rand(3, 55) + '%';
    s.style.animationDelay = rand(-3, 0) + 's';
    night.append(s);
  }
  SIDES.forEach(side => {
    const half = $('#night-' + side);
    for (let i = 0; i < 9; i++) {
      const s = el('div', 'star');
      s.style.left = rand(side === 'left' ? 30 : 5, side === 'left' ? 95 : 70) + '%';
      s.style.top = rand(4, 50) + '%';
      s.style.animationDelay = rand(-3, 0) + 's';
      half.append(s);
    }
    sayableInto($('#name-' + side), SETTINGS.players[side].girl);
  });
  wordsInto($('#goodnight'), 'Goodnight!');
  $('#start-btn').innerHTML = ICONS.go;
  $('#go-btn').innerHTML = ICONS.go;

  SIDES.forEach(side => {
    const root = el('div', 'pet side-' + side);
    root.innerHTML = '<div class="lean"><div class="bounce"><div class="art"></div></div></div>' +
      '<div class="zzz"><span>z</span><span>z</span><span>Z</span></div><div class="tag"></div>' +
      '<div class="glitter">' + [[8, 20], [82, 14], [90, 52], [4, 58], [48, 2], [70, 84]].map(([x, y], i) =>
        `<i style="left:${x}%; top:${y}%; animation-delay:${-i * 0.3}s">${ICONS.star}</i>`).join('') + '</div>';
    world.append(root);
    const p = {
      side, root,
      lean: root.querySelector('.lean'), bounce: root.querySelector('.bounce'),
      art: root.querySelector('.art'), tag: root.querySelector('.tag'),
      x: 0, y: 0, asleep: false, token: 0, busyUntil: 0, moodTimer: 0, anims: [],
      wish: null, lastWish: null, wishUntil: 0, nextWishAt: now() + rand(6000, 14000),
    };
    pets[side] = p;
    fillArt(p.art, side);
    sayableInto(p.tag, SETTINGS.players[side].pet);
    onTap(p.lean, () => petTapped(side));
    setPos(p, HOME[side].x, HOME[side].y);
  });
}

/* ---------- where things are on screen ---------- */
const W = () => stage.clientWidth;
const H = () => stage.clientHeight;
const petSize = () => Math.min(W(), H()) * 0.33;
function setPos(p, x, y) {
  p.x = x; p.y = y;
  p.root.style.left = x + '%';
  p.root.style.bottom = y + '%';
}
/* A point on a pet: fx, fy go from 0 to 1 across the pet's picture (0,0 is top-left). */
function petPoint(p, fx, fy) {
  const s = petSize(), cx = p.x / 100 * W(), bottom = H() - p.y / 100 * H();
  return { x: cx + (fx - 0.5) * s, y: bottom - s + fy * s };
}
function movePet(side, x, y, ms) {
  const p = pets[side], x0 = p.x, y0 = p.y;
  p.root.classList.add('walking');
  return tween(ms, t => setPos(p, x0 + (x - x0) * t, y0 + (y - y0) * t))
    .then(() => p.root.classList.remove('walking'));
}

/* ---------- flying things (food, treats, hearts) ---------- */
function prop(svg, sizeVmin, x, y) {
  const outer = el('div', 'prop');
  const inner = el('div', '', svg);
  outer.append(inner);
  outer.style.width = outer.style.height = sizeVmin + 'vmin';
  outer.style.left = x + 'px'; outer.style.top = y + 'px';
  world.append(outer);
  return outer;
}
function floatHearts(p, n = 3, color = '#ff6f91') {
  for (let i = 0; i < n; i++) {
    const pt = petPoint(p, 0.5 + rand(-0.3, 0.3), 0.18 + rand(-0.05, 0.1));
    const h = prop(ICONS.heart, rand(4, 6), pt.x, pt.y);
    h.style.color = color; h.style.zIndex = 31;
    animate(h.firstChild, [
      { transform: 'translateY(0) scale(.3)', opacity: 0 },
      { transform: 'translateY(-3vmin) scale(1)', opacity: 1, offset: 0.2 },
      { transform: 'translateY(-17vmin) scale(.9)', opacity: 0 },
    ], { duration: 1500, delay: i * 140, easing: 'ease-out', fill: 'both' }).then(() => h.remove());
  }
}
function sparkles(x, y, n = 8, colors = ['#ffd23f', '#ff7eb6', '#5aa9ff', '#6cc551']) {
  for (let i = 0; i < n; i++) {
    const s = prop(ICONS.star, rand(2.5, 4.5), x, y);
    s.style.color = pick(colors); s.style.zIndex = 32;
    const a = (i / n) * Math.PI * 2 + rand(-0.3, 0.3), d = rand(8, 15);
    animate(s.firstChild, [
      { transform: 'translate(0,0) scale(.2) rotate(0deg)', opacity: 1 },
      { transform: `translate(${Math.cos(a) * d}vmin, ${Math.sin(a) * d}vmin) scale(1) rotate(160deg)`, opacity: 0 },
    ], { duration: 900, easing: 'ease-out', fill: 'both' }).then(() => s.remove());
  }
}
/* A speech bubble above a pet: "Thank you, Leah!" (each word can be tapped). */
function sayBubble(p, text, ms = 2800) {
  p.root.querySelectorAll('.say').forEach(b => b.remove());
  const b = el('div', 'say');
  wordsInto(b, text);
  p.root.append(b);
  p.root.classList.add('saying');
  clearTimeout(p.sayTimer);
  p.sayTimer = setTimeout(() => p.root.classList.remove('saying'), ms + 400);
  animate(b, [{ transform: 'translateX(-50%) scale(0)' }, { transform: 'translateX(-50%) scale(1.08)' }, { transform: 'translateX(-50%) scale(1)' }], { duration: 350, easing: 'ease-out' });
  setTimeout(() => {
    animate(b, [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' }).then(() => b.remove());
  }, ms);
}

/* =====================================================================
   9. THE PETS: eat, play, sleep, and being tapped
   ===================================================================== */
/* Start a new action on a pet. Cancels whatever it was doing.
   Returns a function that says whether this action is still the current one. */
function begin(p, ms = 1600) {
  const t = ++p.token;
  p.anims.forEach(a => a.cancel && a.cancel());
  p.anims = [];
  p.root.querySelectorAll('.prop-own').forEach(e => e.remove());
  document.querySelectorAll('.prop[data-owner="' + p.side + '"]').forEach(e => e.remove());
  clearTimeout(p.moodTimer);
  p.root.classList.remove('chomp', 'happy');
  p.busyUntil = now() + ms;
  return () => t === p.token;
}
function petAnim(p, frames, opts) {
  const done = animate(p.bounce, frames, opts);
  if (done.anim) p.anims.push(done.anim);
  return done;
}
function mood(p, cls, ms) {
  p.root.classList.add(cls);
  clearTimeout(p.moodTimer);
  p.moodTimer = setTimeout(() => p.root.classList.remove(cls), ms);
}
const canAct = () => scene === 'play';

async function feed(side, food) {
  if (!canAct()) return;
  const p = pets[side];
  if (isFull(side)) { sayFull(p); return; }
  const alive = begin(p, 1900);
  grantWish(p, 'food:' + food);
  const pt = petPoint(p, 0.5, 0.72);
  const f = prop(ICONS[food], 12, pt.x, pt.y);
  f.dataset.owner = side;
  Sound.play('eat');
  setTummy(side, tummy(side) + 0.3);
  await animate(f.firstChild, [{ transform: 'scale(0) translateY(-6vmin)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }], { duration: 260, easing: 'ease-out', fill: 'both' });
  for (let i = 0; i < 3; i++) {
    if (!alive()) return;
    p.root.classList.add('chomp');
    petAnim(p, [{ transform: 'scale(1,1)' }, { transform: 'scale(1.05,.94)' }, { transform: 'scale(1,1)' }], { duration: 200 });
    await wait(130);
    f.firstChild.style.transform = `scale(${0.75 - i * 0.25})`;
    p.root.classList.remove('chomp');
    await wait(90);
  }
  if (!alive()) return;
  f.remove();
  mood(p, 'happy', 1300);
  floatHearts(p, 3);
  petAnim(p, [{ transform: 'translateY(0)' }, { transform: 'translateY(-7%)' }, { transform: 'translateY(0)' }], { duration: 380, easing: 'ease-out' });
  EAT_HOOKS.forEach(f => f(side, food));
}

const lastPlay = { left: -1e9, right: -1e9 };
async function playBall(side) {
  if (!canAct()) return;
  const p = pets[side], o = other(side);
  if (p.asleep) wakePet(side, true);
  grantWish(p, 'play');
  // Both girls tapped Play close together? Chase time!
  const t = now();
  lastPlay[side] = t;
  if (t - lastPlay[o] < SETTINGS.togetherWindowMs && !pets[o].asleep) {
    lastPlay.left = lastPlay.right = -1e9;
    startChase();
    return;
  }
  if (!pets[o].asleep) invite(o, 'play', SETTINGS.togetherWindowMs);
  const alive = begin(p, 1700);
  mood(p, 'happy', 1600);
  Sound.play('play');
  const base = petPoint(p, 0.5, 0.95);
  const ball = prop(ICONS.ball, 9, base.x + (side === 'left' ? 1 : -1) * petSize() * 0.38, base.y - petSize() * 0.06);
  ball.dataset.owner = side;
  animate(ball.firstChild, [
    { transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(-22vmin) rotate(180deg)', offset: 0.3 },
    { transform: 'translateY(0) rotate(360deg)', offset: 0.55 }, { transform: 'translateY(-10vmin) rotate(480deg)', offset: 0.75 },
    { transform: 'translateY(0) rotate(560deg)' },
  ], { duration: 1500, easing: 'ease-in-out' }).then(() => ball.remove());
  await petAnim(p, [
    { transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(-16%) rotate(-8deg)', offset: 0.25 },
    { transform: 'translateY(0) rotate(0)', offset: 0.5 }, { transform: 'translateY(-11%) rotate(8deg)', offset: 0.75 },
    { transform: 'translateY(0) rotate(0)' },
  ], { duration: 1400, easing: 'ease-in-out' });
  if (!alive()) return;
  p.root.classList.add('wag');
  setTimeout(() => p.root.classList.remove('wag'), 1600);
}

function goSleep(side) {
  if (!canAct()) return;
  const p = pets[side];
  begin(p, 800);
  if (!grantWish(p, 'sleep') && p.wish) clearWish(p, true);
  p.asleep = true; S.pets[side].asleep = true; save();
  p.root.classList.add('asleep');
  $('#night-' + side).classList.add('on');
  Sound.play('sleep');
  renderColumn(side);
  if (!pets[other(side)].asleep) invite(other(side), 'sleep', 5000);
  checkBothAsleep();
}
function wakePet(side, quiet) {
  const p = pets[side];
  p.asleep = false; S.pets[side].asleep = false; save();
  p.root.classList.remove('asleep');
  $('#night-' + side).classList.remove('on');
  if (!quiet) {
    begin(p, 900);
    Sound.play('wake');
    mood(p, 'happy', 1200);
    petAnim(p, [{ transform: 'scale(1,1)' }, { transform: 'scale(.94,1.1)' }, { transform: 'scale(1,1)' }], { duration: 700, easing: 'ease-out' });
  }
  renderColumn(side);
}

function petTapped(side) {
  const p = pets[side];
  if (scene === 'night') { goodMorning(); return; }
  if (!canAct()) return;
  if (S.room === 'backyard') { grantWish(p, 'hug'); bounce(side); return; }          // tap to bounce
  if (bath[side] && bath[side].step === 'scrub') { scrubPet(side); return; }       // tap to scrub
  if (bath[side]) return;
  if (p.asleep) { wakePet(side); return; }
  begin(p, 1000);
  grantWish(p, 'hug');
  mood(p, 'happy', 1100);
  Sound.play('giggle');
  floatHearts(p, 2);
  p.root.classList.add('wag'); setTimeout(() => p.root.classList.remove('wag'), 1600);
  petAnim(p, [{ transform: 'rotate(0)' }, { transform: 'rotate(-6deg)' }, { transform: 'rotate(6deg)' }, { transform: 'rotate(-3deg)' }, { transform: 'rotate(0)' }], { duration: 650 });
}

/* =====================================================================
   10. TOGETHER MOMENTS (in the shared middle)
   ===================================================================== */
// Some together moments can happen very quickly over and over; count those only now and then.
const COOLDOWN = { treat: 15000, trampoline: 20000 };
const lastMoment = {};
function togetherMoment(type) {
  if (COOLDOWN[type]) {
    if (now() - (lastMoment[type] || -1e9) < COOLDOWN[type]) return;
    lastMoment[type] = now();
  }
  S.together++;
  logDay(type);
  addHeart();
  checkUnlocks();
  save();
  setTimeout(runQueue, 1600);
}
/* Remember what the pets did together today (for the memory book). */
function logDay(type) {
  const key = todayKey();
  const day = S.book[key] || (S.book[key] = []);
  if (!day.includes(type)) day.push(type);
  const keys = Object.keys(S.book).sort();
  while (keys.length > 120) delete S.book[keys.shift()];
}

/* --- Treat: toss a treat to your sister's pet --- */
const treatFlying = { left: false, right: false };
async function giveTreat(side, btn) {
  if (!canAct()) return;
  const o = other(side), pf = pets[side], pt = pets[o];
  if (pt.asleep || treatFlying[side]) { nudge(btn); return; }
  if (isFull(o)) { nudge(btn); sayFull(pt); return; }
  treatFlying[side] = true;
  begin(pf, 700);
  petAnim(pf, [{ transform: 'translateY(0)' }, { transform: 'translateY(-8%) rotate(' + (side === 'left' ? 6 : -6) + 'deg)' }, { transform: 'translateY(0)' }], { duration: 450 });
  Sound.play('toss');
  const a = petPoint(pf, 0.5, 0.5);
  const tr = prop(ICONS.treat, 9, a.x, a.y);
  tr.style.zIndex = 33;
  const peak = H() * 0.3;
  await tween(950, t => {
    const b = petPoint(pt, 0.5, 0.55);
    const x = a.x + (b.x - a.x) * t;
    const y = a.y + (b.y - a.y) * t - peak * 4 * t * (1 - t);
    tr.style.left = x + 'px'; tr.style.top = y + 'px';
    tr.firstChild.style.transform = `rotate(${t * (side === 'left' ? 540 : -540)}deg)`;
  }, ease.linear);
  treatFlying[side] = false;
  if (pt.asleep || !canAct()) { // fell asleep while it was flying: the treat waits by her bed
    animate(tr, [{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: 'forwards' }).then(() => tr.remove());
    return;
  }
  const alive = begin(pt, 1600);
  Sound.play('catch');
  tr.remove();
  setTummy(o, tummy(o) + 0.1);
  pt.root.classList.add('chomp');
  await petAnim(pt, [{ transform: 'translateY(0)' }, { transform: 'translateY(-10%)' }, { transform: 'translateY(0) scale(1.04,.96)' }, { transform: 'none' }], { duration: 500, easing: 'ease-out' });
  if (!alive()) return;
  pt.root.classList.remove('chomp');
  mood(pt, 'happy', 2000);
  floatHearts(pt, 4);
  Sound.play('thanks');
  sayBubble(pt, 'Thank you, ' + SETTINGS.players[side].girl + '!');
  togetherMoment('treat');
}

/* --- Chase: both tapped Play at nearly the same time --- */
async function startChase() {
  setScene('chase');
  SIDES.forEach(s => { begin(pets[s], 7000); pets[s].root.classList.add('happy', 'running'); });
  Sound.play('chase');
  const cx = 50, cy = 15, rx = 14, ry = 5;
  await Promise.all([movePet('left', cx - rx, cy, 500), movePet('right', cx + rx, cy, 500)]);
  SIDES.forEach(s => pets[s].root.classList.add('running'));
  const place = (side, ang) => {
    const p = pets[side];
    setPos(p, cx + rx * Math.cos(ang), cy + ry * Math.sin(ang));
    const depth = Math.sin(ang);                       // 1 = far away, -1 = close
    const dir = -Math.sin(ang) >= 0 ? 1 : -1;          // moving right or left
    p.root.style.zIndex = depth > 0 ? 9 : 11;
    p.lean.style.transform = `rotate(${dir * 9}deg) scale(${0.9 - depth * 0.08})`;
  };
  await tween(4800, t => {
    const a = t * Math.PI * 4;                         // two laps
    place('left', Math.PI + a);
    place('right', a);
  }, ease.linear);
  SIDES.forEach(s => { pets[s].lean.style.transform = ''; pets[s].root.style.zIndex = ''; });
  await Promise.all([movePet('left', HOME.left.x, HOME.left.y, 700), movePet('right', HOME.right.x, HOME.right.y, 700)]);
  SIDES.forEach(s => { pets[s].root.classList.remove('running'); floatHearts(pets[s], 3); mood(pets[s], 'happy', 1500); });
  togetherMoment('chase');
  endScene();
}

/* --- Goodnight: both pets asleep --- */
let bothAsleepTimer = 0;
function checkBothAsleep() {
  clearTimeout(bothAsleepTimer);
  if (!(pets.left.asleep && pets.right.asleep)) return;
  bothAsleepTimer = setTimeout(() => {
    if (pets.left.asleep && pets.right.asleep && scene === 'play') goodnight();
  }, 1400);
}
async function goodnight() {
  setScene('goodnight');
  SIDES.forEach(s => { begin(pets[s], 5000); $('#night-' + s).classList.remove('on'); });
  $('#night').classList.add('on');
  Sound.play('lullaby');
  await wait(700);
  await Promise.all([movePet('left', CUDDLE.left.x, CUDDLE.left.y, 2200), movePet('right', CUDDLE.right.x, CUDDLE.right.y, 2200)]);
  pets.left.lean.style.transform = 'rotate(7deg)';
  pets.right.lean.style.transform = 'rotate(-7deg)';
  $('#goodnight').classList.add('on');
  SIDES.forEach(s => floatHearts(pets[s], 2, '#ffd6e4'));
  togetherMoment('sleep');
  await wait(1200);
  if (scene === 'goodnight') setScene('night');
}
/* Put the pets back the way they were last time (asleep or awake). */
/* The game always opens in the playroom, with both pets awake. */
function restorePets() {
  SIDES.forEach(s => {
    const p = pets[s];
    p.asleep = false;
    p.root.classList.remove('asleep');
    p.root.style.opacity = '';
    p.lean.style.transform = '';
    $('#night-' + s).classList.remove('on');
    setPos(p, HOME[s].x, HOME[s].y);
    renderMud(s); renderWear(s); renderFluffy(s); renderToys(s); renderTrickList(s);
    DRESS_HOOKS.forEach(f => f(s));
  });
  $('#night').classList.remove('on');
  $('#goodnight').classList.remove('on');
  showRoom('playroom');
}
async function goodMorning() {
  if (scene !== 'night' || S.bedtime) return;     // play timer: asleep until a grown-up wakes them
  setScene('morning');
  Sound.stopMusic();
  Sound.play('morning');
  $('#goodnight').classList.remove('on');
  $('#night').classList.remove('on');
  SIDES.forEach(s => {
    const p = pets[s];
    p.asleep = false; S.pets[s].asleep = false;
    p.root.classList.remove('asleep');
    p.lean.style.transform = '';
    mood(p, 'happy', 2600);
  });
  save();
  await wait(500);
  await Promise.all([movePet('left', HOME.left.x, HOME.left.y, 1200), movePet('right', HOME.right.x, HOME.right.y, 1200)]);
  SIDES.forEach(s => floatHearts(pets[s], 2));
  endScene();
}

function endScene() {
  setScene('play');
  setTimeout(runQueue, 500);
}

/* =====================================================================
   11. NEW THINGS APPEAR, ONE AT A TIME
   ===================================================================== */
const queue = [];
function checkUnlocks() {
  for (const [key, at] of Object.entries(SETTINGS.unlockAt)) {
    if (S.together >= at && !S.unlocked[key] && !queue.includes(key)) queue.push(key);
  }
}
let queueBusy = false;
async function runQueue() {
  if (scene !== 'play' || queueBusy) return;
  // a full jar brings presents, which open in the playroom
  if (S.unlocked.jar && S.jar >= SETTINGS.jarSize && S.room === 'playroom') { startPresents(); return; }
  if (!queue.length) return;
  queueBusy = true;
  await reveal(queue.shift());
  queueBusy = false;
  setTimeout(runQueue, 1500);
}
const newUntil = {};
// Where each new button lives, so its door can sparkle if the girls are in another room.
const UNLOCK_BUTTON = { treat: 'treat', ball: 'ballgame', seesaw: 'seesawgame', highfive: 'fivegame', book: 'book' };
async function reveal(key) {
  S.unlocked[key] = true; save();
  Sound.play('unlock');
  if (UNLOCK_BUTTON[key]) {
    const act = UNLOCK_BUTTON[key], room = roomOfAct(act);
    if (room === S.room) { newUntil[act] = Date.now() + 6000; renderColumns(); }
    else { S.doorNew[room] = true; save(); renderCenter(); }
  } else if (key === 'jar') {
    renderJar();
    const jar = $('#jar');
    jar.classList.add('pop');
    setTimeout(() => jar.classList.remove('pop'), 1000);
    await wait(1100);
    await addHeart();      // the together moment that brought the jar
  } else if (key === 'bubbles') {
    pets.left.nextWishAt = now() + 2500;
    pets.right.nextWishAt = now() + 9500;
  }
}

/* =====================================================================
   12. THE FRIENDSHIP JAR (one jar, shared by both girls)
   ===================================================================== */
function jarSlots() {
  const n = SETTINGS.jarSize, xs = [30, 50, 70], out = [];
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / 3), inRow = Math.min(3, n - row * 3), col = i % 3;
    const x = inRow === 1 ? 50 : inRow === 2 ? [40, 60][col] : xs[col];
    out.push([x, 104 - row * 17]);
  }
  return out;
}
function renderJar() {
  const jar = $('#jar');
  jar.classList.toggle('show', !!S.unlocked.jar);
  jar.classList.toggle('full', S.jar >= SETTINGS.jarSize);
  const hearts = jarSlots().map(([x, y], i) => {
    const inner = (i < S.jar ? ICONS.twinHeart : ICONS.emptyHeart).replace('<svg ', `<svg x="${x - 10.5}" y="${y - 10.5}" width="21" height="21" `);
    return inner;
  }).join('');
  jar.innerHTML = `<svg viewBox="0 0 100 124">
    <rect x="23" y="3" width="54" height="15" rx="5" fill="#d9a877" stroke="#b07f4f" stroke-width="3"/>
    <path d="M28 18 H72 V26 C 86 32 92 42 92 56 V102 C 92 114 84 120 72 120 H28 C 16 120 8 114 8 102 V56 C 8 42 14 32 28 26Z" fill="rgba(255,255,255,.6)" stroke="#a9bdd1" stroke-width="3.5"/>
    ${hearts}
    <path d="M17 56 C 17 46, 21 40, 29 36" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".9"/>
    <path d="M15 66 V98" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>
  </svg>`;
}
function jarSlotPoint(i) {
  const r = $('#jar').getBoundingClientRect(), [x, y] = jarSlots()[Math.min(i, SETTINGS.jarSize - 1)];
  return { x: r.left + x / 100 * r.width, y: r.top + y / 124 * r.height };
}
const midPets = () => {
  const a = petPoint(pets.left, 0.5, 0.3), b = petPoint(pets.right, 0.5, 0.3);
  return { x: (a.x + b.x) / 2, y: Math.min(a.y, b.y) };
};
async function addHeart(from = midPets()) {
  if (!S.unlocked.jar || S.jar >= SETTINGS.jarSize) return;
  const i = S.jar;
  S.jar++; save();
  const to = jarSlotPoint(i);
  const h = prop(ICONS.twinHeart, 7, from.x, from.y);
  h.style.zIndex = 40;
  await animate(h.firstChild, [{ transform: 'scale(0)' }, { transform: 'scale(1.3)' }, { transform: 'scale(1)' }], { duration: 320, easing: 'ease-out', fill: 'both' });
  await tween(950, t => {
    h.style.left = from.x + (to.x - from.x) * t + 'px';
    h.style.top = from.y + (to.y - from.y) * t - H() * 0.12 * Math.sin(Math.PI * t) + 'px';
    h.firstChild.style.transform = `scale(${1 - 0.6 * t})`;
  });
  h.remove();
  renderJar();
  const jar = $('#jar');
  jar.classList.remove('wiggle'); void jar.offsetWidth;
  if (S.jar < SETTINGS.jarSize) jar.classList.add('wiggle');
  else renderCenter();                     // full: the playroom door shows a present
  Sound.play('heart');
  sparkles(to.x, to.y, 6);
}
async function emptyJar() {
  for (let i = 0; i < S.jar; i++) {
    const pt = jarSlotPoint(i), h = prop(ICONS.twinHeart, 3, pt.x, pt.y);
    h.style.zIndex = 40;
    animate(h.firstChild, [{ transform: 'translateY(0) scale(1)', opacity: 1 }, { transform: `translate(${rand(-12, 12)}vmin, -18vmin) scale(1.6)`, opacity: 0 }],
      { duration: 1200, delay: i * 60, easing: 'ease-out', fill: 'both' }).then(() => h.remove());
  }
  S.jar = 0; save();
  await wait(300);
  renderJar();
}

/* --- A full jar: both girls untie the bow, then a surprise! --- */
const SURPRISES = ['picnic', 'dance', 'balloons'];
/* Surprise scenes. Each one lasts about 8 seconds. */
function scenery(svg, css) {
  const e = el('div', 'scenery', svg);
  Object.assign(e.style, css);
  world.append(e);
  return e;
}
function fadeAway(elms) {
  return Promise.all(elms.map(e => animate(e, [{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: 'forwards' }).then(() => e.remove())));
}
const SURPRISE = {
  async picnic() {
    const blanket = scenery(ICONS.blanket, { left: '50%', bottom: '4%', width: '62vmin', height: '17vmin', transform: 'translateX(-50%)', zIndex: 8 });
    const foods = [['basket', 50, 14], ['strawberry', 44, 6.5], ['cupcake', 56, 6.5]].map(([n, x, y]) =>
      scenery(ICONS[n], { left: x + '%', bottom: y + '%', width: n === 'basket' ? '13vmin' : '8vmin', height: n === 'basket' ? '13vmin' : '8vmin', transform: 'translateX(-50%)', zIndex: 11 }));
    const flies = [0, 1].map(i => {
      const b = scenery(ICONS.butterfly, { left: '0', top: '0', width: '7vmin', height: '7vmin', zIndex: 12 });
      animate(b.firstChild, [{ transform: 'scaleX(1)' }, { transform: 'scaleX(.3)' }], { duration: 180, iterations: 60, direction: 'alternate' });
      tween(8000, t => {
        const x = i ? 1 - t : t;
        b.style.left = (8 + 84 * x) + '%';
        b.style.top = (22 + i * 10 + 8 * Math.sin(t * Math.PI * 6 + i)) + '%';
      }, ease.linear);
      return b;
    });
    Sound.play('picnic');
    await Promise.all([movePet('left', 36, 10, 900), movePet('right', 64, 10, 900)]);
    for (let i = 0; i < 6; i++) {
      const p = pets[i % 2 ? 'right' : 'left'];
      p.root.classList.add('chomp');
      petAnim(p, [{ transform: 'scale(1,1)' }, { transform: 'scale(1.05,.94)' }, { transform: 'scale(1,1)' }], { duration: 300, iterations: 3 });
      setTimeout(() => { p.root.classList.remove('chomp'); mood(p, 'happy', 1000); floatHearts(p, 2); }, 900);
      await wait(1150);
    }
    await fadeAway([blanket, ...foods, ...flies]);
  },
  async dance() {
    const party = el('div', '');
    party.id = 'party';
    ['#ff7eb6', '#5aa9ff', '#ffd23f', '#6cc551', '#a77bff'].forEach((c, i) => {
      const l = el('div', 'light');
      l.style.background = `radial-gradient(circle, ${c} 0%, transparent 65%)`;
      l.style.left = (10 + i * 18) + '%'; l.style.top = (10 + (i % 2) * 30) + '%';
      l.style.animationDelay = (-i * 0.9) + 's';
      party.append(l);
    });
    stage.insertBefore(party, $('#night'));
    requestAnimationFrame(() => party.classList.add('on'));
    const ball = scenery(ICONS.disco, { left: '50%', top: 'calc(19vmin + var(--safe-top))', width: '13vmin', height: '17vmin', transform: 'translateX(-50%)', zIndex: 12 });
    animate(ball.firstChild, [{ transform: 'rotate(-6deg)' }, { transform: 'rotate(6deg)' }], { duration: 1000, iterations: 8, direction: 'alternate', easing: 'ease-in-out' });
    Sound.play('dance');
    await Promise.all([movePet('left', 38, 12, 700), movePet('right', 62, 12, 700)]);
    SIDES.forEach(s => mood(pets[s], 'happy', 9000));
    SIDES.forEach(s => petAnim(pets[s], DANCE_GROOVE, { duration: 2000, iterations: 3 }));
    const notes = [];
    for (let i = 0; i < 10; i++) {
      const n = scenery(ICONS.note, { left: rand(25, 75) + '%', top: rand(40, 70) + '%', width: '5vmin', height: '5vmin', color: pick(['#ffd23f', '#ff7eb6', '#7fd1ff', '#a6f08a']), zIndex: 12, opacity: 0 });
      notes.push(n);
      animate(n, [{ opacity: 0, transform: 'translateY(0)' }, { opacity: 1, offset: 0.2 }, { opacity: 0, transform: 'translateY(-20vmin) rotate(20deg)' }], { duration: 2200, delay: i * 600 });
    }
    await wait(6400);
    party.classList.remove('on');
    await fadeAway([ball, ...notes]);
    setTimeout(() => party.remove(), 1000);
  },
  async balloons() {
    Sound.play('balloons');
    const colors = [cssVar('--L'), cssVar('--R'), '#ffd23f', '#6cc551', '#a77bff', '#ff9a4d', cssVar('--L'), cssVar('--R')];
    const all = [];
    for (let i = 0; i < 16; i++) {
      const c = colors[i % colors.length];
      const b = scenery(`<svg viewBox="0 0 60 120"><path d="M30 76 q-6 14 4 26 q8 10 -2 18" fill="none" stroke="#9a94a8" stroke-width="2"/><ellipse cx="30" cy="38" rx="24" ry="30" fill="${c}"/><path d="M26 67 L34 67 L30 76Z" fill="${c}"/><ellipse cx="21" cy="26" rx="5" ry="9" fill="#fff" opacity=".45"/></svg>`,
        { left: rand(18, 82) + '%', top: '100%', width: '9vmin', height: '18vmin', zIndex: i % 2 ? 12 : 8 });
      all.push(b);
      animate(b, [{ transform: 'translateY(0) rotate(-6deg)' }, { transform: 'translateY(-70vh) rotate(6deg)', offset: 0.5 }, { transform: 'translateY(-140vh) rotate(-6deg)' }],
        { duration: rand(4200, 6000), delay: i * 260, easing: 'ease-in', fill: 'both' });
    }
    for (let i = 0; i < 6; i++) {
      SIDES.forEach(s => {
        mood(pets[s], 'happy', 1500);
        petAnim(pets[s], [{ transform: 'translateY(0)' }, { transform: 'translateY(-14%)' }, { transform: 'translateY(0)' }], { duration: 600, delay: s === 'left' ? 0 : 300, easing: 'ease-out' });
      });
      sparkles(rand(0.3, 0.7) * W(), rand(0.2, 0.5) * H(), 8);
      await wait(1300);
    }
    all.forEach(b => b.remove());
  },
};
const cssVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/* =====================================================================
   13. TWO-PLAYER GAMES (they need both girls)
   ===================================================================== */
const GAMES = {
  ball:     { icon: 'catch',  act: 'throw', goal: 6 },   // throw the ball back and forth
  seesaw:   { icon: 'seesaw', act: 'push',  goal: 8 },   // push off when your side is down
  highfive: { icon: 'hand',   act: 'five',  goal: 3 },   // both press at the same time
};
let game = null;
function renderDots() {
  $('#dots').innerHTML = game ? Array.from({ length: game.goal }, (_, i) => `<i>${i < game.count ? ICONS.twinHeart : ICONS.emptyHeart}</i>`).join('') : '';
}
async function startGame(kind, starter) {
  if (scene !== 'play') return;
  if (kind === 'ball') SIDES.forEach(s => grantWish(pets[s], 'play'));
  const g = game = { kind, goal: GAMES[kind].goal, count: 0, turn: starter, busy: true, ready: false, lastPress: now(), cleanup: [], raised: { left: -1e9, right: -1e9 } };
  SIDES.forEach(s => begin(pets[s], 1e9));
  setScene('game');
  renderDots();
  Sound.play('gameStart');
  await GAME_SETUP[kind](g);
  if (game !== g) { g.cleanup.forEach(f => f()); return; }   // stopped while getting ready
  g.busy = false; g.ready = true;
  showTurn();
}
/* Glow the button of whoever's turn it is (both glow for high five). */
function showTurn() {
  if (!game) return;
  SIDES.forEach(s => {
    const b = cols[s].querySelector('.btn');
    if (b) b.classList.toggle('invite', game.kind === 'highfive' || game.turn === s);
  });
}
function gamePress(side, btn) {
  if (!game || !game.ready || game.ending) return;
  game.lastPress = now();
  if (game.busy) return;
  GAME_PRESS[game.kind](game, side, btn);
}
function hopPet(side) {
  petAnim(pets[side], [{ transform: 'translateY(0)' }, { transform: 'translateY(-6%)' }, { transform: 'translateY(0)' }], { duration: 350, easing: 'ease-out' });
}
async function scorePoint() {
  if (!game || game.ending) return;
  game.count++;
  renderDots();
  if (game.count >= game.goal) await finishGame(true);
  else showTurn();
}
async function finishGame(completed) {
  const g = game;
  if (!g || g.ending) return;
  g.ending = true;
  if (completed) {
    Sound.play('yay');
    const m = midPets();
    sparkles(m.x, m.y, 14);
    SIDES.forEach(s => {
      mood(pets[s], 'happy', 2000);
      petAnim(pets[s], [{ transform: 'translateY(0)' }, { transform: 'translateY(-14%)' }, { transform: 'translateY(0)' }], { duration: 600, iterations: 2, easing: 'ease-out' });
    });
    await wait(1300);
  }
  g.cleanup.forEach(f => f());
  SIDES.forEach(s => { pets[s].lean.style.transform = ''; });
  await Promise.all([movePet('left', HOME.left.x, HOME.left.y, 800), movePet('right', HOME.right.x, HOME.right.y, 800)]);
  SIDES.forEach(s => { pets[s].busyUntil = 0; });
  game = null;
  if (completed) togetherMoment(g.kind);
  if (S.room === 'backyard') SIDES.forEach(s => addMud(s, completed ? 0.6 : 0.2));   // playing outside is muddy
  endScene();
}
/* Throw something in an arc. b may be a function so it can follow a moving target. */
function arc(elm, a, b, ms, peak, spin = 0) {
  return tween(ms, t => {
    const end = typeof b === 'function' ? b() : b;
    elm.style.left = a.x + (end.x - a.x) * t + 'px';
    elm.style.top = a.y + (end.y - a.y) * t - peak * 4 * t * (1 - t) + 'px';
    if (spin) elm.firstChild.style.transform = `rotate(${t * spin}deg)`;
  }, ease.linear);
}

const GAME_SETUP = {
  async ball(g) {
    await Promise.all([movePet('left', 36, 12, 700), movePet('right', 64, 12, 700)]);
    const pt = petPoint(pets[g.turn], 0.5, 0.78);
    g.ball = prop(ICONS.ball, 8, pt.x, pt.y);
    g.ball.style.zIndex = 12;
    g.cleanup.push(() => g.ball.remove());
  },
  async seesaw(g) {
    g.base = el('div', 'seesaw-base', ICONS.seesawBase);
    g.plank = el('div', 'seesaw-plank');
    world.append(g.base, g.plank);
    g.cleanup.push(() => { g.base.remove(); g.plank.remove(); });
    g.tilt = g.turn === 'left' ? 1 : -1;            // whoever started goes first (her side is down)
    const ends = seesawEnds(g.tilt);
    await Promise.all(SIDES.map(s => movePet(s, ends[s].x, ends[s].y, 700)));
    layoutSeesaw(g);
  },
  async highfive(g) {
    await Promise.all([movePet('left', 40, 12, 700), movePet('right', 60, 12, 700)]);
    g.paws = {};
    SIDES.forEach(s => {
      const paw = prop(pawSvg(s), 10, 0, 0);
      paw.style.zIndex = 12; paw.style.opacity = 0;
      g.paws[s] = paw;
      g.cleanup.push(() => paw.remove());
    });
  },
};
const GAME_PRESS = {
  async ball(g, side) {
    if (side !== g.turn) { hopPet(side); return; }
    g.busy = true;
    const from = pets[side], to = pets[other(side)];
    Sound.play('throw');
    petAnim(from, [{ transform: 'translateY(0)' }, { transform: 'translateY(-6%) rotate(' + (side === 'left' ? 8 : -8) + 'deg)' }, { transform: 'translateY(0)' }], { duration: 400 });
    await arc(g.ball, petPoint(from, 0.5, 0.78), () => petPoint(to, 0.5, 0.6), 950, H() * 0.32, side === 'left' ? 400 : -400);
    Sound.play('catch');
    mood(to, 'happy', 1000);
    petAnim(to, [{ transform: 'translateY(0)' }, { transform: 'translateY(-9%)' }, { transform: 'translateY(0)' }], { duration: 420, easing: 'ease-out' });
    const rest = petPoint(to, 0.5, 0.78);
    await arc(g.ball, petPoint(to, 0.5, 0.6), rest, 200, 0);
    g.turn = other(side);
    g.busy = false;
    await scorePoint();
  },
  async seesaw(g, side) {
    const downSide = g.tilt > 0 ? 'left' : 'right';
    if (side !== downSide) { hopPet(side); return; }
    g.busy = true;
    Sound.play('seesaw');
    mood(pets[side], 'happy', 1300);
    const from = g.tilt, to = -g.tilt;
    await tween(650, t => { g.tilt = from + (to - from) * t; layoutSeesaw(g); }, ease.inOut);
    hopPet(other(side));
    g.turn = other(side);
    g.busy = false;
    await scorePoint();
  },
  async highfive(g, side) {
    const t = now(), o = other(side);
    g.raised[side] = t;
    Sound.play('pawUp');
    mood(pets[side], 'happy', 1200);
    const paw = g.paws[side];
    paw.style.opacity = 1;
    const down = pawSpot(side, false), up = pawSpot(side, true);
    if (t - g.raised[o] < 1200) {
      // both pressed: HIGH FIVE!
      g.busy = true;
      g.raised = { left: -1e9, right: -1e9 };
      const meet = { x: (pawSpot('left', true).x + pawSpot('right', true).x) / 2, y: up.y - H() * 0.03 };
      await Promise.all(SIDES.map(s => {
        const p = g.paws[s], st = s === side ? down : { x: parseFloat(p.style.left), y: parseFloat(p.style.top) };
        p.style.opacity = 1;
        const end = { x: meet.x + (s === 'left' ? -1 : 1) * petSize() * 0.07, y: meet.y };
        return arc(p, st, end, 180, 0);
      }));
      Sound.play('clap');
      sparkles(meet.x, meet.y, 12);
      SIDES.forEach(s => { mood(pets[s], 'happy', 1200); hopPet(s); });
      await wait(650);
      SIDES.forEach(s => { g.paws[s].style.opacity = 0; });
      g.busy = false;
      await scorePoint();
      return;
    }
    // only one paw up so far: wait for the sister
    await arc(paw, down, up, 180, 0);
    setTimeout(() => {
      if (g.raised[side] === t && game === g) paw.style.opacity = 0;
    }, 1200);
  },
};

/* seesaw math: tilt 1 = left side down, -1 = right side down */
function seesawGeom() { return { cx: W() / 2, yp: H() * 0.16, hl: Math.min(W() * 0.17, H() * 0.3) }; }
function seesawEnds(tilt) {
  const { cx, yp, hl } = seesawGeom(), th = tilt * 12 * Math.PI / 180, lift = H() * 0.012;
  return {
    left:  { x: (cx - hl * Math.cos(th)) / W() * 100, y: (yp - hl * Math.sin(th) + lift) / H() * 100 },
    right: { x: (cx + hl * Math.cos(th)) / W() * 100, y: (yp + hl * Math.sin(th) + lift) / H() * 100 },
  };
}
function layoutSeesaw(g) {
  const { cx, yp, hl } = seesawGeom(), len = 2 * hl + petSize() * 0.4, thick = Math.min(W(), H()) * 0.028;
  Object.assign(g.plank.style, { left: cx - len / 2 + 'px', width: len + 'px', bottom: yp - thick / 2 + 'px', transform: `rotate(${-g.tilt * 12}deg)` });
  const bh = yp - H() * 0.05, bw = bh * 1.2;
  Object.assign(g.base.style, { left: cx - bw / 2 + 'px', width: bw + 'px', bottom: H() * 0.05 + 'px', height: bh + 'px' });
  const ends = seesawEnds(g.tilt);
  SIDES.forEach(s => setPos(pets[s], ends[s].x, ends[s].y));
}

/* high five paws */
const PAWS = {
  left:  { fur: '#eef1f6', line: '#8b94a3', pad: '#ffc6d6' },
  right: { fur: '#fffaf3', line: '#cbb9a8', pad: '#f3b9a8' },
};
function pawSvg(side) {
  const c = PAWS[side];
  return `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="56" rx="32" ry="30" fill="${c.fur}" stroke="${c.line}" stroke-width="5"/><ellipse cx="50" cy="66" rx="15" ry="12" fill="${c.pad}"/><circle cx="29" cy="44" r="7" fill="${c.pad}"/><circle cx="43" cy="35" r="7" fill="${c.pad}"/><circle cx="57" cy="35" r="7" fill="${c.pad}"/><circle cx="71" cy="44" r="7" fill="${c.pad}"/></svg>`;
}
function pawSpot(side, raised) {
  const inner = side === 'left' ? 0.84 : 0.16;
  return petPoint(pets[side], inner, raised ? 0.12 : 0.62);
}

/* =====================================================================
   14. THOUGHT BUBBLES: a pet asks for something (picture + one word)
   ===================================================================== */
const WISHES = {
  apple:  { icon: 'apple',      act: 'food:apple' },
  fish:   { icon: 'fish',       act: 'food:fish' },
  bone:   { icon: 'bone',       act: 'food:bone' },
  ball:   { icon: 'ball',       act: 'play' },
  nap:    { icon: 'nap',        act: 'sleep' },
  hug:    { icon: 'hug',        act: 'hug' },     // tap the pet
  bath:   { icon: 'roomBath',   act: 'bath' },
  brush:  { icon: 'brush',      act: 'brush' },
  bounce: { icon: 'trampoline', act: 'bounce' },
};
function wishChoices(side) {
  const p = pets[side];
  if (isHungry(side)) return HUNGRY_WISHES.filter(w => w !== p.lastWish);   // a hungry pet asks for food
  let list = SETTINGS.wishes.flatMap(w => (w === 'tricks' ? TRICKS.filter(t => knows(side, t.key)).map(t => t.word) : [w]));
  list = list.filter(w => WISHES[w] && w !== p.lastWish && (!WISHES[w].feature || has(WISHES[w].feature)));
  if (isFull(side)) list = list.filter(w => !WISHES[w].act.startsWith('food:'));
  if (S.pets[side].mud >= 1 && list.includes('bath')) list.push('bath', 'bath');          // muddy pets think about baths
  return list;
}
function wishTick() {
  if (!S.unlocked.bubbles || scene !== 'play' || $('#book').classList.contains('show')) return;
  SIDES.forEach(side => {
    const p = pets[side];
    if (p.wish && now() > p.wishUntil) { clearWish(p); return; }       // no wish lasts forever; no one is sad
    if (p.wish || p.asleep || bath[side] || now() < p.nextWishAt || now() < p.busyUntil) return;
    const choices = wishChoices(side);
    if (!choices.length) return;
    showWish(p, pick(choices));
    const o = pets[other(side)];
    o.nextWishAt = Math.max(o.nextWishAt, now() + 7000);               // one at a time is easier
  });
}
function showWish(p, word) {
  clearWish(p, true);
  p.wish = word; p.lastWish = word; p.wishUntil = now() + 25000;
  const b = el('div', 'thought word', `<div class="pic">${ICONS[WISHES[word].icon]}</div><div class="say-word">${word}</div>`);
  b.dataset.say = word;
  p.root.append(b);
  animate(b, [{ transform: 'translateX(-50%) scale(0)' }, { transform: 'translateX(-50%) scale(1.1)' }, { transform: 'translateX(-50%) scale(1)' }], { duration: 400, easing: 'ease-out' });
  Sound.play('bubble');
}
function clearWish(p, quick) {
  const b = p.root.querySelector('.thought');
  p.wish = null;
  p.nextWishAt = now() + (isHungry(p.side) ? rand(8000, 14000) : rand(18000, 32000));
  if (!b) return;
  if (quick) { b.remove(); return; }
  animate(b, [{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' }).then(() => b.remove());
}
/* Did this action give the pet what it was wishing for? */
function grantWish(p, act) {
  if (!p.wish || WISHES[p.wish].act !== act) return false;
  const b = p.root.querySelector('.thought');
  if (b) {
    const r = b.getBoundingClientRect();
    sparkles(r.left + r.width / 2, r.top + r.height / 2, 12);
  }
  clearWish(p, true);
  floatHearts(p, 4);
  setTimeout(() => Sound.play('wish'), 450);
  return true;
}

/* =====================================================================
   15. THE MEMORY BOOK: one short sentence a day, shared by both girls
   ===================================================================== */
// Most special first: the book uses the first one that happened that day.
const BOOK_LINES = {
  presents:   { line: 'gave each other presents.',    icon: 'gift' },
  balloons:   { line: 'had a balloon party.',          icon: 'balloon' },
  dance:      { line: 'had a dance party.',            icon: 'note' },
  picnic:     { line: 'had a picnic.',                 icon: 'basket' },
  rainbow:    { line: 'slid down a rainbow.',          icon: 'rainbow' },
  trampoline: { line: 'bounced on the trampoline.',    icon: 'trampoline' },
  highfive:   { line: 'did high fives in the playroom.', icon: 'hand' },
  seesaw:     { line: 'rode the seesaw in the backyard.', icon: 'seesaw' },
  ball:       { line: 'played catch in the backyard.', icon: 'catch' },
  sleep:      { line: 'fell asleep in the bedroom.',   icon: 'moon' },
  chase:      { line: 'played chase in the playroom.', icon: 'ball' },
  treat:      { line: 'shared treats in the kitchen.', icon: 'treat' },
};
let bookPage = 0;
const bookDays = () => Object.keys(S.book).filter(k => S.book[k].length).sort();
function bookSentence(types) {
  const both = SETTINGS.players.left.pet + ' and ' + SETTINGS.players.right.pet;
  const rank = k => (BOOK_LINES[k].rank != null ? BOOK_LINES[k].rank : 100 - Object.keys(BOOK_LINES).indexOf(k));
  const best = Object.keys(BOOK_LINES).filter(k => types.includes(k)).sort((a, b) => rank(b) - rank(a))[0];
  return both + ' ' + (best ? BOOK_LINES[best].line : 'are best friends.');
}
function dayWord(key) {
  if (!key) return 'Today';
  const [y, m, d] = key.split('-').map(Number), day = new Date(y, m - 1, d);
  const diff = Math.round((new Date(new Date().toDateString()) - day) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day.getDay()];
}
function openBook() {
  if (scene !== 'play') return;
  const days = bookDays();
  bookPage = Math.max(0, days.length - 1);       // open on the newest page
  $('#book').classList.add('show');
  Sound.play('page');
  renderBook();
}
function closeBook() { $('#book').classList.remove('show'); }
function turnPage(dir) {
  const days = bookDays(), next = bookPage + dir;
  if (next < 0 || next >= days.length) return;
  bookPage = next;
  Sound.play('page');
  renderBook();
  animate($('#book .book'), [{ transform: `translateX(${dir * 3}vmin)`, opacity: .5 }, { transform: 'none', opacity: 1 }], { duration: 300, easing: 'ease-out' });
}
function renderBook() {
  const days = bookDays(), key = days[bookPage], types = key ? S.book[key] : [];
  const sentence = bookSentence(types);
  const box = $('#book .book');
  box.innerHTML = `
    <div class="page lp"><div class="book-pets"><div class="art happy"></div><div class="art happy"></div></div><div class="book-pics"></div></div>
    <div class="page rp"><div class="book-day"></div><div class="book-line"></div><div class="say-all word">${ICONS.speaker}</div></div>
    <div class="book-btn book-close">${ICONS.close}</div>
    <div class="book-btn book-prev ${bookPage > 0 ? '' : 'off'}">${ICONS.prev}</div>
    <div class="book-btn book-next ${bookPage < days.length - 1 ? '' : 'off'}">${ICONS.next}</div>`;
  const petBoxes = box.querySelectorAll('.book-pets > div');
  fillArt(petBoxes[0], 'left'); fillArt(petBoxes[1], 'right');
  const pics = box.querySelector('.book-pics');
  Object.keys(BOOK_LINES).filter(k => types.includes(k)).forEach(k => pics.append(el('div', '', ICONS[BOOK_LINES[k].icon])));
  sayableInto(box.querySelector('.book-day'), dayWord(key));
  wordsInto(box.querySelector('.book-line'), sentence);
  box.querySelector('.say-all').dataset.say = sentence;
  onPress(box.querySelector('.book-close'), closeBook);
  onPress(box.querySelector('.book-prev'), () => turnPage(-1));
  onPress(box.querySelector('.book-next'), () => turnPage(1));
  BOOK_PAGE_HOOKS.forEach(f => f(box, key));
}
const BOOK_PAGE_HOOKS = [];   // other parts of the game add to a book page: (box, day)
