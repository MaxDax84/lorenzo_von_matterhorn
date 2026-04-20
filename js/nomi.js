/**
 * Cerca il profilo corrispondente alla query.
 * Confronto case-insensitive, ordine delle parole indifferente.
 * Restituisce l'oggetto profilo oppure null.
 */
function getProfilo(q) {
  const qWords = q.toLowerCase().trim().split(/\s+/).sort();
  return PROFILI.find(p => {
    const nWords = p.nome.toLowerCase().trim().split(/\s+/).sort();
    return (
      nWords.length === qWords.length &&
      nWords.every((w, i) => w === qWords[i])
    );
  }) || null;
}

/**
 * Restituisce true se la query corrisponde a un profilo in PROFILI.
 */
function isNomeFamoso(q) {
  return getProfilo(q) !== null;
}
