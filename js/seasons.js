'use strict';
/* Twin Pets: weather, Halloween and the pets' birthday. */

/* =====================================================================
   WEATHER: each day has its own weather outside (the same all day).
   Rain leaves puddles (jumping in makes the pets muddy); in winter, snow.
   ===================================================================== */
function weatherToday(d = new Date()) {
  const key = todayKey(d);
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) % 1000003;
  const roll = (h % 100) / 100, m = d.getMonth();
  if ([11, 0, 1].includes(m) && roll < 0.45) return 'snow';     // December to February
  if (roll > 0.72) return 'rain';
  return 'sun';
}
let weather = weatherToday();
const OUTSIDE = ['backyard', 'frontyard'];
ROOM_EXTRAS.push((box, room) => {
  if (!OUTSIDE.includes(room)) return;
  box.append(el('div', 'rainfall'), el('div', 'snowfall'), el('div', 'snowground'));
});
function renderWeather() {
  weather = weatherToday();
  document.body.classList.toggle('w-rain', weather === 'rain');
  document.body.classList.toggle('w-snow', weather === 'snow');
  renderThings();
}
DRESS_HOOKS.push(side => { if (side === 'left') renderWeather(); });

/* ---------- puddles: tap one and that pet jumps in ---------- */
Object.assign(ICONS, {
  puddle: '<svg viewBox="0 0 100 40"><path d="M8 22 C 6 10, 30 6, 44 10 C 58 4, 90 6, 92 20 C 96 34, 64 38, 48 34 C 30 40, 10 34, 8 22Z" fill="#8fb8e0" stroke="#6a96c8" stroke-width="3"/><ellipse cx="34" cy="16" rx="10" ry="3" fill="#fff" opacity=".6"/></svg>',
  snowman: '<svg viewBox="0 0 100 100"><circle cx="50" cy="74" r="22" fill="#fff" stroke="#c9d8ea" stroke-width="3"/><circle cx="50" cy="40" r="16" fill="#fff" stroke="#c9d8ea" stroke-width="3"/><circle cx="44" cy="36" r="2.5" fill="#3e3a4f"/><circle cx="56" cy="36" r="2.5" fill="#3e3a4f"/><path d="M50 42 L64 46 L50 46Z" fill="#ffa24d"/><rect x="36" y="10" width="28" height="16" rx="3" fill="#ff6b7a"/><rect x="30" y="24" width="40" height="5" rx="2" fill="#ff6b7a"/></svg>',
});
['backyard', 'frontyard'].forEach(room => SIDES.forEach(side => {
  const t = roomThing('puddle-' + room + '-' + side, room, () => weather === 'rain', ICONS.puddle,
    { left: (side === 'left' ? 29.5 : 70.5) + '%', bottom: '1%', width: '24vmin', height: '8vmin' });
  t.classList.add('puddle');
  onPress(t, () => { thingTapped('puddle-' + room + '-' + side); jumpInPuddle(side); });
}));
async function jumpInPuddle(side) {
  if (scene !== 'play' || weather !== 'rain') return;
  const p = pets[side];
  if (p.asleep) wakePet(side, true);
  begin(p, 1300);
  Sound.play('splash');
  await petAnim(p, [{ transform: 'translateY(0)' }, { transform: 'translateY(-16%)', offset: 0.45 }, { transform: 'translateY(0) scale(1.08,.9)', offset: 0.8 }, { transform: 'translateY(0)' }], { duration: 700, easing: 'ease-out' });
  const m = petPoint(p, 0.5, 1);
  sparkles(m.x, m.y, 12, ['#8fb8e0', '#a9744f', '#ffffff']);
  S.pets[side].mud = Math.min(3, (S.pets[side].mud || 0) + 1);
  save();
  renderMud(side);
  mood(p, 'happy', 1400);
  Sound.play('giggle');
}

