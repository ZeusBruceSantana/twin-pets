'use strict';
/* Twin Pets: animal friends. Friends are made on visits and trips (say hello together),
   and each girl picks one friend at a time to sit beside her pet. The choosing happens
   in the bedroom, at the Friends button. */

/* ---------- the friends ---------- */
// where each one is met: visitors (visitors.js) or a place in town (trips.js)
const BUDDIES = {
  bunny:  { name: 'Clover',   sound: 'boing' },
  owl:    { name: 'Hoot',     sound: 'hoot' },
  lamb:   { name: 'Woolly',   sound: 'baa' },
  cow:    { name: 'Daisy',    sound: 'moo' },
  piggy:  { name: 'Truffle',  sound: 'oink' },
  frog:   { name: 'Lily',     sound: 'ribbit' },
  duck:   { name: 'Puddle',   sound: 'quack' },
  kitten: { name: 'Whiskers', sound: 'meow' },
  mouse:  { name: 'Squeak',   sound: 'squeak' },
  otter:  { name: 'Ollie',    sound: 'squeak' },
  turtle: { name: 'Tilly',    sound: 'pop' },
  deer:   { name: 'Dotty',    sound: 'whinny' },
  hedgehog: { name: 'Bramble', sound: 'squeak' },
  fox:    { name: 'Rusty',    sound: 'yip' },
  panda:  { name: 'Bao',      sound: 'squeak' },
  penguin: { name: 'Pip',     sound: 'peep' },
  polarbear: { name: 'Frost', sound: 'rawr' },
  unicorn: { name: 'Sparkle', sound: 'whinny' },
  dragon: { name: 'Ember',    sound: 'rawr' },
};
/* The pictures of the newer friends (the first eight come from visitors.js and pictures.js). */
const eye = (x, y) => `<circle cx="${x}" cy="${y}" r="4.5" fill="#3e3a4f"/><circle cx="${x + 1.4}" cy="${y - 1.4}" r="1.4" fill="#fff"/>`;
const FRIEND_ART = {
  mouse: `<svg viewBox="0 0 100 100"><circle cx="22" cy="30" r="16" fill="#cfd6e0" stroke="#9aa6bd" stroke-width="3"/><circle cx="78" cy="30" r="16" fill="#cfd6e0" stroke="#9aa6bd" stroke-width="3"/><circle cx="22" cy="30" r="9" fill="#ffc6d6"/><circle cx="78" cy="30" r="9" fill="#ffc6d6"/><ellipse cx="50" cy="58" rx="30" ry="29" fill="#cfd6e0" stroke="#9aa6bd" stroke-width="3"/>${eye(39, 52)}${eye(61, 52)}<ellipse cx="50" cy="64" rx="5" ry="4" fill="#ff8fab"/><path d="M50 68 V72 M43 73 Q50 79 57 73" stroke="#3e3a4f" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M28 62 H12 M28 68 L14 74 M72 62 H88 M72 68 L86 74" stroke="#9aa6bd" stroke-width="2" stroke-linecap="round"/></svg>`,
  otter: `<svg viewBox="0 0 100 100"><circle cx="24" cy="30" r="9" fill="#b98a5a" stroke="#8a5a3c" stroke-width="3"/><circle cx="76" cy="30" r="9" fill="#b98a5a" stroke="#8a5a3c" stroke-width="3"/><circle cx="50" cy="54" r="34" fill="#b98a5a" stroke="#8a5a3c" stroke-width="3"/><ellipse cx="50" cy="66" rx="20" ry="15" fill="#f1dcbd"/><ellipse cx="50" cy="60" rx="6" ry="4" fill="#3e3a4f"/>${eye(38, 46)}${eye(62, 46)}<path d="M50 64 V68 M43 70 Q50 76 57 70" stroke="#3e3a4f" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M26 62 H14 M26 68 L15 72 M74 62 H86 M74 68 L85 72" stroke="#8a5a3c" stroke-width="2" stroke-linecap="round"/></svg>`,
  turtle: `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="68" rx="42" ry="27" fill="#6cc551" stroke="#3a8a27" stroke-width="3"/><path d="M22 68 H78 M36 46 L32 68 M50 42 V68 M64 46 L68 68" stroke="#3a8a27" stroke-width="2.5" fill="none"/><circle cx="50" cy="32" r="19" fill="#a6e08a" stroke="#3a8a27" stroke-width="3"/>${eye(43, 30)}${eye(57, 30)}<path d="M44 40 Q50 45 56 40" stroke="#3e3a4f" stroke-width="2.5" fill="none" stroke-linecap="round"/><rect x="10" y="84" width="20" height="12" rx="6" fill="#a6e08a" stroke="#3a8a27" stroke-width="3"/><rect x="70" y="84" width="20" height="12" rx="6" fill="#a6e08a" stroke="#3a8a27" stroke-width="3"/></svg>`,
  deer: `<svg viewBox="0 0 100 100"><path d="M34 26 L26 8 M26 8 L16 14 M26 8 L24 -2 M66 26 L74 8 M74 8 L84 14 M74 8 L76 -2" stroke="#8a5a3c" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="20" cy="38" rx="12" ry="7" fill="#d9a066" stroke="#a9703a" stroke-width="3" transform="rotate(-25 20 38)"/><ellipse cx="80" cy="38" rx="12" ry="7" fill="#d9a066" stroke="#a9703a" stroke-width="3" transform="rotate(25 80 38)"/><ellipse cx="50" cy="56" rx="28" ry="34" fill="#d9a066" stroke="#a9703a" stroke-width="3"/><ellipse cx="50" cy="74" rx="16" ry="12" fill="#f6e3c8"/><ellipse cx="50" cy="70" rx="5" ry="3.6" fill="#3e3a4f"/>${eye(39, 50)}${eye(61, 50)}<g fill="#fff"><circle cx="36" cy="30" r="2.5"/><circle cx="64" cy="30" r="2.5"/><circle cx="50" cy="24" r="2.5"/></g></svg>`,
  hedgehog: `<svg viewBox="0 0 100 100"><path d="M6 70 L10 40 L20 52 L24 26 L36 42 L44 16 L54 40 L66 22 L70 44 L84 32 L84 54 L94 52 L92 74Z" fill="#8a6a4f" stroke="#5d4a3a" stroke-width="3" stroke-linejoin="round"/><ellipse cx="50" cy="66" rx="34" ry="26" fill="#ffd9b8" stroke="#d9a074" stroke-width="3"/>${eye(38, 60)}${eye(62, 60)}<ellipse cx="50" cy="72" rx="6" ry="4.5" fill="#3e3a4f"/><path d="M42 80 Q50 85 58 80" stroke="#3e3a4f" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`,
  fox: `<svg viewBox="0 0 100 100"><path d="M10 32 L22 6 L42 24 Q50 22 58 24 L78 6 L90 32 Q96 62 50 92 Q4 62 10 32Z" fill="#ff9a4d" stroke="#d9661f" stroke-width="3" stroke-linejoin="round"/><path d="M22 18 L32 28 L20 34Z M78 18 L68 28 L80 34Z" fill="#3e3a4f"/><path d="M26 62 Q50 96 74 62 Q50 54 26 62Z" fill="#fff"/>${eye(36, 46)}${eye(64, 46)}<ellipse cx="50" cy="72" rx="5.5" ry="4" fill="#3e3a4f"/></svg>`,
  panda: `<svg viewBox="0 0 100 100"><circle cx="22" cy="24" r="12" fill="#3e3a4f"/><circle cx="78" cy="24" r="12" fill="#3e3a4f"/><circle cx="50" cy="56" r="36" fill="#fff" stroke="#3e3a4f" stroke-width="3"/><ellipse cx="36" cy="50" rx="9" ry="12" fill="#3e3a4f" transform="rotate(20 36 50)"/><ellipse cx="64" cy="50" rx="9" ry="12" fill="#3e3a4f" transform="rotate(-20 64 50)"/><circle cx="37" cy="50" r="3.5" fill="#fff"/><circle cx="63" cy="50" r="3.5" fill="#fff"/><ellipse cx="50" cy="66" rx="6" ry="4.5" fill="#3e3a4f"/><path d="M43 74 Q50 80 57 74" stroke="#3e3a4f" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`,
  penguin: `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="54" rx="36" ry="40" fill="#3e4a6f" stroke="#2b3556" stroke-width="3"/><ellipse cx="50" cy="64" rx="24" ry="29" fill="#fff"/><circle cx="38" cy="40" r="7" fill="#fff"/><circle cx="62" cy="40" r="7" fill="#fff"/>${eye(39, 41)}${eye(61, 41)}<path d="M42 50 L50 60 L58 50Z" fill="#ffa24d" stroke="#e07a2a" stroke-width="2" stroke-linejoin="round"/><path d="M38 74 L50 80 L62 74 L62 86 L50 80 L38 86Z" fill="#ff6b7a" stroke="#c23b4b" stroke-width="2" stroke-linejoin="round"/><ellipse cx="34" cy="94" rx="11" ry="5" fill="#ffa24d"/><ellipse cx="66" cy="94" rx="11" ry="5" fill="#ffa24d"/></svg>`,
  polarbear: `<svg viewBox="0 0 100 100"><circle cx="24" cy="26" r="10" fill="#fff" stroke="#b6c8da" stroke-width="3"/><circle cx="76" cy="26" r="10" fill="#fff" stroke="#b6c8da" stroke-width="3"/><circle cx="50" cy="56" r="36" fill="#fff" stroke="#b6c8da" stroke-width="3"/><ellipse cx="50" cy="68" rx="18" ry="14" fill="#eaf2fa"/><ellipse cx="50" cy="62" rx="6" ry="4.5" fill="#3e3a4f"/>${eye(37, 48)}${eye(63, 48)}<path d="M50 66 V70 M43 72 Q50 78 57 72" stroke="#3e3a4f" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="30" cy="62" r="4" fill="#ffc6d6" opacity=".7"/><circle cx="70" cy="62" r="4" fill="#ffc6d6" opacity=".7"/></svg>`,
  unicorn: `<svg viewBox="0 0 100 100"><path d="M50 -2 L42 26 H58Z" fill="#ffd23f" stroke="#c9a000" stroke-width="2.5" stroke-linejoin="round"/><path d="M42 14 H56 M44 22 H54" stroke="#c9a000" stroke-width="2"/><path d="M26 24 L30 4 L44 22Z M74 24 L70 4 L56 22Z" fill="#fff" stroke="#c9b6e8" stroke-width="3" stroke-linejoin="round"/><path d="M20 40 C 4 48, 8 74, 22 80 C 18 66, 24 54, 30 48Z" fill="#ff9ad0" stroke="#d9608f" stroke-width="2.5"/><path d="M26 30 C 8 36, 8 56, 16 62 C 14 50, 22 42, 30 38Z" fill="#c3a6ff" stroke="#8b7fd1" stroke-width="2.5"/><ellipse cx="54" cy="58" rx="28" ry="32" fill="#fff" stroke="#c9b6e8" stroke-width="3"/><ellipse cx="54" cy="76" rx="16" ry="11" fill="#ffeaf4"/><circle cx="48" cy="76" r="2" fill="#d9608f"/><circle cx="60" cy="76" r="2" fill="#d9608f"/>${eye(44, 52)}${eye(66, 52)}<path d="M38 46 l-4 -3 M72 46 l4 -3" stroke="#3e3a4f" stroke-width="2" stroke-linecap="round"/><circle cx="36" cy="64" r="4" fill="#ffb3c8" opacity=".7"/><circle cx="72" cy="64" r="4" fill="#ffb3c8" opacity=".7"/></svg>`,
  dragon: `<svg viewBox="0 0 100 100"><path d="M26 28 L22 8 L40 22Z M74 28 L78 8 L60 22Z" fill="#fff0c9" stroke="#d9b06a" stroke-width="3" stroke-linejoin="round"/><path d="M42 20 L50 6 L58 20Z" fill="#ffa24d" stroke="#e07a2a" stroke-width="2" stroke-linejoin="round"/><ellipse cx="16" cy="48" rx="10" ry="14" fill="#8fd16a" stroke="#3a8a27" stroke-width="3"/><ellipse cx="84" cy="48" rx="10" ry="14" fill="#8fd16a" stroke="#3a8a27" stroke-width="3"/><circle cx="50" cy="52" r="34" fill="#6cc551" stroke="#3a8a27" stroke-width="3"/><ellipse cx="50" cy="68" rx="20" ry="15" fill="#c9f0a8"/><circle cx="43" cy="66" r="2.6" fill="#3a8a27"/><circle cx="57" cy="66" r="2.6" fill="#3a8a27"/>${eye(38, 46)}${eye(62, 46)}<path d="M42 76 Q50 82 58 76" stroke="#3a8a27" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M45 77 l2 4 l2 -4 M51 77 l2 4 l2 -4" fill="#fff"/></svg>`,
};
const friendArt = k => FRIEND_ART[k] || (k === 'bunny' ? ICONS.bunny : k === 'owl' ? ICONS.owl : k === 'duck' ? ICONS.duck : PEEKERS[k].svg);
Object.keys(BUDDIES).forEach(k => { ICONS['friend-' + k] = friendArt(k); });
ICONS.moo = PEEKERS.cow.svg;   // the farm's Animals button
ICONS.friends = '<svg viewBox="0 0 100 100"><path d="M14 56 C 14 46, 24 42, 50 42 C 76 42, 86 46, 86 56 L80 86 C 79 90, 76 92, 72 92 H28 C 24 92, 21 90, 20 86Z" fill="#e8b071" stroke="#c98a3c" stroke-width="4" stroke-linejoin="round"/><path d="M26 56 H74 M24 70 H76" stroke="#c98a3c" stroke-width="3" opacity=".6"/><ellipse cx="36" cy="30" rx="6" ry="14" fill="#f6efe8" stroke="#b9a99a" stroke-width="3"/><ellipse cx="54" cy="30" rx="6" ry="14" fill="#f6efe8" stroke="#b9a99a" stroke-width="3"/><circle cx="45" cy="46" r="14" fill="#f6efe8" stroke="#b9a99a" stroke-width="3"/><circle cx="40" cy="44" r="2.5" fill="#3e3a4f"/><circle cx="50" cy="44" r="2.5" fill="#3e3a4f"/><path d="M76 20 C 70 14, 62 18, 66 26 C 68 30, 76 34, 76 34 C 76 34, 84 30, 86 26 C 90 18, 82 14, 76 20Z" fill="#ff7a9a"/></svg>';

