'use strict';
/* Twin Pets: visitors at the front door, "give your real stuffie a hug" moments,
   and the peekaboo button for a little brother. */

/* ---------- pictures ---------- */
Object.assign(ICONS, {
  bunny: '<svg viewBox="0 0 100 100"><ellipse cx="38" cy="22" rx="8" ry="20" fill="#f6efe8" stroke="#b9a99a" stroke-width="3"/><ellipse cx="62" cy="22" rx="8" ry="20" fill="#f6efe8" stroke="#b9a99a" stroke-width="3"/><ellipse cx="38" cy="24" rx="3.5" ry="13" fill="#ffc6d6"/><ellipse cx="62" cy="24" rx="3.5" ry="13" fill="#ffc6d6"/><ellipse cx="50" cy="78" rx="24" ry="18" fill="#f6efe8" stroke="#b9a99a" stroke-width="3"/><circle cx="50" cy="52" r="20" fill="#f6efe8" stroke="#b9a99a" stroke-width="3"/><circle cx="43" cy="50" r="3.5" fill="#3e3a4f"/><circle cx="57" cy="50" r="3.5" fill="#3e3a4f"/><path d="M47 58 L50 61 L53 58Z" fill="#ff8fab"/><circle cx="38" cy="58" r="4" fill="#ffc6d6" opacity=".7"/><circle cx="62" cy="58" r="4" fill="#ffc6d6" opacity=".7"/><path d="M28 50 l6 -10" stroke="#7fd36a" stroke-width="0"/><path d="M60 30 l6 -4 l4 6 l-6 2z" fill="#7fd36a"/></svg>',
  owl: '<svg viewBox="0 0 100 100"><path d="M22 30 L30 14 L40 26 M78 30 L70 14 L60 26" fill="#b98a5a" stroke="#8a5a3c" stroke-width="3" stroke-linejoin="round"/><ellipse cx="50" cy="56" rx="30" ry="36" fill="#c99a6b" stroke="#8a5a3c" stroke-width="3"/><ellipse cx="50" cy="66" rx="18" ry="22" fill="#f1dcbd"/><circle cx="38" cy="40" r="12" fill="#fff" stroke="#8a5a3c" stroke-width="2"/><circle cx="62" cy="40" r="12" fill="#fff" stroke="#8a5a3c" stroke-width="2"/><circle cx="38" cy="41" r="6" fill="#3e3a4f"/><circle cx="62" cy="41" r="6" fill="#3e3a4f"/><circle cx="40" cy="39" r="2" fill="#fff"/><circle cx="64" cy="39" r="2" fill="#fff"/><path d="M45 50 L50 58 L55 50Z" fill="#ffb020"/><path d="M42 92 v-4 M48 92 v-4 M54 92 v-4 M60 92 v-4" stroke="#ffb020" stroke-width="3" stroke-linecap="round"/></svg>',
  wave: '<svg viewBox="0 0 100 100"><g fill="#ffd9e4" stroke="#f08bb0" stroke-width="4"><ellipse cx="50" cy="62" rx="24" ry="22"/><circle cx="31" cy="35" r="8.5"/><circle cx="45" cy="26" r="8.5"/><circle cx="59" cy="26" r="8.5"/><circle cx="72" cy="35" r="8.5"/></g><path d="M14 20 q-6 10 0 20 M86 20 q6 10 0 20" stroke="#ffd23f" stroke-width="5" fill="none" stroke-linecap="round"/></svg>',
  peekaboo: '<svg viewBox="0 0 100 100"><circle cx="50" cy="56" r="34" fill="#ffe7a8" stroke="#e0b070" stroke-width="4"/><circle cx="38" cy="50" r="5" fill="#3e3a4f"/><circle cx="62" cy="50" r="5" fill="#3e3a4f"/><path d="M40 68 Q50 76 60 68" stroke="#3e3a4f" stroke-width="4" fill="none" stroke-linecap="round"/><g fill="#ffc6a8" stroke="#e0905a" stroke-width="3"><rect x="10" y="16" width="22" height="30" rx="10" transform="rotate(-20 21 31)"/><rect x="68" y="16" width="22" height="30" rx="10" transform="rotate(20 79 31)"/></g></svg>',
});

/* =====================================================================
   VISITORS: Clover the bunny and Hoot the owl come to the front door
   ===================================================================== */
