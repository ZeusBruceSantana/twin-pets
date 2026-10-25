'use strict';
/* Twin Pets: the art museum teaches art styles. The same little scene (a sun over a hill with a tree)
   is painted seven ways, all drawn for this game, so the girls can see how one picture can look
   different. Each style has a kid word (tap to hear), its real name, and a few words about it. The pet
   joins in with a little effect, and a puzzle asks "which one is made of dots?". */

/* ---------- the paintings (made in code, always the same) ---------- */
function artRng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const hillAt = x => 64 + 5 * Math.sin(x / 15) + 3 * Math.cos(x / 7);
/* what color the scene is at a point (used to paint the dots and the brush strokes) */
function sceneColor(x, y, r) {
  if (Math.hypot(x - 72, y - 22) < 11) return r() < 0.5 ? '#ffcf3a' : '#ffe27a';
  if (x > 27 && x < 33 && y > 50 && y < 72) return '#8a5a3c';
  if (Math.hypot(x - 30, y - 42) < 15 || Math.hypot(x - 22, y - 48) < 9 || Math.hypot(x - 39, y - 47) < 10) return r() < 0.5 ? '#2f8a3a' : '#52b04c';
  if (y > hillAt(x) + 12) return r() < 0.5 ? '#4ea83c' : '#6cc551';
  if (y > hillAt(x)) return r() < 0.5 ? '#62c04a' : '#7fd35a';
  return y < 30 ? (r() < 0.5 ? '#7fc4ff' : '#9ed2ff') : (r() < 0.5 ? '#b3dcff' : '#cfe9ff');
}
function dotsPainting() {
  const r = artRng(7); let s = '<rect width="100" height="100" fill="#fff8ec"/>';
  for (let y = 2; y < 100; y += 3.6) for (let x = 2; x < 100; x += 3.6) s += `<circle cx="${(x + r() * 1.2).toFixed(1)}" cy="${(y + r() * 1.2).toFixed(1)}" r="1.55" fill="${sceneColor(x, y, r)}"/>`;
  return s;
}
function strokesPainting() {
  const r = artRng(11); let s = '<rect width="100" height="100" fill="#e9f1fb"/>';
  for (let y = 3; y < 100; y += 5.6) for (let x = 3; x < 100; x += 5.6) {
    const px = x + (r() - 0.5) * 3, py = y + (r() - 0.5) * 3;
    s += `<path d="M${px.toFixed(1)} ${py.toFixed(1)} q3 ${(r() * 4 - 3).toFixed(1)} 6 ${(r() * 2 - 1).toFixed(1)}" stroke="${sceneColor(px, py, r)}" stroke-width="3.2" stroke-linecap="round" fill="none"/>`;
  }
  return s;
}
const ART_PAINTINGS = {
  real: '<defs><linearGradient id="as-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fc4ff"/><stop offset="1" stop-color="#d9f0ff"/></linearGradient></defs><rect width="100" height="100" fill="url(#as-sky)"/><circle cx="72" cy="22" r="11" fill="#ffd23f"/><path d="M0 70 C25 56 60 62 100 58 V100 H0Z" fill="#6cc551"/><path d="M0 82 C30 72 70 78 100 72 V100 H0Z" fill="#58b043"/><rect x="27.500" y="50" width="5" height="22" fill="#8a5a3c"/><circle cx="30" cy="42" r="15" fill="#3a9a3a"/><circle cx="22" cy="48" r="9" fill="#44aa44"/><circle cx="39" cy="47" r="10" fill="#44aa44"/>',
  bold: '<defs><pattern id="as-ben" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.700" fill="#ff4f6d"/></pattern></defs><rect width="100" height="100" fill="#ffe14d"/><rect width="100" height="62" fill="url(#as-ben)"/><circle cx="72" cy="22" r="12" fill="#ff3b5c" stroke="#111" stroke-width="2.600"/><path d="M0 68 C25 54 60 60 100 56 V100 H0Z" fill="#3d7bff" stroke="#111" stroke-width="2.600"/><rect x="27" y="50" width="6" height="22" fill="#ff4fd8" stroke="#111" stroke-width="2.600"/><circle cx="30" cy="42" r="15" fill="#2ee27a" stroke="#111" stroke-width="2.600"/><path d="M0 84 H100" stroke="#111" stroke-width="2.600"/>',
  shapes: '<path d="M0 0 H55 L30 60 L0 40Z" fill="#7fc4ff"/><path d="M55 0 H100 V35 L60 55 L30 60Z" fill="#a9d6ff"/><path d="M0 40 L30 60 L20 100 H0Z" fill="#6cc551"/><path d="M30 60 L60 55 L100 62 V100 H20Z" fill="#58b043"/><path d="M60 55 L100 35 V62Z" fill="#8fd16a"/><path d="M62 8 L82 10 L86 28 L70 36 L58 24Z" fill="#ffd23f"/><path d="M62 8 L70 36 L58 24Z" fill="#ffb020"/><path d="M26 52 L34 50 L33 74 L27 72Z" fill="#8a5a3c"/><path d="M30 24 L46 36 L40 54 L20 54 L14 36Z" fill="#2f8a3a"/><path d="M30 24 L46 36 L30 40Z" fill="#52b04c"/><path d="M20 54 L14 36 L30 40Z" fill="#3a9a3a"/><g fill="none" stroke="#3e3a4f" stroke-width="1"><path d="M55 0 L30 60 L60 55 L100 35 M0 40 L30 60 L20 100"/></g>',
  dreamy: '<defs><linearGradient id="as-dr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3f9a"/><stop offset=".6" stop-color="#d98ac8"/><stop offset="1" stop-color="#ffd1a8"/></linearGradient></defs><rect width="100" height="100" fill="url(#as-dr)"/><g fill="#fff6c8"><circle cx="12" cy="12" r="1.200"/><circle cx="44" cy="8" r="1"/><circle cx="90" cy="46" r="1.200"/><circle cx="20" cy="30" r=".8"/></g><circle cx="70" cy="30" r="16" fill="#ffd23f"/><path d="M58 40 C58 54 62 56 62 62 M70 44 C70 58 74 60 74 70 M80 40 C80 50 82 52 82 58" stroke="#ffd23f" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="64" cy="27" r="2" fill="#5a3f9a"/><circle cx="76" cy="27" r="2" fill="#5a3f9a"/><path d="M65 35 Q70 39 75 35" stroke="#5a3f9a" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="28" cy="60" rx="20" ry="6" fill="#8a5a3c"/><path d="M28 54 V34" stroke="#6b4a3a" stroke-width="3"/><circle cx="28" cy="28" r="10" fill="#52b04c"/><path d="M8 82 C14 76 26 76 32 82 C26 88 14 88 8 82Z M32 82 L38 76 V88Z" fill="#ff9a4d"/>',
  splash: '<rect width="100" height="100" fill="#fff4e8"/><circle cx="30" cy="34" r="22" fill="#ff5d8f" opacity=".85"/><circle cx="68" cy="30" r="16" fill="#ffd23f" opacity=".9"/><circle cx="56" cy="68" r="24" fill="#4aa8ff" opacity=".8"/><path d="M6 80 C 30 50, 50 90, 94 40" stroke="#7a3fd1" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M10 20 C 40 10, 60 24, 92 14" stroke="#2ee27a" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="84" cy="80" r="9" fill="#ff8a3d"/><circle cx="16" cy="64" r="5" fill="#2ee27a"/><circle cx="46" cy="14" r="4" fill="#7a3fd1"/><path d="M70 52 l6 -12 l4 12 l12 2 l-10 6 l2 12 l-10 -8 l-10 6 l4 -12Z" fill="#fff" opacity=".8"/>',
};
ART_PAINTINGS.dots = dotsPainting();
ART_PAINTINGS.swirls = strokesPainting();
const artSvg = key => `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">${ART_PAINTINGS[key]}</svg>`;

