'use strict';
/* Twin Pets: Starts the game. This file is loaded last. */

/* =====================================================================
   28. GO!
   ===================================================================== */
buildScene();
applyColors();
$('#home-btn').innerHTML = ICONS.home;
onPress($('#home-btn'), () => {
  if (game && game.ready) finishGame(false);
  else if (climb && !climb.busy) endClimb();
});
renderJar();
onTap($('#book'), e => { if (e.target.id === 'book') closeBook(); });
Speech.init();
makeHomeScreenIcon();
onRelease($('#title'), startPlaying);
onRelease($('#go-btn'), finishPicking);
setInterval(() => { idleTick(); wishTick(); }, 1000);
restorePets();
if (S.colors.left && S.colors.right) showTitle(); else openPicker();
