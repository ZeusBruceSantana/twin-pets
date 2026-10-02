'use strict';
/* Twin Pets: pretend play in the playroom. The vet check-up, the tea party, the puppet stage. */

/* ---------- pictures ---------- */
Object.assign(ICONS, {
  vet: '<svg viewBox="0 0 100 100"><rect x="14" y="30" width="72" height="56" rx="10" fill="#fff" stroke="#9fb8cc" stroke-width="4"/><path d="M38 30 V20 C 38 14, 62 14, 62 20 V30" fill="none" stroke="#9fb8cc" stroke-width="5"/><rect x="43" y="44" width="14" height="32" rx="3" fill="#ff7a9a"/><rect x="34" y="53" width="32" height="14" rx="3" fill="#ff7a9a"/></svg>',
  stethoscope: '<svg viewBox="0 0 100 100"><path d="M26 10 V40 C 26 58, 50 62, 50 44 M74 10 V40 C 74 58, 50 62, 50 44" fill="none" stroke="#8b7fd1" stroke-width="6" stroke-linecap="round"/><path d="M50 60 C 50 84, 70 90, 76 78" fill="none" stroke="#8b7fd1" stroke-width="6" stroke-linecap="round"/><circle cx="78" cy="72" r="12" fill="#c9d2e0" stroke="#7a869c" stroke-width="4"/></svg>',
  hammer: '<svg viewBox="0 0 100 100"><path d="M30 78 L70 30" stroke="#c99a6b" stroke-width="8" stroke-linecap="round"/><path d="M50 22 C 60 12, 80 20, 82 32 C 84 44, 70 52, 62 44Z" fill="#ff8a7a" stroke="#d9604f" stroke-width="4" stroke-linejoin="round"/></svg>',
  sticker: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#fff" stroke="#ffd23f" stroke-width="6"/><path d="M50 22 L58 40 L78 42 L63 55 L67 75 L50 65 L33 75 L37 55 L22 42 L42 40Z" fill="#ffd23f" stroke="#e0b030" stroke-width="3" stroke-linejoin="round"/></svg>',
  tea: '<svg viewBox="0 0 100 100"><path d="M18 40 H70 V60 C 70 76, 58 86, 44 86 C 30 86, 18 76, 18 60Z" fill="#ffd9e8" stroke="#f08bb0" stroke-width="4"/><path d="M70 46 C 86 46, 86 66, 70 66" fill="none" stroke="#f08bb0" stroke-width="5"/><ellipse cx="44" cy="90" rx="34" ry="5" fill="#f08bb0" opacity=".4"/><path d="M34 30 q-6 -8 0 -16 M48 30 q-6 -8 0 -16" stroke="#c9b8a8" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="38" cy="58" r="5" fill="#fff"/></svg>',
  teapot: '<svg viewBox="0 0 100 100"><path d="M24 40 C 24 28, 76 28, 76 40 V64 C 76 80, 64 88, 50 88 C 36 88, 24 80, 24 64Z" fill="currentColor" stroke="#fff" stroke-width="4"/><path d="M76 48 C 92 48, 92 70, 74 72" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 50 L6 36" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><ellipse cx="50" cy="30" rx="14" ry="5" fill="#fff"/><circle cx="50" cy="22" r="5" fill="#fff"/><circle cx="40" cy="58" r="6" fill="#fff" opacity=".6"/></svg>',
  cups: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="78" rx="38" ry="9" fill="#fff" stroke="#d9c7b5" stroke-width="3"/><path d="M28 46 H72 V60 C 72 72, 62 78, 50 78 C 38 78, 28 72, 28 60Z" fill="#fff" stroke="#f08bb0" stroke-width="4"/><path d="M72 50 C 84 50, 84 64, 72 64" fill="none" stroke="#f08bb0" stroke-width="4"/></svg>',
  sip: '<svg viewBox="0 0 100 100"><path d="M24 44 H70 V58 C 70 72, 60 80, 47 80 C 34 80, 24 72, 24 58Z" fill="#fff" stroke="#f08bb0" stroke-width="4"/><ellipse cx="47" cy="46" rx="22" ry="5" fill="#e8c39e"/><path d="M70 48 C 82 48, 82 62, 70 62" fill="none" stroke="#f08bb0" stroke-width="4"/><path d="M60 30 C 70 22, 80 26, 84 18" stroke="#ff8fb8" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M80 10 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z" fill="#ffd23f"/></svg>',
  invite: '<svg viewBox="0 0 100 100"><rect x="12" y="28" width="76" height="52" rx="6" fill="#fff4dd" stroke="#e0b070" stroke-width="4"/><path d="M14 32 L50 58 L86 32" fill="none" stroke="#e0b070" stroke-width="4"/><path d="M50 62 C 44 56, 36 60, 40 66 L50 74 L60 66 C 64 60, 56 56, 50 62Z" fill="#ff7a9a"/></svg>',
  puppets: '<svg viewBox="0 0 100 100"><rect x="8" y="10" width="84" height="80" rx="6" fill="#ffd27a" stroke="#d9a23a" stroke-width="4"/><path d="M14 16 H86 V80 H14Z" fill="#7a5aa8"/><path d="M14 16 C 30 16, 36 50, 26 80 H14Z M86 16 C 70 16, 64 50, 74 80 H86Z" fill="#ff6b7a"/><path d="M8 10 C 30 22, 70 22, 92 10" fill="#ff8a96" stroke="#d94f5c" stroke-width="3"/><circle cx="50" cy="56" r="10" fill="#ffd23f"/></svg>',
  wand: '<svg viewBox="0 0 100 100"><path d="M20 84 L62 42" stroke="#8b7fd1" stroke-width="7" stroke-linecap="round"/><path d="M70 10 L77 28 L96 30 L81 42 L86 61 L70 50 L54 61 L59 42 L44 30 L63 28Z" fill="#ffd23f" stroke="#e0b030" stroke-width="3" stroke-linejoin="round"/></svg>',
  mic: '<svg viewBox="0 0 100 100"><path d="M40 52 L28 92 H44 L52 56" fill="#5d6676"/><circle cx="54" cy="30" r="20" fill="#c9d2e0" stroke="#7a869c" stroke-width="4"/><path d="M40 22 h28 M38 32 h32 M42 42 h24" stroke="#7a869c" stroke-width="2"/></svg>',
  tophat: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="80" rx="44" ry="10" fill="#3e3a4f"/><path d="M24 80 V24 C 24 16, 76 16, 76 24 V80Z" fill="#3e3a4f"/><rect x="24" y="58" width="52" height="10" fill="#ff6b7a"/></svg>',
  cape: '<svg viewBox="0 0 100 100"><path d="M30 14 C 40 22, 60 22, 70 14 L92 90 C 70 98, 30 98, 8 90Z" fill="#ff6b7a" stroke="#d94f5c" stroke-width="4" stroke-linejoin="round"/><path d="M50 30 l4 9 l10 1 l-7 7 l2 10 l-9 -5 l-9 5 l2 -10 l-7 -7 l10 -1z" fill="#ffd23f"/></svg>',
  bowTrick: '<svg viewBox="0 0 100 100"><circle cx="50" cy="40" r="16" fill="#ffd9e4" stroke="#f08bb0" stroke-width="4"/><path d="M24 90 C 24 66, 76 66, 76 90" fill="#ffd9e4" stroke="#f08bb0" stroke-width="4"/><path d="M20 30 C 30 20, 40 24, 34 32 M80 30 C 70 20, 60 24, 66 32" stroke="#ffd23f" stroke-width="4" fill="none" stroke-linecap="round"/></svg>',
  // stuffed friends (all made up for this game)
  elephant: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="70" rx="26" ry="22" fill="#a9c8f0" stroke="#7a9cc8" stroke-width="3"/><circle cx="24" cy="38" r="15" fill="#ffc6d6" stroke="#7a9cc8" stroke-width="3"/><circle cx="76" cy="38" r="15" fill="#ffc6d6" stroke="#7a9cc8" stroke-width="3"/><circle cx="50" cy="40" r="22" fill="#a9c8f0" stroke="#7a9cc8" stroke-width="3"/><path d="M50 50 C 50 66, 58 70, 62 64" fill="none" stroke="#7a9cc8" stroke-width="8" stroke-linecap="round"/><path d="M50 50 C 50 66, 58 70, 62 64" fill="none" stroke="#a9c8f0" stroke-width="4" stroke-linecap="round"/><circle cx="41" cy="36" r="3.5" fill="#3e3a4f"/><circle cx="59" cy="36" r="3.5" fill="#3e3a4f"/><path d="M34 84 h6 M60 84 h6" stroke="#7a9cc8" stroke-width="3"/></svg>',
  giraffe: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="78" rx="22" ry="16" fill="#ffd27a" stroke="#d9a23a" stroke-width="3"/><rect x="42" y="30" width="16" height="42" rx="8" fill="#ffd27a" stroke="#d9a23a" stroke-width="3"/><ellipse cx="50" cy="24" rx="16" ry="13" fill="#ffd27a" stroke="#d9a23a" stroke-width="3"/><path d="M42 12 V4 M58 12 V4" stroke="#b07f4f" stroke-width="4" stroke-linecap="round"/><circle cx="42" cy="3" r="3" fill="#b07f4f"/><circle cx="58" cy="3" r="3" fill="#b07f4f"/><circle cx="44" cy="22" r="3" fill="#3e3a4f"/><circle cx="56" cy="22" r="3" fill="#3e3a4f"/><g fill="#d9a23a"><circle cx="48" cy="44" r="3.5"/><circle cx="53" cy="58" r="3"/><circle cx="40" cy="80" r="4"/><circle cx="60" cy="76" r="4"/></g></svg>',
  octopus: '<svg viewBox="0 0 100 100"><path d="M22 52 C 22 22, 78 22, 78 52 C 78 60, 72 64, 72 64" fill="#c3a6ff" stroke="#8b7fd1" stroke-width="3"/><path d="M24 56 C 16 70, 12 82, 22 86 M36 62 C 32 76, 30 88, 40 90 M50 64 C 50 78, 50 90, 58 90 M64 62 C 68 76, 70 88, 80 86 M76 56 C 84 70, 88 80, 80 84" fill="none" stroke="#c3a6ff" stroke-width="9" stroke-linecap="round"/><path d="M22 52 C 22 62, 78 62, 78 52" fill="#c3a6ff"/><circle cx="40" cy="44" r="4" fill="#3e3a4f"/><circle cx="60" cy="44" r="4" fill="#3e3a4f"/><path d="M44 52 q6 5 12 0" stroke="#3e3a4f" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="32" cy="50" r="4" fill="#ff8fb8" opacity=".6"/><circle cx="68" cy="50" r="4" fill="#ff8fb8" opacity=".6"/></svg>',
});
Object.assign(BUTTONS, {
  vet:     { icon: 'vet',         label: 'Vet' },
  listen:  { icon: 'stethoscope', label: 'Listen' },
  knee:    { icon: 'hammer',      label: 'Knee' },
  sticker: { icon: 'sticker',     label: 'Sticker' },
  tea:     { icon: 'tea',         label: 'Tea party' },
  puppets: { icon: 'puppets',     label: 'Puppets' },
});
ROOMS.playroom.acts.push('puppets', 'tea', 'vet');
FEATURE_OF.vet = 'vet';
FEATURE_OF.tea = 'tea';
FEATURE_OF.puppets = 'puppets';
NEW_THINGS.push(
  { key: 'vet',     order: 11, room: 'playroom', acts: ['vet'],     icon: 'vet',     word: 'vet' },
  { key: 'tea',     order: 14, room: 'playroom', acts: ['tea'],     icon: 'tea',     word: 'tea party' },
  { key: 'puppets', order: 16, room: 'playroom', acts: ['puppets'], icon: 'puppets', word: 'puppets' },
);
Object.assign(BOOK_LINES, {
  vet:     { line: 'had a check-up at the vet.',          icon: 'vet',     rank: 88 },
  tea:     { line: 'had a tea party with stuffed friends.', icon: 'tea',   rank: 94 },
  puppets: { line: 'put on a puppet show.',               icon: 'puppets', rank: 94.5 },
});

