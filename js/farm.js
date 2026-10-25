'use strict';
/* Twin Pets: the farm. Four little games with a goal, each needing both girls: milk the cow (one holds the bucket,
   one milks, then they swap), the egg hunt (hay piles hide eggs; both tap the golden egg), feeding the animals
   what each one likes, and a tractor ride (one steers, one honks, they swap every lap). A miss never ends a game. */

Object.assign(ICONS, {
  bucketBtn: '<svg viewBox="0 0 100 100"><path d="M16 34 L25 90 H75 L84 34Z" fill="#c9d2e0" stroke="#7a869c" stroke-width="4" stroke-linejoin="round"/><path d="M20 34 C 20 4, 80 4, 80 34" fill="none" stroke="#7a869c" stroke-width="4"/><ellipse cx="50" cy="34" rx="34" ry="9" fill="#fff" stroke="#7a869c" stroke-width="4"/></svg>',
  hayPile: '<svg viewBox="0 0 100 100"><path d="M4 92 C 4 44, 28 14, 50 14 C 72 14, 96 44, 96 92Z" fill="#f5d36a" stroke="#d9a93a" stroke-width="3"/><path d="M20 84 L32 46 M40 88 L48 30 M60 88 L68 36 M80 84 L74 52 M28 88 L22 62 M52 88 L58 52" stroke="#d9a93a" stroke-width="3.500" stroke-linecap="round"/></svg>',
  tractorBtn: '<svg viewBox="0 0 100 100"><path d="M10 66 V46 H40 L48 28 H78 V66Z" fill="#e8503a" stroke="#b33a28" stroke-width="3" stroke-linejoin="round"/><rect x="52" y="32" width="22" height="18" rx="3" fill="#bfe9fb"/><circle cx="66" cy="72" r="19" fill="#3e3a4f"/><circle cx="66" cy="72" r="7" fill="#c9d2e0"/><circle cx="24" cy="78" r="11" fill="#3e3a4f"/><circle cx="24" cy="78" r="4" fill="#c9d2e0"/></svg>',
  tractorArt: '<svg viewBox="0 0 160 110"><path d="M8 70 V44 H54 L64 22 H150 V76 H8Z" fill="#e8503a" stroke="#b33a28" stroke-width="4" stroke-linejoin="round"/><rect x="82" y="26" width="64" height="38" rx="5" fill="#bfe9fb" stroke="#b33a28" stroke-width="3"/><rect x="14" y="26" width="8" height="20" rx="3" fill="#3e3a4f"/><circle cx="112" cy="80" r="28" fill="#3e3a4f"/><circle cx="112" cy="80" r="11" fill="#c9d2e0"/><circle cx="36" cy="92" r="16" fill="#3e3a4f"/><circle cx="36" cy="92" r="6" fill="#c9d2e0"/></svg>',
  wagonArt: '<svg viewBox="0 0 100 70"><rect x="4" y="14" width="92" height="36" rx="6" fill="#b9895a" stroke="#8a5a3c" stroke-width="3"/><circle cx="28" cy="56" r="12" fill="#3e3a4f"/><circle cx="72" cy="56" r="12" fill="#3e3a4f"/></svg>',
  upBtn: '<svg viewBox="0 0 100 100"><path d="M50 14 L88 62 H64 V88 H36 V62 H12Z" fill="#6cc551" stroke="#3a8a27" stroke-width="5" stroke-linejoin="round"/></svg>',
  downBtn: '<svg viewBox="0 0 100 100"><path d="M50 86 L88 38 H64 V12 H36 V38 H12Z" fill="#5aa9ff" stroke="#2f72c9" stroke-width="5" stroke-linejoin="round"/></svg>',
  hornBtn: '<svg viewBox="0 0 100 100"><path d="M14 40 H34 L66 18 V82 L34 60 H14Z" fill="#ffd23f" stroke="#c9a000" stroke-width="5" stroke-linejoin="round"/><path d="M78 36 C 88 44, 88 56, 78 64 M86 24 C 102 40, 102 60, 86 76" stroke="#c9a000" stroke-width="5" fill="none" stroke-linecap="round"/></svg>',
  sniffBtn: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="56" rx="30" ry="24" fill="#ffc0d6" stroke="#f08bb0" stroke-width="4"/><circle cx="40" cy="56" r="5" fill="#d9608c"/><circle cx="60" cy="56" r="5" fill="#d9608c"/><path d="M84 20 L90 32 L78 30Z M70 10 L74 24 L64 20Z" fill="#ffd23f"/></svg>',
  goldEgg: '<svg viewBox="0 0 100 100" style="filter: sepia(1) saturate(5) hue-rotate(2deg) drop-shadow(0 0 4px #ffd23f)">' + '<path d="M50 10 C 74 10, 84 46, 84 62 C 84 82, 68 92, 50 92 C 32 92, 16 82, 16 62 C 16 46, 26 10, 50 10Z" fill="#fff4d6" stroke="#e0b030" stroke-width="4"/></svg>',
});

