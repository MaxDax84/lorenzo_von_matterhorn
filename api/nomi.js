import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const profiliDir = join(process.cwd(), 'img', 'profili');
  const nomi = [];

  try {
    const cartelle = readdirSync(profiliDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const cartella of cartelle) {
      const jsonPath = join(profiliDir, cartella, 'profile.json');
      if (!existsSync(jsonPath)) continue;
      try {
        const data = JSON.parse(readFileSync(jsonPath, 'utf8'));
        if (data.nome) nomi.push(data.nome);
      } catch { /* ignora JSON malformato */ }
    }
  } catch {
    return res.status(500).json({ error: 'Errore lettura profili' });
  }

  return res.status(200).json({ nomi });
}
