'use strict';
/* Twin Pets: Buttons, picking colors, the start screen and the grown-up corner. */

/* =====================================================================
   THE BUTTON STRIPS
   ===================================================================== */
const BUTTONS = {
  // playroom
  play:       { icon: 'ball',       label: 'Play' },
  tricks:     { icon: 'cards',      label: 'Tricks' },
  fivegame:   { icon: 'hand',       label: 'High five' },
  dress:      { icon: 'dress',      label: 'Dress' },
  back:       { icon: 'back',       label: 'Back' },
  // kitchen (the fridge, cooking and the picnic are in kitchen.js)
  treat:      { icon: 'treat',      label: 'Treat' },
  // bathroom
  bath:       { icon: 'roomBath',   label: 'Bath' },
  scrub:      { icon: 'sponge',     label: 'Scrub' },
  dry:        { icon: 'towel',      label: 'Dry' },
  brush:      { icon: 'brush',      label: 'Brush' },
  // backyard
  bounce:     { icon: 'trampoline', label: 'Bounce' },
  climb:      { icon: 'rainbow',    label: 'Climb' },
  ballgame:   { icon: 'catch',      label: 'Ball' },
  seesawgame: { icon: 'seesaw',     label: 'Seesaw' },
  // bedroom
  sleep:      { icon: 'moon',       label: 'Sleep' },
  wake:       { icon: 'sun',        label: 'Wake' },
  book:       { icon: 'book',       label: 'Book' },
  // during together games
  throw:      { icon: 'ball',       label: 'Throw' },
  push:       { icon: 'seesaw',     label: 'Push' },
  five:       { icon: 'hand',       label: 'High five' },
  climbup:    { icon: 'rainbow',    label: 'Climb' },
  give:       { icon: 'gift',       label: 'Give' },
};
const inviteUntil = { left: {}, right: {} };
const newShown = { left: {}, right: {} };
/* Which buttons show on a girl's edge right now. Each room shows only its own. */
function columnPlan(side) {
  if (scene === 'night') return { acts: S.bedtime ? [] : ['wake'], big: true };
  if (scene === 'game' && game) return { acts: [GAMES[game.kind].act], big: true };
  if (scene === 'climb' && climb) return { acts: ['climbup'], big: true, cls: climb.top[side] ? 'done' : 'invite' };
  if (scene === 'presents' && presents) return { acts: ['give'], big: true, cls: presents.given[side] ? 'done' : 'invite' };
  if (scene === 'act' && act) return actPlan(side);
  if (sideMode[side] === 'tricks') return { acts: [...TRICKS.map(t => 'trick:' + t.key), 'back'], cards: true };
  if (SIDE_MODES[sideMode[side]]) return SIDE_MODES[sideMode[side]](side);
  const p = pets[side];
  const acts = ROOMS[S.room].acts
    .filter(a => !LOCKED_BY[a] || S.unlocked[LOCKED_BY[a]])
    .filter(a => !FEATURE_OF[a] || has(FEATURE_OF[a]))
    .filter(a => !SHOW_IF[a] || SHOW_IF[a](side))
    .map(a => (a === 'sleep' && p && p.asleep ? 'wake' : a === 'bath' ? bathAct(side) : a));
  return { acts, dim: !['play', 'title'].includes(scene) };
}
function renderColumns() { SIDES.forEach(renderColumn); }
function renderColumn(side) {
  const col = cols[side];
  const plan = columnPlan(side);
  col.innerHTML = '';
  col.classList.toggle('big', !!plan.big);
  col.classList.toggle('dim', !!plan.dim);
  col.classList.toggle('cards', !!plan.cards);
  col.classList.toggle('many', !plan.big && !plan.cards && plan.acts.length > 4);
  for (const act of plan.acts) {
    if (act.startsWith('trick:')) {            // a trick word card: tap to hear it, and the pet tries
      const key = act.slice(6), tr = trickBy(key);
      const b = el('div', 'btn btn-trick' + (knows(side, key) ? ' learned' : ''), `<span class="ico">${ICONS[tr.icon]}</span><span class="lbl">${tr.word}</span>`);
      if (knows(side, key)) b.append(el('span', 'star', ICONS.star));
      onRelease(b, () => trickCard(side, key));
      col.append(b);
      continue;
    }
    const def = (plan.defs && plan.defs[act]) || BUTTONS[act];
    const ico = def.svg || ICONS[def.icon] || '';
    const b = el('div', 'btn btn-' + act, `<span class="ico">${ico}</span><span class="lbl">${def.label}</span>`);
    b.dataset.act = act;
    const cls = (plan.clsOf && plan.clsOf[act]) || plan.cls;
    if (cls) b.classList.add(cls);
    if ((newUntil[act] || 0) > Date.now() && newShown[side][act] !== newUntil[act]) {   // pop in once, not every redraw
      b.classList.add('new');
      newShown[side][act] = newUntil[act];
    }
    if ((inviteUntil[side][act] || 0) > Date.now()) b.classList.add('invite');
    if (act === 'book' || def.speak) onRelease(b, () => press(side, act, b));
    else onPress(b, () => press(side, act, b));
    col.append(b);
  }
}
function press(side, act, btn) {
  if (scene === 'night') { if (act === 'wake') goodMorning(); return; }
  if (scene === 'game') { gamePress(side, btn); return; }
  if (scene === 'climb') { climbPress(side); return; }
  if (scene === 'presents') { givePresent(side, btn); return; }
  if (scene === 'act') { actPress(side, act, btn); return; }
  if (!canAct()) return;
  if (ACT_HANDLERS[act]) { ACT_HANDLERS[act](side, btn); return; }
  if (act === 'treat') giveTreat(side, btn);
  else if (act === 'play') playBall(side);
  else if (act === 'tricks') { sideMode[side] = 'tricks'; modeTouched[side] = now(); Sound.play('pick'); renderColumn(side); }
  else if (act === 'back') { sideMode[side] = null; renderColumn(side); }
  else if (act === 'fivegame') startGame('highfive', side);
  else if (act === 'ballgame') startGame('ball', side);
  else if (act === 'seesawgame') startGame('seesaw', side);
  else if (act === 'dress') cycleDress(side);
  else if (act === 'bath' || act === 'scrub' || act === 'dry') bathStep(side);
  else if (act === 'brush') brushPet(side);
  else if (act === 'bounce') bounce(side);
  else if (act === 'climb') startClimb();
  else if (act === 'sleep') goSleep(side);
  else if (act === 'wake') wakePet(side);
  else if (act === 'book') openBook();
}
const SIDE_MODES = {};   // a girl's edge can switch to its own set of buttons (like Tricks)
const SHOW_IF = {        // buttons that only show sometimes
  dress: side => S.pets[side].owned.some(i => WEARABLES[i] === 'head') && !has('closet'),
};
/* Gently glow a button on the sister's side ("come join in!"). */
function invite(side, act, ms) {
  inviteUntil[side][act] = Date.now() + ms;
  const b = cols[side].querySelector('.btn-' + act);
  if (b) b.classList.add('invite');
  setTimeout(() => {
    const b2 = cols[side].querySelector('.btn-' + act);
    if (b2 && (inviteUntil[side][act] || 0) <= Date.now()) b2.classList.remove('invite');
  }, ms + 50);
}
function nudge(elm) {
  if (!elm) return;
  Sound.play('soft');
  elm.classList.remove('nudge'); void elm.offsetWidth; elm.classList.add('nudge');
}