const VISITORS = {
  bunny: { name: 'Clover', word: 'bunny', icon: 'bunny' },
  owl:   { name: 'Hoot',   word: 'owl',   icon: 'owl' },
};
let visitor = null, visitAt = 1e15;
SESSION_HOOKS.push(() => { visitAt = now() + rand(4, 8) * 60000; requestAt = now() + rand(9, 14) * 60000; });
setInterval(() => {
  if (!has('visitors') || S.bedtime) return;
  if (!visitor && scene === 'play' && now() > visitAt) arrive();
  else if (visitor && !visitor.leaving && now() > visitor.until) leave();
}, 1000);
function arrive() {
  visitAt = 1e15;                          // one visit each time the game is opened
  S.visitN = (S.visitN || 0) + 1;
  save();
  const kind = Object.keys(VISITORS)[S.visitN % 2];
  visitor = { kind, greeted: { left: false, right: false }, until: now() + 4 * 60000 };
  if (S.room === 'frontyard') showVisitor(true);
  else {
    Sound.play('knock');
    setTimeout(() => Sound.play('knock'), 700);
    showHint(VISITORS[kind].icon, 'knock knock');
    S.doorNew.frontyard = true;
    save();
    renderCenter();
  }
}
function showVisitor(walkIn) {
  if (!visitor || visitor.el) return;
  const V = VISITORS[visitor.kind];
  const css = visitor.kind === 'owl' ? { left: '50%', bottom: '35%', width: '11vmin', height: '11vmin' } : { left: '50%', bottom: 'calc(1% + 13vmin)', width: '12vmin', height: '12vmin' };
  const e = el('div', 'visitor', `<div class="vbody">${ICONS[V.icon]}</div><div class="vname"></div>`);
  sayableInto(e.querySelector('.vname'), V.name);
  Object.assign(e.style, css);
  world.append(e);
  visitor.el = e;
  onPress(e.querySelector('.vbody'), () => { if (scene === 'play') visitorReacts(); });
  if (walkIn) {
    Sound.play(visitor.kind === 'owl' ? 'hoot' : 'boing');
    animate(e, visitor.kind === 'owl'
      ? [{ transform: 'translate(-50%, -60vh) scale(.6)' }, { transform: 'translate(-50%, 0) scale(1)' }]
      : [{ transform: 'translate(40vw, 0)' }, { transform: 'translate(20vw, -6vmin)' }, { transform: 'translate(-50%, 0)' }], { duration: 1200, easing: 'ease-out' });
  }
  renderColumns();
}
function visitorReacts() {
  const e = visitor && visitor.el;
  if (!e) return;
  if (visitor.kind === 'owl') {
    Sound.play('hoot');
    animate(e.firstChild, [{ transform: 'rotate(0)' }, { transform: 'rotate(-25deg)' }, { transform: 'rotate(25deg)' }, { transform: 'rotate(0)' }], { duration: 900 });
  } else {
    Sound.play('boing');
    animate(e.firstChild, [{ transform: 'translateY(0)' }, { transform: 'translateY(-40%)' }, { transform: 'translateY(0)' }, { transform: 'translateY(-20%)' }, { transform: 'translateY(0)' }], { duration: 800, easing: 'ease-out' });
  }
  const r = e.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top, 5);
}
async function leave() {
  if (!visitor) return;
  visitor.leaving = true;
  const e = visitor.el;
  delete S.doorNew.frontyard;
  save();
  renderCenter();
  if (e) {
    Sound.play('wave');
    await animate(e, [{ opacity: 1 }, { opacity: 0, transform: 'translate(-50%, -4vmin)' }], { duration: 900, fill: 'forwards' });
    e.remove();
  }
  visitor = null;
  renderColumns();
}
// arriving in the front yard while someone is waiting at the door
const _visitorArrive = () => { if (visitor && !visitor.el && S.room === 'frontyard') showVisitor(true); if (visitor && visitor.el) visitor.el.style.display = S.room === 'frontyard' ? '' : 'none'; };
ROOM_HOOKS.push(_visitorArrive);

