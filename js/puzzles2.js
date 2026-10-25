'use strict';
/* Twin Pets: more puzzle kinds (adding up, which has more, number order, read the word, small to big),
   and puzzles at the fun fair and the playground. Same rules as every puzzle: pictures first, no timers,
   a wrong try wobbles and after two the right answer glows. */

Object.assign(PZ_THEMES, {
  fair:       { icons: ['clawBtn', 'wheelBtn', 'moleBtn'], pic: 'cake' },
  playground: { icons: ['superswingBtn', 'merryBtn', 'digBtn'], pic: 'sunny' },
});
PZ_SCHOOL_THEMES.push('fair', 'playground');
const PZ_WORD_POOL = ['apple', 'fish', 'ball', 'moon', 'sun', 'star', 'heart', 'duck', 'egg', 'carrot', 'corn', 'banana', 'peach', 'pizza', 'pumpkin', 'strawberry'];   // each picture's name is its word
const pzThings = (n, icon) => Array.from({ length: n }, () => `<div class="pz-thing sm">${ICONS[icon]}</div>`).join('');
const pzNums = (n, max = 6) => shuffle([n, ...shuffle([1, 2, 3, 4, 5, 6, 7, 8].filter(x => x !== n && x <= max)).slice(0, 2)]);

/* ---- how many altogether? (2 + 1) ---- */
PUZZLE_KINDS.add = side => {
  const a = 1 + Math.floor(Math.random() * 4), b = 1 + Math.floor(Math.random() * (6 - a)), n = a + b, icon = pick(pz.th.icons);
  const box = pzHalf(side);
  box.innerHTML = `<div class="pz-sum"><div class="pz-count sm">${pzThings(a, icon)}</div><div class="pz-plus">+</div><div class="pz-count sm">${pzThings(b, icon)}</div></div>
    <div class="pz-opts">${pzNums(n).map(k => `<div class="pz-opt num" data-k="${k}">${k}</div>`).join('')}</div>`;
  pz.tries[side] = 0;
  const answerNode = box.querySelector(`.pz-opt[data-k="${n}"]`);
  box.querySelectorAll('.pz-opt').forEach(o => onPress(o, () => { Speech.say(o.dataset.k); pzAnswer(side, +o.dataset.k === n, o, answerNode); }));
};
/* ---- which group has more? ---- */
PUZZLE_KINDS.more = side => {
  const x = 1 + Math.floor(Math.random() * 6);
  let y = 1 + Math.floor(Math.random() * 6);
  if (y === x) y = x === 6 ? 5 : x + 1;
  const icon = pick(pz.th.icons), groups = shuffle([x, y]);
  const box = pzHalf(side);
  box.innerHTML = `<div class="pz-more">${groups.map(n => `<div class="pz-opt grp" data-k="${n}"><div class="pz-count sm">${pzThings(n, icon)}</div></div>`).join('')}</div>`;
  pz.tries[side] = 0;
  const answerNode = box.querySelector(`.pz-opt[data-k="${Math.max(x, y)}"]`);
  box.querySelectorAll('.pz-opt').forEach(o => onPress(o, () => pzAnswer(side, +o.dataset.k === Math.max(x, y), o, answerNode)));
};
/* ---- which number comes next (counting up by 1s, 2s or 10s)? ---- */
PUZZLE_KINDS.order = side => {
  const step = pick([1, 1, 2, 10]), start = step === 1 ? 1 + Math.floor(Math.random() * 6) : step === 2 ? 2 * (1 + Math.floor(Math.random() * 3)) : 10;
  const seq = [0, 1, 2, 3].map(i => start + step * i), hole = 1 + Math.floor(Math.random() * 3), n = seq[hole];
  const opts = shuffle([n, ...shuffle([n + step, n - step, n + 1].filter(v => v > 0 && v !== n)).slice(0, 2)]);
  const box = pzHalf(side);
  box.innerHTML = `<div class="pz-seq">${seq.map((v, i) => `<div class="pz-cell num${i === hole ? ' q' : ''}">${i === hole ? '?' : v}</div>`).join('')}</div>
    <div class="pz-opts">${opts.map(k => `<div class="pz-opt num" data-k="${k}">${k}</div>`).join('')}</div>`;
  pz.tries[side] = 0;
  const q = box.querySelector('.pz-cell.q'), answerNode = box.querySelector(`.pz-opt[data-k="${n}"]`);
  box.querySelectorAll('.pz-opt').forEach(o => onPress(o, () => {
    Speech.say(o.dataset.k);
    const ok = +o.dataset.k === n;
    if (ok && !pz.solved[side]) q.textContent = n;
    pzAnswer(side, ok, o, answerNode);
  }));
};
/* ---- read the word (tap it to hear it), find its picture ---- */
PUZZLE_KINDS.word = side => {
  const [ans, ...others] = shuffle(PZ_WORD_POOL.filter(k => ICONS[k]));
  const box = pzHalf(side);
  box.innerHTML = `<div class="pz-word w"></div><div class="pz-opts">${shuffle([ans, others[0], others[1]]).map(k => `<div class="pz-opt" data-k="${k}">${ICONS[k]}</div>`).join('')}</div>`;
  sayableInto(box.querySelector('.pz-word'), ans);
  pz.tries[side] = 0;
  const answerNode = box.querySelector(`.pz-opt[data-k="${ans}"]`);
  box.querySelectorAll('.pz-opt').forEach(o => onPress(o, () => pzAnswer(side, o.dataset.k === ans, o, answerNode)));
};
/* ---- tap them from the smallest to the biggest ---- */
PUZZLE_KINDS.size = side => {
  const icon = pick(pz.th.icons), sizes = shuffle([0, 1, 2]);
  const box = pzHalf(side);
  box.innerHTML = `<div class="pz-sizes">${sizes.map(r => `<div class="pz-opt sz" data-r="${r}" style="width:${8 + r * 4}vmin;height:${8 + r * 4}vmin">${ICONS[icon]}</div>`).join('')}</div>`;
  pz.tries[side] = 0;
  let next = 0;
  box.querySelectorAll('.pz-opt').forEach(o => onPress(o, () => {
    if (!pz || pz.solved[side] || o.classList.contains('good')) return;
    pz.last = now();
    if (+o.dataset.r === next) {
      o.classList.add('good');
      o.append(el('b', 'pz-badge', String(++next)));
      pz.tries[side] = 0;
      Sound.play('click');
      if (next >= 3) pzRoundDone(side, o);
    } else {
      nudge(o);
      if (++pz.tries[side] >= 2) box.querySelector(`.pz-opt[data-r="${next}"]`).classList.add('help');
    }
  }));
};

/* ---- they join the rotation at school and at every place ---- */
const PZ_NEW = ['add', 'more', 'order', 'word', 'size'];
PUZZLE_TYPES.push(...PZ_NEW);
Object.assign(PLACE_PUZZLE, { fair: ['count', 'match', 'tune', 'pattern'], playground: ['pattern', 'odd', 'shadow', 'count'] });
Object.keys(PLACE_PUZZLE).forEach((place, i) => PLACE_PUZZLE[place].push(...[0, 1, 2].map(j => PZ_NEW[(i + j * 2) % PZ_NEW.length]).filter((k, j, a) => a.indexOf(k) === j)));