/* =====================================================================
   PETS WAIT HAPPILY (little idle wiggles)
   ===================================================================== */
function idleTick() {
  // nobody has tapped for a while: go back to normal, gently
  if (scene === 'game' && game && game.ready && !game.busy && now() - game.lastPress > 25000) finishGame(false);
  if (scene === 'climb' && climb && !climb.busy && now() - climb.lastPress > 30000) endClimb();
  if (scene === 'act' && act && act.ready && !act.busy && now() - act.lastPress > 40000) endActivity(false);
  if (scene === 'map' && now() - mapTouched > 25000) closeMap();
  SIDES.forEach(side => { if (panels[side] && now() - panels[side].lastTouch > 40000) closePanel(side); });
  introTick();
  timerTick();
  SIDES.forEach(side => {
    if (sideMode[side] && sideMode[side] !== 'bath' && now() - modeTouched[side] > 45000) { sideMode[side] = null; renderColumn(side); }
    if (pets[side].root.classList.contains('fluffy') !== isFluffy(side)) renderFluffy(side);
    tummyLook(side);
  });
  if (!['play', 'title'].includes(scene)) return;
  SIDES.forEach(side => {
    const p = pets[side];
    if (p.asleep || bath[side] || now() < p.busyUntil || Math.random() > 0.2) return;
    p.busyUntil = now() + 1800;
    const what = pick(['wag', 'hop', 'look', 'wag']);
    if (what === 'wag') { p.root.classList.add('wag'); setTimeout(() => p.root.classList.remove('wag'), 1600); }
    if (what === 'hop') petAnim(p, [{ transform: 'translateY(0)' }, { transform: 'translateY(-5%)' }, { transform: 'translateY(0)' }], { duration: 420, easing: 'ease-out' });
    if (what === 'look') {
      const dir = side === 'left' ? 1 : -1;
      petAnim(p, [{ transform: 'rotate(0)' }, { transform: `rotate(${dir * 6}deg)`, offset: 0.25 }, { transform: `rotate(${dir * 6}deg)`, offset: 0.75 }, { transform: 'rotate(0)' }], { duration: 1500 });
    }
  });
}

