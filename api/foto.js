import { readdirSync } from 'fs';
import { join } from 'path';

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|webp|gif|avif)$/i;

function slugify(nome) {
  return nome.toLowerCase().trim()
    .replace(/à/g, 'a').replace(/è/g, 'e').replace(/é/g, 'e')
    .replace(/ì/g, 'i').replace(/ò/g, 'o').replace(/ù/g, 'u')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { nome } = req.query;
  if (!nome || !nome.trim()) {
    return res.status(400).json({ foto: null });
  }

  const slug = slugify(nome);
  const dir  = join(process.cwd(), 'img', 'profili', slug);

  try {
    const files = readdirSync(dir).filter(f => IMAGE_EXTENSIONS.test(f));
    if (files.length === 0) return res.status(200).json({ foto: null });

    const random = files[Math.floor(Math.random() * files.length)];
    return res.status(200).json({ foto: `/img/profili/${slug}/${random}` });
  } catch {
    // Cartella non esiste o errore di lettura → nessuna foto
    return res.status(200).json({ foto: null });
  }
}
