'use strict';
/* Twin Pets: the bathroom. Bath toys, brushing teeth, the blow dryer, spa day and the mirror. */

/* ---------- pictures ---------- */
Object.assign(ICONS, {
  toothbrush: '<svg viewBox="0 0 100 100"><rect x="10" y="56" width="62" height="13" rx="6.5" fill="#7fc4ff" stroke="#4a9be0" stroke-width="3" transform="rotate(-25 41 62)"/><g transform="rotate(-25 41 62)"><rect x="66" y="44" width="24" height="13" rx="3" fill="#fff" stroke="#9fb8cc" stroke-width="3"/><path d="M70 44 v-6 M76 44 v-6 M82 44 v-6 M88 44 v-6" stroke="#9fb8cc" stroke-width="3" stroke-linecap="round"/><path d="M66 36 C 70 26, 84 26, 90 34 C 84 40, 72 40, 66 36Z" fill="#c7f0ff" stroke="#6cc5e8" stroke-width="2"/></g></svg>',
  dryer: '<svg viewBox="0 0 100 100"><path d="M18 30 C 18 18, 30 12, 44 12 H66 C 76 12, 80 20, 80 30 C 80 40, 76 48, 66 48 H44 C 30 48, 18 42, 18 30Z" fill="#ffb3d9" stroke="#e07aa8" stroke-width="4"/><rect x="78" y="20" width="14" height="20" rx="4" fill="#e07aa8"/><path d="M40 46 L34 86 C 34 90, 46 92, 48 86 L54 48" fill="#ffb3d9" stroke="#e07aa8" stroke-width="4" stroke-linejoin="round"/><circle cx="36" cy="30" r="9" fill="#fff" stroke="#e07aa8" stroke-width="3"/></svg>',
  spa: '<svg viewBox="0 0 100 100"><rect x="34" y="40" width="34" height="46" rx="10" fill="#ff8fc4" stroke="#e0609c" stroke-width="4"/><rect x="41" y="16" width="20" height="26" rx="5" fill="#8b7fd1"/><ellipse cx="44" cy="58" rx="5" ry="9" fill="#fff" opacity=".55"/><path d="M80 14 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3z" fill="#ffd23f"/><path d="M20 30 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z" fill="#ffd23f"/></svg>',
  polish: '<svg viewBox="0 0 100 100"><rect x="32" y="42" width="36" height="46" rx="10" fill="#ff7ab0" stroke="#e0507f" stroke-width="4"/><rect x="40" y="14" width="20" height="30" rx="5" fill="#5d6676"/><ellipse cx="42" cy="60" rx="5" ry="9" fill="#fff" opacity=".55"/></svg>',
  spray: '<svg viewBox="0 0 100 100"><rect x="34" y="40" width="34" height="50" rx="10" fill="#c3a6ff" stroke="#8b7fd1" stroke-width="4"/><path d="M40 40 V28 H62 V40" fill="#fff" stroke="#8b7fd1" stroke-width="4"/><path d="M44 28 V20 H70 L66 28" fill="#8b7fd1"/><g fill="#ffd23f"><circle cx="82" cy="16" r="3"/><circle cx="88" cy="26" r="2.5"/><circle cx="80" cy="30" r="2"/></g><path d="M50 62 l2.5 6 l6 2.5 l-6 2.5 l-2.5 6 l-2.5 -6 l-6 -2.5 l6 -2.5z" fill="#fff"/></svg>',
  boat: '<svg viewBox="0 0 100 100"><path d="M10 62 H90 L76 84 H24Z" fill="#ff7a7a" stroke="#d94f5c" stroke-width="4" stroke-linejoin="round"/><path d="M50 14 V62" stroke="#b07f4f" stroke-width="5" stroke-linecap="round"/><path d="M53 18 L82 56 H53Z" fill="#fff" stroke="#9fb8cc" stroke-width="3" stroke-linejoin="round"/><path d="M47 26 L24 56 H47Z" fill="#ffe066" stroke="#e0b030" stroke-width="3" stroke-linejoin="round"/></svg>',
  squirt: '<svg viewBox="0 0 100 100"><path d="M18 56 C 30 36, 58 34, 72 52 C 58 72, 30 74, 18 56Z" fill="#ffa24d" stroke="#e07a2a" stroke-width="4"/><path d="M72 52 L90 38 V68Z" fill="#ffa24d" stroke="#e07a2a" stroke-width="4" stroke-linejoin="round"/><circle cx="32" cy="52" r="4" fill="#5d4037"/><g fill="#7fd1ff"><circle cx="12" cy="36" r="4"/><circle cx="8" cy="24" r="3"/><circle cx="16" cy="16" r="2.5"/></g></svg>',
  fizz: '<svg viewBox="0 0 100 100"><circle cx="50" cy="58" r="30" fill="#c9b3ff" stroke="#8b7fd1" stroke-width="4"/><path d="M26 50 C 40 58, 60 44, 76 54" stroke="#ff9ec4" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M28 70 C 42 76, 60 64, 74 70" stroke="#a6f08a" stroke-width="6" fill="none" stroke-linecap="round"/><g fill="#fff" stroke="#9fb8cc" stroke-width="2"><circle cx="30" cy="20" r="6"/><circle cx="52" cy="12" r="4"/><circle cx="70" cy="22" r="5"/></g></svg>',
  mirror: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="34" ry="42" fill="#dff4fb" stroke="#e8b84a" stroke-width="7"/><path d="M34 30 L46 20 M36 44 L58 24" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>',
});

