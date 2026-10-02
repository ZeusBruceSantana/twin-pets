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
ACT_HANDLERS.closet = side => {
  Sound.play('door');
  openPanel(side, { head: side, keepOpen: true, items: closetItems(side), onPick: (item, card) => wearItem(side, item, card) });
};
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
NEW_THINGS.push({ key: 'closet', order: 5, room: 'bedroom', acts: ['closet'], icon: 'closet', word: 'closet' });
