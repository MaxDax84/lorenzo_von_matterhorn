/**
 * genera-profili.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Script di build: legge tutti i file img/profili/*\/profile.json e
 * rigenera automaticamente js/profiles.js.
 *
 * Esecuzione locale:  node scripts/genera-profili.js
 * Esecuzione Vercel:  impostato come buildCommand in vercel.json
 * ─────────────────────────────────────────────────────────────────────────────
 */

const fs   = require('fs');
const path = require('path');

const ROOT        = path.resolve(__dirname, '..');
const PROFILI_DIR = path.join(ROOT, 'img', 'profili');
const OUTPUT      = path.join(ROOT, 'js', 'profiles.js');

// ── Leggi tutte le sottocartelle di img/profili/ ──────────────────────────
const cartelle = fs.readdirSync(PROFILI_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

const profili = [];

for (const cartella of cartelle) {
  const jsonPath = path.join(PROFILI_DIR, cartella, 'profile.json');
  if (!fs.existsSync(jsonPath)) {
    console.warn(`⚠  Nessun profile.json trovato in ${cartella} — saltato`);
    continue;
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch (err) {
    console.error(`✗  Errore nel parsing di ${cartella}/profile.json:`, err.message);
    process.exit(1);
  }

  if (!data.nome || !Array.isArray(data.template_ids)) {
    console.error(`✗  ${cartella}/profile.json deve avere "nome" e "template_ids"`);
    process.exit(1);
  }

  profili.push(data);
  console.log(`✓  ${data.nome} (${data.template_ids.length} template)`);
}

if (profili.length === 0) {
  console.error('✗  Nessun profilo trovato. Controlla la cartella img/profili/');
  process.exit(1);
}

// ── Genera il contenuto di js/profiles.js ────────────────────────────────
const lines = [];
lines.push('// GENERATO AUTOMATICAMENTE — non modificare a mano.');
lines.push('// Modifica i file img/profili/*/profile.json e riesegui: node scripts/genera-profili.js');
lines.push('');
lines.push('const PROFILI = [');

for (const p of profili) {
  // Formatta template_ids su righe da 10
  const ids = p.template_ids;
  const rows = [];
  for (let i = 0; i < ids.length; i += 10) {
    rows.push('      ' + ids.slice(i, i + 10).join(', '));
  }

  lines.push('  {');
  lines.push(`    nome: ${JSON.stringify(p.nome)},`);
  lines.push('    template_ids: [');
  lines.push(rows.join(',\n'));
  lines.push('    ],');

  if (p.dati) {
    // Includi solo le chiavi con valore non vuoto
    const datiPuliti = Object.fromEntries(
      Object.entries(p.dati).filter(([, v]) => v && v.trim() !== '')
    );
    if (Object.keys(datiPuliti).length) {
      lines.push(`    dati: ${JSON.stringify(datiPuliti)},`);
    }
  }

  lines.push('  },');
  lines.push('');
}

lines.push('];');
lines.push('');

// ── Scrivi il file ────────────────────────────────────────────────────────
fs.writeFileSync(OUTPUT, lines.join('\n'), 'utf8');
console.log(`\n✅ js/profiles.js rigenerato con ${profili.length} profil${profili.length === 1 ? 'o' : 'i'}.`);
