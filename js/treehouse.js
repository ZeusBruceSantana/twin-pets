'use strict';
/* Twin Pets: the treehouse, a new room beside the backyard. Fruit Catch (each pet holds a basket; fruit falls
   from the apple tree and nothing is ever lost) and the Weather Machine (mix sun, clouds, rain, snow and
   wind; some mixes make something special, and a little chart fills in as they find them). */

Object.assign(ICONS, {
  roomTree: '<svg viewBox="0 0 100 100"><rect x="40" y="52" width="20" height="42" rx="4" fill="#b07f4f"/><circle cx="50" cy="30" r="26" fill="#6cc551"/><circle cx="30" cy="44" r="18" fill="#58b043"/><circle cx="70" cy="44" r="18" fill="#58b043"/><rect x="26" y="50" width="48" height="22" rx="3" fill="#e8b071" stroke="#b07f4f" stroke-width="3"/><path d="M50 50 L26 50 L50 36 L74 50Z" fill="#ff8a7a" stroke="#d9604f" stroke-width="3" stroke-linejoin="round"/><rect x="44" y="56" width="12" height="16" rx="2" fill="#7a4a2a"/><circle cx="36" cy="22" r="4" fill="#ff5d5d"/><circle cx="62" cy="16" r="4" fill="#ff5d5d"/></svg>',
  catchBtn: '<svg viewBox="0 0 100 100"><path d="M10 52 H90 L80 90 H20Z" fill="#e8b071" stroke="#c98a3c" stroke-width="4" stroke-linejoin="round"/><path d="M30 52 L34 90 M50 52 V90 M70 52 L66 90" stroke="#c98a3c" stroke-width="3"/><circle cx="36" cy="44" r="11" fill="#ff5d5d"/><circle cx="58" cy="40" r="11" fill="#ffa24d"/><circle cx="48" cy="26" r="10" fill="#ff5d5d"/><path d="M48 16 l6 -8" stroke="#6cc551" stroke-width="4" stroke-linecap="round"/></svg>',
  weatherBtn: '<svg viewBox="0 0 100 100"><circle cx="64" cy="34" r="16" fill="#ffd23f"/><path d="M64 8 V14 M64 54 V60 M38 34 H44 M84 34 H90 M46 16 l4 4 M78 48 l4 4 M82 16 l-4 4" stroke="#ffd23f" stroke-width="4" stroke-linecap="round"/><path d="M20 78 a12 12 0 0 1 20 -8 a16 16 0 0 1 30 2 a11 11 0 0 1 2 22 H28 a11 11 0 0 1 -8 -16Z" fill="#fff" stroke="#9fb4cc" stroke-width="3"/><path d="M34 90 l-3 8 M48 90 l-3 8 M62 90 l-3 8" stroke="#5aa9ff" stroke-width="4" stroke-linecap="round"/></svg>',
  wxSun: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="22" fill="#ffd23f"/><path d="M50 10 V22 M50 78 V90 M10 50 H22 M78 50 H90 M22 22 l8 8 M70 70 l8 8 M78 22 l-8 8 M30 70 l-8 8" stroke="#ffb020" stroke-width="6" stroke-linecap="round"/></svg>',
  wxCloud: '<svg viewBox="0 0 100 100"><path d="M18 70 a16 16 0 0 1 16 -24 a22 22 0 0 1 42 4 a15 15 0 0 1 -2 20 Z" fill="#fff" stroke="#9fb4cc" stroke-width="4" stroke-linejoin="round"/></svg>',
  wxRain: '<svg viewBox="0 0 100 100"><path d="M18 50 a16 16 0 0 1 16 -22 a22 22 0 0 1 42 4 a15 15 0 0 1 -2 18 Z" fill="#cfd8e6" stroke="#8793a8" stroke-width="4" stroke-linejoin="round"/><path d="M30 62 l-5 14 M48 62 l-5 14 M66 62 l-5 14 M39 78 l-4 12 M57 78 l-4 12" stroke="#5aa9ff" stroke-width="5" stroke-linecap="round"/></svg>',
  wxSnow: '<svg viewBox="0 0 100 100"><g stroke="#7fc4ff" stroke-width="5" stroke-linecap="round"><path d="M50 14 V86 M19 32 L81 68 M81 32 L19 68"/><path d="M42 18 L50 26 L58 18 M42 82 L50 74 L58 82"/></g></svg>',
  wxWind: '<svg viewBox="0 0 100 100"><path d="M10 34 H58 C 72 34, 72 18, 60 18 M10 54 H78 C 94 54, 94 72, 80 72 M10 74 H40" stroke="#7fc4ff" stroke-width="6" fill="none" stroke-linecap="round"/></svg>',
});

