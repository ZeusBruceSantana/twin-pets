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
  beach:    { word: 'beach',          icon: 'beach', color: '#bfe9fb', acts: ['splash', 'castle', 'shell'] },
  park:     { word: 'park',           icon: 'park',  color: '#c8e7a6', acts: ['swing', 'slide', 'ducks'] },
  icecream: { word: 'ice cream shop', icon: 'shop',  color: '#ffd9e8', acts: ['scoop', 'lick', 'sprinkle'] },
};
const tripBox = el('div', 'overlay', '<div class="trip-grid"></div><div class="map-x"></div>');
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
    grid.append(voteTile(k, ICONS[pl.icon], pl.word, pl.color, side => {
      tripsTouched = now();
      castVote(side, k, grid, () => { closeTrips(); setTimeout(() => startActivity('trip', side, { place: k }), 50); });
    }));
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
  return `<div class="shopwall"></div><div class="awning"></div>
    <div class="counter"><div class="tubs">${['#ffc0d6', '#7a4a2a', '#fff4e0', '#a6e0c8', '#ffb38a'].map(c => `<i style="background:${c}"></i>`).join('')}</div></div><div class="shopfloor"></div>`;
}
const FLAVORS = { strawberry: ['strawberry', '#ffc0d6'], chocolate: ['chocolate', '#8a5a3c'], vanilla: ['vanilla', '#fff4e0'], mint: ['mint', '#a6e0c8'], peach: ['peach', '#ffb38a'], fish: ['fish', '#a9c8f0'] };
Object.assign(BUTTONS, {
  splash: { icon: 'splash', label: 'Splash' }, castle: { icon: 'castle', label: 'Castle' }, shell: { icon: 'shell', label: 'Shells' },
  swing: { icon: 'swing', label: 'Swing' }, slide: { icon: 'slide', label: 'Slide' }, ducks: { icon: 'ducks', label: 'Ducks' },
  scoop: { icon: 'scoop', label: 'Scoop' }, lick: { icon: 'lick', label: 'Lick' }, sprinkle: { icon: 'sprinkles', label: 'Sprinkles' },
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
    const bg = actProp(a, placeMarkup(place), { left: '0', top: '0', right: '0', bottom: '0' }, 6);
    bg.classList.add('trip', 'trip-' + place);
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
    const acts = [...PLACES[a.opts.place].acts, 'tripcar'];
    return { acts, clsOf: { tripcar: a.data.home[side] ? 'done' : '' } };
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
    TRIP_PLAY[key](a, side, p);
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
Object.assign(BOOK_LINES, {
  beach:    { line: 'went to the beach.',            icon: 'beach', rank: 98 },
  park:     { line: 'went to the park.',             icon: 'park',  rank: 98 },
  icecream: { line: 'went to the ice cream shop.',   icon: 'shop',  rank: 98 },
});
Sound.add('honk', s => { s.tone(s.NOTE(64), 0, 0.14, { type: 'square', vol: 0.03 }); s.tone(s.NOTE(64), 0.18, 0.2, { type: 'square', vol: 0.03 }); });
Sound.add('vroom', s => { s.tone(70, 0, 1.2, { type: 'sawtooth', to: 160, vol: 0.025, attack: 0.1 }); s.noise(0, 1.2, { filter: 'lowpass', freq: 400, vol: 0.04, attack: 0.1 }); });
Sound.add('splash', s => { s.noise(0.5, 0.5, { filter: 'bandpass', freq: 1200, to: 500, q: 0.8, vol: 0.07 }); });
Sound.add('swing', s => { [0, 0.7, 1.4].forEach(t => s.tone(s.NOTE(72), t, 0.3, { to: s.NOTE(79), vol: 0.04 })); });
Sound.add('slidewhee', s => { s.tone(s.NOTE(84), 0.5, 0.9, { to: s.NOTE(67), type: 'triangle', vol: 0.06 }); });
Sound.add('quack', s => { s.tone(330, 0, 0.12, { type: 'sawtooth', to: 260, vol: 0.03 }); s.tone(330, 0.18, 0.14, { type: 'sawtooth', to: 250, vol: 0.03 }); });
