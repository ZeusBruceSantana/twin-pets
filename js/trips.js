'use strict';
/* Twin Pets: trips in the car. Both girls tap the car in the front yard, choose a place
   together, and off they go: the beach, the park, or the ice cream shop. */

/* ---------- pictures ---------- */
Object.assign(ICONS, {
  car: '<svg viewBox="0 0 100 70"><path d="M8 46 C 8 36, 14 32, 22 30 L32 14 C 34 10, 38 8, 44 8 H64 C 70 8, 74 10, 76 14 L84 30 C 90 32, 94 36, 94 46 V52 C 94 56, 92 58, 88 58 H12 C 10 58, 8 56, 8 52Z" fill="#ff8a7a" stroke="#d9604f" stroke-width="3" stroke-linejoin="round"/><path d="M34 16 H48 V30 H26Z M54 16 H68 L76 30 H54Z" fill="#bfe9fb" stroke="#d9604f" stroke-width="2" stroke-linejoin="round"/><circle cx="28" cy="58" r="10" fill="#3e3a4f"/><circle cx="28" cy="58" r="4" fill="#c9d2e0"/><circle cx="74" cy="58" r="10" fill="#3e3a4f"/><circle cx="74" cy="58" r="4" fill="#c9d2e0"/><rect x="86" y="38" width="8" height="6" rx="2" fill="#ffe066"/></svg>',
  beach: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#bfe9fb"/><circle cx="76" cy="26" r="12" fill="#ffd23f"/><path d="M0 56 C 16 50, 30 62, 50 56 C 70 50, 84 62, 100 56 V72 H0Z" fill="#5aa9ff"/><path d="M0 70 C 30 64, 70 66, 100 70 V100 H0Z" fill="#ffe2a8"/><path d="M30 88 V58 M30 58 C 18 58, 10 66, 10 66 H50 C 50 66, 42 58, 30 58Z" stroke="#ff7a7a" stroke-width="3" fill="#ff9a9a"/></svg>',
  park: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#d6f0ff"/><path d="M0 66 C 30 58, 70 58, 100 66 V100 H0Z" fill="#8fd16a"/><rect x="22" y="44" width="8" height="30" rx="3" fill="#b07f4f"/><circle cx="26" cy="38" r="16" fill="#5cc45c"/><path d="M56 74 L66 36 L76 74 M60 56 H72" stroke="#ff8a7a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M66 50 V62" stroke="#888" stroke-width="2"/><rect x="62" y="62" width="8" height="3" fill="#ffd23f"/></svg>',
  shop: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#fff4f8"/><path d="M6 26 H94 L88 40 H12Z" fill="#ff8fb8"/><path d="M12 40 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0" fill="#fff" stroke="#ff8fb8" stroke-width="2"/><path d="M40 92 L50 64 L60 92Z" fill="#e8b071"/><circle cx="50" cy="58" r="10" fill="#ffc0d6"/><circle cx="50" cy="46" r="9" fill="#a6e0c8"/><circle cx="50" cy="35" r="8" fill="#fff4e0"/></svg>',
  splash: '<svg viewBox="0 0 100 100"><path d="M10 70 C 26 60, 40 76, 50 66 C 60 56, 74 74, 90 64 V90 H10Z" fill="#5aa9ff"/><g fill="#9fdcff" stroke="#5aa9ff" stroke-width="2"><circle cx="30" cy="40" r="7"/><circle cx="52" cy="26" r="8"/><circle cx="72" cy="42" r="6"/><circle cx="40" cy="56" r="5"/><circle cx="64" cy="56" r="5"/></g></svg>',
  castle: '<svg viewBox="0 0 100 100"><path d="M16 88 V50 H26 V58 H36 V50 H46 V58 H54 V50 H64 V58 H74 V50 H84 V88Z" fill="#ffe2a8" stroke="#d9b06a" stroke-width="3" stroke-linejoin="round"/><path d="M38 88 V72 C 38 64, 62 64, 62 72 V88Z" fill="#d9b06a"/><path d="M50 50 V20 L66 26 L50 32" fill="#ff7a9a" stroke="#d94f5c" stroke-width="2" stroke-linejoin="round"/></svg>',
  shell: '<svg viewBox="0 0 100 100"><path d="M50 86 L16 50 C 14 30, 30 16, 50 16 C 70 16, 86 30, 84 50Z" fill="#ffd1dc" stroke="#f08bb0" stroke-width="4" stroke-linejoin="round"/><path d="M50 86 L30 26 M50 86 L50 18 M50 86 L70 26 M50 86 L20 46 M50 86 L80 46" stroke="#f08bb0" stroke-width="3"/></svg>',
  swing: '<svg viewBox="0 0 100 100"><path d="M10 90 L24 12 L38 90 M62 90 L76 12 L90 90 M20 14 H80" stroke="#ff8a7a" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 14 V64 M58 14 V64" stroke="#9aa6bd" stroke-width="3"/><rect x="38" y="62" width="24" height="6" rx="3" fill="#ffd23f"/></svg>',
  slide: '<svg viewBox="0 0 100 100"><path d="M18 90 V24 M34 90 V24 M18 40 H34 M18 58 H34 M18 76 H34" stroke="#7fc4ff" stroke-width="5" stroke-linecap="round"/><path d="M34 26 C 50 26, 60 80, 92 84" stroke="#ff8fb8" stroke-width="12" fill="none" stroke-linecap="round"/></svg>',
  ducks: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="72" rx="44" ry="16" fill="#7fc4ff"/><path d="M30 64 C 22 64, 20 54, 28 50 C 26 40, 40 38, 42 46 C 46 46, 50 50, 48 58 C 46 64, 38 66, 30 64Z" fill="#ffe066" stroke="#e0b030" stroke-width="2"/><path d="M42 46 L50 44 L44 50Z" fill="#ffa24d"/><circle cx="36" cy="44" r="2" fill="#3e3a4f"/><g fill="#e8c39e"><circle cx="64" cy="60" r="3"/><circle cx="72" cy="66" r="2.5"/><circle cx="60" cy="68" r="2.5"/></g></svg>',
  scoop: '<svg viewBox="0 0 100 100"><path d="M36 54 L50 94 L64 54Z" fill="#e8b071" stroke="#c98a3c" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="44" r="18" fill="#ffc0d6" stroke="#f08bb0" stroke-width="3"/><path d="M70 12 C 82 8, 92 16, 88 28 L72 30Z" fill="#c9d2e0" stroke="#7a869c" stroke-width="3"/><path d="M72 30 L60 40" stroke="#7a869c" stroke-width="5" stroke-linecap="round"/></svg>',
  lick: '<svg viewBox="0 0 100 100"><path d="M36 54 L50 94 L64 54Z" fill="#e8b071" stroke="#c98a3c" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="44" r="18" fill="#a6e0c8" stroke="#6cc5a0" stroke-width="3"/><path d="M70 40 C 80 36, 86 44, 80 50 C 76 54, 70 50, 70 46Z" fill="#ff8fab"/></svg>',
});

