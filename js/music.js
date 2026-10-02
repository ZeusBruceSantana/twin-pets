'use strict';
/* Twin Pets: soft background music, a different tune for each room and place.
   The tunes are written by this code (not recordings and not existing songs): each one
   is made from its own "seed", so a room always has the same tune. Grown-ups can turn
   the music off in the grown-up corner, separately from the sounds. */

/* ---------- the pieces ---------- */
// key: the lowest note of the tune.  scale: major or the gentler pentatonic.
// chords: four chords, as steps of the scale (0 = the home chord).  lead: the melody's voice.
const MAJOR = [0, 2, 4, 5, 7, 9, 11];
const PIECES = {
  title:     { seed: 11, key: 60, bpm: 84,  beats: 4, chords: [0, 5, 3, 4], lead: 'sine' },
  playroom:  { seed: 23, key: 67, bpm: 112, beats: 4, chords: [0, 5, 3, 4], lead: 'triangle', bounce: true, shaker: true },
  kitchen:   { seed: 37, key: 65, bpm: 126, beats: 3, chords: [0, 4, 3, 4], lead: 'sine', box: true },
  bathroom:  { seed: 41, key: 62, bpm: 96,  beats: 4, chords: [0, 5, 3, 4], lead: 'sine', extra: 'bubbles' },
  backyard:  { seed: 53, key: 69, bpm: 104, beats: 4, chords: [0, 5, 3, 4], lead: 'triangle', extra: 'birds' },
  bedroom:   { seed: 61, key: 63, bpm: 72,  beats: 3, chords: [0, 5, 3, 4], lead: 'sine', soft: true },
  frontyard: { seed: 71, key: 60, bpm: 100, beats: 4, chords: [0, 3, 5, 4], lead: 'triangle', extra: 'birds' },
  school:    { seed: 83, key: 70, bpm: 92,  beats: 4, chords: [0, 5, 3, 4], lead: 'triangle' },
  beach:     { seed: 97, key: 67, bpm: 108, beats: 4, chords: [0, 3, 4, 0], lead: 'sine', box: true, shaker: true, extra: 'waves' },
  park:      { seed: 101, key: 62, bpm: 100, beats: 4, chords: [0, 3, 4, 0], lead: 'triangle', extra: 'birds' },
  icecream:  { seed: 113, key: 64, bpm: 116, beats: 4, chords: [0, 5, 3, 4], lead: 'sine', box: true },
};

