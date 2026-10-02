'use strict';
/* Twin Pets: the garden in the backyard. Plant, water, and watch things grow over real time.
   What's picked goes into the fridge in the kitchen. */

/* ---------- pictures ---------- */
Object.assign(ICONS, {
  sprout: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="84" rx="34" ry="10" fill="#a9744f"/><path d="M50 82 V44" stroke="#5aa83a" stroke-width="6" stroke-linecap="round"/><path d="M50 56 C 30 56, 20 42, 22 30 C 38 30, 50 40, 50 56Z" fill="#7fd36a" stroke="#5aa83a" stroke-width="3"/><path d="M50 48 C 66 48, 78 34, 76 20 C 60 20, 50 32, 50 48Z" fill="#7fd36a" stroke="#5aa83a" stroke-width="3"/></svg>',
  seeds: '<svg viewBox="0 0 100 100"><path d="M24 20 H76 V86 C76 90 72 92 68 92 H32 C 28 92 24 90 24 86Z" fill="#fff4dd" stroke="#e0b070" stroke-width="4"/><path d="M24 20 L32 10 H68 L76 20" fill="#ffe0a8" stroke="#e0b070" stroke-width="4" stroke-linejoin="round"/><circle cx="50" cy="50" r="14" fill="#ff7a9a"/><path d="M50 64 V80" stroke="#5aa83a" stroke-width="5" stroke-linecap="round"/><path d="M50 74 C 40 74, 36 66, 38 62 C 46 62, 50 68, 50 74Z" fill="#7fd36a"/></svg>',
  wateringCan: '<svg viewBox="0 0 100 100"><path d="M22 40 H66 V82 C 66 88, 62 90, 56 90 H32 C 26 90, 22 88, 22 82Z" fill="#7fc4ff" stroke="#4a9be0" stroke-width="4" stroke-linejoin="round"/><path d="M66 52 L90 30" stroke="#4a9be0" stroke-width="7" stroke-linecap="round"/><rect x="84" y="22" width="12" height="10" rx="3" fill="#4a9be0" transform="rotate(-40 90 27)"/><path d="M30 40 C 30 22, 58 22, 58 40" fill="none" stroke="#4a9be0" stroke-width="6"/><g fill="#9fdcff"><circle cx="94" cy="44" r="3"/><circle cx="90" cy="54" r="3"/></g></svg>',
  drop: '<svg viewBox="0 0 100 100"><path d="M50 10 C 64 34, 80 50, 80 66 C 80 84, 66 94, 50 94 C 34 94, 20 84, 20 66 C 20 50, 36 34, 50 10Z" fill="#7fc4ff" stroke="#4a9be0" stroke-width="5"/><ellipse cx="38" cy="64" rx="6" ry="10" fill="#fff" opacity=".6"/></svg>',
});

/* ---------- what can grow ---------- */
const SEEDS = ['strawberry', 'tomato', 'pumpkin', 'corn'];
const SEED_FLOWER = { strawberry: '#ffffff', tomato: '#ffe066', pumpkin: '#ffc53d', corn: '#f2d27a' };
const growMs = () => SETTINGS.gardenMinutes * 60000;
// 0 = a seed waiting for water, 1 sprout, 2 leaves, 3 flowers, 4 ready to pick
function plantStage(spot) {
  if (!spot) return -1;
  if (!spot.wateredAt) return 0;
  const p = (Date.now() - spot.wateredAt + (spot.boost || 0)) / growMs();
  return p >= 1 ? 4 : p >= 0.6 ? 3 : p >= 0.25 ? 2 : 1;
}
const mini = (icon, x, y, w) => ICONS[icon].replace('<svg ', `<svg x="${x}" y="${y}" width="${w}" height="${w}" `);
function plantSvg(kind, stage) {
  let g = '<ellipse cx="30" cy="74" rx="22" ry="6" fill="#8a5a3c"/>';
  if (stage === 0) return `<svg viewBox="0 0 60 80">${g}<ellipse cx="30" cy="70" rx="4" ry="3" fill="#f1d28a" stroke="#c9a05a" stroke-width="1.5"/></svg>`;
  const h = [0, 14, 30, 42, 44][stage], top = 72 - h;
  const leaf = (x, y, dir, s = 1) => `<path d="M30 ${y} C ${30 + dir * 8 * s} ${y - 2}, ${30 + dir * 16 * s} ${y - 8 * s}, ${30 + dir * 17 * s} ${y - 14 * s} C ${30 + dir * 6 * s} ${y - 14 * s}, 30 ${y - 8 * s}, 30 ${y}Z" fill="#7fd36a" stroke="#5aa83a" stroke-width="1.5"/>`;
  g += `<path d="M30 72 V${top}" stroke="#5aa83a" stroke-width="3.5" stroke-linecap="round"/>`;
  g += leaf(30, top + 6, -1, stage === 1 ? 0.6 : 1) + leaf(30, top + 4, 1, stage === 1 ? 0.6 : 1);
  if (stage >= 2) g += leaf(30, top + 20, 1) + leaf(30, top + 24, -1);
  if (stage === 3) {
    const c = SEED_FLOWER[kind];
    [[18, top + 4], [42, top + 10], [30, top - 2]].forEach(([x, y]) => {
      g += `<g transform="translate(${x} ${y})"><circle r="3" cx="-3" fill="${c}"/><circle r="3" cx="3" fill="${c}"/><circle r="3" cy="-3" fill="${c}"/><circle r="3" cy="3" fill="${c}"/><circle r="2.2" fill="#ffb020"/></g>`;
    });
  }
  if (stage === 4) {
    if (kind === 'pumpkin') g += mini('pumpkin', 12, 44, 36);
    else if (kind === 'corn') g += mini('corn', 26, top - 4, 22) + mini('corn', 12, top + 14, 20);
    else [[8, top + 2], [32, top + 8], [20, top + 22]].forEach(([x, y]) => { g += mini(kind, x, y, 18); });
  }
  return `<svg viewBox="0 0 60 80">${g}</svg>`;
}