const myFriends = () => S.friends.have.filter(k => BUDDIES[k]);
const friendOf = side => (BUDDIES[S.friends.pick[side]] ? S.friends.pick[side] : null);

/* ---------- making a friend ---------- */
/* Both girls said hello: the friend joins the collection (once). Returns true if it is new. */
function meetFriend(kind) {
  if (!BUDDIES[kind] || S.friends.have.includes(kind)) return false;
  S.friends.have.push(kind);
  save();
  renderBuddies();
  renderColumns();
  logDay('friend-' + kind);
  return true;
}
/* A little celebration: the friend's picture and name, and confetti. */
function friendMade(kind) {
  showHint('friend-' + kind, BUDDIES[kind].name, true);
  celebrate(W() / 2, H() * 0.46, 14);
}
/* The next friend this place has to offer (one that is not yet a friend), or null. */
const nextFriendAt = place => (PLACE_FRIENDS[place] || []).find(k => !S.friends.have.includes(k)) || null;
const PLACE_FRIENDS = { farm: ['lamb', 'cow', 'piggy'], park: ['frog', 'duck'], library: ['kitten', 'mouse'], snowhill: ['polarbear'],
  river: ['otter', 'turtle'], woods: ['deer', 'hedgehog', 'fox'], museum: ['panda'], restaurant: ['penguin'] };
