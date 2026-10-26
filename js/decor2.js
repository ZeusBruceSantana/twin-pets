'use strict';
/* Twin Pets: more things to win for the house: paint colors, wallpapers, rugs, furniture and
   little electronics (see decor.js for how they are placed). */

[['paintCoral', '#ffb8a8'], ['paintSun', '#ffe36e'], ['paintPeri', '#c8d4ff'], ['paintSage', '#d3e8c4'], ['paintBlush', '#ffd9d9'], ['paintSand', '#f3e3c3'], ['paintSea', '#a9e3e8'], ['paintBerry', '#e8b8e8']]
  .forEach(([k, c]) => { DECOR[k] = { kind: 'paint', word: 'paint', color: c, svg: paintCan(c) }; });
wallpaper('wpPolka', '#ffe8f1', '<circle cx="10" cy="10" r="4.5" fill="#fff"/>');
wallpaper('wpLeaves', '#e5f4dc', '<path d="M4 15 C 4 7, 10 4, 15 4 C 15 12, 10 16, 4 15Z" fill="#8fd16a"/><path d="M5 14 L12 7" stroke="#4f9a34" stroke-width="1"/>');
wallpaper('wpBubbles', '#dff4ff', '<circle cx="6" cy="6" r="4" fill="none" stroke="#7fc4ff" stroke-width="1.2"/><circle cx="15" cy="14" r="3" fill="none" stroke="#7fc4ff" stroke-width="1.2"/><circle cx="14" cy="4" r="1.5" fill="#bfe6ff"/>');
wallpaper('wpNightStars', '#2c3a78', '<path d="M10 3 l1.8 4.4 l4.7 .4 l-3.6 3 l1.1 4.6 l-4 -2.5 l-4 2.5 l1.1 -4.6 l-3.6 -3 l4.7 -.4z" fill="#ffd23f"/>');
wallpaper('wpChecks', '#fff', '<rect width="10" height="10" fill="#cfe9ff"/><rect x="10" y="10" width="10" height="10" fill="#cfe9ff"/>');
wallpaper('wpFish', '#d4efff', '<path d="M3 8 C 6 4, 11 4, 13 8 C 11 12, 6 12, 3 8Z M13 8 L17 5 V11Z" fill="#ff9a4d"/><circle cx="6" cy="7" r=".8" fill="#3e3a4f"/>');
wallpaper('wpDiamonds', '#f0e4ff', '<path d="M10 2 L18 10 L10 18 L2 10Z" fill="#c3a6ff"/>');
const checkerRug = () => Array.from({ length: 10 }, (_, i) => Array.from({ length: 3 }, (_, j) => (i + j) % 2 ? '' : `<rect x="${i * 20}" y="${j * 20}" width="20" height="20" fill="#ffb3c8"/>`).join('')).join('');
Object.assign(DECOR, {
  rugStripes: { kind: 'rug', word: 'rug', svg: '<svg viewBox="0 0 200 60"><ellipse cx="100" cy="30" rx="98" ry="28" fill="#5aa9ff"/><ellipse cx="100" cy="30" rx="80" ry="23" fill="#fff"/><ellipse cx="100" cy="30" rx="62" ry="18" fill="#ffd23f"/><ellipse cx="100" cy="30" rx="44" ry="12" fill="#fff"/><ellipse cx="100" cy="30" rx="26" ry="7" fill="#ff7a9f"/></svg>' },
  rugFlower: { kind: 'rug', word: 'rug', svg: `<svg viewBox="0 0 200 60"><ellipse cx="100" cy="30" rx="98" ry="28" fill="#c9eeb4"/><g fill="#ffb3c8" stroke="#ff8fb8" stroke-width="2">${[0, 60, 120].map(a => `<ellipse cx="100" cy="30" rx="34" ry="8" transform="rotate(${a} 100 30)"/>`).join('')}</g><circle cx="100" cy="30" r="9" fill="#ffd23f"/></svg>` },
  rugChecker: { kind: 'rug', word: 'rug', svg: `<svg viewBox="0 0 200 60"><defs><clipPath id="rugc"><ellipse cx="100" cy="30" rx="98" ry="28"/></clipPath></defs><ellipse cx="100" cy="30" rx="98" ry="28" fill="#fff"/><g clip-path="url(#rugc)">${checkerRug()}</g><ellipse cx="100" cy="30" rx="98" ry="28" fill="none" stroke="#ff8fb8" stroke-width="3"/></svg>` },
  piano: { kind: 'item', word: 'piano', svg: '<svg viewBox="0 0 100 120"><rect x="8" y="14" width="84" height="76" rx="8" fill="#6b4a3a" stroke="#4a3226" stroke-width="4"/><rect x="18" y="24" width="64" height="14" rx="3" fill="#fff4e0"/><path d="M26 28 h8 M42 28 h8 M58 28 h8" stroke="#6b4a3a" stroke-width="2"/><rect x="8" y="64" width="84" height="26" rx="4" fill="#fff"/><g fill="#3e3a4f"><rect x="22" y="64" width="8" height="16"/><rect x="38" y="64" width="8" height="16"/><rect x="62" y="64" width="8" height="16"/><rect x="76" y="64" width="8" height="16"/></g><path d="M16 90 V114 M84 90 V114" stroke="#4a3226" stroke-width="7" stroke-linecap="round"/></svg>' },
  aquarium: { kind: 'item', word: 'fish tank', svg: '<svg viewBox="0 0 100 120"><rect x="10" y="30" width="80" height="62" rx="8" fill="#bfe9fb" stroke="#7fb3d0" stroke-width="4"/><rect x="12" y="52" width="76" height="38" rx="5" fill="#5aa9ff" opacity=".55"/><path d="M12 84 H88 V90 H12Z" fill="#ffe2a8"/><g class="fishy"><path d="M30 64 C 38 56, 50 56, 56 64 C 50 72, 38 72, 30 64Z M56 64 L66 57 V71Z" fill="#ff9a4d"/><circle cx="37" cy="62" r="1.6" fill="#3e3a4f"/></g><path d="M72 90 C 70 78, 78 74, 74 64" stroke="#4f9a34" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="14" y="92" width="72" height="10" rx="4" fill="#8a5a3c"/><path d="M22 102 V114 M78 102 V114" stroke="#8a5a3c" stroke-width="6" stroke-linecap="round"/></svg>' },
  globe: { kind: 'item', word: 'globe', svg: '<svg viewBox="0 0 100 120"><g class="gl"><circle cx="50" cy="48" r="34" fill="#7fc4ff" stroke="#4a9be0" stroke-width="4"/><path d="M30 34 C 40 28, 48 36, 44 46 C 40 56, 30 52, 28 44Z M56 52 C 66 46, 74 54, 70 64 C 66 72, 58 68, 56 60Z" fill="#8fd16a"/></g><path d="M20 22 C 8 46, 18 78, 50 86" stroke="#b07f4f" stroke-width="4" fill="none"/><path d="M36 100 H64 M50 84 V100" stroke="#b07f4f" stroke-width="6" stroke-linecap="round"/></svg>' },
  telescope: { kind: 'item', word: 'telescope', svg: '<svg viewBox="0 0 100 120"><path d="M14 52 L74 22 L84 40 L24 70Z" fill="#a77bff" stroke="#6a3fc7" stroke-width="4" stroke-linejoin="round"/><path d="M70 20 L88 42" stroke="#ffd23f" stroke-width="6" stroke-linecap="round"/><path d="M52 64 L36 112 M52 64 L68 112 M52 64 V112" stroke="#6b4a3a" stroke-width="5" stroke-linecap="round"/><circle cx="92" cy="14" r="2.5" fill="#ffd23f"/></svg>' },
  recordplayer: { kind: 'item', word: 'record player', svg: '<svg viewBox="0 0 100 120"><rect x="8" y="50" width="84" height="54" rx="8" fill="#ff9a7a" stroke="#d9604f" stroke-width="4"/><g class="disc"><circle cx="46" cy="76" r="22" fill="#3e3a4f"/><circle cx="46" cy="76" r="8" fill="#ff8fb8"/><circle cx="46" cy="76" r="2" fill="#fff"/></g><path d="M80 56 L66 80" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="82" cy="56" r="4" fill="#ffd23f"/></svg>' },
  boombox: { kind: 'item', word: 'boombox', svg: '<svg viewBox="0 0 100 120"><path d="M30 52 C 30 36, 70 36, 70 52" stroke="#9aa6bd" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="6" y="50" width="88" height="52" rx="10" fill="#a77bff" stroke="#6a3fc7" stroke-width="4"/><circle cx="28" cy="76" r="15" fill="#e3d6ff" stroke="#6a3fc7" stroke-width="3"/><circle cx="72" cy="76" r="15" fill="#e3d6ff" stroke="#6a3fc7" stroke-width="3"/><circle cx="28" cy="76" r="6" fill="#6a3fc7"/><circle cx="72" cy="76" r="6" fill="#6a3fc7"/><rect x="40" y="62" width="20" height="10" rx="3" fill="#fff4e0"/><circle cx="46" cy="86" r="3" fill="#ffd23f"/><circle cx="54" cy="86" r="3" fill="#ff8fb8"/></svg>' },
  lavalamp: { kind: 'item', word: 'lava lamp', svg: '<svg viewBox="0 0 100 120"><circle class="glow" cx="50" cy="56" r="46" fill="#ff8fb8" opacity="0"/><path d="M34 100 L38 24 C 40 12, 60 12, 62 24 L66 100Z" fill="#ffd9f0" stroke="#d9608f" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="40" r="7" fill="#ff7a9f"/><circle cx="46" cy="72" r="10" fill="#ff7a9f"/><circle cx="54" cy="58" r="5" fill="#ff7a9f"/><path d="M26 104 H74 L68 112 H32Z" fill="#6a3fc7"/><path d="M38 14 H62 L58 6 H42Z" fill="#6a3fc7"/></svg>' },
  dollhouse: { kind: 'item', word: 'doll house', svg: '<svg viewBox="0 0 100 120"><path d="M10 48 L50 14 L90 48Z" fill="#ff8fb8" stroke="#d9608f" stroke-width="4" stroke-linejoin="round"/><rect x="16" y="46" width="68" height="60" fill="#ffe9c4" stroke="#d9b98a" stroke-width="4"/><rect x="26" y="56" width="16" height="16" fill="#bfe9fb" stroke="#d9b98a" stroke-width="3"/><rect x="58" y="56" width="16" height="16" fill="#bfe9fb" stroke="#d9b98a" stroke-width="3"/><rect x="42" y="78" width="16" height="28" rx="3" fill="#c99a6b"/><circle cx="54" cy="94" r="2" fill="#ffd23f"/></svg>' },
  cactus: { kind: 'item', word: 'cactus', svg: '<svg viewBox="0 0 100 120"><path d="M30 86 H70 L64 116 H36Z" fill="#ff9a7a" stroke="#d9704f" stroke-width="3" stroke-linejoin="round"/><rect x="38" y="20" width="24" height="70" rx="12" fill="#6cc551" stroke="#3a8a27" stroke-width="3"/><path d="M38 56 H26 C 20 56, 20 40, 26 40 V52 H38 M62 48 H74 C 80 48, 80 32, 74 32 V44 H62" fill="#6cc551" stroke="#3a8a27" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="16" r="5" fill="#ff8fb8"/></svg>' },
});
DECOR_ORDER.push('piano', 'paintCoral', 'wpPolka', 'recordplayer', 'rugStripes', 'aquarium', 'paintSun', 'boombox', 'wpLeaves', 'globe', 'paintPeri', 'lavalamp', 'wpBubbles', 'rugFlower',
  'telescope', 'paintSage', 'dollhouse', 'wpNightStars', 'paintBlush', 'cactus', 'wpChecks', 'rugChecker', 'paintSand', 'wpFish', 'paintSea', 'wpDiamonds', 'paintBerry');

