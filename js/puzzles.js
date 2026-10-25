'use strict';
/* Twin Pets: little puzzles. Each girl solves her own half (pictures only, no timers,
   and a wrong try just wobbles and gently helps). When both halves are done, BOTH girls
   get a prize: two presents for the house (one from each box), and every third puzzle
   also brings a special new animal friend. Puzzles live at the school and at the newer
   places in town. */

ICONS.puzzleBtn = '<svg viewBox="0 0 100 100"><path d="M18 30 H42 C 38 18, 56 18, 52 30 H78 V54 C 66 50, 66 70, 78 66 V88 H18Z" fill="#a77bff" stroke="#6a3fc7" stroke-width="4" stroke-linejoin="round"/><circle cx="40" cy="62" r="5" fill="#fff" opacity=".7"/></svg>';

/* ---------- what each place's puzzle is made of ---------- */
const PZ_THEMES = {
  river:      { icons: ['fish', 'duck', 'sailboat'], pic: 'boat' },
  woods:      { icons: ['tent', 'campfire', 'moon'], pic: 'camp' },
  museum:     { icons: ['sun', 'rainbow', 'flower'], pic: 'sunny' },
  restaurant: { icons: ['pizza', 'peach', 'cake'], pic: 'cake' },
  school:     { icons: ['star', 'heart', 'apple'], pic: 'sunny' },
};
const PZ_SCHOOL_THEMES = ['school', 'river', 'woods', 'museum', 'restaurant'];
// original pictures for the jigsaws (each corner is different)
const PZ_PICS = {
  sunny: '<rect width="100" height="100" fill="#bfe9fb"/><circle cx="78" cy="20" r="12" fill="#ffd23f"/><path d="M8 42 a8 8 0 0 1 14 -5 a10 10 0 0 1 18 2 a7 7 0 0 1 0 12 H12 a7 7 0 0 1 -4 -9Z" fill="#fff"/><path d="M0 62 C 24 46, 44 58, 62 52 C 80 46, 92 54, 100 50 V100 H0Z" fill="#8fd16a"/><g fill="none" stroke-width="5"><path d="M56 96 a24 24 0 0 1 44 -14" stroke="#ff8a8a"/><path d="M60 96 a20 20 0 0 1 38 -10" stroke="#ffd27a"/><path d="M64 96 a16 16 0 0 1 30 -8" stroke="#8ac8ff"/></g><path d="M24 90 V70" stroke="#4f9a34" stroke-width="3"/><g fill="#ff9ab4"><circle cx="24" cy="64" r="5"/><circle cx="19" cy="69" r="5"/><circle cx="29" cy="69" r="5"/><circle cx="24" cy="74" r="5"/></g><circle cx="24" cy="69" r="4" fill="#ffd23f"/>',
  boat: '<rect width="100" height="100" fill="#d6f0ff"/><circle cx="82" cy="18" r="11" fill="#ffd23f"/><path d="M10 30 a7 7 0 0 1 12 -4 a9 9 0 0 1 16 2 a6 6 0 0 1 0 10 H14 a6 6 0 0 1 -4 -8Z" fill="#fff"/><rect y="52" width="100" height="48" fill="#5aa9ff"/><path d="M0 60 q12 -8 25 0 t25 0 t25 0 t25 0" stroke="#8fd0ff" stroke-width="3" fill="none"/><path d="M52 18 V64" stroke="#8a5a3c" stroke-width="3"/><path d="M55 20 L82 60 H55Z" fill="#fff" stroke="#9fb8cc" stroke-width="2"/><path d="M49 28 L28 60 H49Z" fill="#ff8fb8"/><path d="M26 66 H80 L70 82 H36Z" fill="#ff7a7a"/><path d="M8 88 q8 -14 20 -6 q-4 8 -12 8Z" fill="#ffa24d"/><circle cx="20" cy="84" r="1.6" fill="#3e3a4f"/>',
  camp: '<rect width="100" height="100" fill="#34457f"/><circle cx="24" cy="22" r="12" fill="#fff6c8"/><circle cx="30" cy="18" r="10" fill="#34457f"/><g fill="#fff6c8"><circle cx="70" cy="14" r="2"/><circle cx="86" cy="28" r="2.4"/><circle cx="60" cy="34" r="1.6"/><circle cx="92" cy="10" r="1.6"/></g><rect y="72" width="100" height="28" fill="#2e7a54"/><path d="M8 80 L24 40 L40 80Z" fill="#1f5c43"/><rect x="22" y="78" width="5" height="10" fill="#6b4a2a"/><path d="M56 88 L76 54 L96 88Z" fill="#ff9a4d" stroke="#c25e10" stroke-width="2.5" stroke-linejoin="round"/><path d="M76 54 L68 88 H84Z" fill="#7a3f12"/>',
  cake: '<rect width="100" height="100" fill="#fff0f5"/><g><path d="M20 6 C 8 6, 4 22, 18 28 C 30 28, 34 10, 20 6Z" fill="#ff7a9a"/><path d="M20 28 V40" stroke="#9aa6bd" stroke-width="2"/></g><path d="M56 10 H96" stroke="#9aa6bd" stroke-width="2"/><g fill="#ffd23f"><path d="M64 12 l4 8 l-8 0z"/><path d="M80 12 l4 8 l-8 0z"/></g><rect x="6" y="64" width="34" height="26" rx="3" fill="#5aa9ff"/><path d="M23 64 V90 M6 77 H40" stroke="#fff" stroke-width="4"/><path d="M23 64 C 14 50, 30 50, 23 64" fill="#ff7a9a"/><rect x="54" y="62" width="40" height="28" rx="4" fill="#ffd9a8" stroke="#d9a074" stroke-width="2"/><path d="M54 70 q5 6 10 0 t10 0 t10 0 t10 0" fill="#fff" stroke="#ffc0d6" stroke-width="2"/><rect x="72" y="46" width="4" height="16" fill="#ff8fb8"/><path d="M74 38 q-4 6 0 8 q4 -2 0 -8Z" fill="#ffd23f"/>',
};