/* ---------- snow: build a snowman together ---------- */
const snowman = roomThing('snowman', 'backyard', () => weather === 'snow', `<svg viewBox="0 0 100 120">
  <g class="sp s0"><ellipse cx="50" cy="112" rx="36" ry="8" fill="#fff"/></g>
  <g class="sp s1"><circle cx="50" cy="92" r="24" fill="#fff" stroke="#c9d8ea" stroke-width="3"/></g>
  <g class="sp s2"><circle cx="50" cy="58" r="17" fill="#fff" stroke="#c9d8ea" stroke-width="3"/><circle cx="50" cy="54" r="2" fill="#3e3a4f"/><circle cx="50" cy="62" r="2" fill="#3e3a4f"/></g>
  <g class="sp s3"><circle cx="50" cy="30" r="13" fill="#fff" stroke="#c9d8ea" stroke-width="3"/><circle cx="45" cy="27" r="2.2" fill="#3e3a4f"/><circle cx="55" cy="27" r="2.2" fill="#3e3a4f"/><path d="M50 31 L62 34 L50 35Z" fill="#ffa24d"/></g>
  <g class="sp s4"><rect x="38" y="4" width="24" height="14" rx="3" style="fill:var(--L)"/><rect x="33" y="16" width="34" height="4" rx="2" style="fill:var(--R)"/><path d="M34 62 L14 50 M66 62 L86 50" stroke="#8a5a3c" stroke-width="3" stroke-linecap="round"/></g></svg>`,
  { left: '50%', bottom: '19%', width: '17vmin', height: '20vmin' });
let snowStep = 0;
const snowBy = { left: false, right: false };
function renderSnowman() { snowman.querySelectorAll('.sp').forEach((g, i) => { g.style.opacity = i <= snowStep ? 1 : 0; }); }
renderSnowman();
onPress(snowman, e => {
  if (scene !== 'play' || weather !== 'snow') return;
  thingTapped('snowman');
  const side = e.clientX < W() / 2 ? 'left' : 'right';
  snowBy[side] = true;
  hopPet(side);
  if (snowStep >= 4) { Sound.play('boing'); animate(snowman.firstChild, [{ transform: 'rotate(0)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(5deg)' }, { transform: 'rotate(0)' }], { duration: 500 }); return; }
  snowStep++;
  renderSnowman();
  Sound.play('plop');
  const r = snowman.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top + r.height * 0.4, 6, ['#ffffff', '#dff4fb', '#c9d8ea']);
  if (snowStep === 4) {
    Sound.play('yay');
    SIDES.forEach(s => floatHearts(pets[s], 2));
    if (snowBy.left && snowBy.right) togetherMoment('snowman');
  }
});
BOOK_LINES.snowman = { line: 'built a snowman.', icon: 'snowman', rank: 96 };

/* =====================================================================
   HALLOWEEN: cute costumes in the closet all October
   ===================================================================== */
