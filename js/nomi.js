/**
 * LISTA DEI NOMI "FAMOSI"
 * Aggiungi qui i nomi che devono mostrare i risultati fake di Foogle.
 * Case-insensitive. Puoi mettere nome+cognome oppure solo il nome.
 */
const NOMI_FAMOSI = [
  "stefano baglio",
  "nicola davanzo",
  // aggiungi altri nomi qui...
];

/**
 * Controlla se il nome cercato è nella lista.
 * Case-insensitive, ordine delle parole indifferente.
 */
function isNomeFamoso(q) {
  const qWords = q.toLowerCase().trim().split(/\s+/).sort();
  return NOMI_FAMOSI.some(nome => {
    const nWords = nome.toLowerCase().trim().split(/\s+/).sort();
    return (
      nWords.length === qWords.length &&
      nWords.every((w, i) => w === qWords[i])
    );
  });
}