/* ---------- the garden bed (a thing in the backyard) ---------- */
const garden = roomThing('garden', 'backyard', 'garden',
  `<svg class="bed" viewBox="0 0 200 40" preserveAspectRatio="none"><rect x="2" y="10" width="196" height="28" rx="6" fill="#c99a6b" stroke="#a87a4b" stroke-width="3"/><rect x="8" y="6" width="184" height="12" rx="5" fill="#8a5a3c"/></svg>
   ${[0, 1, 2, 3].map(i => `<div class="gspot" data-i="${i}" style="left:${4 + i * 23.5}%"><div class="plant"></div><div class="thirsty">${ICONS.drop}</div></div>`).join('')}`,
  { left: '50%', bottom: '1.5%', width: '36vmin', height: '17vmin' });
const shownStage = [];
function renderGarden(force) {
  garden.querySelectorAll('.gspot').forEach(sp => {
    const i = +sp.dataset.i, spot = S.garden[i], st = plantStage(spot);
    if (!force && shownStage[i] === st) return;
    const grew = shownStage[i] != null && st > shownStage[i] && st > 0;
    shownStage[i] = st;
    sp.querySelector('.plant').innerHTML = st < 0 ? '' : plantSvg(spot.kind, st);
    sp.classList.toggle('thirst', st === 0);
    sp.classList.toggle('ripe', st === 4);
    if (grew && S.room === 'backyard') {
      popIn(sp.querySelector('.plant'), 400);
      if (st === 4) Sound.play('ding');
    }
  });
  if (sideMode.left === 'garden' || sideMode.right === 'garden') renderColumns();
}
setInterval(() => { if (S.room === 'backyard' && has('garden')) renderGarden(); }, 2000);
const spotPoint = i => {
  const r = garden.querySelector(`.gspot[data-i="${i}"]`).getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height * 0.75 };
};
const anyStage = st => S.garden.some(sp => plantStage(sp) === st);

