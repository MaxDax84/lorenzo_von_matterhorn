const urlInput    = document.getElementById('foogle-url');
const nomiList    = document.getElementById('nomi-list');
const emptyMsg    = document.getElementById('empty-msg');
const nuovoNome   = document.getElementById('nuovo-nome');
const btnAdd      = document.getElementById('btn-add');
const btnSave     = document.getElementById('btn-save');
const saveStatus  = document.getElementById('save-status');
const toggleAttivo = document.getElementById('toggle-attivo');
const toggleLabel  = document.getElementById('toggle-label');

let nomi = [];

// Carica dati salvati
chrome.storage.sync.get(['nomi', 'foogleUrl', 'attivo'], data => {
  nomi = data.nomi || [];
  urlInput.value = data.foogleUrl || '';
  const attivo = data.attivo !== false; // default true
  toggleAttivo.checked = attivo;
  toggleLabel.textContent = attivo ? 'Attivo' : 'Disattivo';
  renderNomi();
});

// Toggle on/off
toggleAttivo.addEventListener('change', () => {
  toggleLabel.textContent = toggleAttivo.checked ? 'Attivo' : 'Disattivo';
});

// Render lista nomi
function renderNomi() {
  // Rimuove tutti i tag nome esistenti
  Array.from(nomiList.querySelectorAll('.nome-tag')).forEach(el => el.remove());

  if (nomi.length === 0) {
    emptyMsg.style.display = 'block';
    return;
  }

  emptyMsg.style.display = 'none';
  nomi.forEach((nome, i) => {
    const tag = document.createElement('div');
    tag.className = 'nome-tag';
    tag.innerHTML = `
      <span>${nome}</span>
      <button data-i="${i}" title="Rimuovi">✕</button>
    `;
    tag.querySelector('button').addEventListener('click', () => {
      nomi.splice(i, 1);
      renderNomi();
    });
    nomiList.appendChild(tag);
  });
}

// Aggiungi nome
function aggiungiNome() {
  const val = nuovoNome.value.trim();
  if (!val) return;
  if (!nomi.includes(val)) {
    nomi.push(val);
    renderNomi();
  }
  nuovoNome.value = '';
  nuovoNome.focus();
}

btnAdd.addEventListener('click', aggiungiNome);
nuovoNome.addEventListener('keydown', e => { if (e.key === 'Enter') aggiungiNome(); });

// Salva
btnSave.addEventListener('click', () => {
  chrome.storage.sync.set({
    nomi:      nomi,
    foogleUrl: urlInput.value.trim(),
    attivo:    toggleAttivo.checked,
  }, () => {
    saveStatus.classList.add('visible');
    setTimeout(() => saveStatus.classList.remove('visible'), 2000);
  });
});

// Sincronizza nomi dal sito
const btnSync    = document.getElementById('btn-sync');
const syncStatus = document.getElementById('sync-status');

btnSync.addEventListener('click', async () => {
  const base = urlInput.value.trim().replace(/\/$/, '');
  if (!base) {
    syncStatus.textContent = 'Inserisci prima l\'URL del sito.';
    syncStatus.style.color = '#ea4335';
    return;
  }

  btnSync.disabled = true;
  syncStatus.style.color = '#9aa0a6';
  syncStatus.textContent = 'Connessione in corso…';

  try {
    const res  = await fetch(base + '/api/nomi');
    const data = await res.json();

    if (!res.ok || !Array.isArray(data.nomi)) {
      throw new Error(data.error || 'Risposta non valida');
    }

    // Unisci senza duplicati (case-insensitive)
    const existing = new Set(nomi.map(n => n.toLowerCase()));
    let aggiunti = 0;
    for (const n of data.nomi) {
      if (!existing.has(n.toLowerCase())) {
        nomi.push(n);
        aggiunti++;
      }
    }

    renderNomi();
    syncStatus.style.color = '#34a853';
    syncStatus.textContent = aggiunti > 0
      ? `✓ ${aggiunti} nuovo/i nome/i aggiunto/i.`
      : '✓ Nomi già aggiornati.';

    // Salva automaticamente dopo sync
    chrome.storage.sync.set({ nomi, foogleUrl: base, attivo: toggleAttivo.checked });

  } catch (err) {
    syncStatus.style.color = '#ea4335';
    syncStatus.textContent = 'Errore: ' + err.message;
  } finally {
    btnSync.disabled = false;
  }
});