/* Friends that only a puzzle prize can bring (every third puzzle), in this order. */
const PUZZLE_FRIENDS = ['unicorn', 'dragon'];

/* ---------- the friend beside each pet ---------- */
function renderBuddy(side) {
  const p = pets[side];
  if (!p) return;
  const kind = friendOf(side);
  let b = p.root.querySelector('.buddy');
  if (!kind) { if (b) b.remove(); return; }
  if (b && b.dataset.kind === kind) return;
  if (b) b.remove();
  b = el('div', 'buddy side-' + side, `<div class="bbody">${friendArt(kind)}</div><div class="bname"></div>`);
  b.dataset.kind = kind;
  sayableInto(b.querySelector('.bname'), BUDDIES[kind].name);
  p.root.append(b);
  onTap(b.querySelector('.bbody'), () => buddyTapped(side));
}
function renderBuddies() { SIDES.forEach(renderBuddy); }
DRESS_HOOKS.push(renderBuddy);
function buddyTapped(side) {
  const b = pets[side].root.querySelector('.buddy');
  if (!b || scene !== 'play') return;
  const F = BUDDIES[b.dataset.kind];
  Sound.play(F.sound);
  animate(b.firstChild, [{ transform: 'translateY(0)' }, { transform: 'translateY(-22%) scale(1.08)' }, { transform: 'translateY(0)' }, { transform: 'translateY(-8%)' }, { transform: 'translateY(0)' }], { duration: 700, easing: 'ease-out' });
  const r = b.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top, 5);
  b.classList.add('named');
  clearTimeout(b.nameTimer);
  b.nameTimer = setTimeout(() => b.classList.remove('named'), 2600);
}

