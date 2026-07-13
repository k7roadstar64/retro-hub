const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
};

module.exports = async function handler(req, res) {
    const { q } = req.query;
    if (!q) return res.status(400).end();

    try {
        console.log(`[boxart] Query: ${q}`);
        // Step 1: get VQD session token
        const html = await fetch(
            `https://duckduckgo.com/?q=${encodeURIComponent(q)}&iax=images&ia=images`,
            { headers: HEADERS }
        ).then(r => r.text());

        const vqd = (html.match(/vqd=["']([^"']+)["']/) || html.match(/"vqd"\s*:\s*"([^"]+)"/) || [])[1];
        console.log(`[boxart] Found VQD: ${vqd}`);
        if (!vqd) {
            console.log('[boxart] VQD not found, returning 404');
            return res.status(404).end();
        }

        // Step 2: get image results
        const data = await fetch(
            `https://duckduckgo.com/i.js?q=${encodeURIComponent(q)}&o=json&vqd=${encodeURIComponent(vqd)}&p=1`,
            { headers: HEADERS }
        ).then(r => r.json());

        const results = data?.results || [];
        if (results.length === 0) {
            console.log('[boxart] No results found, returning 404');
            return res.status(404).end();
        }

        // Step 3: try fetching images until one succeeds
        let imgResp;
        let imgUrl;
        let success = false;

        for (let i = 0; i < Math.min(results.length, 5); i++) {
            imgUrl = results[i]?.image;
            if (!imgUrl) continue;
            try {
                console.log(`[boxart] Attempt ${i + 1}: Fetching image from: ${imgUrl}`);
                imgResp = await fetch(imgUrl, { headers: { 'User-Agent': HEADERS['User-Agent'] } });
                console.log(`[boxart] Attempt ${i + 1} status: ${imgResp.status}`);
                if (imgResp.ok) {
                    success = true;
                    break;
                }
            } catch (err) {
                console.log(`[boxart] Attempt ${i + 1} fetch error:`, err.message);
            }
        }

        if (!success || !imgResp) {
            console.log('[boxart] All image attempts failed, returning 404');
            return res.status(404).end();
        }

        res.setHeader('Content-Type', imgResp.headers.get('content-type') || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
        res.send(Buffer.from(await imgResp.arrayBuffer()));
    } catch (err) {
        console.error('[boxart] Error in handler:', err);
        res.status(500).end();
    }
};
