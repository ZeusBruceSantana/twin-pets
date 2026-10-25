'use strict';
/* Twin Pets: the dress-up closet in the bedroom. Everything the pet owns to wear, any time. */

ITEM_ART.glasses = c => `<svg viewBox="0 0 120 44"><path d="M56 18 H64" stroke="${c.dark}" stroke-width="4" stroke-linecap="round"/>
  <g fill="#5d4a7a" fill-opacity=".55" stroke="${c.main}" stroke-width="5" stroke-linejoin="round">
  <path d="M32 40 C 14 30, 4 22, 6 12 C 8 3, 22 1, 32 10 C 42 1, 56 3, 58 12 C 60 22, 50 30, 32 40Z"/>
  <path d="M88 40 C 70 30, 60 22, 62 12 C 64 3, 78 1, 88 10 C 98 1, 112 3, 114 12 C 116 22, 106 30, 88 40Z"/></g>
  <path d="M16 12 l6 -3 M72 12 l6 -3" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/></svg>`;
WEARABLES.glasses = 'face';
WEAR_SPOT.glasses = [50, 33, 64, 19];
ICONS.closet = '<svg viewBox="0 0 100 100"><rect x="14" y="8" width="72" height="86" rx="6" fill="#e6c7a0" stroke="#b9895a" stroke-width="4"/><path d="M50 10 V92" stroke="#b9895a" stroke-width="4"/><circle cx="43" cy="52" r="3.5" fill="#b9895a"/><circle cx="57" cy="52" r="3.5" fill="#b9895a"/><path d="M26 20 h16 M58 20 h16" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6"/></svg>';

// Things every pet has in her closet, even before any presents.
const CLOSET_BASICS = ['glasses'];
function closetItems(side) {
  const ps = S.pets[side];
  const all = [...new Set([...ps.owned.filter(i => WEARABLES[i]), ...CLOSET_BASICS.filter(i => !CLOSET_SHOW[i] || CLOSET_SHOW[i]())])];
  return all.map(i => ({ key: i, icon: ITEM_ART[i](itemColor(side, i)), word: ITEM_WORD[i] || i, cls: ps.wear[WEARABLES[i]] === i ? 'on' : '' }));
}
const CLOSET_SHOW = {};   // basics that only show sometimes (like costumes in October)
const ITEM_WORD = { glasses: 'glasses' };
const CLOSET_TABS = {   // wordless tabs: a picture for each kind of thing
  head: { art: 'crown' }, face: { art: 'glasses' }, neck: { art: 'bowtie' }, back: { art: 'cape' },
  colors: { svg: c => `<svg viewBox="0 0 100 100"><path d="M50 10 C20 10 6 34 10 58 C14 82 36 92 52 88 C62 86 58 74 66 70 C80 66 94 62 92 46 C88 22 72 10 50 10Z" fill="#f3d9b1" stroke="#b9895a" stroke-width="5"/><circle cx="32" cy="42" r="8" fill="#ff7eb6"/><circle cx="52" cy="28" r="8" fill="#5aa9ff"/><circle cx="72" cy="42" r="8" fill="#ffc93c"/><circle cx="30" cy="66" r="8" fill="#6cc551"/></svg>` },
};
const closetTab = { left: null, right: null };   // the last tab each girl had open (while the game is open)
const closetCards = (side, tab) => tab === 'colors'
  ? COLORS.map(c => ({ key: c.id, icon: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="${c.main}" stroke="${c.dark}" stroke-width="8"/><circle cx="36" cy="36" r="10" fill="#fff" opacity=".5"/></svg>`, word: '', say: c.id, cls: colorsWorn(side) === c.id ? 'on' : '' }))
  : closetItems(side).filter(it => WEARABLES[it.key] === tab);
// the color of the things she is wearing now (when they all match)
function colorsWorn(side) {
  const ps = S.pets[side], ids = new Set(Object.values(ps.wear).filter(Boolean).map(i => itemColor(side, i).id));
  return ids.size === 1 ? [...ids][0] : null;
}
ACT_HANDLERS.closet = side => {
  Sound.play('door');
  const full = ['head', 'face', 'neck', 'back'].find(t => closetCards(side, t).length) || 'head';
  let tab = closetTab[side] || full;
  openPanel(side, {
    head: side, keepOpen: true, items: closetCards(side, tab), tab,
    tabs: Object.keys(CLOSET_TABS).map(k => ({ key: k, icon: CLOSET_TABS[k].art ? ITEM_ART[CLOSET_TABS[k].art](itemColor(side, CLOSET_TABS[k].art)) : CLOSET_TABS[k].svg() })),
    onTab: k => { tab = closetTab[side] = k; return closetCards(side, k); },
    onPick: (item, card) => tab === 'colors' ? paintOutfit(side, item) : wearItem(side, item, card),
  });
};
// Colors tab: everything her pet is wearing now turns this color.
function paintOutfit(side, colorId) {
  const ps = S.pets[side];
  Object.values(ps.wear).filter(Boolean).forEach(i => { ps.gifted[i] = colorId; });
  save();
  renderWear(side);
  Sound.play('pick');
  hopPet(side);
  mood(pets[side], 'happy', 900);
  const p = panels[side];
  if (p) { p.lastTouch = now(); p.querySelectorAll('.scard').forEach(c => c.classList.toggle('on', c.dataset.key === colorsWorn(side))); }
}
// One time: gifts used the giver's color, so a pet's things came out in her sister's color. Draw them in her own.
if (!S.giftColorFixed) {
  SIDES.forEach(s => S.pets[s].owned.forEach(i => { S.pets[s].gifted[i] = S.colors[s]; }));
  S.giftColorFixed = true;
  save();
}
function wearItem(side, item, card) {
  const ps = S.pets[side], slot = WEARABLES[item];
  ps.wear[slot] = ps.wear[slot] === item ? null : item;      // tap again to take it off
  save();
  renderWear(side);
  Sound.play('pick');
  hopPet(side);
  mood(pets[side], 'happy', 900);
  const w = pets[side].art.querySelector('.wear.' + slot);
  if (w) animate(w, [{ transform: 'scale(0)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 350, easing: 'ease-out' });
  const p = panels[side];
  if (p) {
    p.lastTouch = now();
    p.querySelectorAll('.scard').forEach(c => c.classList.toggle('on', ps.wear[WEARABLES[c.dataset.key]] === c.dataset.key));
  }
}

BUTTONS.closet = { icon: 'closet', label: 'Closet' };
ROOMS.bedroom.acts.push('closet');
FEATURE_OF.closet = 'closet';
// The closet is the next new thing as soon as either pet has been given something to wear,
// so nobody is ever stuck in a scarf with no way to take it off.
const ownsClothes = () => SIDES.some(s => S.pets[s].owned.some(i => WEARABLES[i]));
NEW_THINGS.push({ key: 'closet', order: -1, when: ownsClothes, room: 'bedroom', acts: ['closet'], icon: 'closet', word: 'closet' });