/* ---------- choosing a friend (the bedroom) ---------- */
BUTTONS.friends = { icon: 'friends', label: 'Friends' };
ROOMS.bedroom.acts.push('friends');
FEATURE_OF.friends = 'friends';
// The Friends button appears as soon as the first friend is made.
NEW_THINGS.push({ key: 'friends', order: -0.5, when: () => myFriends().length > 0, room: 'bedroom', acts: ['friends'], icon: 'friends', word: 'friends' });
// The first friend: the Friends button doesn't wait for its turn, so both girls can choose right away.
const friendsThing = NEW_THINGS[NEW_THINGS.length - 1];
setInterval(() => {
  if (has('friends') || !myFriends().length || scene !== 'play' || $('#hint').classList.contains('show')) return;
  introduce(friendsThing);
}, 3000);
ACT_HANDLERS.friends = side => {
  const mine = friendOf(side), hers = friendOf(other(side));
  Sound.play('door');
  openPanel(side, {
    head: side, keepOpen: true, cols: myFriends().length > 4 ? 3 : 2,
    items: myFriends().map(k => ({ key: k, icon: friendArt(k), word: BUDDIES[k].name, cls: k === mine ? 'on' : k === hers ? 'taken' : '' })),
    onPick: (k, card) => pickFriend(side, k, card),
  });
};
function pickFriend(side, kind, card) {
  if (friendOf(other(side)) === kind) { nudge(card); return; }       // her sister has this one right now
  S.friends.pick[side] = friendOf(side) === kind ? null : kind;      // tap again to put it back
  save();
  renderBuddy(side);
  Sound.play(BUDDIES[kind].sound);
  hopPet(side);
  mood(pets[side], 'happy', 900);
  const b = pets[side].root.querySelector('.buddy');
  if (b) animate(b, [{ transform: 'scale(0)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 350, easing: 'ease-out' });
  SIDES.forEach(s => {                                               // refresh both panels
    const pn = panels[s];
    if (!pn) return;
    pn.lastTouch = now();
    pn.querySelectorAll('.scard').forEach(c => {
      c.classList.toggle('on', c.dataset.key === friendOf(s));
      c.classList.toggle('taken', c.dataset.key === friendOf(other(s)));
    });
  });
}

/* ---------- memory book ---------- */
Object.keys(BUDDIES).forEach(k => { BOOK_LINES['friend-' + k] = { line: `made a new friend, ${BUDDIES[k].name}.`, icon: 'friend-' + k, rank: 96 }; });

Sound.add('squeak', s => { s.tone(s.NOTE(93), 0, 0.08, { to: s.NOTE(98), vol: 0.04 }); s.tone(s.NOTE(95), 0.12, 0.08, { to: s.NOTE(100), vol: 0.04 }); });
Sound.add('whinny', s => { s.tone(s.NOTE(79), 0, 0.5, { to: s.NOTE(91), glide: 0.1, type: 'triangle', vol: 0.05 }); s.tone(s.NOTE(88), 0.25, 0.3, { to: s.NOTE(76), type: 'triangle', vol: 0.04 }); });
Sound.add('yip', s => { s.tone(s.NOTE(84), 0, 0.1, { to: s.NOTE(93), vol: 0.05 }); s.tone(s.NOTE(84), 0.16, 0.1, { to: s.NOTE(93), vol: 0.05 }); });
Sound.add('rawr', s => { s.tone(s.NOTE(48), 0, 0.5, { to: s.NOTE(58), type: 'triangle', vol: 0.07, attack: 0.05 }); });