/* the farm, the library and the snowy hill */
const BARN = '<path d="M18 86 V46 L50 22 L82 46 V86Z" fill="#e0524f" stroke="#a83a38" stroke-width="3" stroke-linejoin="round"/><path d="M18 46 L50 22 L82 46" fill="none" stroke="#fff" stroke-width="4" stroke-linejoin="round"/><rect x="38" y="56" width="24" height="30" fill="#fff" stroke="#a83a38" stroke-width="3"/><path d="M38 56 L62 86 M62 56 L38 86" stroke="#a83a38" stroke-width="3"/>';
Object.assign(ICONS, {
  barn: `<svg viewBox="0 0 100 100">${BARN}</svg>`,
  farm: `<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#d6f0ff"/><path d="M0 76 C 30 68, 70 68, 100 76 V100 H0Z" fill="#8fd16a"/>${BARN}</svg>`,
  library: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#efe3ff"/><rect x="12" y="22" width="76" height="68" rx="5" fill="#d9b98a" stroke="#a9835a" stroke-width="3"/><path d="M12 56 H88" stroke="#a9835a" stroke-width="3"/><g stroke="#fff" stroke-width="1.5"><rect x="18" y="28" width="9" height="24" fill="#ff7a9a"/><rect x="28" y="32" width="9" height="20" fill="#5aa9ff"/><rect x="38" y="26" width="9" height="26" fill="#ffd23f"/><rect x="48" y="30" width="9" height="22" fill="#6cc551"/><rect x="58" y="28" width="9" height="24" fill="#a77bff"/><rect x="68" y="32" width="9" height="20" fill="#ff9a4d"/><rect x="18" y="62" width="9" height="24" fill="#5aa9ff"/><rect x="28" y="66" width="9" height="20" fill="#ff7a9a"/><rect x="38" y="60" width="9" height="26" fill="#6cc551"/><rect x="48" y="64" width="9" height="22" fill="#ffd23f"/><rect x="58" y="62" width="9" height="24" fill="#ff9a4d"/><rect x="68" y="66" width="9" height="20" fill="#a77bff"/></g></svg>',
  snowhill: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#cfe9ff"/><path d="M0 62 C 24 40, 56 44, 100 70 V100 H0Z" fill="#fff"/><path d="M0 80 C 30 66, 70 70, 100 84 V100 H0Z" fill="#eaf4ff"/><path d="M70 50 L80 24 L90 50Z M66 62 L80 34 L94 62Z" fill="#4f9a6a" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><rect x="28" y="62" width="26" height="7" rx="3" fill="#ff7a7a"/><path d="M26 74 H58" stroke="#c9d2e0" stroke-width="3" stroke-linecap="round"/></svg>',
  hay: '<svg viewBox="0 0 100 100"><rect x="12" y="34" width="76" height="46" rx="8" fill="#f5d36a" stroke="#d9a93a" stroke-width="4"/><path d="M12 52 H88 M12 66 H88 M38 34 V80 M62 34 V80" stroke="#d9a93a" stroke-width="3"/></svg>',
  egg: '<svg viewBox="0 0 100 100"><path d="M50 12 C 72 12, 82 46, 82 62 C 82 82, 68 92, 50 92 C 32 92, 18 82, 18 62 C 18 46, 28 12, 50 12Z" fill="#fff4e0" stroke="#d9b98a" stroke-width="4"/><circle cx="40" cy="56" r="5" fill="#ffd9a8"/><circle cx="60" cy="68" r="4" fill="#ffd9a8"/></svg>',
  chick: '<svg viewBox="0 0 100 100"><circle cx="50" cy="56" r="32" fill="#ffe066" stroke="#e0b030" stroke-width="4"/><path d="M44 62 L50 70 L56 62Z" fill="#ffa24d" stroke="#e07a2a" stroke-width="2" stroke-linejoin="round"/><circle cx="38" cy="50" r="4.5" fill="#3e3a4f"/><circle cx="62" cy="50" r="4.5" fill="#3e3a4f"/><path d="M50 24 q-4 -10 -10 -8 M50 24 q4 -12 12 -8" stroke="#e0b030" stroke-width="4" fill="none" stroke-linecap="round"/></svg>',
  openbook: '<svg viewBox="0 0 100 100"><path d="M50 30 C 38 22, 22 22, 10 28 V80 C 22 74, 38 74, 50 82 C 62 74, 78 74, 90 80 V28 C 78 22, 62 22, 50 30Z" fill="#fff" stroke="#a77bff" stroke-width="5" stroke-linejoin="round"/><path d="M50 30 V82" stroke="#a77bff" stroke-width="4"/><path d="M20 40 C 28 38, 36 38, 42 42 M20 52 C 28 50, 36 50, 42 54 M58 42 C 64 38, 72 38, 80 40 M58 54 C 64 50, 72 50, 80 52" stroke="#d6c4ff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>',
  bookstack: '<svg viewBox="0 0 100 100"><rect x="14" y="66" width="72" height="20" rx="4" fill="#5aa9ff" stroke="#2266b8" stroke-width="3"/><rect x="22" y="44" width="62" height="20" rx="4" fill="#ff7a9a" stroke="#c23b5e" stroke-width="3"/><rect x="18" y="22" width="58" height="20" rx="4" fill="#ffd23f" stroke="#c9a000" stroke-width="3"/><path d="M26 76 H74 M32 54 H76 M28 32 H68" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/></svg>',
  shh: '<svg viewBox="0 0 100 100"><circle cx="50" cy="52" r="36" fill="#ffe7a8" stroke="#e0b070" stroke-width="4"/><path d="M34 44 q5 -5 10 0 M56 44 q5 -5 10 0" stroke="#3e3a4f" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="68" rx="8" ry="3" fill="#e0905a"/><rect x="46" y="48" width="10" height="34" rx="5" fill="#ffc6a8" stroke="#e0905a" stroke-width="3"/></svg>',
  sled: '<svg viewBox="0 0 100 100"><path d="M10 74 C 10 82, 24 84, 34 82 H78 C 90 82, 94 74, 88 68" fill="none" stroke="#9aa6bd" stroke-width="5" stroke-linecap="round"/><rect x="20" y="52" width="62" height="14" rx="5" fill="#ff7a7a" stroke="#c23b3b" stroke-width="3"/><path d="M30 66 V78 M70 66 V78" stroke="#9aa6bd" stroke-width="4" stroke-linecap="round"/><path d="M22 54 C 8 50, 6 38, 14 34" fill="none" stroke="#c23b3b" stroke-width="3" stroke-linecap="round"/></svg>',
  snowangel: '<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#eaf4ff"/><g fill="#fff" stroke="#9fc2e8" stroke-width="3" stroke-linejoin="round"><circle cx="50" cy="26" r="10"/><path d="M50 36 C 38 40, 26 52, 14 70 C 26 62, 38 58, 46 58 L44 84 H56 L54 58 C 62 58, 74 62, 86 70 C 74 52, 62 40, 50 36Z"/></g></svg>',
  snowball: '<svg viewBox="0 0 100 100"><circle cx="50" cy="52" r="34" fill="#fff" stroke="#9fc2e8" stroke-width="4"/><path d="M34 42 q6 -8 16 -8" stroke="#dcebfa" stroke-width="5" fill="none" stroke-linecap="round"/></svg>',
});