/* ---------- the puzzle screen ---------- */
const pzBox = el('div', 'overlay', '<div class="pz-board"><div class="pz-half l"></div><div class="pz-half r"></div><div class="pz-jig"></div></div><div class="map-x"></div>');
pzBox.id = 'puzzle';
stage.append(pzBox);
pzBox.querySelector('.map-x').innerHTML = ICONS.close;
onPress(pzBox.querySelector('.map-x'), () => closePuzzle(false));
const pzHalf = side => pzBox.querySelector('.pz-half.' + (side === 'left' ? 'l' : 'r'));
let pz = null;
const PZ_ROUNDS = 2;

/* type: pattern, odd or jigsaw.  theme: a key of PZ_THEMES.  ctx.act: the trip it is part of (if any). */
function startPuzzle(type, theme, ctx = {}) {
  if (pz) return;
  if (!ctx.act && scene !== 'play') return;
  const th = PZ_THEMES[theme] || PZ_THEMES.school;
  pz = { type, th, ctx, solved: { left: false, right: false }, rounds: { left: 0, right: 0 }, tries: { left: 0, right: 0 }, last: now(), sel: {}, placed: { left: 0, right: 0 } };
  if (ctx.act) {
    ctx.act.busy = true;
    ctx.act.cleanup.push(() => closePuzzle(false, true));
    closeAllPanels();
  } else {
    closeAllPanels();
    setScene('puzzle');
  }
  SIDES.forEach(s => { pzHalf(s).innerHTML = ''; });
  pzBox.querySelector('.pz-jig').innerHTML = '';
  pzBox.classList.toggle('jig', type === 'jigsaw');
  if (type === 'jigsaw') setupJigsaw();
  else SIDES.forEach(s => pzRound(s));
  pzBox.classList.add('show');
  Sound.play('pick');
}
function closePuzzle(done, fromCleanup) {
  if (!pz) return;
  const p = pz;
  pz = null;
  pzBox.classList.remove('show');
  if (p.ctx.act) {
    if (!fromCleanup) { p.ctx.act.busy = false; p.ctx.act.lastPress = now(); renderColumns(); }
  } else if (scene === 'puzzle') setScene('play');
  if (done) {
    S.puzzles = (S.puzzles || 0) + 1;
    S.puzzleOwed = (S.puzzleOwed || 0) + 1;       // the prize is handed out as soon as the pets are free
    save();
    togetherMoment('puzzle');
  }
}
setInterval(() => { if (pz && now() - pz.last > 60000) closePuzzle(false); }, 2000);