/* =====================================================================
   THE VET: a check-up (the pets are never sick, just checked)
   ===================================================================== */
SIDE_MODES.vet = () => ({ acts: ['listen', 'knee', 'sticker', 'back'] });
ACT_HANDLERS.vet = side => { sideMode[side] = 'vet'; trickTouched[side] = now(); Sound.play('pick'); renderColumn(side); };
ACT_HANDLERS.listen = async side => {
  trickTouched[side] = now();
  const p = pets[side];
  if (p.asleep) wakePet(side, true);
  const alive = begin(p, 2600);
  const chest = petPoint(p, 0.5, 0.72);
  const st = prop(ICONS.stethoscope, 10, chest.x, chest.y - petSize() * 0.1);
  st.dataset.owner = side;
  st.style.zIndex = 14;
  await popIn(st.firstChild);
  for (let i = 0; i < 3; i++) {
    if (!alive()) return;
    Sound.play('heartbeat');
    const h = prop(ICONS.heart, 4, chest.x, chest.y);
    h.style.color = '#ff6f91'; h.style.zIndex = 31;
    animate(h.firstChild, [{ transform: 'scale(.4)', opacity: 1 }, { transform: 'scale(1.6)', opacity: 1, offset: 0.3 }, { transform: 'scale(2.4) translateY(-4vmin)', opacity: 0 }], { duration: 800, fill: 'both' }).then(() => h.remove());
    petAnim(p, [{ transform: 'scale(1)' }, { transform: 'scale(1.04)' }, { transform: 'scale(1)' }, { transform: 'scale(1.03)' }, { transform: 'scale(1)' }], { duration: 500 });
    await wait(650);
  }
  st.remove();
  mood(p, 'happy', 1200);
  Sound.play('giggle');
  logDay('vet');
};
ACT_HANDLERS.knee = async side => {
  trickTouched[side] = now();
  const p = pets[side];
  if (p.asleep) wakePet(side, true);
  const alive = begin(p, 1800);
  const knee = petPoint(p, side === 'left' ? 0.62 : 0.38, 0.9);
  const hm = prop(ICONS.hammer, 8, knee.x + (side === 'left' ? 1 : -1) * petSize() * 0.12, knee.y - petSize() * 0.08);
  hm.dataset.owner = side;
  hm.style.zIndex = 14;
  if (side === 'right') hm.firstChild.style.transform = 'scaleX(-1)';
  await animate(hm.firstChild, [{ transform: (side === 'right' ? 'scaleX(-1) ' : '') + 'rotate(0)' }, { transform: (side === 'right' ? 'scaleX(-1) ' : '') + 'rotate(-35deg)' }, { transform: (side === 'right' ? 'scaleX(-1) ' : '') + 'rotate(0)' }], { duration: 300 });
  Sound.play('boing');
  hm.remove();
  if (!alive()) return;
  // boing! the leg kicks
  const dir = side === 'left' ? 1 : -1;
  await petAnim(p, [{ transform: 'translateY(0) rotate(0)' }, { transform: `translateY(-10%) rotate(${dir * -12}deg)`, offset: 0.3 }, { transform: `translateY(0) rotate(${dir * 6}deg)`, offset: 0.7 }, { transform: 'translateY(0) rotate(0)' }], { duration: 600, easing: 'ease-out' });
  mood(p, 'happy', 1200);
  Sound.play('giggle');
};
ACT_HANDLERS.sticker = async side => {
  trickTouched[side] = now();
  const p = pets[side];
  if (p.asleep) wakePet(side, true);
  begin(p, 2400);
  const from = { x: side === 'left' ? 0 : W(), y: H() * 0.5 }, to = petPoint(p, 0.62, 0.66);
  const s = prop(ICONS.sticker, 6, from.x, from.y);
  s.style.zIndex = 33;
  await arc(s, from, to, 700, H() * 0.15, 360);
  s.remove();
  S.pets[side].vet = { day: todayKey() };
  save();
  renderSticker(side);
  Sound.play('ding');
  sparkles(to.x, to.y, 8);
  mood(p, 'happy', 2000);
  floatHearts(p, 3);
  sayBubble(p, 'Thank you, Doctor ' + SETTINGS.players[side].girl + '!', 2600);
  logDay('vet');
};
function renderSticker(side) {
  const p = pets[side], v = S.pets[side].vet;
  p.art.querySelectorAll('.vetsticker').forEach(e => e.remove());
  if (!v || v.day !== todayKey()) return;
  const e = el('div', 'vetsticker', ICONS.sticker);
  p.art.append(e);
}
DRESS_HOOKS.push(renderSticker);
Sound.add('heartbeat', s => { s.tone(s.NOTE(43), 0, 0.14, { type: 'triangle', to: s.NOTE(55), vol: 0.14 }); s.tone(s.NOTE(43), 0.18, 0.18, { type: 'triangle', to: s.NOTE(60), vol: 0.12 }); s.tone(s.NOTE(84), 0.22, 0.1, { vol: 0.03 }); });

