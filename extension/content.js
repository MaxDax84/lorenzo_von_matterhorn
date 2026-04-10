// Foogle — content script
// Gira su document_start, prima che Google carichi qualcosa.

(async () => {
  // Legge configurazione dallo storage
  const data = await chrome.storage.sync.get(['nomi', 'foogleUrl', 'attivo']);

  // Se l'estensione è disattivata, lascia passare Google
  if (data.attivo === false) return;

  const nomi     = data.nomi    || [];
  const baseUrl  = (data.foogleUrl || '').replace(/\/$/, '');

  if (!baseUrl || nomi.length === 0) return;

  // Estrae il parametro q dalla URL corrente
  const params = new URLSearchParams(window.location.search);
  const q = (params.get('q') || '').trim();
  if (!q) return;

  const qLower = q.toLowerCase();

  // Controlla se il nome cercato corrisponde a uno della lista
  // Supporta: corrispondenza esatta, o nome come prima/ultima parola
  const match = nomi.find(nome => {
    const n = nome.toLowerCase().trim();
    if (!n) return false;
    return (
      qLower === n ||
      qLower.startsWith(n + ' ') ||
      qLower.endsWith(' ' + n) ||
      qLower.includes(' ' + n + ' ')
    );
  });

  if (match) {
    // Reindirizza su Foogle prima che Google carichi
    window.location.replace(baseUrl + '/results.html?q=' + encodeURIComponent(q));
  }
})();