BUTTONS.hello = { icon: 'wave', label: 'Hello' };
ROOMS.frontyard.acts.push('hello');
SHOW_IF.hello = () => !!(visitor && visitor.el && !visitor.leaving);
ACT_HANDLERS.hello = async side => {
  if (!visitor || !visitor.el) return;
  const V = VISITORS[visitor.kind];
  doTrick(side, 'wave', true);
  Speech.say('Hello ' + V.name);
  await wait(500);
  visitorReacts();
  sayBubble(pets[side], 'Hi, ' + V.name + '!', 2200);
  if (visitor.greeted[side]) return;
  visitor.greeted[side] = true;
  if (visitor.greeted.left && visitor.greeted.right) {
    await wait(1500);
    if (!visitor) return;
    visitor.until = now() + 45000;          // stays a little while, then waves goodbye
    togetherMoment('visit-' + visitor.kind);
    SIDES.forEach(s => floatHearts(pets[s], 2));
  }
};
NEW_THINGS.push({ key: 'visitors', order: 19, icon: 'bunny', word: 'visitors', onIntro: () => { visitAt = now() + 40000; } });
Object.assign(BOOK_LINES, {
  'visit-bunny': { line: 'had a visit from Clover the bunny.', icon: 'bunny', rank: 97 },
  'visit-owl':   { line: 'had a visit from Hoot the owl.',     icon: 'owl',   rank: 97 },
});
Sound.add('hoot', s => { s.tone(s.NOTE(62), 0, 0.35, { type: 'triangle', vol: 0.08, attack: 0.05 }); s.tone(s.NOTE(59), 0.45, 0.5, { type: 'triangle', vol: 0.08, attack: 0.05 }); });
Sound.add('wave', s => { [79, 76, 72].forEach((m, i) => s.tone(s.NOTE(m), i * 0.12, 0.3, { vol: 0.05, echo: 1 })); });

/* =====================================================================
   REAL STUFFIES: about once a play session, each pet asks for something
   from the real stuffed animal ("Give Livvie a real hug!")
   ===================================================================== */