/* what the new electronics do when tapped */
const spinPart = (g, ms) => { if (!g) return; g.style.transformBox = 'fill-box'; g.style.transformOrigin = '50% 50%'; animate(g, [{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { duration: ms, easing: 'ease-in-out' }); };
Sound.add('pianoplay', s => { const b = 60 + s.k3(); [0, 4, 7, 12, 7, 4, 0].forEach((n, i) => s.tone(s.NOTE(b + n), i * 0.16, 0.5, { vol: 0.06, echo: 1 })); });
Sound.add('recordspin', s => { [67, 71, 74, 71, 76, 74].forEach((m, i) => s.tone(s.NOTE(m), i * 0.3, 0.6, { type: 'triangle', vol: 0.045, echo: 1 })); s.noise(0, 1.8, { filter: 'highpass', freq: 5000, vol: 0.006 }); });
Sound.add('boomtune', s => { [0, 0.3, 0.6, 0.9].forEach((t, i) => { s.tone(100, t, 0.2, { to: 45, vol: 0.12 }); if (i % 2) s.noise(t, 0.1, { filter: 'bandpass', freq: 1800, q: 0.8, vol: 0.05 }); }); [60, 64, 67, 72].forEach((m, i) => s.tone(s.NOTE(m), i * 0.3 + 0.1, 0.3, { type: 'triangle', vol: 0.05 })); });
Sound.add('blip', s => { s.tone(s.NOTE(84), 0, 0.08, { to: s.NOTE(96), vol: 0.04 }); s.tone(s.NOTE(88), 0.1, 0.08, { to: s.NOTE(98), vol: 0.035 }); });
Object.assign(DECOR_TAP, {
  piano(e) { Sound.play('pianoplay'); wiggle(e); decorBurst(e, 'note', ['#a77bff', '#ff8fb8', '#5aa9ff'], 4); },
  aquarium(e) { Sound.play('blip'); const f = e.querySelector('.fishy'); if (f) animate(f, [{ transform: 'translateX(0)' }, { transform: 'translateX(18px)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(0)' }], { duration: 1600, easing: 'ease-in-out' }); const r = e.getBoundingClientRect(); sparkles(r.left + r.width / 2, r.top + r.height * 0.4, 7, ['#9fdcff', '#ffffff', '#bfe9fb']); },
  globe(e) { Sound.play('chime'); spinPart(e.querySelector('.gl'), 2000); },
  telescope(e) { Sound.play('wish'); decorBurst(e, 'star', ['#ffd23f', '#fff6c8', '#ffffff'], 4); wiggle(e); },
  recordplayer(e) { Sound.play('recordspin'); spinPart(e.querySelector('.disc'), 1800); decorBurst(e, 'note', ['#ff8fb8', '#ffd23f'], 3); },
  boombox(e) { Sound.play('boomtune'); wiggle(e); decorBurst(e, 'note', ['#a77bff', '#ffd23f', '#6cc551'], 4); },
  lavalamp(e, room) { const k = room + ':lavalamp'; decorOn[k] = !decorOn[k]; e.classList.toggle('lit', decorOn[k]); Sound.play('click'); },
  dollhouse(e) { Sound.play('door'); decorBurst(e, 'heart', ['#ff7a9a', '#ffb3c8'], 3); },
});

/* =====================================================================
   REDECORATING: a Decorate button in every room. Each girl opens her own panel of everything the
   house has won (wall, rug, furniture); tap one to put it in this room, tap it again to take it out.
   Nothing is ever lost: a covered wallpaper is still in the panel.
   ===================================================================== */
ICONS.decorate = '<svg viewBox="0 0 100 100"><rect x="14" y="14" width="58" height="26" rx="6" fill="#ff9ab4" stroke="#c23b5e" stroke-width="4"/><path d="M72 27 H86 V54 H50 V70" fill="none" stroke="#8a6a4a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><rect x="43" y="68" width="14" height="22" rx="4" fill="#ffd23f" stroke="#c9a000" stroke-width="4"/></svg>';
BUTTONS.decorate = { icon: 'decorate', label: 'Decorate' };
DECOR_ROOMS.forEach(r => ROOMS[r].acts.push('decorate'));
// Everything already won (they come in a set order) plus whatever is standing in a room now.
if (!S.decorOwned) {
  S.decorOwned = DECOR_ORDER.slice(0, S.decorN || 0).filter(k => DECOR[k]);
  Object.values(S.decor || {}).forEach(d => [d.wp, d.paint, d.rug, ...(d.items || [])].forEach(k => { if (k && DECOR[k] && !S.decorOwned.includes(k)) S.decorOwned.push(k); }));
  save();
}
const DECOR_TABS = { wall: { kinds: ['wp', 'paint'], art: 'wpStars' }, rug: { kinds: ['rug'], art: 'rugRound' }, item: { kinds: ['item'], art: 'sofa' } };
const decorTab = { left: null, right: null };    // the last tab each girl had open
const placedHere = (room, key) => { const d = (S.decor || {})[room] || {}; return d.wp === key || d.paint === key || d.rug === key || (d.items || []).includes(key); };
const decorCards = (room, tab) => S.decorOwned.filter(k => DECOR[k] && DECOR_TABS[tab].kinds.includes(DECOR[k].kind))
  .map(k => ({ key: k, icon: DECOR[k].svg, word: DECOR[k].word, cls: placedHere(room, k) ? 'on' : '' }));
ACT_HANDLERS.decorate = side => {
  const room = S.room;
  if (!DECOR_ROOMS.includes(room)) return;
  Sound.play('door');
  let tab = decorTab[side] || Object.keys(DECOR_TABS).find(t => decorCards(room, t).length) || 'wall';
  openPanel(side, {
    keepOpen: true, items: decorCards(room, tab), tab,
    tabs: Object.keys(DECOR_TABS).map(k => ({ key: k, icon: DECOR[DECOR_TABS[k].art].svg })),
    onTab: k => { tab = decorTab[side] = k; return decorCards(room, k); },
    onPick: (key, card) => {
      if (placedHere(room, key)) { removeDecor(key, room); Sound.play('pick'); }
      else { placeDecor(key, room, true); Sound.play('ding'); sparkles(W() / 2, H() * 0.45, 8); }
      const p = panels[side];
      if (p) { p.lastTouch = now(); p.querySelectorAll('.scard').forEach(c => c.classList.toggle('on', placedHere(room, c.dataset.key))); }
    },
  });
};