/* =====================================================================
   FIRST LAUNCH: PICK A COLOR
   ===================================================================== */
const picking = { left: null, right: null };
function openPicker() {
  // tidy away a game or gift that was in the middle of happening
  if (game) { game.ending = true; game.cleanup.forEach(f => f()); game = null; }
  if (presents) { SIDES.forEach(s => presents.box[s] && presents.box[s].remove()); presents = null; }
  if (climb) { climb.ending = true; climb.el.remove(); climb = null; }
  closeSideModes();
  closeBook();
  setScene('pick');
  picking.left = S.colors.left; picking.right = S.colors.right;
  $('#title').classList.remove('show');
  const picker = $('#picker');
  picker.classList.add('show');
  picker.querySelectorAll('.pick-half').forEach(half => {
    const side = half.dataset.side;
    sayableInto(half.querySelector('.pick-name'), SETTINGS.players[side].girl);
    const petBox = half.querySelector('.pick-pet');
    fillArt(petBox, side);
    const sw = half.querySelector('.swatches');
    sw.innerHTML = '';
    COLORS.forEach(c => {
      const b = el('div', 'swatch', ICONS.check);
      b.style.setProperty('--sw', c.main);
      b.dataset.color = c.id;
      onTap(b, () => chooseColor(side, c.id, b));
      sw.append(b);
    });
  });
  updatePicker();
}
function chooseColor(side, id, b) {
  if (picking[other(side)] === id) { nudge(b); return; }   // sister already has it
  picking[side] = id;
  Sound.play('pick');
  const petBox = $(`.pick-half[data-side="${side}"] .pick-pet`);
  animate(petBox, [{ transform: 'translateY(0)' }, { transform: 'translateY(-12%)' }, { transform: 'translateY(0)' }], { duration: 420, easing: 'ease-out' });
  updatePicker();
}
function updatePicker() {
  $('#picker').querySelectorAll('.pick-half').forEach(half => {
    const side = half.dataset.side, mine = colorById(picking[side]);
    half.style.setProperty('--pbg', mine ? mine.light : '#f4efe9');
    half.style.setProperty('--pdark', mine ? mine.dark : '#6f6880');
    half.querySelectorAll('.swatch').forEach(b => {
      b.classList.toggle('chosen', b.dataset.color === picking[side]);
      b.classList.toggle('taken', b.dataset.color === picking[other(side)]);
    });
  });
  $('#go-btn').classList.toggle('show', !!(picking.left && picking.right));
}
function finishPicking() {
  if (!(picking.left && picking.right)) return;
  S.colors.left = picking.left; S.colors.right = picking.right; save();
  applyColors();
  $('#picker').classList.remove('show');
  startPlaying();
}

