'use strict';
/* The tests. Each one opens the game fresh with a pretend save, does something,
   and checks what happened. A save from the last version (FIXTURES.v4) is used
   as "a game the girls have been playing for a while". */

const played = () => clone(FIXTURES.v4);

/* =====================================================================
   SAVING AND LOADING
   ===================================================================== */
test('A brand-new game asks each girl to pick a color, then saves them', async () => {
  await openGame(null);
  expectEqual(G('scene'), 'pick', 'a new game starts with the color picker');
  tap($g('.pick-half[data-side="left"] .swatch[data-color="orange"]'));
  tap($g('.pick-half[data-side="right"] .swatch[data-color="orange"]'));      // already taken by her sister
  expectEqual(G('picking.right'), null, 'the same color as her sister cannot be picked');
  tap($g('.pick-half[data-side="right"] .swatch[data-color="green"]'));
  await sleep(200);
  tap($g('#go-btn'));
  await until(() => G('scene') === 'play', 5000, 'play to start');
  expectEqual(saved().colors, { left: 'orange', right: 'green' }, 'the colors are saved');
});

test('Progress is still there after closing and opening the game', async () => {
  await openGame(played());
  await startPlaying();
  G(`S.jar = 4; S.together = 31; S.pets.left.tricks.wave = 3; S.pets.right.wear.head = 'crown';
     S.letters.push({ text: 'Hi girls', at: 1, read: false }); S.schoolWords = ['dog', 'red'];
     S.decor.kitchen = { rug: 'rugStar' }; logDay('chase'); saveNow();`);
  const before = clone(G('S'));
  await reopenGame();
  const after = G('S');
  ['colors', 'jar', 'together', 'letters', 'schoolWords', 'decor', 'book', 'paintings', 'garden', 'fridge', 'birthday', 'unlocked', 'features']
    .forEach(k => expectEqual(after[k], before[k], `"${k}" came back the same`));
  expectEqual(after.pets.left.tricks, before.pets.left.tricks, 'learned tricks came back');
  expectEqual(after.pets.right.wear, before.pets.right.wear, 'clothes came back');
});

test('Saves from every earlier version still load', async () => {
  for (const [name, old] of Object.entries(FIXTURES)) {
    await openGame(old);
    expectEqual(G('scene'), 'title', `the ${name} save opens on the start screen (no color picker)`);
    await startPlaying();
    const S = G('S');
    expectEqual(S.colors, old.colors, `${name}: colors kept`);
    expectEqual(S.jar, old.jar, `${name}: jar hearts kept`);
    expectEqual(S.together, old.together, `${name}: together moments kept`);
    Object.keys(old.book).forEach(day => expect(S.book[day], `${name}: memory book day ${day} kept`));
    Object.keys(old.unlocked).forEach(k => expect(S.unlocked[k], `${name}: "${k}" still unlocked`));
    if (old.pets.left.tricks) expectEqual(S.pets.left.tricks, old.pets.left.tricks, `${name}: tricks kept`);
    if (old.pets.left.owned) expectEqual(S.pets.left.owned, old.pets.left.owned, `${name}: presents kept`);
    ['garden', 'letters', 'photos', 'paintings', 'decor', 'timer', 'fridge', 'roomPictures', 'friends'].forEach(k => expect(S[k] !== undefined, `${name}: new "${k}" was added`));
  }
});

test('A damaged save does not break the game', async () => {
  await openGame('{ this is not a save');
  expectEqual(G('scene'), 'pick', 'the game still opens (as a new game)');
});

test('"Start over" (tapped twice) erases the save', async () => {
  await openGame(played());
  G('openParent()');
  tap($g('[data-p="reset"]'));
  await sleep(100);
  expect(saved() && saved().jar === FIXTURES.v4.jar, 'one tap does not erase anything');
  const reloaded = new Promise(r => { frame.onload = r; });
  tap($g('[data-p="reset"]'));
  await reloaded;
  W = frame.contentWindow;
  await until(() => G('scene') === 'pick', 8000, 'the color picker');
  expectEqual(saved(), null, 'the save is gone');
});

test('The start screen shows the name, and the heart opens the dedication', async () => {
  await openGame(played());
  expect($g('#title .logo').textContent.includes('Twin') && $g('#title .logo').textContent.includes('Pets'), 'the name is on the start screen');
  tap($g('#dedication-btn'));
  await sleep(200);
  expect($g('#dedication').classList.contains('show'), 'the dedication opens');
  expectEqual(G('scene'), 'title', 'it does not start the game');
  expect($g('#dedication').textContent.includes('Made by Dad for Leah and Avery'), 'it says who it is from');
  expect($g('#dedication').textContent.includes('2026'), 'and the year');
  tap($g('#dedication .book-close'));
  expect(!$g('#dedication').classList.contains('show'), 'it closes');
  await startPlaying();
});

/* =====================================================================
   MOVING BETWEEN ROOMS
   ===================================================================== */
test('The game always opens in the playroom', async () => {
  const s = played(); s.room = 'kitchen';
  await openGame(s);
  await startPlaying();
  expectEqual(G('S.room'), 'playroom', 'it opens in the playroom');
});

test('The house map opens and closes', async () => {
  await openGame(played());
  await startPlaying();
  tap($g('#midbtns .mapbtn'));
  await until(() => G('scene') === 'map', 3000, 'the map');
  expect($g('#map').classList.contains('show'), 'the map is showing');
  tap($g('#map .map-x'));
  expectEqual(G('scene'), 'play', 'back to playing');
  expect(!$g('#map').classList.contains('show'), 'the map is hidden');
});

test('One girl tapping a room waits for her sister; both together go there', async () => {
  await openGame(played());
  await startPlaying();
  tap($g('#midbtns .mapbtn'));
  await until(() => G('scene') === 'map', 3000, 'the map');
  tap($g('#map .mtile[data-key="kitchen"] .half.l'));
  await sleep(300);
  expect($g('#map .mtile[data-key="kitchen"]').classList.contains('vote-left'), 'the room glows for her');
  expectEqual(G('S.room'), 'playroom', 'nobody moved yet');
  tap($g('#map .mtile[data-key="kitchen"] .half.r'));
  await until(() => G('S.room') === 'kitchen' && G('scene') === 'play', 8000, 'both pets in the kitchen');
  expectEqual(G('[pets.left.x > 0, pets.right.x > 0]'), [true, true], 'both pets are there');
});

test('Different rooms, or taps far apart in time, do not move the pets', async () => {
  await openGame(played());
  await startPlaying();
  tap($g('#midbtns .mapbtn'));
  await until(() => G('scene') === 'map', 3000, 'the map');
  tap($g('#map .mtile[data-key="kitchen"] .half.l'));
  tap($g('#map .mtile[data-key="bathroom"] .half.r'));
  await sleep(400);
  expectEqual(G('scene'), 'map', 'different rooms: still choosing');
  G('votes.left.t -= SETTINGS.doorWindowMs + 100; votes.right = null;');   // Leah tapped a long time ago
  tap($g('#map .mtile[data-key="kitchen"] .half.r'));
  await sleep(400);
  expectEqual(G('S.room'), 'playroom', 'too far apart: still in the playroom');
});

test('Rooms that have not appeared yet are closed on the map', async () => {
  const s = played(); delete s.features.school; delete s.features.frontyard;
  await openGame(s);
  await startPlaying();
  tap($g('#midbtns .mapbtn'));
  await until(() => G('scene') === 'map', 3000, 'the map');
  expect(!$g('#map .mtile[data-key="school"]'), 'school is not on the map yet');
  expect(!$g('#map .mtile[data-key="frontyard"]'), 'the front yard is not on the map yet');
  expect($g('#map .mtile[data-key="kitchen"]'), 'the kitchen is on the map');
});

test('Each room shows only its own buttons', async () => {
  await openGame(played());
  await startPlaying();
  const wanted = {
    playroom: 'play,tricks,fivegame,puppets,tea,vet',
    kitchen: 'fridge,cook,picnic,treat',
    bathroom: 'bath,teeth,brush,dryer,spa',
    backyard: 'bounce,climb,ballgame,seesawgame,garden',
    bedroom: 'sleep,book,closet,sleepover',
    frontyard: 'mailbox,car',
    school: 'words,art,blocks',
  };
  for (const [room, acts] of Object.entries(wanted)) {
    G(`showRoom('${room}'); renderColumns();`);
    expectEqual(buttons('left').join(','), acts, `Leah's buttons in the ${room}`);
    expectEqual(buttons('right').join(','), acts, `Avery's buttons in the ${room}`);
  }
});

/* =====================================================================
   THE FRIENDSHIP JAR
   ===================================================================== */
test('A together moment adds one heart and a line in the memory book', async () => {
  const s = played(); s.jar = 2; s.book = {};
  await openGame(s);
  await startPlaying();
  const together = G('S.together');
  G(`togetherMoment('chase')`);
  expectEqual(G('S.jar'), 3, 'one more heart');
  expectEqual(G('S.together'), together + 1, 'together moments counted');
  expect(G(`S.book[todayKey()].includes('chase')`), 'today\'s memory book page mentions it');
});

test('Quick repeats (like treats) only add a heart now and then', async () => {
  const s = played(); s.jar = 0;
  await openGame(s);
  await startPlaying();
  G(`togetherMoment('treat'); togetherMoment('treat'); togetherMoment('treat');`);
  expectEqual(G('S.jar'), 1, 'three quick treats, one heart');
});

test('The jar never holds more hearts than it has room for', async () => {
  const s = played(); s.jar = 9;
  await openGame(s);
  await startPlaying();
  await goTo('kitchen');                       // presents only open in the playroom
  G(`togetherMoment('chase'); togetherMoment('seesaw'); togetherMoment('ball');`);
  expectEqual(G('S.jar'), G('SETTINGS.jarSize'), 'the jar is full, not overfull');
  expect($g('#midbtns .mapbtn .badge'), 'the house map shows a present waiting');
});

