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
/* tabs: [{ key, icon }] adds a row of big picture tabs; tab = the one showing; onTab(key) returns that tab's items. */
function openPanel(side, { items, onPick, keepOpen, say = true, cols = 2, head, tabs, tab, onTab }) {
  closePanel(side);
  const p = el('div', 'spanel side-' + side + (cols === 3 ? ' three' : ''), `<div class="spanel-x">${ICONS.close}</div><div class="spanel-grid"></div>`);
  if (head) { const f = el('div', 'spanel-head'); fillFace(f, head); p.prepend(f); p.classList.add('has-head'); }
  const grid = p.querySelector('.spanel-grid');
  const fill = list => {
    grid.innerHTML = '';
    grid.scrollTop = 0;
    list.forEach(it => {
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
  };
  if (tabs) {
    p.classList.add('tabbed');
    const row = el('div', 'spanel-tabs');
    tabs.forEach(t => {
      const b = el('div', 'stab' + (t.key === tab ? ' on' : ''), t.icon);
      b.dataset.tab = t.key;
      onRelease(b, () => {
        Sound.play('pick');
        p.lastTouch = now();
        row.querySelectorAll('.stab').forEach(x => x.classList.toggle('on', x === b));
        fill(onTab(t.key));
      });
      row.append(b);
    });
    grid.before(row);
  }
  fill(items);
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
   The little house button in the middle leaves early.
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
  a.cleanup.push(() => stage.removeEventListener('pointerdown', touched, true));
  const touched = () => { a.lastPress = now(); };      // a finger on the screen (pop-ups, bubbles, dragging) is playing too
  stage.addEventListener('pointerdown', touched, true);
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
async function endActivity(done, bookType, a = act) {   // a: the activity that is ending (a slow finale must not end a newer one)
  if (!a || a !== act || a.ending) return;
  a.ending = true;
  if (done) {
    Sound.play('yay');
    const m = midPets();
    sparkles(m.x, m.y, 14);
    celebrate(m.x, m.y, 18);
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
/* "Both girls tap it": the first tap makes her sister's button glow; when both have tapped within a few
   seconds, onBoth() runs. (key is the button's name.) */
const bothTaps = {};
function bothTap(key, side, onBoth) {
  const t = bothTaps[key] || (bothTaps[key] = { left: -1e9, right: -1e9 });
  t[side] = now();
  if (now() - t[other(side)] < SETTINGS.doorWindowMs) { t.left = t.right = -1e9; onBoth(); }
  else invite(other(side), key, SETTINGS.doorWindowMs);
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
