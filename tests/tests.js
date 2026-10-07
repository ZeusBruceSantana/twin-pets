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
    ['garden', 'letters', 'photos', 'paintings', 'decor', 'timer', 'fridge', 'roomPictures'].forEach(k => expect(S[k] !== undefined, `${name}: new "${k}" was added`));
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
  ['playroom', 'kitchen', 'bathroom', 'backyard', 'bedroom', 'frontyard', 'school', 'beach', 'park', 'icecream', 'title']
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
