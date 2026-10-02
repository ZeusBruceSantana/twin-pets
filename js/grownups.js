'use strict';
/* Twin Pets: more in the grown-up corner (letters, school words, kindness hearts,
   the play timer, the pets' birthday) and bedtime when the play timer runs out.
   Everything typed here stays on this device. */

Object.assign(ICONS, {
  abc: '<svg viewBox="0 0 100 100"><rect x="6" y="22" width="88" height="58" rx="10" fill="#fff4dd" stroke="#e0b070" stroke-width="4"/><text x="50" y="66" text-anchor="middle" font-family="ui-rounded, sans-serif" font-weight="900" font-size="34" fill="#8b7fd1">abc</text></svg>',
  clock: '<svg viewBox="0 0 100 100"><circle cx="50" cy="54" r="36" fill="#fff" stroke="#8b7fd1" stroke-width="6"/><path d="M50 54 V32 M50 54 L66 62" stroke="#3e3a4f" stroke-width="6" stroke-linecap="round"/><circle cx="24" cy="18" r="9" fill="#8b7fd1"/><circle cx="76" cy="18" r="9" fill="#8b7fd1"/></svg>',
});
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const bindP = (panel, sel, fn) => panel.querySelectorAll(sel).forEach(b => onRelease(b, () => fn(b)));