const isOctober = () => new Date().getMonth() === 9;
Object.assign(ITEM_ART, {
  pumpkinhat: () => `<svg viewBox="0 0 100 80"><g fill="#ffa24d" stroke="#e07a2a" stroke-width="3"><ellipse cx="30" cy="48" rx="20" ry="26"/><ellipse cx="70" cy="48" rx="20" ry="26"/><ellipse cx="50" cy="48" rx="22" ry="28"/></g><path d="M50 22 C 48 12, 52 6, 58 4" stroke="#4f9a34" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M56 12 C 66 4, 78 8, 80 14 C 70 18, 60 18, 56 12Z" fill="#7fd36a"/></svg>`,
  witchhat: c => `<svg viewBox="0 0 100 100"><path d="M50 4 C 56 30, 64 50, 74 70 H26 C 36 50, 44 30, 50 4Z" fill="#7a5aa8" stroke="#5a3e88" stroke-width="3" stroke-linejoin="round"/><ellipse cx="50" cy="74" rx="46" ry="12" fill="#7a5aa8" stroke="#5a3e88" stroke-width="3"/><rect x="30" y="58" width="40" height="9" fill="${c.main}"/><path d="M54 30 l3 6 l6 1 l-5 4 l1 6 l-5 -3 l-5 3 l1 -6 l-5 -4 l6 -1z" fill="#ffd23f"/></svg>`,
  batwings: () => `<svg viewBox="0 0 160 70"><path d="M80 30 C 60 6, 30 0, 4 10 C 14 18, 12 26, 6 32 C 18 30, 24 38, 22 46 C 34 40, 42 46, 44 54 C 54 44, 66 40, 80 40Z M80 30 C 100 6, 130 0, 156 10 C 146 18, 148 26, 154 32 C 142 30, 136 38, 138 46 C 126 40, 118 46, 116 54 C 106 44, 94 40, 80 40Z" fill="#5d5470" stroke="#3e3a4f" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
});
Object.assign(WEARABLES, { pumpkinhat: 'head', witchhat: 'head', batwings: 'back' });
Object.assign(WEAR_SPOT, { pumpkinhat: [50, -8, 34, 27], witchhat: [50, -22, 46, 42], batwings: [50, 26, 112, 48] });
Object.assign(ITEM_WORD, { pumpkinhat: 'pumpkin', witchhat: 'witch hat', batwings: 'bat wings' });
NOT_PRESENTS.push('pumpkinhat', 'witchhat', 'batwings', 'glasses');
['pumpkinhat', 'witchhat', 'batwings'].forEach(k => { CLOSET_BASICS.push(k); CLOSET_SHOW[k] = isOctober; });
NEW_THINGS.push({ key: 'costumes', order: 0.5, room: 'bedroom', acts: ['closet'], icon: 'pumpkin', word: 'costumes', when: isOctober, requires: 'closet' });
// pumpkins by the front door in October
ROOM_EXTRAS.push((box, room) => {
  if (room !== 'frontyard') return;
  [[37, 'l'], [63, 'r']].forEach(([x, s]) => {
    const e = el('div', 'deco jack ' + s, `<svg viewBox="0 0 100 80"><g fill="#ffa24d" stroke="#e07a2a" stroke-width="3"><ellipse cx="32" cy="48" rx="20" ry="26"/><ellipse cx="68" cy="48" rx="20" ry="26"/><ellipse cx="50" cy="48" rx="22" ry="28"/></g><path d="M50 22 C 48 12, 52 6, 58 4" stroke="#4f9a34" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M36 42 l6 -8 l6 8z M52 42 l6 -8 l6 8z" fill="#7a4a1a"/><path d="M36 56 Q50 68 64 56 Q50 62 36 56Z" fill="#7a4a1a"/></svg>`);
    e.style.left = x + '%';
    box.append(e);
  });
});
DRESS_HOOKS.push(side => { if (side === 'left') document.body.classList.toggle('october', isOctober()); });

/* =====================================================================
   THE PETS' BIRTHDAY (set in the grown-up corner): a party with cake
   ===================================================================== */