/* ---------- the car in the front yard ---------- */
ROOMS.frontyard.acts.push('car');
BUTTONS.car = { icon: 'car', label: 'Car' };
FEATURE_OF.car = 'trips';
const carThing = roomThing('car', 'frontyard', 'trips', `<div class="carbox">${ICONS.car}</div>`, { left: '50%', bottom: '1%', width: '27vmin', height: '19vmin' });
const carTaps = { left: -1e9, right: -1e9 };
function tapCar(side) {
  if (scene !== 'play') return;
  thingTapped('car');
  carTaps[side] = now();
  Sound.play('honk');
  animate(carThing.firstChild, [{ transform: 'translateY(0)' }, { transform: 'translateY(-6%) rotate(-2deg)' }, { transform: 'translateY(0)' }], { duration: 300 });
  hopPet(side);
  if (now() - carTaps[other(side)] < SETTINGS.doorWindowMs) {   // both tapped the car: where shall we go?
    carTaps.left = carTaps.right = -1e9;
    openTrips();
  } else invite(other(side), 'car', SETTINGS.doorWindowMs);
}
ACT_HANDLERS.car = side => tapCar(side);
onPress(carThing, e => tapCar(e.clientX < W() / 2 ? 'left' : 'right'));

/* ---------- choosing where to go (both tap the same place) ---------- */
const PLACES = {
  beach:    { word: 'beach',          icon: 'beach',    color: '#bfe9fb', acts: ['splash', 'castle', 'shell'] },
  park:     { word: 'park',           icon: 'park',     color: '#c8e7a6', acts: ['swing', 'slide', 'ducks'] },
  farm:     { word: 'farm',           icon: 'farm',     color: '#ffe3b0', acts: ['hay', 'eggs', 'moo'], need: 'farm' },
  icecream: { word: 'ice cream shop', icon: 'shop',     color: '#ffd9e8', acts: ['scoop', 'lick', 'sprinkle'] },
  library:  { word: 'library',        icon: 'library',  color: '#e3d6ff', acts: ['pickbook', 'stack', 'shh'], need: 'library' },
  snowhill: { word: 'snowy hill',     icon: 'snowhill', color: '#d3ebff', acts: ['sled', 'angel', 'snowball'], need: 'snowhill' },
};
const placeOpen = k => !PLACES[k].need || has(PLACES[k].need);
/* The town map: roads between the places. Both girls tap the same place to drive there. */
const tripBox = el('div', 'overlay', `<div class="town"><svg class="town-roads" viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true">
  <g fill="none" stroke="#9aa6bd" stroke-width="13" stroke-linecap="round"><path d="M10 100 H290"/><path d="M100 14 V186"/><path d="M200 14 V186"/></g>
  <g fill="none" stroke="#fff" stroke-width="1.4" stroke-dasharray="6 7"><path d="M10 100 H290"/><path d="M100 14 V186"/><path d="M200 14 V186"/></g></svg>
  <div class="trip-grid"></div></div><div class="map-x"></div>`);
tripBox.id = 'trips';
stage.append(tripBox);
tripBox.querySelector('.map-x').innerHTML = ICONS.close;
onPress(tripBox.querySelector('.map-x'), closeTrips);
let tripsTouched = 0;
function openTrips() {
  closeAllPanels();
  votes.left = votes.right = null;
  setScene('trips');
  const grid = tripBox.querySelector('.trip-grid');
  grid.innerHTML = '';
  Object.entries(PLACES).forEach(([k, pl]) => {
    if (!placeOpen(k)) { grid.append(el('div', 'mtile closed', `<div class="ico">${ICONS.window}</div>`)); return; }
    const tile = voteTile(k, ICONS[pl.icon], pl.word, pl.color, side => {
      tripsTouched = now();
      castVote(side, k, grid, () => { closeTrips(); setTimeout(() => startActivity('trip', side, { place: k }), 50); });
    });
    if (nextFriendAt(k)) tile.append(el('div', 'badge', ICONS.star));   // someone new to meet there
    grid.append(tile);
  });
  tripBox.classList.add('show');
  tripsTouched = now();
  Sound.play('pick');
}
function closeTrips() {
  tripBox.classList.remove('show');
  votes.left = votes.right = null;
  if (scene === 'trips') setScene('play');
}
setInterval(() => { if (scene === 'trips' && now() - tripsTouched > 25000) closeTrips(); }, 2000);

