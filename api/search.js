export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { q } = req.query;
  if (!q || !q.trim()) {
    return res.status(400).json({ error: 'Query mancante' });
  }

  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Configurazione API mancante' });
  }

  const url = new URL('https://serpapi.com/search.json');
  url.searchParams.set('q',       q.trim());
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('hl',      'it');
  url.searchParams.set('gl',      'it');
  url.searchParams.set('num',     '7');

  try {
    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok || data.error) {
      return res.status(response.status || 500).json({ error: data.error || 'Errore SerpAPI' });
    }

    // Normalizza al formato atteso da results.html (stessa struttura Google CSE)
    const items = (data.organic_results || []).map(r => ({
      title:       r.title,
      link:        r.link,
      displayLink: (r.displayed_link || r.link)
                     .replace(/^https?:\/\//, '')
                     .split(/[\s›\/]/)[0],
      snippet:     r.snippet || ''
    }));

    const info        = data.search_information || {};
    const totalResults = info.total_results
      ? Number(info.total_results).toLocaleString('it-IT')
      : items.length.toString();
    const searchTime  = info.time_taken_displayed
      ? String(info.time_taken_displayed.toFixed(2)).replace('.', ',')
      : '0,40';

    return res.status(200).json({
      items,
      searchInformation: {
        formattedTotalResults: totalResults,
        formattedSearchTime:   searchTime
      }
    });

  } catch (err) {
    return res.status(500).json({ error: 'Errore di rete' });
  }
}
