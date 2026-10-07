'use strict';
/* Twin Pets: the front yard, and the mailbox with letters from the grown-ups. */

/* ---------- pictures ---------- */
Object.assign(ICONS, {
  roomFront: '<svg viewBox="0 0 100 100"><path d="M12 46 L50 14 L88 46Z" fill="#ff9a8a" stroke="#e07a6a" stroke-width="4" stroke-linejoin="round"/><rect x="20" y="44" width="60" height="44" rx="3" fill="#fff4dd" stroke="#e0c08a" stroke-width="4"/><rect x="42" y="60" width="16" height="28" rx="3" fill="#c99a6b"/><rect x="26" y="54" width="11" height="11" rx="2" fill="#9fd8f0"/><rect x="63" y="54" width="11" height="11" rx="2" fill="#9fd8f0"/><rect x="2" y="86" width="96" height="10" rx="5" fill="#8fd16a"/></svg>',
  mailbox: '<svg viewBox="0 0 100 100"><rect x="44" y="50" width="12" height="46" rx="3" fill="#b07f4f"/><path d="M18 52 V34 C 18 20, 30 12, 44 12 H66 C 80 12, 86 22, 86 34 V52Z" fill="#5aa9ff" stroke="#3a7fd0" stroke-width="4" stroke-linejoin="round"/><path d="M44 12 C 58 12, 64 22, 64 34 V52" fill="none" stroke="#3a7fd0" stroke-width="4"/><path d="M74 44 V16 H90 V26 H78" fill="#ff5d5d" stroke="#d94f5c" stroke-width="3" stroke-linejoin="round"/></svg>',
  letter: '<svg viewBox="0 0 100 100"><rect x="10" y="24" width="80" height="54" rx="6" fill="#fffdf6" stroke="#e0c08a" stroke-width="4"/><path d="M12 28 L50 56 L88 28" fill="none" stroke="#e0c08a" stroke-width="4" stroke-linejoin="round"/><path d="M50 64 C 44 58, 38 62, 42 68 L50 76 L58 68 C 62 62, 56 58, 50 64Z" fill="#ff7a9a"/></svg>',
});

/* =====================================================================
   THE FRONT YARD
   ===================================================================== */
ROOMS.frontyard = { word: 'front yard', icon: 'roomFront', door: '#ffd1a8', acts: ['mailbox'], feature: 'frontyard' };
ROOM_ORDER.push('frontyard');
ROOM_MARKUP.frontyard = () => `<div class="sky bg"></div>
  <div class="cloud bg" style="top:12%; animation-delay:-40s"></div>
  <div class="cloud bg" style="top:24%; animation-delay:-80s; animation-duration:130s"></div>
  <div class="deco facade bg"><svg viewBox="0 0 300 130" preserveAspectRatio="xMidYMax meet">
    <path d="M14 58 L150 6 L286 58Z" fill="#ff9a8a" stroke="#e07a6a" stroke-width="5" stroke-linejoin="round"/>
    <rect x="30" y="56" width="240" height="74" fill="#fff4dd" stroke="#e8cf9e" stroke-width="5"/>
    <rect x="128" y="74" width="44" height="56" rx="6" fill="#c99a6b" stroke="#a87a4b" stroke-width="4"/><circle cx="162" cy="104" r="3.5" fill="#ffd23f"/>
    <g fill="#bfe9fb" stroke="#e8cf9e" stroke-width="4"><rect x="56" y="74" width="40" height="32" rx="4"/><rect x="204" y="74" width="40" height="32" rx="4"/></g>
    <path d="M76 74 V106 M56 90 H96 M224 74 V106 M204 90 H244" stroke="#e8cf9e" stroke-width="3"/>
    <g><circle cx="60" cy="126" r="7" fill="#ff8fb8"/><circle cx="76" cy="124" r="7" fill="#ffd23f"/><circle cx="92" cy="126" r="7" fill="#c3a6ff"/>
       <circle cx="208" cy="126" r="7" fill="#c3a6ff"/><circle cx="224" cy="124" r="7" fill="#ff8fb8"/><circle cx="240" cy="126" r="7" fill="#ffd23f"/></g>
  </svg></div>
  <svg class="ground bg" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 40 C 200 30, 800 30, 1000 40 L1000 200 L0 200Z" fill="#b8e29e"/>
    <path d="M470 34 L530 34 L600 200 L400 200Z" fill="#f1e2c6"/>
  </svg>`;
NEW_THINGS.push({ key: 'frontyard', order: 1, room: 'frontyard', acts: ['mailbox'], icon: 'roomFront', word: 'front yard' });
BUTTONS.mailbox = { icon: 'mailbox', label: 'Mail' };

/* =====================================================================
   THE MAILBOX: letters written in the grown-up corner. Tap any word to hear it.
   ===================================================================== */
