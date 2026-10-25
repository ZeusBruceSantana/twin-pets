'use strict';
/* Twin Pets: more things for the pets themselves: new things to wear and new toys for the shelf.
   They come as jar presents too, and as puzzle prizes that go straight to each pet. */

Object.assign(ITEM_ART, {
  partyhat: c => `<svg viewBox="0 0 100 100"><path d="M50 6 L82 92 H18Z" fill="${c.main}" stroke="#fff" stroke-width="4" stroke-linejoin="round"/><path d="M36 50 H64 M28 72 H72" stroke="#fff" stroke-width="5" stroke-dasharray="6 8"/><circle cx="50" cy="8" r="7" fill="#ffd23f"/></svg>`,
  wizardhat: c => `<svg viewBox="0 0 100 100"><path d="M50 4 C 58 28, 66 52, 76 74 H24 C 34 52, 42 28, 50 4Z" fill="#5a6bd6" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><ellipse cx="50" cy="76" rx="46" ry="11" fill="#5a6bd6" stroke="#fff" stroke-width="3"/><rect x="30" y="62" width="40" height="8" fill="${c.main}"/><path d="M48 28 l3 6 l6 1 l-5 4 l1 6 l-5 -3 l-5 3 l1 -6 l-5 -4 l6 -1z" fill="#ffd23f"/></svg>`,
  headphones: c => `<svg viewBox="0 0 100 60"><path d="M12 40 C 12 6, 88 6, 88 40" fill="none" stroke="#3e3a4f" stroke-width="7" stroke-linecap="round"/><rect x="4" y="30" width="20" height="28" rx="9" fill="${c.main}" stroke="#fff" stroke-width="3"/><rect x="76" y="30" width="20" height="28" rx="9" fill="${c.main}" stroke="#fff" stroke-width="3"/></svg>`,
  bandana: c => `<svg viewBox="0 0 100 50"><path d="M4 12 C 30 2, 70 2, 96 12 L86 26 L50 46 L14 26Z" fill="${c.main}" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><g fill="#fff"><circle cx="30" cy="16" r="3"/><circle cx="50" cy="12" r="3"/><circle cx="70" cy="16" r="3"/><circle cx="40" cy="28" r="3"/><circle cx="60" cy="28" r="3"/><circle cx="50" cy="38" r="2.5"/></g></svg>`,
  rainbowband: () => '<svg viewBox="0 0 100 40"><g fill="none" stroke-width="5" stroke-linecap="round"><path d="M8 34 C 20 4, 80 4, 92 34" stroke="#ff8a8a"/><path d="M14 34 C 26 10, 74 10, 86 34" stroke="#ffd27a"/><path d="M20 34 C 30 16, 70 16, 80 34" stroke="#9fe08a"/><path d="M26 34 C 34 22, 66 22, 74 34" stroke="#8ac8ff"/></g></svg>',
  shades: c => `<svg viewBox="0 0 120 44"><path d="M56 16 H64" stroke="#3e3a4f" stroke-width="5" stroke-linecap="round"/><g fill="#2b2838" stroke="${c.main}" stroke-width="4"><rect x="6" y="6" width="46" height="30" rx="10"/><rect x="68" y="6" width="46" height="30" rx="10"/></g><path d="M14 14 l12 -4 M76 14 l12 -4" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/></svg>`,
  bowtie: c => `<svg viewBox="0 0 100 50"><path d="M50 25 L8 6 V44Z M50 25 L92 6 V44Z" fill="${c.main}" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><rect x="42" y="14" width="16" height="22" rx="5" fill="${c.dark}" stroke="#fff" stroke-width="3"/></svg>`,
  medal: c => `<svg viewBox="0 0 60 90"><path d="M10 4 L30 44 L50 4" fill="none" stroke="${c.main}" stroke-width="9" stroke-linejoin="round"/><circle cx="30" cy="62" r="22" fill="#ffd23f" stroke="#e0a800" stroke-width="4"/><path d="M30 46 l4.6 10 l11 1 l-8.3 7.3 l2.6 10.7 l-9.9 -6 l-9.9 6 l2.6 -10.7 l-8.3 -7.3 l11 -1z" fill="#fff" opacity=".9"/></svg>`,
  cape: c => `<svg viewBox="0 0 120 80"><path d="M14 4 C 40 14, 80 14, 106 4 L116 76 C 90 66, 30 66, 4 76Z" fill="${c.main}" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path d="M14 4 C 40 14, 80 14, 106 4" stroke="#ffd23f" stroke-width="5" fill="none"/></svg>`,
  fairywings: () => '<svg viewBox="0 0 120 60"><g fill="#e8f6ff" fill-opacity=".85" stroke="#9fdcff" stroke-width="3"><path d="M58 30 C 40 0, 6 0, 6 22 C 6 44, 40 46, 58 30Z"/><path d="M62 30 C 80 0, 114 0, 114 22 C 114 44, 80 46, 62 30Z"/></g><g fill="#ffd9f0" fill-opacity=".8"><path d="M56 36 C 40 40, 18 54, 26 50 C 38 56, 52 48, 56 36Z"/><path d="M64 36 C 80 40, 102 54, 94 50 C 82 56, 68 48, 64 36Z"/></g></svg>',
  // toys for the shelf
  kite: c => `<svg viewBox="0 0 100 100"><path d="M50 6 L82 40 L50 70 L18 40Z" fill="${c.main}" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path d="M50 6 V70 M18 40 H82" stroke="#fff" stroke-width="2"/><path d="M50 70 C 42 78, 58 84, 48 94" stroke="#9aa6bd" stroke-width="3" fill="none"/><path d="M46 78 l-6 4 l6 2z M52 86 l8 -2 l-4 6z" fill="#ffd23f"/></svg>`,
  train: c => `<svg viewBox="0 0 100 100"><rect x="8" y="42" width="52" height="34" rx="6" fill="${c.main}" stroke="#fff" stroke-width="3"/><rect x="58" y="30" width="30" height="46" rx="6" fill="#ffd23f" stroke="#fff" stroke-width="3"/><rect x="62" y="36" width="14" height="14" rx="3" fill="#bfe9fb"/><rect x="66" y="18" width="12" height="14" rx="3" fill="#3e3a4f"/><circle cx="26" cy="80" r="9" fill="#3e3a4f"/><circle cx="48" cy="80" r="9" fill="#3e3a4f"/><circle cx="76" cy="80" r="9" fill="#3e3a4f"/></svg>`,
  top: c => `<svg viewBox="0 0 100 100"><path d="M18 36 H82 C 82 60, 66 74, 50 90 C 34 74, 18 60, 18 36Z" fill="${c.main}" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path d="M26 46 H74 M32 58 H68" stroke="#fff" stroke-width="3"/><path d="M50 36 V12" stroke="#b07f4f" stroke-width="7" stroke-linecap="round"/></svg>`,
  xylophone: c => `<svg viewBox="0 0 100 100"><path d="M14 84 L30 20 M86 84 L70 20" stroke="#b07f4f" stroke-width="6" stroke-linecap="round"/><rect x="18" y="26" width="64" height="9" rx="4" fill="#ff7a7a" stroke="#fff" stroke-width="2"/><rect x="20" y="42" width="60" height="9" rx="4" fill="#ffd23f" stroke="#fff" stroke-width="2"/><rect x="22" y="58" width="56" height="9" rx="4" fill="#6cc551" stroke="#fff" stroke-width="2"/><rect x="24" y="73" width="52" height="9" rx="4" fill="${c.main}" stroke="#fff" stroke-width="2"/></svg>`,
  duckie: () => ICONS.duck,
});
Object.assign(WEARABLES, { partyhat: 'head', wizardhat: 'head', headphones: 'head', bandana: 'head', rainbowband: 'head', shades: 'face', bowtie: 'neck', medal: 'neck', cape: 'back', fairywings: 'back' });
Object.assign(WEAR_SPOT, { partyhat: [50, -6, 24, 26], wizardhat: [50, -20, 40, 38], headphones: [50, 6, 68, 26], bandana: [50, 6, 44, 22], rainbowband: [50, 2, 38, 15], shades: [50, 33, 64, 19], bowtie: [50, 66, 34, 17], medal: [50, 64, 22, 33], cape: [50, 50, 104, 48], fairywings: [50, 26, 112, 48] });
Object.assign(ITEM_WORD, { partyhat: 'party hat', wizardhat: 'wizard hat', headphones: 'headphones', bandana: 'bandana', rainbowband: 'rainbow', shades: 'shades', bowtie: 'bow tie', medal: 'medal', cape: 'cape', fairywings: 'fairy wings', kite: 'kite', train: 'train', top: 'top', xylophone: 'xylophone', duckie: 'duckie' });
TOYS.push('kite', 'train', 'top', 'xylophone', 'duckie');