/* ---------- a game at a town place: its buttons replace the place's buttons until it finishes or Back is tapped ---------- */
const GAME_BACK = { icon: 'back', label: 'Back' };
function townPlan(place) {
  PLACE_PLAN[place] = (a, side) => {
    const g = a.data.game;
    if (!g || !g.on) return null;
    const plan = g.plan(side, g);
    return Object.assign(plan, { acts: [...plan.acts, 'gquit'], defs: Object.assign({ gquit: GAME_BACK }, plan.defs) });
  };
}
/* Start a game (g has plan(side) and may have stop()). Everything it draws goes into g.field. Returns g, or null if one is already going. */
function townStart(a, g, icon, word) {
  if (a.data.game && a.data.game.on) return null;
  Object.assign(g, { on: true, a, timers: [] });
  g.field = actProp(a, '', { inset: 0 }, 13);
  a.data.game = g;
  a.cleanup.push(() => { g.timers.forEach(clearInterval); g.on = false; });
  showHint(icon, word);
  renderColumns();
  return g;
}
function townEnd(a, won, type) {
  const g = a.data.game;
  if (!g || !g.on) return;
  g.on = false;
  a.data.game = null;
  g.timers.forEach(clearInterval);
  if (g.stop) g.stop();
  const f = g.field;
  if (won) {
    Sound.play('yay');
    celebrate(W() / 2, H() * 0.4, 18);
    SIDES.forEach(s => { mood(pets[s], 'happy', 2200); floatHearts(pets[s], 3); hopPet(s); });
    if (a.opts.place === 'farm') farmCheer(a);
    togetherMoment(type);
  }
  animate(f, [{ opacity: 1 }, { opacity: 0 }], { duration: won ? 700 : 300, fill: 'forwards' }).then(() => f.remove());
  renderColumns();
}
TRIP_PLAY.gquit = a => townEnd(a, false);
const tgHit = (e, fn) => { e.classList.add('tg-hit'); onTap(e, fn); return e; };
const sideOfTap = ev => (ev && ev.clientX < W() / 2 ? 'left' : 'right');

/* ---------- the farm animals join in ---------- */
const farmAnimals = a => a.data.residents || [];
function farmHide(a, hide) {
  farmAnimals(a).forEach(e => { e.style.transition = 'opacity .3s'; e.style.opacity = hide ? 0 : 1; e.style.pointerEvents = hide ? 'none' : 'auto'; });
}
async function farmCheer(a) {                         // they all hop and call out, one after another
  for (const e of farmAnimals(a)) { if (act !== a) return; residentCalls(e); await wait(260); }
}
townPlan('farm');