/* ---------- pages ---------- */
PARENT_PAGES.wake = {
  icon: 'sun', label: () => 'Wake the pets', show: () => S.bedtime, hot: () => true,
  render(panel) {
    parentShell(panel, 'Wake the pets', `<div class="note big">The play timer ran out, so the pets went to bed. They stay asleep until a grown-up wakes them.</div>
      <div class="row"><div class="pbtn go" data-wake>Wake them up</div></div>`);
    bindP(panel, '[data-wake]', () => wakeFromCorner());
  },
};
PARENT_PAGES.letter = {
  icon: 'letter', label: () => 'Write a letter',
  render(panel) {
    const waiting = S.letters.filter(l => !l.read && l.at).length;
    parentShell(panel, 'Write a letter', `
      <textarea id="p-letter" maxlength="300" rows="4" placeholder="Dear ${esc(SETTINGS.players.left.girl)} and ${esc(SETTINGS.players.right.girl)}, ..."></textarea>
      <div class="note">It goes in the mailbox in the front yard. Short, easy words work best. Each word can be tapped to hear it.${waiting ? ` (${waiting} not read yet)` : ''}</div>
      <div class="row"><div class="pbtn go" data-send>Put it in the mailbox</div></div>`);
    bindP(panel, '[data-send]', b => {
      const box = $('#p-letter'), text = box.value.trim();
      if (!text) { box.focus(); return; }
      sendLetter(text);
      Sound.play('pick');
      box.value = '';
      b.textContent = 'Sent!';
      setTimeout(() => { if (b.isConnected) b.textContent = 'Put it in the mailbox'; }, 2000);
    });
  },
};
PARENT_PAGES.words = {
  icon: 'abc', label: () => 'School words',
  render(panel) {
    parentShell(panel, "This week's school words", `
      <textarea id="p-words" rows="3" placeholder="cat, sun, play, little">${esc(S.schoolWords.join(', '))}</textarea>
      <div class="note">Put commas between words. The pets practice them at pet school. Leave it empty to use starter words.</div>
      <div class="row"><div class="pbtn go" data-save>Save words</div></div>`);
    bindP(panel, '[data-save]', b => {
      const raw = $('#p-words').value;
      const parts = /[,\n]/.test(raw) ? raw.split(/[,\n]/) : raw.split(/\s+/);
      S.schoolWords = [...new Set(parts.map(w => w.trim().replace(/\s+/g, ' ')).filter(Boolean).map(w => w.slice(0, 24)))].slice(0, 20);
      S.schoolWordsAt = Date.now();
      save();
      Sound.play('pick');
      $('#p-words').value = S.schoolWords.join(', ');
      b.textContent = S.schoolWords.length ? `Saved ${S.schoolWords.length} words` : 'Saved (starter words)';
    });
  },
};
PARENT_PAGES.kind = {
  icon: 'heart', label: () => 'Kindness hearts',
  render(panel) {
    const n = S.kindPending || 0;
    parentShell(panel, 'Kindness hearts', `
      <div class="note big">Saw them being kind to each other? Add a heart to their friendship jar.</div>
      <div class="row"><div class="pbtn go" data-add>Add a heart</div></div>
      <div class="note big">${n ? `${n} heart${n > 1 ? 's' : ''} will drop into the jar when you close this.` : '&nbsp;'}</div>`);
    bindP(panel, '[data-add]', () => { S.kindPending = Math.min(10, n + 1); save(); Sound.play('heart'); renderParent(); });
  },
};
PARENT_PAGES.timer = {
  icon: 'clock', label: () => 'Play timer' + (S.timer.minutes ? ` (${S.timer.minutes} min)` : ''),
  render(panel) {
    const t = S.timer, left = t.minutes && t.endsAt > Date.now() ? Math.ceil((t.endsAt - Date.now()) / 60000) : 0;
    const opts = [0, 10, 15, 20, 30, 45, 60].map(m => `<div class="pbtn ${t.minutes === m ? 'on' : ''}" data-min="${m}">${m ? m + ' min' : 'Off'}</div>`).join('');
    parentShell(panel, 'Play timer', `<div class="row wrap">${opts}</div>
      <div class="note big">${t.minutes ? (left ? `About ${left} minute${left > 1 ? 's' : ''} left.` : 'Starts when they play.') : 'Off'}</div>
      <div class="note">When time is up, the pets yawn and go to bed. They stay asleep until a grown-up wakes them here.</div>`);
    bindP(panel, '[data-min]', b => {
      t.minutes = +b.dataset.min;
      t.endsAt = t.minutes ? Date.now() + t.minutes * 60000 : 0;
      save();
      Sound.play('pick');
      renderParent();
    });
  },
};
PARENT_PAGES.birthday = {
  icon: 'cake', label: () => "Pets' birthday",
  render(panel) {
    const b = S.birthday;
    const months = MONTHS.map((m, i) => `<div class="pbtn small ${b && b.month === i + 1 ? 'on' : ''}" data-month="${i + 1}">${m.slice(0, 3)}</div>`).join('');
    parentShell(panel, "The pets' birthday", `
      <div class="months">${months}</div>
      <div class="row"><span>Day</span><div class="pbtn round" data-day="-1">−</div><div class="bday">${b ? b.day : '–'}</div><div class="pbtn round" data-day="1">+</div><div class="pbtn" data-clear>Not set</div></div>
      <div class="note big">${b ? `${MONTHS[b.month - 1]} ${b.day}: a birthday party for ${esc(SETTINGS.players.left.pet)} and ${esc(SETTINGS.players.right.pet)}!` : 'Pick a month to set it.'}</div>`);
    const days = m => new Date(2024, m, 0).getDate();
    bindP(panel, '[data-month]', e => { const m = +e.dataset.month; S.birthday = { month: m, day: Math.min(b ? b.day : 1, days(m)) }; save(); renderParent(); });
    bindP(panel, '[data-day]', e => {
      if (!b) return;
      const max = days(b.month);
      b.day = ((b.day - 1 + +e.dataset.day + max) % max) + 1;
      save(); renderParent();
    });
    bindP(panel, '[data-clear]', () => { S.birthday = null; save(); renderParent(); });
  },
};

/* ---------- kindness hearts drop into the jar ---------- */
BOOK_LINES.kind = { line: 'were kind to each other.', icon: 'heart', rank: 95 };
let kindDropping = false;
async function dropKindHearts() {
  kindDropping = true;
  if (!S.unlocked.jar) { S.unlocked.jar = true; save(); renderJar(); await wait(600); }
  logDay('kind');
  while (S.kindPending > 0 && scene === 'play') {
    S.kindPending--;
    save();
    const from = { x: W() / 2, y: H() * 0.45 };
    sparkles(from.x, from.y, 8, ['#ff8fb8', '#ffd23f', '#ffffff']);
    if (S.jar < SETTINGS.jarSize) await addHeart(from);
    else await wait(300);
  }
  kindDropping = false;
  setTimeout(runQueue, 800);
}
PARENT_CLOSE_HOOKS.push(() => { if (S.kindPending > 0 && scene === 'play' && !kindDropping) setTimeout(dropKindHearts, 500); });

