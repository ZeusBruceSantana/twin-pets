'use strict';
/* Twin Pets: decorating the house (wallpaper, rugs and furniture come as presents and are
   placed room by room) and the sleepover in the bedroom. */

/* =====================================================================
   DECORATING
   After the presents party, the house gets a present too. Both girls tap
   to open it, then both choose a room on the map to put it in.
   ===================================================================== */
const DECOR = {
  rugRound:   { kind: 'rug',  word: 'rug',       svg: '<svg viewBox="0 0 200 60"><ellipse cx="100" cy="30" rx="98" ry="28" fill="#ffb3c8"/><ellipse cx="100" cy="30" rx="78" ry="21" fill="#fff4f8"/><ellipse cx="100" cy="30" rx="56" ry="14" fill="#ffd9e8"/><ellipse cx="100" cy="30" rx="30" ry="7" fill="#ffb3c8"/></svg>' },
  wpStars:    { kind: 'wp',   word: 'wallpaper', svg: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="10" fill="#dfe9ff"/><g fill="#ffd23f"><path d="M24 14 l4 9 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1z"/><path d="M70 44 l4 9 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1z"/><path d="M28 64 l3 7 l7 1 l-5 5 l1 7 l-6 -4 l-6 4 l1 -7 l-5 -5 l7 -1z"/></g></svg>' },
  plant:      { kind: 'item', word: 'plant',     svg: '<svg viewBox="0 0 100 120"><path d="M30 80 H70 L64 116 H36Z" fill="#ff9a7a" stroke="#d9704f" stroke-width="3" stroke-linejoin="round"/><path d="M50 80 V40" stroke="#4f9a34" stroke-width="4"/><g fill="#7fd36a" stroke="#4f9a34" stroke-width="2.5"><path d="M50 60 C 30 60, 18 46, 20 30 C 38 30, 50 44, 50 60Z"/><path d="M50 50 C 70 50, 82 36, 80 20 C 62 20, 50 34, 50 50Z"/><path d="M50 42 C 42 30, 44 14, 54 6 C 62 18, 58 32, 50 42Z"/><path d="M50 74 C 34 76, 24 70, 20 60 C 34 56, 46 62, 50 74Z"/></g></svg>' },
  lamp:       { kind: 'item', word: 'lamp',      svg: '<svg viewBox="0 0 100 120"><circle cx="50" cy="36" r="34" fill="#fff6c8" opacity=".55"/><path d="M28 50 L38 14 H62 L72 50Z" fill="#ffe066" stroke="#e0b030" stroke-width="3" stroke-linejoin="round"/><path d="M50 50 V108" stroke="#b07f4f" stroke-width="5"/><ellipse cx="50" cy="110" rx="20" ry="6" fill="#b07f4f"/></svg>' },
  wpHearts:   { kind: 'wp',   word: 'wallpaper', svg: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="10" fill="#ffeef4"/><g fill="#ff9ab4"><path d="M28 30 C 22 22, 12 26, 16 34 L28 46 L40 34 C 44 26, 34 22, 28 30Z"/><path d="M72 58 C 66 50, 56 54, 60 62 L72 74 L84 62 C 88 54, 78 50, 72 58Z"/><path d="M30 72 C 26 67, 19 70, 22 75 L30 83 L38 75 C 41 70, 34 67, 30 72Z"/></g></svg>' },
  beanbag:    { kind: 'item', word: 'beanbag',   svg: '<svg viewBox="0 0 100 120"><path d="M14 112 C 4 90, 20 54, 50 52 C 80 54, 96 90, 86 112Z" fill="#a6d8ff" stroke="#5aa9ff" stroke-width="3"/><path d="M30 70 C 40 80, 60 80, 70 70" stroke="#5aa9ff" stroke-width="3" fill="none"/></svg>' },
  rugStar:    { kind: 'rug',  word: 'rug',       svg: '<svg viewBox="0 0 200 60"><path d="M100 2 L120 22 L196 30 L120 38 L100 58 L80 38 L4 30 L80 22Z" fill="#c3a6ff" stroke="#8b7fd1" stroke-width="3" stroke-linejoin="round"/><circle cx="100" cy="30" r="10" fill="#fff"/></svg>' },
  wpStripes:  { kind: 'wp',   word: 'wallpaper', svg: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="10" fill="#fff"/><path d="M10 0 V100 M30 0 V100 M50 0 V100 M70 0 V100 M90 0 V100" stroke="#b5e7c8" stroke-width="10"/></svg>' },
  fishbowl:   { kind: 'item', word: 'fish bowl', svg: '<svg viewBox="0 0 100 120"><rect x="26" y="96" width="48" height="20" rx="4" fill="#c99a6b"/><circle cx="50" cy="62" r="34" fill="#dff4fb" stroke="#9fb8cc" stroke-width="3"/><path d="M18 60 H82 C 82 80, 68 96, 50 96 C 32 96, 18 80, 18 60Z" fill="#9fdcff"/><path d="M40 72 C 46 64, 58 64, 62 72 C 58 80, 46 80, 40 72Z M62 72 L70 66 V78Z" fill="#ffa24d"/><circle cx="45" cy="71" r="1.6" fill="#3e3a4f"/></svg>' },
};
/* ---- more to decorate with: paint, wallpaper, rugs, furniture and electronics ---- */
const paintCan = c => `<svg viewBox="0 0 100 100"><path d="M18 36 H82 L76 90 C 75 94, 72 96, 68 96 H32 C 28 96, 25 94, 24 90Z" fill="#e6ecf5" stroke="#9aa6bd" stroke-width="4" stroke-linejoin="round"/><ellipse cx="50" cy="36" rx="32" ry="10" fill="${c}" stroke="#9aa6bd" stroke-width="4"/><path d="M64 36 C 64 22, 78 20, 82 10" stroke="#9aa6bd" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="34" y="56" width="32" height="22" rx="6" fill="${c}"/></svg>`;
[['paintSky', '#bfe3ff'], ['paintPeach', '#ffd3b8'], ['paintMint', '#c9f0dc'], ['paintLilac', '#e3d4ff'], ['paintButter', '#fff0a8'], ['paintRose', '#ffc9db'], ['paintAqua', '#b4ecee'], ['paintLime', '#dff3a8']]
  .forEach(([k, c]) => { DECOR[k] = { kind: 'paint', word: 'paint', color: c, svg: paintCan(c) }; });
/* A wallpaper is a little picture (drawn on a 20 by 20 square) that repeats on the wall. */
function wallpaper(key, bg, tile) {
  DECOR[key] = { kind: 'wp', word: 'wallpaper', bg, tile: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">${tile}</svg>`,
    svg: `<svg viewBox="0 0 100 100"><defs><pattern id="pw-${key}" width="25" height="25" patternUnits="userSpaceOnUse"><g transform="scale(1.25)">${tile}</g></pattern></defs><rect width="100" height="100" rx="10" fill="${bg}"/><rect width="100" height="100" rx="10" fill="url(#pw-${key})"/></svg>` };
}
wallpaper('wpDots', '#fff0c9', '<circle cx="5" cy="5" r="3" fill="#ffb36b"/><circle cx="15" cy="15" r="3" fill="#ff8fb8"/>');
wallpaper('wpClouds', '#cfeaff', '<path d="M3 10 a3 3 0 0 1 5 -2 a4 4 0 0 1 7 1 a3 3 0 0 1 0 5 H5 a3 3 0 0 1 -2 -4Z" fill="#fff"/>');
wallpaper('wpRainbow', '#fff', '<rect x="0" width="4" height="20" fill="#ff8a8a"/><rect x="4" width="4" height="20" fill="#ffd27a"/><rect x="8" width="4" height="20" fill="#9fe08a"/><rect x="12" width="4" height="20" fill="#8ac8ff"/><rect x="16" width="4" height="20" fill="#c9a6ff"/>');
wallpaper('wpFlowers', '#e8f7e0', '<circle cx="10" cy="10" r="2" fill="#ffd23f"/><g fill="#ff9ab4"><circle cx="10" cy="5" r="2.6"/><circle cx="10" cy="15" r="2.6"/><circle cx="5" cy="10" r="2.6"/><circle cx="15" cy="10" r="2.6"/></g>');
wallpaper('wpWaves', '#d9f1ff', '<path d="M0 6 q5 -5 10 0 t10 0 M0 16 q5 -5 10 0 t10 0" fill="none" stroke="#7fc4ff" stroke-width="2" stroke-linecap="round"/>');
wallpaper('wpMoons', '#32407f', '<path d="M7 3 a4 4 0 1 0 4 6 a3 3 0 0 1 -4 -6Z" fill="#fff6c8"/><circle cx="16" cy="14" r="1.2" fill="#fff6c8"/><circle cx="4" cy="16" r=".9" fill="#fff6c8"/>');
wallpaper('wpPaws', '#fff4e6', '<g fill="#e8b071"><ellipse cx="10" cy="12" rx="3.6" ry="3"/><circle cx="5.5" cy="7" r="1.5"/><circle cx="8.5" cy="4.5" r="1.5"/><circle cx="11.5" cy="4.5" r="1.5"/><circle cx="14.5" cy="7" r="1.5"/></g>');
Object.assign(DECOR, {
  rugHeart:   { kind: 'rug', word: 'rug', svg: '<svg viewBox="0 0 200 60"><path d="M100 56 C 40 44, 6 30, 14 18 C 22 4, 62 6, 100 24 C 138 6, 178 4, 186 18 C 194 30, 160 44, 100 56Z" fill="#ff9ab4" stroke="#d9608f" stroke-width="3" stroke-linejoin="round"/><path d="M100 44 C 60 36, 36 28, 40 22 C 46 14, 74 16, 100 28 C 126 16, 154 14, 160 22 C 164 28, 140 36, 100 44Z" fill="#ffd9e4"/></svg>' },
  rugRainbow: { kind: 'rug', word: 'rug', svg: '<svg viewBox="0 0 200 60"><ellipse cx="100" cy="30" rx="98" ry="28" fill="#ff8a8a"/><ellipse cx="100" cy="30" rx="84" ry="24" fill="#ffd27a"/><ellipse cx="100" cy="30" rx="70" ry="20" fill="#9fe08a"/><ellipse cx="100" cy="30" rx="56" ry="16" fill="#8ac8ff"/><ellipse cx="100" cy="30" rx="42" ry="12" fill="#c9a6ff"/><ellipse cx="100" cy="30" rx="26" ry="7" fill="#fff"/></svg>' },
  rugPaw:     { kind: 'rug', word: 'rug', svg: '<svg viewBox="0 0 200 60"><ellipse cx="100" cy="30" rx="98" ry="28" fill="#ffe2b8" stroke="#e8b071" stroke-width="3"/><g fill="#e8b071"><ellipse cx="100" cy="38" rx="18" ry="12"/><ellipse cx="66" cy="24" rx="8" ry="10"/><ellipse cx="84" cy="14" rx="8" ry="10"/><ellipse cx="116" cy="14" rx="8" ry="10"/><ellipse cx="134" cy="24" rx="8" ry="10"/></g></svg>' },
  // furniture
  sofa:       { kind: 'item', word: 'sofa', svg: '<svg viewBox="0 0 100 120"><rect x="10" y="52" width="80" height="44" rx="12" fill="#ff9ab4" stroke="#d9608f" stroke-width="4"/><rect x="2" y="64" width="22" height="40" rx="10" fill="#ff7a9f" stroke="#d9608f" stroke-width="4"/><rect x="76" y="64" width="22" height="40" rx="10" fill="#ff7a9f" stroke="#d9608f" stroke-width="4"/><path d="M50 56 V86" stroke="#d9608f" stroke-width="3"/><path d="M20 104 V112 M80 104 V112" stroke="#b07f4f" stroke-width="6" stroke-linecap="round"/></svg>' },
  bookshelf:  { kind: 'item', word: 'bookshelf', svg: '<svg viewBox="0 0 100 120"><rect x="14" y="8" width="72" height="104" rx="6" fill="#d9b98a" stroke="#a9835a" stroke-width="4"/><path d="M14 44 H86 M14 78 H86" stroke="#a9835a" stroke-width="4"/><g stroke="#fff" stroke-width="1.5"><rect x="22" y="16" width="9" height="26" fill="#ff7a9a"/><rect x="32" y="20" width="9" height="22" fill="#5aa9ff"/><rect x="42" y="14" width="9" height="28" fill="#ffd23f"/><rect x="58" y="18" width="9" height="24" fill="#6cc551"/><rect x="68" y="22" width="9" height="20" fill="#a77bff"/><rect x="22" y="52" width="9" height="24" fill="#6cc551"/><rect x="32" y="48" width="9" height="28" fill="#ff9a4d"/><rect x="50" y="54" width="9" height="22" fill="#5aa9ff"/><rect x="60" y="50" width="9" height="26" fill="#ff7a9a"/><rect x="22" y="86" width="9" height="24" fill="#ffd23f"/><rect x="32" y="90" width="9" height="20" fill="#a77bff"/><rect x="42" y="86" width="9" height="24" fill="#ff7a9a"/></g></svg>' },
  toychest:   { kind: 'item', word: 'toy box', svg: '<svg viewBox="0 0 100 120"><rect x="12" y="62" width="76" height="46" rx="6" fill="#5aa9ff" stroke="#2266b8" stroke-width="4"/><path d="M12 62 C 12 38, 88 38, 88 62Z" fill="#7fc4ff" stroke="#2266b8" stroke-width="4"/><rect x="42" y="64" width="16" height="14" rx="3" fill="#ffd23f" stroke="#c9a000" stroke-width="2"/><path d="M12 82 H88" stroke="#2266b8" stroke-width="3"/><circle cx="34" cy="34" r="8" fill="#ff7a7a"/><rect x="52" y="22" width="14" height="14" rx="2" fill="#ffd23f" transform="rotate(14 59 29)"/></svg>' },
  armchair:   { kind: 'item', word: 'chair', svg: '<svg viewBox="0 0 100 120"><rect x="22" y="14" width="56" height="60" rx="14" fill="#6cc551" stroke="#3a8a27" stroke-width="4"/><rect x="8" y="52" width="84" height="46" rx="12" fill="#8fd16a" stroke="#3a8a27" stroke-width="4"/><rect x="2" y="56" width="22" height="42" rx="10" fill="#6cc551" stroke="#3a8a27" stroke-width="4"/><rect x="76" y="56" width="22" height="42" rx="10" fill="#6cc551" stroke="#3a8a27" stroke-width="4"/><path d="M20 98 V110 M80 98 V110" stroke="#b07f4f" stroke-width="6" stroke-linecap="round"/></svg>' },
  sidetable:  { kind: 'item', word: 'table', svg: '<svg viewBox="0 0 100 120"><path d="M50 24 V48" stroke="#4f9a34" stroke-width="3"/><circle cx="50" cy="18" r="9" fill="#ff8fb8"/><circle cx="50" cy="18" r="3.5" fill="#ffd23f"/><path d="M38 50 H62 L58 68 H42Z" fill="#9fdcff" stroke="#5aa9ff" stroke-width="3" stroke-linejoin="round"/><rect x="10" y="68" width="80" height="10" rx="5" fill="#d9b98a" stroke="#a9835a" stroke-width="3"/><path d="M20 78 V112 M80 78 V112" stroke="#a9835a" stroke-width="7" stroke-linecap="round"/></svg>' },
  clock:      { kind: 'item', word: 'clock', svg: '<svg viewBox="0 0 100 120"><rect x="26" y="8" width="48" height="104" rx="10" fill="#d9b98a" stroke="#a9835a" stroke-width="4"/><circle cx="50" cy="34" r="16" fill="#fff" stroke="#a9835a" stroke-width="3"/><path d="M50 34 V24 M50 34 L58 38" stroke="#3e3a4f" stroke-width="3" stroke-linecap="round"/><rect x="36" y="58" width="28" height="44" rx="6" fill="#a9835a" opacity=".35"/><circle class="swing" cx="50" cy="84" r="7" fill="#ffd23f" stroke="#c9a000" stroke-width="2"/></svg>' },
  // little electronics: tap them
  radio:      { kind: 'item', word: 'radio', svg: '<svg viewBox="0 0 100 120"><path d="M70 42 L88 12" stroke="#9aa6bd" stroke-width="3" stroke-linecap="round"/><rect x="8" y="42" width="84" height="64" rx="10" fill="#ff8a7a" stroke="#d9604f" stroke-width="4"/><circle cx="34" cy="74" r="20" fill="#fff4e0" stroke="#d9604f" stroke-width="3"/><path d="M24 64 H44 M22 74 H46 M24 84 H44" stroke="#d9604f" stroke-width="3" stroke-linecap="round"/><rect x="60" y="56" width="26" height="12" rx="3" fill="#fff4e0" stroke="#d9604f" stroke-width="2"/><circle cx="66" cy="86" r="6" fill="#ffd23f" stroke="#d9604f" stroke-width="2"/><circle cx="82" cy="86" r="6" fill="#ffd23f" stroke="#d9604f" stroke-width="2"/></svg>' },
  tv:         { kind: 'item', word: 'TV', svg: '<svg viewBox="0 0 100 120"><path d="M34 40 L24 18 M66 40 L76 18" stroke="#9aa6bd" stroke-width="3" stroke-linecap="round"/><rect x="6" y="38" width="88" height="66" rx="10" fill="#6c7aa8" stroke="#46527e" stroke-width="4"/><rect x="14" y="46" width="60" height="50" rx="6" fill="#cfe9ff"/><circle cx="84" cy="58" r="4" fill="#ffd23f"/><circle cx="84" cy="74" r="4" fill="#ff8fb8"/><path d="M26 104 V114 M74 104 V114" stroke="#46527e" stroke-width="5" stroke-linecap="round"/></svg>' },
  musicbox:   { kind: 'item', word: 'music box', svg: '<svg viewBox="0 0 100 120"><rect x="14" y="68" width="72" height="42" rx="8" fill="#c3a6ff" stroke="#8b7fd1" stroke-width="4"/><path d="M14 76 H86" stroke="#fff" stroke-width="3" opacity=".7"/><circle cx="50" cy="94" r="8" fill="#ffd23f" stroke="#8b7fd1" stroke-width="3"/><g class="dancer"><circle cx="50" cy="26" r="8" fill="#ffd9c0" stroke="#e0905a" stroke-width="2"/><path d="M50 34 V54 M40 44 L50 40 L60 44" stroke="#ff8fb8" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M36 66 L50 50 L64 66Z" fill="#ff8fb8" stroke="#d9608f" stroke-width="2" stroke-linejoin="round"/></g></svg>' },
  discoball:  { kind: 'item', word: 'disco ball', svg: '<svg viewBox="0 0 100 120"><circle cx="50" cy="48" r="32" fill="#dfe6f2" stroke="#9aa6bd" stroke-width="3"/><g stroke="#9aa6bd" stroke-width="1.5" fill="none"><path d="M18 48 H82 M24 30 H76 M24 66 H76 M50 16 V80 M36 20 C 30 36, 30 60, 36 76 M64 20 C 70 36, 70 60, 64 76"/></g><path d="M38 32 l6 6 M60 60 l6 6" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M50 80 V110 M34 112 H66" stroke="#9aa6bd" stroke-width="5" stroke-linecap="round"/></svg>' },
  nightlight: { kind: 'item', word: 'night light', svg: '<svg viewBox="0 0 100 120"><circle class="glow" cx="52" cy="54" r="46" fill="#fff6c8" opacity="0"/><path d="M62 22 A32 32 0 1 0 82 66 A26 26 0 0 1 62 22Z" fill="#ffe066" stroke="#e0b030" stroke-width="3" stroke-linejoin="round"/><rect x="30" y="98" width="40" height="12" rx="5" fill="#b07f4f"/><path d="M50 90 V98" stroke="#b07f4f" stroke-width="5"/></svg>' },
  robot:      { kind: 'item', word: 'robot', svg: '<svg viewBox="0 0 100 120"><path d="M50 8 V22" stroke="#9aa6bd" stroke-width="4"/><circle cx="50" cy="8" r="5" fill="#ff7a7a"/><rect x="22" y="22" width="56" height="42" rx="10" fill="#bfe9fb" stroke="#5aa9ff" stroke-width="4"/><circle cx="38" cy="42" r="7" fill="#fff"/><circle cx="62" cy="42" r="7" fill="#fff"/><circle cx="38" cy="42" r="3.5" fill="#3e3a4f"/><circle cx="62" cy="42" r="3.5" fill="#3e3a4f"/><path d="M38 56 H62" stroke="#5aa9ff" stroke-width="3"/><rect x="28" y="68" width="44" height="34" rx="8" fill="#a6d8ff" stroke="#5aa9ff" stroke-width="4"/><circle cx="50" cy="85" r="6" fill="#ffd23f"/><path d="M28 74 L14 90 M72 74 L86 90" stroke="#5aa9ff" stroke-width="5" stroke-linecap="round"/><rect x="32" y="104" width="12" height="10" rx="3" fill="#5aa9ff"/><rect x="56" y="104" width="12" height="10" rx="3" fill="#5aa9ff"/></svg>' },
});
// The first nine are the ones the game started with; the new ones follow, a mix of everything.
const DECOR_ORDER = ['rugRound', 'wpStars', 'plant', 'lamp', 'wpHearts', 'beanbag', 'rugStar', 'wpStripes', 'fishbowl',
  'paintSky', 'radio', 'sofa', 'wpDots', 'tv', 'paintPeach', 'rugHeart', 'bookshelf', 'musicbox', 'wpClouds', 'paintMint', 'toychest', 'nightlight',
  'wpRainbow', 'rugRainbow', 'robot', 'armchair', 'paintLilac', 'discoball', 'wpFlowers', 'sidetable', 'paintButter', 'rugPaw', 'clock',
  'wpWaves', 'paintRose', 'wpMoons', 'paintAqua', 'wpPaws', 'paintLime'];
const DECOR_ROOMS = ['playroom', 'kitchen', 'bathroom', 'bedroom', 'school'];
const ITEM_SPOTS = [41, 59, 50];      // where furniture stands (left %), by the back wall
const decorOn = {};                   // electronics that are switched on: { 'bedroom:nightlight': true }

/* What the little electronics do when tapped. */
function decorBurst(e, icon, colors, n = 3) {
  const r = e.getBoundingClientRect();
  for (let i = 0; i < n; i++) {
    const nt = prop(ICONS[icon], rand(3, 4.5), r.left + r.width / 2 + rand(-3, 3) * 10, r.top);
    nt.style.color = pick(colors); nt.style.zIndex = 31;
    animate(nt.firstChild, [{ transform: 'translate(0,0) scale(.4)', opacity: 1 }, { transform: `translate(${rand(-8, 8)}vmin, ${-rand(10, 16)}vmin) scale(1) rotate(${rand(-30, 30)}deg)`, opacity: 0 }], { duration: 1500, delay: i * 200, easing: 'ease-out', fill: 'both' }).then(() => nt.remove());
  }
}
const wiggle = e => animate(e.firstChild, [{ transform: 'rotate(0)' }, { transform: 'rotate(-6deg)' }, { transform: 'rotate(6deg)' }, { transform: 'rotate(-3deg)' }, { transform: 'rotate(0)' }], { duration: 600 });
const DECOR_TAP = {
  radio(e) { Sound.play('radio'); wiggle(e); decorBurst(e, 'note', ['#ff7eb6', '#5aa9ff', '#ffc93c', '#6cc551'], 4); },
  musicbox(e) { Sound.play('musicbox'); const d = e.querySelector('.dancer'); if (d) animate(d, [{ transform: 'scaleX(1)' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(1)' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(1)' }], { duration: 2400 }); decorBurst(e, 'note', ['#c3a6ff', '#ff8fb8'], 3); },
  tv(e) {
    // the screen shows one of the animal friends (or Livvie's and Avery Peach's faces) for a moment
    Sound.play('tvclick');
    const kinds = (typeof myFriends === 'function' && myFriends().length) ? myFriends() : ['bunny', 'owl', 'duck'];
    const kind = kinds[(e.tvN = ((e.tvN || 0) + 1) % kinds.length)];
    let sc = e.querySelector('.tvpic');
    if (!sc) { sc = el('div', 'tvpic'); e.append(sc); }
    sc.innerHTML = (typeof friendArt === 'function' ? friendArt(kind) : ICONS.bunny);
    sc.classList.add('on');
    clearTimeout(e.tvTimer);
    e.tvTimer = setTimeout(() => sc.classList.remove('on'), 4000);
  },
  discoball(e) { Sound.play('disco'); const r = e.getBoundingClientRect(); sparkles(r.left + r.width / 2, r.top + r.height * 0.4, 12, ['#ff8fb8', '#ffd23f', '#7fd1ff', '#a6e08a', '#c3a6ff']); animate(e.firstChild, [{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { duration: 1600 }); },
  nightlight(e, room) { const k = room + ':nightlight'; decorOn[k] = !decorOn[k]; e.classList.toggle('lit', decorOn[k]); Sound.play('click'); },
  robot(e) { Sound.play('beep'); wiggle(e); },
  clock(e) { Sound.play('chime'); const s = e.querySelector('.swing'); if (s) animate(s, [{ transform: 'translateX(0)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0)' }], { duration: 900 }); },
  lamp(e, room) { const k = room + ':lamp'; decorOn[k] = !decorOn[k]; e.classList.toggle('lit', decorOn[k]); Sound.play('click'); },
};
function renderDecor() {
  DECOR_ROOMS.forEach(room => {
    const box = $(`#rooms .room-${room}`);
    if (!box) return;
    const d = (S.decor || {})[room] || {};
    box.querySelectorAll('.decor').forEach(e => e.remove());
    [...box.classList].filter(c => c.startsWith('wp-')).forEach(c => box.classList.remove(c));
    const wall = box.querySelector('.wall');
    if (wall) wall.style.background = '';
    const wp = d.wp && DECOR[d.wp], paint = d.paint && DECOR[d.paint];
    if (wp && wp.tile && wall) wall.style.background = `url("data:image/svg+xml,${encodeURIComponent(wp.tile)}") 0 0 / 10vmin 10vmin, ${wp.bg}`;
    else if (wp) box.classList.add('wp-' + d.wp);
    else if (paint && wall) wall.style.background = paint.color;
    box.classList.toggle('has-rug', !!(d.rug && DECOR[d.rug]));
    if (d.rug && DECOR[d.rug]) box.append(el('div', 'deco decor drug', DECOR[d.rug].svg));
    (d.items || []).filter(it => DECOR[it]).forEach((it, i) => {
      const e = el('div', 'deco decor ditem ditem-' + it, DECOR[it].svg);
      e.style.left = ITEM_SPOTS[i % ITEM_SPOTS.length] + '%';
      if (decorOn[room + ':' + it]) e.classList.add('lit');
      if (DECOR_TAP[it]) {
        e.classList.add('tappable');
        onTap(e, () => { if (scene === 'play') DECOR_TAP[it](e, room); });
      }
      box.append(e);
    });
  });
}
DRESS_HOOKS.push(side => { if (side === 'left') renderDecor(); });
function placeDecor(key, room) {
  const D = DECOR[key];
  S.decor = S.decor || {};
  const d = S.decor[room] = S.decor[room] || {};
  if (D.kind === 'wp') { d.wp = key; delete d.paint; }          // wallpaper and paint cover the same wall
  else if (D.kind === 'paint') { d.paint = key; delete d.wp; }
  else if (D.kind === 'rug') d.rug = key;
  else { d.items = (d.items || []).filter(i => i !== key); d.items.push(key); while (d.items.length > ITEM_SPOTS.length) d.items.shift(); }
  save();
  renderDecor();
  if (room !== S.room) { S.doorNew[room] = true; save(); renderCenter(); }
  Sound.play('ding');
  showHint(ROOMS[room].icon, ROOMS[room].word);
}
// the house's present
PARTY_HOOKS.push(() => { if (has('decor')) setTimeout(() => startActivity('gift', 'left'), 1500); });
ACTIVITIES.gift = {
  async start(a) {
    a.data.opened = { left: false, right: false };
    // one present from the jar; a puzzle prize is two, one for each girl
    a.data.keys = Array.from({ length: a.opts.count || 1 }, (_, i) => DECOR_ORDER[((S.decorN || 0) + i) % DECOR_ORDER.length]);
    const L = colorById(S.colors.left) || COLORS[0], R = colorById(S.colors.right) || COLORS[2];
    a.data.box = actProp(a, `<svg viewBox="0 0 100 100"><g class="pbox"><rect x="10" y="40" width="40" height="54" rx="6" fill="${L.main}"/><rect x="50" y="40" width="40" height="54" rx="6" fill="${R.main}"/><rect x="44" y="40" width="12" height="54" fill="#fff"/></g>
      <g class="plid"><rect x="4" y="28" width="46" height="16" rx="5" fill="${L.main}" stroke="#fff" stroke-width="3"/><rect x="50" y="28" width="46" height="16" rx="5" fill="${R.main}" stroke="#fff" stroke-width="3"/><rect x="44" y="28" width="12" height="16" fill="#fff"/><path d="M50 28 C 36 10, 22 18, 34 28 M50 28 C 64 10, 78 18, 66 28" stroke="#fff" stroke-width="5" fill="none"/></g></svg>`,
      { left: '50%', bottom: '14%', width: '24vmin', height: '24vmin', transform: 'translateX(-50%)' }, 12);
    Sound.play('unlock');
    await animate(a.data.box, [{ transform: 'translateX(-50%) translateY(-70vh)' }, { transform: 'translateX(-50%) translateY(2vh)', offset: 0.8 }, { transform: 'translateX(-50%) translateY(0)' }], { duration: 900, easing: 'ease-in' });
  },
  plan(a, side) {
    return { acts: ['opengift'], big: true, defs: { opengift: { icon: 'gift', label: 'Open' } }, cls: a.data.opened[side] ? 'done' : 'invite' };
  },
  async press(a, side) {
    if (a.data.opened[side]) { hopPet(side); return; }
    a.data.opened[side] = true;
    Sound.play('ribbon');
    hopPet(side);
    renderColumn(side);
    if (!(a.data.opened.left && a.data.opened.right)) return;
    a.busy = true;
    const keys = a.data.keys;
    S.decorN = (S.decorN || 0) + keys.length;
    save();
    animate(a.data.box.querySelector('.plid'), [{ transform: 'translateY(0) rotate(0)', opacity: 1 }, { transform: 'translateY(-60%) rotate(-20deg)', opacity: 0 }], { duration: 600, fill: 'forwards' });
    Sound.play('open');
    const r = a.data.box.getBoundingClientRect();
    sparkles(r.left + r.width / 2, r.top + r.height * 0.3, 16);
    const colors = [(colorById(S.colors.left) || COLORS[0]).main, (colorById(S.colors.right) || COLORS[2]).main];
    const shown = keys.map((key, i) => {
      const x = keys.length === 1 ? 50 : 36 + i * 28;
      const g = actProp(a, `<div class="giftitem" style="--ring:${colors[i % 2]}"><div class="gpic">${DECOR[key].svg}</div><div class="gword"></div></div>`,
        { left: x + '%', bottom: '40%', width: '22vmin', height: '24vmin', transform: 'translateX(-50%)' }, 33);
      sayableInto(g.querySelector('.gword'), DECOR[key].word);
      return g;
    });
    await Promise.all(shown.map((g, i) => animate(g, [{ transform: 'translateX(-50%) translateY(10vmin) scale(.3)' }, { transform: 'translateX(-50%) translateY(0) scale(1.15)' }, { transform: 'translateX(-50%) scale(1)' }], { duration: 700, delay: i * 250, easing: 'ease-out', fill: 'backwards' })));
    if (keys.length === 1) { showHint(null, DECOR[keys[0]].word); $('#hint .hint-ico').innerHTML = DECOR[keys[0]].svg; }
    await wait(keys.length === 1 ? 1800 : 2600);
    await endActivity(false);
    chooseDecorRooms(keys);
  },
};
/* Each present is placed in turn: both girls choose a room on the map. */
function chooseDecorRooms(keys) {
  if (!keys.length) return;
  chooseDecorRoom(keys[0], () => setTimeout(() => chooseDecorRooms(keys.slice(1)), 700));
}
function chooseDecorRoom(key, then) {
  let placed = false;
  const done = () => { placed = true; if (then) then(); };
  const tryOpen = (n = 0) => {
    if (scene !== 'play') { if (n < 20) setTimeout(() => tryOpen(n + 1), 300); return; }
    openMap({
      what: DECOR[key].svg,
      allow: room => DECOR_ROOMS.includes(room),
      pick: room => { placeDecor(key, room); done(); },
      cancel: () => { if (!placed) { placeDecor(key, DECOR_ROOMS.includes(S.room) ? S.room : 'playroom'); done(); } },
    });
  };
  tryOpen();
}
NEW_THINGS.push({ key: 'decor', order: 21, icon: 'gift', word: 'decorate' });
BOOK_LINES.decor = { line: 'decorated the house.', icon: 'gift', rank: 91 };

/* =====================================================================
   THE SLEEPOVER: a blanket fort and flashlight stories in the bedroom
   ===================================================================== */
Object.assign(ICONS, {
  sleepover: '<svg viewBox="0 0 100 100"><path d="M8 88 L22 34 C 40 44, 60 44, 78 34 L92 88Z" fill="#c3a6ff" stroke="#8b7fd1" stroke-width="4" stroke-linejoin="round"/><path d="M36 88 C 36 66, 64 66, 64 88Z" fill="#3e3a6f"/><circle cx="76" cy="16" r="9" fill="#ffd23f"/><circle cx="18" cy="16" r="3" fill="#ffd23f"/><circle cx="34" cy="10" r="2" fill="#ffd23f"/></svg>',
  flashlight: '<svg viewBox="0 0 100 100"><path d="M60 40 L96 18 V82 L60 60Z" fill="#fff6c8" opacity=".85"/><rect x="10" y="38" width="44" height="24" rx="6" fill="#5aa9ff" stroke="#3a7fd0" stroke-width="3"/><rect x="50" y="34" width="14" height="32" rx="4" fill="#3a7fd0"/><rect x="22" y="44" width="10" height="12" rx="2" fill="#ffd23f"/></svg>',
});
BUTTONS.sleepover = { icon: 'sleepover', label: 'Sleepover' };
ROOMS.bedroom.acts.push('sleepover');
FEATURE_OF.sleepover = 'sleepover';
NEW_THINGS.push({ key: 'sleepover', order: 20, room: 'bedroom', acts: ['sleepover'], icon: 'sleepover', word: 'sleepover' });
BOOK_LINES.sleepover = { line: 'had a sleepover in a blanket fort.', icon: 'sleepover', rank: 96.5 };
// shadow pictures for flashlight stories (with a word to tap and hear)
const SHADOWS = [['butterfly', 'butterfly'], ['duck', 'duck'], ['bunny', 'bunny'], ['owl', 'owl'], ['fish', 'fish'], ['star', 'star'], ['moonBig', 'moon'], ['heart', 'heart']];
ACT_HANDLERS.sleepover = side => startActivity('sleepover', side);
ACTIVITIES.sleepover = {
  async start(a) {
    a.data.shown = { left: 0, right: 0 };
    a.data.order = shuffle(SHADOWS.slice());
    const dark = actProp(a, '', { left: 0, top: 0, right: 0, bottom: 0, background: 'rgba(30,24,70,.6)' }, 6);
    await animate(dark, [{ opacity: 0 }, { opacity: 1 }], { duration: 800, fill: 'forwards' });
    a.data.fort = actProp(a, `<svg viewBox="0 0 200 120" preserveAspectRatio="none"><path d="M6 118 L30 22 C 80 40, 120 40, 170 22 L194 118Z" fill="#c3a6ff" stroke="#8b7fd1" stroke-width="4" stroke-linejoin="round"/>
      <path d="M30 22 C 80 40, 120 40, 170 22" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>
      ${[40, 62, 84, 106, 128, 150].map((x, i) => `<circle class="fairy" cx="${x}" cy="${30 + Math.sin(i) * 3 + (i === 0 || i === 5 ? -2 : 4)}" r="3.5" fill="${['#ffd23f', '#ff8fb8', '#7fd1ff'][i % 3]}" style="animation-delay:${-i * 0.3}s"/>`).join('')}</svg>`,
      { left: '50%', bottom: '6%', width: '64vmin', height: '42vmin', transform: 'translateX(-50%)' }, 7);
    a.data.fort.classList.add('fort');
    await Promise.all([movePet('left', 40, 9, 900), movePet('right', 60, 9, 900)]);
    SIDES.forEach(s => mood(pets[s], 'happy', 1500));
    Sound.play('lullaby');
  },
  plan(a, side) {
    return { acts: ['flashlight'], big: true, defs: { flashlight: { icon: 'flashlight', label: '' } }, cls: a.data.shown[side] >= 3 ? 'done' : 'invite' };
  },
  async press(a, side) {
    const d = a.data;
    d.lit = d.lit || {};
    if (d.shown[side] >= 3 || d.lit[side]) { hopPet(side); return; }
    d.lit[side] = true;                       // one picture at a time for each girl (her sister can shine hers too)
    const [icon, word] = d.order[(d.shown.left + d.shown.right) % d.order.length];
    d.shown[side]++;
    const spot = actProp(a, `<div class="beam"></div><div class="shadowpic">${ICONS[icon]}</div><div class="shadowword"></div>`,
      { left: (side === 'left' ? 38 : 62) + '%', top: '30%', width: '22vmin', height: '22vmin', transform: 'translate(-50%,-50%)' }, 8);
    spot.classList.add('spotlight');
    d.spot = d.spot || {};
    if (d.spot[side]) d.spot[side].remove();   // the last picture makes way for the new one
    d.spot[side] = spot;
    sayableInto(spot.querySelector('.shadowword'), word);
    spot.style.pointerEvents = 'auto';
    Sound.play('click');
    await animate(spot, [{ opacity: 0, transform: 'translate(-50%,-50%) scale(.5)' }, { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' }], { duration: 400, fill: 'forwards' });
    Speech.say(word);
    mood(pets[side], 'happy', 1500);
    renderColumn(side);
    d.lit[side] = false;
    setTimeout(() => animate(spot, [{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' }).then(() => spot.remove()), 3500);
    if (d.shown.left >= 3 && d.shown.right >= 3 && !d.ending) {
      d.ending = true;
      a.busy = true;
      await wait(3000);
      SIDES.forEach(s => { pets[s].root.classList.add('asleep-eyes'); floatHearts(pets[s], 2, '#ffd6e4'); });
      pets.left.lean.style.transform = 'rotate(7deg)';
      pets.right.lean.style.transform = 'rotate(-7deg)';
      Sound.play('sleep');
      await wait(2500);
      SIDES.forEach(s => pets[s].root.classList.remove('asleep-eyes'));
      Sound.play('morning');
      endActivity(true, 'sleepover');
    }
  },
};
Sound.add('click', s => { s.noise(0, 0.04, { filter: 'highpass', freq: 3000, vol: 0.06 }); s.tone(s.NOTE(84 + s.k3()), 0.05, 0.3, { vol: 0.04, echo: 1 }); });

/* ---------- sounds for the little electronics ---------- */
Sound.add('radio', s => { const base = 60 + s.k3(); [0, 2, 4, 7, 9, 7, 4].forEach((n, i) => s.tone(s.NOTE(base + n + (i % 3 ? 0 : 12)), i * 0.2, 0.3, { type: 'triangle', vol: 0.055 })); s.noise(0, 0.12, { filter: 'bandpass', freq: 2500, q: 2, vol: 0.02 }); });
Sound.add('musicbox', s => { [79, 83, 86, 83, 88, 86, 83, 79].forEach((m, i) => s.tone(s.NOTE(m), i * 0.28, 0.5, { vol: 0.04, echo: 1 })); });
Sound.add('tvclick', s => { s.noise(0, 0.15, { filter: 'bandpass', freq: 1800, q: 0.6, vol: 0.05 }); s.tone(s.NOTE(84), 0.15, 0.2, { vol: 0.04 }); });
Sound.add('disco', s => { [0, 0.18, 0.36, 0.54].forEach((t, i) => { s.tone(s.NOTE(48 + (i % 2) * 7), t, 0.14, { type: 'triangle', vol: 0.08 }); s.noise(t, 0.05, { filter: 'highpass', freq: 5000, vol: 0.03 }); }); [0, 0.36, 0.72].forEach(t => s.tone(s.NOTE(84), t + 0.1, 0.3, { vol: 0.035, echo: 1 })); });
Sound.add('beep', s => { [88, 93, 90].forEach((m, i) => s.tone(s.NOTE(m), i * 0.12, 0.09, { type: 'square', vol: 0.03 })); });
Sound.add('chime', s => { [72, 76, 79, 84].forEach((m, i) => s.tone(s.NOTE(m), i * 0.35, 0.9, { vol: 0.05, echo: 1 })); });