/* ---------- 1. milk the cow: one holds the bucket, one milks, then they swap ---------- */
const MILK_FULL = 10;
TRIP_PLAY.milkgame = function (a, side) {
  const g = townStart(a, {
    id: 'milk', milker: 'left', up: false, level: 0, t0: now(), stop: () => farmHide(a, false),
    plan: (s, g) => (s === g.milker
      ? { acts: ['milkdo'], defs: { milkdo: { icon: 'milk', label: 'Milk' } }, clsOf: { milkdo: 'invite' } }
      : { acts: ['bucket'], defs: { bucket: { icon: 'bucketBtn', label: 'Bucket' } }, clsOf: { bucket: g.up ? '' : 'invite' } }),
  }, 'moo', 'milk');
  if (!g) { hopPet(side); return; }
  farmHide(a, true);
  g.cow = el('div', 'mcow', friendArt('cow') + '<div class="mbeat"></div>');
  g.bucket = el('div', 'mbucket', ICONS.bucketBtn + '<div class="mmilk"></div>');
  g.field.append(g.cow, g.bucket);
  popIn(g.cow);
  Sound.play('moo');
};
TRIP_PLAY.bucket = function (a, side) {
  const g = a.data.game;
  if (!g || g.id !== 'milk') return;
  g.up = true;
  g.bucket.classList.add('up');
  Sound.play('pop');
  hopPet(side);
  renderColumn(side);
  clearTimeout(g.upTimer);
  g.upTimer = setTimeout(() => { if (g.on) { g.up = false; g.bucket.classList.remove('up'); renderColumns(); } }, 3200);
};
TRIP_PLAY.milkdo = async function (a, side) {
  const g = a.data.game;
  if (!g || g.id !== 'milk' || g.level >= MILK_FULL) return;
  const beat = ((now() - g.t0) % 1000) / 1000;                              // the pulse grows over one second: a tap near its end is on the beat
  const onBeat = beat > 0.75 || beat < 0.1;
  const c = g.cow.getBoundingClientRect(), r = g.bucket.getBoundingClientRect();
  const drop = el('div', 'mdrop');
  Object.assign(drop.style, { left: c.left + c.width * 0.5 + 'px', top: c.top + c.height * 0.88 + 'px' });
  g.field.append(drop);
  hopPet(side);
  Sound.play('fmsquirt');
  if (!g.up) {                                                              // no bucket under the cow: a little splash on the ground (nothing lost)
    await animate(drop, [{ transform: 'translateY(0)' }, { transform: `translateY(${r.bottom - c.top - c.height * 0.88}px)` }], { duration: 330, easing: 'ease-in' });
    sparkles(c.left + c.width / 2, r.bottom, 4, ['#ffffff', '#d9f1ff']);
    drop.remove();
    return;
  }
  await animate(drop, [{ transform: 'translateY(0)' }, { transform: `translateY(${r.top - c.top - c.height * 0.88 + 6}px)` }], { duration: 260, easing: 'ease-in' });
  drop.remove();
  if (!g.on) return;
  g.level++;
  g.bucket.style.setProperty('--fill', g.level / MILK_FULL);
  Sound.play('fmplink', Math.min(g.level, 10));
  if (onBeat) sparkles(r.left + r.width / 2, r.top, 5);
  mood(pets[side], 'happy', 800);
  animate(g.cow.firstChild, [{ transform: 'scale(1)' }, { transform: 'scale(1.03,.97)' }, { transform: 'scale(1)' }], { duration: 300 });
  if (g.level === MILK_FULL / 2) {                                          // halfway: swap jobs
    g.milker = other(g.milker);
    g.up = false; g.bucket.classList.remove('up');
    Sound.play('wish');
    SIDES.forEach(s => floatHearts(pets[s], 1));
    renderColumns();
  } else if (g.level >= MILK_FULL) {
    Sound.play('moo');
    animate(g.cow.firstChild, [{ transform: 'translateY(0)' }, { transform: 'translateY(-8%) rotate(-3deg)' }, { transform: 'translateY(0)' }, { transform: 'translateY(-8%) rotate(3deg)' }, { transform: 'translateY(0)' }], { duration: 900 });
    await wait(1300);
    townEnd(a, true, 'milk');
  }
};

