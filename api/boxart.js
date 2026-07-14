const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
};

const FETCH_TIMEOUT_MS = 4000;

function fetchWithTimeout(url, opts = {}) {
    return fetch(url, { ...opts, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
}

// --- Provedor 1: DuckDuckGo Images (bloqueia IPs de datacenter — funciona só às vezes) ---
async function searchDDG(q) {
    const html = await fetchWithTimeout(
        `https://duckduckgo.com/?q=${encodeURIComponent(q)}&iax=images&ia=images`,
        { headers: HEADERS }
    ).then(r => r.text());

    const vqd = (html.match(/vqd=["']([^"']+)["']/) || html.match(/"vqd"\s*:\s*"([^"]+)"/) || [])[1];
    if (!vqd) {
        console.log('[boxart] DDG: VQD not found (likely datacenter IP block)');
        return [];
    }

    const data = await fetchWithTimeout(
        `https://duckduckgo.com/i.js?q=${encodeURIComponent(q)}&o=json&vqd=${encodeURIComponent(vqd)}&p=1`,
        { headers: HEADERS }
    ).then(r => r.json());

    return (data?.results || []).map(r => r.image).filter(Boolean);
}

// --- Provedor 2: Bing Images (scraping do HTML; tolera IPs de datacenter) ---
async function searchBing(q) {
    const html = await fetchWithTimeout(
        `https://www.bing.com/images/search?q=${encodeURIComponent(q)}&first=1&adlt=off`,
        { headers: HEADERS }
    ).then(r => r.text());

    // Cada resultado tem um atributo m="{...JSON com murl (URL da imagem original)...}"
    const urls = [];
    const re = /class="iusc"[^>]*\sm="([^"]+)"/g;
    let match;
    while ((match = re.exec(html)) !== null && urls.length < 8) {
        try {
            const meta = JSON.parse(match[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
            if (meta.murl) urls.push(meta.murl);
        } catch { /* segue para o próximo */ }
    }
    if (urls.length === 0) console.log('[boxart] Bing: no parseable results');
    return urls;
}

// --- Provedor 3: Wikipedia PageImages (API oficial, nunca bloqueia; boxart costuma ser a imagem do artigo) ---
async function searchWikipedia(q) {
    // Remove o sufixo "game boxart" que o cliente acrescenta — a busca no Wikipedia é por título
    const term = q.replace(/\s*game boxart\s*$/i, '').trim();
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrlimit=3&prop=pageimages&piprop=thumbnail&pithumbsize=512&format=json&origin=*`;
    const data = await fetchWithTimeout(url, { headers: HEADERS }).then(r => r.json());

    const pages = Object.values(data?.query?.pages || {});
    pages.sort((a, b) => (a.index || 99) - (b.index || 99));
    return pages.map(p => p.thumbnail?.source).filter(Boolean);
}

async function firstWorkingImage(urls) {
    for (const imgUrl of urls.slice(0, 5)) {
        try {
            const resp = await fetchWithTimeout(imgUrl, { headers: { 'User-Agent': HEADERS['User-Agent'] } });
            const type = resp.headers.get('content-type') || '';
            if (resp.ok && !type.includes('text/html')) return resp;
        } catch (err) {
            console.log('[boxart] image fetch failed:', imgUrl, err.message);
        }
    }
    return null;
}

module.exports = async function handler(req, res) {
    const { q } = req.query;
    if (!q) return res.status(400).end();

    const providers = [
        ['ddg', searchDDG],
        ['bing', searchBing],
        ['wikipedia', searchWikipedia],
    ];

    try {
        console.log(`[boxart] Query: ${q}`);
        for (const [name, search] of providers) {
            let urls = [];
            try {
                urls = await search(q);
            } catch (err) {
                console.log(`[boxart] provider ${name} failed:`, err.message);
                continue;
            }
            if (urls.length === 0) continue;

            const imgResp = await firstWorkingImage(urls);
            if (!imgResp) continue;

            console.log(`[boxart] served via ${name}`);
            res.setHeader('Content-Type', imgResp.headers.get('content-type') || 'image/jpeg');
            res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
            res.setHeader('X-Boxart-Provider', name);
            return res.send(Buffer.from(await imgResp.arrayBuffer()));
        }

        console.log('[boxart] all providers exhausted, returning 404');
        // Cache curto no 404 para não martelar os provedores com a mesma query
        res.setHeader('Cache-Control', 'public, max-age=3600');
        return res.status(404).end();
    } catch (err) {
        console.error('[boxart] Error in handler:', err);
        return res.status(500).end();
    }
};