function pzRound(side) {
  if (pz.type === 'pattern') patternRound(side);
  else oddRound(side);
}
/* A wrong try wobbles; after two, the right answer glows. A right one sparkles. */
function pzAnswer(side, ok, node, answerNode) {
  if (!pz || pz.solved[side]) return;
  pz.last = now();
  if (!ok) {
    nudge(node);
    if (++pz.tries[side] >= 2 && answerNode) answerNode.classList.add('help');
    return;
  }
  pz.tries[side] = 0;
  node.classList.add('good');
  Sound.play('pick');
  const r = node.getBoundingClientRect();
  sparkles(r.left + r.width / 2, r.top + r.height / 2, 8);
  mood(pets[side], 'happy', 1200);
  hopPet(side);
  if (++pz.rounds[side] >= PZ_ROUNDS) {
    pz.solved[side] = true;
    setTimeout(() => pzSolvedHalf(side), 700);
  } else {
    const me = pz;
    setTimeout(() => { if (pz === me) pzRound(side); }, 900);
  }
}
function pzSolvedHalf(side) {
  if (!pz) return;
  pzHalf(side).innerHTML = `<div class="pz-done">${ICONS.star}</div>`;
  Sound.play('yay');
  floatHearts(pets[side], 2);
  pzCheckDone();
}
function pzCheckDone() {
  if (!pz || !pz.solved.left || !pz.solved.right || pz.finishing) return;
  pz.finishing = true;
  setTimeout(() => {
    sparkles(W() / 2, H() * 0.45, 18);
    celebrate(W() / 2, H() * 0.45, 22);
    Sound.play('yay');
  }, 300);
  setTimeout(() => closePuzzle(true), 1900);
}

/* ---- what comes next? ---- */
function patternRound(side) {
  const [A, B, C] = shuffle(pz.th.icons.slice());
  const t = pick(['abab', 'aabb', 'abc']);
  const seq = t === 'abab' ? [A, B, A, B] : t === 'aabb' ? [A, A, B, B] : [A, B, C, A];
  const ans = t === 'abab' ? A : t === 'aabb' ? A : B;
  const box = pzHalf(side);
  box.innerHTML = `<div class="pz-seq">${seq.map(k => `<div class="pz-cell">${ICONS[k]}</div>`).join('')}<div class="pz-cell q">?</div></div>
    <div class="pz-opts">${shuffle([A, B, C]).map(k => `<div class="pz-opt" data-k="${k}">${ICONS[k]}</div>`).join('')}</div>`;
  pz.tries[side] = 0;
  const q = box.querySelector('.pz-cell.q');
  const answerNode = box.querySelector(`.pz-opt[data-k="${ans}"]`);
  box.querySelectorAll('.pz-opt').forEach(o => onPress(o, () => {
    const ok = o.dataset.k === ans;
    if (ok && !pz.solved[side]) q.innerHTML = ICONS[ans];
    pzAnswer(side, ok, o, answerNode);
  }));
}
/* ---- which one is different? ---- */
function oddRound(side) {
  const [A, B] = shuffle(pz.th.icons.slice());
  const cells = shuffle([A, A, A, B]);
  const box = pzHalf(side);
  box.innerHTML = `<div class="pz-odd">${cells.map(k => `<div class="pz-opt big" data-k="${k}">${ICONS[k]}</div>`).join('')}</div>`;
  pz.tries[side] = 0;
  const answerNode = box.querySelector(`.pz-opt[data-k="${B}"]`);
  box.querySelectorAll('.pz-opt').forEach(o => onPress(o, () => pzAnswer(side, o.dataset.k === B, o, answerNode)));
}
/* ---- jigsaw: each girl has the two pieces for her side of the picture ---- */
function setupJigsaw() {
  const jig = pzBox.querySelector('.pz-jig');
  const pic = PZ_PICS[pz.th.pic];
  const piece = i => `<svg viewBox="${(i % 2) * 50} ${(i >> 1) * 50} 50 50" preserveAspectRatio="none">${pic}</svg>`;
  jig.innerHTML = `<div class="pz-grid"><div class="pz-ghost"><svg viewBox="0 0 100 100">${pic}</svg></div>${[0, 1, 2, 3].map(i => `<div class="pz-slot" data-i="${i}"></div>`).join('')}</div>
    <div class="pz-tray l"></div><div class="pz-tray r"></div>`;
  const pieces = {};
  SIDES.forEach(side => {
    const tray = jig.querySelector('.pz-tray.' + (side === 'left' ? 'l' : 'r'));
    shuffle(side === 'left' ? [0, 2] : [1, 3]).forEach(i => {
      const e = el('div', 'pz-piece', piece(i));
      e.dataset.i = i;
      e.dataset.side = side;
      pieces[i] = e;
      onPress(e, () => {
        if (!pz || e.classList.contains('placed')) return;
        pz.last = now();
        if (pz.sel[side]) pz.sel[side].classList.remove('sel');
        pz.sel[side] = e;
        e.classList.add('sel');
        Sound.play('click');
      });
      tray.append(e);
    });
  });
  jig.querySelectorAll('.pz-slot').forEach(slot => onPress(slot, ev => {
    if (!pz || slot.classList.contains('filled')) return;
    pz.last = now();
    const side = ev.clientX < W() / 2 ? 'left' : 'right';
    const sel = pz.sel[side];
    if (!sel) { nudge(slot); return; }
    if (+sel.dataset.i === +slot.dataset.i) {
      sel.classList.remove('sel');
      sel.classList.add('placed');
      slot.append(sel);
      slot.classList.add('filled');
      pz.sel[side] = null;
      Sound.play('block');
      const r = slot.getBoundingClientRect();
      sparkles(r.left + r.width / 2, r.top + r.height / 2, 6);
      pz.tries[side] = 0;
      if (++pz.placed[sel.dataset.side] >= 2) { pz.solved[sel.dataset.side] = true; floatHearts(pets[sel.dataset.side], 2); }
      if (pz.solved.left && pz.solved.right) pzCheckDone();
    } else {
      nudge(sel);
      if (++pz.tries[side] >= 2) {                          // after two wrong tries: show where it goes
        const right = jig.querySelector(`.pz-slot[data-i="${sel.dataset.i}"]`);
        right.classList.add('help');
        setTimeout(() => right.classList.remove('help'), 2500);
      }
    }
  }));
}

