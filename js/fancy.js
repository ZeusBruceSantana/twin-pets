'use strict';
/* Twin Pets: the fancy restaurant gets fancier. Food that is only served here (the waiter carries it
   in under a silver lid), a napkin, and a high tea party with a tiered stand of treats. */

Object.assign(ICONS, {
  soup: '<svg viewBox="0 0 100 100"><path d="M12 52 H88 C 88 76, 70 88, 50 88 C 30 88, 12 76, 12 52Z" fill="#fff" stroke="#c9c3d3" stroke-width="4"/><ellipse cx="50" cy="52" rx="38" ry="10" fill="#ff9a4d"/><circle cx="40" cy="52" r="3" fill="#ffd23f"/><path d="M52 50 l8 -4 l4 5z" fill="#6cc551"/><path d="M36 38 q-4 -8 2 -14 M52 38 q-4 -8 2 -14 M66 38 q-4 -8 2 -14" stroke="#c9d2e0" stroke-width="3" fill="none" stroke-linecap="round"/></svg>',
  salad: '<svg viewBox="0 0 100 100"><path d="M14 50 H86 C 86 74, 68 86, 50 86 C 32 86, 14 74, 14 50Z" fill="#fff" stroke="#c9c3d3" stroke-width="4"/><circle cx="30" cy="46" r="14" fill="#6cc551"/><circle cx="52" cy="40" r="16" fill="#8fd16a"/><circle cx="72" cy="46" r="13" fill="#6cc551"/><circle cx="42" cy="36" r="6" fill="#ff5d5d"/><circle cx="62" cy="38" r="5" fill="#ff5d5d"/><path d="M44 52 l10 4 l-4 6z" fill="#ffd23f"/></svg>',
  sushi: '<svg viewBox="0 0 100 100"><rect x="8" y="60" width="84" height="12" rx="4" fill="#c99a6b"/><rect x="14" y="38" width="22" height="24" rx="6" fill="#fff" stroke="#e0dcd4" stroke-width="2"/><path d="M12 42 C 22 28, 34 30, 38 42 C 30 48, 20 48, 12 42Z" fill="#ff8a7a"/><rect x="40" y="38" width="22" height="24" rx="6" fill="#fff" stroke="#e0dcd4" stroke-width="2"/><path d="M38 42 C 48 28, 60 30, 64 42 C 56 48, 46 48, 38 42Z" fill="#ffb347"/><circle cx="78" cy="50" r="13" fill="#2b2f3a"/><circle cx="78" cy="50" r="9" fill="#fff"/><circle cx="78" cy="50" r="4" fill="#ff8a7a"/></svg>',
  spaghetti: '<svg viewBox="0 0 100 100"><path d="M18 58 C 18 38, 82 38, 82 58 C 82 72, 66 76, 50 76 C 34 76, 18 72, 18 58Z" fill="#ffe3a0" stroke="#e0b860" stroke-width="3"/><path d="M26 56 C 34 46, 44 64, 52 52 C 60 42, 70 60, 76 52 M30 64 C 40 56, 48 70, 58 60 C 64 54, 70 64, 72 60" stroke="#f3c26a" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="50" cy="46" r="9" fill="#c0392b"/><path d="M48 38 l6 -6 l4 6" fill="#6cc551"/></svg>',
  tacos: '<svg viewBox="0 0 100 100"><path d="M6 76 C 6 38, 50 38, 50 76Z" fill="#ffd27a" stroke="#d9a23a" stroke-width="3"/><path d="M12 70 C 14 52, 32 48, 42 56 C 32 60, 24 62, 18 70Z" fill="#6cc551"/><circle cx="30" cy="54" r="4" fill="#ff5d5d"/><path d="M50 76 C 50 38, 94 38, 94 76Z" fill="#ffd27a" stroke="#d9a23a" stroke-width="3"/><path d="M56 70 C 58 52, 76 48, 86 56 C 76 60, 68 62, 62 70Z" fill="#6cc551"/><circle cx="72" cy="54" r="4" fill="#ffd23f"/></svg>',
  crepes: '<svg viewBox="0 0 100 100"><path d="M10 72 C 10 42, 60 32, 90 58 C 70 80, 30 86, 10 72Z" fill="#f7d9a8" stroke="#d9b070" stroke-width="3"/><path d="M26 68 C 40 52, 64 48, 82 58" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="40" cy="54" r="7" fill="#ff4f6d"/><circle cx="56" cy="52" r="6" fill="#ff4f6d"/><path d="M34 64 q8 -4 14 0 t14 0" stroke="#7a4a2a" stroke-width="3" fill="none" stroke-linecap="round"/></svg>',
  macarons: '<svg viewBox="0 0 100 100"><ellipse cx="34" cy="74" rx="24" ry="9" fill="#ffb3c8"/><rect x="10" y="66" width="48" height="8" fill="#fff"/><ellipse cx="34" cy="64" rx="24" ry="9" fill="#ffb3c8"/><ellipse cx="68" cy="56" rx="22" ry="8" fill="#a6e0c8"/><rect x="46" y="49" width="44" height="7" fill="#fff"/><ellipse cx="68" cy="48" rx="22" ry="8" fill="#a6e0c8"/><ellipse cx="46" cy="40" rx="18" ry="7" fill="#c3a6ff"/><rect x="28" y="34" width="36" height="6" fill="#fff"/><ellipse cx="46" cy="32" rx="18" ry="7" fill="#c3a6ff"/></svg>',
  tart: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="68" rx="42" ry="14" fill="#e8b071"/><ellipse cx="50" cy="60" rx="42" ry="16" fill="#fff4dd" stroke="#e8b071" stroke-width="3"/><circle cx="34" cy="58" r="7" fill="#ff4f6d"/><circle cx="52" cy="54" r="7" fill="#ffa24d"/><circle cx="66" cy="60" r="7" fill="#a77bff"/><circle cx="46" cy="64" r="6" fill="#6cc551"/><circle cx="58" cy="66" r="5" fill="#ff4f6d"/></svg>',
  sundae: '<svg viewBox="0 0 100 100"><path d="M26 50 H74 C 74 68, 62 76, 50 76 C 38 76, 26 68, 26 50Z" fill="#dff4fb" stroke="#9fb8cc" stroke-width="3"/><path d="M50 76 V90 M36 92 H64" stroke="#9fb8cc" stroke-width="5" stroke-linecap="round"/><circle cx="38" cy="44" r="12" fill="#ffc0d6"/><circle cx="62" cy="44" r="12" fill="#8a5a3c"/><circle cx="50" cy="34" r="12" fill="#fff4e0"/><path d="M38 30 q12 8 24 0" stroke="#7a4a2a" stroke-width="4" fill="none"/><circle cx="50" cy="22" r="5" fill="#ff3b5c"/></svg>',
  napkin: '<svg viewBox="0 0 100 60"><path d="M10 6 H90 L80 54 H20Z" fill="#fff" stroke="#d9d4cc" stroke-width="3" stroke-linejoin="round"/><path d="M30 18 H70 M34 30 H66" stroke="#ffd9e8" stroke-width="4" stroke-linecap="round"/></svg>',
  teastand: '<svg viewBox="0 0 100 100"><path d="M50 18 V88 M30 90 H70" stroke="#d9a93a" stroke-width="5" stroke-linecap="round"/><ellipse cx="50" cy="78" rx="40" ry="8" fill="#fff" stroke="#d9a93a" stroke-width="3"/><ellipse cx="50" cy="52" rx="30" ry="7" fill="#fff" stroke="#d9a93a" stroke-width="3"/><ellipse cx="50" cy="28" rx="20" ry="6" fill="#fff" stroke="#d9a93a" stroke-width="3"/><circle cx="26" cy="72" r="6" fill="#ffb3c8"/><circle cx="46" cy="70" r="6" fill="#a6e0c8"/><circle cx="68" cy="72" r="6" fill="#c3a6ff"/><rect x="32" y="42" width="10" height="9" rx="2" fill="#f7d9a8"/><rect x="52" y="42" width="10" height="9" rx="2" fill="#ffd23f"/><circle cx="50" cy="21" r="5" fill="#ff4f6d"/></svg>',
  teacup: '<svg viewBox="0 0 100 100"><path d="M18 40 H74 V58 C 74 76, 60 84, 46 84 C 32 84, 18 76, 18 58Z" fill="#fff" stroke="#d9a0c0" stroke-width="4" stroke-linejoin="round"/><path d="M74 46 C 90 44, 90 66, 72 66" stroke="#d9a0c0" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="46" cy="40" rx="28" ry="6" fill="#c98a5a" class="teasurface"/><path d="M22 52 H70" stroke="#ffd9e8" stroke-width="5" stroke-linecap="round"/></svg>',
});
Sound.add('pourtea', s => { s.noise(0, 0.7, { filter: 'bandpass', freq: 900, q: 0.6, vol: 0.05, attack: 0.1 }); [0.1, 0.25, 0.4].forEach(t => s.tone(s.NOTE(88 + t * 10), t, 0.1, { vol: 0.02 })); });
Sound.add('sipsound', s => { s.tone(s.NOTE(60), 0, 0.2, { to: s.NOTE(52), type: 'sine', vol: 0.05 }); });