/* ---------- the room ---------- */
ROOMS.treehouse = { word: 'treehouse', icon: 'roomTree', door: '#c8e0a0', acts: ['catch', 'weather'], feature: 'treehouse' };
ROOM_ORDER.push('treehouse');
const WX_ITEMS = { rainbow: ['rainbow', 'rainbow'], kite: ['kite', 'kite'], snowman: ['snowman', 'snowman'], flower: ['flower', 'flowers'] };
ROOM_MARKUP.treehouse = () => `<div class="sky bg"></div><div class="canopy"></div>
  <div class="wxlayer">
    <div class="wxsun">${ICONS.wxSun}</div><div class="wxcloud c1"></div><div class="wxcloud c2"></div>
    <div class="wxrain">${Array.from({ length: 26 }, (_, i) => `<i style="left:${(i * 37) % 100}%; animation-delay:${-(i * 0.37) % 1.6}s"></i>`).join('')}</div>
    <div class="wxsnow">${Array.from({ length: 22 }, (_, i) => `<i style="left:${(i * 53) % 100}%; animation-delay:${-(i * 0.9) % 7}s"></i>`).join('')}</div>
    <div class="wxwind"><i style="top:30%"></i><i style="top:46%; animation-delay:-.6s"></i><i style="top:60%; animation-delay:-1.1s"></i></div>
    <div class="wxrainbow"><svg viewBox="0 0 200 100" preserveAspectRatio="none"><g fill="none" stroke-width="9"><path d="M10 100 A90 90 0 0 1 190 100" stroke="#ff8a8a"/><path d="M20 100 A80 80 0 0 1 180 100" stroke="#ffd27a"/><path d="M30 100 A70 70 0 0 1 170 100" stroke="#9fe08a"/><path d="M40 100 A60 60 0 0 1 160 100" stroke="#8ac8ff"/><path d="M50 100 A50 50 0 0 1 150 100" stroke="#c9a6ff"/></g></svg></div>
    <div class="wxkite k1">${ITEM_ART.kite(COLORS[0])}</div><div class="wxkite k2">${ITEM_ART.kite(COLORS[4])}</div>
    <div class="wxsnowman">${ICONS.snowman}</div><div class="wxflowers">${[0, 1, 2, 3, 4].map(() => ICONS.flower).join('')}</div>
  </div>
  <div class="deck"></div><div class="deckrail"></div>
  <div class="wxchart">${Object.entries(WX_ITEMS).map(([k, [ic]]) => `<div class="slot" data-k="${k}"></div>`).join('')}</div>`;
NEW_THINGS.push({ key: 'treehouse', order: 25, requires: 'decor', room: 'treehouse', acts: ['catch', 'weather'], icon: 'roomTree', word: 'treehouse' });
Object.assign(BUTTONS, { catch: { icon: 'catchBtn', label: 'Catch' }, weather: { icon: 'weatherBtn', label: 'Weather' },
  catchl: { icon: 'prev', label: '' }, catchr: { icon: 'next', label: '' },
  wxsun: { icon: 'wxSun', label: 'Sun' }, wxcloud: { icon: 'wxCloud', label: 'Cloud' }, wxrain: { icon: 'wxRain', label: 'Rain' }, wxsnow: { icon: 'wxSnow', label: 'Snow' }, wxwind: { icon: 'wxWind', label: 'Wind' } });