/* ---------- buttons: Garden -> Plant, Water, Pick ---------- */
Object.assign(BUTTONS, {
  garden:  { icon: 'sprout',      label: 'Garden' },
  plant:   { icon: 'seeds',       label: 'Plant' },
  water:   { icon: 'wateringCan', label: 'Water' },
  harvest: { icon: 'basket',      label: 'Pick' },
});
SIDE_MODES.garden = () => ({ acts: ['plant', 'water', 'harvest', 'back'], clsOf: { water: anyStage(0) ? 'invite' : '', harvest: anyStage(4) ? 'invite' : '' } });
ACT_HANDLERS.garden = side => { sideMode[side] = 'garden'; trickTouched[side] = now(); thingTapped('garden'); Sound.play('pick'); renderColumn(side); };
ACT_HANDLERS.plant = (side, btn) => {
  trickTouched[side] = now();
  if (!S.garden.includes(null)) { nudge(btn); wiggleGarden(); return; }
  openPanel(side, {
    items: SEEDS.map(k => ({ key: k, icon: ICONS[k], word: FOODS[k].word })),
    onPick: key => plantSeed(side, key),
  });
};
async function plantSeed(side, kind) {
  const order = side === 'left' ? [1, 0, 2, 3] : [2, 3, 1, 0];      // her own half of the garden first
  const i = order.find(n => !S.garden[n]);
  if (i == null) return;
  S.garden[i] = { kind, wateredAt: 0, boost: 0 };
  save();
  const p = pets[side], from = petPoint(p, 0.5, 0.6), to = spotPoint(i);
  begin(p, 1200);
  mood(p, 'happy', 1200);
  const seed = prop(ICONS.seeds, 6, from.x, from.y);
  seed.style.zIndex = 33;
  Sound.play('toss');
  await arc(seed, from, to, 700, H() * 0.12, side === 'left' ? 200 : -200);
  seed.remove();
  Sound.play('plant');
  renderGarden(true);
  popIn(garden.querySelector(`.gspot[data-i="${i}"] .plant`));
  renderColumns();
}
ACT_HANDLERS.water = async (side, btn) => {
  trickTouched[side] = now();
  const planted = S.garden.map((sp, i) => (sp ? i : -1)).filter(i => i >= 0);
  if (!planted.length || garden.watering) { nudge(btn); return; }
  garden.watering = true;
  const p = pets[side];
  begin(p, 2200);
  mood(p, 'happy', 2000);
  const ends = planted.map(spotPoint), y = Math.min(...ends.map(e => e.y)) - H() * 0.16;
  const can = prop(ICONS.wateringCan, 10, ends[0].x, y);
  can.style.zIndex = 33;
  if (side === 'right') can.firstChild.style.transform = 'scaleX(-1)';
  Sound.play('water');
  const x0 = ends[0].x - 20, x1 = ends[ends.length - 1].x + 20;
  await tween(Math.max(700, planted.length * 420), t => {
    const x = side === 'left' ? x0 + (x1 - x0) * t : x1 + (x0 - x1) * t;
    can.style.left = x + 'px';
    can.firstChild.style.transform = (side === 'right' ? 'scaleX(-1) ' : '') + 'rotate(' + (side === 'left' ? 25 : -25) + 'deg)';
    if (Math.random() < 0.35) {
      const d = prop(ICONS.drop, 1.8, x + (side === 'left' ? 30 : -30), y + 20);
      d.style.zIndex = 32;
      animate(d.firstChild, [{ transform: 'translateY(0)', opacity: 1 }, { transform: `translateY(${H() * 0.12}px)`, opacity: 0.2 }], { duration: 420, fill: 'both' }).then(() => d.remove());
    }
  }, ease.linear);
  can.remove();
  const t = Date.now();
  planted.forEach(i => {
    const sp = S.garden[i];
    if (!sp.wateredAt) sp.wateredAt = t;                                  // a seed starts to grow right away
    else if (t - (sp.lastWater || 0) > 60000) sp.boost = (sp.boost || 0) + growMs() * 0.12;   // a little faster
    sp.lastWater = t;
    const pt = spotPoint(i);
    sparkles(pt.x, pt.y - 20, 4, ['#9fdcff', '#ffffff', '#a6f08a']);
  });
  save();
  renderGarden();
  garden.watering = false;
  renderColumns();
};
ACT_HANDLERS.harvest = (side, btn) => {
  trickTouched[side] = now();
  const ripe = S.garden.map((sp, i) => (plantStage(sp) === 4 ? i : -1)).filter(i => i >= 0);
  if (!ripe.length) { nudge(btn); wiggleGarden(); return; }
  mood(pets[side], 'happy', 1600);
  ripe.forEach(i => pickSpot(i));
};
async function pickSpot(i) {
  const sp = S.garden[i];
  if (!sp || plantStage(sp) !== 4) return;
  S.garden[i] = null;
  S.fridge[sp.kind] = (S.fridge[sp.kind] || 0) + 2;              // two of each go in the fridge
  if (S.room !== 'kitchen' && !S.freshActs.includes('fridge')) S.freshActs.push('fridge');
  save();
  const pt = spotPoint(i);
  renderGarden(true);
  Sound.play('pop');
  sparkles(pt.x, pt.y - 30, 8);
  for (let n = 0; n < 2; n++) {
    const f = prop(ICONS[sp.kind], 8, pt.x, pt.y - 30);
    f.style.zIndex = 33;
    const m = $('#midbtns .mapbtn').getBoundingClientRect();
    setTimeout(() => arc(f, { x: pt.x, y: pt.y - 30 }, { x: m.left + m.width / 2, y: m.top + m.height / 2 }, 900, H() * 0.15)
      .then(() => animate(f.firstChild, [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(.2)', opacity: 0 }], { duration: 250, fill: 'both' }))
      .then(() => f.remove()), n * 200);
  }
  await wait(1300);
  showHint('fridge', FOODS[sp.kind].word);
}
function wiggleGarden() {
  animate(garden, [{ transform: 'translateX(-50%) rotate(0)' }, { transform: 'translateX(-50%) rotate(-2deg)' }, { transform: 'translateX(-50%) rotate(2deg)' }, { transform: 'translateX(-50%) rotate(0)' }], { duration: 400 });
}
// tapping a ripe plant picks it
garden.querySelectorAll('.gspot').forEach(sp => onPress(sp, () => {
  if (scene !== 'play') return;
  thingTapped('garden');
  const i = +sp.dataset.i;
  if (plantStage(S.garden[i]) === 4) pickSpot(i);
  else popIn(sp.querySelector('.plant'), 300);
}));

/* ---------- the backyard's buttons, new things, memory book ---------- */
ROOMS.backyard.acts.push('garden');
FEATURE_OF.garden = 'garden';
NEW_THINGS.push({ key: 'garden', order: 2, room: 'backyard', acts: ['garden'], icon: 'sprout', word: 'garden' });
Sound.add('plant', s => { s.noise(0, 0.25, { filter: 'lowpass', freq: 500, vol: 0.06 }); s.tone(s.NOTE(72 + s.k3()), 0.2, 0.3, { vol: 0.06, echo: 1 }); });
renderGarden(true);