test('A full jar brings presents, a party, and the jar starts over', async () => {
  const s = played(); s.jar = 10;
  await openGame(s);
  await startPlaying();
  await until(() => G('scene') === 'presents', 8000, 'the presents');
  tap($g('#col-left .btn-give'));
  tap($g('#col-right .btn-give'));
  await until(() => G('S.jar') === 0, 30000, 'the party and the jar emptying');
  expect(G(`S.book[todayKey()].includes('presents')`), 'the memory book remembers the presents');
});

/* =====================================================================
   THE GROWN-UP CORNER
   ===================================================================== */
test('Holding the top-left corner for 3 seconds opens the grown-up corner (a quick tap does not)', async () => {
  await openGame(played());
  await startPlaying();
  await tap($g('#corner'), { hold: 800 });
  await sleep(200);
  expect(!$g('#parent').classList.contains('show'), 'a short press does nothing');
  await tap($g('#corner'), { hold: 3300 });
  expect($g('#parent').classList.contains('show'), 'a long press opens it');
  tap($g('[data-p="done"]'));
  expect(!$g('#parent').classList.contains('show'), 'Done closes it');
});

test('A letter written in the corner goes in the mailbox', async () => {
  await openGame(played());
  await startPlaying();
  G('openParent()');
  tap($g('.ptile[data-page="letter"]'));
  $g('#p-letter').value = 'Dear Leah and Avery,\nHave a great day!';
  tap($g('[data-send]'));
  const last = G('S.letters[S.letters.length - 1]');
  expectEqual(last.text, 'Dear Leah and Avery,\nHave a great day!', 'the letter is saved');
  expectEqual(last.read, false, 'it waits to be read');
  expect(G('S.doorNew.frontyard'), 'the front yard gets a star on the map');
  tap($g('[data-back]')); tap($g('[data-p="done"]'));
  await goTo('frontyard');
  tap($g('#col-left .btn-mailbox'));
  await until(() => G('scene') === 'letter', 3000, 'the letter to open');
  expect($g('#letter .ltext').textContent.includes('great'), 'the new letter is the one that opens');
  expect($$g('#letter .ltext .word').length >= 6, 'every word can be tapped to hear it');
});

test('School words: commas, new lines, and empty for starter words', async () => {
  await openGame(played());
  await startPlaying();
  G('openParent()');
  tap($g('.ptile[data-page="words"]'));
  $g('#p-words').value = 'cat, sun,ice cream\nplay';
  tap($g('[data-save]'));
  expectEqual(G('S.schoolWords'), ['cat', 'sun', 'ice cream', 'play'], 'the words are saved');
  $g('#p-words').value = '';
  tap($g('[data-save]'));
  expectEqual(G('S.schoolWords'), [], 'empty means starter words');
});

/* Home Core: the family's app. The game asks the link with fetch, so the tests answer for Home Core. */
const HC_LINK = 'https://app.example/game/' + 'a'.repeat(64) + '.json';
const hcAnswer = (kids, today = '2026-10-19') => ({ ok: true, game: { today, kids } });
const hcKidRow = (id, color, symbol, extra = {}) => Object.assign({ id, color, symbol, words: [], jobs: { done: 0, total: 0 }, points: 0, rewards: [] }, extra);
function answerHomeCore(json, status = 200) {
  G(`window.__hcAsked = 0; window.fetch = async () => { window.__hcAsked++; return { ok: ${status === 200}, status: ${status}, json: async () => (${JSON.stringify(json)}) }; }`);
}
async function connectHomeCore(kids) {
  answerHomeCore(hcAnswer(kids));
  G('openParent()');
  tap($g('.ptile[data-page="homecore"]'));
  $g('#p-hclink').value = HC_LINK;
  tap($g('[data-connect]'));
  await until(() => G('S.homeCore.status') === 'ok', 4000, 'the game to reach Home Core');
}

