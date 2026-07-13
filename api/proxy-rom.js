module.exports = async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).send('Missing url parameter');

    try {
        console.log(`[proxy-rom] Proxying: ${url}`);
        
        // Fetch target URL
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            console.error(`[proxy-rom] Target responded with status ${response.status}`);
            return res.status(response.status).send(`Target returned status ${response.status}`);
        }

        // Set response headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
        
        const contentLength = response.headers.get('content-length');
        if (contentLength) {
            res.setHeader('Content-Length', contentLength);
        }

        // Stream the response back to client chunk by chunk
        const reader = response.body.getReader();
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            res.write(value);
        }
        res.end();
    } catch (err) {
        console.error('[proxy-rom] Error proxying ROM:', err);
        res.status(500).send('Error proxying ROM: ' + err.message);
    }
};
