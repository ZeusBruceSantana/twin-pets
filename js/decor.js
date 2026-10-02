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
const DECOR_ORDER = Object.keys(DECOR);
const DECOR_ROOMS = ['playroom', 'kitchen', 'bathroom', 'bedroom', 'school'];
const ITEM_SPOTS = [41, 59];          // where furniture stands (left %), by the back wall
function renderDecor() {
  DECOR_ROOMS.forEach(room => {
    const box = $(`#rooms .room-${room}`);
    if (!box) return;
    const d = (S.decor || {})[room] || {};
    box.querySelectorAll('.decor').forEach(e => e.remove());
    [...box.classList].filter(c => c.startsWith('wp-')).forEach(c => box.classList.remove(c));
    if (d.wp) box.classList.add('wp-' + d.wp);
    box.classList.toggle('has-rug', !!d.rug);
    if (d.rug) box.append(el('div', 'deco decor drug', DECOR[d.rug].svg));
    (d.items || []).forEach((it, i) => {
      const e = el('div', 'deco decor ditem', DECOR[it].svg);
      e.style.left = ITEM_SPOTS[i % 2] + '%';
      box.append(e);
    });
  });
}
DRESS_HOOKS.push(side => { if (side === 'left') renderDecor(); });
function placeDecor(key, room) {
  const D = DECOR[key];
  S.decor = S.decor || {};
  const d = S.decor[room] = S.decor[room] || {};
  if (D.kind === 'wp') d.wp = key;
  else if (D.kind === 'rug') d.rug = key;
  else { d.items = (d.items || []).filter(i => i !== key); d.items.push(key); while (d.items.length > 2) d.items.shift(); }
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
    a.data.key = DECOR_ORDER[(S.decorN || 0) % DECOR_ORDER.length];
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
    const key = a.data.key;
    S.decorN = (S.decorN || 0) + 1;
    save();
    animate(a.data.box.querySelector('.plid'), [{ transform: 'translateY(0) rotate(0)', opacity: 1 }, { transform: 'translateY(-60%) rotate(-20deg)', opacity: 0 }], { duration: 600, fill: 'forwards' });
    Sound.play('open');
    const r = a.data.box.getBoundingClientRect();
    sparkles(r.left + r.width / 2, r.top + r.height * 0.3, 16);
    const g = actProp(a, DECOR[key].svg, { left: '50%', bottom: '30%', width: '22vmin', height: '18vmin', transform: 'translateX(-50%)' }, 33);
    await animate(g, [{ transform: 'translateX(-50%) translateY(10vmin) scale(.3)' }, { transform: 'translateX(-50%) translateY(0) scale(1.15)' }, { transform: 'translateX(-50%) scale(1)' }], { duration: 700, easing: 'ease-out' });
    showHint(null, DECOR[key].word);
    $('#hint .hint-ico').innerHTML = DECOR[key].svg;
    await wait(1800);
    await endActivity(false);
    chooseDecorRoom(key);
  },
};
function chooseDecorRoom(key) {
  let placed = false;
  const tryOpen = (n = 0) => {
    if (scene !== 'play') { if (n < 20) setTimeout(() => tryOpen(n + 1), 300); return; }
    openMap({
      what: DECOR[key].svg,
      allow: room => DECOR_ROOMS.includes(room),
      pick: room => { placed = true; placeDecor(key, room); },
      cancel: () => { if (!placed) { placed = true; placeDecor(key, DECOR_ROOMS.includes(S.room) ? S.room : 'playroom'); } },
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