/* ---------- 2. the egg hunt: eggs hide under hay piles; both tap the golden egg ---------- */
const EGG_PILES = [[18, 33], [27, 44], [37, 33], [43, 45], [82, 33], [73, 44], [63, 33], [57, 45]];   // [left %, top %]: four on each girl's half
const EGGS_TO_FIND = 6;
TRIP_PLAY.egghunt = function (a, side) {
  const g = townStart(a, {
    id: 'eggs', found: 0, piles: [], stop: () => farmHide(a, false),
    plan: (s, g) => (g.found >= EGGS_TO_FIND
      ? { acts: ['goldegg'], defs: { goldegg: { icon: 'goldEgg', label: 'Egg' } }, clsOf: { goldegg: 'invite' } }
      : { acts: ['sniff'], defs: { sniff: { icon: 'sniffBtn', label: 'Sniff' } } }),
  }, 'egg', 'eggs');
  if (!g) { hopPet(side); return; }
  farmHide(a, true);
  const eggs = shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
  const lefts = eggs.filter(i => i < 4).slice(0, 3), rights = eggs.filter(i => i >= 4).slice(0, 3);   // three eggs under each girl's piles
  const withEgg = [...lefts, ...rights];
  EGG_PILES.forEach(([x, y], i) => {
    const pile = el('div', 'hpile', `<div class="hhid"></div>${ICONS.hayPile}`);
    Object.assign(pile.style, { left: x + '%', top: y + '%' });
    pile.egg = withEgg.includes(i);
    g.piles.push(pile);
    tgHit(pile, ev => eggDig(a, pile, sideOfTap(ev)));
    g.field.append(pile);
    popIn(pile);
  });
  g.basket = el('div', 'ebasket', ICONS.basket + `<div class="eslots">${'<i></i>'.repeat(EGGS_TO_FIND)}</div>`);
  g.field.append(g.basket);
  Sound.play('door');
};
async function eggDig(a, pile, side) {
  const g = a.data.game;
  if (!g || g.id !== 'eggs' || pile.dug || g.found >= EGGS_TO_FIND) return;
  pile.dug = true;
  hopPet(side);
  Sound.play('fmrustle');
  const r = pile.getBoundingClientRect(), hid = pile.querySelector('.hhid');
  await animate(pile.lastChild, [{ transform: 'rotate(0)' }, { transform: 'rotate(-7deg) scale(1.06)' }, { transform: 'rotate(7deg) scale(1.06)' }, { transform: 'rotate(0)' }], { duration: 400 });
  if (!g.on) return;
  pile.lastChild.style.cssText = 'transform: translateY(40%) scale(.7); opacity: .0; transition: all .4s';
  if (pile.egg) {
    hid.innerHTML = ICONS.egg;
    hid.firstChild.style.filter = `hue-rotate(${Math.floor(rand(0, 300))}deg) saturate(1.8)`;
    Sound.play('fmfind');
    sparkles(r.left + r.width / 2, r.top + r.height * 0.4, 6, ['#ffe066', '#ff8fb8', '#ffffff']);
    await wait(450);
    if (!g.on) return;
    const b = g.basket.getBoundingClientRect();
    const flier = prop(hid.innerHTML, 8, r.left + r.width / 2, r.top + r.height * 0.45);
    flier.style.zIndex = 33;
    hid.innerHTML = '';
    await arc(flier, { x: r.left + r.width / 2, y: r.top + r.height * 0.45 }, { x: b.left + b.width / 2, y: b.top + b.height * 0.6 }, 600, 90, 180);
    flier.remove();
    if (!g.on) return;
    g.found++;
    g.basket.querySelectorAll('.eslots i')[g.found - 1].classList.add('on');
    Sound.play('pick');
    mood(pets[side], 'happy', 900);
    floatHearts(pets[side], 1);
    if (g.found >= EGGS_TO_FIND) {
      const gold = g.gold = el('div', 'goldegg', ICONS.goldEgg);
      g.field.append(gold);
      popIn(gold);
      tgHit(gold, ev => bothTap('goldegg', sideOfTap(ev), () => hatchGold(a)));
      Sound.play('wish');
      showHint('goldEgg', 'golden egg');
      renderColumns();
    }
  } else {                                                                  // a chick was snoozing there: peep, and off it hops
    hid.innerHTML = ICONS.chick;
    Sound.play('peep');
    await animate(hid, [{ transform: 'translateY(30%) scale(.5)' }, { transform: 'translateY(-30%) scale(1.1)' }, { transform: 'translateY(-10%) scale(1)' }], { duration: 400, fill: 'forwards' });
    await wait(500);
    if (!g.on) return;
    animate(hid, [{ transform: 'translateY(-10%)', opacity: 1 }, { transform: 'translate(120%, -60%)', opacity: 0 }], { duration: 600, fill: 'forwards' });
    floatHearts(pets[side], 1);
  }
}
TRIP_PLAY.sniff = function (a, side, p) {                                    // the pet points her nose at a pile on her own half that still hides something
  const g = a.data.game;
  if (!g || g.id !== 'eggs') return;
  begin(p, 900);
  Sound.play('fmsniff');
  const mine = g.piles.filter((pl, i) => !pl.dug && (side === 'left') === (i < 4));
  const pl = mine.find(x => x.egg) || mine[0];
  if (!pl) return;
  animate(pl, [{ transform: 'translateX(-50%) translateY(0)' }, { transform: 'translateX(-50%) translateY(-12%) scale(1.1)' }, { transform: 'translateX(-50%) translateY(0)' }, { transform: 'translateX(-50%) translateY(-12%) scale(1.1)' }, { transform: 'translateX(-50%) translateY(0)' }], { duration: 900 });
  sparkles(pl.getBoundingClientRect().left + pl.offsetWidth / 2, pl.getBoundingClientRect().top, 3, ['#ffe066']);
};
TRIP_PLAY.goldegg = function (a, side) {
  const g = a.data.game;
  if (!g || g.id !== 'eggs' || g.found < EGGS_TO_FIND) return;
  hopPet(side);
  Sound.play('pop');
  bothTap('goldegg', side, () => hatchGold(a));
};
async function hatchGold(a) {
  const g = a.data.game;
  if (!g || g.id !== 'eggs' || g.hatching) return;
  g.hatching = true;
  g.gold.classList.add('shake');
  Sound.play('fmsniff');
  await wait(900);
  if (!g.on) return;
  Sound.play('crack');
  g.gold.innerHTML = ICONS.chick;
  g.gold.firstChild.style.filter = 'sepia(1) saturate(5) hue-rotate(2deg) drop-shadow(0 0 6px #ffd23f)';
  const r = g.gold.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top + r.height / 2, 14, ['#ffe066', '#fff4e0', '#ffffff']);
  Sound.play('peep');
  animate(g.gold, [{ transform: 'translateX(-50%) scale(.6)' }, { transform: 'translateX(-50%) scale(1.3)' }, { transform: 'translateX(-50%) scale(1)' }], { duration: 500 });
  SIDES.forEach(s => doTrick(s, 'spin', true));
  await wait(1700);
  townEnd(a, true, 'eggs');
}