/* =====================================================================
   THE TEA PARTY: set the table, invite a stuffed friend, pour pretend tea, sip
   ===================================================================== */
const FRIENDS = { elephant: 'elephant', giraffe: 'giraffe', octopus: 'octopus' };
const TEA_STEPS = ['set', 'invite', 'pour', 'sip'];
const TEA_BTN = { set: ['cups', 'Set'], invite: ['invite', 'Invite'], pour: ['teapot', 'Pour'], sip: ['sip', 'Sip'] };
ACT_HANDLERS.tea = side => startActivity('tea', side);
ACTIVITIES.tea = {
  async start(a) {
    a.data.step = { left: 0, right: 0 };
    a.data.sips = { left: 0, right: 0 };
    a.data.cups = { left: [], right: [] };
    a.data.friend = {};
    await Promise.all([movePet('left', 31, 10, 700), movePet('right', 69, 10, 700)]);
    a.data.table = actProp(a, `<svg viewBox="0 0 200 90"><path d="M60 40 L52 88 M140 40 L148 88 M100 44 V88" stroke="#c99a6b" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="100" cy="30" rx="96" ry="22" fill="#fff"/><path d="M4 30 C 4 48, 196 48, 196 30 L196 36 C 190 58, 10 58, 4 36Z" fill="#ffd9e8"/>
      <path d="M8 40 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0 q8 10 16 0" fill="none" stroke="#f08bb0" stroke-width="2"/></svg>`,
      { left: '50%', bottom: '4%', width: '40vmin', height: '18vmin', transform: 'translateX(-50%)' }, 12);
    await popIn(a.data.table);
    Sound.play('pick');
  },
  plan(a, side) {
    const st = a.data.step[side];
    if (st >= TEA_STEPS.length) return { acts: ['teadone'], big: true, defs: { teadone: { icon: 'done', label: '' } }, cls: 'done' };
    const [icon, label] = TEA_BTN[TEA_STEPS[st]];
    return { acts: ['teastep'], big: true, defs: { teastep: { icon, label } }, cls: 'invite' };
  },
  async press(a, side) {
    const d = a.data, st = TEA_STEPS[d.step[side]];
    if (!st) { hopPet(side); return; }
    if (st === 'set') await teaSet(a, side);
    else if (st === 'invite') {
      openPanel(side, {
        items: Object.keys(FRIENDS).filter(k => !Object.values(d.friend).includes(k)).map(k => ({ key: k, icon: ICONS[k], word: FRIENDS[k] })),
        onPick: async key => { if (act !== a || d.step[side] !== 1) return; await teaInvite(a, side, key); stepOn(a, side); },
      });
      return;
    } else if (st === 'pour') await teaPour(a, side);
    else if (st === 'sip') {
      await teaSip(a, side);
      if (++d.sips[side] < 2) return;
    }
    stepOn(a, side);
  },
};
function stepOn(a, side) {
  a.data.step[side]++;
  renderColumn(side);
  if (a.data.step.left >= TEA_STEPS.length && a.data.step.right >= TEA_STEPS.length) {
    a.busy = true;
    setTimeout(() => endActivity(true, 'tea'), 900);
  }
}
// where the cups sit on the table (as % of the screen width): the pet's cup, then her friend's
const CUP_X = { left: [39.5, 45.5], right: [60.5, 54.5] };
async function teaSet(a, side) {
  for (const x of CUP_X[side]) {
    const c = actProp(a, ICONS.cups, { left: x + '%', bottom: '15%', width: '7vmin', height: '7vmin', transform: 'translateX(-50%)' }, 13);
    c.innerHTML += '<div class="tea-in"></div>';
    a.data.cups[side].push(c);
    Sound.play('clink');
    await popIn(c);
  }
  mood(pets[side], 'happy', 1000);
}
async function teaInvite(a, side, key) {
  a.data.friend[side] = key;
  const x = side === 'left' ? 44 : 56;
  const f = actProp(a, ICONS[key], { left: x + '%', bottom: '20%', width: '13vmin', height: '13vmin', transform: 'translateX(-50%)' }, 11);
  f.classList.add('friend');
  Sound.play('boing');
  await animate(f, [{ transform: `translateX(${side === 'left' ? -400 : 300}%) translateY(-40%)` }, { transform: 'translateX(-50%) translateY(-30%)', offset: 0.7 }, { transform: 'translateX(-50%) translateY(0)' }], { duration: 800, easing: 'ease-out' });
  mood(pets[side], 'happy', 1200);
  sparkles(f.getBoundingClientRect().left + f.offsetWidth / 2, f.getBoundingClientRect().top, 6);
}
async function teaPour(a, side) {
  const cups = a.data.cups[side];
  const pot = prop(ICONS.teapot, 10, 0, 0);
  pot.style.zIndex = 33;
  pot.style.color = side === 'left' ? 'var(--L)' : 'var(--R)';
  for (const c of cups) {
    const r = c.getBoundingClientRect();
    pot.style.left = r.left + r.width / 2 + (side === 'left' ? -1 : 1) * r.width * 0.6 + 'px';
    pot.style.top = r.top - r.height * 0.6 + 'px';
    pot.firstChild.style.transform = side === 'left' ? 'scaleX(-1)' : '';
    await animate(pot.firstChild, [{ transform: (side === 'left' ? 'scaleX(-1) ' : '') + 'rotate(0)' }, { transform: (side === 'left' ? 'scaleX(-1) ' : '') + 'rotate(-35deg)' }], { duration: 350, fill: 'forwards' });
    Sound.play('pour');
    c.classList.add('full');
    await wait(500);
    sparkles(r.left + r.width / 2, r.top, 3, ['#ffffff', '#ffe7f0']);
  }
  pot.remove();
  mood(pets[side], 'happy', 1000);
}
async function teaSip(a, side) {
  const p = pets[side];
  begin(p, 1200);
  Sound.play('slurp');
  petAnim(p, [{ transform: 'rotate(0)' }, { transform: `rotate(${side === 'left' ? 6 : -6}deg) translateY(3%)` }, { transform: 'rotate(0)' }], { duration: 700 });
  a.data.cups[side].forEach(c => { if (a.data.sips[side] >= 1) c.classList.remove('full'); });
  mood(p, 'happy', 1200);
  floatHearts(p, 1);
  await wait(700);
}
Sound.add('clink', s => { s.tone(s.NOTE(96 + s.k3()), 0, 0.3, { vol: 0.05, echo: 1 }); s.tone(s.NOTE(100), 0.05, 0.25, { vol: 0.03 }); });
Sound.add('pour', s => { s.noise(0, 0.5, { filter: 'bandpass', freq: 1400, to: 700, q: 2, vol: 0.04 }); });
Sound.add('slurp', s => { s.noise(0, 0.3, { filter: 'bandpass', freq: 600, to: 1400, q: 3, vol: 0.05 }); s.tone(s.NOTE(76), 0.32, 0.2, { vol: 0.04 }); });