/* =====================================================================
   BATH TOYS: a boat, a squirty fish and fizzies that change the water color
   While her pet is in the bath, a girl's buttons become the bath toys.
   ===================================================================== */
Object.assign(BUTTONS, {
  boat:   { icon: 'boat',       label: 'Boat' },
  squirt: { icon: 'squirt',     label: 'Squirt' },
  fizz:   { icon: 'fizz',       label: 'Fizzy' },
  teeth:  { icon: 'toothbrush', label: 'Teeth' },
  dryer:  { icon: 'dryer',      label: 'Dryer' },
  spa:    { icon: 'spa',        label: 'Spa' },
});
SIDE_MODES.bath = side => ({ acts: [bathAct(side), 'boat', 'squirt', 'fizz'] });
const tubSpot = side => {     // the water line of the tub, in screen pixels
  const r = bath[side].tub.getBoundingClientRect();
  return { left: r.left, right: r.right, y: r.top + r.height * 0.1, w: r.width };
};
ACT_HANDLERS.boat = async side => {
  const b = bath[side];
  if (!b || b.busy || b.sailing) return;
  b.sailing = true;
  Sound.play('toot');
  const t = tubSpot(side);
  if (!b.boat) {
    b.boat = el('div', 'tubtoy', ICONS.boat);
    world.append(b.boat);
    b.bubbles.push(b.boat);
  }
  const boat = b.boat, x0 = t.left + t.w * 0.12, x1 = t.right - t.w * 0.12;
  boat.style.top = t.y - H() * 0.03 + 'px';
  await tween(1300, k => { boat.style.left = x0 + (x1 - x0) * k + 'px'; });
  boat.firstChild.style.transform = 'scaleX(-1)';
  await tween(1300, k => { boat.style.left = x1 + (x0 - x1) * k + 'px'; });
  boat.firstChild.style.transform = '';
  b.sailing = false;
};
ACT_HANDLERS.squirt = async side => {
  const b = bath[side], p = pets[side];
  if (!b || b.busy || b.squirting) return;
  b.squirting = true;
  const t = tubSpot(side), outer = side === 'left' ? t.left + t.w * 0.08 : t.right - t.w * 0.08;
  const fish = el('div', 'tubtoy', ICONS.squirt);
  if (side === 'left') fish.firstChild.style.transform = 'scaleX(-1)';
  Object.assign(fish.style, { left: outer + 'px', top: t.y - H() * 0.02 + 'px' });
  world.append(fish);
  b.bubbles.push(fish);
  await popIn(fish);
  Sound.play('squirt');
  const head = petPoint(p, 0.5, 0.22);
  const drops = [];
  for (let i = 0; i < 6; i++) {
    const d = prop('<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="#9fdcff" stroke="#fff" stroke-width="2"/></svg>', 2.4, outer, t.y);
    d.style.zIndex = 33;
    drops.push(d);
    setTimeout(() => arc(d, { x: outer, y: t.y - H() * 0.03 }, { x: head.x + rand(-20, 20), y: head.y + rand(-10, 10) }, 650, H() * 0.16).then(() => d.remove()), i * 70);
  }
  await wait(750);
  begin(p, 1400);
  p.root.classList.add('asleep-eyes');
  Sound.play('giggle');
  petAnim(p, [{ transform: 'rotate(0)' }, { transform: 'rotate(-7deg)' }, { transform: 'rotate(7deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(0)' }], { duration: 700 });
  sparkles(head.x, head.y, 6, ['#9fdcff', '#ffffff', '#c9ecff']);
  await wait(700);
  p.root.classList.remove('asleep-eyes');
  mood(p, 'happy', 1300);
  await animate(fish, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
  fish.remove();
  b.squirting = false;
};
const FIZZ_COLORS = ['#ffb3d9', '#c9b3ff', '#b3f0c0', '#ffe39a', '#a6dcff'];
ACT_HANDLERS.fizz = async side => {
  const b = bath[side];
  if (!b || b.busy || b.fizzing) return;
  b.fizzing = true;
  const t = tubSpot(side), cx = (t.left + t.right) / 2 + (side === 'left' ? 1 : -1) * t.w * 0.3;
  const ball = prop(ICONS.fizz, 6, cx, t.y - H() * 0.3);
  ball.style.zIndex = 33;
  await arc(ball, { x: cx, y: t.y - H() * 0.32 }, { x: cx, y: t.y }, 500, 0, 180);
  ball.remove();
  Sound.play('fizz');
  b.fizz = ((b.fizz == null ? -1 : b.fizz) + 1) % FIZZ_COLORS.length;
  const color = FIZZ_COLORS[b.fizz];
  b.tub.querySelector('.water').style.fill = color;
  b.bubbles.forEach(f => { if (f.classList.contains('foamball')) f.style.background = `radial-gradient(circle at 35% 35%, #fff 0 35%, ${color} 90%)`; });
  for (let i = 0; i < 10; i++) {
    const s = prop('<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" fill="#fff" opacity=".8" stroke="' + color + '" stroke-width="3"/></svg>', rand(1.6, 3), cx + rand(-30, 30), t.y);
    s.style.zIndex = 13;
    animate(s.firstChild, [{ transform: 'translateY(0) scale(.4)', opacity: 1 }, { transform: `translate(${rand(-3, 3)}vmin, -${rand(8, 16)}vmin) scale(1)`, opacity: 0 }],
      { duration: rand(700, 1200), delay: i * 60, easing: 'ease-out', fill: 'both' }).then(() => s.remove());
  }
  mood(pets[side], 'happy', 1200);
  await wait(500);
  b.fizzing = false;
};

/* =====================================================================
   BRUSH TEETH: a sparkly smile
   ===================================================================== */
WISHES.teeth = { icon: 'toothbrush', act: 'teeth', feature: 'teeth' };
ACT_HANDLERS.teeth = async side => {
  const p = pets[side];
  if (p.asleep || bath[side]) { nudge(cols[side].querySelector('.btn-teeth')); return; }
  const alive = begin(p, 2600);
  grantWish(p, 'teeth');
  p.root.classList.add('chomp');                         // "ahh"
  const m = petPoint(p, 0.5, 0.58);
  const tb = prop(ICONS.toothbrush, 10, m.x, m.y);
  tb.dataset.owner = side;
  tb.style.zIndex = 14;
  Sound.play('teeth');
  await tween(1300, t => {
    tb.style.left = m.x + Math.sin(t * Math.PI * 8) * petSize() * 0.07 + 'px';
    if (Math.random() < 0.08) sparkles(m.x + rand(-20, 20), m.y + rand(-6, 10), 1, ['#ffffff', '#e8f8ff']);
  }, ease.linear);
  tb.remove();
  p.root.classList.remove('chomp');
  if (!alive()) return;
  // a sparkly smile
  mood(p, 'happy', 2400);
  Sound.play('ding');
  const ding = prop(ICONS.star, 8, m.x + petSize() * 0.09, m.y - petSize() * 0.03);
  ding.dataset.owner = side;
  ding.style.color = '#fff8c8'; ding.style.zIndex = 31;
  ding.style.filter = 'drop-shadow(0 0 1vmin #fff)';
  sparkles(m.x, m.y, 8, ['#ffffff', '#fff6c8', '#bfe9ff']);
  await animate(ding.firstChild, [{ transform: 'scale(0) rotate(0)' }, { transform: 'scale(1.3) rotate(90deg)', offset: 0.3 }, { transform: 'scale(1) rotate(140deg)', offset: 0.7 }, { transform: 'scale(0) rotate(200deg)' }], { duration: 1500, fill: 'both' });
  ding.remove();
};

/* =====================================================================
   THE BLOW DRYER: the fur poofs up big and funny, then settles
   ===================================================================== */
function poofSvg(side) {
  const [fill, stroke] = PET_ART[side].awake ? ['#ffffff', '#d9d3e6'] : side === 'left' ? ['#eef1f6', '#8b94a3'] : ['#fffaf3', '#cbb9a8'];
  let puffs = '';
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    puffs += `<circle cx="${100 + Math.cos(a) * 78}" cy="${108 + Math.sin(a) * 84}" r="${i % 2 ? 22 : 18}"/>`;
  }
  return `<svg viewBox="0 0 200 200"><g fill="${fill}" stroke="${stroke}" stroke-width="3">${puffs}</g><ellipse cx="100" cy="108" rx="80" ry="86" fill="${fill}"/></svg>`;
}
ACT_HANDLERS.dryer = async side => {
  const p = pets[side];
  if (p.asleep || bath[side]) { nudge(cols[side].querySelector('.btn-dryer')); return; }
  const alive = begin(p, 4200);
  const out = side === 'left' ? -1 : 1;                   // the dryer comes from her own edge
  const at = petPoint(p, side === 'left' ? 0.02 : 0.98, 0.4);
  const dr = prop(ICONS.dryer, 13, at.x + out * petSize() * 0.12, at.y);
  dr.dataset.owner = side;
  dr.style.zIndex = 14;
  if (side === 'left') dr.firstChild.style.transform = 'scaleX(-1)';
  Sound.play('dryer');
  await popIn(dr.firstChild);
  for (let i = 0; i < 5; i++) {                          // warm air
    const w = prop('<svg viewBox="0 0 40 20"><path d="M2 10 C 8 2, 14 18, 20 10 C 26 2, 32 18, 38 10" fill="none" stroke="#ffb3d9" stroke-width="3.5" stroke-linecap="round"/></svg>', 7, at.x, at.y + rand(-20, 20));
    w.dataset.owner = side;
    w.style.zIndex = 13;
    animate(w.firstChild, [{ transform: `translateX(${out * 6}vmin) scale(.6)`, opacity: 0 }, { transform: `translateX(${-out * 4}vmin) scale(1)`, opacity: 1 }],
      { duration: 500, delay: i * 140, fill: 'both' }).then(() => w.remove());
  }
  await wait(900);
  if (!alive()) return;
  dr.remove();
  // POOF!
  const poof = el('div', 'poof', poofSvg(side));
  p.art.prepend(poof);
  p.root.classList.add('poofy', 'chomp');
  Sound.play('poof');
  await animate(poof, [{ transform: 'scale(.55)' }, { transform: 'scale(1.32)', offset: 0.6 }, { transform: 'scale(1.22)' }], { duration: 420, easing: 'ease-out', fill: 'forwards' });
  petAnim(p, [{ transform: 'scale(1,1)' }, { transform: 'scale(1.08,1.04)' }, { transform: 'scale(1,1)' }], { duration: 420 });
  animate(poof, [{ transform: 'scale(1.22) rotate(0)' }, { transform: 'scale(1.26) rotate(-3deg)' }, { transform: 'scale(1.22) rotate(3deg)' }, { transform: 'scale(1.22) rotate(0)' }], { duration: 500, iterations: 3 });
  await wait(700);
  p.root.classList.remove('chomp');
  mood(p, 'happy', 1500);
  await wait(900);
  // ...and it settles back down
  Sound.play('settle');
  await animate(poof, [{ transform: 'scale(1.22)', opacity: 1 }, { transform: 'scale(.9)', opacity: 1, offset: 0.7 }, { transform: 'scale(.8)', opacity: 0 }], { duration: 800, easing: 'ease-in', fill: 'forwards' });
  poof.remove();
  p.root.classList.remove('poofy');
  petAnim(p, [{ transform: 'scale(1,1)' }, { transform: 'scale(1.05,.95)' }, { transform: 'scale(1,1)' }], { duration: 350 });
  floatHearts(p, 2);
};