/* ---------- 3. feed the animals what each one likes (any food is fine, the right one makes it dance) ---------- */
const FARM_FOOD = { hen: 'corn', horse: 'apple', cow: 'hay', lamb: 'carrot', piggy: 'pumpkin' };
const FOOD_WORD = { corn: 'Corn', apple: 'Apple', hay: 'Hay', carrot: 'Carrot', pumpkin: 'Pumpkin' };
TRIP_PLAY.feedgame = function (a, side) {
  const g = townStart(a, {
    id: 'feed', done: 0,
    plan: () => ({ acts: Object.keys(FOOD_WORD).map(f => 'feed_' + f), defs: Object.fromEntries(Object.keys(FOOD_WORD).map(f => ['feed_' + f, { icon: f, label: FOOD_WORD[f] }])) }),
  }, 'moo', 'feed');
  if (!g) { hopPet(side); return; }
  g.bubbles = farmAnimals(a).map(e => {
    const b = el('div', 'fbub', ICONS[FARM_FOOD[e.dataset.kind]]);
    const r = e.getBoundingClientRect();
    Object.assign(b.style, { left: r.left + r.width / 2 + 'px', top: r.top - 6 + 'px' });
    g.field.append(b);
    popIn(b);
    e.fed = false;
    b.animal = e;
    return b;
  });
  Sound.play('moo');
};
Object.keys(FOOD_WORD).forEach(f => { TRIP_PLAY['feed_' + f] = (a, side) => feedThrow(a, side, f); });
async function feedThrow(a, side, food) {
  const g = a.data.game;
  if (!g || g.id !== 'feed') return;
  const hungry = g.bubbles.filter(b => !b.animal.fed);
  if (!hungry.length) return;
  const p = pets[side];
  begin(p, 1800);
  const target = (hungry.find(b => FARM_FOOD[b.animal.dataset.kind] === food) || pick(hungry));
  const an = target.animal, right = FARM_FOOD[an.dataset.kind] === food;
  const from = petPoint(p, 0.5, 0.5), r = an.getBoundingClientRect();
  const to = { x: r.left + r.width / 2, y: r.top + r.height * 0.45 };
  const item = prop(ICONS[food], 6, from.x, from.y);
  item.style.zIndex = 32;
  item.dataset.owner = side;
  await arc(item, from, to, 700, 100, 200);
  item.remove();
  Sound.play('chomp');
  Sound.play(BUDDIES[an.dataset.kind].sound);
  if (!g.on) return;
  if (!right) {                                                             // any food is OK: a happy chew, and it still wants its own
    animate(an.firstChild, [{ transform: 'scale(1)' }, { transform: 'scale(1.12,.9)' }, { transform: 'scale(1)' }, { transform: 'scale(1.12,.9)' }, { transform: 'scale(1)' }], { duration: 700 });
    animate(target, [{ transform: 'translateX(-50%) scale(1)' }, { transform: 'translateX(-50%) scale(1.2)' }, { transform: 'translateX(-50%) scale(1)' }], { duration: 500 });
    mood(p, 'happy', 1000);
    return;
  }
  an.fed = true;
  g.done++;
  target.innerHTML = '<svg viewBox="0 0 100 100"><path d="M50 86 C 10 56, 14 20, 36 20 C 44 20, 50 28, 50 28 C 50 28, 56 20, 64 20 C 86 20, 90 56, 50 86Z" fill="#ff6f91"/></svg>';
  Sound.play('fmdance');
  animate(an.firstChild, [-8, 8, -8, 8, 0].map((rot, i) => ({ transform: `translateY(${i % 2 ? 0 : -14}%) rotate(${rot}deg)` })), { duration: 900, iterations: 2 });
  floatHearts(p, 2);
  sparkles(to.x, to.y - 10, 7);
  mood(p, 'happy', 1400);
  if (g.done >= g.bubbles.length) {
    SIDES.forEach(s => doTrick(s, 'dance', true));
    for (const b of g.bubbles) { animate(b.animal.firstChild, [{ transform: 'translateY(0)' }, { transform: 'translateY(-20%) scale(1.1)' }, { transform: 'translateY(0)' }], { duration: 500, iterations: 3 }); }
    Sound.play('cheer');
    await wait(2200);
    townEnd(a, true, 'feed');
  }
}

