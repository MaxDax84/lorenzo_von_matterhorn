export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { q } = req.query;
  if (!q || !q.trim()) {
    return res.status(400).json({ error: 'Query mancante' });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  const cx     = process.env.GOOGLE_CX;

  if (!apiKey || !cx) {
    return res.status(500).json({ error: 'Configurazione API mancante' });
  }

  const url = new URL('https://www.googleapis.com/customsearch/v1');
  url.searchParams.set('key', apiKey);
  url.searchParams.set('cx',  cx);
  url.searchParams.set('q',   q.trim());
  url.searchParams.set('num', '7');
  url.searchParams.set('gl',  'it');
  url.searchParams.set('lr',  'lang_it');

  try {
    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Errore Google API' });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Errore di rete' });
  }
}