const isBirthday = () => { const b = S.birthday, d = new Date(); return !!b && b.month === d.getMonth() + 1 && b.day === d.getDate(); };
SESSION_HOOKS.push(() => {
  if (!isBirthday() || S.birthdayDone === todayKey()) return;
  setTimeout(function tryParty(n = 0) {
    if (scene === 'play' && !S.bedtime) startActivity('birthday', 'left');
    else if (n < 60) setTimeout(() => tryParty(n + 1), 2000);
  }, 3000);
});
DRESS_HOOKS.push(side => {         // party hats all day
  const art = pets[side].art;
  art.querySelectorAll('.partyhat').forEach(e => e.remove());
  if (isBirthday()) art.append(el('div', 'partyhat', `<svg viewBox="0 0 60 70"><path d="M30 4 L52 64 H8Z" style="fill:var(--${side === 'left' ? 'L' : 'R'})" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path d="M20 34 L40 34 M15 50 L45 50" stroke="#fff" stroke-width="4"/><circle cx="30" cy="5" r="6" fill="#ffd23f"/></svg>`));
});
ACTIVITIES.birthday = {
  async start(a) {
    S.birthdayDone = todayKey();
    save();
    a.data.blown = { left: false, right: false };
    const banner = actProp(a, '<div class="bbanner"></div>', { left: '50%', top: '40%', transform: 'translateX(-50%)' }, 30);
    wordsInto(banner.querySelector('.bbanner'), 'Happy birthday!');
    banner.style.pointerEvents = 'auto';
    for (let i = 0; i < 8; i++) {
      const b = actProp(a, ICONS.balloon.replace(/#a77bff/g, ['#ff8fb8', '#ffd23f', '#7fd1ff', '#a6e08a', '#c3a6ff'][i % 5]), { left: (24 + i * 7.5) + '%', bottom: '-20%', width: '7vmin', height: '10vmin' }, 7);
      animate(b, [{ transform: 'translateY(0)' }, { transform: `translateY(-${rand(70, 95)}vh)` }], { duration: rand(2500, 4000), fill: 'forwards', easing: 'ease-out' });
    }
    await Promise.all([movePet('left', 34, 12, 700), movePet('right', 66, 12, 700)]);
    a.data.cake = actProp(a, `<svg viewBox="0 0 100 90"><rect x="12" y="40" width="76" height="46" rx="8" fill="#ffd9e8" stroke="#f08bb0" stroke-width="4"/><path d="M12 52 C 22 62, 30 48, 40 56 C 50 64, 58 48, 68 56 C 76 62, 82 52, 88 54" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>
      <g stroke-width="5" stroke-linecap="round"><path d="M34 40 V24" stroke="var(--L)"/><path d="M66 40 V24" stroke="var(--R)"/></g>
      <g class="flame l"><ellipse cx="34" cy="17" rx="4" ry="7" fill="#ffb020"/><ellipse cx="34" cy="19" rx="2" ry="3.5" fill="#fff3a0"/></g><g class="flame r"><ellipse cx="66" cy="17" rx="4" ry="7" fill="#ffb020"/><ellipse cx="66" cy="19" rx="2" ry="3.5" fill="#fff3a0"/></g></svg>`,
      { left: '50%', bottom: '8%', width: '22vmin', height: '20vmin', transform: 'translateX(-50%)' }, 12);
    a.data.cake.classList.add('bcake');
    await popIn(a.data.cake);
    Sound.play('birthday');
  },
  plan(a, side) {
    return { acts: ['blow'], big: true, defs: { blow: { icon: 'cake', label: 'Blow' } }, cls: a.data.blown[side] ? 'done' : 'invite' };
  },
  async press(a, side) {
    if (a.data.blown[side]) { hopPet(side); return; }
    a.data.blown[side] = true;
    Sound.play('blow');
    const f = a.data.cake.querySelector('.flame.' + side[0]);
    animate(f, [{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
    hopPet(side);
    renderColumn(side);
    if (!(a.data.blown.left && a.data.blown.right)) return;
    a.busy = true;
    await wait(400);
    Sound.play('yay');
    for (let i = 0; i < 5; i++) { sparkles(rand(0.25, 0.75) * W(), rand(0.2, 0.5) * H(), 10, ['#ff8fb8', '#ffd23f', '#7fd1ff', '#a6e08a', '#c3a6ff']); await wait(200); }
    SIDES.forEach(s => floatHearts(pets[s], 4));
    await wait(1200);
    endActivity(true, 'birthday');
  },
};
BOOK_LINES.birthday = { line: 'had a birthday party!', icon: 'cake', rank: 101 };
// an original little party tune (not the birthday song)
Sound.add('birthday', s => {
  s.melody([[72, .5], [76, .5], [79, 1], [77, .5], [74, .5], [76, 1], [79, .5], [84, .5], [83, .5], [81, .5], [79, 2]], 132, { vol: 0.08, echo: 1, music: 1 });
  s.melody([[48, 2], [53, 2], [55, 2], [48, 2]], 132, { vol: 0.05, type: 'sine', music: 1 });
});
Sound.add('blow', s => { s.noise(0, 0.5, { filter: 'lowpass', freq: 1200, to: 300, vol: 0.08, attack: 0.05 }); });