/* ---------- 4. the tractor ride: one steers up and down, one honks, they swap every lap ---------- */
const TR_BALES = 6, TR_SPEED = 170;
const trLane = lane => H() * [0.6, 0.72, 0.84][lane];                       // where the bottom of the tractor sits
TRIP_PLAY.tractor = function (a, side) {
  const g = townStart(a, {
    id: 'tractor', lane: 1, px: -200, steer: 'left', got: 0, spawned: 0, bales: [], blockers: [], block: null,
    stop: () => { farmHide(a, false); fadePets(true); },
    plan: (s, g) => (s === g.steer
      ? { acts: ['tup', 'tdown'], defs: { tup: { icon: 'upBtn', label: 'Up' }, tdown: { icon: 'downBtn', label: 'Down' } } }
      : { acts: ['thonk'], defs: { thonk: { icon: 'hornBtn', label: 'Honk' } }, clsOf: { thonk: g.block ? 'invite' : '' } }),
  }, 'tractorBtn', 'tractor');
  if (!g) { hopPet(side); return; }
  farmHide(a, true);
  fadePets(false);
  g.rig = el('div', 'trrig', `<div class="trwagon">${ICONS.wagonArt}<div class="trslots">${'<i></i>'.repeat(TR_BALES)}</div></div><div class="trtractor">${ICONS.tractorArt}<div class="trfaces"></div></div>`);
  SIDES.forEach(s => { const f = el('div', 'tgface'); f.append(faceDrawing(s)); g.rig.querySelector('.trfaces').append(f); });
  g.field.append(g.rig);
  g.rig.style.top = trLane(g.lane) + 'px';
  Sound.play('vroom');
  trSpawn(g);
  g.timers.push(setInterval(() => trTick(a, g), 40));
};
function trSpawn(g) {                                                       // bales and one animal in the road each lap
  const now_ = g.bales.filter(b => !b.got).length;
  for (let i = now_; i < 3 && g.spawned < TR_BALES; i++, g.spawned++) {
    const e = el('div', 'trbale', ICONS.hay);
    const lane = Math.floor(rand(0, 3));
    const b = { el: e, lane, px: W() * (0.3 + i * 0.22), got: false };
    Object.assign(e.style, { left: b.px + 'px', top: trLane(lane) + 'px' });
    g.field.append(e);
    g.bales.push(b);
  }
  const kind = pick(['lamb', 'piggy', 'cow', 'hen']), lane = g.lane === 1 ? pick([0, 2]) : 1;
  const e = el('div', 'trblock', friendArt(kind));
  const bl = { el: e, lane, px: W() * 0.62, kind };
  Object.assign(e.style, { left: bl.px + 'px', top: trLane(lane) + 'px' });
  g.field.append(e);
  g.blockers = [bl];
}
function trTick(a, g) {
  if (!g.on || a.data.game !== g || scene !== 'act' || g.ending) return;
  const ahead = g.blockers.find(b => b.lane === g.lane && b.px > g.px + 20 && b.px - g.px < 230);
  const was = g.block;
  g.block = ahead || null;
  if (!!was !== !!g.block) { g.rig.classList.toggle('stopped', !!g.block); renderColumn(other(g.steer)); if (g.block) { Sound.play('fmsniff'); showHint('hornBtn', 'honk'); } }
  if (!g.block) g.px += TR_SPEED * 0.04;
  g.rig.style.left = g.px + 'px';
  g.rig.style.top = trLane(g.lane) + 'px';
  g.bales.forEach(b => {
    if (b.got || b.lane !== g.lane || Math.abs(b.px - g.px) > 90) return;
    b.got = true;
    trPick(a, g, b);
  });
  if (g.px > W() + 260) trLap(a, g);
}
async function trPick(a, g, b) {
  Sound.play('pop');
  const r = b.el.getBoundingClientRect(), slot = g.rig.querySelectorAll('.trslots i')[g.got];
  g.got++;
  b.el.remove();
  const s = slot.getBoundingClientRect();
  const fly = prop(ICONS.hay, 7, r.left + r.width / 2, r.top + r.height / 2);
  fly.style.zIndex = 33;
  SIDES.forEach(x => { mood(pets[x], 'happy', 900); });
  floatHearts(pets[g.steer], 1);
  await arc(fly, { x: r.left + r.width / 2, y: r.top + r.height / 2 }, { x: s.left + s.width / 2, y: s.top + s.height / 2 }, 450, 60);
  fly.remove();
  slot.classList.add('on');
  if (g.got >= TR_BALES && !g.ending) {
    g.ending = true;
    Sound.play('honk'); Sound.play('cheer');
    await wait(1400);
    townEnd(a, true, 'tractor');
  }
}
function trLap(a, g) {                                                      // round the field again, and the girls swap jobs
  g.px = -240;
  g.steer = other(g.steer);
  g.blockers.forEach(b => b.el.remove());
  trSpawn(g);
  Sound.play('wish');
  SIDES.forEach(s => floatHearts(pets[s], 1));
  renderColumns();
}
TRIP_PLAY.tup = (a, side) => trSteer(a, side, -1);
TRIP_PLAY.tdown = (a, side) => trSteer(a, side, 1);
function trSteer(a, side, d) {
  const g = a.data.game;
  if (!g || g.id !== 'tractor') return;
  const lane = Math.max(0, Math.min(2, g.lane + d));
  if (lane === g.lane) { hopPet(side); return; }
  g.lane = lane;
  Sound.play('click');
}
TRIP_PLAY.thonk = function (a, side) {
  const g = a.data.game;
  if (!g || g.id !== 'tractor') return;
  Sound.play('honk');
  hopPet(side);
  g.rig.classList.add('honking');
  setTimeout(() => g.rig && g.rig.classList.remove('honking'), 400);
  const bl = g.block;
  if (!bl) return;
  g.block = null;
  g.blockers = g.blockers.filter(b => b !== bl);
  Sound.play(BUDDIES[bl.kind].sound);
  animate(bl.el, [{ transform: 'translate(-50%, 0)', opacity: 1 }, { transform: 'translate(-50%, -80%)' }, { transform: 'translate(-50%, -20%)', opacity: 1 }, { transform: 'translate(-50%, -60%) scale(.6)', opacity: 0 }], { duration: 900, fill: 'forwards' }).then(() => bl.el.remove());
  sparkles(bl.px, trLane(bl.lane) - 40, 5);
};