/* ---------- prizes ---------- */
setInterval(() => {
  if (!(S.puzzleOwed > 0) || scene !== 'play' || act || S.bedtime || $('#map').classList.contains('show')) return;
  claimPrize();
}, 1500);
function claimPrize() {
  S.puzzleOwed--;
  S.prizeN = (S.prizeN || 0) + 1;
  save();
  // every third prize also brings a very special friend, if any are left
  const special = S.prizeN % 3 === 0 && PUZZLE_FRIENDS.find(k => !S.friends.have.includes(k));
  if (special && meetFriend(special)) friendMade(special);
  const give = (tries = 0) => {
    if (scene === 'play' && !act) startActivity('gift', 'left', { count: 2 });
    else if (tries < 40) setTimeout(() => give(tries + 1), 500);
  };
  setTimeout(give, special ? 4200 : 600);
}

/* ---------- the puzzle table at school, and puzzles in town ---------- */
BUTTONS.puzzle = { icon: 'puzzleBtn', label: 'Puzzle' };
ROOMS.school.acts.push('puzzle');
FEATURE_OF.puzzle = 'puzzles';
const PUZZLE_TYPES = ['pattern', 'odd', 'jigsaw'];
ACT_HANDLERS.puzzle = side => {
  const n = S.puzzles || 0;
  startPuzzle(PUZZLE_TYPES[n % PUZZLE_TYPES.length], PZ_SCHOOL_THEMES[n % PZ_SCHOOL_THEMES.length]);
};
// in town: each place has its own kind of puzzle
const PLACE_PUZZLE = { river: 'pattern', woods: 'odd', museum: 'jigsaw', restaurant: 'pattern' };
TRIP_PLAY.puzzle = (a, side) => startPuzzle(PLACE_PUZZLE[a.opts.place] || 'pattern', a.opts.place, { act: a });
NEW_THINGS.push({ key: 'puzzles', order: 23.5, requires: 'decor', room: 'school', acts: ['puzzle'], icon: 'puzzleBtn', word: 'puzzles' });
BOOK_LINES.puzzle = { line: 'solved a puzzle together.', icon: 'puzzleBtn', rank: 97.5 };