/* =====================================================================
   SPA DAY: each girl pampers her sister's pet
   Paw polish and a bow in her own color, and sparkle spray. They last
   for the rest of the day.
   ===================================================================== */
const SPA = {
  polish:  { icon: 'polish', word: 'polish' },
  bow:     { word: 'bow' },
  sparkle: { icon: 'spray',  word: 'sparkle' },
};
const spaToday = side => {
  const spa = S.pets[side].spa || {};
  return spa.day === todayKey() ? spa : { day: todayKey() };
};
const colorVar = giver => (giver === 'left' ? 'var(--L)' : 'var(--R)');
const SPA_BOW_AT = { left: [168, 104], right: [173, 112] };   // the tip of each tail
function renderSpa(side) {
  const p = pets[side], spa = S.pets[side].spa || {};
  p.art.querySelectorAll('.spa').forEach(e => e.remove());
  p.root.classList.remove('sparkly');
  if (spa.day !== todayKey()) return;
  let svg = '';
  if (spa.polish) svg += [69, 78, 87, 113, 122, 131].map(x => `<ellipse cx="${x}" cy="194" rx="3.8" ry="3.2" style="fill:${colorVar(spa.polish)}" stroke="#fff" stroke-width="1.2"/>`).join('');
  if (spa.bow) {
    const [x, y] = SPA_BOW_AT[side];
    svg += `<g transform="translate(${x} ${y}) rotate(-15)"><path d="M0 0 C -7 -12, -19 -11, -18 0 C -19 11, -7 12, 0 0Z M0 0 C 7 -12, 19 -11, 18 0 C 19 11, 7 12, 0 0Z" style="fill:${colorVar(spa.bow)}" stroke="#fff" stroke-width="2"/><circle r="4.5" fill="#fff"/></g>`;
  }
  if (svg) p.art.append(el('div', 'spa', `<svg viewBox="0 0 200 200">${svg}</svg>`));
  if (spa.sparkle) p.root.classList.add('sparkly');
}
DRESS_HOOKS.push(renderSpa);
ACT_HANDLERS.spa = side => {
  const o = other(side);
  if (pets[o].asleep || bath[o]) { nudge(cols[side].querySelector('.btn-spa')); return; }
  openPanel(side, {
    head: o,
    items: Object.entries(SPA).map(([k, v]) => ({ key: k, icon: k === 'bow' ? ITEM_ART.bow(colorById(S.colors[side]) || COLORS[0]) : ICONS[v.icon], word: v.word })),
    onPick: key => pamper(side, key),
  });
};
async function pamper(side, key) {
  const o = other(side), pt = pets[o], pf = pets[side];
  if (!canAct() || pt.asleep || bath[o]) return;
  const alive = begin(pt, 2600);
  mood(pf, 'happy', 1500);
  const spa = spaToday(o);
  if (key === 'polish') {
    const tool = prop(ICONS.polish, 7, 0, 0);
    tool.dataset.owner = o;
    tool.style.zIndex = 33;
    for (const fx of [0.39, 0.61]) {
      const paw = petPoint(pt, fx, 0.9);
      tool.style.left = paw.x + 'px'; tool.style.top = paw.y - petSize() * 0.08 + 'px';
      Sound.play('dab');
      await animate(tool.firstChild, [{ transform: 'translateY(0)' }, { transform: 'translateY(30%)' }, { transform: 'translateY(0)' }], { duration: 380 });
      sparkles(paw.x, paw.y + petSize() * 0.03, 4);
    }
    tool.remove();
    spa.polish = side;
  } else if (key === 'bow') {
    const from = petPoint(pf, 0.5, 0.4), [x, y] = SPA_BOW_AT[o], to = petPoint(pt, x / 200, y / 200);
    const bow = prop(ITEM_ART.bow(colorById(S.colors[side]) || COLORS[0]), 7, from.x, from.y);
    bow.dataset.owner = o;
    bow.style.zIndex = 33;
    Sound.play('toss');
    await arc(bow, from, to, 800, H() * 0.2, side === 'left' ? 360 : -360);
    bow.remove();
    Sound.play('ding');
    sparkles(to.x, to.y, 6);
    spa.bow = side;
  } else {
    const at = petPoint(pt, o === 'left' ? 0.95 : 0.05, 0.35);
    const can = prop(ICONS.spray, 9, at.x, at.y);
    can.dataset.owner = o;
    can.style.zIndex = 33;
    if (o === 'left') can.firstChild.style.transform = 'scaleX(-1)';
    for (let i = 0; i < 2; i++) {
      Sound.play('spray');
      const m = petPoint(pt, 0.5 + rand(-0.15, 0.15), 0.45 + rand(-0.1, 0.15));
      sparkles(m.x, m.y, 10, ['#ffd23f', '#ffffff', '#ff9ec4', '#c3a6ff']);
      await wait(450);
    }
    can.remove();
    spa.sparkle = true;
  }
  S.pets[o].spa = spa;
  save();
  renderSpa(o);
  if (!alive()) return;
  mood(pt, 'happy', 2200);
  floatHearts(pt, 3);
  petAnim(pt, [{ transform: 'translateY(0)' }, { transform: 'translateY(-7%)' }, { transform: 'translateY(0)' }], { duration: 420, easing: 'ease-out' });
  sayBubble(pt, 'Thank you, ' + SETTINGS.players[side].girl + '!', 2400);
  togetherMoment('spa');
}
COOLDOWN.spa = 30000;

