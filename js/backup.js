'use strict';
/* Twin Pets: backups. In the grown-up corner, save everything to a backup file on the
   device, and restore from that file (for a new tablet, or if something goes wrong). */

ICONS.backup = '<svg viewBox="0 0 100 100"><path d="M14 30 C 14 24, 18 20, 24 20 H42 L50 28 H76 C 82 28, 86 32, 86 38 V78 C 86 84, 82 88, 76 88 H24 C 18 88, 14 84, 14 78Z" fill="#ffd27a" stroke="#d9a23a" stroke-width="4" stroke-linejoin="round"/><path d="M50 74 C 40 66, 32 60, 32 52 C 32 44, 42 42, 50 50 C 58 42, 68 44, 68 52 C 68 60, 60 66, 50 74Z" fill="#ff7a9a"/></svg>';

const BACKUP_APP = 'twin-pets';
const BEFORE_RESTORE_KEY = SAVE_KEY + '-before-restore';
const backupDay = t => new Date(t).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
const daysSince = t => Math.floor((Date.now() - t) / 86400000);
let lastBackupText = null;   // (for the tests: what the last backup file said)

/* ---------- making a backup ---------- */
async function makeBackup(btn) {
  const when = Date.now();
  const text = JSON.stringify({ app: BACKUP_APP, backupVersion: 1, savedAt: new Date(when).toISOString(), save: Object.assign({}, S, { backupAt: when }) });
  const name = `twin-pets-backup-${todayKey()}.json`;
  let done = false;
  if (TEST_MODE) { lastBackupText = text; done = true; }
  else {
    const file = typeof File === 'function' ? new File([text], name, { type: 'application/json' }) : null;
    // On the iPad, the share sheet has "Save to Files". Elsewhere, it downloads.
    if (isIOS() && file && navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'Twin Pets backup' }); done = true; } catch (e) { done = false; }
    } else {
      const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
      const a = document.createElement('a');
      a.href = url; a.download = name;
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      done = true;
    }
  }
  if (done) {
    S.backupAt = when;
    save();
    Sound.play('pick');
  }
  renderParent();
}

/* ---------- restoring from a backup ---------- */
let pendingRestore = null;
function readBackup(text) {
  let data;
  try { data = JSON.parse(text); } catch (e) { return null; }
  const s = data && data.app === BACKUP_APP && data.save ? data.save : data;     // a backup file, or a plain save
  if (!s || typeof s !== 'object' || !s.colors || !s.pets || !s.pets.left || !s.pets.right) return null;
  return { save: s, savedAt: data.savedAt ? Date.parse(data.savedAt) : (s.backupAt || null) };
}
function restoreFromFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const b = readBackup(String(reader.result));
    pendingRestore = b || { bad: true };
    renderParent();
  };
  reader.onerror = () => { pendingRestore = { bad: true }; renderParent(); };
  reader.readAsText(file);
}
function applyRestore() {
  if (!pendingRestore || pendingRestore.bad) return;
  try {
    const now = localStorage.getItem(SAVE_KEY);
    if (now) localStorage.setItem(BEFORE_RESTORE_KEY, now);     // so a restore can be undone
    localStorage.setItem(SAVE_KEY, JSON.stringify(pendingRestore.save));
  } catch (e) { pendingRestore = { bad: true, full: true }; renderParent(); return; }
  erasing = true;                 // don't let the game save over the restored game while it reloads
  location.reload();
}
function undoRestore() {
  const before = localStorage.getItem(BEFORE_RESTORE_KEY);
  if (!before) return;
  localStorage.setItem(SAVE_KEY, before);
  localStorage.removeItem(BEFORE_RESTORE_KEY);
  erasing = true;
  location.reload();
}
const hasBeforeRestore = () => { try { return !!localStorage.getItem(BEFORE_RESTORE_KEY); } catch (e) { return false; } };

/* ---------- the grown-up corner page ---------- */
PARENT_PAGES.backup = {
  order: 1, icon: 'backup',
  label: () => 'Backup' + (S.backupAt ? `<small>${new Date(S.backupAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</small>` : '<small>never</small>'),
  hot: () => !S.backupAt || daysSince(S.backupAt) > 30,          // a gentle nudge when it's been a while
  render(panel) {
    const last = S.backupAt ? `Last backup: <b>${backupDay(S.backupAt)}</b>` : 'No backup yet.';
    const clear = () => { pendingRestore = null; };
    if (pendingRestore) {
      const p = pendingRestore;
      if (p.bad) {
        parentShell(panel, 'Restore', `<div class="note big">${p.full ? 'There is not enough room on this device for that backup.' : "That file isn't a Twin Pets backup."}</div>
          <div class="row"><div class="pbtn" data-again>Choose another file</div></div>`, clear);
        bindP(panel, '[data-again]', () => { pendingRestore = null; chooseBackupFile(); });
      } else {
        const s = p.save, days = Object.keys(s.book || {}).length;
        parentShell(panel, 'Restore this backup?', `<div class="note big">The backup ${p.savedAt ? `from <b>${backupDay(p.savedAt)}</b> ` : ''}has ${s.jar || 0} heart${s.jar === 1 ? '' : 's'} in the jar and ${days} day${days === 1 ? '' : 's'} in the memory book.</div>
          <div class="note">It replaces the game on this device. (You can undo it afterwards from this page.)</div>
          <div class="row"><div class="pbtn danger confirm" data-restore>Replace with the backup</div><div class="pbtn" data-cancel>Cancel</div></div>`, clear);
        bindP(panel, '[data-restore]', applyRestore);
      }
      bindP(panel, '[data-cancel]', () => { pendingRestore = null; renderParent(); });
      return;
    }
    parentShell(panel, 'Backup', `<div class="note big">${last}</div>
      <div class="row"><div class="pbtn go" data-save>Save a backup</div><div class="pbtn" data-load>Restore from a backup</div></div>
      ${hasBeforeRestore() ? '<div class="row"><div class="pbtn" data-undo>Undo the last restore</div></div>' : ''}
      <div class="note">A backup keeps everything: colors, the jar, the memory book and pictures, paintings, letters, tricks, decorations, school words and more.
        ${isIOS() ? 'On the iPad, choose <b>Save to Files</b>.' : 'It is saved in the Downloads folder.'}
        To move to a new tablet, or if something goes wrong, use <b>Restore</b> and pick the file.</div>`);
    bindP(panel, '[data-save]', b => makeBackup(b));
    bindP(panel, '[data-load]', chooseBackupFile);
    bindP(panel, '[data-undo]', undoRestore);
  },
};
function chooseBackupFile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json,text/plain';
  input.addEventListener('change', () => { if (input.files && input.files[0]) restoreFromFile(input.files[0]); });
  input.click();
}
PARENT_CLOSE_HOOKS.push(() => { pendingRestore = null; });
