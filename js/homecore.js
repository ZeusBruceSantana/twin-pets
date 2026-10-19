'use strict';
/* Twin Pets: Home Core, the family's own app. A grown-up pastes the family's private game link (Home Core: More,
   Settings, Game link) into the grown-up corner and says which child goes with each pet. Then, while the game is open,
   it looks every few minutes and:
   - pet school practices each girl's words of the week from Home Core,
   - when a girl has done all of today's jobs, her pet cheers (once a day),
   - when a grown-up approves a reward, her pet cheers about it (once).
   Home Core never sends anyone's name: each child comes as her color and symbol ("Lavender star"). The link is kept on
   this device only, like everything else here. */

Object.assign(ICONS, {
  homeCore: '<svg viewBox="0 0 100 100"><path d="M14 50 L50 18 L86 50" fill="none" stroke="#8b7fd1" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 46 V84 H76 V46" fill="#fff4dd" stroke="#e0b070" stroke-width="5" stroke-linejoin="round"/><path d="M50 74 C40 66 34 60 38 54 C41 50 47 51 50 56 C53 51 59 50 62 54 C66 60 60 66 50 74 Z" fill="#ff8fb8"/></svg>',
});

const HOME_CORE_EVERY = 5 * 60000;        // how often to look while the game is open
const HOME_CORE_LINK = /^https:\/\/[^\s/?#]+\/game\/[0-9a-f]{64}\.json$/;
// Home Core's person colors, for the grown-up corner (its names, and the dark shade as a dot).
const HC_COLORS = {
  lavender: ['Lavender', '#4A2A7A'], shell: ['Shell pink', '#9B2452'], seaglass: ['Sea glass', '#24573B'],
  coral: ['Coral', '#963F1C'], marigold: ['Marigold', '#785800'], blue: ['Blue', '#1D4F8C'],
};
const hcLabel = k => `${(HC_COLORS[k.color] || ['No color'])[0]} ${String(k.symbol || 'star').replace(/-/g, ' ')}`;

function homeCore() {
  if (!S.homeCore || typeof S.homeCore !== 'object') S.homeCore = {};
  const h = S.homeCore;
  if (typeof h.link !== 'string') h.link = '';
  if (!h.pick || typeof h.pick !== 'object') h.pick = { left: null, right: null };
  if (!Array.isArray(h.kids)) h.kids = [];
  if (!h.cheered || typeof h.cheered !== 'object') h.cheered = { jobs: {}, rewards: [] };
  if (!Array.isArray(h.cheered.rewards)) h.cheered.rewards = [];
  if (!h.cheered.jobs || typeof h.cheered.jobs !== 'object') h.cheered.jobs = {};
  return h;
}
/* The child that goes with a pet (left or right), from the last answer, or null. */
const hcKid = side => homeCore().kids.find(k => k.id === homeCore().pick[side]) || null;

/* The words pet school practices: Home Core's words for the two girls, else the words typed here, else the starter words. */
function schoolWordPool() {
  const fromHome = [...new Set(SIDES.flatMap(s => (hcKid(s) && hcKid(s).words) || []))].slice(0, 20);
  return fromHome.length ? fromHome : S.schoolWords.length ? S.schoolWords : STARTER_WORDS;
}

/* Ask Home Core. Quietly: no internet keeps the last answer. */
let hcAsking = false;
async function askHomeCore() {
  const h = homeCore();
  if (!h.link || hcAsking) return;
  hcAsking = true;
  try {
    const res = await fetch(h.link, { cache: 'no-store' });
    const json = await res.json().catch(() => null);
    if (res.status === 404 || (json && json.error === 'gone')) {
      h.status = 'stopped';
    } else if (res.ok && json && json.ok && json.game && Array.isArray(json.game.kids)) {
      h.kids = json.game.kids.filter(k => k && typeof k.id === 'string').slice(0, 8).map(k => ({
        id: k.id, color: String(k.color || ''), symbol: String(k.symbol || ''),
        words: (Array.isArray(k.words) ? k.words : []).map(w => String(w).trim().slice(0, 24)).filter(Boolean).slice(0, 20),
        jobs: { done: +(k.jobs && k.jobs.done) || 0, total: +(k.jobs && k.jobs.total) || 0 },
        rewards: (Array.isArray(k.rewards) ? k.rewards : []).slice(0, 10).map(r => ({ name: String(r.name || '').slice(0, 60), on: String(r.on || '') })),
      }));
      h.today = String(json.game.today || '');
      h.status = 'ok';
      h.at = Date.now();
    } else {
      h.status = 'later';
    }
  } catch (e) {
    homeCore().status = 'later';
  }
  hcAsking = false;
  save();
  if (parentPage === 'homecore' && $('#parent').classList.contains('show')) renderParent();
}

/* The pets cheer for what happened in Home Core, one at a time, only while the girls are playing. */
let hcCheering = false;
async function homeCoreCheers() {
  const h = homeCore();
  if (hcCheering || scene !== 'play' || $('#parent').classList.contains('show') || !h.today) return;
  hcCheering = true;
  for (const side of SIDES) {
    const kid = hcKid(side);
    if (!kid || scene !== 'play') continue;
    if (kid.jobs.total > 0 && kid.jobs.done >= kid.jobs.total && h.cheered.jobs[side] !== h.today) {
      h.cheered.jobs[side] = h.today;
      save();
      await petCheer(side, 'All my jobs are done!');
    }
    for (const r of kid.rewards) {
      const key = `${kid.id}|${r.on}|${r.name}`;
      if (!r.name || h.cheered.rewards.includes(key)) continue;
      h.cheered.rewards = [...h.cheered.rewards, key].slice(-40);
      save();
      await petCheer(side, `Yay! ${r.name}!`);
    }
  }
  hcCheering = false;
}
async function petCheer(side, text) {
  const p = pets[side];
  if (!p || p.asleep) return;
  const r = p.root.getBoundingClientRect();
  celebrate(r.left + r.width / 2, r.top + r.height * 0.3);
  Sound.play('heart');
  sayBubble(p, text, 3200);
  await wait(3800);
}

/* ---------- the grown-up corner page ---------- */
PARENT_PAGES.homecore = {
  order: 60, icon: 'homeCore', label: () => 'Home Core' + (homeCore().link ? (homeCore().status === 'stopped' ? ' (link stopped)' : ' (on)') : ''),
  hot: () => homeCore().link && homeCore().status === 'stopped',
  render(panel) {
    const h = homeCore();
    if (!h.link) {
      parentShell(panel, 'Home Core', `
        <div class="note big">Paste the family's game link from Home Core (More, Settings, Game link).</div>
        <input id="p-hclink" class="ptext" type="url" inputmode="url" autocomplete="off" spellcheck="false" placeholder="https://…/game/….json">
        <div class="note" id="p-hcwhy">Pet school then practices each girl's words of the week, and the pets cheer when her jobs are done or a reward is approved. Home Core never sends anyone's name.</div>
        <div class="row"><div class="pbtn go" data-connect>Connect</div></div>`);
      bindP(panel, '[data-connect]', async b => {
        const link = $('#p-hclink').value.trim();
        if (!HOME_CORE_LINK.test(link)) { $('#p-hcwhy').textContent = 'That isn\'t a game link. Copy it again from Home Core: More, Settings, Game link.'; return; }
        h.link = link; h.pick = { left: null, right: null }; h.kids = []; h.status = ''; h.cheered = { jobs: {}, rewards: [] };
        save();
        b.textContent = 'Connecting…';
        await askHomeCore();
        renderParent();
      });
      return;
    }
    const state = h.status === 'stopped' ? 'This link has stopped working. Make a new one in Home Core (More, Settings, Game link) and paste it here.'
      : h.status === 'ok' ? `Connected. Last looked at ${new Date(h.at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}.`
      : h.status === 'later' ? 'Couldn\'t reach Home Core just now. It will look again by itself.' : 'Looking…';
    const choose = side => {
      const who = SETTINGS.players[side];
      const opts = h.kids.map(k => `<div class="pbtn small ${h.pick[side] === k.id ? 'on' : ''}" data-side="${side}" data-kid="${esc(k.id)}"><span class="hcdot" style="background:${(HC_COLORS[k.color] || ['', '#888'])[1]}"></span>${esc(hcLabel(k))}</div>`).join('');
      return `<div class="note">${esc(who.pet)} goes with ${esc(who.girl)}. In Home Core she is:</div><div class="row wrap">${opts || '<span class="note">No children in Home Core yet.</span>'}</div>`;
    };
    parentShell(panel, 'Home Core', `
      <div class="note big">${esc(state)}</div>
      ${h.kids.length ? choose('left') + choose('right') : ''}
      <div class="row"><div class="pbtn" data-again>Look now</div><div class="pbtn danger" data-forget>Disconnect</div></div>`);
    bindP(panel, '[data-kid]', b => { h.pick[b.dataset.side] = b.dataset.kid; save(); Sound.play('pick'); renderParent(); });
    bindP(panel, '[data-again]', () => askHomeCore());
    bindP(panel, '[data-forget]', () => { S.homeCore = {}; homeCore(); save(); renderParent(); });
  },
};

/* Look when the game opens, every few minutes while it's open, and when it comes back to the front. */
setTimeout(askHomeCore, 1500);
setInterval(askHomeCore, HOME_CORE_EVERY);
setInterval(homeCoreCheers, 4000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && Date.now() - (homeCore().at || 0) > 60000) askHomeCore();
});
