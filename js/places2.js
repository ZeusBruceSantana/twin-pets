'use strict';
/* Twin Pets: more places to drive to. Fishing at the river, camping in the woods,
   the art museum and a fancy restaurant. (The town map and the trip itself are in trips.js.) */

/* ---------- pictures ---------- */
Object.assign(ICONS, {
  river: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#d6f0ff"/><path d="M0 62 C 30 52, 60 70, 100 58 V40 H0Z" fill="#a6dd86"/><path d="M0 62 C 30 52, 60 70, 100 58 V82 C 60 92, 30 74, 0 86Z" fill="#5aa9ff"/><path d="M0 86 C 30 74, 60 92, 100 82 V100 H0Z" fill="#8fd16a"/><path d="M16 88 V68 M22 88 V72" stroke="#4f9a34" stroke-width="3"/><ellipse cx="16" cy="66" rx="3" ry="6" fill="#8a5a3c"/></svg>',
  woods: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#34457f"/><circle cx="78" cy="22" r="9" fill="#fff6c8"/><circle cx="20" cy="18" r="1.8" fill="#fff6c8"/><circle cx="42" cy="12" r="1.4" fill="#fff6c8"/><path d="M0 100 V74 L14 40 L28 74 L40 50 L52 74 V100Z M60 100 V70 L74 36 L90 70 L100 56 V100Z" fill="#2f6b4a"/><path d="M34 90 L52 62 L70 90Z" fill="#ff9a4d" stroke="#c25e10" stroke-width="2.5" stroke-linejoin="round"/></svg>',
  museum: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#fbf1de"/><rect x="14" y="16" width="72" height="58" rx="4" fill="#e0b84a" stroke="#b9892a" stroke-width="4"/><rect x="22" y="24" width="56" height="42" fill="#bfe9fb"/><circle cx="62" cy="38" r="8" fill="#ffd23f"/><path d="M22 66 C 36 50, 50 62, 78 48 V66Z" fill="#8fd16a"/><rect x="0" y="82" width="100" height="18" fill="#e6e9f0"/></svg>',
  restaurant: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#8a2f4a"/><path d="M0 70 H100 V100 H0Z" fill="#fff"/><path d="M10 74 C 10 46, 28 36, 50 36 C 72 36, 90 46, 90 74Z" fill="#e6ecf5" stroke="#9aa6bd" stroke-width="4"/><circle cx="50" cy="32" r="6" fill="#e6ecf5" stroke="#9aa6bd" stroke-width="3"/><rect x="6" y="74" width="88" height="8" rx="4" fill="#cfd8e6" stroke="#9aa6bd" stroke-width="3"/><circle cx="20" cy="14" r="2.5" fill="#ffd23f"/><circle cx="80" cy="14" r="2.5" fill="#ffd23f"/></svg>',
  rod: '<svg viewBox="0 0 100 100"><path d="M14 90 L72 14" stroke="#b07f4f" stroke-width="6" stroke-linecap="round"/><path d="M72 14 C 88 24, 88 56, 80 70" stroke="#9aa6bd" stroke-width="2.5" fill="none"/><circle cx="80" cy="76" r="7" fill="#ff7a7a" stroke="#fff" stroke-width="2"/></svg>',
  bobber: '<svg viewBox="0 0 100 100"><circle cx="50" cy="58" r="26" fill="#fff" stroke="#e05050" stroke-width="3"/><path d="M24 58 A26 26 0 0 1 76 58Z" fill="#ff6b6b"/><path d="M50 32 V8" stroke="#9aa6bd" stroke-width="3"/></svg>',
  sailboat: '<svg viewBox="0 0 100 100"><path d="M50 12 V66" stroke="#8a5a3c" stroke-width="4"/><path d="M54 14 L86 60 H54Z" fill="#fff" stroke="#9aa6bd" stroke-width="3" stroke-linejoin="round"/><path d="M46 24 L20 60 H46Z" fill="#ff8fb8" stroke="#d9608f" stroke-width="3" stroke-linejoin="round"/><path d="M12 68 H88 L76 88 H24Z" fill="#ff7a7a" stroke="#c23b3b" stroke-width="3" stroke-linejoin="round"/></svg>',
  stone: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="56" rx="38" ry="22" fill="#b9c3d2" stroke="#8793a8" stroke-width="4"/><path d="M30 50 q10 -8 22 -6" stroke="#e3e9f2" stroke-width="5" fill="none" stroke-linecap="round"/></svg>',
  tent: '<svg viewBox="0 0 100 100"><path d="M8 88 L50 16 L92 88Z" fill="#ff9a4d" stroke="#c25e10" stroke-width="4" stroke-linejoin="round"/><path d="M50 16 L34 88 H66Z" fill="#7a3f12" opacity=".8"/><path d="M50 16 V4 L64 8 L50 12" fill="#ff6b7a"/></svg>',
  campfire: '<svg viewBox="0 0 100 100"><g class="flame"><path d="M50 8 C 62 26, 76 38, 70 58 C 66 70, 34 70, 30 58 C 26 42, 44 32, 50 8Z" fill="#ff9a4d"/><path d="M50 30 C 58 42, 64 50, 60 60 C 56 68, 44 68, 40 60 C 38 50, 46 44, 50 30Z" fill="#ffd23f"/></g><path d="M16 84 L72 64 M84 84 L28 64" stroke="#8a5a3c" stroke-width="9" stroke-linecap="round"/></svg>',
  marshmallow: '<svg viewBox="0 0 100 100"><path d="M6 94 L62 38" stroke="#b07f4f" stroke-width="5" stroke-linecap="round"/><rect x="52" y="14" width="34" height="34" rx="12" fill="#fff" stroke="#e0d6cc" stroke-width="3" transform="rotate(35 69 31)"/></svg>',
  constellation: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#34457f"/><path d="M22 70 L40 36 L62 56 L80 24" stroke="#fff6c8" stroke-width="2.5" fill="none" stroke-dasharray="3 5"/><g fill="#ffd23f"><path d="M22 60 l3 7 l7 1 l-5 5 l1 7 l-6 -4 l-6 4 l1 -7 l-5 -5 l7 -1z"/><path d="M40 28 l2.5 6 l6 1 l-4.5 4 l1 6 l-5 -3 l-5 3 l1 -6 l-4.5 -4 l6 -1z"/><path d="M80 16 l3 7 l7 1 l-5 5 l1 7 l-6 -4 l-6 4 l1 -7 l-5 -5 l7 -1z"/></g></svg>',
  gframe: '<svg viewBox="0 0 100 100"><rect x="10" y="14" width="80" height="72" rx="5" fill="#e0b84a" stroke="#b9892a" stroke-width="4"/><rect x="20" y="24" width="60" height="52" fill="#cfeaff"/><circle cx="62" cy="40" r="8" fill="#ffd23f"/><path d="M20 76 C 36 56, 52 70, 80 52 V76Z" fill="#8fd16a"/></svg>',
  pedestal: '<svg viewBox="0 0 100 100"><rect x="14" y="58" width="72" height="34" rx="4" fill="#e6e9f0" stroke="#9aa6bd" stroke-width="4"/><rect x="8" y="48" width="84" height="14" rx="4" fill="#f4f6fa" stroke="#9aa6bd" stroke-width="4"/><path d="M50 8 l5 12 l13 1 l-10 8 l3 13 l-11 -7 l-11 7 l3 -13 l-10 -8 l13 -1z" fill="#ffd23f" stroke="#c9a000" stroke-width="2"/></svg>',
  portrait: '<svg viewBox="0 0 100 100"><rect x="14" y="10" width="72" height="80" rx="5" fill="#e0b84a" stroke="#b9892a" stroke-width="4"/><circle cx="50" cy="46" r="22" fill="#ffe7a8" stroke="#e0b070" stroke-width="3"/><circle cx="42" cy="42" r="3.5" fill="#3e3a4f"/><circle cx="58" cy="42" r="3.5" fill="#3e3a4f"/><path d="M42 54 Q50 62 58 54" stroke="#3e3a4f" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M26 86 C 30 70, 70 70, 74 86Z" fill="#ff8fb8"/></svg>',
  menucard: '<svg viewBox="0 0 100 100"><rect x="20" y="8" width="60" height="84" rx="6" fill="#fff4e0" stroke="#d9b98a" stroke-width="4"/><path d="M32 28 H68 M32 42 H68 M32 56 H58 M32 70 H64" stroke="#d9b98a" stroke-width="4" stroke-linecap="round"/><path d="M50 14 l3 6 l6 1 l-4 4 l1 6 l-6 -3 l-6 3 l1 -6 l-4 -4 l6 -1z" fill="#ffd23f"/></svg>',
  glass: '<svg viewBox="0 0 100 100"><path d="M30 12 H70 C 70 44, 62 56, 50 58 C 38 56, 30 44, 30 12Z" fill="#dff4fb" stroke="#9fb8cc" stroke-width="4"/><path d="M33 26 H67 C 66 44, 60 52, 50 54 C 40 52, 34 44, 33 26Z" fill="#ff9ab4"/><path d="M50 58 V84 M34 88 H66" stroke="#9fb8cc" stroke-width="5" stroke-linecap="round"/></svg>',
  cloche: '<svg viewBox="0 0 100 100"><path d="M10 74 C 10 40, 28 28, 50 28 C 72 28, 90 40, 90 74Z" fill="#e6ecf5" stroke="#9aa6bd" stroke-width="4"/><circle cx="50" cy="24" r="6" fill="#e6ecf5" stroke="#9aa6bd" stroke-width="3"/><path d="M26 56 C 30 46, 38 42, 46 40" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></svg>',
  plate: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="76" rx="46" ry="12" fill="#fff" stroke="#9aa6bd" stroke-width="4"/><ellipse cx="50" cy="74" rx="30" ry="7" fill="#eef1f7"/></svg>',
});