/* A puzzle prize for a pet: the present opens and flies to her pet (put on, or onto the toy shelf). */
async function giftToPet(item, to) {
  const ps = S.pets[to], pt = pets[to];
  if (!ps.owned.includes(item)) ps.owned.push(item);
  ps.gifted[item] = S.colors[to];
  const from = { x: W() / 2 + (to === 'left' ? -W() * 0.12 : W() * 0.12), y: H() * 0.38 };
  const g = prop(ITEM_ART[item](itemColor(to, item)), 11, from.x, from.y);
  g.style.zIndex = 34;
  Sound.play('unlock');
  animate(g.firstChild, [{ transform: 'scale(.3)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 500, easing: 'ease-out' });
  await wait(700);
  let target;
  if (WEARABLES[item]) {
    ps.wear[WEARABLES[item]] = item;
    const [x, y, , h] = WEAR_SPOT[item];
    target = petPoint(pt, x / 100, (y + h / 2) / 100);
  } else {
    const tb = $('#toys-' + to).getBoundingClientRect();
    target = { x: tb.left + tb.width / 2, y: tb.bottom - H() * 0.03 };
  }
  save();
  await arc(g, from, target, 800, H() * 0.1);
  g.remove();
  renderWear(to);
  renderToys(to);
  mood(pt, 'happy', 2400);
  floatHearts(pt, 4);
  Sound.play('thanks');
}