const ART_STYLES = [
  { key: 'real',   word: 'real',   name: 'Realism',        note: 'looks like real life' },
  { key: 'dots',   word: 'dots',   name: 'Pointillism',    note: 'made of tiny dots' },
  { key: 'bold',   word: 'bold',   name: 'Pop Art',        note: 'big bright colors' },
  { key: 'swirls', word: 'brushy', name: 'Impressionism',  note: 'soft brush strokes' },
  { key: 'shapes', word: 'shapes', name: 'Cubism',         note: 'made of shapes' },
  { key: 'dreamy', word: 'dreamy', name: 'Surrealism',     note: 'a floating dream' },
  { key: 'splash', word: 'splash', name: 'Abstract',       note: 'just color and feeling' },
];
const artStyle = key => ART_STYLES.find(s => s.key === key);
const framedThumb = key => `<svg viewBox="0 0 100 100"><rect x="6" y="8" width="88" height="84" rx="5" fill="#e0b84a" stroke="#b9892a" stroke-width="4"/><svg x="14" y="16" width="72" height="68" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">${ART_PAINTINGS[key]}</svg></svg>`;

/* ---------- looking at art in the museum ---------- */
TRIP_PLAY.look = function (a, side) {
  S.artSeen = S.artSeen || {};
  openPanel(side, {
    cols: 3,
    items: ART_STYLES.map(st => ({ key: st.key, word: st.word, icon: framedThumb(st.key), cls: S.artSeen[st.key] ? 'on' : '' })),
    onPick: k => { if (act === a) showArtStyle(a, side, artStyle(k)); },
  });
};
function showArtStyle(a, side, st) {
  const bg = a.data.bg;
  const frame = bg.querySelector('.mframe.f1');
  frame.querySelector('.mpic').innerHTML = artSvg(st.key);
  frame.classList.add('hung');
  Sound.play('pick');
  animate(frame, [{ transform: 'scale(.4)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }], { duration: 400, easing: 'ease-out' });
  // what it is called, and a few words about it (tap to hear)
  bg.querySelectorAll('.mcap').forEach(c => c.remove());
  const cap = el('div', 'mcap', '<div class="mcap-word"></div><div class="mcap-name"></div><div class="mcap-note"></div>');
  sayableInto(cap.querySelector('.mcap-word'), st.word);
  sayableInto(cap.querySelector('.mcap-name'), st.name);
  sayableInto(cap.querySelector('.mcap-note'), st.note);
  cap.style.pointerEvents = 'auto';
  bg.append(cap);
  Speech.say(st.word + '. ' + st.note);
  artStyleFx(pets[side], st.key);
  S.artSeen = S.artSeen || {};
  const first = !S.artSeen[st.key];
  S.artSeen[st.key] = true;
  save();
  if (first) logDay('artstyle');
  if (ART_STYLES.every(x => S.artSeen[x.key]) && !S.artAll) {          // she has seen every style: an art expert gets a prize
    S.artAll = true;
    S.puzzleOwed = (S.puzzleOwed || 0) + 1;
    save();
    setTimeout(() => { showHint('gframe', 'art stars', true); celebrate(W() / 2, H() * 0.46, 14); SIDES.forEach(s => floatHearts(pets[s], 3)); }, 1400);
  }
}
BOOK_LINES.artstyle = { line: 'learned about art styles.', icon: 'gframe', rank: 95 };

/* The pet joins in: it looks a little like the style for a moment. */
function artStyleFx(p, key) {
  const cls = ['sty-real', 'sty-dots', 'sty-bold', 'sty-swirls', 'sty-shapes', 'sty-dreamy', 'sty-splash'];
  p.root.classList.remove(...cls);
  void p.root.offsetWidth;
  p.root.classList.add('sty-' + key);
  clearTimeout(p.styleTimer);
  p.styleTimer = setTimeout(() => p.root.classList.remove('sty-' + key), 4500);
  mood(p, 'happy', 2200);
  const m = petPoint(p, 0.5, 0.5);
  if (key === 'dots') for (let i = 0; i < 16; i++) { const d = prop('<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="currentColor"/></svg>', rand(1.4, 2.6), m.x + rand(-9, 9) * 8, m.y + rand(-9, 9) * 8); d.style.color = pick(['#ff5d8f', '#ffd23f', '#4aa8ff', '#6cc551', '#a77bff']); d.style.zIndex = 31; animate(d.firstChild, [{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(1.2)', opacity: 1, offset: .4 }, { transform: 'scale(1)', opacity: 0 }], { duration: 2400, delay: i * 60, fill: 'both' }).then(() => d.remove()); }
  if (key === 'splash') for (let i = 0; i < 10; i++) { const d = prop('<svg viewBox="0 0 20 20"><path d="M10 1 C14 3 19 6 17 11 C16 17 9 19 5 15 C1 12 3 5 10 1Z" fill="currentColor"/></svg>', rand(3, 6), m.x + rand(-11, 11) * 8, m.y + rand(-9, 9) * 8); d.style.color = pick(['#ff5d8f', '#ffd23f', '#4aa8ff', '#2ee27a', '#7a3fd1']); d.style.zIndex = 31; animate(d.firstChild, [{ transform: 'scale(0) rotate(0)', opacity: .9 }, { transform: 'scale(1) rotate(30deg)', opacity: .9, offset: .3 }, { transform: 'scale(1) rotate(30deg)', opacity: 0 }], { duration: 2800, delay: i * 90, fill: 'both' }).then(() => d.remove()); }
  if (key === 'bold') sayBubble(p, 'Pop!', 2000);
  if (key === 'shapes') sparkles(m.x, m.y, 6, ['#ffd23f', '#7fc4ff', '#6cc551']);
}

/* ---------- the "which one is it?" puzzle ---------- */
function styleRound(side) {
  const picks = shuffle(ART_STYLES.slice()).slice(0, 3), target = picks[0];
  const box = pzHalf(side);
  box.innerHTML = `<div class="pz-word"></div><div class="pz-opts">${shuffle(picks.slice()).map(s => `<div class="pz-opt art" data-k="${s.key}">${artSvg(s.key)}</div>`).join('')}</div>`;
  sayableInto(box.querySelector('.pz-word'), target.word);
  Speech.say(target.word);
  pz.tries[side] = 0;
  const answerNode = box.querySelector(`.pz-opt[data-k="${target.key}"]`);
  box.querySelectorAll('.pz-opt').forEach(o => onPress(o, () => pzAnswer(side, o.dataset.k === target.key, o, answerNode)));
}
PUZZLE_KINDS.style = styleRound;