/* ---------- the places ---------- */
Object.assign(PLACES, {
  river:      { word: 'river',      icon: 'river',      color: '#cde9ff', acts: ['cast', 'sail', 'skip', 'puzzle'], need: 'river' },
  woods:      { word: 'woods',      icon: 'woods',      color: '#cfe6c8', acts: ['tent', 'fire', 'stars', 'puzzle'], need: 'woods' },
  museum:     { word: 'museum',     icon: 'museum',     color: '#f6e6c4', acts: ['look', 'pose', 'gallery', 'puzzle'], need: 'museum' },
  restaurant: { word: 'restaurant', icon: 'restaurant', color: '#f2c9d6', acts: ['menu', 'cheers', 'dessert', 'puzzle'], need: 'restaurant' },
});
Object.assign(BUTTONS, {
  cast: { icon: 'rod', label: 'Fish' }, sail: { icon: 'sailboat', label: 'Boat' }, skip: { icon: 'stone', label: 'Stones' },
  tent: { icon: 'tent', label: 'Tent' }, fire: { icon: 'campfire', label: 'Fire' }, stars: { icon: 'constellation', label: 'Stars' },
  look: { icon: 'gframe', label: 'Art' }, pose: { icon: 'pedestal', label: 'Pose' }, gallery: { icon: 'portrait', label: 'Faces' },
  menu: { icon: 'menucard', label: 'Menu' }, cheers: { icon: 'glass', label: 'Cheers' }, dessert: { icon: 'cupcake', label: 'Dessert' },
  puzzle: { icon: 'puzzleBtn', label: 'Puzzle' },
});
NEW_THINGS.push({ key: 'river', order: 23, requires: 'snowhill', icon: 'river', word: 'river' });
NEW_THINGS.push({ key: 'woods', order: 24, requires: 'river', icon: 'woods', word: 'woods' });
NEW_THINGS.push({ key: 'museum', order: 25, requires: 'woods', icon: 'museum', word: 'museum' });
NEW_THINGS.push({ key: 'restaurant', order: 26, requires: 'museum', icon: 'restaurant', word: 'restaurant' });
Object.assign(BOOK_LINES, {
  river:      { line: 'went fishing at the river.',        icon: 'river',      rank: 98 },
  woods:      { line: 'went camping in the woods.',        icon: 'woods',      rank: 98 },
  museum:     { line: 'went to the art museum.',           icon: 'museum',     rank: 98 },
  restaurant: { line: 'ate at a fancy restaurant.',        icon: 'restaurant', rank: 98 },
});