Object.assign(BOOK_LINES, { fruitcatch: { line: 'caught fruit in the treehouse.', icon: 'catchBtn', rank: 96.6 }, weather: { line: 'made weather in the treehouse.', icon: 'weatherBtn', rank: 96.5 } });

/* ---------- the weather machine ---------- */
const wx = { sun: false, cloud: false, rain: false, snow: false, wind: false };
const WX_FOUND_WORD = { rainbow: 'rainbow', kite: 'kites', snowman: 'snowman', flower: 'flowers' };
const wxRoom = () => $('#rooms .room-treehouse');
function wxCombos() { return { rainbow: wx.sun && wx.rain, kite: wx.sun && wx.wind, snowman: wx.cloud && wx.snow, flower: wx.cloud && wx.rain }; }
function renderWxChart() {
  const room = wxRoom();
  if (!room) return;
  const found = S.wxFound || {};
  room.querySelectorAll('.wxchart .slot').forEach(sl => {
    const k = sl.dataset.k;
    if (!sl.firstChild) sl.innerHTML = k === 'kite' ? ITEM_ART.kite(COLORS[2]) : ICONS[WX_ITEMS[k][0]];
    sl.classList.toggle('found', !!found[k]);
  });
}
function applyWx() {
  const room = wxRoom();
  if (!room) return;
  Object.entries(wx).forEach(([k, v]) => room.classList.toggle('wx-' + k, v));
  const c = wxCombos();
  Object.entries(c).forEach(([k, v]) => room.classList.toggle('wxc-' + k, !!v));
  room.classList.toggle('wx-dark', wx.cloud || wx.rain || wx.snow);
  // a first find: a little celebration and a mark on the chart
  Object.entries(c).forEach(([k, v]) => {
    if (!v) return;
    S.wxFound = S.wxFound || {};
    if (S.wxFound[k]) return;
    S.wxFound[k] = true;
    save();
    renderWxChart();
    logDay('weather');
    Sound.play('wish');
    showHint(WX_ITEMS[k][0] === 'kite' ? 'wxWind' : WX_ITEMS[k][0], WX_FOUND_WORD[k], true);
    celebrate(W() / 2, H() * 0.4, 14);
    SIDES.forEach(s => floatHearts(pets[s], 2));
    if (Object.keys(WX_ITEMS).every(x => S.wxFound[x]) && !S.wxAll) {                 // found everything: a prize
      S.wxAll = true;
      S.puzzleOwed = (S.puzzleOwed || 0) + 1;
      save();
    }
  });
}
SIDE_MODES.weather = side => ({
  acts: ['wxsun', 'wxcloud', 'wxrain', 'wxsnow', 'wxwind', 'back'],
  clsOf: { wxsun: wx.sun ? 'on' : '', wxcloud: wx.cloud ? 'on' : '', wxrain: wx.rain ? 'on' : '', wxsnow: wx.snow ? 'on' : '', wxwind: wx.wind ? 'on' : '' },
});
ACT_HANDLERS.weather = side => { sideMode[side] = 'weather'; modeTouched[side] = now(); Sound.play('pick'); renderColumn(side); };
const WX_SOUND = { sun: 'chime', cloud: 'soft', rain: 'wxrain', snow: 'wxsnow', wind: 'wxwind' };
['sun', 'cloud', 'rain', 'snow', 'wind'].forEach(k => {
  ACT_HANDLERS['wx' + k] = side => {
    modeTouched[side] = now();
    wx[k] = !wx[k];
    if (k === 'snow' && wx.snow) wx.rain = false;                  // snow or rain, not both
    if (k === 'rain' && wx.rain) wx.snow = false;
    Sound.play(WX_SOUND[k]);
    applyWx();
    SIDES.forEach(renderColumn);
  };
});
ROOM_HOOKS.push(room => {
  if (room === 'treehouse') renderWxChart();
  else if (Object.values(wx).some(Boolean)) { Object.keys(wx).forEach(k => { wx[k] = false; }); applyWx(); SIDES.forEach(s => { if (sideMode[s] === 'weather') sideMode[s] = null; renderColumn(s); }); }
});
Sound.add('wxrain', s => { s.noise(0, 0.9, { filter: 'highpass', freq: 3500, vol: 0.05, attack: 0.2 }); });
Sound.add('wxsnow', s => { [88, 91, 95, 100].forEach((m, i) => s.tone(s.NOTE(m), i * 0.12, 0.4, { vol: 0.03, echo: 1 })); });
Sound.add('wxwind', s => { s.noise(0, 1.1, { filter: 'bandpass', freq: 700, to: 1800, q: 0.7, vol: 0.06, attack: 0.3 }); });