/* =====================================================================
   THE PLAY TIMER AND BEDTIME
   ===================================================================== */
function startTimer() {
  const t = S.timer;
  if (!t.minutes) { t.endsAt = 0; return; }
  // a new play session gets a fresh timer (opening the game again soon after doesn't reset it)
  if (!t.endsAt || Date.now() > t.endsAt + 2 * HOUR) t.endsAt = Date.now() + t.minutes * 60000;
  save();
}
let bedtimeWait = 0, bedtimeGoing = false;
function timerTick() {
  if (S.kindPending > 0 && scene === 'play' && !kindDropping && !$('#parent').classList.contains('show')) dropKindHearts();
  const t = S.timer;
  if (!t.minutes || !t.endsAt || S.bedtime || bedtimeGoing || Date.now() < t.endsAt) return;
  if (['boot', 'pick', 'title', 'goodnight', 'night', 'morning'].includes(scene) || $('#parent').classList.contains('show')) return;
  if (scene === 'map') closeMap();
  if (scene === 'letter') closeLetter();
  closeBook();
  if (scene !== 'play') {                 // let a game finish first (but not forever)
    if (!bedtimeWait) bedtimeWait = now();
    if (now() - bedtimeWait > 45000) {
      if (game && game.ready) finishGame(false);
      else if (climb && !climb.busy) endClimb();
      else if (act && act.ready) endActivity(false);
    }
    return;
  }
  bedtimeWait = 0;
  bedtimeNow();
}
async function bedtimeNow() {
  bedtimeGoing = true;
  S.bedtime = true;
  save();
  closeSideModes();
  setScene('moving');
  showHint('moon', 'bedtime');
  Sound.play('yawn');
  for (const s of SIDES) {
    const p = pets[s];
    begin(p, 9000);
    p.root.classList.add('chomp', 'asleep-eyes');
    petAnim(p, [{ transform: 'scale(1,1)' }, { transform: 'scale(.94,1.1)', offset: 0.4 }, { transform: 'scale(.94,1.1)', offset: 0.7 }, { transform: 'scale(1,1)' }], { duration: 1400, easing: 'ease-in-out' });
    await wait(500);
  }
  await wait(1200);
  SIDES.forEach(s => pets[s].root.classList.remove('chomp', 'asleep-eyes'));
  if (S.room !== 'bedroom') { await goToRoom('bedroom'); setScene('moving'); }
  SIDES.forEach(s => {
    const p = pets[s];
    p.asleep = true; S.pets[s].asleep = true;
    p.root.classList.add('asleep');
  });
  save();
  Sound.play('sleep');
  await wait(600);
  bedtimeGoing = false;
  await goodnight();
}
/* Opening the game while the pets are still asleep from the play timer. */
function sleepingScene() {
  showRoom('bedroom');
  SIDES.forEach(s => {
    const p = pets[s];
    p.asleep = true; S.pets[s].asleep = true;
    p.root.classList.add('asleep');
    setPos(p, CUDDLE[s].x, CUDDLE[s].y);
  });
  pets.left.lean.style.transform = 'rotate(7deg)';
  pets.right.lean.style.transform = 'rotate(-7deg)';
  $('#night').classList.add('on');
  $('#goodnight').classList.add('on');
  setScene('night');
}
function wakeFromCorner() {
  S.bedtime = false;
  S.timer.endsAt = S.timer.minutes ? Date.now() + S.timer.minutes * 60000 : 0;
  save();
  closeParent();
  if (scene === 'night') goodMorning();
}
Sound.add('yawn', s => { s.tone(s.NOTE(67), 0, 1.1, { to: s.NOTE(55), type: 'triangle', vol: 0.07, attack: 0.2 }); s.tone(s.NOTE(64), 1.3, 0.9, { to: s.NOTE(52), type: 'triangle', vol: 0.06, attack: 0.2 }); });