/* ---------- high tea: the waiter wheels in the stand; pour, treat, sip, and clink cups ---------- */
const TREATS = ['macarons', 'tart', 'cupcake', 'crepes'];
TRIP_PLAY.hightea = async function (a, side, p) {
  if (!a.data.tea) { await setUpHighTea(a); return; }
  const t = a.data.tea, d = t.stage[side];
  if (t.lock[side]) return;
  t.lock[side] = true;
  try {
    if (d === 0) await teaPour(a, side);
    else if (d === 1) await teaTreat(a, side);
    else await teaSip(a, side);
  } finally { t.lock[side] = false; }
};
async function setUpHighTea(a) {
  a.busy = true;
  const w = a.data.waiter;
  if (w) { w.classList.add('carry'); waiterSay(a, 'Tea time!', 1800); await waiterWalk(a, W() * 0.5); w.classList.remove('carry'); }
  if (act !== a || a.ending) return;
  const stand = actProp(a, ICONS.teastand, { left: '50%', bottom: '25%', width: '17vmin', height: '17vmin', transform: 'translateX(-50%)' }, 11);
  const pot = actProp(a, ICONS.teapot, { left: '50%', bottom: '44%', width: '10vmin', height: '10vmin', transform: 'translateX(-50%)' }, 12);
  pot.style.color = '#e9a3c8';
  popIn(stand); popIn(pot);
  const cups = {};
  SIDES.forEach(s => {
    const at = petPoint(pets[s], s === 'left' ? 1.0 : 0.0, 0.9);
    cups[s] = actProp(a, `<div class="cupwrap">${ICONS.teacup}<div class="cupfill"></div></div>`, { left: at.x + 'px', top: at.y + 'px', width: '8vmin', height: '8vmin', transform: 'translate(-50%,-50%)' }, 30);
    popIn(cups[s]);
  });
  a.data.tea = { stand, pot, cups, stage: { left: 0, right: 0 }, lock: { left: false, right: false }, rounds: { left: 0, right: 0 }, cheered: false };
  Sound.play('chime');
  SIDES.forEach(s => mood(pets[s], 'happy', 1500));
  await wait(500);
  if (w) await waiterWalk(a, W() * 0.5 + (w.offsetWidth || 90));
  a.busy = false;
}
async function teaPour(a, side) {
  const t = a.data.tea, p = pets[side];
  begin(p, 2400);
  const dir = side === 'left' ? -1 : 1;
  Sound.play('pourtea');
  animate(t.pot.firstChild, [{ transform: 'rotate(0)' }, { transform: `rotate(${dir * -25}deg) translateX(${dir * -8}%)` }, { transform: `rotate(${dir * -25}deg) translateX(${dir * -8}%)` }, { transform: 'rotate(0)' }], { duration: 1500, easing: 'ease-in-out' });
  await animate(t.cups[side].querySelector('.cupfill'), [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 1300, fill: 'forwards', delay: 200 });
  mood(p, 'happy', 1000);
  t.stage[side] = 1;
}
async function teaTreat(a, side) {
  const t = a.data.tea, p = pets[side];
  begin(p, 2600);
  const from = { x: W() / 2, y: H() * 0.6 }, to = petPoint(p, 0.5, 0.62);
  const treat = prop(ICONS[TREATS[(a.data.treatN = (a.data.treatN || 0) + 1) % TREATS.length]], 6, from.x, from.y);
  treat.style.zIndex = 33; treat.dataset.owner = side;
  Sound.play('pop');
  await arc(treat, from, to, 700, 60);
  p.root.classList.add('chomp');
  Sound.play('chomp');
  await wait(800);
  p.root.classList.remove('chomp');
  treat.remove();
  floatHearts(p, 1);
  t.stage[side] = 2;
}
async function teaSip(a, side) {
  const t = a.data.tea, p = pets[side], cup = t.cups[side];
  begin(p, 2800);
  const at = petPoint(p, side === 'left' ? 1.0 : 0.0, 0.9), mouth = petPoint(p, 0.5, 0.58);
  Sound.play('sipsound');
  await tween(600, k => { cup.style.left = at.x + (mouth.x - at.x) * k + 'px'; cup.style.top = at.y + (mouth.y - at.y) * k + 'px'; });
  animate(cup.firstChild, [{ transform: 'rotate(0)' }, { transform: `rotate(${side === 'left' ? 14 : -14}deg)` }, { transform: 'rotate(0)' }], { duration: 700 });
  animate(t.cups[side].querySelector('.cupfill'), [{ transform: 'scaleY(1)' }, { transform: 'scaleY(.1)' }], { duration: 700, fill: 'forwards' });
  mood(p, 'happy', 1500);
  sayBubble(p, 'Delicious!', 1600);
  await wait(900);
  await tween(500, k => { cup.style.left = mouth.x + (at.x - mouth.x) * k + 'px'; cup.style.top = mouth.y + (at.y - mouth.y) * k + 'px'; });
  t.stage[side] = 0;
  t.rounds[side]++;
  if (t.rounds.left >= 1 && t.rounds.right >= 1 && !t.cheered) {          // both have had a cup: clink!
    t.cheered = true;
    await wait(300);
    const mid = { x: W() / 2, y: Math.min(at.y, petPoint(pets[other(side)], other(side) === 'left' ? 1.0 : 0.0, 0.9).y) - 30 };
    await Promise.all(SIDES.map(s => { const c = t.cups[s], x0 = parseFloat(c.style.left), y0 = parseFloat(c.style.top); return tween(450, k => { c.style.left = x0 + (mid.x + (s === 'left' ? -14 : 14) - x0) * k + 'px'; c.style.top = y0 + (mid.y - y0) * k + 'px'; }); }));
    Sound.play('chime');
    sparkles(mid.x, mid.y, 14, ['#ffd23f', '#ffffff', '#ff8fb8']);
    SIDES.forEach(s => { mood(pets[s], 'happy', 1800); floatHearts(pets[s], 3); });
    togetherMoment('hightea');
    await wait(700);
    SIDES.forEach(s => { const c = t.cups[s], at2 = petPoint(pets[s], s === 'left' ? 1.0 : 0.0, 0.9); c.style.left = at2.x + 'px'; c.style.top = at2.y + 'px'; });
  }
}
BOOK_LINES.hightea = { line: 'had a fancy tea party.', icon: 'teapot', rank: 98.5 };