/* ---------- writing a tune ---------- */
function seeded(seed) {           // a dice that always rolls the same numbers for the same seed
  let a = seed * 2654435761 >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const RHYTHMS = {
  4: [[1, 1, 1, 1], [1, 0.5, 0.5, 1, 1], [0.5, 0.5, 1, 0.5, 0.5, 1], [1.5, 0.5, 1, 1], [2, 1, 1], [1, 1, 2], [0.5, 0.5, 0.5, 0.5, 2]],
  3: [[1, 1, 1], [2, 1], [1, 0.5, 0.5, 1], [1.5, 0.5, 1], [1, 2]],
};
// eight bars: a little idea, the idea again on new chords, something new, then home.
// The tune rises and falls in a gentle arch, moving mostly by small steps.
const ARCH = [9, 10, 11, 10, 12, 11, 9, 8];
function compose(p) {
  const roll = seeded(p.seed), choose = list => list[Math.floor(roll() * list.length)];
  const R = RHYTHMS[p.beats];
  const inChord = (deg, chord) => [chord, chord + 2, chord + 4].map(d => ((d % 7) + 7) % 7).includes(((deg % 7) + 7) % 7);
  const idea = [choose(R), choose(R)];
  const bars = [];
  let deg = 9, prev = null, repeats = 0;
  for (let bar = 0; bar < 7; bar++) {
    const chord = p.chords[bar % 4], target = ARCH[bar];
    const rhythm = bar < 4 ? idea[bar % 2] : choose(R);
    const notes = [];
    let pos = 0;
    rhythm.forEach(len => {
      const strong = pos === 0 || (p.beats === 4 && pos === 2);
      if (strong) {
        // a note of the chord, near where we are, leaning toward the arch
        let best = null, score = 1e9;
        for (let d = deg - 3; d <= deg + 3; d++) {
          if (!inChord(d, chord)) continue;
          const sc = Math.abs(d - target) + (d === prev && repeats >= 1 ? 4 : 0) + roll() * 0.8;
          if (sc < score) { score = sc; best = d; }
        }
        deg = best;
      } else {
        const toward = Math.sign(target - deg) || choose([-1, 1]);
        deg += roll() < 0.72 ? toward : -toward;
        if (roll() < 0.12) deg += toward;                // now and then a little leap
      }
      deg = Math.max(6, Math.min(14, deg));
      repeats = deg === prev ? repeats + 1 : 0;
      const rest = !strong && roll() < 0.06;
      notes.push([rest ? null : deg, len]);
      if (!rest) prev = deg;
      pos += len;
    });
    bars.push(notes);
  }
  bars.push(p.beats === 4 ? [[prev > 8 ? 8 : 9, 1], [7, 3]] : [[8, 1], [7, 2]]);   // and home
  return bars;
}
const degToMidi = (p, deg) => p.key - 12 + 12 * Math.floor(deg / 7) + MAJOR[((deg % 7) + 7) % 7];

/* ---------- playing ---------- */
const Music = (() => {
  let now = null;          // { name, p, bars, gain, bar, loop, nextAt }
  let ducked = false;
  function start(name, e) {
    const p = PIECES[name];
    const gain = e.ctx.createGain();
    gain.gain.value = 0.0001;
    gain.connect(e.bgm);
    gain.gain.setTargetAtTime(p.soft ? 0.32 : 0.45, e.ctx.currentTime + 0.4, 1.2);   // fade in
    now = { name, p, bars: compose(p), gain, bar: 0, loop: 0, nextAt: e.ctx.currentTime + 0.6 };
  }
  function stop(e) {
    if (!now) return;
    const g = now.gain;
    g.gain.cancelScheduledValues(e.ctx.currentTime);
    g.gain.setTargetAtTime(0.0001, e.ctx.currentTime, 0.6);                          // fade out
    setTimeout(() => g.disconnect(), 4000);
    now = null;
  }
  function scheduleBar(e, m) {
    const { p, bars } = m, beat = 60 / p.bpm, t0 = m.nextAt - e.ctx.currentTime, chord = p.chords[m.bar % 4];
    const dest = m.gain, tone = (f, at, dur, o) => e.tone(f, t0 + at, dur, Object.assign({ dest }, o));
    // the melody (every fourth time through, it rests and the music just hums along)
    if (m.loop % 4 !== 2) {
      let at = 0;
      const up = m.loop % 4 === 1 ? 12 : 0;            // the second time, a little higher, like a music box
      bars[m.bar].forEach(([deg, len]) => {
        if (deg != null) {
          const f = e.NOTE(degToMidi(p, deg) + up);
          tone(f, at, Math.max(0.18, len * beat * (p.bounce ? 0.55 : 0.92)), { type: up || p.box ? 'sine' : p.lead, vol: up ? 0.035 : 0.05, attack: p.soft ? 0.12 : 0.03 });
        }
        at += len * beat;
      });
    }
    // the bass and the soft chord underneath
    const root = degToMidi(p, chord) - 12;
    tone(e.NOTE(root), 0, beat * 1.6, { type: 'sine', vol: 0.06, attack: 0.04, pure: true });
    if (p.beats === 4) tone(e.NOTE(root + 7), beat * 2, beat * 1.4, { type: 'sine', vol: 0.045, attack: 0.04, pure: true });
    else [1, 2].forEach(b => [2, 4].forEach(s => tone(e.NOTE(degToMidi(p, chord + s)), beat * b, beat * 0.6, { type: 'sine', vol: 0.014, attack: 0.03 })));
    [0, 2, 4].forEach(s => tone(e.NOTE(degToMidi(p, chord + s)), 0, beat * p.beats * 1.05, { type: 'sine', vol: 0.012, attack: beat * 0.8 }));
    // little extras
    if (p.shaker) for (let b = 0; b < p.beats; b++) e.noise(t0 + b * beat + beat / 2, 0.06, { freq: 3200, q: 1.5, vol: 0.006, dest });
    if (p.extra === 'birds' && Math.random() < 0.35) {
      const at = Math.random() * beat * p.beats, f = 1800 + Math.random() * 900;
      tone(f, at, 0.09, { to: f * 1.3, vol: 0.012, pure: true }); tone(f * 1.1, at + 0.12, 0.08, { to: f * 1.4, vol: 0.01, pure: true });
    }
    if (p.extra === 'bubbles' && Math.random() < 0.5) { const f = 600 + Math.random() * 500; tone(f, Math.random() * beat * p.beats, 0.08, { to: f * 1.7, vol: 0.012, pure: true }); }
    if (p.extra === 'waves' && m.bar % 2 === 0) e.noise(t0, beat * p.beats * 2, { filter: 'lowpass', freq: 500, vol: 0.012, attack: beat * 2, dest });
    m.nextAt += beat * p.beats;
    m.bar = (m.bar + 1) % 8;
    if (m.bar === 0) m.loop++;
  }
  // Which tune should be playing right now?
  function wanted(evenInTests) {
    if (S.sound.music === false || (TEST_MODE && !evenInTests)) return null;
    if (S.bedtime || ['night', 'goodnight', 'morning', 'boot'].includes(scene)) return null;   // the lullaby takes over
    if (['title', 'pick'].includes(scene)) return 'title';
    if (act && act.kind === 'trip') return act.opts.place;
    return PIECES[S.room] ? S.room : 'playroom';
  }
  function tick() {
    const e = Sound.engine();
    if (!e) return;
    const name = wanted();
    if (!now || now.name !== name) { stop(e); if (name) start(name, e); }
    if (!now) return;
    // special moments with their own tunes (chase, parties): the music steps aside
    const quiet = ['chase', 'surprise', 'goodnight'].includes(scene);
    if (quiet !== ducked) {
      ducked = quiet;
      now.gain.gain.setTargetAtTime(quiet ? 0.0001 : (now.p.soft ? 0.32 : 0.45), e.ctx.currentTime, 0.5);
    }
    if (now.nextAt < e.ctx.currentTime) now.nextAt = e.ctx.currentTime + 0.1;           // after a pause, carry on
    while (now.nextAt < e.ctx.currentTime + 1.2) scheduleBar(e, now);
  }
  setInterval(tick, 300);
  return { tick, wanted, playing: () => (now ? now.name : null) };
})();