/* ---------- fruit catch ---------- */
const catchTaps = { left: -1e9, right: -1e9 };
const CATCH_NEED = 8;
const CATCH_FRUIT = ['apple', 'peach', 'strawberry', 'banana'];
const CATCH_RANGE = { left: [16, 44], right: [56, 84] };      // how far each pet can slide (% across)
ACT_HANDLERS.catch = side => {
  catchTaps[side] = now();
  Sound.play('pick');
  hopPet(side);
  if (now() - catchTaps[other(side)] < SETTINGS.doorWindowMs) { catchTaps.left = catchTaps.right = -1e9; startActivity('fruitcatch', side); }
  else invite(other(side), 'catch', SETTINGS.doorWindowMs);
};
ACTIVITIES.fruitcatch = {
  async start(a) {
    const d = a.data;
    d.n = { left: 0, right: 0 };
    d.target = { left: HOME.left.x, right: HOME.right.x };
    d.fruits = [];
    d.ptr = {};
    d.spawnAt = { left: now() + 800, right: now() + 1300 };
    d.field = actProp(a, '<div class="bubmeter l"></div><div class="bubmeter r"></div>', { inset: 0 }, 29);
    d.field.classList.add('bubfield');
    SIDES.forEach(s => {
      const b = el('div', 'catchbasket', '<svg viewBox="0 0 100 60"><path d="M6 8 H94 L84 56 H16Z" fill="#e8b071" stroke="#c98a3c" stroke-width="4" stroke-linejoin="round"/><path d="M6 8 H94" stroke="#c98a3c" stroke-width="7" stroke-linecap="round"/><path d="M28 8 L34 56 M50 8 V56 M72 8 L66 56" stroke="#c98a3c" stroke-width="3"/></svg>');
      pets[s].root.append(b);
      a.cleanup.push(() => b.remove());
    });
    const onDown = e => { if (act !== a) return; const s = e.clientX < W() / 2 ? 'left' : 'right'; d.ptr[e.pointerId] = s; d.target[s] = clampCatch(s, e.clientX / W() * 100); };
    const onMove = e => { const s = d.ptr[e.pointerId]; if (act === a && s) d.target[s] = clampCatch(s, e.clientX / W() * 100); };
    const onUp = e => { delete d.ptr[e.pointerId]; };
    stage.addEventListener('pointerdown', onDown); stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerup', onUp); stage.addEventListener('pointercancel', onUp);
    a.cleanup.push(() => { stage.removeEventListener('pointerdown', onDown); stage.removeEventListener('pointermove', onMove); stage.removeEventListener('pointerup', onUp); stage.removeEventListener('pointercancel', onUp); });
    renderCatchMeters(a);
    Sound.play('unlock');
    showHint('catchBtn', 'catch');
    d.last = now();
    const loop = () => { if (act !== a || a.ending) return; catchStep(a); d.raf = requestAnimationFrame(loop); };
    d.raf = requestAnimationFrame(loop);
    a.cleanup.push(() => { cancelAnimationFrame(d.raf); d.fruits.forEach(f => f.el.remove()); });
  },
  plan(a, side) { return { acts: ['catchl', 'catchr'], big: true, cls: a.data.n[side] >= CATCH_NEED ? 'done' : '' }; },
  press(a, side, key) { const d = a.data; d.target[side] = clampCatch(side, d.target[side] + (key === 'catchl' ? -9 : 9)); },
};
const clampCatch = (side, x) => Math.max(CATCH_RANGE[side][0], Math.min(CATCH_RANGE[side][1], x));
function renderCatchMeters(a) {
  const d = a.data;
  SIDES.forEach(s => {
    const m = d.field.querySelector('.bubmeter.' + (s === 'left' ? 'l' : 'r'));
    m.innerHTML = Array.from({ length: CATCH_NEED }, (_, i) => `<i class="${i < d.n[s] ? 'on' : ''}"></i>`).join('');
    m.style.setProperty('--c', (colorById(S.colors[s]) || COLORS[0]).main);
  });
}
function catchStep(a) {
  const d = a.data, t = now(), dt = Math.min(0.05, (t - d.last) / 1000);
  d.last = t;
  const vmin = Math.min(W(), H()) / 100;
  SIDES.forEach(s => {
    const p = pets[s];
    p.x += (d.target[s] - p.x) * Math.min(1, dt * 7);                                  // the pet slides under the fruit
    setPos(p, p.x, p.y);
    if (t > d.spawnAt[s] && d.fruits.filter(f => f.side === s).length < 3 && d.n[s] < CATCH_NEED) {
      d.spawnAt[s] = t + rand(900, 1500);
      const kind = pick(CATCH_FRUIT);
      const x = (rand(CATCH_RANGE[s][0] - 4, CATCH_RANGE[s][1] + 4)) / 100 * W();
      const e = prop(ICONS[kind], 7, x, H() * 0.16);
      e.style.zIndex = 30;
      d.fruits.push({ el: e, side: s, x, y: H() * 0.16, v: rand(24, 32) * vmin, caught: false });
    }
  });
  d.fruits = d.fruits.filter(f => {
    f.y += f.v * dt;
    f.el.style.top = f.y + 'px';
    const p = pets[f.side], head = petPoint(p, 0.5, 0.02), px = p.x / 100 * W();
    if (!f.caught && f.y >= head.y - 2 * vmin && f.y <= head.y + 4 * vmin && Math.abs(f.x - px) < 10 * vmin) {
      f.caught = true;
      d.n[f.side]++;
      renderCatchMeters(a);
      Sound.play('pick');
      sparkles(f.x, head.y, 5);
      mood(p, 'happy', 700);
      if (d.n[f.side] % 3 === 0) floatHearts(p, 1);
      animate(f.el, [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(.3)', opacity: 0 }], { duration: 250, fill: 'forwards' }).then(() => f.el.remove());
      if (d.n.left >= CATCH_NEED && d.n.right >= CATCH_NEED && !d.ending) finishCatch(a);
      return false;
    }
    if (f.y > H() * 0.9) {                                                              // a miss just bounces and fades: nothing is lost
      animate(f.el, [{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-8vmin)', opacity: 1, offset: .4 }, { transform: 'translateY(0)', opacity: 0 }], { duration: 600, fill: 'forwards' }).then(() => f.el.remove());
      return false;
    }
    return true;
  });
}
async function finishCatch(a) {
  const d = a.data;
  d.ending = true;
  a.busy = true;
  cancelAnimationFrame(d.raf);
  await wait(400);
  await Promise.all([movePet('left', 40, 12, 700), movePet('right', 60, 12, 700)]);
  const s = actProp(a, ICONS.smoothie, { left: '50%', bottom: '38%', width: '18vmin', height: '18vmin', transform: 'translateX(-50%)' }, 33);
  popIn(s);
  Sound.play('yay');
  celebrate(W() / 2, H() * 0.5, 22);
  SIDES.forEach(side => { floatHearts(pets[side], 4); mood(pets[side], 'happy', 2200); });
  await wait(2200);
  endActivity(true, 'fruitcatch');
}