/* =====================================================================
   START SCREEN AND FULL SCREEN
   ===================================================================== */
const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isStandalone = () => navigator.standalone === true || matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches;
function canFullscreen() {
  const d = document.documentElement;
  return !isIOS() && !isStandalone() && !!(d.requestFullscreen || d.webkitRequestFullscreen);
}
function tryFullscreen() {
  if (!canFullscreen() || document.fullscreenElement || document.webkitFullscreenElement) return;
  const d = document.documentElement;
  try {
    const r = (d.requestFullscreen || d.webkitRequestFullscreen).call(d);
    if (r && r.catch) r.catch(() => {});
  } catch (e) { /* ignore */ }
}
function showTitle() {
  setScene('title');
  $('#title').classList.add('show');
}
function startPlaying() {
  $('#title').classList.remove('show');
  Sound.unlock();
  tryFullscreen();
  restorePets();
  if (S.bedtime) { sleepingScene(); return; }      // the play timer ran out: still asleep
  startTimer();
  const wasAsleep = S.pets.left.asleep || S.pets.right.asleep;
  SIDES.forEach(s => { S.pets[s].asleep = false; });
  save();
  setScene('play');
  if (wasAsleep) {      // they went to bed last time: good morning!
    Sound.play('morning');
    SIDES.forEach(s => { mood(pets[s], 'happy', 1600); floatHearts(pets[s], 2); });
  }
  startSessionIntros();
  setTimeout(() => {
    if (!S.seen.playroom) firstVisitHint('playroom');
    checkUnlocks();
    runQueue();
  }, 800);
}

/* =====================================================================
   GROWN-UP CORNER (press and hold the top-left corner for 3 seconds)
   ===================================================================== */