/* =====================================================================
   THE MIRROR: tap a reflection and that pet makes a funny face
   ===================================================================== */
const mirror = roomThing('mirror', 'bathroom', 'mirror',
  `<svg class="frame" viewBox="0 0 100 120"><ellipse cx="50" cy="60" rx="46" ry="56" fill="#ffe7a8" stroke="#e8b84a" stroke-width="5"/>
    <ellipse cx="50" cy="60" rx="38" ry="48" fill="#dff4fb" stroke="#fff" stroke-width="2"/>
    <path d="M24 38 L40 24 M26 54 L54 28" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/></svg>
   <div class="mhalf l"><div class="mface"></div></div><div class="mhalf r"><div class="mface"></div></div>`,
  { left: '50%', top: '38%', width: '21vmin', height: '25vmin' });
const FUNNY_FACES = [
  { cls: 'happy', sound: 'squish',  frames: [{ transform: 'scale(1,1)' }, { transform: 'scale(1.3,.7)', offset: 0.25 }, { transform: 'scale(1.3,.7)', offset: 0.75 }, { transform: 'scale(1,1)' }] },
  { cls: 'chomp', sound: 'stretch', frames: [{ transform: 'scale(1,1)' }, { transform: 'scale(.78,1.28)', offset: 0.25 }, { transform: 'scale(.78,1.28)', offset: 0.75 }, { transform: 'scale(1,1)' }] },
  { cls: 'happy', sound: 'wobble',  frames: [{ transform: 'rotate(0)' }, { transform: 'rotate(-14deg)' }, { transform: 'rotate(14deg)' }, { transform: 'rotate(-14deg)' }, { transform: 'rotate(14deg)' }, { transform: 'rotate(0)' }] },
  { cls: 'chomp', sound: 'boing',   frames: [{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(-14%) scale(1.15)', offset: 0.3 }, { transform: 'translateY(0) scale(.92,1.08)', offset: 0.6 }, { transform: 'translateY(0) scale(1)' }] },
];
const funnyNext = { left: 0, right: 0 };
function funnyFace(side) {
  if (scene !== 'play') return;
  thingTapped('mirror');
  const p = pets[side];
  if (p.asleep) wakePet(side, true);
  const f = FUNNY_FACES[funnyNext[side]++ % FUNNY_FACES.length];
  const face = mirror.querySelector('.mhalf.' + side[0] + ' .mface');
  Sound.play(f.sound);
  face.classList.add(f.cls);
  animate(face.firstChild, f.frames, { duration: 1100, easing: 'ease-in-out' }).then(() => face.classList.remove(f.cls));
  begin(p, 1300);
  mood(p, f.cls, 1150);
  petAnim(p, f.frames, { duration: 1100, easing: 'ease-in-out' });
  setTimeout(() => Sound.play('giggle'), 1000);
}
fillFace(mirror.querySelector('.mhalf.l .mface'), 'left');
fillFace(mirror.querySelector('.mhalf.r .mface'), 'right');
SIDES.forEach(s => onPress(mirror.querySelector('.mhalf.' + s[0]), () => funnyFace(s)));

/* ---------- the bathroom's buttons, new things, memory book ---------- */
ROOMS.bathroom.acts = ['bath', 'teeth', 'brush', 'dryer', 'spa'];
FEATURE_OF.teeth = 'teeth';
FEATURE_OF.dryer = 'dryer';
FEATURE_OF.spa = 'spa';
NEW_THINGS.push(
  { key: 'teeth',    order: 4,  room: 'bathroom', acts: ['teeth'], icon: 'toothbrush', word: 'teeth' },
  { key: 'mirror',   order: 6,  room: 'bathroom', acts: [],        icon: 'mirror',     word: 'mirror' },
  { key: 'bathtoys', order: 10, room: 'bathroom', acts: ['bath'],  icon: 'boat',       word: 'bath toys' },
  { key: 'dryer',    order: 12, room: 'bathroom', acts: ['dryer'], icon: 'dryer',      word: 'dryer' },
  { key: 'spa',      order: 13, room: 'bathroom', acts: ['spa'],   icon: 'spa',        word: 'spa day' },
);
Object.assign(BOOK_LINES, {
  spa: { line: 'had a spa day.', icon: 'spa', rank: 90 },
});

/* ---------- bathroom sounds ---------- */
Sound.add('toot', s => { s.tone(s.NOTE(55), 0, 0.3, { type: 'triangle', vol: 0.09 }); s.tone(s.NOTE(55), 0.36, 0.5, { type: 'triangle', vol: 0.09 }); });
Sound.add('squirt', s => { s.noise(0, 0.35, { filter: 'highpass', freq: 2500, to: 1200, vol: 0.04 }); });
Sound.add('giggle', s => { const k = s.k3(); [79, 76, 81, 77, 83].forEach((m, i) => s.tone(s.NOTE(m + k), i * 0.08, 0.1, { type: 'triangle', vol: 0.06 })); });
Sound.add('fizz', s => { s.noise(0, 1.1, { filter: 'highpass', freq: 4000, vol: 0.025, attack: 0.05 }); for (let i = 0; i < 6; i++) s.tone(s.NOTE(84 + i * 2), 0.1 + i * 0.12, 0.08, { vol: 0.03 }); });
Sound.add('teeth', s => { for (let i = 0; i < 8; i++) s.noise(i * 0.16, 0.12, { freq: 3000, to: 2200, q: 2, vol: 0.03 }); });
Sound.add('ding', s => { s.tone(s.NOTE(96), 0, 0.8, { vol: 0.07, echo: 1 }); s.tone(s.NOTE(103), 0.08, 0.9, { vol: 0.05, echo: 1 }); });
Sound.add('dryer', s => { s.noise(0, 1.3, { filter: 'lowpass', freq: 900, vol: 0.05, attack: 0.15 }); s.tone(180, 0, 1.3, { type: 'triangle', vol: 0.02, attack: 0.15 }); });
Sound.add('poof', s => { s.tone(s.NOTE(55), 0, 0.35, { to: s.NOTE(79), vol: 0.1 }); s.noise(0, 0.25, { freq: 900, vol: 0.04 }); });
Sound.add('settle', s => { s.tone(s.NOTE(84), 0, 0.7, { to: s.NOTE(60), type: 'triangle', vol: 0.06 }); });
Sound.add('dab', s => { s.tone(s.NOTE(76 + s.k3()), 0, 0.12, { vol: 0.06 }); });
Sound.add('spray', s => { s.noise(0, 0.3, { filter: 'highpass', freq: 5000, vol: 0.04 }); });
Sound.add('squish', s => { s.tone(s.NOTE(67), 0, 0.4, { to: s.NOTE(55), type: 'triangle', vol: 0.08 }); });
Sound.add('stretch', s => { s.tone(s.NOTE(60), 0, 0.4, { to: s.NOTE(79), type: 'triangle', vol: 0.08 }); });
Sound.add('wobble', s => { for (let i = 0; i < 4; i++) s.tone(s.NOTE(i % 2 ? 72 : 67), i * 0.18, 0.16, { type: 'triangle', vol: 0.07 }); });
Sound.add('boing', s => { s.tone(s.NOTE(55), 0, 0.5, { to: s.NOTE(74), glide: 0.15, vol: 0.09 }); });