/* ---------- memory book and sounds ---------- */
Object.assign(BOOK_LINES, {
  milk: { line: 'milked the cow together.', icon: 'milk', rank: 96.5 },
  eggs: { line: 'found all the eggs, even the golden one.', icon: 'egg', rank: 96.5 },
  feed: { line: 'fed every farm animal its favorite.', icon: 'hay', rank: 96.5 },
  tractor: { line: 'rode the tractor and gathered the hay.', icon: 'tractorBtn', rank: 96.5 },
});
Sound.add('fmsquirt', s => { s.noise(0, 0.12, { filter: 'bandpass', freq: 2600, q: 2, vol: 0.05 }); s.tone(s.NOTE(88), 0, 0.08, { to: s.NOTE(80), vol: 0.03 }); });
Sound.add('fmplink', (s, n = 1) => { s.tone(s.NOTE(66 + n), 0, 0.28, { type: 'triangle', vol: 0.06, echo: 1 }); });
Sound.add('fmrustle', s => { [0, 0.07, 0.15, 0.24].forEach(t => s.noise(t, 0.08, { filter: 'bandpass', freq: 2800, q: 0.8, vol: 0.05 })); });
Sound.add('fmfind', s => { [84, 88, 91, 96].forEach((m, i) => s.tone(s.NOTE(m), i * 0.08, 0.3, { vol: 0.05, echo: 1 })); });
Sound.add('fmsniff', s => { s.noise(0, 0.1, { filter: 'highpass', freq: 1500, vol: 0.04 }); s.noise(0.15, 0.1, { filter: 'highpass', freq: 1800, vol: 0.04 }); });
Sound.add('fmdance', s => { [72, 76, 79, 84, 79, 84].forEach((m, i) => s.tone(s.NOTE(m), i * 0.11, 0.25, { type: 'triangle', vol: 0.05, echo: 1 })); });