(function setupCorner() {
  const corner = $('#corner');
  let timer = 0;
  const stop = () => { clearTimeout(timer); corner.classList.remove('holding'); };
  corner.addEventListener('pointerdown', e => {
    e.preventDefault();
    corner.classList.add('holding');
    clearTimeout(timer);
    timer = setTimeout(() => { stop(); openParent(); }, 3000);
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => corner.addEventListener(ev, stop));
})();
let resetArmed = 0;
let parentPage = null;
// Other parts of the game add pages here: key -> { icon, label(), show?(), render(panel) }
const PARENT_PAGES = {};
function openParent() {
  resetArmed = 0;
  parentPage = null;
  $('#parent').classList.add('show');
  renderParent();
}
function renderParent() {
  const panel = $('#parent .panel');
  panel.classList.toggle('sub', !!parentPage);
  if (parentPage && PARENT_PAGES[parentPage]) {
    panel.innerHTML = '';
    PARENT_PAGES[parentPage].render(panel);
    return;
  }
  renderParentMain(panel);
}
function renderParentMain(panel) {
  const tiles = Object.entries(PARENT_PAGES).filter(([, pg]) => !pg.show || pg.show())
    .sort(([, a], [, b]) => (a.order == null ? 50 : a.order) - (b.order == null ? 50 : b.order))
    .map(([k, pg]) => `<div class="ptile${pg.hot && pg.hot() ? ' hot' : ''}" data-page="${k}"><div class="pico">${ICONS[pg.icon] || ''}</div><div class="plbl">${pg.label()}</div></div>`).join('');
  const v = Math.round(S.sound.volume * 10);
  let bars = '';
  for (let i = 1; i <= 10; i++) bars += `<i class="${i <= v ? 'on' : ''}"></i>`;
  panel.innerHTML = `
    <h2>Grown-ups</h2>
    <div class="ptiles">${tiles}</div>
    <div class="row"><span>Sound</span><div class="pbtn ${S.sound.muted ? '' : 'on'}" data-p="mute">${S.sound.muted ? 'Off (tap to turn on)' : 'On (tap to mute)'}</div></div>
    <div class="row"><span>Volume</span><div class="pbtn round" data-p="vol-">−</div><div class="volbar">${bars}</div><div class="pbtn round" data-p="vol+">+</div></div>
    <div class="row"><div class="pbtn" data-p="colors">Change colors</div>${canFullscreen() ? '<div class="pbtn" data-p="fs">Full screen</div>' : ''}</div>
    <div class="row"><div class="pbtn" data-p="unlock">Show all new things now</div><div class="pbtn danger ${resetArmed ? 'confirm' : ''}" data-p="reset">${resetArmed ? 'Tap again to erase everything' : 'Start over'}</div></div>
    <div class="row"><div class="pbtn go" data-p="done">Done</div></div>
    <div class="note">Twin Pets saves on this device only.</div>`;
  panel.querySelectorAll('[data-p]').forEach(b => onRelease(b, () => parentAction(b.dataset.p)));
  panel.querySelectorAll('[data-page]').forEach(b => onRelease(b, () => { resetArmed = 0; parentPage = b.dataset.page; renderParent(); }));
}
/* A grown-up page: a title, its insides, and a Back button. */
function parentShell(panel, title, inner, onBack) {
  panel.innerHTML = `<h2>${title}</h2>${inner}<div class="row"><div class="pbtn" data-back>Back</div></div>`;
  onRelease(panel.querySelector('[data-back]'), () => { if (onBack) onBack(); parentPage = null; renderParent(); });
  return panel;
}
function parentAction(what) {
  if (what !== 'reset') resetArmed = 0;
  if (what === 'mute') {
    S.sound.muted = !S.sound.muted;
    if (S.sound.muted && 'speechSynthesis' in window) speechSynthesis.cancel();
    Sound.applyVolume();
    Sound.play('pick');
  } else if (what === 'vol-' || what === 'vol+') {
    S.sound.volume = Math.min(1, Math.max(0.1, Math.round((S.sound.volume + (what === 'vol+' ? 0.1 : -0.1)) * 10) / 10));
    Sound.applyVolume();
    Sound.play('pick');
  } else if (what === 'colors') {
    closeParent();
    openPicker();
    return;
  } else if (what === 'unlock') {
    S.together = Math.max(S.together, ...Object.values(SETTINGS.unlockAt));
    Object.keys(SETTINGS.unlockAt).forEach(k => { S.unlocked[k] = true; });
    NEW_THINGS.forEach(n => { if (!has(n.key)) introduce(n, true); });
    queue.length = 0;
    renderJar(); renderColumns(); renderCenter();
  } else if (what === 'fs') {
    tryFullscreen();
  } else if (what === 'reset') {
    if (resetArmed && Date.now() - resetArmed < 6000) {
      erasing = true;
      try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ }
      location.reload();
      return;
    }
    resetArmed = Date.now();
  } else if (what === 'done') {
    closeParent();
    return;
  }
  save();
  renderParent();
}
function closeParent() {
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  $('#parent').classList.remove('show');
  PARENT_CLOSE_HOOKS.forEach(f => f());
}
const PARENT_CLOSE_HOOKS = [];

/* =====================================================================
   NO ZOOMING, NO SCROLLING, NO TEXT SELECTION, NO LONG-PRESS MENUS
   ===================================================================== */
// (typing boxes in the grown-up corner still work normally)
const isTyping = e => e.target && e.target.closest && e.target.closest('input, textarea');
['contextmenu', 'selectstart', 'dragstart', 'gesturestart', 'gesturechange', 'dblclick'].forEach(ev =>
  document.addEventListener(ev, e => { if (!isTyping(e)) e.preventDefault(); }));
document.addEventListener('touchmove', e => { if (!isTyping(e)) e.preventDefault(); }, { passive: false });
['touchend', 'pointerup', 'click'].forEach(ev => document.addEventListener(ev, () => Sound.unlock(), { passive: true }));
document.addEventListener('visibilitychange', () => { if (document.hidden) save(); });
