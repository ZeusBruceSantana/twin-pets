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
};
const friendArt = k => k === 'bunny' ? ICONS.bunny : k === 'owl' ? ICONS.owl : k === 'duck' ? ICONS.duck : PEEKERS[k].svg;
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
const PLACE_FRIENDS = { farm: ['lamb', 'cow', 'piggy'], park: ['frog', 'duck'], library: ['kitten'] };

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
