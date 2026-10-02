'use strict';
/* Twin Pets: the kitchen. The fridge, favorite foods, cooking together, the picnic table. */

/* ---------- pictures ---------- */
Object.assign(ICONS, {
  fridge: '<svg viewBox="0 0 100 100"><rect x="22" y="6" width="56" height="88" rx="10" fill="#eef6fb" stroke="#9fb8cc" stroke-width="4"/><path d="M22 40 H78" stroke="#9fb8cc" stroke-width="4"/><rect x="66" y="16" width="5" height="16" rx="2.5" fill="#9fb8cc"/><rect x="66" y="48" width="5" height="20" rx="2.5" fill="#9fb8cc"/><circle cx="36" cy="22" r="5" fill="#ff7a7a"/><path d="M34 60 l6 -8 l6 8z" fill="#ffd23f"/></svg>',
  cook: '<svg viewBox="0 0 100 100"><path d="M14 48 H86 C 86 74 70 88 50 88 C 30 88 14 74 14 48Z" fill="#f4f6fb" stroke="#9aa6bd" stroke-width="4" stroke-linejoin="round"/><ellipse cx="50" cy="48" rx="36" ry="8" fill="#ffe7a8" stroke="#9aa6bd" stroke-width="4"/><path d="M62 44 L82 10" stroke="#c99a6b" stroke-width="7" stroke-linecap="round"/><ellipse cx="60" cy="46" rx="8" ry="5" fill="#c99a6b"/><path d="M8 30 q4 -6 0 -12 M20 24 q4 -6 0 -12" stroke="#ffb3c8" stroke-width="3" fill="none" stroke-linecap="round"/></svg>',
  picnic: '<svg viewBox="0 0 100 100"><rect x="8" y="44" width="84" height="12" rx="4" fill="#ff9a9a"/><path d="M8 44 h12 v12 h-12z M32 44 h12 v12 h-12z M56 44 h12 v12 h-12z M80 44 h12 v12 h-12z" fill="#fff"/><path d="M20 56 L14 90 M80 56 L86 90" stroke="#b07f4f" stroke-width="6" stroke-linecap="round"/><ellipse cx="34" cy="40" rx="12" ry="4" fill="#fff" stroke="#c9b8a8" stroke-width="2"/><ellipse cx="66" cy="40" rx="12" ry="4" fill="#fff" stroke="#c9b8a8" stroke-width="2"/><circle cx="34" cy="36" r="5" fill="#ff5d5d"/><path d="M60 37 q6 -8 12 0z" fill="#ffd23f"/></svg>',
  banana: '<svg viewBox="0 0 100 100"><path d="M18 30 C 22 70, 56 86, 86 66 C 80 60, 74 62, 70 64 C 50 72, 34 58, 28 30Z" fill="#ffe066" stroke="#e0b030" stroke-width="4" stroke-linejoin="round"/><path d="M18 30 L22 18" stroke="#7a5a2a" stroke-width="5" stroke-linecap="round"/><path d="M34 50 C 40 62, 52 68, 66 66" stroke="#fff3b0" stroke-width="4" fill="none" stroke-linecap="round"/></svg>',
  peach: '<svg viewBox="0 0 100 100"><circle cx="50" cy="56" r="34" fill="#ffb38a" stroke="#f08a5d" stroke-width="4"/><path d="M50 24 C 44 40, 44 70, 50 88" stroke="#f08a5d" stroke-width="3" fill="none" opacity=".7"/><path d="M50 24 L52 12" stroke="#7a4a2a" stroke-width="5" stroke-linecap="round"/><path d="M54 18 C 62 6, 80 8, 84 14 C 76 24, 62 24, 54 18Z" fill="#6cc551"/><ellipse cx="36" cy="46" rx="6" ry="10" fill="#fff" opacity=".4"/></svg>',
  carrot: '<svg viewBox="0 0 100 100"><path d="M40 30 C 30 50, 34 78, 50 92 C 66 78, 70 50, 60 30Z" fill="#ff9a4d" stroke="#e07a2a" stroke-width="4" stroke-linejoin="round"/><path d="M42 48 h8 M46 62 h10 M44 76 h6" stroke="#e07a2a" stroke-width="3" stroke-linecap="round"/><path d="M50 30 C 44 18, 36 12, 30 12 M50 30 C 50 18, 54 10, 60 6 M50 30 C 58 22, 66 20, 74 20" stroke="#5cc45c" stroke-width="6" fill="none" stroke-linecap="round"/></svg>',
  peas: '<svg viewBox="0 0 100 100"><path d="M10 60 C 30 30, 70 30, 90 50 C 70 74, 30 80, 10 60Z" fill="#8fd16a" stroke="#5aa83a" stroke-width="4"/><g fill="#b7ea8f" stroke="#5aa83a" stroke-width="2"><circle cx="30" cy="56" r="8"/><circle cx="48" cy="52" r="8"/><circle cx="66" cy="52" r="8"/></g><path d="M88 50 q6 -10 2 -20" stroke="#5aa83a" stroke-width="4" fill="none" stroke-linecap="round"/></svg>',
  pancakes: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="80" rx="42" ry="10" fill="#fff" stroke="#d9c7b5" stroke-width="3"/><g fill="#e9b26c" stroke="#c98a3c" stroke-width="3"><ellipse cx="50" cy="70" rx="34" ry="10"/><ellipse cx="50" cy="58" rx="34" ry="10"/><ellipse cx="50" cy="46" rx="34" ry="10"/></g><path d="M30 42 C 38 52, 58 52, 70 42 L66 54 L58 46 L50 56 L44 46Z" fill="#c9762a" opacity=".85"/><rect x="42" y="28" width="16" height="12" rx="3" fill="#fff6c8" stroke="#e0c070" stroke-width="2"/></svg>',
  pizza: '<svg viewBox="0 0 100 100"><path d="M50 92 L12 22 C 36 8, 64 8, 88 22Z" fill="#ffd27a" stroke="#d9a23a" stroke-width="4" stroke-linejoin="round"/><path d="M18 24 C 38 14, 62 14, 82 24" stroke="#c98a3c" stroke-width="8" fill="none" stroke-linecap="round"/><g fill="#ff6b6b"><circle cx="42" cy="38" r="6"/><circle cx="60" cy="44" r="6"/><circle cx="50" cy="62" r="5"/></g><g fill="#6cc551"><circle cx="34" cy="50" r="2.5"/><circle cx="64" cy="30" r="2.5"/></g></svg>',
  icecream: '<svg viewBox="0 0 100 100"><path d="M32 52 L50 94 L68 52Z" fill="#e8b071" stroke="#c98a3c" stroke-width="4" stroke-linejoin="round"/><path d="M38 60 l16 10 M44 54 l18 12 M36 66 l10 6" stroke="#c98a3c" stroke-width="2"/><circle cx="50" cy="38" r="20" fill="#ffc0d6" stroke="#f08bb0" stroke-width="4"/><circle cx="38" cy="50" r="10" fill="#fff4e0" stroke="#e0c8a0" stroke-width="3"/><circle cx="50" cy="16" r="6" fill="#ff5d5d"/><g fill="#7fd1ff"><rect x="44" y="30" width="6" height="2.5" rx="1"/><rect x="56" y="38" width="6" height="2.5" rx="1"/></g></svg>',
  tomato: '<svg viewBox="0 0 100 100"><circle cx="50" cy="58" r="32" fill="#ff5d5d" stroke="#d93f4a" stroke-width="4"/><path d="M36 28 L50 36 L64 28 L58 40 L50 34 L42 40Z" fill="#5cc45c"/><ellipse cx="38" cy="50" rx="6" ry="9" fill="#fff" opacity=".4"/></svg>',
  pumpkin: '<svg viewBox="0 0 100 100"><g fill="#ffa24d" stroke="#e07a2a" stroke-width="3"><ellipse cx="32" cy="60" rx="20" ry="28"/><ellipse cx="68" cy="60" rx="20" ry="28"/><ellipse cx="50" cy="60" rx="20" ry="30"/></g><path d="M50 30 C 48 20, 52 14, 58 12" stroke="#5aa83a" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M56 22 C 66 14, 78 18, 80 24 C 70 28, 60 28, 56 22Z" fill="#6cc551"/></svg>',
  corn: '<svg viewBox="0 0 100 100"><path d="M50 10 C 66 20, 68 60, 50 88 C 32 60, 34 20, 50 10Z" fill="#ffd23f" stroke="#e0a800" stroke-width="3"/><g fill="#ffe788"><circle cx="46" cy="30" r="3"/><circle cx="54" cy="30" r="3"/><circle cx="46" cy="42" r="3"/><circle cx="54" cy="42" r="3"/><circle cx="46" cy="54" r="3"/><circle cx="54" cy="54" r="3"/><circle cx="50" cy="66" r="3"/></g><path d="M50 90 C 30 70, 24 52, 30 36 C 40 56, 46 70, 50 90Z M50 90 C 70 70, 76 52, 70 36 C 60 56, 54 70, 50 90Z" fill="#7fd36a" stroke="#5aa83a" stroke-width="2"/></svg>',
  milk: '<svg viewBox="0 0 100 100"><path d="M34 26 L40 12 H60 L66 26 V88 H34Z" fill="#fff" stroke="#9fb8cc" stroke-width="4" stroke-linejoin="round"/><rect x="34" y="46" width="32" height="22" fill="#8fc8ff"/><circle cx="50" cy="57" r="6" fill="#fff"/></svg>',
  ice: '<svg viewBox="0 0 100 100"><g fill="#dff3ff" stroke="#8fc8ff" stroke-width="4" stroke-linejoin="round"><rect x="16" y="40" width="34" height="34" rx="6" transform="rotate(-10 33 57)"/><rect x="50" y="30" width="34" height="34" rx="6" transform="rotate(12 67 47)"/></g><path d="M26 50 l8 -2 M60 40 l8 2" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>',
  sauce: '<svg viewBox="0 0 100 100"><path d="M30 34 H70 V82 C70 90 64 92 50 92 C 36 92 30 90 30 82Z" fill="#ff5d5d" stroke="#d93f4a" stroke-width="4"/><rect x="34" y="20" width="32" height="14" rx="4" fill="#fff" stroke="#d93f4a" stroke-width="4"/><path d="M40 56 h20" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/></svg>',
  cheese: '<svg viewBox="0 0 100 100"><path d="M10 70 L60 26 L90 50 V76 H10Z" fill="#ffd23f" stroke="#e0a800" stroke-width="4" stroke-linejoin="round"/><g fill="#ffe788"><circle cx="34" cy="62" r="6"/><circle cx="64" cy="58" r="5"/><circle cx="78" cy="68" r="4"/></g></svg>',
  peppers: '<svg viewBox="0 0 100 100"><path d="M30 34 C 14 40, 14 80, 34 84 C 42 86, 44 78, 50 78 C 56 78, 58 86, 66 84 C 86 80, 86 40, 70 34 C 62 30, 56 36, 50 36 C 44 36, 38 30, 30 34Z" fill="#6cc551" stroke="#3a8a27" stroke-width="4"/><path d="M50 36 C 50 26, 54 18, 62 14" stroke="#3a8a27" stroke-width="5" fill="none" stroke-linecap="round"/></svg>',
  flour: '<svg viewBox="0 0 100 100"><path d="M24 30 C 24 22, 76 22, 76 30 L82 86 C 82 92, 18 92, 18 86Z" fill="#f6efe4" stroke="#c9b8a8" stroke-width="4"/><path d="M28 30 C 40 22, 60 22, 72 30" stroke="#c9b8a8" stroke-width="4" fill="none"/><path d="M38 58 C 44 48, 56 48, 62 58 C 56 68, 44 68, 38 58Z" fill="#ffd27a"/></svg>',
  eggs: '<svg viewBox="0 0 100 100"><ellipse cx="34" cy="56" rx="18" ry="24" fill="#fff8ee" stroke="#d9c7b5" stroke-width="4"/><ellipse cx="66" cy="56" rx="18" ry="24" fill="#fff8ee" stroke="#d9c7b5" stroke-width="4"/><ellipse cx="28" cy="48" rx="4" ry="7" fill="#fff" /><ellipse cx="60" cy="48" rx="4" ry="7" fill="#fff"/></svg>',
  sprinkles: '<svg viewBox="0 0 100 100"><path d="M30 30 H70 V86 C70 92 30 92 30 86Z" fill="#fff" stroke="#c3a6ff" stroke-width="4"/><rect x="32" y="18" width="36" height="12" rx="4" fill="#ff8fb8"/><g stroke-width="5" stroke-linecap="round"><path d="M40 46 l6 4" stroke="#ff7a7a"/><path d="M56 44 l4 6" stroke="#5aa9ff"/><path d="M44 62 l6 -2" stroke="#ffd23f"/><path d="M58 66 l4 4" stroke="#6cc551"/><path d="M40 76 l6 2" stroke="#a77bff"/></g></svg>',
  smoothie: '<svg viewBox="0 0 100 100"><path d="M26 30 H74 L66 90 H34Z" fill="#ff9ec4" stroke="#e0709c" stroke-width="4" stroke-linejoin="round"/><path d="M28 30 C 36 22, 64 22, 72 30" fill="#ffd0e2"/><path d="M60 30 L74 6" stroke="#7fd1ff" stroke-width="6" stroke-linecap="round"/><circle cx="34" cy="28" r="8" fill="#ffe066" stroke="#e0b030" stroke-width="3"/></svg>',
  cake: '<svg viewBox="0 0 100 100"><rect x="16" y="50" width="68" height="38" rx="6" fill="#ffd9e8" stroke="#f08bb0" stroke-width="4"/><path d="M16 60 C 26 70, 34 56, 42 64 C 50 72, 58 56, 66 64 C 74 72, 80 60, 84 62" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/><g stroke-width="5" stroke-linecap="round"><path d="M34 50 V34" stroke="#7fd1ff"/><path d="M50 50 V30" stroke="#ffd23f"/><path d="M66 50 V34" stroke="#a6f08a"/></g><g fill="#ffb020"><ellipse cx="34" cy="29" rx="3" ry="5"/><ellipse cx="50" cy="25" rx="3" ry="5"/><ellipse cx="66" cy="29" rx="3" ry="5"/></g></svg>',
  blender: '<svg viewBox="0 0 100 100"><path d="M28 16 H72 L66 72 H34Z" fill="#e8f6ff" stroke="#9fb8cc" stroke-width="4" stroke-linejoin="round"/><rect x="26" y="8" width="48" height="10" rx="4" fill="#9fb8cc"/><rect x="28" y="72" width="44" height="20" rx="5" fill="#c3a6ff" stroke="#8b7fd1" stroke-width="3"/><circle cx="50" cy="82" r="4" fill="#fff"/><path d="M44 58 l12 -8 M44 50 l12 8" stroke="#9fb8cc" stroke-width="3"/></svg>',
  spoon: '<svg viewBox="0 0 100 100"><ellipse cx="34" cy="34" rx="16" ry="22" fill="#e6c79a" stroke="#c99a6b" stroke-width="4" transform="rotate(-40 34 34)"/><path d="M44 46 L84 88" stroke="#c99a6b" stroke-width="9" stroke-linecap="round"/></svg>',
});