const REQUESTS = [
  { icon: 'hug',  text: pet => `Give ${pet} a real hug!` },
  { icon: 'note', text: pet => `Dance with ${pet}!` },
  { icon: 'heart', text: pet => `Give ${pet} a kiss on the nose!` },
  { icon: 'moon', text: pet => `Tuck ${pet} in for a nap!` },
  { icon: 'hand', text: pet => `Give ${pet} a high five!` },
];
let requestAt = 1e15;
const requestCards = { left: null, right: null };
setInterval(() => {
  if (!has('stuffies') || S.bedtime || scene !== 'play' || now() < requestAt || requestCards.left || requestCards.right) return;
  if (visitor && visitor.el) return;
  requestAt = 1e15;                       // once each time the game is opened
  S.requestN = (S.requestN || 0) + 1;
  save();
  const req = REQUESTS[S.requestN % REQUESTS.length];
  SIDES.forEach(side => showRequest(side, req));
}, 1000);
function showRequest(side, req) {
  const pet = SETTINGS.players[side].pet;
  const c = el('div', 'request side-' + side, `<div class="rpic">${ICONS[req.icon]}</div><div class="rtext"></div><div class="rdone">${ICONS.heart}</div>`);
  wordsInto(c.querySelector('.rtext'), req.text(pet));
  stage.append(c);
  requestCards[side] = c;
  animate(c, [{ transform: 'translateX(-50%) scale(0)' }, { transform: 'translateX(-50%) scale(1.08)' }, { transform: 'translateX(-50%) scale(1)' }], { duration: 450, easing: 'ease-out' });
  Sound.play('bubble');
  pets[side].nextWishAt = now() + 90000;
  onRelease(c.querySelector('.rdone'), () => requestDone(side));
  setTimeout(() => closeRequest(side), 120000);
}
function requestDone(side) {
  const p = pets[side];
  closeRequest(side);
  begin(p, 2400);
  mood(p, 'happy', 2400);
  Sound.play('wish');
  floatHearts(p, 5);
  const m = petPoint(p, 0.5, 0.4);
  sparkles(m.x, m.y, 14);
  sayBubble(p, 'I love you, ' + SETTINGS.players[side].girl + '!', 2600);
  logDay('stuffie');
}
function closeRequest(side) {
  const c = requestCards[side];
  if (!c) return;
  requestCards[side] = null;
  animate(c, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' }).then(() => c.remove());
}
NEW_THINGS.push({ key: 'stuffies', order: 13.5, icon: 'hug', word: 'real hugs', onIntro: () => { requestAt = now() + 15000; } });
BOOK_LINES.stuffie = { line: 'got real hugs.', icon: 'hug', rank: 89 };

/* =====================================================================
   PEEKABOO: a button for a little brother. An animal peeks out and says hello.
   No reading needed.
   ===================================================================== */
const PEEKERS = {
  cow:    { sound: 'moo',    svg: '<svg viewBox="0 0 100 100"><ellipse cx="22" cy="34" rx="14" ry="8" fill="#fff" stroke="#5d4a3a" stroke-width="3" transform="rotate(-20 22 34)"/><ellipse cx="78" cy="34" rx="14" ry="8" fill="#fff" stroke="#5d4a3a" stroke-width="3" transform="rotate(20 78 34)"/><path d="M34 18 Q30 6 38 8 M66 18 Q70 6 62 8" stroke="#e0c08a" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="52" rx="30" ry="34" fill="#fff" stroke="#5d4a3a" stroke-width="3"/><path d="M28 32 C 34 24, 46 28, 42 40 C 38 48, 26 44, 28 32Z" fill="#5d4a3a"/><ellipse cx="50" cy="72" rx="22" ry="14" fill="#ffc6d6"/><circle cx="42" cy="72" r="3" fill="#c97a8a"/><circle cx="58" cy="72" r="3" fill="#c97a8a"/><circle cx="40" cy="48" r="4.5" fill="#3e3a4f"/><circle cx="60" cy="48" r="4.5" fill="#3e3a4f"/><rect x="12" y="86" width="20" height="14" rx="6" fill="#fff" stroke="#5d4a3a" stroke-width="3"/><rect x="68" y="86" width="20" height="14" rx="6" fill="#fff" stroke="#5d4a3a" stroke-width="3"/></svg>' },
  frog:   { sound: 'ribbit', svg: '<svg viewBox="0 0 100 100"><circle cx="30" cy="30" r="14" fill="#8fd16a" stroke="#4f9a34" stroke-width="3"/><circle cx="70" cy="30" r="14" fill="#8fd16a" stroke="#4f9a34" stroke-width="3"/><circle cx="30" cy="30" r="7" fill="#fff"/><circle cx="70" cy="30" r="7" fill="#fff"/><circle cx="31" cy="31" r="4" fill="#3e3a4f"/><circle cx="71" cy="31" r="4" fill="#3e3a4f"/><ellipse cx="50" cy="62" rx="38" ry="28" fill="#8fd16a" stroke="#4f9a34" stroke-width="3"/><path d="M30 64 Q50 80 70 64" stroke="#4f9a34" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="26" cy="58" r="5" fill="#ffb3c8" opacity=".6"/><circle cx="74" cy="58" r="5" fill="#ffb3c8" opacity=".6"/><rect x="12" y="86" width="20" height="14" rx="6" fill="#8fd16a" stroke="#4f9a34" stroke-width="3"/><rect x="68" y="86" width="20" height="14" rx="6" fill="#8fd16a" stroke="#4f9a34" stroke-width="3"/></svg>' },
  piggy:  { sound: 'oink',   svg: '<svg viewBox="0 0 100 100"><path d="M22 26 L30 8 L42 22Z M78 26 L70 8 L58 22Z" fill="#ffb3c8" stroke="#e0708c" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="54" r="34" fill="#ffc6d6" stroke="#e0708c" stroke-width="3"/><ellipse cx="50" cy="64" rx="14" ry="10" fill="#ff9ab4" stroke="#e0708c" stroke-width="2"/><circle cx="45" cy="64" r="2.5" fill="#c9506e"/><circle cx="55" cy="64" r="2.5" fill="#c9506e"/><circle cx="38" cy="46" r="4.5" fill="#3e3a4f"/><circle cx="62" cy="46" r="4.5" fill="#3e3a4f"/><rect x="12" y="86" width="20" height="14" rx="6" fill="#ffc6d6" stroke="#e0708c" stroke-width="3"/><rect x="68" y="86" width="20" height="14" rx="6" fill="#ffc6d6" stroke="#e0708c" stroke-width="3"/></svg>' },
  lamb:   { sound: 'baa',    svg: '<svg viewBox="0 0 100 100"><g fill="#fff" stroke="#c9c3d3" stroke-width="3"><circle cx="30" cy="30" r="12"/><circle cx="50" cy="22" r="13"/><circle cx="70" cy="30" r="12"/><circle cx="24" cy="50" r="12"/><circle cx="76" cy="50" r="12"/></g><ellipse cx="50" cy="58" rx="24" ry="28" fill="#f3e2d3" stroke="#c9a88a" stroke-width="3"/><ellipse cx="22" cy="50" rx="10" ry="6" fill="#f3e2d3" stroke="#c9a88a" stroke-width="3"/><ellipse cx="78" cy="50" rx="10" ry="6" fill="#f3e2d3" stroke="#c9a88a" stroke-width="3"/><circle cx="41" cy="54" r="4" fill="#3e3a4f"/><circle cx="59" cy="54" r="4" fill="#3e3a4f"/><path d="M45 70 Q50 74 55 70" stroke="#3e3a4f" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="12" y="86" width="20" height="14" rx="6" fill="#f3e2d3" stroke="#c9a88a" stroke-width="3"/><rect x="68" y="86" width="20" height="14" rx="6" fill="#f3e2d3" stroke="#c9a88a" stroke-width="3"/></svg>' },
  kitten: { sound: 'meow',   svg: '<svg viewBox="0 0 100 100"><path d="M20 40 L22 10 L44 26Z M80 40 L78 10 L56 26Z" fill="#ffc98a" stroke="#d9904a" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="54" r="32" fill="#ffc98a" stroke="#d9904a" stroke-width="3"/><path d="M38 26 l4 10 M50 22 v12 M62 26 l-4 10" stroke="#d9904a" stroke-width="4" stroke-linecap="round"/><circle cx="38" cy="52" r="5" fill="#3e3a4f"/><circle cx="62" cy="52" r="5" fill="#3e3a4f"/><path d="M46 62 L50 66 L54 62Z" fill="#ff8fab"/><path d="M50 66 Q44 72 40 68 M50 66 Q56 72 60 68" stroke="#3e3a4f" stroke-width="2.5" fill="none"/><rect x="12" y="86" width="20" height="14" rx="6" fill="#ffc98a" stroke="#d9904a" stroke-width="3"/><rect x="68" y="86" width="20" height="14" rx="6" fill="#ffc98a" stroke="#d9904a" stroke-width="3"/></svg>' },
  duck:   { sound: 'quack',  svg: null },
};
let lastPeeker = null, peeking = false;
async function peekaboo(btn) {
  if (peeking) { nudge(btn); return; }
  peeking = true;
  const kinds = Object.keys(PEEKERS).filter(k => k !== lastPeeker);
  const kind = lastPeeker = pick(kinds);
  const where = pick(['bottom', 'left', 'right']);
  const a = el('div', 'peeker from-' + where, PEEKERS[kind].svg || ICONS.duck);
  stage.append(a);
  const hide = where === 'bottom' ? 'translate(-50%, 100%)' : where === 'left' ? 'translate(-100%, 0) rotate(30deg)' : 'translate(100%, 0) rotate(-30deg)';
  const show = where === 'bottom' ? 'translate(-50%, 18%)' : where === 'left' ? 'translate(-10%, 0) rotate(20deg)' : 'translate(10%, 0) rotate(-20deg)';
  await animate(a, [{ transform: hide }, { transform: show }], { duration: 420, easing: 'cubic-bezier(.3,1.5,.6,1)', fill: 'forwards' });
  Sound.play(PEEKERS[kind].sound);
  await animate(a.firstChild, [{ transform: 'rotate(0)' }, { transform: 'rotate(-6deg)' }, { transform: 'rotate(6deg)' }, { transform: 'rotate(0)' }], { duration: 700 });
  await wait(500);
  await animate(a, [{ transform: show }, { transform: hide }], { duration: 380, easing: 'ease-in', fill: 'forwards' });
  a.remove();
  peeking = false;
}
CENTER_BUTTONS.push({ key: 'peekaboo', icon: 'peekaboo', show: () => has('peekaboo'), tap: peekaboo });
NEW_THINGS.push({ key: 'peekaboo', order: 3.5, acts: ['peekaboo'], icon: 'peekaboo', word: 'peekaboo' });
Sound.add('moo', s => { s.tone(150, 0, 0.9, { type: 'sawtooth', to: 110, vol: 0.035, attack: 0.1 }); });
Sound.add('ribbit', s => { [0, 0.2].forEach(t => { for (let i = 0; i < 4; i++) s.tone(220, t + i * 0.035, 0.03, { type: 'square', vol: 0.03 }); }); });
Sound.add('oink', s => { s.noise(0, 0.18, { filter: 'bandpass', freq: 500, q: 4, vol: 0.08 }); s.noise(0.25, 0.18, { filter: 'bandpass', freq: 560, q: 4, vol: 0.08 }); });
Sound.add('baa', s => { s.tone(s.NOTE(64), 0, 0.7, { type: 'triangle', vol: 0.06 }); for (let i = 0; i < 6; i++) s.tone(s.NOTE(i % 2 ? 63 : 65), i * 0.1, 0.1, { type: 'triangle', vol: 0.03 }); });
Sound.add('meow', s => { s.tone(s.NOTE(76), 0, 0.5, { to: s.NOTE(84), glide: 0.15, vol: 0.06 }); s.tone(s.NOTE(84), 0.15, 0.4, { to: s.NOTE(72), vol: 0.05 }); });
