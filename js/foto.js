/**
 * FOTO DEI PROFILI
 *
 * Mappa nome (minuscolo, trim) → path immagine relativo alla root del sito.
 * Le immagini vanno messe nella cartella img/profili/
 *
 * Esempio:
 *   "mario rossi": "img/profili/mario-rossi.jpg",
 */
const FOTO_PROFILI = {
  "stefano baglio": "img/profili/stefano-baglio.jpg",
  // aggiungi altri nomi qui...
};

/**
 * Restituisce il path dell'immagine per il nome dato,
 * oppure null se non è presente.
 */
function getFoto(nome) {
  return FOTO_PROFILI[nome.toLowerCase().trim()] || null;
}