/* ---------- the fridge ---------- */
const FOODS = {
  apple:    { word: 'apple' },
  banana:   { word: 'banana' },
  peach:    { word: 'peach' },
  carrot:   { word: 'carrot' },
  peas:     { word: 'peas' },
  pancakes: { word: 'pancakes' },
  pizza:    { word: 'pizza' },
  icecream: { word: 'ice cream' },
  fish:     { word: 'fish' },
  bone:     { word: 'bone' },
  // these come from the garden
  strawberry: { word: 'strawberry', garden: true },
  tomato:     { word: 'tomato', garden: true },
  pumpkin:    { word: 'pumpkin', garden: true },
  corn:       { word: 'corn', garden: true },
};
// pets can ask for these in thought bubbles too
['banana', 'peach', 'carrot', 'pancakes', 'pizza'].forEach(k => {
  WISHES[k] = { icon: k, act: 'food:' + k };
  if (!HUNGRY_WISHES.includes(k)) HUNGRY_WISHES.push(k);
});
function fridgeItems() {
  return Object.entries(FOODS)
    .filter(([k, f]) => !f.garden || (S.fridge[k] || 0) > 0)
    .map(([k, f]) => ({ key: k, icon: ICONS[k], word: f.word, badge: f.garden ? S.fridge[k] : null }));
}
ACT_HANDLERS.fridge = side => {
  if (isFull(side)) { sayFull(pets[side]); return; }
  Sound.play('fridge');
  openPanel(side, {
    cols: 3,
    items: fridgeItems(),
    onPick: key => {
      if (FOODS[key].garden) { S.fridge[key] = Math.max(0, (S.fridge[key] || 0) - 1); save(); }
      feed(side, key);
    },
  });
};