/* ---------- the trip ---------- */
function placeMarkup(place) {
  if (place === 'beach') return `<div class="tsky beach"></div><div class="sun"></div>
    <svg class="sea" viewBox="0 0 1000 200" preserveAspectRatio="none"><path class="wave" d="M0 30 C 80 10, 160 50, 250 30 C 340 10, 420 50, 500 30 C 580 10, 660 50, 750 30 C 840 10, 920 50, 1000 30 V200 H0Z" fill="#5aa9ff"/><path d="M0 80 C 120 60, 240 100, 360 80 C 480 60, 600 100, 720 80 C 840 60, 920 90, 1000 80 V200 H0Z" fill="#7fc4ff" opacity=".7"/></svg>
    <div class="sand"></div><div class="umbrella">${ICONS.beach.replace(/<rect[^>]*\/>/, '')}</div>`;
  if (place === 'park') return `<div class="tsky park"></div>
    <div class="cloud" style="top:12%; animation-delay:-30s"></div>
    <div class="ttree l"></div><div class="ttree r"></div>
    <div class="pond"></div><div class="grass"></div>`;
  if (place === 'farm') return `<div class="tsky farm"></div>
    <div class="cloud" style="top:10%; animation-delay:-12s"></div>
    <div class="farmhill"></div><div class="barn">${ICONS.barn}</div><div class="fencef"></div><div class="grass"></div>`;
  if (place === 'library') return `<div class="libwall"></div>
    <div class="bookcase l"></div><div class="bookcase r"></div>
    <div class="libwindow">${ICONS.window}</div>
    <div class="libfloor"></div><div class="libdesk"></div>`;
  if (place === 'snowhill') return `<div class="tsky snow"></div>
    <div class="snowhill-far"></div><div class="snowhill-near"></div>
    <div class="pine l"></div><div class="pine r"></div>
    ${Array.from({ length: 16 }, (_, i) => `<i class="flake" style="left:${(i * 37) % 100}%; animation-delay:${-(i * 1.3) % 9}s; animation-duration:${7 + (i % 4)}s"></i>`).join('')}`;
  return `<div class="shopwall"></div><div class="awning"></div>
    <div class="counter"><div class="tubs">${['#ffc0d6', '#7a4a2a', '#fff4e0', '#a6e0c8', '#ffb38a'].map(c => `<i style="background:${c}"></i>`).join('')}</div></div><div class="shopfloor"></div>`;
}
const FLAVORS = { strawberry: ['strawberry', '#ffc0d6'], chocolate: ['chocolate', '#8a5a3c'], vanilla: ['vanilla', '#fff4e0'], mint: ['mint', '#a6e0c8'], peach: ['peach', '#ffb38a'], fish: ['fish', '#a9c8f0'] };
Object.assign(BUTTONS, {
  splash: { icon: 'splash', label: 'Splash' }, castle: { icon: 'castle', label: 'Castle' }, shell: { icon: 'shell', label: 'Shells' },
  swing: { icon: 'swing', label: 'Swing' }, slide: { icon: 'slide', label: 'Slide' }, ducks: { icon: 'ducks', label: 'Ducks' },
  scoop: { icon: 'scoop', label: 'Scoop' }, lick: { icon: 'lick', label: 'Lick' }, sprinkle: { icon: 'sprinkles', label: 'Sprinkles' },
  hay: { icon: 'hay', label: 'Hay' }, eggs: { icon: 'egg', label: 'Eggs' }, moo: { icon: 'moo', label: 'Animals' },
  pickbook: { icon: 'openbook', label: 'Books' }, stack: { icon: 'bookstack', label: 'Stack' }, shh: { icon: 'shh', label: 'Shh' },
  sled: { icon: 'sled', label: 'Sled' }, angel: { icon: 'snowangel', label: 'Angel' }, snowball: { icon: 'snowball', label: 'Snowball' },
  meetfriend: { icon: 'wave', label: 'Hello' },
  tripcar: { icon: 'car', label: 'Home' },
});
ACTIVITIES.trip = {
  async start(a) {
    const place = a.opts.place;
    a.data.home = { left: false, right: false };
    a.data.castle = 0;
    a.data.cone = { left: [], right: [] };
    // everyone in the car... vroom!
    const car = prop(ICONS.car, 30, W() / 2, H() * 0.8);
    car.classList.add('drivecar');
    car.style.zIndex = 9;
    carThing.style.visibility = 'hidden';
    a.cleanup.push(() => { carThing.style.visibility = ''; car.remove(); });
    await Promise.all([movePet('left', 45, 12, 500), movePet('right', 55, 12, 500)]);
    await fadePets(false);
    Sound.play('vroom');
    await tween(1100, t => { car.style.left = W() / 2 + t * t * W() * 0.8 + 'px'; });
    // the place's scenery goes behind everything (like a room), so names and the jar still show
    const bg = el('div', 'trip trip-' + place, placeMarkup(place));
    $('#rooms').append(bg);
    document.body.classList.add('on-trip');
    a.cleanup.push(() => { bg.remove(); document.body.classList.remove('on-trip'); });
    a.data.bg = bg;
    await animate(bg, [{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' });
    await tween(1100, t => { car.style.left = -W() * 0.3 + (1 - (1 - t) * (1 - t)) * W() * 0.8 + 'px'; });
    SIDES.forEach(s => setPos(pets[s], s === 'left' ? 45 : 55, 12));
    await fadePets(true);
    await animate(car, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
    await Promise.all([movePet('left', HOME.left.x, HOME.left.y, 600), movePet('right', HOME.right.x, HOME.right.y, 600)]);
    showHint(PLACES[place].icon, PLACES[place].word);
  },
  plan(a, side) {
    const friend = a.data.friend || nextFriendAt(a.opts.place);
    const acts = [...PLACES[a.opts.place].acts, ...(friend ? ['meetfriend'] : []), 'tripcar'];
    return { acts, clsOf: { tripcar: a.data.home[side] ? 'done' : '', meetfriend: a.data.hi && a.data.hi[side] ? 'done' : '' } };
  },
  async press(a, side, key) {
    const p = pets[side];
    if (key === 'tripcar') {
      a.data.home[side] = true;
      Sound.play('honk');
      renderColumn(side);
      if (a.data.home.left && a.data.home.right) await driveHome(a);
      else invite(other(side), 'tripcar', 5000);
      return;
    }
    if (TRIP_PLAY[key]) TRIP_PLAY[key](a, side, p);
  },
};
async function driveHome(a) {
  a.busy = true;
  await Promise.all([movePet('left', 45, 12, 500), movePet('right', 55, 12, 500)]);
  await fadePets(false);
  Sound.play('vroom');
  await animate(a.data.bg, [{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: 'forwards' });
  await fadePets(true);
  endActivity(true, a.opts.place);
}

/* ---------- farm and library helpers ---------- */
const FARM_ANIMALS = ['cow', 'lamb', 'piggy'];
const farmAnimal = a => FARM_ANIMALS[(a.data.farmN = (a.data.farmN || 0) + 1) % FARM_ANIMALS.length];
/* A farm animal pops up beside a pet. Returns the animal and where it is. */
async function animalVisit(side, kind) {
  const at = petPoint(pets[side], side === 'left' ? -0.12 : 1.12, 0.78);
  const an = prop(friendArt(kind), 13, at.x, at.y);
  an.style.zIndex = 31;
  an.dataset.owner = side;
  Sound.play(BUDDIES[kind].sound);
  await animate(an.firstChild, [{ transform: 'translateY(60%) scale(.3)', opacity: 0 }, { transform: 'translateY(-10%) scale(1.08)', opacity: 1 }, { transform: 'translateY(0) scale(1)', opacity: 1 }], { duration: 450, easing: 'ease-out', fill: 'forwards' });
  return { an, at };
}
async function leaveFarm(an) {
  await animate(an, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
  an.remove();
}
const LIBRARY_BOOKS = [['moon', '#a77bff', 'moon'], ['sun', '#ffb020', 'sun'], ['fish', '#5aa9ff', 'fish'], ['star', '#ff7a9a', 'star'], ['apple', '#6cc551', 'apple'], ['heart', '#ff8fb8', 'heart']];
const bookCover = (c, icon) => `<svg viewBox="0 0 100 100"><rect x="20" y="8" width="62" height="84" rx="7" fill="${c}" stroke="#fff" stroke-width="3"/><path d="M28 8 V92" stroke="#fff" stroke-width="3" opacity=".5"/><rect x="34" y="20" width="40" height="40" rx="6" fill="#fff" opacity=".9"/><g transform="translate(37 23) scale(.34)">${ICONS[icon].replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g></svg>`;
async function readBook(side, word) {
  const p = pets[side];
  begin(p, 2600);
  const at = petPoint(p, 0.5, 0.78);
  const bk = prop(ICONS.openbook, 9, at.x, at.y);
  bk.dataset.owner = side;
  bk.style.zIndex = 31;
  Sound.play('page');
  await animate(bk.firstChild, [{ transform: 'scale(.3) translateY(40%)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }], { duration: 400, fill: 'forwards' });
  sayBubble(p, word + '!', 2000);
  mood(p, 'happy', 2000);
  await wait(2200);
  bk.remove();
}

/* ---------- things to do at each place ---------- */
const TRIP_PLAY = {
  splash(a, side, p) {
    begin(p, 1400);
    Sound.play('splash');
    petAnim(p, [{ transform: 'translateY(0)' }, { transform: 'translateY(-14%)', offset: 0.4 }, { transform: 'translateY(0) scale(1.06,.92)', offset: 0.75 }, { transform: 'translateY(0)' }], { duration: 800, easing: 'ease-out' });
    setTimeout(() => { const m = petPoint(p, 0.5, 0.95); sparkles(m.x, m.y, 12, ['#9fdcff', '#5aa9ff', '#ffffff']); mood(p, 'happy', 1200); }, 600);
  },
  async castle(a, side, p) {
    // one sandcastle, built by both girls
    if (!a.data.castleEl) {
      a.data.castleEl = actProp(a, `<svg viewBox="0 0 120 90">${[
        '<rect x="20" y="58" width="80" height="30" rx="3"/>', '<rect x="12" y="34" width="22" height="26"/>', '<rect x="86" y="34" width="22" height="26"/>',
        '<rect x="44" y="26" width="32" height="34"/>', '<path d="M60 26 V4 L74 10 L60 16" fill="#ff7a9a"/>'].map((sh, i) => `<g class="pc" style="opacity:0">${sh}</g>`).join('')}</svg>`,
        { left: '50%', bottom: '4%', width: '24vmin', height: '18vmin', transform: 'translateX(-50%)' }, 9);
      a.data.castleEl.classList.add('sandcastle');
    }
    const pcs = a.data.castleEl.querySelectorAll('.pc');
    if (a.data.castle >= pcs.length) { hopPet(side); return; }
    const g = pcs[a.data.castle++];
    g.style.opacity = 1;
    Sound.play('block');
    animate(g, [{ transform: 'translateY(-30px)' }, { transform: 'translateY(0)' }], { duration: 300, easing: 'ease-in' });
    mood(p, 'happy', 900);
    if (a.data.castle === pcs.length) {
      Sound.play('yay');
      const r = a.data.castleEl.getBoundingClientRect();
      sparkles(r.left + r.width / 2, r.top, 14);
      SIDES.forEach(s => floatHearts(pets[s], 2));
    }
  },
  async shell(a, side, p) {
    begin(p, 1600);
    const at = petPoint(p, side === 'left' ? 0.9 : 0.1, 0.98);
    const sh = prop(ICONS.shell, 6, at.x, at.y);
    sh.dataset.owner = side;
    sh.style.zIndex = 31;
    sh.firstChild.style.filter = `hue-rotate(${Math.floor(rand(0, 300))}deg)`;
    Sound.play('pop');
    await animate(sh.firstChild, [{ transform: 'translateY(40%) scale(.3)' }, { transform: 'translateY(-60%) scale(1.2)' }, { transform: 'translateY(-50%) scale(1)' }], { duration: 500, fill: 'forwards' });
    mood(p, 'happy', 1200);
    floatHearts(p, 1);
    await wait(1000);
    sh.remove();
  },
  async swing(a, side, p) {
    begin(p, 2600);
    Sound.play('swing');
    await petAnim(p, [{ transform: 'rotate(0)' }, { transform: 'rotate(18deg) translateX(6%)' }, { transform: 'rotate(-18deg) translateX(-6%)' }, { transform: 'rotate(14deg) translateX(4%)' }, { transform: 'rotate(-10deg) translateX(-3%)' }, { transform: 'rotate(0)' }], { duration: 2200, easing: 'ease-in-out' });
    mood(p, 'happy', 1200);
  },
  async slide(a, side, p) {
    begin(p, 2200);
    const dir = side === 'left' ? 1 : -1;
    Sound.play('slidewhee');
    await petAnim(p, [{ transform: 'translate(0,0)' }, { transform: `translate(${-dir * 10}%, -30%)`, offset: 0.35 }, { transform: `translate(${dir * 14}%, 0) rotate(${dir * 8}deg)`, offset: 0.8 }, { transform: 'translate(0,0)' }], { duration: 1600, easing: 'ease-in-out' });
    mood(p, 'happy', 1200);
    floatHearts(p, 2);
  },
  async ducks(a, side, p) {
    begin(p, 1600);
    const pond = a.data.bg.querySelector('.pond').getBoundingClientRect();
    const duck = prop(ICONS.duck, 7, pond.left + pond.width * (side === 'left' ? 0.3 : 0.7), pond.top + pond.height * 0.4);
    duck.style.zIndex = 8;
    if (side === 'right') duck.firstChild.style.transform = 'scaleX(-1)';
    Sound.play('quack');
    mood(p, 'happy', 1200);
    await animate(duck.firstChild, [{ transform: (side === 'right' ? 'scaleX(-1) ' : '') + 'translateY(30%) scale(.4)', opacity: 0 }, { transform: (side === 'right' ? 'scaleX(-1) ' : '') + 'translateY(0) scale(1)', opacity: 1 }], { duration: 400, fill: 'forwards' });
    await tween(1400, t => { duck.style.left = pond.left + pond.width * ((side === 'left' ? 0.3 : 0.7) + (side === 'left' ? 1 : -1) * 0.25 * t) + 'px'; });
    await animate(duck, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
    duck.remove();
  },
  scoop(a, side, p) {
    if (a.data.cone[side].length >= 3) { hopPet(side); return; }
    openPanel(side, {
      cols: 3,
      items: Object.entries(FLAVORS).map(([k, [w, c]]) => ({ key: k, icon: `<svg viewBox="0 0 100 100"><path d="M36 54 L50 94 L64 54Z" fill="#e8b071" stroke="#c98a3c" stroke-width="3"/><circle cx="50" cy="44" r="20" fill="${c}" stroke="#fff" stroke-width="3"/></svg>`, word: w })),
      onPick: k => { if (act === a) addScoop(a, side, k); },
    });
  },
  lick(a, side, p) {
    const cone = a.data.cone[side];
    begin(p, 900);
    Sound.play('slurp');
    petAnim(p, [{ transform: 'scale(1)' }, { transform: 'scale(1.04,.96)' }, { transform: 'scale(1)' }], { duration: 400 });
    mood(p, 'happy', 1000);
    if (!cone.length) return;
    const top = cone.pop();
    animate(top, [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(.3)', opacity: 0 }], { duration: 300, fill: 'forwards' }).then(() => top.remove());
    if (!cone.length) floatHearts(p, 2);
  },
  sprinkle(a, side, p) {
    const cone = a.data.cone[side];
    if (!cone.length) { hopPet(side); return; }
    Sound.play('fizz');
    const top = cone[cone.length - 1];
    top.classList.add('sprinkled');
    const r = top.getBoundingClientRect();
    sparkles(r.left + r.width / 2, r.top, 8, ['#ff7a7a', '#5aa9ff', '#ffd23f', '#6cc551', '#a77bff']);
  },

  /* ---- the farm ---- */
  async hay(a, side, p) {
    begin(p, 2400);
    const kind = farmAnimal(a);
    const { an, at } = await animalVisit(side, kind);
    const from = petPoint(p, 0.5, 0.5);
    const bale = prop(ICONS.hay, 6, from.x, from.y);
    bale.style.zIndex = 32;
    bale.dataset.owner = side;
    await arc(bale, from, at, 650, 50, 200);
    bale.remove();
    Sound.play('chomp');
    animate(an.firstChild, [{ transform: 'scale(1)' }, { transform: 'scale(1.1,.9)' }, { transform: 'scale(1)' }, { transform: 'scale(1.1,.9)' }, { transform: 'scale(1)' }], { duration: 800 });
    mood(p, 'happy', 1400);
    floatHearts(p, 2);
    await wait(1000);
    await leaveFarm(an);
  },
  async eggs(a, side, p) {
    begin(p, 3200);
    const at = petPoint(p, side === 'left' ? 0.9 : 0.1, 0.98);
    const egg = prop(ICONS.egg, 6, at.x, at.y);
    egg.dataset.owner = side;
    egg.style.zIndex = 31;
    Sound.play('pop');
    await animate(egg.firstChild, [{ transform: 'translateY(40%) scale(.3)' }, { transform: 'translateY(-40%) scale(1.15)' }, { transform: 'translateY(-30%) scale(1)' }], { duration: 400, fill: 'forwards' });
    await animate(egg.firstChild, [-12, 12, -10, 10, 0].map(r => ({ transform: `translateY(-30%) rotate(${r}deg)` })), { duration: 700, fill: 'forwards' });
    Sound.play('crack');
    egg.firstChild.innerHTML = ICONS.chick;
    sparkles(at.x, at.y - 40, 7, ['#ffe066', '#fff4e0', '#ffffff']);
    animate(egg.firstChild, [{ transform: 'translateY(-30%) scale(.5)' }, { transform: 'translateY(-50%) scale(1.2)' }, { transform: 'translateY(-30%) scale(1)' }], { duration: 400, fill: 'forwards' });
    Sound.play('peep');
    mood(p, 'happy', 1400);
    floatHearts(p, 2);
    await wait(1600);
    egg.remove();
  },
  async moo(a, side, p) {
    begin(p, 2000);
    const kind = farmAnimal(a);
    const { an } = await animalVisit(side, kind);
    mood(p, 'happy', 1200);
    floatHearts(p, 1);
    await wait(900);
    await leaveFarm(an);
  },

  /* ---- the library ---- */
  pickbook(a, side, p) {
    openPanel(side, {
      cols: 3,
      items: LIBRARY_BOOKS.map(([w, c, ic]) => ({ key: w, word: w, icon: bookCover(c, ic) })),
      onPick: w => { if (act === a) readBook(side, w); },
    });
  },
  async stack(a, side, p) {
    // one tower of books, built by both girls
    if (!a.data.stackEl) {
      a.data.stackEl = actProp(a, `<svg viewBox="0 0 100 100">${['#5aa9ff', '#ff7a9a', '#ffd23f', '#6cc551', '#a77bff'].map((c, i) =>
        `<g class="pc" style="opacity:0"><rect x="${14 + (i % 2) * 6}" y="${74 - i * 17}" width="${70 - (i % 3) * 6}" height="15" rx="4" fill="${c}" stroke="#fff" stroke-width="2"/></g>`).join('')}</svg>`,
        { left: '50%', bottom: '6%', width: '22vmin', height: '24vmin', transform: 'translateX(-50%)' }, 9);
      a.data.stack = 0;
    }
    const pcs = a.data.stackEl.querySelectorAll('.pc');
    if (a.data.stack >= pcs.length) { hopPet(side); return; }
    const g = pcs[a.data.stack++];
    g.style.opacity = 1;
    Sound.play('block');
    animate(g, [{ transform: 'translateY(-40px)' }, { transform: 'translateY(0)' }], { duration: 300, easing: 'ease-in' });
    mood(p, 'happy', 900);
    if (a.data.stack === pcs.length) {
      Sound.play('yay');
      const r = a.data.stackEl.getBoundingClientRect();
      sparkles(r.left + r.width / 2, r.top, 14);
      SIDES.forEach(s => floatHearts(pets[s], 2));
    }
  },
  async shh(a, side, p) {
    begin(p, 2200);
    Sound.play('shh');
    p.root.classList.add('asleep-eyes');
    sayBubble(p, 'Shh!', 1800);
    await wait(1800);
    p.root.classList.remove('asleep-eyes');
    mood(p, 'happy', 900);
  },

  /* ---- the snowy hill ---- */
  async sled(a, side, p) {
    begin(p, 2600);
    const dir = side === 'left' ? 1 : -1;
    const at = petPoint(p, 0.5, 0.98);
    const sl = prop(ICONS.sled, 11, at.x, at.y);
    sl.dataset.owner = side;
    sl.style.zIndex = 9;
    const go = p.root.offsetWidth * 0.5 * dir;
    Sound.play('slidewhee');
    animate(sl.firstChild, [{ transform: 'translateX(0)' }, { transform: `translateX(${go}px)`, offset: 0.5 }, { transform: 'translateX(0)' }], { duration: 2000, easing: 'ease-in-out' });
    await petAnim(p, [{ transform: 'translate(0,0)' }, { transform: `translate(${dir * 50}%, -6%) rotate(${dir * 8}deg)`, offset: 0.5 }, { transform: 'translate(0,0)' }], { duration: 2000, easing: 'ease-in-out' });
    sl.remove();
    mood(p, 'happy', 1200);
    floatHearts(p, 2);
  },
  async angel(a, side, p) {
    begin(p, 3000);
    const dir = side === 'left' ? 1 : -1;
    await petAnim(p, [{ transform: 'rotate(0)' }, { transform: `translateY(10%) rotate(${-dir * 85}deg)` }, { transform: `translateY(10%) rotate(${-dir * 78}deg)` }, { transform: `translateY(10%) rotate(${-dir * 90}deg)` }, { transform: `translateY(10%) rotate(${-dir * 78}deg)` }, { transform: `translateY(10%) rotate(${-dir * 85}deg)` }, { transform: 'rotate(0)' }], { duration: 2400, easing: 'ease-in-out' });
    const at = petPoint(p, 0.5, 0.97);
    const imp = prop(ICONS.snowangel, 9, at.x, at.y);
    imp.dataset.owner = side;
    imp.style.zIndex = 7;
    animate(imp.firstChild, [{ transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 400, easing: 'ease-out', fill: 'forwards' });
    sparkles(at.x, at.y - 30, 8, ['#ffffff', '#cfe9ff', '#9fc2e8']);
    Sound.play('poof');
    mood(p, 'happy', 1400);
  },
  async snowball(a, side, p) {
    begin(p, 1800);
    const sister = pets[other(side)];
    const from = petPoint(p, 0.5, 0.4);
    const ball = prop(ICONS.snowball, 5, from.x, from.y);
    ball.style.zIndex = 33;
    Sound.play('swing');
    await arc(ball, from, () => petPoint(sister, 0.5, 0.45), 750, 90, 360);
    ball.remove();
    const hit = petPoint(sister, 0.5, 0.45);
    sparkles(hit.x, hit.y, 9, ['#ffffff', '#cfe9ff', '#9fc2e8']);
    Sound.play('poof');
    mood(sister, 'happy', 1400);
    petAnim(sister, [{ transform: 'translateY(0)' }, { transform: 'translateY(-10%) scale(1.04,.96)' }, { transform: 'translateY(0)' }], { duration: 500 });
    floatHearts(sister, 1);
  },

  /* ---- saying hello to a new friend (meet it, and it comes home with you) ---- */
  async meetfriend(a, side, p) {
    const kind = a.data.friend || (a.data.friend = nextFriendAt(a.opts.place));
    if (!kind) return;
    a.data.hi = a.data.hi || {};
    doTrick(side, 'wave', true);
    if (!a.data.friendEl) {
      a.data.friendEl = actProp(a, friendArt(kind), { left: '50%', bottom: '22%', width: '14vmin', height: '14vmin', transform: 'translateX(-50%)' }, 12);
      popIn(a.data.friendEl);
    }
    Sound.play(BUDDIES[kind].sound);
    Speech.say(BUDDIES[kind].name);
    animate(a.data.friendEl.firstChild, [{ transform: 'translateY(0)' }, { transform: 'translateY(-14%)' }, { transform: 'translateY(0)' }], { duration: 500, easing: 'ease-out' });
    sayBubble(p, 'Hi, ' + BUDDIES[kind].name + '!', 2200);
    if (a.data.hi[side]) return;
    a.data.hi[side] = true;
    renderColumn(side);
    if (!(a.data.hi.left && a.data.hi.right)) { invite(other(side), 'meetfriend', 6000); return; }
    await wait(1200);
    if (act !== a) return;
    if (meetFriend(kind)) {
      togetherMoment('friend-' + kind);
      friendMade(kind);
    }
    a.data.friend = nextFriendAt(a.opts.place);   // the farm has more than one friend: next time
    a.data.friendEl && a.data.friendEl.remove();
    a.data.friendEl = null;
    a.data.hi = {};
    renderColumns();
  },
};
function coneEl(a, side) {
  if (a.data['coneEl' + side]) return a.data['coneEl' + side];
  const p = pets[side], at = petPoint(p, side === 'left' ? 0.92 : 0.08, 0.62);
  const c = actProp(a, '<svg viewBox="0 0 40 60"><path d="M6 6 L20 58 L34 6Z" fill="#e8b071" stroke="#c98a3c" stroke-width="2.5" stroke-linejoin="round"/><path d="M10 14 L28 30 M8 26 L24 44 M30 14 L14 30" stroke="#c98a3c" stroke-width="1.5"/></svg>',
    { left: at.x + 'px', top: at.y + 'px', width: '7vmin', height: '10.5vmin', transform: 'translateX(-50%)' }, 32);
  c.classList.add('cone');
  a.data['coneEl' + side] = c;
  return c;
}
function addScoop(a, side, flavor) {
  const cone = a.data.cone[side];
  if (cone.length >= 3) return;
  const c = coneEl(a, side);
  const s = el('div', 'scoopball');
  s.style.background = FLAVORS[flavor][1];
  s.style.bottom = 86 + cone.length * 46 + '%';
  c.append(s);
  cone.push(s);
  Sound.play('plop');
  animate(s, [{ transform: 'translateX(-50%) translateY(-200%)' }, { transform: 'translateX(-50%) translateY(0)' }], { duration: 350, easing: 'ease-in' });
  mood(pets[side], 'happy', 1000);
  if (flavor === SETTINGS.favorites[side] || (flavor === 'fish' && side === 'left')) { sayBubble(pets[side], 'My favorite!', 1800); floatHearts(pets[side], 3); }
}

/* ---------- new things, memory book, sounds ---------- */
NEW_THINGS.push({ key: 'trips', order: 18, room: 'frontyard', acts: ['car'], icon: 'car', word: 'car' });
// more places in town appear one at a time, after the first trips
NEW_THINGS.push({ key: 'farm', order: 20, requires: 'trips', icon: 'farm', word: 'farm' });
NEW_THINGS.push({ key: 'library', order: 21, requires: 'farm', icon: 'library', word: 'library' });
NEW_THINGS.push({ key: 'snowhill', order: 22, requires: 'library', icon: 'snowhill', word: 'snowy hill' });
Object.assign(BOOK_LINES, {
  beach:    { line: 'went to the beach.',            icon: 'beach', rank: 98 },
  park:     { line: 'went to the park.',             icon: 'park',  rank: 98 },
  icecream: { line: 'went to the ice cream shop.',   icon: 'shop',  rank: 98 },
  farm:     { line: 'went to the farm.',             icon: 'farm',  rank: 98 },
  library:  { line: 'went to the library.',          icon: 'library', rank: 98 },
  snowhill: { line: 'played on the snowy hill.',     icon: 'snowhill', rank: 98 },
});
Sound.add('honk', s => { s.tone(s.NOTE(64), 0, 0.14, { type: 'square', vol: 0.03 }); s.tone(s.NOTE(64), 0.18, 0.2, { type: 'square', vol: 0.03 }); });
Sound.add('vroom', s => { s.tone(70, 0, 1.2, { type: 'sawtooth', to: 160, vol: 0.025, attack: 0.1 }); s.noise(0, 1.2, { filter: 'lowpass', freq: 400, vol: 0.04, attack: 0.1 }); });
Sound.add('splash', s => { s.noise(0.5, 0.5, { filter: 'bandpass', freq: 1200, to: 500, q: 0.8, vol: 0.07 }); });
Sound.add('swing', s => { [0, 0.7, 1.4].forEach(t => s.tone(s.NOTE(72), t, 0.3, { to: s.NOTE(79), vol: 0.04 })); });
Sound.add('slidewhee', s => { s.tone(s.NOTE(84), 0.5, 0.9, { to: s.NOTE(67), type: 'triangle', vol: 0.06 }); });
Sound.add('quack', s => { s.tone(330, 0, 0.12, { type: 'sawtooth', to: 260, vol: 0.03 }); s.tone(330, 0.18, 0.14, { type: 'sawtooth', to: 250, vol: 0.03 }); });
Sound.add('crack', s => { s.noise(0, 0.05, { filter: 'highpass', freq: 3000, vol: 0.06 }); s.noise(0.08, 0.05, { filter: 'highpass', freq: 3500, vol: 0.05 }); });
Sound.add('peep', s => { s.tone(s.NOTE(88), 0, 0.1, { to: s.NOTE(93), vol: 0.05 }); s.tone(s.NOTE(91), 0.14, 0.1, { to: s.NOTE(95), vol: 0.05 }); });
Sound.add('page', s => { s.noise(0, 0.18, { filter: 'bandpass', freq: 2200, to: 900, q: 0.7, vol: 0.05 }); });
Sound.add('shh', s => { s.noise(0, 0.7, { filter: 'bandpass', freq: 3000, q: 0.6, vol: 0.05, attack: 0.15 }); });
