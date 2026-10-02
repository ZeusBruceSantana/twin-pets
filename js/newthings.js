'use strict';
/* Twin Pets: new things introduce themselves gently, a few each play session. */

/* =====================================================================
   NEW THINGS, A FEW AT A TIME
   Each part of the game adds its new things to NEW_THINGS, in order.
   Every time the game is opened, up to SETTINGS.newThingsPerSession of
   them appear, one at a time, each with a gentle hint.
   ===================================================================== */
const NEW_THINGS = [];   // { key, room, acts: [buttons it brings], icon, word }
const has = f => !!(S.features && S.features[f]);
let introAt = 0;
function startSessionIntros() {
  S.intro.session = (S.intro.session || 0) + 1;
  S.intro.given = 0;
  save();
  introAt = now() + 30000;          // let them settle in first
}
function nextNewThing() {
  return NEW_THINGS.filter(n => !S.features[n.key]).sort((a, b) => a.order - b.order)[0];
}
function introTick() {
  if (scene !== 'play' || now() < introAt || $('#hint').classList.contains('show')) return;
  if (S.together < 3) return;         // brand-new players learn the basics first
  if ((S.intro.given || 0) >= SETTINGS.newThingsPerSession) return;
  const next = nextNewThing();
  if (!next) return;
  introduce(next);
  introAt = now() + 90000;            // the next one comes a while later
}
function introduce(n, quiet) {
  S.features[n.key] = true;
  if (!quiet) S.intro.given = (S.intro.given || 0) + 1;
  const acts = n.acts || [];
  if (n.room && n.room !== S.room) {
    S.doorNew[n.room] = true;                          // a star on the map
    acts.forEach(a => { if (!S.freshActs.includes(a)) S.freshActs.push(a); });
  } else {
    acts.forEach(a => { newUntil[a] = Date.now() + 7000; });
  }
  save();
  renderFeatureClasses();
  if (!quiet) {
    showHint(n.icon, n.word, true);
    renderColumns();
    renderCenter();
    if (n.onIntro) n.onIntro();
  }
}
/* Arriving in a room: anything new here glows. */
function glowFreshActs(room) {
  const here = ROOMS[room] ? ROOMS[room].acts : [];
  const glow = S.freshActs.filter(a => here.includes(a));
  if (!glow.length) return;
  glow.forEach(a => { newUntil[a] = Date.now() + 7000; });
  S.freshActs = S.freshActs.filter(a => !here.includes(a));
  save();
  renderColumns();
}