/* =====================================================================
   THE PUPPET STAGE: each girl picks a prop, then her pet shows its tricks
   ===================================================================== */
const PUPPET_PROPS = { wand: 'wand', mic: 'microphone', tophat: 'top hat', cape: 'cape' };
// where a prop goes on the pet: [left %, top %, width %, height %, behind?]
const PROP_SPOT = { wand: [86, 40, 30, 30], mic: [50, 50, 18, 24], tophat: [50, -16, 34, 34], cape: [50, 42, 86, 60, true] };
ACT_HANDLERS.puppets = side => startActivity('puppets', side);
ACTIVITIES.puppets = {
  async start(a) {
    a.data.prop = {};
    a.data.bowed = { left: false, right: false };
    a.data.open = false;
    await Promise.all([movePet('left', 40, 14, 700), movePet('right', 60, 14, 700)]);
    a.data.stage = actProp(a, `<div class="pstage-top"></div><div class="curtain l"></div><div class="curtain r"></div><div class="pstage-floor"></div>`,
      { left: '50%', bottom: '6%', width: '74vmin', height: '62vmin', transform: 'translateX(-50%)' }, 20);
    a.data.stage.classList.add('pstage', 'open');
    a.cleanup.push(() => SIDES.forEach(s => pets[s].art.querySelectorAll('.pprop').forEach(e => e.remove())));
    await popIn(a.data.stage);
  },
  plan(a, side) {
    const d = a.data;
    if (!d.prop[side]) return { acts: ['pickprop'], big: true, defs: { pickprop: { icon: 'wand', label: 'Prop' } }, cls: 'invite' };
    if (!d.open) return { acts: ['pickprop'], big: true, defs: { pickprop: { icon: d.prop[side], label: '' } }, cls: 'done' };
    const tricks = TRICKS.filter(t => knows(side, t.key)).map(t => t.key);
    ['spin', 'dance'].forEach(k => { if (tricks.length < 2 && !tricks.includes(k)) tricks.push(k); });
    const acts = tricks.slice(0, 3).map(k => 'ptrick:' + k);
    const defs = {};
    acts.forEach(k => { const t = trickBy(k.slice(7)); defs[k] = { icon: t.icon, label: t.word }; });
    defs.pbow = { icon: 'bowTrick', label: 'Bow' };
    return { acts: [...acts, 'pbow'], defs, clsOf: { pbow: d.bowed[side] ? 'done' : '' } };
  },
  async press(a, side, key) {
    const d = a.data;
    if (key === 'pickprop') {
      if (d.prop[side]) { hopPet(side); return; }
      openPanel(side, {
        items: Object.entries(PUPPET_PROPS).map(([k, w]) => ({ key: k, icon: ICONS[k], word: w })),
        onPick: k => { if (act === a && !d.prop[side]) givePuppetProp(a, side, k); },
      });
      return;
    }
    if (!d.open) return;
    if (key === 'pbow') {
      d.bowed[side] = true;
      const p = pets[side];
      begin(p, 1400);
      petAnim(p, [{ transform: 'rotate(0) translateY(0)' }, { transform: `rotate(${side === 'left' ? 14 : -14}deg) translateY(6%)`, offset: 0.4 }, { transform: `rotate(${side === 'left' ? 14 : -14}deg) translateY(6%)`, offset: 0.7 }, { transform: 'rotate(0) translateY(0)' }], { duration: 1100 });
      Sound.play('clap');
      renderColumn(side);
      if (d.bowed.left && d.bowed.right) await finishShow(a);
      return;
    }
    const k = key.slice(7);
    Speech.say(trickBy(k).word);
    await doTrick(side, k, true);
    Sound.play('clap');
  },
};
async function givePuppetProp(a, side, k) {
  const d = a.data;
  d.prop[side] = k;
  const [x, y, w, h, behind] = PROP_SPOT[k], p = pets[side];
  const e = el('div', 'pprop' + (behind ? ' behind' : ''), ICONS[k]);
  Object.assign(e.style, { left: (side === 'right' && k === 'wand' ? 100 - x : x) - w / 2 + '%', top: y + '%', width: w + '%', height: h + '%' });
  if (side === 'right' && k === 'wand') e.firstChild.style.transform = 'scaleX(-1)';
  p.art.append(e);
  animate(e, [{ transform: 'scale(0)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 400, easing: 'ease-out' });
  Sound.play('pick');
  mood(p, 'happy', 1200);
  renderColumn(side);
  if (d.prop.left && d.prop.right) {
    a.busy = true;
    await wait(700);
    // curtains close... and open: showtime!
    d.stage.classList.remove('open');
    await wait(900);
    Sound.play('tada');
    d.stage.classList.add('open');
    d.open = true;
    await wait(600);
    a.busy = false;
    renderColumns();
  }
}
async function finishShow(a) {
  a.busy = true;
  await wait(1200);
  Sound.play('clap');
  const r = a.data.stage.getBoundingClientRect();
  for (let i = 0; i < 6; i++) {
    const f = prop(ICONS.star, 5, r.left + r.width * (0.2 + Math.random() * 0.6), r.bottom);
    f.style.zIndex = 33;
    f.style.color = pick(['#ff8fb8', '#ffd23f', '#c3a6ff']);
    arc(f, { x: r.left + r.width * (i % 2 ? 0.9 : 0.1), y: r.bottom }, { x: r.left + r.width * (0.35 + Math.random() * 0.3), y: r.bottom - r.height * 0.2 }, 800, H() * 0.25, 300).then(() => setTimeout(() => f.remove(), 900));
  }
  await wait(1200);
  a.data.stage.classList.remove('open');
  await wait(900);
  endActivity(true, 'puppets');
}
Sound.add('tada', s => { [[67, 0], [72, 0.12], [76, 0.24], [79, 0.36]].forEach(([m, t]) => s.tone(s.NOTE(m), t, 0.5, { type: 'triangle', vol: 0.08, echo: 1 })); s.tone(s.NOTE(84), 0.5, 0.9, { type: 'triangle', vol: 0.08, echo: 1 }); });