/* ---------- favorite foods: a happy dance ---------- */
EAT_HOOKS.push((side, food) => {
  if (SETTINGS.favorites[side] !== food) return;
  const p = pets[side];
  begin(p, 2400);
  mood(p, 'happy', 2400);
  Sound.play('favorite');
  sayBubble(p, 'My favorite!', 2200);
  floatHearts(p, 5);
  petAnim(p, DANCE_GROOVE, { duration: 2000 });
});

/* ---------- cooking together: one girl adds, her sister stirs ---------- */
const RECIPES = {
  smoothie: { word: 'smoothie', mix: 'Blend',  mixIcon: 'blender', dish: 'blender', ings: ['banana', 'strawberry', 'milk', 'ice'] },
  pizza:    { word: 'pizza',    mix: 'Spread', mixIcon: 'spoon',   dish: 'dough',   ings: ['sauce', 'cheese', 'tomato', 'peppers'] },
  cake:     { word: 'cake',     mix: 'Stir',   mixIcon: 'spoon',   dish: 'bowl',    ings: ['flour', 'eggs', 'milk', 'sprinkles'] },
};
const INGREDIENT_WORD = { banana: 'banana', strawberry: 'strawberry', milk: 'milk', ice: 'ice', sauce: 'sauce', cheese: 'cheese',
  tomato: 'tomato', peppers: 'peppers', flour: 'flour', eggs: 'eggs', sprinkles: 'sprinkles' };