const STARTER_LETTER = () => ({ text: `Dear ${SETTINGS.players.left.girl} and ${SETTINGS.players.right.girl},\nWe love you!\nLove, ${SETTINGS.players.left.pet} and ${SETTINGS.players.right.pet}`, at: 0, read: false });
const mailbox = roomThing('mailbox', 'frontyard', 'frontyard',
  `<svg viewBox="0 0 100 130"><rect x="44" y="54" width="12" height="76" rx="3" fill="#b07f4f"/>
    <rect x="30" y="122" width="40" height="8" rx="4" fill="#8fc86f"/>
    <path d="M14 58 V36 C 14 20, 28 12, 44 12 H68 C 84 12, 90 24, 90 36 V58Z" fill="#5aa9ff" stroke="#3a7fd0" stroke-width="4" stroke-linejoin="round"/>
    <path d="M44 12 C 60 12, 66 24, 66 36 V58" fill="none" stroke="#3a7fd0" stroke-width="4"/>
    <g class="peek"><rect x="22" y="40" width="34" height="22" rx="3" fill="#fffdf6" stroke="#e0c08a" stroke-width="3" transform="rotate(-12 39 51)"/></g>
    <g class="flag"><path d="M78 50 V18 H96 V30 H82" fill="#ff5d5d" stroke="#d94f5c" stroke-width="3" stroke-linejoin="round"/></g></svg>`,
  { left: '50%', bottom: '23%', width: '10vmin', height: '13vmin' });
const unread = () => S.letters.filter(l => !l.read).length;
function renderMailbox() { mailbox.classList.toggle('has-mail', unread() > 0 || !S.letters.length); }
renderMailbox();
onPress(mailbox, () => { if (scene === 'play') openLetter(); });
ACT_HANDLERS.mailbox = () => openLetter();

const letterBox = el('div', 'overlay', '<div class="paper"></div>');
letterBox.id = 'letter';
stage.append(letterBox);
let letterAt = 0;
function openLetter() {
  if (scene !== 'play') return;
  thingTapped('mailbox');
  closeAllPanels();
  if (!S.letters.length) S.letters.push(STARTER_LETTER());
  const firstUnread = S.letters.findIndex(l => !l.read);
  letterAt = firstUnread >= 0 ? firstUnread : S.letters.length - 1;
  setScene('letter');
  Sound.play('fridge');
  animate(mailbox.firstChild, [{ transform: 'rotate(0)' }, { transform: 'rotate(-6deg)' }, { transform: 'rotate(5deg)' }, { transform: 'rotate(0)' }], { duration: 420 });
  letterBox.classList.add('show');
  renderLetter();
  animate($('#letter .paper'), [{ transform: 'translateY(60vh) rotate(-8deg) scale(.4)' }, { transform: 'translateY(0) rotate(0) scale(1)' }], { duration: 450, easing: 'cubic-bezier(.3,1.3,.6,1)' });
  SIDES.forEach(s => mood(pets[s], 'happy', 1600));
}
function renderLetter() {
  const l = S.letters[letterAt];
  l.read = true;
  save();
  renderMailbox();
  renderCenter();
  const paper = $('#letter .paper');
  paper.innerHTML = `<div class="stamp">${ICONS.heart}</div><div class="ltext"></div>
    <div class="say-all word">${ICONS.speaker}</div>
    <div class="book-btn book-close">${ICONS.close}</div>
    <div class="book-btn book-prev ${letterAt > 0 ? '' : 'off'}">${ICONS.prev}</div>
    <div class="book-btn book-next ${letterAt < S.letters.length - 1 ? '' : 'off'}">${ICONS.next}</div>`;
  const box = paper.querySelector('.ltext');
  l.text.split('\n').map(t => t.trim()).filter(Boolean).forEach(line => { const d = el('div', 'lline'); wordsInto(d, line); box.append(d); });
  box.classList.toggle('long', l.text.length > 140);
  paper.querySelector('.say-all').dataset.say = l.text.replace(/\n/g, '. ');
  onPress(paper.querySelector('.book-close'), closeLetter);
  onPress(paper.querySelector('.book-prev'), () => { if (letterAt > 0) { letterAt--; Sound.play('page'); renderLetter(); } });
  onPress(paper.querySelector('.book-next'), () => { if (letterAt < S.letters.length - 1) { letterAt++; Sound.play('page'); renderLetter(); } });
}
function closeLetter() {
  letterBox.classList.remove('show');
  if (scene === 'letter') setScene('play');
}

/* A new letter from the grown-up corner: the mailbox flag goes up and the
   front yard gets a star on the map. */
function sendLetter(text) {
  S.letters.push({ text, at: Date.now(), read: false });
  while (S.letters.length > 30) S.letters.shift();
  const n = NEW_THINGS.find(t => t.key === 'frontyard');
  if (!has('frontyard')) introduce(n, true);
  if (S.room !== 'frontyard') S.doorNew.frontyard = true;
  save();
  renderMailbox();
  renderCenter();
}