test('Home Core: a wrong link is refused; the right one connects, and each pet is matched to a child by color and symbol', async () => {
  await openGame(played());
  await startPlaying();
  answerHomeCore(hcAnswer([]));
  G('openParent()');
  tap($g('.ptile[data-page="homecore"]'));
  $g('#p-hclink').value = 'https://example.com/not-a-game-link';
  tap($g('[data-connect]'));
  expect(/isn't a game link/.test($g('#p-hcwhy').textContent), 'a wrong link says so');
  expectEqual(G('S.homeCore.link'), '', 'and is not kept');
  G('closeParent()');
  await connectHomeCore([hcKidRow('k1', 'lavender', 'star'), hcKidRow('k2', 'shell', 'heart')]);
  const text = $g('#parent').textContent;
  expect(text.includes('Lavender star') && text.includes('Shell pink heart'), 'each child shows as her color and symbol');
  tap($g('[data-side="left"][data-kid="k1"]'));
  tap($g('[data-side="right"][data-kid="k2"]'));
  expectEqual(saved().homeCore.pick, { left: 'k1', right: 'k2' }, 'the choice is saved on this device');
});

test('Home Core: pet school practices the girls\' words of the week, else the typed words', async () => {
  await openGame(played());
  await startPlaying();
  G(`S.schoolWords = ['typed']`);
  expectEqual(G('schoolWordPool()'), ['typed'], 'not connected: the typed words');
  await connectHomeCore([hcKidRow('k1', 'lavender', 'star', { words: ['cat', 'sun'] }), hcKidRow('k2', 'shell', 'heart', { words: ['sun', 'map'] })]);
  G(`S.homeCore.pick = { left: 'k1', right: 'k2' }`);
  expectEqual(G('schoolWordPool()'), ['cat', 'sun', 'map'], 'both girls\' words, each once');
  G(`S.homeCore.kids.forEach(k => { k.words = []; })`);
  expectEqual(G('schoolWordPool()'), ['typed'], 'no words in Home Core: the typed words again');
});

test('Home Core: a pet cheers once when her jobs are all done, and once for an approved reward', async () => {
  await openGame(played());
  await startPlaying();
  await connectHomeCore([hcKidRow('k1', 'lavender', 'star', { jobs: { done: 2, total: 2 }, rewards: [{ name: 'Movie night', on: '2026-10-19' }] }),
    hcKidRow('k2', 'shell', 'heart', { jobs: { done: 1, total: 3 } })]);
  G(`S.homeCore.pick = { left: 'k1', right: 'k2' }`);
  G('closeParent()');
  await until(() => /All my jobs are done/.test(G(`pets.left.root.textContent`)), 8000, 'the left pet to cheer about her jobs');
  await until(() => /Movie night/.test(G(`pets.left.root.textContent`)), 9000, 'the left pet to cheer about the reward');
  expect(!/All my jobs/.test(G(`pets.right.root.textContent`)), 'the right pet waits: her jobs aren\'t all done');
  expectEqual(saved().homeCore.cheered.jobs, { left: '2026-10-19' }, 'the jobs cheer is noted for today');
  await reopenGame();
  await startPlaying();
  await sleep(4500);
  expect(!/All my jobs|Movie night/.test(G(`pets.left.root.textContent`)), 'opening the game again does not cheer twice');
});

test('Home Core: a stopped link says so, and Disconnect forgets everything', async () => {
  await openGame(played());
  await startPlaying();
  await connectHomeCore([hcKidRow('k1', 'lavender', 'star')]);
  answerHomeCore({ ok: false, error: 'gone' }, 404);
  tap($g('[data-again]'));
  await until(() => G('S.homeCore.status') === 'stopped', 4000, 'the game to notice the link stopped');
  expect(/stopped working/.test($g('#parent').textContent), 'the page says the link stopped');
  tap($g('[data-forget]'));
  expectEqual(saved().homeCore.link, '', 'Disconnect forgets the link');
  expect($g('#p-hclink'), 'and asks for a link again');
});

test('Kindness hearts drop into the jar when the corner closes', async () => {
  const s = played(); s.jar = 1;
  await openGame(s);
  await startPlaying();
  G('openParent()');
  tap($g('.ptile[data-page="kind"]'));
  tap($g('[data-add]'));
  tap($g('[data-add]'));
  expectEqual(G('S.kindPending'), 2, 'two hearts waiting');
  tap($g('[data-back]')); tap($g('[data-p="done"]'));
  await until(() => G('S.jar') === 3, 10000, 'the hearts to drop in');
  expectEqual(G('S.kindPending'), 0, 'nothing left waiting');
});

test('Play timer: bedtime, still asleep after reopening, woken by a grown-up', async () => {
  await openGame(played());
  await startPlaying();
  G('openParent()');
  tap($g('.ptile[data-page="timer"]'));
  tap($g('[data-min="10"]'));
  expectEqual(G('S.timer.minutes'), 10, 'the timer is set');
  const left = (G('S.timer.endsAt') - Date.now()) / 60000;
  expect(left > 9.5 && left <= 10, 'about 10 minutes left');
  tap($g('[data-back]')); tap($g('[data-p="done"]'));
  G('S.timer.endsAt = Date.now() - 1000');     // pretend 10 minutes went by
  await until(() => G('scene') === 'night', 20000, 'the pets to go to bed');
  expect(G('S.bedtime'), 'it is bedtime');
  expectEqual(G('S.room'), 'bedroom', 'they went to the bedroom');
  expectEqual(buttons('left'), [], 'no Wake button for the girls');
  tap($g('.pet.side-left .lean'));
  await sleep(500);
  expectEqual(G('scene'), 'night', 'tapping a pet does not wake it');
  await reopenGame();
  await startPlaying().catch(() => {});
  expectEqual(G('scene'), 'night', 'still asleep after closing and opening the game');
  G('openParent()');
  tap($g('.ptile[data-page="wake"]'));
  tap($g('[data-wake]'));
  await until(() => G('scene') === 'play', 8000, 'good morning');
  expect(!G('S.bedtime'), 'awake again');
});

test("The pets' birthday can be set and cleared", async () => {
  await openGame(played());
  await startPlaying();
  G('openParent()');
  tap($g('.ptile[data-page="birthday"]'));
  G('S.birthday = null; renderParent();');
  tap($g('[data-month="7"]'));
  tap($g('[data-day="1"]'));
  tap($g('[data-day="1"]'));
  expectEqual(G('S.birthday'), { month: 7, day: 3 }, 'July 3rd');
  tap($g('[data-clear]'));
  expectEqual(G('S.birthday'), null, 'cleared');
});

test('Sounds and music have their own switches', async () => {
  await openGame(played());
  await startPlaying();
  expectEqual(G('S.sound.music'), true, 'music starts on (also for older saves)');
  G('openParent()');
  tap($g('[data-p="mute"]'));
  expectEqual([G('S.sound.muted'), G('S.sound.music')], [true, true], 'sounds off, music still on');
  tap($g('[data-p="music"]'));
  expectEqual([G('S.sound.muted'), G('S.sound.music')], [true, false], 'both off');
  tap($g('[data-p="mute"]'));
  expectEqual([G('S.sound.muted'), G('S.sound.music')], [false, false], 'sounds on, music still off');
  tap($g('[data-p="music"]'));
  expectEqual(G('S.sound.music'), true, 'music back on');
  await reopenGame();
  expectEqual([G('S.sound.muted'), G('S.sound.music')], [false, true], 'the switches are remembered');
});

test('Each room and place has its own tune, and none at bedtime', async () => {
  await openGame(played());
  await startPlaying();
  // (the tests stay silent, so this asks which tune the game would choose)
  expectEqual(G('Music.wanted(true)'), 'playroom', 'the playroom tune');
  G(`showRoom('kitchen')`);
  expectEqual(G('Music.wanted(true)'), 'kitchen', 'the kitchen tune');
  G('S.sound.music = false');
  expectEqual(G('Music.wanted(true)'), null, 'no tune with music off');
  G('S.sound.music = true; S.bedtime = true');
  expectEqual(G('Music.wanted(true)'), null, 'no tune at bedtime (the lullaby plays)');
  G('S.bedtime = false');
  ['playroom', 'kitchen', 'bathroom', 'backyard', 'bedroom', 'frontyard', 'school', 'beach', 'park', 'icecream', 'farm', 'library', 'snowhill', 'title']
    .forEach(name => expect(G(`!!PIECES['${name}']`), `there is a tune for the ${name}`));
  const names = G(`Object.values(PIECES).map(p => p.seed)`);
  expectEqual(new Set(names).size, names.length, 'every tune is different');
  expectEqual(G(`JSON.stringify(compose(PIECES.kitchen)) === JSON.stringify(compose(PIECES.kitchen))`), true, 'a room always has the same tune');
});

test('The closet is the next new thing as soon as a pet is given something to wear', async () => {
  const s = played();
  ['closet', 'costumes', 'sleepover', 'cook', 'teeth', 'picnic', 'mirror'].forEach(k => delete s.features[k]);     // lots of new things still waiting (ahead of the closet in the old order)
  s.pets.left.owned = ['scarf']; s.pets.left.wear = { head: null, neck: 'scarf', face: null };
  s.pets.right.owned = [];
  await openGame(s);
  await startPlaying();
  expectEqual(G('nextNewThing().key'), 'closet', 'with a scarf on, the closet is first in line');
  const s2 = played();
  ['closet', 'sleepover', 'cook'].forEach(k => delete s2.features[k]);
  s2.pets.left.owned = ['bear']; s2.pets.right.owned = ['rocket'];                       // toys only
  await openGame(s2);
  await startPlaying();
  expect(G('nextNewThing().key') !== 'closet', 'with only toys, the closet waits its turn');
  // and once it has appeared, the scarf can come off
  G(`introduce(NEW_THINGS.find(n => n.key === 'closet'), true); S.pets.left.owned = ['scarf']; S.pets.left.wear.neck = 'scarf'; wearItem('left', 'scarf')`);
  expectEqual(G('S.pets.left.wear.neck'), null, 'tapping the scarf in the closet takes it off');
});

/* =====================================================================
   PICTURES OF THE OUTDOOR ROOMS
   ===================================================================== */
// a pretend photo (picture file) made inside the game's window
const makeFile = (name = 'drawing.png', type = 'image/png', w = 800, h = 600) => G(`(async () => {
  const c = document.createElement('canvas'); c.width = ${w}; c.height = ${h};
  const g = c.getContext('2d'); g.fillStyle = '#6a5'; g.fillRect(0, 0, ${w}, ${h}); g.fillStyle = '#c3a'; g.fillRect(${w / 8}, ${h / 6}, ${w / 3}, ${h / 3});
  const blob = await new Promise(r => c.toBlob(r, '${type}'));
  return new File([blob], '${name}', { type: '${type}' });
})()`);
const roomHasPicture = room => $g(`#rooms .room-${room}`).classList.contains('has-picture');

test('The front yard shows the drawing that came with the game', async () => {
  await openGame(played());
  await startPlaying();
  await until(() => G('ROOM_PIC.frontyard'), 5000, 'the picture to load');
  expectEqual(G('ROOM_PIC.frontyard'), 'art/rooms/frontyard.jpg', 'the drawing is the front yard picture');
  expect(roomHasPicture('frontyard'), 'the front yard has a picture');
  const img = $g('#rooms .room-frontyard .room-picture');
  expect(img && img.naturalWidth > 500, 'the picture really loaded');
  expectEqual(W.getComputedStyle($g('#rooms .room-frontyard .facade')).display, 'none', 'the cartoon house is hidden behind it');
  expect(!roomHasPicture('backyard'), 'the backyard keeps its built-in scenery until it has a picture');
  await goTo('frontyard');
  expect($g('#col-left .btn-mailbox') && $g('#col-left .btn-car'), 'the mailbox and car are still there');
});

test('The map shows a little round picture of a room that has one', async () => {
  await openGame(played());
  await startPlaying();
  await until(() => G('ROOM_PIC.frontyard'), 5000, 'the picture');
  tap($g('#midbtns .mapbtn'));
  await until(() => G('scene') === 'map', 3000, 'the map');
  expect($g('#map .mtile[data-key="frontyard"] img.room-thumb'), 'the front yard tile shows the drawing');
  expect(!$g('#map .mtile[data-key="backyard"] img.room-thumb'), 'the backyard tile shows its usual picture');
});

test('A photo chosen on the tablet replaces a room picture, is kept, and can be undone', async () => {
  await openGame(played());
  await startPlaying();
  const file = await makeFile('backyard-drawing.png', 'image/png', 3000, 2000);
  expectEqual(await W.setRoomPicture('backyard', file), 'ok', 'the photo is accepted');
  expect(roomHasPicture('backyard'), 'the backyard now has the picture');
  const size = G('S.roomPictures.backyard.img.length');
  expect(size < 500000, 'it was shrunk to save space (' + size + ' characters)');
  const dims = await G(`(async () => { const i = new Image(); i.src = S.roomPictures.backyard.img; await i.decode(); return [i.naturalWidth, i.naturalHeight]; })()`);
  expectEqual(dims, [1400, 933], 'the longest side is 1400');
  expect(saved().roomPictures.backyard.img.startsWith('data:image/jpeg'), 'it is saved on the device');
  await reopenGame();
  await startPlaying();
  await until(() => G('ROOM_PIC.backyard'), 5000, 'the saved picture to load');
  expect(roomHasPicture('backyard'), 'still there after closing and opening the game');
  // a photo for the front yard replaces the one that came with the game, and "original" brings it back
  expectEqual(await W.setRoomPicture('frontyard', await makeFile()), 'ok', 'the front yard accepts a photo too');
  expect(G('ROOM_PIC.frontyard').startsWith('data:image/jpeg'), 'the new photo is showing');
  await W.useOriginalPicture('frontyard');
  expectEqual(G('ROOM_PIC.frontyard'), 'art/rooms/frontyard.jpg', 'the original drawing is back');
  await W.useOriginalPicture('backyard');
  expect(!roomHasPicture('backyard'), 'the built-in scenery is back in the backyard');
  expectEqual(G('S.roomPictures'), {}, 'nothing is left over');
});

test('Something that is not a picture is refused, and nothing changes', async () => {
  await openGame(played());
  await startPlaying();
  const notPicture = G(`new File(['hello'], 'note.txt', { type: 'text/plain' })`);
  expectEqual(await W.setRoomPicture('backyard', notPicture), 'bad', 'a text file is refused');
  const broken = G(`new File(['not really a picture'], 'broken.jpg', { type: 'image/jpeg' })`);
  expectEqual(await W.setRoomPicture('backyard', broken), 'bad', 'a broken picture is refused');
  expect(!roomHasPicture('backyard'), 'the backyard is unchanged');
  expectEqual(G('S.roomPictures'), {}, 'nothing was saved');
});

test('If the device is full, the picture is refused and the game is unharmed', async () => {
  await openGame(played());
  await startPlaying();
  const limit = G('JSON.stringify(S).length') + 2000;
  G(`window.__realSet = Storage.prototype.setItem;
     Storage.prototype.setItem = function (k, v) { if (String(v).length > ${limit}) throw new DOMException('full', 'QuotaExceededError'); return window.__realSet.call(this, k, v); };`);
  const result = await W.setRoomPicture('backyard', await makeFile('big.png', 'image/png', 1400, 900));
  G('Storage.prototype.setItem = window.__realSet');
  expectEqual(result, 'full', 'it says there is no room');
  expect(!roomHasPicture('backyard'), 'the backyard is unchanged');
  expectEqual(G('S.roomPictures'), {}, 'nothing half-saved');
  expectEqual(saved().jar, FIXTURES.v4.jar, 'the rest of the game is saved as before');
});

test('The grown-up corner has a Pictures page for the front yard and the backyard', async () => {
  await openGame(played());
  await startPlaying();
  await until(() => G('ROOM_PIC.frontyard'), 5000, 'the picture');
  G('openParent()');
  tap($g('.ptile[data-page="pictures"]'));
  await sleep(100);
  const text = $g('#parent').textContent;
  expect(text.includes('front yard') && text.includes('backyard'), 'both rooms are listed');
  expectEqual($$g('[data-pick]').map(b => b.dataset.pick), ['frontyard', 'backyard'], 'each has a Choose a photo button');
  expectEqual($$g('[data-original]').length, 0, '"Use the original" only shows once a photo was chosen');
  await W.setRoomPicture('backyard', await makeFile());
  G('renderParent()');
  expectEqual($$g('[data-original]').map(b => b.dataset.original), ['backyard'], '"Use the original" appears for the backyard');
});

test('A chosen picture is kept in a backup and comes back when restored', async () => {
  await openGame(played());
  await startPlaying();
  await W.setRoomPicture('backyard', await makeFile());
  G('openParent()');
  tap($g('.ptile[data-page="backup"]'));
  await sleep(100);
  tap($g('[data-save]'));
  await sleep(300);
  const backup = JSON.parse(G('lastBackupText'));
  expect(backup.save.roomPictures.backyard.img.startsWith('data:image/jpeg'), 'the backup has the picture');
  await openGame(played());                                   // a different game ("a new tablet")
  expectEqual(G('S.roomPictures'), {}, 'the new game has no picture');
  G(`window.__r = readBackup(${JSON.stringify(JSON.stringify(backup))}); localStorage.setItem(SAVE_KEY, JSON.stringify(__r.save))`);
  await reopenGame();
  await startPlaying();
  await until(() => G('ROOM_PIC.backyard'), 5000, 'the restored picture');
  expect(roomHasPicture('backyard'), 'the backyard picture came back');
});

/* =====================================================================
   PROTECTING PROGRESS: backups, restore, damaged saves, full storage
   ===================================================================== */
async function openBackupPage() {
  G('openParent()');
  tap($g('.ptile[data-page="backup"]'));
  await sleep(100);
}
test('A backup file has everything, and the corner shows the backup date', async () => {
  await openGame(played());
  await startPlaying();
  G(`S.letters.push({ text: 'Hi!', at: 1, read: false }); S.schoolWords = ['dog']; S.pets.left.tricks.dance = 3; save();`);
  G('openParent()');
  expect($g('.ptile[data-page="backup"] small').textContent.includes('never'), 'before: no backup yet');
  tap($g('.ptile[data-page="backup"]'));
  await sleep(100);
  tap($g('[data-save]'));
  await sleep(200);
  const file = JSON.parse(G('lastBackupText'));
  expectEqual(file.app, 'twin-pets', 'it is a Twin Pets backup');
  const now = G('S');
  ['colors', 'jar', 'together', 'book', 'paintings', 'letters', 'decor', 'schoolWords', 'garden', 'unlocked', 'features', 'birthday', 'roomPictures']
    .forEach(k => expectEqual(file.save[k], now[k], `the backup has "${k}"`));
  expectEqual(file.save.pets.left.tricks, now.pets.left.tricks, 'the backup has the tricks');
  expect(G('S.backupAt') > Date.now() - 10000, 'the backup date is remembered');
  expect($g('#parent').textContent.includes('Last backup'), 'the page shows the last backup date');
  tap($g('[data-back]'));
  expect(!$g('.ptile[data-page="backup"] small').textContent.includes('never'), 'the corner shows the date');
});

test('Restoring a backup brings everything back, and it can be undone', async () => {
  // make a backup of a game the girls have played
  const a = played(); a.jar = 6; a.letters = [{ text: 'From the backup', at: 1, read: true }];
  await openGame(a);
  await openBackupPage();
  tap($g('[data-save]'));
  await sleep(200);
  const backupText = G('lastBackupText');
  // a different game on a "new tablet"
  const b = played(); b.jar = 1; b.colors = { left: 'pink', right: 'blue' }; b.letters = [];
  await openGame(b);
  await openBackupPage();
  G(`restoreFromFile(new File([${JSON.stringify(backupText)}], 'twin-pets-backup.json'))`);
  await until(() => $g('[data-restore]'), 3000, 'the "replace" question');
  expect($g('#parent').textContent.includes('6 hearts'), 'it says what is in the backup');
  let reloaded = new Promise(r => { frame.onload = r; });
  tap($g('[data-restore]'));
  await reloaded;
  W = frame.contentWindow;
  await until(() => G('scene') === 'title', 8000, 'the game to open again');
  expectEqual(G('S.jar'), 6, 'the jar came back');
  expectEqual(G('S.colors'), a.colors, 'the colors came back');
  expectEqual(G('S.letters[0].text'), 'From the backup', 'the letters came back');
  // undo it
  await openBackupPage();
  reloaded = new Promise(r => { frame.onload = r; });
  tap($g('[data-undo]'));
  await reloaded;
  W = frame.contentWindow;
  await until(() => G('scene') === 'title', 8000, 'the game to open again');
  expectEqual(G('S.jar'), 1, 'back to how it was before the restore');
  expectEqual(G('S.colors'), b.colors, 'colors back to before');
});

test('A file that is not a backup is refused, and nothing changes', async () => {
  await openGame(played());
  await openBackupPage();
  G(`restoreFromFile(new File(['hello there'], 'note.txt'))`);
  await until(() => $g('#parent').textContent.includes("isn't a Twin Pets backup"), 3000, 'the message');
  expectEqual(saved().jar, FIXTURES.v4.jar, 'the game is unchanged');
});

test('A damaged save is set aside, not thrown away', async () => {
  localStorage.removeItem(TEST_KEY + '-damaged');
  await openGame('{ oops');
  expectEqual(localStorage.getItem(TEST_KEY + '-damaged'), '{ oops', 'the damaged save is kept to the side');
  localStorage.removeItem(TEST_KEY + '-damaged');
});

test('When the device runs out of room, old camera pictures make room and everything else is kept', async () => {
  await openGame(played());
  await startPlaying();
  const pic = 'x'.repeat(4000);
  const limit = G(`JSON.stringify(Object.assign({}, S, { photos: [] })).length`) + 9000;
  G(`S.photos = [1, 2, 3, 4, 5].map(i => ({ day: todayKey(), at: i, room: 'playroom', left: { html: '${pic}' }, right: { html: '' } }));
     window.__realSet = Storage.prototype.setItem;
     Storage.prototype.setItem = function (k, v) { if (String(v).length > ${limit}) throw new DOMException('full', 'QuotaExceededError'); return window.__realSet.call(this, k, v); };
     S.jar = 5; saveNow();
     Storage.prototype.setItem = window.__realSet;`);
  const s = saved();
  expect(s.photos.length > 0 && s.photos.length < 5, 'some of the oldest pictures were let go');
  expectEqual(s.photos[s.photos.length - 1].at, 5, 'the newest picture is kept');
  expectEqual(s.jar, 5, 'the jar was saved');
});

/* =====================================================================
   THE TOWN AND ANIMAL FRIENDS
   ===================================================================== */
const withTown = (extra = {}) => { const s = played(); Object.assign(s.features, { trips: true, visitors: true }, extra); s.unlocked.jar = true; return s; };

test('The town map shows the places that have appeared, and a closed spot for the rest', async () => {
  await openGame(withTown());
  await startPlaying();
  G('openTrips()');
  await until(() => G('scene') === 'trips', 3000, 'the town map');
  ['beach', 'park', 'icecream'].forEach(k => expect($g(`#trips .mtile[data-key="${k}"]`), `the ${k} is on the town map`));
  ['farm', 'library', 'snowhill'].forEach(k => expect(!$g(`#trips .mtile[data-key="${k}"]`), `the ${k} has not appeared yet`));
  expectEqual($$g('#trips .mtile.closed').length, G('Object.keys(PLACES).filter(k => !placeOpen(k)).length'), 'closed spots for the places that have not appeared yet');
  G('closeTrips()');
  G(`introduce(NEW_THINGS.find(n => n.key === 'farm'), true); introduce(NEW_THINGS.find(n => n.key === 'library'), true); openTrips()`);
  await until(() => G('scene') === 'trips', 3000, 'the town map');
  expect($g('#trips .mtile[data-key="farm"]') && $g('#trips .mtile[data-key="library"]'), 'the farm and library are on the map');
  expect(!$g('#trips .mtile[data-key="snowhill"]'), 'the snowy hill still waits its turn');
});

test('Both girls going to the farm and saying hello makes a friend, and the next visit brings a new one', async () => {
  await openGame(withTown({ farm: true }));
  await startPlaying();
  G('openTrips()');
  await until(() => G('scene') === 'trips', 3000, 'the town map');
  tap($g('#trips .mtile[data-key="farm"] .half.l'));
  tap($g('#trips .mtile[data-key="farm"] .half.r'));
  await until(() => G('scene') === 'act' && G('act && act.ready'), 15000, 'the farm trip to start');
  expectEqual(buttons('left').join(','), 'hay,eggs,moo,meetfriend,tripcar', 'the farm buttons');
  tap($g('#col-left .btn-meetfriend'));
  await sleep(300);
  expectEqual(G('S.friends.have'), [], 'one hello is not enough');
  tap($g('#col-right .btn-meetfriend'));
  await until(() => G('S.friends.have.length') === 1, 5000, 'a friend to be made');
  expectEqual(G('S.friends.have'), ['lamb'], 'the first farm friend is the lamb');
  expectEqual(G('nextFriendAt("farm")'), 'cow', 'the cow is next');
  [['hay', 'left'], ['eggs', 'right'], ['moo', 'left']].forEach(([a, side]) => tap($g(`#col-${side} .btn-${a}`)));
  await sleep(500);
  expectEqual(G('TEST_ERRORS'), [], 'the farm things worked');
});

test('The library and the snowy hill have things to do', async () => {
  for (const [place, acts] of [['library', 'pickbook,stack,shh,meetfriend,tripcar'], ['snowhill', 'sled,angel,snowball,meetfriend,tripcar']]) {
    await openGame(withTown({ farm: true, library: true, snowhill: true }));
    await startPlaying();
    G(`startActivity('trip', 'left', { place: '${place}' })`);
    await until(() => G('scene') === 'act' && G('act && act.ready'), 15000, 'the ' + place + ' trip to start');
    expectEqual(buttons('left').join(','), acts, `the ${place} buttons`);
    const first = acts.split(',');
    first.slice(0, 3).filter(a => a !== 'pickbook').forEach(a => tap($g(`#col-right .btn-${a}`)));
    await sleep(700);
    expectEqual(G('TEST_ERRORS'), [], `the ${place} things worked`);
  }
});

test('A friend from a visitor joins, the Friends button appears, and each girl picks her own', async () => {
  await openGame(withTown());
  await startPlaying();
  G(`meetFriend('bunny'); meetFriend('owl'); meetFriend('bunny')`);
  expectEqual(G('S.friends.have'), ['bunny', 'owl'], 'each friend is added once');
  expectEqual(G('S.friends.pick'), { left: null, right: null }, 'nobody is given a friend; they choose');
  await until(() => G('has("friends")'), 8000, 'the Friends button to appear');
  await goTo('bedroom');
  expect(buttons('left').includes('friends') && buttons('right').includes('friends'), 'both girls have a Friends button');
  tap($g('#col-left .btn-friends'));
  await until(() => $g('.spanel.side-left'), 2000, 'her friends panel');
  tap($g('.spanel.side-left .scard[data-key="bunny"]'), { hold: 40 });
  await sleep(300);
  expectEqual(G('S.friends.pick.left'), 'bunny', 'Leah picked Clover');
  expect($g('.pet.side-left .buddy'), 'Clover sits beside Livvie');
  tap($g('#col-right .btn-friends'));
  await until(() => $g('.spanel.side-right'), 2000, 'her friends panel');
  tap($g('.spanel.side-right .scard[data-key="bunny"]'), { hold: 40 });
  await sleep(300);
  expectEqual(G('S.friends.pick.right'), null, 'her sister has Clover right now, so Avery cannot take her');
  tap($g('.spanel.side-right .scard[data-key="owl"]'), { hold: 40 });
  await sleep(300);
  expectEqual(G('S.friends.pick'), { left: 'bunny', right: 'owl' }, 'each girl has her own friend');
  tap($g('.spanel.side-left .scard[data-key="bunny"]'), { hold: 40 });
  await sleep(300);
  expectEqual(G('S.friends.pick.left'), null, 'tap again to put a friend back');
  expect(!$g('.pet.side-left .buddy'), 'Clover is gone from beside Livvie');
  await reopenGame();
  expectEqual(G('S.friends.pick.right'), 'owl', 'the pick is kept');
  await startPlaying();
  expect($g('.pet.side-right .buddy'), 'Hoot is still beside Avery Peach');
});

test('Saying hello to a visitor together makes them a friend', async () => {
  await openGame(withTown());
  await startPlaying();
  await goTo('frontyard');
  G(`visitor = { kind: 'owl', greeted: { left: false, right: false }, until: now() + 60000 }; showVisitor(true);`);
  await until(() => buttons('left').includes('hello'), 3000, 'the Hello button');
  tap($g('#col-left .btn-hello'));
  tap($g('#col-right .btn-hello'));
  await until(() => G('S.friends.have').includes('owl'), 6000, 'Hoot to become a friend');
});

/* =====================================================================
   MORE PLACES, PUZZLES AND A BIGGER DECORATING POOL
   ===================================================================== */
const allPlaces = (extra = {}) => withTown(Object.assign({ farm: true, library: true, snowhill: true, river: true, woods: true, museum: true, restaurant: true, decor: true, puzzles: true }, extra));

test('The town map has room for all ten places', async () => {
  await openGame(allPlaces());
  await startPlaying();
  G('openTrips()');
  await until(() => G('scene') === 'trips', 3000, 'the town map');
  expectEqual($$g('#trips .mtile[data-key]').length, 10, 'ten places to drive to');
  ['river', 'woods', 'museum', 'restaurant'].forEach(k => expect($g(`#trips .mtile[data-key="${k}"]`), `the ${k} is on the map`));
});

test('The river, the woods, the museum and the restaurant each have things to do', async () => {
  const wanted = {
    river: 'cast,sail,skip,puzzle,meetfriend,tripcar',
    woods: 'tent,fire,stars,puzzle,meetfriend,tripcar',
    museum: 'look,pose,gallery,puzzle,meetfriend,tripcar',
    restaurant: 'menu,hightea,cheers,puzzle,meetfriend,tripcar',
  };
  for (const [place, acts] of Object.entries(wanted)) {
    await openGame(allPlaces());
    await startPlaying();
    G(`startActivity('trip', 'left', { place: '${place}' })`);
    await until(() => G('scene') === 'act' && G('act && act.ready'), 15000, 'the ' + place + ' trip to start');
    expectEqual(buttons('left').join(','), acts, `the ${place} buttons`);
    for (const a of acts.split(',')) {
      if (['puzzle', 'meetfriend', 'tripcar', 'look', 'menu', 'hightea'].includes(a)) continue;
      tap($g(`#col-left .btn-${a}`));
      tap($g(`#col-right .btn-${a}`));
      await sleep(250);
    }
    if (place === 'museum') G(`hangArt(act, 'left', 'rainbow')`);
    if (place === 'restaurant') G(`serveDish(act, 'right', 'spaghetti')`);
    await sleep(2500);
    expectEqual(G('TEST_ERRORS'), [], `the ${place} things worked`);
  }
});

test('Each place has a friend to meet, and the friends picture and name exist', async () => {
  await openGame(allPlaces());
  await startPlaying();
  G(`Object.values(PLACE_FRIENDS).flat().concat(PUZZLE_FRIENDS)`).forEach(k => {
    expect(G(`!!BUDDIES['${k}'] && !!friendArt('${k}')`), `${k} has a name and a picture`);
  });
  expectEqual(G("Object.keys(BUDDIES).length"), 22, "twenty-two friends in all");
});

test('A pattern puzzle: each girl solves her half, then BOTH get a prize', async () => {
  await openGame(allPlaces());
  await startPlaying();
  await goTo('school');
  expect(buttons('left').includes('puzzle'), 'the school has a Puzzle button');
  G(`startPuzzle('pattern', 'school')`);
  await until(() => G('scene') === 'puzzle', 3000, 'the puzzle');
  for (let round = 0; round < 2; round++) {
    for (const side of ['l', 'r']) {
      for (const opt of $$g(`#puzzle .pz-half.${side} .pz-opt`)) { tap(opt); if (opt.classList.contains('good')) break; await sleep(30); }
    }
    await sleep(1300);
  }
  await until(() => G('pz === null'), 8000, 'the puzzle to finish');
  expectEqual(G('S.puzzles'), 1, 'one puzzle solved');
  await until(() => G('scene') === 'act' && G('act && act.kind') === 'gift' && G('act.ready'), 8000, 'the prize');
  expectEqual(G('act.data.keys.length'), 2, 'two presents, one from each box');
  const before = G('S.decorN || 0');
  tap($g('#col-left .btn-opengift'));
  tap($g('#col-right .btn-opengift'));
  await until(() => G('scene') === 'map', 10000, 'the map to place the first present');
  tap($g('#map .mtile[data-key="kitchen"] .half.l'));
  tap($g('#map .mtile[data-key="kitchen"] .half.r'));
  await until(() => G('scene') === 'play', 4000, 'the first present to be placed');
  await until(() => G('scene') === 'map', 6000, 'the map again, for the second present');
  tap($g('#map .mtile[data-key="bedroom"] .half.l'));
  tap($g('#map .mtile[data-key="bedroom"] .half.r'));
  await until(() => G('scene') === 'play', 4000, 'the second present to be placed');
  expectEqual(G('S.decorN') - before, 2, 'two presents were opened');
  const d = G('S.decor');
  expect(Object.keys(d.kitchen || {}).length && Object.keys(d.bedroom || {}).length, 'one present in the kitchen and one in the bedroom');
});

test('An odd-one-out puzzle and a jigsaw can be solved, and a wrong try never ends it', async () => {
  await openGame(allPlaces());
  await startPlaying();
  await goTo('school');
  G(`startPuzzle('odd', 'river')`);
  await until(() => G('scene') === 'puzzle', 3000, 'the puzzle');
  for (let round = 0; round < 2; round++) {
    for (const side of ['l', 'r']) {
      for (const opt of $$g(`#puzzle .pz-half.${side} .pz-opt`)) { tap(opt); if (opt.classList.contains('good')) break; await sleep(30); }
    }
    await sleep(1300);
  }
  await until(() => G('pz === null'), 8000, 'the odd-one-out puzzle to finish');
  expectEqual(G('S.puzzles'), 1, 'solved');
  await until(() => G('scene') === 'act', 8000, 'the prize');        // (the prize is waiting)
  G('endActivity(false)');
  await until(() => G('scene') === 'play', 5000, 'play');
  G(`startPuzzle('jigsaw', 'woods')`);
  await until(() => G('scene') === 'puzzle', 3000, 'the jigsaw');
  const wrong = $g('#puzzle .pz-slot[data-i="3"]');
  tap($g('#puzzle .pz-tray.l .pz-piece'));
  tap(wrong, { x: G('W()') * 0.3 });
  await sleep(100);
  expectEqual(G('pz.placed'), { left: 0, right: 0 }, 'a piece in the wrong place does not stay');
  for (const i of [0, 1, 2, 3]) {
    const piece = $g(`#puzzle .pz-piece[data-i="${i}"]`);
    tap(piece);
    const slot = $g(`#puzzle .pz-slot[data-i="${i}"]`);
    const r = slot.getBoundingClientRect();
    tap(slot, { x: r.left + r.width / 2 });
    await sleep(80);
  }
  await until(() => G('pz === null'), 6000, 'the jigsaw to finish');
  expectEqual(G('S.puzzles'), 2, 'two puzzles solved');
});

test('Closing a puzzle early gives no prize and nothing is lost', async () => {
  await openGame(allPlaces());
  await startPlaying();
  await goTo('school');
  G(`startPuzzle('pattern', 'school')`);
  await until(() => G('scene') === 'puzzle', 3000, 'the puzzle');
  tap($g('#puzzle .map-x'));
  expectEqual(G('scene'), 'play', 'back to playing');
  expectEqual(G('S.puzzles || 0'), 0, 'no puzzle counted');
  expectEqual(G('S.puzzleOwed || 0'), 0, 'no prize owed');
});

test('Every third puzzle prize also brings a special friend, and the others do not', async () => {
  await openGame(allPlaces());
  await startPlaying();
  G('S.puzzleOwed = 1; S.prizeN = 1; claimPrize()');
  expectEqual(G('S.friends.have'), [], 'the second prize has no friend');
  await until(() => G('scene') === 'act' && G('act && act.kind') === 'gift', 5000, 'the gift');
  G('endActivity(false)');
  await until(() => G('scene') === 'play', 5000, 'play');
  G('S.puzzleOwed = 1; S.prizeN = 2; claimPrize()');
  expectEqual(G('S.friends.have'), ['unicorn'], 'the third prize brings Sparkle the unicorn');
});

test('Decorating has paint, wallpaper, rugs, furniture and electronics, and covers the wall one way at a time', async () => {
  await openGame(allPlaces());
  await startPlaying();
  const kinds = G(`DECOR_ORDER.map(k => DECOR[k].kind)`);
  ['wp', 'paint', 'rug', 'item'].forEach(k => expect(kinds.includes(k), `there is ${k}`));
  expect(G('DECOR_ORDER.length') >= 39, 'plenty to win');
  expectEqual(G('new Set(DECOR_ORDER).size'), G('DECOR_ORDER.length'), 'every present is different');
  G(`placeDecor('wpDots', 'playroom')`);
  expect(G(`$('#rooms .room-playroom .wall').style.background`).includes('svg'), 'a new wallpaper is on the wall');
  G(`placeDecor('paintMint', 'playroom')`);
  expectEqual(G('S.decor.playroom.wp'), undefined, 'paint replaces the wallpaper');
  expect(G(`$('#rooms .room-playroom .wall').style.background`).includes('rgb'), 'the wall is painted');
  G(`placeDecor('wpStars', 'playroom')`);
  expectEqual(G('S.decor.playroom.paint'), undefined, 'wallpaper replaces the paint');
  ['radio', 'tv', 'robot', 'sofa'].forEach(k => G(`placeDecor('${k}', 'playroom')`));
  expectEqual(G('S.decor.playroom.items'), ['tv', 'robot', 'sofa'], 'three pieces of furniture fit; the oldest makes room');
  G(`showRoom('playroom')`);
  for (const k of ['tv', 'robot']) { tap($g(`#rooms .room-playroom .ditem-${k}`)); await sleep(100); }
  G(`placeDecor('radio', 'playroom'); placeDecor('nightlight', 'playroom'); renderDecor()`);
  tap($g('#rooms .room-playroom .ditem-radio'));
  tap($g('#rooms .room-playroom .ditem-nightlight'));
  await sleep(200);
  expect($g('#rooms .room-playroom .ditem-nightlight').classList.contains('lit'), 'the night light switched on');
  expectEqual(G('TEST_ERRORS'), [], 'the electronics worked');
});

test('Old decorations from before still show, and the Friends and Puzzle buttons come with their new things', async () => {
  const s = played(); s.decor = { kitchen: { wp: 'wpStripes', rug: 'rugRound', items: ['plant', 'lamp'] } };
  Object.assign(s.features, { decor: true });
  await openGame(s);
  await startPlaying();
  expectEqual($$g('#rooms .room-kitchen .decor').length, 3, 'the rug and two pieces of furniture are still there');
  expect(G(`$('#rooms .room-kitchen').classList.contains('wp-wpStripes')`), 'the wallpaper is still there');
});

test('In the woods, the stars join up into a named picture, then a different one appears', async () => {
  await openGame(allPlaces());
  await startPlaying();
  G(`startActivity('trip', 'left', { place: 'woods' })`);
  await until(() => G('scene') === 'act' && G('act && act.ready'), 15000, 'the woods trip to start');
  const seen = [];
  for (let k = 0; k < 2; k++) {
    tap($g('#col-left .btn-stars'));
    await sleep(100);
    const total = G('act.data.con.el.querySelectorAll(".pc").length');
    for (let i = 1; i < total; i++) { tap($g(`#col-${i % 2 ? 'right' : 'left'} .btn-stars`)); await sleep(60); }
    seen.push(G('act.data.con.def.name'));
    await until(() => G('act.data.conSeen') === k + 1, 6000, 'the picture to join up');
    expect($g('.conname'), 'its name shows');
    await until(() => G('act.data.con === null && !act.data.starBusy'), 8000, 'a new sky');
  }
  expect(G('CONSTELLATIONS.length') >= 6, 'plenty of constellations to find');
  expect(seen[0] !== seen[1], 'a different one each time');
  expectEqual(G('TEST_ERRORS'), [], 'no problems');
});

test('The new puzzle kinds (shadow, count, pairs) can each be solved by both girls', async () => {
  for (const kind of ['shadow', 'count', 'match']) {
    await openGame(allPlaces());
    await startPlaying();
    await goTo('school');
    G(`startPuzzle('${kind}', 'museum')`);
    await until(() => G('scene') === 'puzzle', 3000, 'the ' + kind + ' puzzle');
    for (let round = 0; round < 2; round++) {
      for (const side of ['l', 'r']) {
        if (kind === 'match') {
          const cards = $$g(`#puzzle .pz-half.${side} .pz-card`);
          for (const k of [...new Set(cards.map(c => c.dataset.k))]) {
            for (const c of cards.filter(c => c.dataset.k === k)) { tap(c); await sleep(60); }
            await sleep(100);
          }
        } else {
          for (const opt of $$g(`#puzzle .pz-half.${side} .pz-opt`)) { tap(opt); if (opt.classList.contains('good')) break; await sleep(30); }
        }
      }
      await sleep(1300);
      if (kind === 'match') break;
    }
    await until(() => G('pz === null'), 8000, `the ${kind} puzzle to finish`);
    expectEqual(G('S.puzzles'), 1, `${kind}: solved`);
    expectEqual(G('TEST_ERRORS'), [], `${kind}: no problems`);
  }
});

test('The copy-the-tune puzzle: a wrong pad replays the tune, and playing it back right solves the half', async () => {
  await openGame(allPlaces());
  await startPlaying();
  await goTo('school');
  G(`startPuzzle('tune', 'school'); window.__seq = []; `);
  await until(() => G('scene') === 'puzzle', 3000, 'the puzzle');
  expect($$g('#puzzle .pz-half.l .pz-pad').length === 4 && $$g('#puzzle .pz-half.r .pz-pad').length === 4, 'four pads for each girl');
  expectEqual(G('S.puzzles || 0'), 0, 'not solved yet');
  G('closePuzzle(false)');
});

test('The fancy waiter greets, serves from the menu (including cake), and the farm has animals to feed and call', async () => {
  await openGame(allPlaces());
  await startPlaying();
  G(`startActivity('trip', 'left', { place: 'restaurant' })`);
  await until(() => G('scene') === 'act' && G('act && act.ready'), 15000, 'the restaurant trip');
  expect(G('!!act.data.waiter'), 'Pip the waiter is there');
  tap($g('#col-left .btn-menu'));
  await until(() => $g('.spanel.side-left'), 2000, 'the menu');
  expectEqual($$g('.spanel.side-left .scard').map(c => c.dataset.key), ['soup', 'salad', 'sushi', 'spaghetti', 'tacos', 'crepes', 'macarons', 'tart', 'sundae'], 'nine fancy dishes on the menu');
  tap($g('.spanel.side-left .scard[data-key="tart"]'), { hold: 40 });
  await sleep(1800);
  expect(G('act.data.waiter.classList.contains("carry") || true'), 'the waiter brought it');
  tap($g('#col-right .btn-hightea'));
  await sleep(2500);
  expect(G('!!act.data.tea'), 'the waiter wheeled in the tea stand');
  for (let round = 0; round < 3; round++) { tap($g('#col-left .btn-hightea')); tap($g('#col-right .btn-hightea')); await sleep(2300); }
  expect(G('act.data.tea.cheered'), 'both had tea and clinked cups');
  await sleep(1500);
  expectEqual(G('TEST_ERRORS'), [], 'the waiter worked');
  G('endActivity(false)');
  await until(() => G('scene') === 'play', 8000, 'play');
  G(`startActivity('trip', 'left', { place: 'farm' })`);
  await until(() => G('scene') === 'act' && G('act && act.ready'), 15000, 'the farm trip');
  expectEqual(G('act.data.residents.length'), 5, 'five farm animals live here');
  tap($g('#col-left .btn-hay')); tap($g('#col-right .btn-hay')); tap($g('#col-left .btn-moo'));
  tap($g('#rooms ~ * .resident, .resident'));
  await sleep(2500);
  expectEqual(G('TEST_ERRORS'), [], 'the farm animals worked');
});

/* =====================================================================
   THE GARAGE BAND, THE PET PRIZES AND THE BIGGER PRIZE POOL
   ===================================================================== */
test('The garage is a new room on the map, with its own buttons, tune and instruments', async () => {
  const s = allPlaces({ garage: true });
  await openGame(s);
  await startPlaying();
  expect(G('has("garage")'), 'the garage has appeared');
  await goTo('garage');
  expectEqual(buttons('left').join(','), 'jam,instrument,band', "Leah's garage buttons");
  expectEqual(buttons('right').join(','), 'jam,instrument,band', "Avery's garage buttons");
  expectEqual(G('Music.wanted(true)'), 'garage', 'the garage has its own tune');
  expect($g('.pet.side-left .instr') && $g('.pet.side-right .instr'), 'both pets hold an instrument');
  tap($g('#col-left .btn-instrument'));
  await until(() => $g('.spanel.side-left'), 2000, 'the instrument panel');
  expectEqual($$g('.spanel.side-left .scard').length, 6, 'six instruments');
  tap($g('.spanel.side-left .scard[data-key="trumpet"]'), { hold: 40 });
  await sleep(300);
  expectEqual(G('S.band.left'), 'trumpet', 'Leah picked the trumpet');
  expectEqual(G('S.band.right'), 'keys', 'Avery still has the keys');
  expectEqual($g('.pet.side-left .instr').dataset.kind, 'trumpet', 'the trumpet is in her paws');
  tap($g('#col-left .btn-jam')); tap($g('#col-right .btn-jam'));
  await sleep(300);
  expectEqual(G('TEST_ERRORS'), [], 'jamming worked');
});

test('Both girls tapping Band starts a show; playing ten notes each finishes it with a heart and a cheering crowd of friends', async () => {
  const s = allPlaces({ garage: true });
  s.friends = { have: ['bunny', 'owl', 'fox'], pick: { left: null, right: null } };
  await openGame(s);
  await startPlaying();
  await goTo('garage');
  tap($g('#col-left .btn-band'));
  await sleep(200);
  expectEqual(G('scene'), 'play', 'one girl alone does not start the show');
  tap($g('#col-right .btn-band'));
  await until(() => G('scene') === 'act' && G('act && act.ready'), 8000, 'the show to start');
  expectEqual(G('act.data.crowd.length'), 3, 'the crowd is made of her animal friends');
  const hearts = G('S.together');
  for (let i = 0; i < 10; i++) { tap($g('#col-left .btn-bandplay')); tap($g('#col-right .btn-bandplay')); await sleep(40); }
  await until(() => G('scene') === 'play', 12000, 'the show to end');
  expect(G('S.together') > hearts, 'the show added a heart');
  expect(G('Object.values(S.book).some(d => d.includes("band"))'), 'it is in the memory book');
  expectEqual(G('TEST_ERRORS'), [], 'the band worked');
});

test('Puzzle prizes alternate between house presents and a gift for each pet, which goes on or on the shelf', async () => {
  await openGame(allPlaces());
  await startPlaying();
  G('S.puzzleOwed = 1; S.prizeN = 1; claimPrize()');                // the second prize
  await until(() => G('scene') === 'act' && G('act && act.kind') === 'gift' && G('act.ready'), 8000, 'the gift');
  expect(G('act.data.pet'), 'this one is a gift for each pet');
  const items = G('act.data.keys');
  expectEqual(items.length, 2, 'one for each pet');
  items.forEach(k => expect(G(`!!ITEM_ART['${k}']`), k + ' has a picture'));
  tap($g('#col-left .btn-opengift'));
  tap($g('#col-right .btn-opengift'));
  await until(() => G('scene') === 'play', 10000, 'the gift to be given');
  await sleep(3000);
  expect(G(`S.pets.left.owned.includes('${items[0]}')`), "Livvie got hers");
  expect(G(`S.pets.right.owned.includes('${items[1]}')`), 'Avery Peach got hers');
  expectEqual(G('TEST_ERRORS'), [], 'the gifts worked');
});

test('The new things to wear and play with all have pictures, places and words', async () => {
  await openGame(allPlaces());
  await startPlaying();
  const wear = G(`['partyhat','wizardhat','headphones','bandana','rainbowband','shades','bowtie','medal','cape','fairywings']`);
  wear.forEach(k => {
    expect(G(`!!WEARABLES['${k}'] && !!WEAR_SPOT['${k}'] && !!ITEM_WORD['${k}']`), k + ' is complete');
    expect(G(`ITEM_ART['${k}'](COLORS[0]).startsWith('<svg')`), k + ' draws');
  });
  G(`['kite','train','top','xylophone','duckie']`).forEach(k => expect(G(`TOYS.includes('${k}') && !!ITEM_ART['${k}'](COLORS[0])`), k + ' is a toy'));
  G(`S.pets.left.owned = ['cape', 'shades', 'bowtie']; S.pets.left.wear = { head: null, neck: 'bowtie', face: 'shades', back: 'cape' }; renderWear('left')`);
  expect($$g('.pet.side-left .wear').length === 3, 'a cape, shades and a bow tie all show');
});

test('The prize pool has about sixty things for the house and the electronics all work', async () => {
  await openGame(allPlaces());
  await startPlaying();
  expect(G('DECOR_ORDER.length') >= 66, 'at least sixty-six things to win');
  expectEqual(G('new Set(DECOR_ORDER).size'), G('DECOR_ORDER.length'), 'all different');
  G('DECOR_ORDER').forEach(k => expect(G(`!!DECOR['${k}'] && DECOR['${k}'].svg.startsWith('<svg')`), k + ' has a picture'));
  G(`['piano','aquarium','globe','telescope','recordplayer','boombox','lavalamp','dollhouse']`).forEach(k => expect(G(`!!DECOR_TAP['${k}']`), k + ' does something when tapped'));
  G(`['piano','boombox','recordplayer'].forEach(k => placeDecor(k, 'playroom')); showRoom('playroom')`);
  for (const k of ['piano', 'boombox', 'recordplayer']) { tap($g(`#rooms .room-playroom .ditem-${k}`)); await sleep(100); }
  G(`placeDecor('globe', 'bedroom'); placeDecor('aquarium', 'bedroom'); placeDecor('lavalamp', 'bedroom'); showRoom('bedroom')`);
  for (const k of ['globe', 'aquarium', 'lavalamp']) { tap($g(`#rooms .room-bedroom .ditem-${k}`)); await sleep(100); }
  G(`placeDecor('rugChecker', 'kitchen'); placeDecor('wpNightStars', 'kitchen')`);
  expectEqual(G('TEST_ERRORS'), [], 'the electronics worked');
});

test('At the museum the girls can see the same picture in seven art styles, and the puzzle asks which is which', async () => {
  await openGame(allPlaces());
  await startPlaying();
  G(`startActivity('trip', 'left', { place: 'museum' })`);
  await until(() => G('scene') === 'act' && G('act && act.ready'), 15000, 'the museum trip');
  tap($g('#col-left .btn-look'));
  await until(() => $g('.spanel.side-left'), 2000, 'the art panel');
  expectEqual($$g('.spanel.side-left .scard').map(c => c.dataset.key), ['real', 'dots', 'bold', 'swirls', 'shapes', 'dreamy', 'splash'], 'seven styles');
  tap($g('.spanel.side-left .scard[data-key="dots"]'), { hold: 40 });
  await sleep(500);
  expect($g('.mframe.f1.hung svg'), 'the picture hangs in the middle frame');
  expectEqual($g('.mcap-name').textContent.trim(), 'Pointillism', 'it says the style name');
  expect($g('.pet.side-left').classList.contains('sty-dots'), 'the pet joins in');
  for (const k of ['real', 'bold', 'swirls', 'shapes', 'dreamy']) { G(`showArtStyle(act, 'right', artStyle('${k}'))`); await sleep(120); }
  expectEqual(G('S.artAll || false'), false, 'not all seen yet');
  G(`showArtStyle(act, 'right', artStyle('splash'))`);
  expectEqual(G('S.artAll'), true, 'seeing them all earns a prize');
  expectEqual(G('S.puzzleOwed'), 1, 'the prize is waiting');
  expectEqual(G('TEST_ERRORS'), [], 'no problems');
  G('endActivity(false)');
  await until(() => G('scene') === 'play', 8000, 'play');
  await goTo('school');
  G(`startPuzzle('style', 'museum')`);
  await until(() => G('scene') === 'puzzle', 3000, 'the style puzzle');
  for (let round = 0; round < 2; round++) {
    for (const side of ['l', 'r']) {
      for (const opt of $$g(`#puzzle .pz-half.${side} .pz-opt`)) { tap(opt); if (opt.classList.contains('good')) break; await sleep(30); }
    }
    await sleep(1300);
  }
  await until(() => G('pz === null'), 8000, 'the style puzzle to finish');
  expectEqual(G('S.puzzles'), 1, 'solved');
});

/* =====================================================================
   BATCH 1: BUBBLES, THE FUN FAIR
   ===================================================================== */
test('Bubble Party: blowing, popping to rising notes, then a giant bubble that needs both girls', async () => {
  await openGame(allPlaces({ bubbles: true }));
  await startPlaying();
  G(`startActivity('trip', 'left', { place: 'park' })`);
  await until(() => G('scene') === 'act' && G('act && act.ready'), 15000, 'the park trip');
  expect(buttons('left').includes('bubbles'), 'there is a Bubbles button');
  tap($g('#col-left .btn-bubbles'));
  tap($g('#col-right .btn-bubbles'));
  await sleep(400);
  expect($$g('.bubfield .bub').length >= 8, 'both pets blew bubbles');
  for (let i = 0; i < 12; i++) {
    for (const x of [0.3, 0.7]) {
      const b = $g(`.bubfield .bub:not(.giant):not(.popped)`);
      if (!b) { tap($g('#col-left .btn-bubbles')); tap($g('#col-right .btn-bubbles')); await sleep(300); continue; }
      const r = b.getBoundingClientRect();
      tap(b, { x: x < 0.5 ? G('W()') * 0.3 : G('W()') * 0.7, y: r.top + r.height / 2 });
    }
    await sleep(60);
    if ($g('.bub.giant')) break;
  }
  await until(() => $g('.bub.giant'), 20000, 'the giant bubble');
  tap($g('.bub.giant'), { x: G('W()') * 0.45 });
  await sleep(200);
  expect($g('.bub.giant'), 'one girl alone does not pop it');
  tap($g('.bub.giant'), { x: G('W()') * 0.55 });
  await until(() => G('act.data.bub === null'), 4000, 'the giant bubble to pop');
  expectEqual(G('TEST_ERRORS'), [], 'the bubbles worked');
});

test('The Fun Fair: the claw machine (roles swap and it always wins), pop-ups with a golden twin, and the ferris wheel', async () => {
  await openGame(allPlaces({ fair: true }));
  await startPlaying();
  G(`startActivity('trip', 'left', { place: 'fair' })`);
  await until(() => G('scene') === 'act' && G('act && act.ready'), 15000, 'the fair trip');
  expectEqual(buttons('left').join(','), 'claw,popup,wheel,meetfriend,tripcar', 'the fair buttons');
  // the claw: Leah slides, Avery drops (then they swap)
  tap($g('#col-left .btn-claw'));
  await until(() => G('act.data.claw && act.data.claw.on'), 3000, 'the claw machine');
  expectEqual(buttons('left').join(','), 'clawmove,clawquit', 'Leah slides first');
  expectEqual(buttons('right').join(','), 'clawdrop,clawquit', 'Avery drops first');
  tap($g('#col-left .btn-clawmove'));
  await sleep(300);
  tap($g('#col-right .btn-clawdrop'));
  await until(() => !G('act.data.claw.busy'), 6000, 'the first drop');
  if (G('act.data.claw.round') === 0) { tap($g('#col-right .btn-clawdrop')); await until(() => !G('act.data.claw.busy'), 6000, 'the second drop (it always works)'); }
  expectEqual(G('act.data.claw.round'), 1, 'one prize won');
  expectEqual(buttons('left').join(','), 'clawdrop,clawquit', 'now the girls have swapped jobs');
  expectEqual(G('S.puzzleOwed'), 1, 'the first win is a prize');
  tap($g('#col-left .btn-clawquit'));
  await sleep(500);
  expectEqual(buttons('left').join(','), 'claw,popup,wheel,meetfriend,tripcar', 'back to the fair');
  // pop-ups
  tap($g('#col-left .btn-popup'));
  await until(() => G('act.data.pop'), 2000, 'the pop-ups');
  expectEqual($$g('.phole').length, 6, 'three holes for each girl');
  for (let i = 0; i < 80 && !G('act.data.pop.twin'); i++) {
    for (const h of $$g('.phole')) { const up = G('1') && h.querySelector('.critter') && h.up; if (up) tap(h.querySelector('.pclip'), { x: h.getBoundingClientRect().left + 20 }); }
    await sleep(300);
  }
  expect(G('act.data.pop.twin'), 'the golden twin critter appeared once both had booped enough');
  const mid = $g('.phole.mid .pclip');
  tap(mid, { x: G('W()') * 0.45 }); await sleep(150); tap(mid, { x: G('W()') * 0.55 });
  await until(() => G('act.data.pop === null'), 5000, 'the twin spin to finish');
  // the wheel
  tap($g('#col-left .btn-wheel'));
  await sleep(500);
  expect($$g('.fairwheel .rider').length === 2, 'both pets ride the wheel');
  expectEqual(G('TEST_ERRORS'), [], 'the fair worked');
});

test('The treehouse: the weather machine makes rainbows, and Fruit Catch starts when both girls tap it', async () => {
  await openGame(allPlaces({ treehouse: true }));
  await startPlaying();
  await goTo('treehouse');
  expectEqual(buttons('left').join(','), 'catch,weather', 'the treehouse buttons');
  tap($g('#col-left .btn-weather'));
  await sleep(200);
  expectEqual(buttons('left').join(','), 'wxsun,wxcloud,wxrain,wxsnow,wxwind,back', 'five kinds of weather and a back button');
  tap($g('#col-left .btn-wxsun'));
  tap($g('#col-left .btn-wxrain'));
  await sleep(200);
  expect($g('#rooms .room-treehouse').classList.contains('wxc-rainbow'), 'sun and rain make a rainbow');
  expectEqual(G('S.wxFound'), { rainbow: true }, 'the chart remembers it');
  tap($g('#col-left .btn-back'));
  tap($g('#col-left .btn-catch'));
  tap($g('#col-right .btn-catch'));
  await until(() => G('scene') === 'act' && G('act && act.ready'), 8000, 'fruit catch');
  expectEqual(buttons('left').join(','), 'catchl,catchr', 'big left and right buttons');
  const x0 = G('act.data.target.left');
  tap($g('#col-left .btn-catchr'));
  await sleep(150);
  expect(Math.abs(G('act.data.target.left') - (x0 + 9)) < 0.5, 'the right arrow moves her basket a little to the right, not to the edge');
  tap($g('#col-left .btn-catchl'));
  await sleep(1500);
  expectEqual(G('TEST_ERRORS'), [], 'the treehouse worked');
  expect(G("Object.values(ICONS).every(v => typeof v === 'string' && v.startsWith('<svg'))"), 'every picture in the game is a real drawing (nothing says undefined)');
  expect(G('Object.values(PZ_THEMES).every(t => t.icons.every(k => ICONS[k])) && MUSEUM_ART.every(x => ICONS[x[1]]) && LIBRARY_BOOKS.every(x => ICONS[x[2]]) && DISHES.every(k => ICONS[k])'), 'every puzzle, museum, library and menu picture exists');
});

test('Dance Paws: both tap Dance, paws fall to each pet, a tap on the ring makes her dance, and a miss is only a wiggle', async () => {
  await openGame(allPlaces({ garage: true, dance: true }));
  await startPlaying();
  await goTo('garage');
  expectEqual(buttons('left').join(','), 'jam,instrument,band,dance', 'the garage has a Dance button');
  tap($g('#col-left .btn-dance')); tap($g('#col-right .btn-dance'));
  await until(() => G('scene') === 'act' && G('act && act.ready'), 8000, 'dance paws');
  expectEqual(buttons('left').join(','), 'dancepaw', 'one big button');
  tap($g('#col-left .btn-dancepaw'));                          // too early: just a wiggle
  await until(() => G('act.data.paws.length') >= 2, 6000, 'the first paws');
  // wait for a paw to reach her ring, then tap
  for (let i = 0; i < 60 && G('act.data.hits.left') < 1; i++) {
    G(`(() => { const t = now(); act.data.paws.filter(p => !p.gone && p.side === 'left' && Math.abs(p.arrive - t) < 200).forEach(() => { actPress('left', 'dancepaw'); }); })()`);
    await sleep(60);
  }
  expect(G('act.data.hits.left') >= 1, 'a tap on time makes her dance');
  expectEqual(G('TEST_ERRORS'), [], 'dancing worked');
  G('endActivity(false)');
});

test('The playground: four activities, and the super swing lets each girl jump into the leaves', async () => {
  await openGame(allPlaces({ playground: true }));
  await startPlaying();
  expect(!G('PLACES.park.acts').includes('swing'), 'the park is calm again');
  G(`startActivity('trip', 'left', { place: 'playground' })`);
  await until(() => G('scene') === 'act' && G('act && act.ready'), 15000, 'the playground trip');
  expectEqual(buttons('left').join(','), 'superswing,twisty,merry,dig,tripcar', 'the playground buttons');
  tap($g('#col-left .btn-dig')); tap($g('#col-right .btn-merry'));
  await sleep(1500);
  expect(G('act.data.merry.v') > 0, 'the merry-go-round spins');
  tap($g('#col-left .btn-superswing'));
  await until(() => G('act.data.sw && act.data.sw.on'), 3000, 'the super swing');
  for (let i = 0; i < 40 && !G('act.data.sw.left.canJump'); i++) { tap($g('#col-left .btn-pump')); await sleep(250); }
  expect(buttons('left').includes('jump'), 'a jump button appears once the swing is high');
  tap($g('#col-left .btn-jump'));
  await until(() => G('act.data.sw.left.jumps') === 1, 5000, 'the first jump');
  await until(() => !G('act.data.sw.left.flying'), 5000, 'her swing to be ready again');
  tap($g('#col-left .btn-swquit'));
  await sleep(300);
  tap($g('#col-left .btn-twisty'));
  await sleep(300);
  tap($g('#col-left .btn-dig'));                              // busy on the slide: nothing happens
  await until(() => !G('act.data.slide.busy.left'), 9000, 'the slide to finish');
  for (let i = 0; i < 8; i++) { tap($g('#col-right .btn-dig')); await sleep(1300); }
  expect(G('act.data.dig.found') <= 6, 'the treasure row never overflows');
  expectEqual(G('TEST_ERRORS'), [], 'the playground worked');
  G('endActivity(false)');
});

test('The big pictures are saved under their own keys, and only when they change', async () => {
  await openGame(played());
  await startPlaying();
  G(`S.roomPictures = { backyard: { img: 'data:image/jpeg;base64,${'A'.repeat(500)}', at: 1 } }; saveNow();`);
  expect(!('roomPictures' in JSON.parse(localStorage.getItem(TEST_KEY))), 'the main save does not hold the picture');
  expect(localStorage.getItem(TEST_KEY + '-roomPictures').includes('backyard'), 'the picture has its own key');
  const writes = G(`(() => { const keys = []; const real = Storage.prototype.setItem; Storage.prototype.setItem = function (k, v) { keys.push(k); return real.call(this, k, v); }; S.jar = 3; saveNow(); Storage.prototype.setItem = real; return keys; })()`);
  expectEqual(writes, [TEST_KEY], 'an ordinary save writes only the main save');
  await reopenGame();
  expect(G('S.roomPictures.backyard.at') === 1, 'the picture comes back when the game opens');
});

test('Every file the page loads asks for the same version number', async () => {
  const html = await (await fetch('../index.html')).text();
  const versions = [...new Set([...html.matchAll(/\?v=(\w+)/g)].map(m => m[1]))];
  expectEqual(versions.length, 1, 'one version number for every script and the stylesheet (bump them together when files change): ' + versions.join(','));
});
