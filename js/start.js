'use strict';
/* Twin Pets: Starts the game. This file is loaded last. */

/* =====================================================================
   GO!
   ===================================================================== */
buildScene();
applyColors();
$('#home-btn').innerHTML = ICONS.home;
onPress($('#home-btn'), () => {
  if (game && game.ready) finishGame(false);
  else if (climb && !climb.busy) endClimb();
  else if (act && act.ready) endActivity(false);
});
renderJar();
renderFeatureClasses();
onTap($('#book'), e => { if (e.target.id === 'book') closeBook(); });
$('#map .map-x').innerHTML = ICONS.close;
onPress($('#map .map-x'), closeMap);
Speech.init();
onRelease($('#title'), startPlaying);
onRelease($('#go-btn'), finishPicking);
setInterval(() => { idleTick(); wishTick(); }, 1000);
restorePets();
if (S.colors.left && S.colors.right) showTitle(); else openPicker();

// Work offline once the game has been opened (see sw.js), and ask the device to keep
// the girls' progress safe even when storage runs low.
if ('serviceWorker' in navigator && !TEST_MODE && /^https?:$/.test(location.protocol)) {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
if (navigator.storage && navigator.storage.persist && !TEST_MODE) navigator.storage.persist().catch(() => {});
