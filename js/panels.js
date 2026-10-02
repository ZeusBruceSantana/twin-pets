'use strict';
/* Twin Pets: pull-out choice panels, and activities both girls do together. */

/* =====================================================================
   CHOICE PANELS
   A panel slides out from a girl's own edge with pictures and words to
   choose from (foods, clothes, recipes...). Each girl has her own.
   ===================================================================== */
const panels = { left: null, right: null };
/* items: [{ key, icon (svg), word, say?, badge?, cls? }]  onPick(key, card) */
/* head: show this pet's face at the top (whose pet the choices are for) */
function openPanel(side, { items, onPick, keepOpen, say = true, cols = 2, head }) {
  closePanel(side);
  const p = el('div', 'spanel side-' + side + (cols === 3 ? ' three' : ''), `<div class="spanel-x">${ICONS.close}</div><div class="spanel-grid"></div>`);
  if (head) { const f = el('div', 'spanel-head'); fillFace(f, head); p.prepend(f); p.classList.add('has-head'); }
  const grid = p.querySelector('.spanel-grid');
  items.forEach(it => {
    const c = el('div', 'scard' + (it.cls ? ' ' + it.cls : ''), `<div class="pic">${it.icon}</div><div class="lbl">${it.word}</div>`);
    c.dataset.key = it.key;
    if (it.badge != null) c.append(el('div', 'cnt', String(it.badge)));
    onRelease(c, () => {
      if (say) Speech.say(it.say || it.word);
      if (!keepOpen) closePanel(side);
      onPick(it.key, c);
    });
    grid.append(c);
  });
  onPress(p.querySelector('.spanel-x'), () => closePanel(side));
  stage.append(p);
  panels[side] = p;
  p.lastTouch = now();
  animate(p, [{ transform: `translateX(${side === 'left' ? -105 : 105}%)` }, { transform: 'translateX(0)' }], { duration: 260, easing: 'ease-out' });
  Sound.play('pick');
}
function closePanel(side) {
  const p = panels[side];
  if (!p) return;
  panels[side] = null;
  animate(p, [{ transform: 'translateX(0)', opacity: 1 }, { transform: `translateX(${side === 'left' ? -105 : 105}%)`, opacity: 0 }], { duration: 200, fill: 'forwards' })
    .then(() => p.remove());
}
function closeAllPanels() { SIDES.forEach(closePanel); }

/* =====================================================================
   SHARED ACTIVITIES (cooking, picnic, blocks, tea party...)
   Each activity is an object in ACTIVITIES with:
     start(a)                 set things up (pets move, props appear)
     plan(a, side)            which big buttons each girl sees
     press(a, side, key, btn) what a button does
   The little house button in the middle always leaves early.
   ===================================================================== */
const ACTIVITIES = {};
let act = null;
async function startActivity(kind, starter, opts = {}) {
  if (scene !== 'play') return;
  closeAllPanels();
  closeSideModes();
  $('#hint').classList.remove('show');
  const a = act = { kind, starter, opts, step: 0, lastPress: now(), busy: true, ready: false, cleanup: [], data: {} };
  SIDES.forEach(s => begin(pets[s], 1e9));
  setScene('act');
  await ACTIVITIES[kind].start(a);
  if (act !== a) { a.cleanup.forEach(f => f()); return; }   // stopped while getting ready
  a.busy = false;
  a.ready = true;
  renderColumns();
}
function actPlan(side) { return act && act.ready ? ACTIVITIES[act.kind].plan(act, side) : { acts: [], big: true }; }
async function actPress(side, key, btn) {
  const a = act;
  if (!a || !a.ready || a.ending) return;
  a.lastPress = now();
  if (a.busy) return;
  await ACTIVITIES[a.kind].press(a, side, key, btn);
}
/* Finish an activity. done = it was completed together (adds a heart). */
async function endActivity(done, bookType) {
  const a = act;
  if (!a || a.ending) return;
  a.ending = true;
  if (done) {
    Sound.play('yay');
    const m = midPets();
    sparkles(m.x, m.y, 14);
    SIDES.forEach(s => {
      mood(pets[s], 'happy', 2000);
      petAnim(pets[s], [{ transform: 'translateY(0)' }, { transform: 'translateY(-12%)' }, { transform: 'translateY(0)' }], { duration: 600, iterations: 2, easing: 'ease-out' });
    });
    await wait(1400);
  }
  a.cleanup.forEach(f => f());
  SIDES.forEach(s => { pets[s].lean.style.transform = ''; pets[s].root.classList.remove('happy', 'chomp'); });
  await Promise.all([movePet('left', HOME.left.x, HOME.left.y, 800), movePet('right', HOME.right.x, HOME.right.y, 800)]);
  SIDES.forEach(s => { pets[s].busyUntil = 0; });
  act = null;
  if (done) togetherMoment(bookType || a.kind);
  endScene();
}
/* A picture placed in the scene for an activity (removed when it ends). */
function actProp(a, svg, css, z = 11) {
  const e = el('div', 'scenery', svg);
  Object.assign(e.style, css, { zIndex: z });
  world.append(e);
  a.cleanup.push(() => e.remove());
  return e;
}
/* Pop something into view. */
function popIn(e, ms = 350) {
  return animate(e, [{ transform: (e.style.transform || '') + ' scale(0)' }, { transform: (e.style.transform || '') + ' scale(1.15)' }, { transform: (e.style.transform || '') + ' scale(1)' }], { duration: ms, easing: 'ease-out' });
}

/* Buttons and rooms that other parts of the game add. */
const ACT_HANDLERS = {};   // button -> function (side, btn)
const EAT_HOOKS = [];      // called after a pet eats: (side, food)
const DRESS_HOOKS = [];    // called to re-draw extra things on a pet: (side)
const HUNGRY_WISHES = ['apple', 'fish', 'bone'];
/* Body classes like "f-mirror" show things that belong to a new thing. */
function renderFeatureClasses() {
  NEW_THINGS.forEach(n => document.body.classList.toggle('f-' + n.key, has(n.key)));
  renderThings();
}
const FEATURE_OF = {};     // button -> the "new thing" it needs before it shows

/* =====================================================================
   THINGS IN A ROOM YOU CAN TAP (the mirror, the garden, the easel...)
   They show only in their own room, once their "new thing" has appeared.
   The first time, they glow gently until someone taps them.
   ===================================================================== */
const THINGS = [];
function roomThing(key, room, feature, html, css) {
  const e = el('div', 'thing thing-' + key, html);
  Object.assign(e.style, css);
  world.append(e);
  THINGS.push({ key, el: e, room, feature });
  return e;
}
function renderThings() {
  THINGS.forEach(t => {
    const ok = typeof t.feature === 'function' ? t.feature() : (!t.feature || has(t.feature));   // a name, or a test
    const on = t.room === S.room && ok;
    t.el.classList.toggle('on', on);
    t.el.classList.toggle('new', on && !S.seen['thing-' + t.key]);
  });
}
function thingTapped(key) {
  if (S.seen['thing-' + key]) return;
  S.seen['thing-' + key] = true;
  save();
  renderThings();
}
