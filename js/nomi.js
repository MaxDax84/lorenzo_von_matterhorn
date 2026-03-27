/**
 * LISTA DEI NOMI "FAMOSI"
 * Aggiungi qui i nomi che devono mostrare i risultati fake di Foogle.
 * Case-insensitive. Puoi mettere nome+cognome oppure solo il nome.
 */
const NOMI_FAMOSI = [
  "stefano baglio",
  // aggiungi altri nomi qui...
];

/**
 * Controlla se il nome cercato è nella lista.
 * Supporta corrispondenza esatta, oppure il nome come parte della query.
 */
function isNomeFamoso(q) {
  const qLower = q.toLowerCase().trim();
  return NOMI_FAMOSI.some(nome => {
    const n = nome.toLowerCase().trim();
    return (
      qLower === n ||
      qLower.startsWith(n + ' ') ||
      qLower.endsWith(' ' + n) ||
      qLower.includes(' ' + n + ' ')
    );
  });
}