// the dish in the middle, with a layer for each ingredient
function dishSvg(recipe) {
  if (recipe === 'smoothie') return `<svg viewBox="0 0 100 120"><rect x="24" y="0" width="52" height="12" rx="4" fill="#9fb8cc"/>
    <path d="M26 12 H74 L68 88 H32Z" fill="#eef8ff" stroke="#9fb8cc" stroke-width="4" stroke-linejoin="round"/>
    <path class="l l1" d="M31 80 H69 L68 88 H32Z" fill="#ffe066"/><path class="l l2" d="M30 66 H70 L69 80 H31Z" fill="#ff8fab"/>
    <path class="l l3" d="M29 52 H71 L70 66 H30Z" fill="#fff6ee"/><g class="l l4"><rect x="36" y="40" width="10" height="10" rx="2" fill="#dff3ff" stroke="#8fc8ff" stroke-width="2"/><rect x="52" y="42" width="10" height="10" rx="2" fill="#dff3ff" stroke="#8fc8ff" stroke-width="2"/></g>
    <path class="done" d="M29 44 H71 L68 88 H32Z" fill="#ff9ec4"/>
    <rect x="28" y="88" width="44" height="26" rx="6" fill="#c3a6ff" stroke="#8b7fd1" stroke-width="3"/><circle cx="50" cy="101" r="5" fill="#fff"/></svg>`;
  if (recipe === 'pizza') return `<svg viewBox="0 0 100 120"><ellipse cx="50" cy="80" rx="46" ry="30" fill="#ffd9a0" stroke="#d9a23a" stroke-width="4"/>
    <ellipse class="l l1" cx="50" cy="80" rx="38" ry="23" fill="#ff6b6b"/>
    <path class="l l2" d="M20 78 C 30 62, 44 70, 52 60 C 62 66, 76 62, 80 78 C 72 94, 60 88, 50 98 C 38 90, 26 96, 20 78Z" fill="#ffe066"/>
    <g class="l l3" fill="#ff4d5a" stroke="#d93f4a" stroke-width="2"><circle cx="36" cy="76" r="6"/><circle cx="60" cy="72" r="6"/><circle cx="50" cy="88" r="6"/><circle cx="68" cy="86" r="5"/></g>
    <g class="l l4" fill="#5cc45c"><rect x="42" y="68" width="9" height="4" rx="2" transform="rotate(30 46 70)"/><rect x="28" y="86" width="9" height="4" rx="2" transform="rotate(-20 32 88)"/><rect x="62" y="94" width="9" height="4" rx="2"/><rect x="72" y="74" width="9" height="4" rx="2" transform="rotate(60 76 76)"/></g></svg>`;
  return `<svg viewBox="0 0 100 120"><path class="l l1" d="M14 78 C 30 70, 70 70, 86 78Z" fill="#f6efe4"/><path class="l l2" d="M18 74 C 32 64, 68 64, 82 74 L82 80 H18Z" fill="#ffe7a8"/>
    <path class="l l3" d="M16 70 C 32 58, 68 58, 84 70 L84 80 H16Z" fill="#fff3d6"/>
    <g class="l l4" stroke-width="3" stroke-linecap="round"><path d="M34 62 l4 3" stroke="#ff7a7a"/><path d="M50 58 l3 4" stroke="#5aa9ff"/><path d="M64 62 l4 -2" stroke="#6cc551"/><path d="M42 66 l4 2" stroke="#a77bff"/></g>
    <path d="M8 74 H92 C 92 100 74 114 50 114 C 26 114 8 100 8 74Z" fill="#f4f6fb" stroke="#9aa6bd" stroke-width="4" stroke-linejoin="round"/>
    <ellipse cx="50" cy="74" rx="42" ry="9" fill="none" stroke="#9aa6bd" stroke-width="4"/></svg>`;
}
ACT_HANDLERS.cook = side => openPanel(side, {
  items: Object.entries(RECIPES).map(([k, r]) => ({ key: k, icon: ICONS[k], word: r.word })),
  onPick: key => startActivity('cook', side, { recipe: key }),
});
const cookAdder = a => (a.data.step % 2 === 0 ? a.starter : other(a.starter));   // the girls take turns adding
ACTIVITIES.cook = {
  async start(a) {
    a.data.r = RECIPES[a.opts.recipe];
    a.data.step = 0;
    a.data.phase = 'add';
    await Promise.all([movePet('left', 31, 12, 600), movePet('right', 69, 12, 600)]);
    a.data.dish = actProp(a, dishSvg(a.opts.recipe), { left: '50%', bottom: '7%', width: '26vmin', height: '31vmin', transform: 'translateX(-50%)' });
    a.data.dish.querySelectorAll('.l, .done').forEach(e => { e.style.opacity = 0; });
    await popIn(a.data.dish);
    Sound.play('pick');
  },
  plan(a, side) {
    const d = a.data;
    if (side === cookAdder(a)) {
      const ing = d.r.ings[d.step];
      return { acts: ['add'], big: true, defs: { add: { svg: ICONS[ing], label: INGREDIENT_WORD[ing], speak: true } }, cls: d.phase === 'add' ? 'invite' : 'done' };
    }
    return { acts: ['mix'], big: true, defs: { mix: { icon: d.r.mixIcon, label: d.r.mix } }, cls: d.phase === 'mix' ? 'invite' : 'done' };
  },
  async press(a, side, key) {
    const d = a.data, adder = cookAdder(a);
    if (key === 'add' && d.phase === 'add' && side === adder) {
      a.busy = true;
      const ing = d.r.ings[d.step];
      Speech.say(INGREDIENT_WORD[ing]);
      const from = petPoint(pets[side], side === 'left' ? 0.85 : 0.15, 0.5);
      const r = d.dish.getBoundingClientRect();
      const it = prop(ICONS[ing], 9, from.x, from.y);
      it.style.zIndex = 33;
      await arc(it, from, { x: r.left + r.width / 2, y: r.top + r.height * 0.45 }, 700, H() * 0.18, side === 'left' ? 200 : -200);
      it.remove();
      Sound.play('plop');
      const layer = d.dish.querySelector('.l' + (d.step + 1));
      if (layer) animate(layer, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
      animate(d.dish, [{ transform: 'translateX(-50%) scale(1)' }, { transform: 'translateX(-50%) scale(1.06,.95)' }, { transform: 'translateX(-50%) scale(1)' }], { duration: 300 });
      hopPet(side);
      d.phase = 'mix';
      a.busy = false;
      renderColumns();
      return;
    }
    if (key === 'mix' && d.phase === 'mix' && side !== adder) {
      a.busy = true;
      Sound.play(a.opts.recipe === 'smoothie' ? 'blend' : 'stir');
      const r = d.dish.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * 0.42;
      const tool = prop(ICONS[d.r.mixIcon === 'blender' ? 'spoon' : 'spoon'], 9, cx, cy);
      tool.style.zIndex = 33;
      if (a.opts.recipe === 'smoothie') {
        await animate(d.dish, [{ transform: 'translateX(-50%) rotate(0)' }, { transform: 'translateX(-50%) rotate(-3deg)' }, { transform: 'translateX(-50%) rotate(3deg)' }, { transform: 'translateX(-50%) rotate(0)' }], { duration: 160, iterations: 5 });
      } else {
        await tween(900, t => {
          const ang = t * Math.PI * 4;
          tool.style.left = cx + Math.cos(ang) * r.width * 0.22 + 'px';
          tool.style.top = cy + Math.sin(ang) * r.height * 0.06 + 'px';
        }, ease.linear);
      }
      tool.remove();
      mood(pets[side], 'happy', 900);
      d.step++;
      if (d.step >= d.r.ings.length) { await finishCooking(a); return; }
      d.phase = 'add';
      a.busy = false;
      renderColumns();
      return;
    }
    hopPet(side);       // not your turn yet: a little hop
  },
};
async function finishCooking(a) {
  const d = a.data;
  Sound.play('yay');
  const done = d.dish.querySelector('.done');
  if (done) animate(done, [{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });
  const r = d.dish.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top + r.height * 0.4, 14);
  await wait(700);
  // now both pets get to eat it
  const food = actProp(a, ICONS[a.opts.recipe], { left: '50%', bottom: '42%', width: '16vmin', height: '16vmin', transform: 'translateX(-50%)' }, 33);
  await popIn(food);
  await wait(500);
  for (let i = 0; i < 3; i++) {
    SIDES.forEach(s => {
      pets[s].root.classList.add('chomp');
      petAnim(pets[s], [{ transform: 'scale(1,1)' }, { transform: 'scale(1.05,.94)' }, { transform: 'scale(1,1)' }], { duration: 260 });
    });
    Sound.play('eat');
    food.firstChild.style.transform = `scale(${0.75 - i * 0.25})`;
    await wait(420);
    SIDES.forEach(s => pets[s].root.classList.remove('chomp'));
  }
  SIDES.forEach(s => setTummy(s, tummy(s) + 0.2));
  endActivity(true, 'cook-' + a.opts.recipe);
}

/* ---------- the picnic table: both pets eat together ---------- */
ACT_HANDLERS.picnic = side => startActivity('table', side);
const BITES = 4;
ACTIVITIES.table = {
  async start(a) {
    a.data.bites = { left: 0, right: 0 };
    a.data.table = actProp(a, `<svg viewBox="0 0 200 70" preserveAspectRatio="none"><path d="M24 30 L14 70 M176 30 L186 70" stroke="#b07f4f" stroke-width="8" stroke-linecap="round"/>
      <rect x="4" y="6" width="192" height="26" rx="8" fill="#fff"/><path d="M4 6 h24 v26 h-24z M52 6 h24 v26 h-24z M100 6 h24 v26 h-24z M148 6 h24 v26 h-24z" style="fill:var(--L)" opacity=".7"/>
      <path d="M28 6 h24 v26 h-24z M76 6 h24 v26 h-24z M124 6 h24 v26 h-24z M172 6 h24 v26 h-24z" style="fill:var(--R)" opacity=".7"/></svg>`,
      { left: '50%', bottom: '10%', width: '62vmin', height: '20vmin', transform: 'translateX(-50%)' }, 11);
    await Promise.all([movePet('left', 39, 12, 700), movePet('right', 61, 12, 700)]);
    a.data.plates = {};
    SIDES.forEach(s => {
      const fav = SETTINGS.favorites[s];
      const pl = actProp(a, `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="78" rx="46" ry="14" fill="#fff" stroke="#d9c7b5" stroke-width="3"/></svg>`,
        { left: (s === 'left' ? 43 : 57) + '%', bottom: '21%', width: '14vmin', height: '14vmin', transform: 'translateX(-50%)' }, 12);
      const f = el('div', 'plate-food', ICONS[fav]);
      pl.append(f);
      a.data.plates[s] = f;
      popIn(pl);
    });
    Sound.play('pick');
  },
  plan(a, side) {
    return { acts: ['bite'], big: true, defs: { bite: { svg: ICONS[SETTINGS.favorites[side]], label: 'Eat' } }, cls: a.data.bites[side] >= BITES ? 'done' : 'invite' };
  },
  async press(a, side) {
    const d = a.data, p = pets[side];
    if (d.bites[side] >= BITES) { hopPet(side); return; }     // all done: waiting happily for her sister
    d.bites[side]++;
    Sound.play('eat');
    p.root.classList.add('chomp');
    petAnim(p, [{ transform: 'scale(1,1)' }, { transform: 'scale(1.05,.94) translateY(3%)' }, { transform: 'scale(1,1)' }], { duration: 300 });
    setTimeout(() => p.root.classList.remove('chomp'), 250);
    d.plates[side].style.transform = `scale(${1 - d.bites[side] / BITES})`;
    if (d.bites[side] >= BITES) { mood(p, 'happy', 99999); floatHearts(p, 3); renderColumn(side); }
    if (d.bites.left >= BITES && d.bites.right >= BITES) {
      a.busy = true;
      SIDES.forEach(s => setTummy(s, tummy(s) + 0.25));
      await wait(600);
      endActivity(true, 'table');
    }
  },
};

/* ---------- the kitchen's buttons, new things, memory book ---------- */
ROOMS.kitchen.acts = ['fridge', 'cook', 'picnic', 'treat'];
Object.assign(BUTTONS, {
  fridge: { icon: 'fridge', label: 'Fridge' },
  cook:   { icon: 'cook',   label: 'Cook' },
  picnic: { icon: 'picnic', label: 'Picnic' },
});
FEATURE_OF.cook = 'cook';
FEATURE_OF.picnic = 'picnic';
NEW_THINGS.push(
  { key: 'fridge', order: 0, room: 'kitchen', acts: ['fridge'], icon: 'fridge', word: 'fridge' },   // always there; this just shows it off
  { key: 'cook',   order: 3, room: 'kitchen', acts: ['cook'],   icon: 'cook',   word: 'cook' },
  { key: 'picnic', order: 7, room: 'kitchen', acts: ['picnic'], icon: 'picnic', word: 'picnic' },
);
Object.assign(BOOK_LINES, {
  'cook-smoothie': { line: 'made a smoothie together.', icon: 'smoothie', rank: 96 },
  'cook-pizza':    { line: 'made a pizza together.',    icon: 'pizza',    rank: 96 },
  'cook-cake':     { line: 'baked a cake together.',    icon: 'cake',     rank: 96 },
  table:           { line: 'ate lunch together at the table.', icon: 'picnic', rank: 90.5 },
});

/* ---------- kitchen sounds ---------- */
Sound.add('fridge', s => { s.noise(0, 0.3, { freq: 900, to: 400, q: 1, vol: 0.03 }); s.tone(s.NOTE(84), 0.15, 0.25, { vol: 0.04, echo: 1 }); });
Sound.add('favorite', s => { [72, 76, 79, 84, 88, 91].forEach((m, i) => s.tone(s.NOTE(m), i * 0.09, 0.35, { type: 'triangle', vol: 0.07, echo: 1 })); });
Sound.add('plop', s => { const k = s.k3(); s.tone(s.NOTE(60 + k), 0, 0.14, { to: s.NOTE(48 + k), vol: 0.1 }); s.noise(0.02, 0.1, { filter: 'lowpass', freq: 700, vol: 0.04 }); });
Sound.add('stir', s => { for (let i = 0; i < 4; i++) s.noise(i * 0.22, 0.2, { freq: 1600, to: 1100, q: 1.5, vol: 0.03 }); });
Sound.add('blend', s => { s.tone(140, 0, 0.8, { type: 'triangle', to: 180, vol: 0.05, attack: 0.08 }); s.noise(0, 0.8, { filter: 'bandpass', freq: 900, q: 0.8, vol: 0.025, attack: 0.08 }); });
