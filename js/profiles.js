/**
 * PROFILI FOOGLE
 * ─────────────────────────────────────────────────────────────────────────────
 * Ogni oggetto rappresenta una persona "famosa" nel sistema.
 *
 * Campi obbligatori:
 *   nome          → stringa usata per il riconoscimento nella ricerca
 *                   (case-insensitive, ordine parole indifferente)
 *   template_ids  → array di ID template da mostrare per questa persona
 *                   (almeno 28 per avere 4 pagine complete)
 *
 * Campi opzionali (per ora non usati, pronti per il futuro):
 *   dati          → oggetto con info reali iniettabili nei template
 *                   es. { professione: "CEO", citta: "Milano", azienda: "Acme" }
 *
 * Per aggiungere una nuova persona:
 *   1. Aggiungi un oggetto a PROFILI
 *   2. Crea la cartella img/profili/[nome-cognome]/ con le sue foto
 *   3. Seleziona i template_ids più adatti ai suoi interessi
 * ─────────────────────────────────────────────────────────────────────────────
 */

const PROFILI = [

  {
    nome: "stefano baglio",
    template_ids: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
      51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
      61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
      71, 72, 73, 74, 75,
    ],
    // dati: { professione: '', citta: '', azienda: '' },
  },

  {
    nome: "nicola davanzo",
    template_ids: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
      51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
      61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
      71, 72, 73, 74, 75,
    ],
    // dati: { professione: '', citta: '', azienda: '' },
  },

  {
    nome: "luca curtarelli",
    template_ids: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
      51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
      61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
      71, 72, 73, 74, 75,
    ],
    // dati: { professione: '', citta: '', azienda: '' },
  },

];