/* ---------- the scenery ---------- */
Object.assign(PLACE_MARKUP, {
  river: () => `<div class="tsky park"></div><div class="cloud" style="top:12%; animation-delay:-25s"></div>
    <div class="riverhill l"></div><div class="riverhill r"></div><div class="riverwater"></div><div class="bank"></div>`,
  woods: () => `<div class="tsky woods"></div><div class="moonw"></div>
    ${[8, 24, 62, 80].map((x, i) => `<div class="wtree" style="left:${x}%; transform:scale(${1 - (i % 2) * 0.2})"></div>`).join('')}<div class="woodground"></div>`,
  museum: () => `<div class="mwall"></div>
    <div class="mframe f0"><div class="mpic"></div></div><div class="mframe f1"><div class="mpic"></div></div><div class="mframe f2"><div class="mpic"></div></div>
    <div class="mrail"></div><div class="mfloor"></div>`,
  restaurant: () => `<div class="rwall"></div><div class="chandelier"><i></i><i></i><i></i></div>
    <div class="rfloor"></div><div class="rtable"><div class="candle"></div></div>`,
});


/* ---------- the night sky: lots of constellations to join up (each needs a few stars) ---------- */
const CONSTELLATIONS = [
  { name: 'kite',  pts: [[100, 8], [146, 46], [100, 92], [54, 46], [100, 8]] },
  { name: 'heart', pts: [[100, 90], [48, 48], [56, 16], [100, 30], [144, 16], [152, 48], [100, 90]] },
  { name: 'spoon', pts: [[24, 40], [58, 34], [92, 46], [96, 76], [140, 82], [144, 50], [92, 46]] },
  { name: 'crown', pts: [[40, 84], [48, 38], [76, 62], [100, 26], [124, 62], [152, 38], [160, 84], [40, 84]] },
  { name: 'fish',  pts: [[22, 52], [62, 26], [110, 30], [140, 52], [176, 26], [176, 78], [140, 52], [110, 74], [62, 78], [22, 52]] },
  { name: 'cat',   pts: [[58, 14], [64, 50], [76, 82], [124, 82], [136, 50], [142, 14], [112, 36], [88, 36], [58, 14]] },
  { name: 'boat',  pts: [[34, 70], [166, 70], [144, 90], [56, 90], [34, 70]] },
  { name: 'tree',  pts: [[100, 8], [140, 44], [118, 44], [156, 78], [44, 78], [82, 44], [60, 44], [100, 8]] },
];
function newConstellation(a) {
  // a different one each time (never the same twice in a row)
  let i;
  do { i = Math.floor(Math.random() * CONSTELLATIONS.length); } while (CONSTELLATIONS.length > 1 && i === a.data.conLast);
  a.data.conLast = i;
  const def = CONSTELLATIONS[i];
  const pts = def.pts.slice(0, -1).filter((q, k, arr) => arr.findIndex(z => z[0] === q[0] && z[1] === q[1]) === k);   // each star once
  const el0 = actProp(a, `<svg viewBox="0 0 200 100" overflow="visible"><path class="lines" pathLength="1" d="M${def.pts.map(q => q.join(' ')).join(' L')}" fill="none" stroke="#fff6c8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1" stroke-dashoffset="1"/>
    ${pts.map(([x, y]) => `<g class="pc" style="opacity:0"><path d="M${x} ${y - 9} l2.6 6 l6.4 .6 l-4.9 4.2 l1.5 6.3 l-5.6 -3.4 l-5.6 3.4 l1.5 -6.3 l-4.9 -4.2 l6.4 -.6z" fill="#ffd23f" stroke="#fff6c8" stroke-width="1"/></g>`).join('')}</svg>`,
    { left: '50%', top: '19%', width: '56vmin', height: '28vmin', transform: 'translateX(-50%)' }, 8);
  a.data.con = { def, el: el0, n: 0 };
  animate(el0, [{ opacity: 0 }, { opacity: 1 }], { duration: 500 });
  return a.data.con;
}

/* ---------- things to do ---------- */
const riverWater = a => a.data.bg.querySelector('.riverwater').getBoundingClientRect();
const iceRing = (x, y) => sparkles(x, y, 5, ['#9fdcff', '#ffffff', '#5aa9ff']);
Object.assign(TRIP_PLAY, {
  /* ---- the river ---- */
  async cast(a, side, p) {
    begin(p, 5200);
    const w = riverWater(a), x = w.left + w.width * (side === 'left' ? 0.28 : 0.72), y = w.top + w.height * 0.55;
    const from = petPoint(p, 0.5, 0.35);
    const bob = prop(ICONS.bobber, 4, from.x, from.y);
    bob.dataset.owner = side;
    bob.style.zIndex = 31;
    Sound.play('swing');
    await arc(bob, from, { x, y }, 650, 70);
    Sound.play('plop');
    iceRing(x, y);
    await wait(900);
    for (let i = 0; i < 2; i++) {                              // a nibble... and another
      animate(bob.firstChild, [{ transform: 'translateY(0)' }, { transform: 'translateY(30%)' }, { transform: 'translateY(0)' }], { duration: 400 });
      Sound.play('pop');
      await wait(550);
    }
    const fish = prop(ICONS.fish, 7, x, y);                    // a fish!
    fish.dataset.owner = side;
    fish.style.zIndex = 31;
    fish.firstChild.style.filter = `hue-rotate(${Math.floor(rand(0, 300))}deg)`;
    bob.remove();
    Sound.play('splash');
    await arc(fish, { x, y }, petPoint(p, 0.5, 0.22), 650, 90);
    mood(p, 'happy', 1800);
    floatHearts(p, 2);
    await wait(900);
    await arc(fish, petPoint(p, 0.5, 0.22), { x, y }, 600, 60);    // let it swim home
    Sound.play('plop');
    iceRing(x, y);
    fish.remove();
  },
  async sail(a, side, p) {
    begin(p, 3800);
    const w = riverWater(a), dir = side === 'left' ? 1 : -1;
    const x0 = w.left + w.width * (side === 'left' ? 0.08 : 0.92), y = w.top + w.height * 0.5;
    const b = prop(ICONS.sailboat, 10, x0, y);
    b.dataset.owner = side;
    b.style.zIndex = 8;
    Sound.play('pop');
    mood(p, 'happy', 3000);
    await tween(3200, t => { b.style.left = x0 + dir * w.width * 0.84 * t + 'px'; b.style.top = y + Math.sin(t * 14) * 5 + 'px'; }, ease.linear);
    await animate(b, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
    b.remove();
  },
  async skip(a, side, p) {
    begin(p, 2800);
    const w = riverWater(a), dir = side === 'left' ? 1 : -1;
    let cur = petPoint(p, 0.5, 0.4);
    const stone = prop(ICONS.stone, 3.5, cur.x, cur.y);
    stone.dataset.owner = side;
    stone.style.zIndex = 31;
    Sound.play('swing');
    for (const fx of [0.3, 0.45, 0.6, 0.72]) {
      const next = { x: w.left + w.width * (side === 'left' ? fx : 1 - fx), y: w.top + w.height * 0.62 };
      await arc(stone, cur, next, 360, 50, 120);
      Sound.play('plop');
      iceRing(next.x, next.y);
      cur = next;
    }
    await animate(stone, [{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: 'forwards' });
    stone.remove();
    mood(p, 'happy', 1400);
    floatHearts(p, 1);
  },

  /* ---- the woods ---- */
  async tent(a, side, p) {
    if (!a.data.tentEl) {
      a.data.tentEl = actProp(a, `<svg viewBox="0 0 120 90">
        <g class="pc" style="opacity:0"><path d="M18 86 L60 10 M102 86 L60 10" stroke="#8a5a3c" stroke-width="5" stroke-linecap="round"/></g>
        <g class="pc" style="opacity:0"><path d="M60 14 L14 86 H62Z" fill="#ff9a4d" stroke="#c25e10" stroke-width="4" stroke-linejoin="round"/></g>
        <g class="pc" style="opacity:0"><path d="M60 14 L106 86 H58Z" fill="#ffb066" stroke="#c25e10" stroke-width="4" stroke-linejoin="round"/></g>
        <g class="pc" style="opacity:0"><path d="M60 40 L42 86 H78Z" fill="#7a3f12"/></g>
        <g class="pc" style="opacity:0"><path d="M60 12 V-2 L76 3 L60 8" fill="#ff6b7a"/></g></svg>`,
        { left: '50%', bottom: '8%', width: '30vmin', height: '24vmin', transform: 'translateX(-50%)' }, 9);
      a.data.tentN = 0;
    }
    const pcs = a.data.tentEl.querySelectorAll('.pc');
    if (a.data.tentN >= pcs.length) { hopPet(side); return; }
    const g = pcs[a.data.tentN++];
    g.style.opacity = 1;
    Sound.play('block');
    animate(g, [{ transform: 'translateY(-30px)' }, { transform: 'translateY(0)' }], { duration: 300, easing: 'ease-in' });
    mood(p, 'happy', 900);
    if (a.data.tentN === pcs.length) {
      Sound.play('yay');
      const r = a.data.tentEl.getBoundingClientRect();
      sparkles(r.left + r.width / 2, r.top, 14);
      SIDES.forEach(s => floatHearts(pets[s], 2));
    }
  },
  async fire(a, side, p) {
    if (!a.data.fireEl) {                                      // the first tap lights the fire
      a.data.fireEl = actProp(a, ICONS.campfire, { left: '50%', bottom: '5%', width: '15vmin', height: '15vmin', transform: 'translateX(-50%)' }, 10);
      a.data.fireEl.classList.add('campfire');
      Sound.play('poof');
      popIn(a.data.fireEl);
      mood(p, 'happy', 1000);
      return;
    }
    begin(p, 3600);                                            // then: a toasty marshmallow
    const at = petPoint(p, side === 'left' ? 0.95 : 0.05, 0.66);
    const m = prop(ICONS.marshmallow, 8, at.x, at.y);
    m.dataset.owner = side;
    m.style.zIndex = 31;
    Sound.play('pop');
    const fr = a.data.fireEl.getBoundingClientRect();
    const tx = fr.left + fr.width / 2 - (side === 'left' ? 0.6 : -0.6) * fr.width * 0.3, ty = fr.top + fr.height * 0.35;
    await tween(800, t => { m.style.left = at.x + (tx - at.x) * t + 'px'; m.style.top = at.y + (ty - at.y) * t + 'px'; });
    m.firstChild.style.filter = 'sepia(1) saturate(2.2) brightness(.95)';
    Sound.play('fizz');
    await wait(900);
    await tween(700, t => { m.style.left = tx + (at.x - tx) * t + 'px'; m.style.top = ty + (at.y - ty) * t + 'px'; });
    p.root.classList.add('chomp');
    Sound.play('chomp');
    await wait(700);
    p.root.classList.remove('chomp');
    m.remove();
    mood(p, 'happy', 1400);
    floatHearts(p, 2);
  },
  async stars(a, side, p) {
    if (a.data.starBusy) { hopPet(side); return; }
    if (!a.data.con) newConstellation(a);
    const con = a.data.con, pcs = con.el.querySelectorAll('.pc');
    const g = pcs[con.n++];
    g.style.opacity = 1;
    Sound.play('wish');
    animate(g, [{ transform: 'scale(0)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 450, easing: 'ease-out' });
    mood(p, 'happy', 900);
    if (con.n < pcs.length) return;
    a.data.starBusy = true;                                       // join the dots, say its name, then a new sky
    animate(con.el.querySelector('.lines'), [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 1400, fill: 'forwards' });
    await wait(1400);
    if (act !== a) return;
    Sound.play('yay');
    const r = con.el.getBoundingClientRect();
    sparkles(r.left + r.width / 2, r.top + r.height / 2, 14, ['#fff6c8', '#ffd23f', '#ffffff']);
    SIDES.forEach(s => floatHearts(pets[s], 2));
    const label = el('div', 'conname');
    sayableInto(label, con.def.name);
    con.el.append(label);
    Speech.say(con.def.name);
    a.data.conSeen = (a.data.conSeen || 0) + 1;
    await wait(3800);
    if (act !== a) return;
    await animate(con.el, [{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: 'forwards' });
    con.el.remove();
    a.data.con = null;
    a.data.starBusy = false;
  },

  /* ---- the art museum ---- */
  look(a, side, p) {
    openPanel(side, {
      cols: 3,
      items: MUSEUM_ART.map(([w, ic]) => ({ key: w, word: w, icon: `<svg viewBox="0 0 100 100"><rect x="8" y="10" width="84" height="80" rx="5" fill="#e0b84a" stroke="#b9892a" stroke-width="4"/><rect x="18" y="20" width="64" height="60" fill="#fff4e0"/><g transform="translate(24 26) scale(.52)">${ICONS[ic].replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g></svg>` })),
      onPick: w => { if (act === a) hangArt(a, side, w); },
    });
  },
  async pose(a, side, p) {
    begin(p, 3400);
    const at = petPoint(p, 0.5, 1.02);
    const ped = prop(ICONS.pedestal, 14, at.x, at.y);
    ped.dataset.owner = side;
    ped.style.zIndex = 9;
    Sound.play('pop');
    await animate(ped.firstChild, [{ transform: 'translateY(40%) scale(.3)', opacity: 0 }, { transform: 'translateY(0) scale(1)', opacity: 1 }], { duration: 350, fill: 'forwards' });
    p.root.classList.add('statue');
    Sound.play('chime');
    petAnim(p, [{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(-8%) scale(1.05)' }, { transform: 'translateY(-8%) rotate(' + (side === 'left' ? 6 : -6) + 'deg) scale(1.05)' }, { transform: 'translateY(-8%) rotate(' + (side === 'left' ? 6 : -6) + 'deg) scale(1.05)' }, { transform: 'translateY(0) scale(1)' }], { duration: 2400, easing: 'ease-in-out' });
    sparkles(at.x, at.y - petSize() * 0.5, 8, ['#ffd23f', '#fff6c8', '#ffffff']);
    await wait(2400);
    p.root.classList.remove('statue');
    ped.remove();
    mood(p, 'happy', 1200);
  },
  async gallery(a, side, p) {
    // each pet's portrait hangs on the wall on her own side
    const pic = a.data.bg.querySelector(side === 'left' ? '.mframe.f0 .mpic' : '.mframe.f2 .mpic');
    pic.innerHTML = '';
    pic.append(faceDrawing(side));
    pic.parentNode.classList.add('hung');
    Sound.play('pick');
    animate(pic.parentNode, [{ transform: 'scale(.4)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }], { duration: 400, easing: 'ease-out' });
    sayBubble(p, SETTINGS.players[side].pet, 2000);
    mood(p, 'happy', 1400);
  },

  /* ---- the fancy restaurant ---- */
  menu(a, side, p) {
    openPanel(side, {
      cols: 3,
      items: DISHES.map(k => ({ key: k, word: DISH_WORD[k], icon: ICONS[k] })),
      onPick: k => { if (act === a) serveDish(a, side, k); },
    });
  },
  async cheers(a, side, p) {
    a.data.glass = a.data.glass || {};
    if (a.data.glass[side]) { hopPet(side); return; }
    begin(p, 1800);
    const at = petPoint(p, side === 'left' ? 0.92 : 0.08, 0.5);
    const g = prop(ICONS.glass, 8, at.x, at.y);
    g.dataset.owner = side;
    g.style.zIndex = 31;
    a.data.glass[side] = { el: g, at, t: now() };
    Sound.play('pop');
    await animate(g.firstChild, [{ transform: 'translateY(30%) scale(.4)' }, { transform: 'translateY(0) scale(1)' }], { duration: 300, fill: 'forwards' });
    const o = a.data.glass[other(side)];
    if (o && now() - o.t < SETTINGS.doorWindowMs) {
      const mid = { x: W() / 2, y: Math.min(at.y, o.at.y) };
      const mine = a.data.glass[side];
      await Promise.all([tween(450, t => { mine.el.style.left = at.x + (mid.x - 18 - at.x) * t + 'px'; mine.el.style.top = at.y + (mid.y - at.y) * t + 'px'; }),
        tween(450, t => { o.el.style.left = o.at.x + (mid.x + 18 - o.at.x) * t + 'px'; o.el.style.top = o.at.y + (mid.y - o.at.y) * t + 'px'; })]);
      Sound.play('chime');
      sparkles(mid.x, mid.y, 14, ['#ffd23f', '#ffffff', '#ff8fb8']);
      SIDES.forEach(s => { mood(pets[s], 'happy', 1800); floatHearts(pets[s], 2); });
      await wait(900);
      a.data.glass = {};
      mine.el.remove();
      o.el.remove();
    } else {
      invite(other(side), 'cheers', 5000);
      await wait(SETTINGS.doorWindowMs);
      if (a.data.glass && a.data.glass[side] && a.data.glass[side].el === g) { a.data.glass[side] = null; g.remove(); }
    }
  },
  async dessert(a, side, p) {                                  // the waiter brings something sweet
    await serveDish(a, side, pick(['cake', 'icecream']));
  },
});
const MUSEUM_ART = [['sun', 'sun'], ['rainbow', 'rainbow'], ['moon', 'moonBig'], ['flower', 'flower'], ['fish', 'fish'], ['butterfly', 'butterfly']];
function hangArt(a, side, word) {
  const ic = MUSEUM_ART.find(x => x[0] === word)[1];
  const frame = a.data.bg.querySelector('.mframe.f1');
  frame.querySelector('.mpic').innerHTML = ICONS[ic];
  frame.classList.add('hung');
  Sound.play('pick');
  animate(frame, [{ transform: 'scale(.4)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }], { duration: 400, easing: 'ease-out' });
  sayBubble(pets[side], word + '!', 2000);
  mood(pets[side], 'happy', 1400);
}
const DISHES = ['pizza', 'pancakes', 'fish', 'peach', 'icecream', 'cake'];
const DISH_WORD = { pizza: 'pizza', pancakes: 'pancakes', fish: 'fish', peach: 'peach', icecream: 'ice cream', cake: 'cake' };
async function serveDish(a, side, dish) {
  const p = pets[side];
  begin(p, 6000);
  const at = petPoint(p, side === 'left' ? 0.95 : 0.05, 0.86);
  const wt = a.data.waiter;
  if (wt) {                                                      // the waiter brings it on a tray
    wt.classList.add('carry');
    waiterSay(a, 'Bonjour!', 1400);
    Sound.play('chime');
    await waiterWalk(a, at.x + (side === 'left' ? 9 : -9) * 8);
  }
  const plate = prop(ICONS.plate, 13, at.x, at.y);
  plate.dataset.owner = side;
  plate.style.zIndex = 30;
  const food = prop(ICONS[dish], 8, at.x, at.y - 18);
  food.dataset.owner = side;
  food.style.zIndex = 31;
  food.style.visibility = 'hidden';
  const lid = prop(ICONS.cloche, 13, at.x, at.y - 22);
  lid.dataset.owner = side;
  lid.style.zIndex = 32;
  Sound.play('pop');
  if (wt) wt.classList.remove('carry');
  await animate(lid.firstChild, [{ transform: 'translateY(-60%) scale(.5)', opacity: 0 }, { transform: 'translateY(0) scale(1)', opacity: 1 }], { duration: 350, fill: 'forwards' });
  await wait(500);
  Sound.play('open');                                           // ta-da: the waiter lifts the lid
  food.style.visibility = '';
  animate(food.firstChild, [{ transform: 'scale(.4)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }], { duration: 400 });
  if (wt) waiterBow(wt);
  await animate(lid.firstChild, [{ transform: 'translateY(0) rotate(0)', opacity: 1 }, { transform: 'translateY(-90%) rotate(-25deg)', opacity: 0 }], { duration: 500, fill: 'forwards' });
  lid.remove();
  const fav = (dish === 'fish' && side === 'left') || (dish === 'peach' && side === 'right') || dish === SETTINGS.favorites[side];
  if (wt) waiterSay(a, 'Bon appétit!', 1800);
  await wait(400);
  p.root.classList.add('chomp');
  Sound.play('chomp');
  await wait(900);
  p.root.classList.remove('chomp');
  food.remove();
  mood(p, 'happy', 1600);
  floatHearts(p, fav ? 4 : 2);
  if (fav) sayBubble(p, 'My favorite!', 1800);
  await wait(400);
  plate.remove();
  if (wt && act === a) await waiterWalk(a, W() / 2);             // back to the middle
}

/* ---------- the fancy waiter (Pip the penguin) ---------- */
PLACE_START.restaurant = async a => {
  const w = actProp(a, `<div class="waiter"><div class="wbody">${friendArt('penguin')}</div><div class="wtray">${ICONS.cloche}</div><div class="wname"></div></div>`,
    { left: W() / 2 + 'px', bottom: '24%', width: '15vmin', height: '17vmin', transform: 'translateX(-50%)' }, 9);
  sayableInto(w.querySelector('.wname'), BUDDIES.penguin.name);
  a.data.waiter = w;
  w.style.pointerEvents = 'auto';
  onTap(w, () => { if (!a.busy) { Sound.play('chime'); waiterBow(w); waiterSay(a, pick(['Welcome!', 'Bonjour!', 'Voilà!']), 1600); } });
  animate(w, [{ opacity: 0, marginBottom: '-6vmin' }, { opacity: 1, marginBottom: '0vmin' }], { duration: 500, fill: 'backwards' });
  await wait(300);
  waiterSay(a, 'Welcome!', 2200);
};
async function waiterWalk(a, toX) {
  const w = a.data.waiter;
  if (!w) return;
  const x0 = parseFloat(w.style.left) || W() / 2;
  w.classList.add('walking');
  await tween(Math.max(500, Math.abs(toX - x0) * 3.2), t => { w.style.left = x0 + (toX - x0) * t + 'px'; });
  w.classList.remove('walking');
}
function waiterBow(w) { animate(w.querySelector('.wbody'), [{ transform: 'rotate(0)' }, { transform: 'rotate(22deg) translateY(4%)' }, { transform: 'rotate(0)' }], { duration: 700, easing: 'ease-in-out' }); }
function waiterSay(a, text, ms = 1800) {
  const w = a.data.waiter;
  if (!w) return;
  w.querySelectorAll('.wsay').forEach(b => b.remove());
  const b = el('div', 'wsay');
  wordsInto(b, text);
  w.append(b);
  animate(b, [{ transform: 'translateX(-50%) scale(0)' }, { transform: 'translateX(-50%) scale(1.08)' }, { transform: 'translateX(-50%) scale(1)' }], { duration: 300, easing: 'ease-out' });
  setTimeout(() => animate(b, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' }).then(() => b.remove()), ms);
}

/* ---------- the farm animals: they live at the farm, and the girls can feed and call them ---------- */
const FARM_RESIDENTS = [          // [animal, left %, bottom %, size in vmin]
  ['hen', 31, 40, 8], ['horse', 40, 45, 13], ['cow', 52, 47, 14], ['lamb', 64, 45, 10], ['piggy', 75, 43, 10],
];
PLACE_START.farm = async a => {
  a.data.residents = FARM_RESIDENTS.map(([kind, x, y, size], i) => {
    const e = actProp(a, `<div class="resident">${friendArt(kind)}</div>`, { left: x + '%', bottom: y + '%', width: size + 'vmin', height: size + 'vmin', transform: 'translateX(-50%)' }, 8);
    e.dataset.kind = kind;
    e.style.pointerEvents = 'auto';
    e.firstChild.style.animationDelay = -i * 0.7 + 's';
    onTap(e, () => { if (!a.busy) residentCalls(e); });
    animate(e, [{ opacity: 0, transform: 'translateX(-50%) translateY(20%)' }, { opacity: 1, transform: 'translateX(-50%) translateY(0)' }], { duration: 400, delay: i * 120, fill: 'backwards' });
    return e;
  });
  await wait(600);
};
function residentCalls(e) {
  Sound.play(BUDDIES[e.dataset.kind].sound);
  animate(e.firstChild, [{ transform: 'translateY(0)' }, { transform: 'translateY(-18%) scale(1.08)' }, { transform: 'translateY(0)' }, { transform: 'translateY(-8%)' }, { transform: 'translateY(0)' }], { duration: 700, easing: 'ease-out' });
  const r = e.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top, 4);
}
Object.assign(TRIP_PLAY, {
  async hay(a, side, p) {                                       // feed the next animal in turn
    begin(p, 2600);
    const list = a.data.residents || [];
    if (!list.length) return;
    const an = list[(a.data.hayN = (a.data.hayN || 0) + 1) % list.length];
    const from = petPoint(p, 0.5, 0.5);
    const r = an.getBoundingClientRect();
    const to = { x: r.left + r.width / 2, y: r.top + r.height * 0.45 };
    const bale = prop(ICONS.hay, 5, from.x, from.y);
    bale.style.zIndex = 32;
    bale.dataset.owner = side;
    await arc(bale, from, to, 750, 90, 220);
    bale.remove();
    Sound.play('chomp');
    animate(an.firstChild, [{ transform: 'scale(1)' }, { transform: 'scale(1.12,.9)' }, { transform: 'scale(1)' }, { transform: 'scale(1.12,.9)' }, { transform: 'scale(1)' }], { duration: 800 });
    Sound.play(BUDDIES[an.dataset.kind].sound);
    mood(p, 'happy', 1400);
    floatHearts(p, 2);
    sparkles(to.x, to.y - 10, 5, ['#ffd23f', '#ffe9a8', '#fff']);
  },
  async moo(a, side, p) {                                       // everybody calls out, one after another
    begin(p, 2800);
    mood(p, 'happy', 2200);
    for (const an of (a.data.residents || [])) { residentCalls(an); await wait(380); }
  },
});
