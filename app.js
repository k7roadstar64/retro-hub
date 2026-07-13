// retro-hub app.js

// --- 1. BANCO DE DADOS DE JOGOS CURADOS (RECOMENDADOS) ---
// Usando coleções públicas estáveis do Archive.org que possuem download direto liberado e CORS amigável.
const CURATED_GAMES = [
    // NES
    {
        id: "nes_mario3",
        title: "Super Mario Bros. 3",
        boxartName: "Super Mario Bros. 3 (USA)",
        console: "nes",
        consoleLabel: "Nintendo NES",
        core: "nes",
        romUrl: "https://archive.org/download/nintendo-nes-romset/Super%20Mario%20Bros.%203%20%28USA%29.zip",
        thumbUrl: ""
    },
    {
        id: "nes_zelda",
        title: "The Legend of Zelda",
        boxartName: "Legend of Zelda, The (USA)",
        console: "nes",
        consoleLabel: "Nintendo NES",
        core: "nes",
        romUrl: "https://archive.org/download/nintendo-nes-romset/Legend%20of%20Zelda%2C%20The%20%28USA%29.zip",
        thumbUrl: ""
    },
    {
        id: "nes_metroid",
        title: "Metroid",
        boxartName: "Metroid (USA)",
        console: "nes",
        consoleLabel: "Nintendo NES",
        core: "nes",
        romUrl: "https://archive.org/download/nintendo-nes-romset/Metroid%20%28USA%29.zip",
        thumbUrl: ""
    },
    {
        id: "nes_megaman2",
        title: "Mega Man 2",
        boxartName: "Mega Man 2 (USA)",
        console: "nes",
        consoleLabel: "Nintendo NES",
        core: "nes",
        romUrl: "https://archive.org/download/nintendo-nes-romset/Mega%20Man%202%20%28USA%29.zip",
        thumbUrl: ""
    },

    // SNES
    {
        id: "snes_marioworld",
        title: "Super Mario World",
        boxartName: "Super Mario World (USA)",
        console: "snes",
        consoleLabel: "Super Nintendo",
        core: "snes",
        romUrl: "https://archive.org/download/snes-romset-ultra/Super%20Mario%20World%20%28USA%29.zip",
        thumbUrl: ""
    },
    {
        id: "snes_supermetroid",
        title: "Super Metroid",
        boxartName: "Super Metroid (USA)",
        console: "snes",
        consoleLabel: "Super Nintendo",
        core: "snes",
        romUrl: "https://archive.org/download/snes-romset-ultra/Super%20Metroid%20%28USA%29.zip",
        thumbUrl: ""
    },
    {
        id: "snes_zelda_alttp",
        title: "The Legend of Zelda: A Link to the Past",
        boxartName: "Legend of Zelda, The - A Link to the Past (USA)",
        console: "snes",
        consoleLabel: "Super Nintendo",
        core: "snes",
        romUrl: "https://archive.org/download/snes-romset-ultra/Legend%20of%20Zelda%2C%20The%20-%20A%20Link%20to%20the%20Past%20%28USA%29.zip",
        thumbUrl: ""
    },
    {
        id: "snes_dkc",
        title: "Donkey Kong Country",
        boxartName: "Donkey Kong Country (USA)",
        console: "snes",
        consoleLabel: "Super Nintendo",
        core: "snes",
        romUrl: "https://archive.org/download/snes-romset-ultra/Donkey%20Kong%20Country%20%28USA%29.zip",
        thumbUrl: ""
    },

    // GBA
    {
        id: "gba_pokemon_firered",
        title: "Pokémon FireRed",
        boxartName: "Pokemon - Fire Red Version (USA, Europe)",
        console: "gba",
        consoleLabel: "Game Boy Advance",
        core: "gba",
        romUrl: "https://archive.org/download/gba-roms-collection/Pokemon%20-%20FireRed%20Version%20%28USA%29.zip",
        thumbUrl: ""
    },
    {
        id: "gba_zelda_minish",
        title: "Zelda: The Minish Cap",
        boxartName: "Legend of Zelda, The - The Minish Cap (USA)",
        console: "gba",
        consoleLabel: "Game Boy Advance",
        core: "gba",
        romUrl: "https://archive.org/download/gba-roms-collection/Legend%20of%20Zelda%2C%20The%20-%20The%20Minish%20Cap%20%28USA%29.zip",
        thumbUrl: ""
    },
    {
        id: "gba_mariokart",
        title: "Mario Kart - Super Circuit",
        boxartName: "Mario Kart - Super Circuit (USA, Europe)",
        console: "gba",
        consoleLabel: "Game Boy Advance",
        core: "gba",
        romUrl: "https://archive.org/download/gba-roms-collection/Mario%20Kart%20-%20Super%20Circuit%20%28USA%29.zip",
        thumbUrl: ""
    },

    // MEGADRIVE (Genesis)
    {
        id: "gen_sonic1",
        title: "Sonic the Hedgehog",
        boxartName: "Sonic the Hedgehog (USA, Europe)",
        console: "segaMD",
        consoleLabel: "Sega Mega Drive",
        core: "segaMD",
        romUrl: "https://archive.org/download/sega-genesis-romset/Sonic%20the%20Hedgehog%20%28USA%2C%20Europe%29.zip",
        thumbUrl: ""
    },
    {
        id: "gen_sor2",
        title: "Streets of Rage 2",
        boxartName: "Streets of Rage 2 (USA, Europe)",
        console: "segaMD",
        consoleLabel: "Sega Mega Drive",
        core: "segaMD",
        romUrl: "https://archive.org/download/sega-genesis-romset/Streets%20of%20Rage%202%20%28USA%29.zip",
        thumbUrl: ""
    },
    {
        id: "gen_aladdin",
        title: "Aladdin",
        boxartName: "Aladdin (USA, Europe)",
        console: "segaMD",
        consoleLabel: "Sega Mega Drive",
        core: "segaMD",
        romUrl: "https://archive.org/download/sega-genesis-romset/Aladdin%20%28USA%29.zip",
        thumbUrl: ""
    },

    // GBC
    {
        id: "gbc_pokemon_yellow",
        title: "Pokémon Yellow",
        boxartName: "Pokemon - Yellow Version (USA, Europe) (SGB Enhanced)",
        console: "gbc",
        consoleLabel: "Game Boy Color",
        core: "gbc",
        romUrl: "https://archive.org/download/nintendo-game-boy-color-romset/Pokemon%20-%20Yellow%20Version%20%28USA%2C%20Europe%29%20%28SGB%20Enhanced%29.zip",
        thumbUrl: ""
    },

    // PS1 (PlayStation 1)
    {
        id: "psx_castlevania",
        title: "Castlevania: Symphony of the Night",
        boxartName: "Castlevania - Symphony of the Night (USA)",
        console: "psx",
        consoleLabel: "PlayStation 1",
        core: "psx",
        romUrl: "https://archive.org/download/sony-playstation-usa-redump/Castlevania%20-%20Symphony%20of%20the%20Night%20%28USA%29.zip",
        thumbUrl: ""
    },
    {
        id: "psx_crash",
        title: "Crash Bandicoot",
        boxartName: "Crash Bandicoot (USA)",
        console: "psx",
        consoleLabel: "PlayStation 1",
        core: "psx",
        romUrl: "https://archive.org/download/sony-playstation-usa-redump/Crash%20Bandicoot%20%28USA%29.zip",
        thumbUrl: ""
    },
    {
        id: "psx_pepsiman",
        title: "Pepsiman",
        boxartName: "Pepsiman (Japan)",
        console: "psx",
        consoleLabel: "PlayStation 1",
        core: "psx",
        romUrl: "https://archive.org/download/sony-playstation-japan-redump/Pepsiman%20%28Japan%29.zip",
        thumbUrl: ""
    }
];

// --- 2. GERENCIAMENTO DE ESTADO GLOBAL ---
let currentTab = 'home';
let currentConsoleFilter = 'all';
let favorites = loadStoredFavorites();
function loadStoredFavorites() {
    try {
        const raw = localStorage.getItem('retroplay_favorites');
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error();
        return parsed.filter(f =>
            f && typeof f === 'object' &&
            typeof f.title === 'string' &&
            typeof f.romUrl === 'string' &&
            typeof f.core === 'string'
        );
    } catch {
        localStorage.removeItem('retroplay_favorites');
        return [];
    }
}

let recentGames = loadStoredRecentGames();
function loadStoredRecentGames() {
    try {
        const raw = localStorage.getItem('retroplay_recent');
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error();
        return parsed.filter(g =>
            g && typeof g === 'object' &&
            typeof g.title === 'string' &&
            typeof g.romUrl === 'string' &&
            typeof g.core === 'string'
        );
    } catch {
        localStorage.removeItem('retroplay_recent');
        return [];
    }
}

function addToRecentGames(game) {
    if (!game || !game.romUrl || game.romUrl.startsWith('blob:')) return;

    const entry = {
        title: game.title || 'Sem Título',
        consoleName: game.consoleName || game.consoleLabel || '',
        core: game.core || '',
        romUrl: game.romUrl,
        boxartName: game.boxartName || game.title || '',
        lastPlayed: Date.now()
    };

    // Remove duplicates
    const idx = recentGames.findIndex(g => g.romUrl === entry.romUrl);
    if (idx !== -1) {
        recentGames.splice(idx, 1);
    }

    // Prepend to list
    recentGames.unshift(entry);

    // Limit to top 32
    if (recentGames.length > 32) {
        recentGames = recentGames.slice(0, 32);
    }

    localStorage.setItem('retroplay_recent', JSON.stringify(recentGames));

    if (currentTab === 'library') {
        renderLibrary();
    }
}

// --- 3. GERENCIADOR DE CACHE DE ROMS (INDEXEDDB) ---
const RomCacheDB = {
    DB_NAME: 'retroplay_db',
    DB_VERSION: 1,
    STORE_NAME: 'roms_cache',
    MAX_ITEMS: 12, // Limite recomendado de 12 jogos no cache local

    open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(this.STORE_NAME)) {
                    db.createObjectStore(this.STORE_NAME, { keyPath: 'romUrl' });
                }
            };
        });
    },

    async get(romUrl) {
        try {
            const db = await this.open();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(this.STORE_NAME, 'readonly');
                const store = transaction.objectStore(this.STORE_NAME);
                const request = store.get(romUrl);
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result || null);
            });
        } catch (e) {
            console.error('Erro ao ler do IndexedDB:', e);
            return null;
        }
    },

    async save(romUrl, title, blob, core, consoleName, boxartName) {
        try {
            const db = await this.open();
            
            // Rodar evicção antes de salvar
            await this.evictOldest(db);

            return new Promise((resolve, reject) => {
                const transaction = db.transaction(this.STORE_NAME, 'readwrite');
                const store = transaction.objectStore(this.STORE_NAME);
                const entry = {
                    romUrl,
                    title,
                    blob,
                    core,
                    consoleName,
                    boxartName: boxartName || title,
                    lastAccessed: Date.now(),
                    size: blob.size
                };
                const request = store.put(entry);
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve();
            });
        } catch (e) {
            console.error('Erro ao salvar no IndexedDB:', e);
        }
    },

    async updateAccessTime(romUrl) {
        try {
            const db = await this.open();
            const entry = await this.get(romUrl);
            if (entry) {
                entry.lastAccessed = Date.now();
                return new Promise((resolve, reject) => {
                    const transaction = db.transaction(this.STORE_NAME, 'readwrite');
                    const store = transaction.objectStore(this.STORE_NAME);
                    const request = store.put(entry);
                    request.onerror = () => reject(request.error);
                    request.onsuccess = () => resolve();
                });
            }
        } catch (e) {
            console.error('Erro ao atualizar data de acesso no cache:', e);
        }
    },

    async evictOldest(db) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.STORE_NAME, 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.getAll();
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                const items = request.result;
                if (items.length < this.MAX_ITEMS) {
                    resolve();
                    return;
                }
                
                // Ordenar por data de acesso (antigos primeiro)
                items.sort((a, b) => (a.lastAccessed || 0) - (b.lastAccessed || 0));
                
                // Quantidade para deletar para abrir espaço
                const toDeleteCount = (items.length - this.MAX_ITEMS) + 1;
                const promises = [];
                for (let i = 0; i < toDeleteCount; i++) {
                    const item = items[i];
                    if (item) {
                        promises.push(new Promise((res, rej) => {
                            const delReq = store.delete(item.romUrl);
                            delReq.onerror = () => rej(delReq.error);
                            delReq.onsuccess = () => res();
                        }));
                    }
                }
                
                Promise.all(promises).then(() => resolve()).catch(reject);
            };
        });
    },

    async clearAll() {
        try {
            const db = await this.open();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(this.STORE_NAME, 'readwrite');
                const store = transaction.objectStore(this.STORE_NAME);
                const request = store.clear();
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve();
            });
        } catch (e) {
            console.error('Erro ao limpar cache IndexedDB:', e);
        }
    },

    async getStats() {
        try {
            const db = await this.open();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(this.STORE_NAME, 'readonly');
                const store = transaction.objectStore(this.STORE_NAME);
                const request = store.getAll();
                request.onerror = () => reject(request.error);
                request.onsuccess = () => {
                    const items = request.result;
                    const totalSize = items.reduce((sum, item) => sum + (item.size || 0), 0);
                    resolve({ count: items.length, totalSize });
                };
            });
        } catch (e) {
            return { count: 0, totalSize: 0 };
        }
    }
};

function loadStoredControls(consoleType = 'global') {
    try {
        const key = consoleType === 'global' ? 'retroplay_controls' : `retroplay_controls_${consoleType}`;
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (typeof parsed !== 'object' || Array.isArray(parsed) || parsed === null) throw new Error();
        for (const [k, v] of Object.entries(parsed)) {
            if (!/^\d+$/.test(k)) throw new Error();
            if (typeof v !== 'number' && typeof v !== 'string') throw new Error();
        }
        return parsed;
    } catch {
        const key = consoleType === 'global' ? 'retroplay_controls' : `retroplay_controls_${consoleType}`;
        localStorage.removeItem(key);
        return null;
    }
}

function isSafeUrl(url) {
    try {
        const u = new URL(url);
        return u.protocol === 'https:' || u.protocol === 'http:' || u.protocol === 'blob:';
    } catch { return false; }
}

let activeGame = null;
let activeBlobUrl = null; // Blob URL ativa — revogada ao fechar o jogo para liberar RAM
let tempZipData = null;
let downloadAbortController = null;
let libraryConsoleFilter = 'all';

// --- FUNÇÕES DE AUXÍLIO PARA SUPORTE A ZIP E AUTO-DETECÇÃO ---

function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = String(s ?? '');
    return d.innerHTML;
}

function showError(title, safeHtmlBody) {
    const modal = document.getElementById('error-modal');
    if (!modal) { alert(`${title}\n\n${safeHtmlBody.replace(/<[^>]*>/g, '')}`); return; }
    document.getElementById('error-modal-title').textContent = title;
    document.getElementById('error-modal-body').innerHTML = safeHtmlBody;
    modal.classList.remove('hidden');
}

function openZipConsoleSelector(title, blobUrl, boxartName) {
    tempZipData = { title, blobUrl, boxartName: boxartName || title };
    const zipModal = document.getElementById('zip-modal');
    if (zipModal) zipModal.classList.remove('hidden');
}

function closeZipModal() {
    const zipModal = document.getElementById('zip-modal');
    if (zipModal) zipModal.classList.add('hidden');
    // Se fechar o modal sem rodar o jogo, revoga o objeto para limpar memória RAM se for blob local
    if (tempZipData && tempZipData.blobUrl && tempZipData.blobUrl.startsWith('blob:') && !activeGame) {
        URL.revokeObjectURL(tempZipData.blobUrl);
    }
    tempZipData = null;
}

function inferCoreFromText(text) {
    const t = text.toLowerCase();
    if (t.includes('snes') || t.includes('super nintendo') || t.includes('super famicom') || t.includes('.sfc') || t.includes('.smc')) {
        return 'snes';
    }
    if (t.includes('gba') || t.includes('game boy advance') || t.includes('gameboy advance')) {
        return 'gba';
    }
    if (t.includes('gbc') || t.includes('game boy color') || t.includes('gameboy color')) {
        return 'gbc';
    }
    if (t.includes('game boy') || t.includes('gameboy') || t.includes(' gb ') || t.endsWith(' gb')) {
        return 'gb';
    }
    if (t.includes('nes') || t.includes('nintendo entertainment system') || t.includes('famicom') || t.includes('.nes')) {
        return 'nes';
    }
    if (t.includes('genesis') || t.includes('megadrive') || t.includes('mega drive') || t.includes('segamd') || t.includes('sega md')) {
        return 'segaMD';
    }
    if (t.includes('game gear') || t.includes('gamegear') || t.includes('sega gg')) {
        return 'gamegear';
    }
    if (t.includes('master system') || t.includes('mastersystem') || t.includes('sega ms')) {
        return 'segaMS';
    }
    if (t.includes('n64') || t.includes('nintendo 64') || t.includes('z64')) {
        return 'n64';
    }
    if (t.includes('nds') || t.includes('nintendo ds')) {
        return 'nds';
    }
    if (t.includes('ps1') || t.includes('psx') || t.includes('playstation') || t.includes('.cue') || t.includes('.bin') || t.includes('.iso') || t.includes('.img') || t.includes('.chd')) {
        return 'psx';
    }
    return 'zip'; // Retorna 'zip' se não conseguir inferir
}

function getGameBoxartUrl(gameTitle, consoleType) {
    const playlists = {
        'nes': 'Nintendo_-_Nintendo_Entertainment_System',
        'snes': 'Nintendo_-_Super_Nintendo_Entertainment_System',
        'gba': 'Nintendo_-_Game_Boy_Advance',
        'segaMD': 'Sega_-_Mega_Drive_-_Genesis',
        'segaMS': 'Sega_-_Master_System_-_Mark_III',
        'segaGG': 'Sega_-_Game_Gear',
        'gamegear': 'Sega_-_Game_Gear',
        'gbc': 'Nintendo_-_Game_Boy_Color',
        'gb': 'Nintendo_-_Game_Boy',
        'n64': 'Nintendo_-_Nintendo_64',
        'nds': 'Nintendo_-_Nintendo_DS',
        'psx': 'Sony_-_PlayStation'
    };

    const playlist = playlists[consoleType];
    if (!playlist) return '';

    let cleanTitle = gameTitle;

    // 1. Remover extensão de arquivo real (.zip, .nes, .smc, etc.)
    const lastDotIdx = cleanTitle.lastIndexOf('.');
    if (lastDotIdx > 0) {
        const possibleExt = cleanTitle.substring(lastDotIdx + 1);
        if (/^[a-zA-Z0-9]{1,4}$/.test(possibleExt)) {
            cleanTitle = cleanTitle.substring(0, lastDotIdx);
        }
    }

    // 2. Substituir underscores por espaços (comum em arquivos baixados)
    cleanTitle = cleanTitle.replace(/_/g, ' ');

    // 3. Remover tags em colchetes [...] como dumps, patches e grupos (ex: [!], [h1], [t1])
    cleanTitle = cleanTitle.replace(/\[[^\]]*\]/g, '');

    // 4. Remover metadados irrelevantes de emulação dentro de parênteses (ex: (Rev 1), (PRG1), (Beta), (M5))
    // Mantendo regiões geográficas importantes que o Libretro usa (USA, Europe, Japan, World)
    cleanTitle = cleanTitle.replace(/\((?:rev|prg|v\d|beta|proto|demo|sample|alt|hack|unl|translation|unlicensed|np|vol|disc|re-release|edition|club|classic|bonus|promotion|arcade|v[0-9]|combo|pack|sgb|super game boy|enhanced|action replay|gameshark|cheats|m\d)[^)]*\)/gi, '');

    // 5. Expandir códigos de região abreviados comuns em ROMs antigas (ex: (U) -> (USA), (E) -> (Europe))
    cleanTitle = cleanTitle.replace(/\(([^)]+)\)/g, (match, content) => {
        const trimmed = content.trim().toUpperCase();
        const mapped = {
            'U': 'USA',
            'E': 'Europe',
            'J': 'Japan',
            'W': 'World',
            'F': 'France',
            'G': 'Germany',
            'I': 'Italy',
            'S': 'Spain',
            'A': 'Australia',
            'C': 'Canada',
            'K': 'Korea',
            'BR': 'Brazil',
            'UE': 'USA, Europe',
            'JU': 'Japan, USA',
            'JE': 'Japan, Europe',
            'JUE': 'Japan, USA, Europe',
        }[trimmed];
        return mapped ? `(${mapped})` : match;
    });

    // 6. Limpar parênteses ou colchetes vazios gerados pelas remoções
    cleanTitle = cleanTitle.replace(/\(\s*\)/g, '').replace(/\[\s*\]/g, '');

    // 7. Substituir múltiplos espaços gerados por um único espaço
    cleanTitle = cleanTitle.replace(/\s+/g, ' ');

    // 8. Substituir caracteres inválidos nos arquivos do GitHub (& * / : < > ? | ") por _
    cleanTitle = cleanTitle.replace(/[&*\/:<>?|"]/g, '_');

    cleanTitle = cleanTitle.trim();

    return `https://raw.githubusercontent.com/libretro-thumbnails/${playlist}/master/Named_Boxarts/${encodeURIComponent(cleanTitle)}.png`;
}

// Carregamento de imagem com fallback em cascata (evita onerror inline bloqueado pela CSP)
// Aceita URLs (string) e resolvers assíncronos (function → Promise<string|null>)
function loadImageWithFallbacks(imgEl, fallbackEl, ...items) {
    const seen = new Set();
    let i = 0;
    let settled = false;

    function tryNext() {
        if (settled) return;
        while (i < items.length) {
            const item = items[i++];
            if (!item) continue;
            if (typeof item === 'function') {
                item().then(url => {
                    if (settled) return;
                    if (url && !seen.has(url)) { seen.add(url); imgEl.src = url; }
                    else tryNext();
                }).catch(tryNext);
                return;
            }
            if (!seen.has(item)) { seen.add(item); imgEl.src = item; return; }
        }
        settled = true;
        imgEl.style.display = 'none';
        if (fallbackEl) fallbackEl.style.display = 'flex';
    }

    imgEl.addEventListener('error', () => { if (!settled) tryNext(); });
    tryNext();
}

// Variantes de título para fuzzy matching (sem região, sem prefixo publisher "X's")
// Retorna array de URLs GitHub adicionais a tentar
function getBoxartVariantUrls(boxartName, consoleType) {
    const seen = new Set();
    const results = [];
    function add(title) {
        const url = getGameBoxartUrl(title.trim(), consoleType);
        if (url && !seen.has(url)) { seen.add(url); results.push(url); }
    }
    const noRegion        = boxartName.replace(/\s*\([^)]*\)/g, '').trim();
    const noPossessive    = boxartName.replace(/^\S+'s?\s+/i, '').trim();       // "Disney's Aladdin (USA)" → "Aladdin (USA)"
    const noPossNoRegion  = noPossessive.replace(/\s*\([^)]*\)/g, '').trim();
    [noRegion, noPossessive, noPossNoRegion].forEach(v => { if (v !== boxartName) add(v); });
    return results;
}

// URL da tela de título (Named_Titles) — imagem relacionada ao jogo como fallback intermediário
function getGameTitleScreenUrl(boxartName, consoleType) {
    const url = getGameBoxartUrl(boxartName, consoleType);
    return url ? url.replace('/Named_Boxarts/', '/Named_Titles/') : null;
}

// Retorna URL da serverless function /api/boxart que faz o scraping do DDG server-side
function getBoxartDDGUrl(title, consoleType) {
    const q = encodeURIComponent(`${title}${consoleType ? ' ' + consoleType : ''} game boxart`);
    return `/api/boxart?q=${q}`;
}

// Gera data URI com ícone SVG estilizado no tema neon do site — sem requisição externa
function getConsoleFallbackUrl(consoleType) {
    const colors = {
        nes: '#ff3366', snes: '#8a2be2', gba: '#00dfd8',
        gb: '#00ff66', gbc: '#00cc55',
        sega: '#ff9f00', segaMD: '#ff9f00', segaMS: '#ff7700', segaGG: '#ffcc00', gamegear: '#ffcc00',
        psx: '#0070d2'
    };
    const labels = {
        nes: 'NES', snes: 'SNES', gba: 'GBA',
        gb: 'GAME BOY', gbc: 'GAME BOY COLOR',
        sega: 'SEGA', segaMD: 'GENESIS', segaMS: 'MASTER SYSTEM', segaGG: 'GAME GEAR', gamegear: 'GAME GEAR',
        psx: 'PLAYSTATION'
    };
    const c = colors[consoleType] || '#00f0ff';
    const l = labels[consoleType] || (consoleType || 'RETRO').toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="200" viewBox="0 0 280 200">
  <rect width="280" height="200" fill="#0d0d1a"/>
  <rect x="55" y="62" width="170" height="88" rx="24" fill="none" stroke="${c}" stroke-width="2" opacity="0.25"/>
  <rect x="55" y="62" width="170" height="88" rx="24" fill="none" stroke="${c}" stroke-width="1.2"/>
  <rect x="86" y="88" width="7" height="26" rx="3" fill="${c}" opacity="0.9"/>
  <rect x="79" y="95" width="21" height="7" rx="3" fill="${c}" opacity="0.9"/>
  <circle cx="187" cy="92" r="6.5" fill="${c}" opacity="0.85"/>
  <circle cx="200" cy="104" r="6.5" fill="${c}" opacity="0.85"/>
  <circle cx="174" cy="104" r="6.5" fill="${c}" opacity="0.85"/>
  <circle cx="187" cy="116" r="6.5" fill="${c}" opacity="0.85"/>
  <rect x="126" y="99" width="11" height="5" rx="2.5" fill="${c}" opacity="0.5"/>
  <rect x="143" y="99" width="11" height="5" rx="2.5" fill="${c}" opacity="0.5"/>
  <text x="140" y="178" font-family="monospace,Courier,sans-serif" font-size="11" font-weight="bold" fill="${c}" text-anchor="middle" letter-spacing="3" opacity="0.9">${l}</text>
</svg>`;
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

// Transforma URL do GitHub raw em URL do CDN oficial do libretro
// GitHub usa underscores no nome do repo; CDN usa espaços (codificados como %20)
function getBoxartCdnUrl(githubUrl) {
    if (!githubUrl) return null;
    const cdn = githubUrl
        .replace('https://raw.githubusercontent.com/libretro-thumbnails/', 'https://thumbnails.libretro.com/')
        .replace('/master/Named_Boxarts/', '/Named_Boxarts/');
    return cdn.replace(
        /(https:\/\/thumbnails\.libretro\.com\/)([^/]+)(\/)/,
        (_, pre, playlist, sep) => pre + playlist.replace(/_/g, '%20') + sep
    );
}


// Expose para que os cards da home possam acionar a busca do Explorar
window._retroSearch = null;
window._retroSetConsole = null;
window._retroSelectConsoleAndLoad = null;

// --- 3. INICIALIZAÇÃO DA APLICAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initParticles();
    renderCuratedGames();
    initConsolesFilter();
    initLoaders();
    initArchiveSearch();
    renderFavorites();
    initControlsSettings();
    initLibraryFilter();
    initPrivacyBanner();

    document.getElementById('btn-goto-home')?.addEventListener('click', () => document.getElementById('nav-home').click());
    document.getElementById('btn-error-close')?.addEventListener('click', () => document.getElementById('error-modal').classList.add('hidden'));

    // Eventos do Overlay do Player
    document.getElementById('btn-player-back').addEventListener('click', closeGame);
    document.getElementById('btn-player-fav').addEventListener('click', toggleFavoriteActiveGame);
    document.getElementById('btn-player-fullscreen').addEventListener('click', toggleFullscreen);

    // Ajustar overlay se pressionar ESC
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('player-overlay').classList.contains('active')) {
            // Apenas se o usuário não estiver em tela cheia no iframe
            if (!document.fullscreenElement) {
                // closeGame(); // Deixamos o usuário sair clicando explicitamente no Sair para não fechar acidentalmente ao usar o menu interno do emulador
            }
        }
    });
});

// --- 4. SISTEMA DE NAVEGAÇÃO POR ABAS ---
function initTabs() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            // Alterar botão ativo
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Alterar conteúdo ativo
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-${tabName}`) {
                    content.classList.add('active');
                }
            });

            currentTab = tabName;
            
            // Ações específicas ao abrir abas
            if (tabName === 'library') {
                renderFavorites();
            }
        });
    });
}

// --- 5. EFEITOS DE PARTÍCULAS NO FUNDO ---
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        
        // Cores neon aleatórias
        const colors = ['#8a2be2', '#ff007f', '#00f0ff'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.backgroundColor}`;
        
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        
        // Animação de flutuação lenta
        particle.style.transition = 'transform 10s linear, opacity 5s ease';
        
        container.appendChild(particle);

        // Mover continuamente
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    setInterval(() => {
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = Math.random() * 0.4 + 0.1;
    }, 10000);
}

// --- 6. FILTRAGEM DE CONSOLES & RENDERIZAÇÃO DE JOGOS ---
function initConsolesFilter() {
    const consoleCards = document.querySelectorAll('.console-card');
    
    consoleCards.forEach(card => {
        card.addEventListener('click', () => {
            const consoleType = card.getAttribute('data-console');
            const mapping = {
                'nes': 'nes',
                'snes': 'snes',
                'gba': 'gba',
                'segaMD': 'sega',
                'gbc': 'gb-gbc',
                'gb': 'gb-gbc',
                'psx': 'psx'
            };
            const exploreVal = mapping[consoleType] || consoleType;

            // 1. Mudar o dropdown na aba Explorar e carregar o catálogo
            if (typeof window._retroSelectConsoleAndLoad === 'function') {
                window._retroSelectConsoleAndLoad(exploreVal);
            }

            // 2. Mudar para a aba de Explorar
            const navBtn = document.querySelector(`.nav-btn[data-tab="explore"]`);
            if (navBtn) navBtn.click();
        });
    });
}

function renderCuratedGames() {
    const grid = document.getElementById('curated-games-grid');
    grid.innerHTML = '';

    // Filtrar jogos
    const filteredGames = CURATED_GAMES.filter(game => {
        return currentConsoleFilter === 'all' || game.console === currentConsoleFilter;
    });

    if (filteredGames.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-muted); grid-column: span 4; text-align: center; padding: 20px;">Nenhum jogo recomendado disponível para este console.</p>';
        return;
    }

    filteredGames.forEach(game => {
        const card = createGameCard(game);
        grid.appendChild(card);
    });
}

function createGameCard(game, { playDirect = false } = {}) {
    const card = document.createElement('div');
    card.className = 'game-card';
    
    // Cores específicas de badge por console
    const consoleColors = {
        'nes': '#ff3366',
        'snes': '#8a2be2',
        'gba': '#00dfd8',
        'segaMD': '#ff9f00',
        'gbc': '#00ff66',
        'gb': '#ffd700',
        'psx': '#0070d2'
    };
    const badgeColor = consoleColors[game.console] || 'var(--accent-purple)';

    // Buscar capa oficial: usa boxartName (com região) se disponível, senão deriva do título
    const boxartUrl = game.thumbUrl || getGameBoxartUrl(game.boxartName || game.title, game.console);

    const isFav = favorites.some(f => f.romUrl === game.romUrl);

    const eTitle = escapeHtml(game.title);
    const eConsole = escapeHtml(game.console.toUpperCase());
    const eLabel = escapeHtml(game.consoleLabel);

    const playBtnHtml = playDirect
        ? `<button class="btn-play-game" title="Jogar Agora"><i class="fa-solid fa-play"></i></button>`
        : `<button class="btn-play-game" title="Buscar ROMs"><i class="fa-solid fa-magnifying-glass"></i></button>`;

    card.innerHTML = `
        <div class="game-thumbnail-wrapper">
            <span class="game-card-badge" style="background-color: ${badgeColor}">${eConsole}</span>
            <button class="btn-card-fav ${isFav ? 'active' : ''}" title="${isFav ? 'Remover dos favoritos' : 'Favoritar'}">
                <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
            </button>
            <img alt="${eTitle}" class="game-thumbnail">
            <div class="game-fallback-thumb" style="display: none;">
                <i class="fa-solid fa-gamepad"></i>
                <span>${eConsole} ROM</span>
            </div>
        </div>
        <div class="game-info">
            <h4 class="game-title" title="${eTitle}">${eTitle}</h4>
            <div class="game-footer">
                <span class="game-console-name">${eLabel}</span>
                ${playBtnHtml}
            </div>
        </div>
    `;

    // Fallback em cascata: exato → CDN → variantes fuzzy → tela título → DDG → console
    const thumbImg = card.querySelector('.game-thumbnail');
    const thumbFallback = card.querySelector('.game-fallback-thumb');
    if (thumbImg && thumbFallback) {
        const bName = game.boxartName || game.title;
        const variants = getBoxartVariantUrls(bName, game.console);
        loadImageWithFallbacks(
            thumbImg, thumbFallback,
            boxartUrl,
            getBoxartCdnUrl(boxartUrl),
            ...variants,
            ...variants.map(getBoxartCdnUrl).filter(Boolean),
            getGameTitleScreenUrl(bName, game.console),
            getBoxartDDGUrl(game.title, game.console),
            getConsoleFallbackUrl(game.console)
        );
    }

    // Botão de favorito no card
    const favBtn = card.querySelector('.btn-card-fav');
    favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = favorites.findIndex(f => f.romUrl === game.romUrl);
        if (idx === -1) {
            favorites.push({ title: game.title, consoleName: game.consoleLabel, core: game.core, romUrl: game.romUrl, boxartName: game.boxartName || game.title });
        } else {
            favorites.splice(idx, 1);
        }
        localStorage.setItem('retroplay_favorites', JSON.stringify(favorites));
        const nowFav = idx === -1;
        favBtn.classList.toggle('active', nowFav);
        favBtn.innerHTML = `<i class="fa-${nowFav ? 'solid' : 'regular'} fa-heart"></i>`;
        favBtn.title = nowFav ? 'Remover dos favoritos' : 'Favoritar';
        if (activeGame && activeGame.romUrl === game.romUrl) updateFavoriteBtnStatus();
        if (currentTab === 'library') renderFavorites();
    });

    if (playDirect) {
        // Favoritos: tenta jogar direto (o usuário já conhece a fonte)
        card.addEventListener('click', () => {
            playGame(game.title, game.consoleLabel, game.core, game.romUrl, game.boxartName);
        });
    } else {
        // Jogos curados (home): busca ROMs no Archive.org via modal do Explorar
        card.addEventListener('click', () => {
            const consoleGroupMap = {
                nes: 'nes', snes: 'snes', gba: 'gba',
                segaMD: 'sega', segaMS: 'sega', gamegear: 'sega',
                gbc: 'gb-gbc', gb: 'gb-gbc'
            };
            const explorerConsole = consoleGroupMap[game.core] || game.core;
            const thumbImg = card.querySelector('.game-thumbnail');
            document.getElementById('nav-explore').click();
            setTimeout(() => {
                if (window._retroSetConsole) window._retroSetConsole(explorerConsole);
                if (window._retroSearch) {
                    window._retroSearch({
                        title: game.title,
                        console: explorerConsole,
                        originalNames: [game.boxartName || game.title],
                        imageUrl: thumbImg ? thumbImg.src : null
                    });
                }
            }, 80);
        });
    }

    return card;
}

// --- 7. EXECUTOR DO EMULADOR (PLAY/CLOSE/FULLSCREEN) ---

async function downloadRomInHub(url, title) {
    // Cancela qualquer download anterior ainda em andamento
    if (downloadAbortController) downloadAbortController.abort();

    const overlay = document.getElementById('download-overlay');
    const nameEl = document.getElementById('download-game-name');
    const barFill = document.getElementById('download-bar-fill');
    const statusEl = document.getElementById('download-status-text');
    const cancelBtn = document.getElementById('btn-cancel-download');

    overlay.classList.remove('hidden');
    nameEl.textContent = title || 'Aguarde...';
    barFill.style.width = '0%';
    barFill.classList.remove('indeterminate');
    statusEl.textContent = 'Preparando download...';

    downloadAbortController = new AbortController();
    const { signal } = downloadAbortController;

    const onCancel = () => downloadAbortController.abort();
    cancelBtn.addEventListener('click', onCancel, { once: true });

    // Normaliza URL para evitar double-encoding: decodifica %20 etc. e re-codifica limpo
    const encodeForProxy = (u) => {
        try { return encodeURIComponent(decodeURIComponent(u)); } catch { return encodeURIComponent(u); }
    };

    const proxies = [
        // Nosso proxy local (100% confiável, sem limites e resolve CORS)
        { build: (u) => `/api/proxy-rom?url=${encodeForProxy(u)}`, label: 'proxy local' },
        // Tentativa direta (funciona se o servidor tiver CORS ou for same-origin)
        { build: (u) => u, label: 'conexão direta' },
        // Archive.org S3 API — endpoint diferente do /download/ e costuma ter CORS liberado
        {
            build: (u) => u.replace('https://archive.org/download/', 'https://s3.us.archive.org/'),
            label: 'archive s3',
            skip: (u) => !u.includes('archive.org/download/')
        },
        { build: (u) => `https://corsproxy.io/?${encodeForProxy(u)}`, label: 'corsproxy' },
        { build: (u) => `https://api.allorigins.win/raw?url=${encodeForProxy(u)}`, label: 'allorigins' },
    ];

    let lastError;
    for (const proxy of proxies) {
        if (signal.aborted) break;
        if (proxy.skip && proxy.skip(url)) continue;

        const proxiedUrl = proxy.build(url);
        statusEl.textContent = `Conectando via ${proxy.label}...`;
        barFill.style.width = '0%';
        barFill.classList.remove('indeterminate');

        try {
            const response = await fetch(proxiedUrl, { signal });
            if (!response.ok) {
                lastError = new Error(`HTTP ${response.status}`);
                statusEl.textContent = `${proxy.label} falhou (${response.status}), tentando alternativa...`;
                await new Promise(r => setTimeout(r, 600));
                continue;
            }

            const contentLength = response.headers.get('content-length');
            const total = contentLength ? parseInt(contentLength, 10) : 0;
            let loaded = 0;

            if (!total) barFill.classList.add('indeterminate');

            const reader = response.body.getReader();
            const chunks = [];

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
                loaded += value.length;

                if (total > 0) {
                    const pct = Math.round((loaded / total) * 100);
                    barFill.style.width = pct + '%';
                    statusEl.textContent = `${pct}% — ${(loaded / 1048576).toFixed(1)} / ${(total / 1048576).toFixed(1)} MB`;
                } else {
                    statusEl.textContent = `${(loaded / 1048576).toFixed(1)} MB baixados...`;
                }
            }

            barFill.classList.remove('indeterminate');
            barFill.style.width = '100%';
            statusEl.textContent = 'Concluído! Iniciando emulador...';
            await new Promise(r => setTimeout(r, 350));

            overlay.classList.add('hidden');
            const blob = new Blob(chunks);
            return { blob, blobUrl: URL.createObjectURL(blob) };

        } catch (e) {
            if (e.name === 'AbortError') {
                overlay.classList.add('hidden');
                throw new Error('cancelado');
            }
            lastError = e;
            statusEl.textContent = `${proxy.label} falhou, tentando alternativa...`;
            await new Promise(r => setTimeout(r, 600));
        }
    }

    overlay.classList.add('hidden');
    throw lastError || new Error('Nenhuma fonte disponível');
}

async function playGame(title, consoleName, core, romUrl, boxartName) {
    // Guarda URL original para favoritos (não a blob); boxartName para lookup de capas
    activeGame = { title, consoleName, core, romUrl, boxartName: boxartName || title };

    // Registrar no histórico de jogos jogados recentemente
    addToRecentGames(activeGame);

    let finalUrl = romUrl;

    if (romUrl.startsWith('http')) {
        try {
            // Tentar buscar no cache do IndexedDB
            const cached = await RomCacheDB.get(romUrl);
            if (cached) {
                console.log(`[Cache] ROM de "${title}" carregada do IndexedDB.`);
                finalUrl = URL.createObjectURL(cached.blob);
                // Atualizar o tempo de acesso em background
                RomCacheDB.updateAccessTime(romUrl);
            } else {
                // Baixar normalmente
                const result = await downloadRomInHub(romUrl, title);
                finalUrl = result.blobUrl;
                
                // Salvar no IndexedDB em background
                RomCacheDB.save(romUrl, title, result.blob, core, consoleName, boxartName)
                    .then(() => updateCacheUIStats());
            }
        } catch (e) {
            if (e.message !== 'cancelado') {
                showError('Erro ao Carregar ROM', `Não foi possível baixar o jogo do repositório.<br><br><b>Causa:</b> ${escapeHtml(e.message)}<br><br><i>Dica: Baixe o arquivo manualmente e use a opção "Upload de ROM".</i>`);
            }
            activeGame = null;
            return;
        }
    }

    // Fechar modal de arquivos (se estiver aberto) para que o emulador (z-index: 10000) não fique atrás dele
    const fileContainer = document.getElementById('collection-files-container');
    if (fileContainer) fileContainer.classList.add('hidden');

    // Rastrear blob URL para revogar ao fechar e liberar RAM
    activeBlobUrl = finalUrl.startsWith('blob:') ? finalUrl : null;

    // Configurar a barra de topo do player
    document.getElementById('player-game-title').innerText = title;
    document.getElementById('player-game-console').innerText = consoleName;

    // Verificar se é favorito
    updateFavoriteBtnStatus();

    // Ativar o Overlay com efeito visual
    const overlay = document.getElementById('player-overlay');
    overlay.classList.add('active');

    // Mudar o src do Iframe passando as variáveis por query string
    const iframe = document.getElementById('emulator-iframe');
    const playerUrl = `player.html?core=${core}&rom=${encodeURIComponent(finalUrl)}&title=${encodeURIComponent(title)}&t=${Date.now()}`;

    setTimeout(() => {
        iframe.src = playerUrl;
    }, 150);
}

function closeGame() {
    const overlay = document.getElementById('player-overlay');
    const iframe = document.getElementById('emulator-iframe');

    overlay.classList.remove('active');
    iframe.src = 'about:blank';

    // Liberar memória da ROM carregada como blob
    if (activeBlobUrl) {
        URL.revokeObjectURL(activeBlobUrl);
        activeBlobUrl = null;
    }

    activeGame = null;
    renderFavorites();
}

function toggleFullscreen() {
    const iframe = document.getElementById('emulator-iframe');
    if (!document.fullscreenElement) {
        iframe.requestFullscreen().catch(err => {
            alert(`Erro ao tentar ativar Tela Cheia: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// --- 8. GERENCIADOR DA BIBLIOTECA (LOCALSTORAGE) ---
let activeLibraryTab = 'all'; // 'all', 'favorites', 'recent'
let librarySortMode = 'default'; // 'default', 'alphabetical', 'console'

async function updateCacheUIStats() {
    const statusEl = document.getElementById('library-cache-status');
    if (!statusEl) return;
    
    const stats = await RomCacheDB.getStats();
    const sizeInMb = (stats.totalSize / 1048576).toFixed(1);
    statusEl.textContent = `${stats.count} jogo${stats.count !== 1 ? 's' : ''} salvo${stats.count !== 1 ? 's' : ''} (${sizeInMb} MB)`;
}

function renderLibrary() {
    const favoritesGrid = document.getElementById('favorite-games-grid');
    const recentGrid = document.getElementById('recent-games-grid');
    
    const favEmpty = document.getElementById('favorites-section-empty');
    const recentEmpty = document.getElementById('recent-section-empty');
    
    const generalEmpty = document.getElementById('library-empty-state');
    
    const favSection = document.getElementById('section-favorites');
    const recentSection = document.getElementById('section-recent');
    
    const clearHistoryBtn = document.getElementById('btn-clear-history');
    
    if (!favoritesGrid || !recentGrid) return;
    
    // Atualizar estatísticas do cache offline em background
    updateCacheUIStats();
    
    // Limpar os grids
    favoritesGrid.innerHTML = '';
    recentGrid.innerHTML = '';
    
    // Verificar se toda a biblioteca está vazia
    if (favorites.length === 0 && recentGames.length === 0) {
        favSection.classList.add('hidden');
        recentSection.classList.add('hidden');
        generalEmpty.classList.remove('hidden');
        if (clearHistoryBtn) clearHistoryBtn.classList.add('hidden');
        return;
    }
    generalEmpty.classList.add('hidden');
    
    // 1. Filtrar Favoritos
    let filteredFavs = libraryConsoleFilter === 'all'
        ? [...favorites]
        : favorites.filter(f => f.core === libraryConsoleFilter);
        
    // 2. Filtrar Recentes
    let filteredRecents = libraryConsoleFilter === 'all'
        ? [...recentGames]
        : recentGames.filter(g => g.core === libraryConsoleFilter);
        
    // Aplicar Ordenação
    if (librarySortMode === 'alphabetical') {
        const compareFn = (a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
        filteredFavs.sort(compareFn);
        filteredRecents.sort(compareFn);
    } else if (librarySortMode === 'console') {
        const compareFn = (a, b) => {
            const labelA = a.consoleName || a.core || '';
            const labelB = b.consoleName || b.core || '';
            return labelA.localeCompare(labelB, undefined, { sensitivity: 'base' });
        };
        filteredFavs.sort(compareFn);
        filteredRecents.sort(compareFn);
    }
    
    // Determinar visibilidade das seções baseado na aba selecionada
    const showFavs = activeLibraryTab === 'all' || activeLibraryTab === 'favorites';
    const showRecent = activeLibraryTab === 'all' || activeLibraryTab === 'recent';
    
    if (showFavs) {
        favSection.classList.remove('hidden');
        if (filteredFavs.length === 0) {
            favoritesGrid.classList.add('hidden');
            favEmpty.classList.remove('hidden');
            
            if (libraryConsoleFilter !== 'all') {
                const consoleLabels = { nes:'NES', snes:'SNES', gba:'GBA', segaMD:'Mega Drive', gbc:'GBC', gb:'Game Boy', psx:'PlayStation 1' };
                favEmpty.querySelector('h3').textContent = `Nenhum favorito de ${consoleLabels[libraryConsoleFilter] || libraryConsoleFilter.toUpperCase()}`;
                favEmpty.querySelector('p').textContent = 'Você ainda não favoritou jogos para este console.';
            } else {
                favEmpty.querySelector('h3').textContent = 'Nenhum jogo favoritado';
                favEmpty.querySelector('p').textContent = 'Clique no ícone de coração nos jogos para salvá-los aqui.';
            }
        } else {
            favoritesGrid.classList.remove('hidden');
            favEmpty.classList.add('hidden');
            
            filteredFavs.forEach(game => {
                const gameData = {
                    id: game.id || Math.random().toString(36),
                    title: game.title,
                    boxartName: game.boxartName || game.title,
                    console: game.core,
                    consoleLabel: game.consoleName,
                    core: game.core,
                    romUrl: game.romUrl,
                    thumbUrl: ''
                };
                const card = createGameCard(gameData, { playDirect: true });
                favoritesGrid.appendChild(card);
            });
        }
    } else {
        favSection.classList.add('hidden');
    }
    
    if (showRecent) {
        recentSection.classList.remove('hidden');
        if (filteredRecents.length === 0) {
            recentGrid.classList.add('hidden');
            recentEmpty.classList.remove('hidden');
            
            if (libraryConsoleFilter !== 'all') {
                const consoleLabels = { nes:'NES', snes:'SNES', gba:'GBA', segaMD:'Mega Drive', gbc:'GBC', gb:'Game Boy', psx:'PlayStation 1' };
                recentEmpty.querySelector('h3').textContent = `Nenhum jogo recente de ${consoleLabels[libraryConsoleFilter] || libraryConsoleFilter.toUpperCase()}`;
                recentEmpty.querySelector('p').textContent = 'Você ainda não jogou nenhum jogo deste console.';
            } else {
                recentEmpty.querySelector('h3').textContent = 'Nenhum jogo jogado recentemente';
                recentEmpty.querySelector('p').textContent = 'Os jogos que você abrir aparecerão aqui para você continuar de onde parou.';
            }
        } else {
            recentGrid.classList.remove('hidden');
            recentEmpty.classList.add('hidden');
            
            filteredRecents.forEach(game => {
                const gameData = {
                    id: game.id || Math.random().toString(36),
                    title: game.title,
                    boxartName: game.boxartName || game.title,
                    console: game.core,
                    consoleLabel: game.consoleName,
                    core: game.core,
                    romUrl: game.romUrl,
                    thumbUrl: ''
                };
                const card = createGameCard(gameData, { playDirect: true });
                recentGrid.appendChild(card);
            });
        }
    } else {
        recentSection.classList.add('hidden');
    }
    
    // Visibilidade do botão de limpar histórico
    if (recentGames.length > 0 && showRecent) {
        if (clearHistoryBtn) clearHistoryBtn.classList.remove('hidden');
    } else {
        if (clearHistoryBtn) clearHistoryBtn.classList.add('hidden');
    }
}

function renderFavorites() {
    renderLibrary();
}

function initPrivacyBanner() {
    if (localStorage.getItem('retroplay_privacy_ok')) return;
    const banner = document.getElementById('privacy-banner');
    if (!banner) return;
    banner.classList.remove('hidden');

    const dismiss = () => {
        banner.classList.add('hidden');
        localStorage.setItem('retroplay_privacy_ok', '1');
    };
    document.getElementById('btn-privacy-ok')?.addEventListener('click', dismiss);
    document.getElementById('btn-privacy-learn-more')?.addEventListener('click', () => {
        document.getElementById('nav-help').click();
        dismiss();
    });
}

function initLibraryFilter() {
    // 1. Filtros por Console
    const filterBtns = document.querySelectorAll('#tab-library .library-filters .lib-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            libraryConsoleFilter = btn.getAttribute('data-console');
            renderLibrary();
        });
    });
    
    // 2. Sub-abas (Visão Geral, Favoritos, Recentes)
    const tabBtns = document.querySelectorAll('#tab-library .library-tabs .lib-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeLibraryTab = btn.getAttribute('data-lib-tab');
            renderLibrary();
        });
    });
    
    // 3. Dropdown de Ordenação
    const sortSelect = document.getElementById('library-sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            librarySortMode = e.target.value;
            renderLibrary();
        });
    }
    
    // 4. Botão de Limpar Histórico
    const clearBtn = document.getElementById('btn-clear-history');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Tem certeza de que deseja limpar o seu histórico de jogos recentes?')) {
                recentGames = [];
                localStorage.setItem('retroplay_recent', JSON.stringify([]));
                renderLibrary();
            }
        });
    }
    
    // 5. Botão "Ver Jogos Recomendados" no empty state geral
    const emptyHomeBtn = document.getElementById('btn-goto-home-empty');
    if (emptyHomeBtn) {
        emptyHomeBtn.addEventListener('click', () => {
            document.getElementById('nav-home')?.click();
        });
    }

    // 6. Botão de Limpar Cache de ROMs (IndexedDB)
    const clearRomCacheBtn = document.getElementById('btn-clear-rom-cache');
    if (clearRomCacheBtn) {
        clearRomCacheBtn.addEventListener('click', async () => {
            if (confirm('Tem certeza de que deseja limpar todo o cache de ROMs offline para liberar espaço no disco?')) {
                await RomCacheDB.clearAll();
                await updateCacheUIStats();
                alert('Cache de ROMs offline limpo com sucesso!');
            }
        });
    }
}

function toggleFavoriteActiveGame() {
    if (!activeGame) return;

    const index = favorites.findIndex(f => f.romUrl === activeGame.romUrl);
    
    if (index === -1) {
        // Adicionar aos favoritos (salva boxartName se disponível para exibir capa)
        favorites.push({
            title: activeGame.title,
            consoleName: activeGame.consoleName,
            core: activeGame.core,
            romUrl: activeGame.romUrl,
            boxartName: activeGame.boxartName || activeGame.title
        });
    } else {
        // Remover dos favoritos
        favorites.splice(index, 1);
    }

    // Salvar
    localStorage.setItem('retroplay_favorites', JSON.stringify(favorites));
    
    // Atualizar visual do botão
    updateFavoriteBtnStatus();
}

function updateFavoriteBtnStatus() {
    const favBtn = document.getElementById('btn-player-fav');
    if (!activeGame) return;

    const isFav = favorites.some(f => f.romUrl === activeGame.romUrl);
    
    if (isFav) {
        favBtn.classList.add('active');
        favBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    } else {
        favBtn.classList.remove('active');
        favBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    }
}

// --- 9. CONFIGURAR UPLOAD LOCAL E URL LOADER ---
function initLoaders() {
    // Abrir seletor de arquivo no click
    const btnUpload = document.getElementById('btn-quick-upload');
    const fileUploader = document.getElementById('file-uploader');

    // Elementos do Modal de ZIP
    const zipModal = document.getElementById('zip-modal');
    const zipButtons = document.querySelectorAll('.btn-zip-option');
    const zipCloseBtn = document.getElementById('btn-close-zip-modal');

    btnUpload.addEventListener('click', () => {
        fileUploader.click();
    });

    // Detectar upload do arquivo
    fileUploader.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Detectar o core pela extensão
        const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        const core = getCoreFromExtension(ext);

        if (!core) {
            alert(`Extensão de arquivo ${ext} não suportada. Tente arquivos de NES, SNES, GBA, Megadrive, Gameboy ou .ZIP.`);
            return;
        }

        // Criar Object URL local
        const blobUrl = URL.createObjectURL(file);
        
        // Obter nome legível sem a extensão para o título
        const cleanName = file.name.substring(0, file.name.lastIndexOf('.')).replace(/_/g, ' ');

        // Se for um arquivo ZIP, abre o seletor de console
        if (core === 'zip') {
            openZipConsoleSelector(cleanName, blobUrl);
            fileUploader.value = '';
            return;
        }

        // Rodar jogo diretamente se for extensão reconhecida
        playGame(cleanName, `Local (${ext.toUpperCase()})`, core, blobUrl);
        
        // Resetar uploader
        fileUploader.value = '';
    });

    // Configurações do Modal do ZIP
    zipCloseBtn.addEventListener('click', closeZipModal);
    zipModal.addEventListener('click', (e) => {
        if (e.target === zipModal) closeZipModal();
    });

    zipButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const core = btn.getAttribute('data-core');
            if (tempZipData && core) {
                const consoleLabels = {
                    'nes': 'NES', 'snes': 'SNES', 'gba': 'GBA',
                    'segaMD': 'Mega Drive', 'gbc': 'Game Boy Color', 'gb': 'Game Boy',
                    'psx': 'PlayStation 1'
                };
                const label = consoleLabels[core] || core.toUpperCase();
                const isLocal = tempZipData.blobUrl.startsWith('blob:');
                const savedZip = { ...tempZipData };
                // Null tempZipData antes de fechar o modal para que closeZipModal()
                // não revogue o blob — o emulador ainda precisa dele.
                tempZipData = null;
                closeZipModal();
                await playGame(savedZip.title, `${isLocal ? 'Local' : 'Online'} ZIP (${label})`, core, savedZip.blobUrl, savedZip.boxartName);
            }
        });
    });

    // Alternar painel de URL
    const btnUrl = document.getElementById('btn-quick-url');
    const urlContainer = document.getElementById('url-loader-container');

    btnUrl.addEventListener('click', () => {
        urlContainer.classList.toggle('hidden');
        if (!urlContainer.classList.contains('hidden')) {
            urlContainer.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Carregar ROM da URL digitada
    const btnLoadUrl = document.getElementById('btn-load-url-rom');
    btnLoadUrl.addEventListener('click', () => {
        const url = document.getElementById('rom-url-input').value.trim();
        let core = document.getElementById('rom-url-core').value;

        if (!url) {
            showError('URL inválida', 'Por favor, cole a URL de um arquivo de ROM.');
            return;
        }

        if (!isSafeUrl(url)) {
            showError('URL não permitida', 'Apenas URLs <b>http://</b> e <b>https://</b> são aceitas.');
            return;
        }

        if (core === 'auto') {
            const ext = url.substring(url.lastIndexOf('.')).toLowerCase();
            core = getCoreFromExtension(ext);
            
            if (!core) {
                alert('Não conseguimos auto-detectar o console pela extensão da URL. Selecione o console manualmente na lista.');
                return;
            }
        }

        // Extrair nome do arquivo da URL
        let title = url.substring(url.lastIndexOf('/') + 1);
        if (title.includes('?')) title = title.split('?')[0];
        title = decodeURIComponent(title).substring(0, title.lastIndexOf('.')) || 'Jogo via URL';

        playGame(title, `Link Externo (${core.toUpperCase()})`, core, url);
    });
}

// Mapeamento auxiliar de extensões para cores do EmulatorJS
function getCoreFromExtension(ext) {
    const mapping = {
        '.zip': 'zip',
        '.nes': 'nes',
        '.smc': 'snes',
        '.sfc': 'snes',
        '.fig': 'snes',
        '.gba': 'gba',
        '.gb': 'gb',
        '.gbc': 'gbc',
        '.gen': 'segaMD',
        '.smd': 'segaMD',
        '.md': 'segaMD',
        '.bin': 'segaMD',
        '.sms': 'segaMS',
        '.gg': 'gamegear',
        '.ggc': 'gamegear',
        '.z64': 'n64',
        '.n64': 'n64',
        '.v64': 'n64',
        '.nds': 'nds'
    };
    return mapping[ext];
}

// --- 10. BUSCADOR ONLINE ARCHIVE.ORG ---

const TOP_GAMES = {
    snes: [
        { title: "Super Mario World", boxart: "Super Mario World (USA)" },
        { title: "Super Mario Kart", boxart: "Super Mario Kart (USA)" },
        { title: "Donkey Kong Country", boxart: "Donkey Kong Country (USA) (Rev 1)" },
        { title: "Donkey Kong Country 2", boxart: "Donkey Kong Country 2 - Diddy's Kong Quest (USA) (Rev 1)" },
        { title: "Donkey Kong Country 3", boxart: "Donkey Kong Country 3 - Dixie Kong's Double Trouble! (USA)" },
        { title: "The Legend of Zelda: A Link to the Past", boxart: "Legend of Zelda, The - A Link to the Past (USA)" },
        { title: "Super Metroid", boxart: "Super Metroid (USA)" },
        { title: "Chrono Trigger", boxart: "Chrono Trigger (USA)" },
        { title: "Mega Man X", boxart: "Mega Man X (USA)" },
        { title: "Street Fighter II Turbo", boxart: "Street Fighter II Turbo - Hyper Fighting (USA)" },
        { title: "Ultimate Mortal Kombat 3", boxart: "Ultimate Mortal Kombat 3 (USA)" },
        { title: "Yoshi's Island", boxart: "Super Mario World 2 - Yoshi's Island (USA)" },
        { title: "Super Mario RPG", boxart: "Super Mario RPG - Legend of the Seven Stars (USA)" },
        { title: "Disney's Aladdin", boxart: "Disney's Aladdin (USA)" },
        { title: "The Lion King", boxart: "Disney's The Lion King (USA)" },
        { title: "Top Gear", boxart: "Top Gear (USA)" },
        { title: "Rock N' Roll Racing", boxart: "Rock N' Roll Racing (USA)" },
        { title: "Sunset Riders", boxart: "Sunset Riders (USA)" },
        { title: "Contra III: The Alien Wars", boxart: "Contra III - The Alien Wars (USA)" },
        { title: "Kirby Super Star", boxart: "Kirby Super Star (USA)" }
    ],
    nes: [
        { title: "Super Mario Bros.", boxart: "Super Mario Bros. (World)" },
        { title: "Super Mario Bros. 2", boxart: "Super Mario Bros. 2 (USA)" },
        { title: "Super Mario Bros. 3", boxart: "Super Mario Bros. 3 (USA) (Rev 1)" },
        { title: "The Legend of Zelda", boxart: "Legend of Zelda, The (USA)" },
        { title: "Metroid", boxart: "Metroid (USA)" },
        { title: "Contra", boxart: "Contra (USA)" },
        { title: "Mega Man 2", boxart: "Mega Man 2 (USA)" },
        { title: "Castlevania", boxart: "Castlevania (USA)" },
        { title: "Punch-Out!!", boxart: "Mike Tyson's Punch-Out!! (USA)" },
        { title: "Kirby's Adventure", boxart: "Kirby's Adventure (USA)" },
        { title: "Ninja Gaiden", boxart: "Ninja Gaiden (USA)" },
        { title: "Double Dragon II", boxart: "Double Dragon II - The Revenge (USA)" },
        { title: "DuckTales", boxart: "DuckTales (USA)" },
        { title: "Excitebike", boxart: "Excitebike (Japan, USA)" },
        { title: "Pac-Man", boxart: "Pac-Man (USA)" },
        { title: "Tetris", boxart: "Tetris (USA)" }
    ],
    gba: [
        { title: "Pokemon Emerald Version", boxart: "Pokemon - Emerald Version (USA, Europe)" },
        { title: "Pokemon FireRed Version", boxart: "Pokemon - FireRed Version (USA, Europe)" },
        { title: "Pokemon LeafGreen Version", boxart: "Pokemon - LeafGreen Version (USA, Europe)" },
        { title: "Pokemon Ruby Version", boxart: "Pokemon - Ruby Version (USA, Europe)" },
        { title: "Pokemon Sapphire Version", boxart: "Pokemon - Sapphire Version (USA, Europe)" },
        { title: "The Legend of Zelda: The Minish Cap", boxart: "Legend of Zelda, The - The Minish Cap (USA)" },
        { title: "Metroid Fusion", boxart: "Metroid Fusion (USA)" },
        { title: "Metroid: Zero Mission", boxart: "Metroid - Zero Mission (USA)" },
        { title: "Castlevania: Aria of Sorrow", boxart: "Castlevania - Aria of Sorrow (USA)" },
        { title: "Mario Kart: Super Circuit", boxart: "Mario Kart - Super Circuit (USA)" },
        { title: "Mario & Luigi: Superstar Saga", boxart: "Mario & Luigi - Superstar Saga (USA)" },
        { title: "Golden Sun", boxart: "Golden Sun (USA)" },
        { title: "Kirby & The Amazing Mirror", boxart: "Kirby & The Amazing Mirror (USA)" },
        { title: "Wario Land 4", boxart: "Wario Land 4 (USA)" },
        { title: "Sonic Advance", boxart: "Sonic Advance (USA)" }
    ],
    'gb-gbc': [
        { title: "Pokemon Red Version", boxart: "Pokemon - Red Version (USA, Europe)", console: "gb" },
        { title: "Pokemon Blue Version", boxart: "Pokemon - Blue Version (USA, Europe)", console: "gb" },
        { title: "Pokemon Yellow Version", boxart: "Pokemon - Yellow Version (Special Pikachu Edition) (USA, Europe)", console: "gb" },
        { title: "Pokemon Gold Version", boxart: "Pokemon - Gold Version (USA, Europe)", console: "gbc" },
        { title: "Pokemon Silver Version", boxart: "Pokemon - Silver Version (USA, Europe)", console: "gbc" },
        { title: "Pokemon Crystal Version", boxart: "Pokemon - Crystal Version (USA, Europe)", console: "gbc" },
        { title: "The Legend of Zelda: Link's Awakening DX", boxart: "Legend of Zelda, The - Link's Awakening DX (USA, Europe) (Rev 2)", console: "gbc" },
        { title: "Super Mario Land 2: 6 Golden Coins", boxart: "Super Mario Land 2 - 6 Golden Coins (USA, Europe) (Rev 2)", console: "gb" },
        { title: "Tetris", boxart: "Tetris (World)", console: "gb" },
        { title: "Wario Land 3", boxart: "Wario Land 3 (USA, Europe)", console: "gbc" }
    ],
    sega: [
        { title: "Sonic the Hedgehog", boxart: "Sonic the Hedgehog (USA, Europe)", console: "segaMD" },
        { title: "Sonic the Hedgehog 2", boxart: "Sonic the Hedgehog 2 (World)", console: "segaMD" },
        { title: "Sonic the Hedgehog 3", boxart: "Sonic the Hedgehog 3 (Europe)", console: "segaMD" },
        { title: "Sonic & Knuckles", boxart: "Sonic & Knuckles (World)", console: "segaMD" },
        { title: "Streets of Rage 2", boxart: "Streets of Rage II (USA)", console: "segaMD" },
        { title: "Golden Axe", boxart: "Golden Axe (World)", console: "segaMD" },
        { title: "Shinobi III: Return of the Ninja Master", boxart: "Shinobi III - Return of the Ninja Master (USA)", console: "segaMD" },
        { title: "Castlevania: Bloodlines", boxart: "Castlevania - Bloodlines (USA)", console: "segaMD" },
        { title: "Contra: Hard Corps", boxart: "Contra - Hard Corps (USA, Korea)", console: "segaMD" },
        { title: "Aladdin", boxart: "Disney's Aladdin (USA)", console: "segaMD" },
        { title: "Alex Kidd in Miracle World", boxart: "Alex Kidd in Miracle World (USA, Europe)", console: "segaMS" },
        { title: "Sonic the Hedgehog Triple Trouble", boxart: "Sonic the Hedgehog Triple Trouble (USA, Europe)", console: "segaGG" }
    ]
};

function initArchiveSearch() {
    const btnSearch = document.getElementById('btn-explore-search');
    const inputSearch = document.getElementById('explore-search-input');
    const selectConsole = document.getElementById('explore-console-select');
    const loader = document.getElementById('search-loader');
    const resultsContainer = document.getElementById('search-results-container');
    const resultsGrid = document.getElementById('explore-results-grid');
    const btnExploreMore = document.getElementById('btn-explore-more');

    // Abas do Catálogo e Bar de Letras
    const tabCatalogPopular = document.getElementById('tab-catalog-popular');
    const tabCatalogAll = document.getElementById('tab-catalog-all');
    const catalogAlphabetBar = document.getElementById('catalog-alphabet-bar');
    const exploreResultsTitleText = document.getElementById('explore-results-title-text');

    // Botões e cards de arquivos
    const fileContainer = document.getElementById('collection-files-container');
    const fileCloseBtn = document.getElementById('btn-close-collection-files');
    const fileTitle = document.getElementById('selected-collection-title');
    const filesList = document.getElementById('collection-files-list');
    const fileFilterInput = document.getElementById('filter-files-input');

    let currentFilesList = []; // Guarda arquivos da coleção ativa para filtragem

    let cachedCatalogs = {}; // Cache de catálogos carregados por console: { snes: [...], nes: [...] }
    let allGames = []; // Catálogo completo do console ativo
    let filteredGames = []; // Catálogo filtrado do console ativo
    let catalogPage = 1; // Página atual da exibição local do catálogo
    
    let activeCatalogTab = 'popular'; // 'popular' ou 'all'
    let selectedLetter = 'ALL'; // Letra selecionada para filtro A-Z
    let popularGames = typeof TOP_GAMES !== 'undefined' ? { ...TOP_GAMES } : {}; // Fallback inline se houver

    // Carregar populares de popular.json de forma assíncrona
    fetch('popular.json')
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            popularGames = data;
            if (activeCatalogTab === 'popular') {
                filterAndRenderCatalog(true);
            }
        })
        .catch(err => {
            console.warn('Não foi possível carregar popular.json, usando a lista de fallback local.', err);
        });

    // Configurar Abas do Catálogo
    if (tabCatalogPopular && tabCatalogAll) {
        tabCatalogPopular.addEventListener('click', () => {
            activeCatalogTab = 'popular';
            tabCatalogPopular.classList.add('active');
            tabCatalogAll.classList.remove('active');
            catalogAlphabetBar.classList.add('hidden');
            filterAndRenderCatalog(true);
        });

        tabCatalogAll.addEventListener('click', () => {
            activeCatalogTab = 'all';
            tabCatalogAll.classList.add('active');
            tabCatalogPopular.classList.remove('active');
            catalogAlphabetBar.classList.remove('hidden');
            filterAndRenderCatalog(true);
        });
    }

    // Eventos de Busca no Catálogo
    btnSearch.addEventListener('click', () => {
        filterAndRenderCatalog(true);
    });
    inputSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            filterAndRenderCatalog(true);
        }
    });
    inputSearch.addEventListener('input', () => {
        filterAndRenderCatalog(true);
    });

    selectConsole.addEventListener('change', () => {
        loadConsoleCatalog(selectConsole.value);
    });

    if (btnExploreMore) {
        btnExploreMore.addEventListener('click', () => {
            catalogPage++;
            renderCatalogGrid();
        });
    }

    fileCloseBtn.addEventListener('click', () => {
        fileContainer.classList.add('hidden');
    });

    // Fechar modal ao clicar fora da área do card (no overlay desfocado)
    fileContainer.addEventListener('click', (e) => {
        if (e.target === fileContainer) {
            fileContainer.classList.add('hidden');
        }
    });

    fileFilterInput.addEventListener('input', () => {
        renderFilesTable(currentFilesList, fileFilterInput.value);
    });

    // Expor funções para uso pelos cards da home
    window._retroSearch = (game) => searchRomsForGame(game);
    // Muda apenas o valor do select — não recarrega o catálogo para não competir com searchRomsForGame
    window._retroSetConsole = (val) => { selectConsole.value = val; };
    window._retroSelectConsoleAndLoad = (val) => {
        selectConsole.value = val;
        loadConsoleCatalog(val);
    };

    // Inicializar o catálogo padrão do console (snes)
    loadConsoleCatalog(selectConsole.value);
    renderAlphabetBar();

    function renderAlphabetBar() {
        if (!catalogAlphabetBar) return;
        const letters = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];
        catalogAlphabetBar.innerHTML = '';

        letters.forEach(letter => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-secondary btn-sm';
            btn.textContent = letter;
            btn.style.padding = '4px 10px';
            btn.style.fontSize = '0.75rem';
            btn.style.fontWeight = '600';
            btn.style.borderRadius = '4px';
            btn.style.border = '1px solid var(--border-color)';
            
            if (selectedLetter === letter) {
                btn.classList.add('active');
                btn.style.backgroundColor = 'var(--accent-cyan)';
                btn.style.color = '#000';
            } else {
                btn.style.backgroundColor = 'rgba(255,255,255,0.05)';
            }

            btn.addEventListener('click', () => {
                selectedLetter = letter;
                // Garante que estamos na aba "Todos A-Z" ao filtrar por letra
                if (activeCatalogTab !== 'all') {
                    activeCatalogTab = 'all';
                    if (tabCatalogAll) tabCatalogAll.classList.add('active');
                    if (tabCatalogPopular) tabCatalogPopular.classList.remove('active');
                }
                renderAlphabetBar();
                filterAndRenderCatalog(true);
            });

            catalogAlphabetBar.appendChild(btn);
        });
    }

    function getCanonicalTitle(title) {
        let clean = title;
        
        // 1. Remover parênteses e colchetes e tudo dentro deles
        clean = clean.replace(/\[[^\]]*\]/g, ' ');
        clean = clean.replace(/\([^)]*\)/g, ' ');
        
        // 2. Remover palavras comuns de descarte
        const discardWords = [
            'roms', 'romset', 'romsets', 'rom', 'games', 'game', 'collection', 'pack', 'set', 'complete', 
            'emulator', 'emulators', 'retro', 'download', 'archive', 'hacks', 'hack', 'translations', 'translation'
        ];
        const suffixRegex = new RegExp('\\b(?:' + discardWords.join('|') + ')\\b', 'gi');
        clean = clean.replace(suffixRegex, ' ');
        
        // 3. Remover anos de 4 dígitos
        clean = clean.replace(/\b(?:19|20)\d{2}\b/g, ' ');
        
        // 4. Substituir underscores e pontuação por espaço
        clean = clean.replace(/_/g, ' ');
        clean = clean.replace(/[^a-zA-Z0-9\s'-]/g, ' ');
        
        // 5. Limpar múltiplos espaços
        clean = clean.replace(/\s+/g, ' ').trim();
        
        if (clean.length < 2) {
            clean = title;
        }

        // Retornar em Title Case para padronização
        return clean.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    async function loadConsoleCatalog(consoleValue) {
        resultsContainer.classList.add('hidden');
        loader.classList.remove('hidden');
        if (btnExploreMore) btnExploreMore.classList.add('hidden');
        resultsGrid.innerHTML = '';
        inputSearch.value = '';
        selectedLetter = 'ALL';
        renderAlphabetBar();

        // Volta a aba ativa para Populares por padrão
        activeCatalogTab = 'popular';
        if (tabCatalogPopular && tabCatalogAll) {
            tabCatalogPopular.classList.add('active');
            tabCatalogAll.classList.remove('active');
            catalogAlphabetBar.classList.add('hidden');
        }

        const loaderText = loader.querySelector('p');
        if (loaderText) loaderText.textContent = `Carregando catálogo de jogos...`;

        if (cachedCatalogs[consoleValue]) {
            allGames = cachedCatalogs[consoleValue];
            loader.classList.add('hidden');
            resultsContainer.classList.remove('hidden');
            filterAndRenderCatalog(true);
            return;
        }

        try {
            // Usa catálogo local em vez de repositórios externos
            const catalogData = await fetchJson('catalog.json');
            const gamesList = catalogData[consoleValue] || [];

            const parsed = gamesList.map(item => ({
                title: item.title,
                originalNames: [item.boxart || item.title],
                console: item.console || consoleValue
            })).sort((a, b) => a.title.localeCompare(b.title));

            cachedCatalogs[consoleValue] = parsed;
            allGames = parsed;

            loader.classList.add('hidden');
            resultsContainer.classList.remove('hidden');
            filterAndRenderCatalog(true);
        } catch (error) {
            loader.classList.add('hidden');
            resultsContainer.classList.remove('hidden');
            allGames = [];
            filterAndRenderCatalog(true);
            console.error('Erro ao carregar catalog.json:', error);
        }
    }

    async function fetchJson(url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    }

    function parseCatalog(data, consoleName) {
        const uniqueGames = {};
        for (const key in data) {
            const entry = data[key];
            const fullName = entry.name || key;
            
            // 1. Filtrar hashes MD5/SHA1 e ruídos óbvios
            const cleanKey = key.trim();
            if (/^[0-9a-fA-F]{32}$/.test(cleanKey) || /^[0-9a-fA-F]{40}$/.test(cleanKey)) {
                continue;
            }
            if (fullName.length < 2 || /^[0-9\s\-_.]+$/.test(fullName)) {
                continue;
            }

            const canonical = getCanonicalTitle(fullName);
            if (canonical.length < 2) continue;

            if (!uniqueGames[canonical]) {
                uniqueGames[canonical] = {
                    title: canonical,
                    originalNames: new Set(),
                    console: consoleName
                };
            }
            uniqueGames[canonical].originalNames.add(fullName);
        }
        return Object.values(uniqueGames).map(g => ({
            ...g,
            originalNames: Array.from(g.originalNames)
        }));
    }

    function getBoxartNameForGame(game) {
        // Tenta encontrar um nome que tenha USA, World ou Europe para a capa ficar em inglês preferencialmente
        const preferred = game.originalNames.find(name => 
            name.includes('(USA)') || name.includes('(World)') || name.includes('(Europe)')
        );
        return preferred || game.originalNames[0] || game.title;
    }

    function filterAndRenderCatalog(resetPage = true) {
        if (resetPage) catalogPage = 1;
        
        const query = inputSearch.value.trim().toLowerCase();

        // Se o usuário digitar algo na busca, altera para aba "Todos" e esconde aba populares temporariamente
        if (query && activeCatalogTab === 'popular') {
            activeCatalogTab = 'all';
            if (tabCatalogPopular && tabCatalogAll) {
                tabCatalogPopular.classList.remove('active');
                tabCatalogAll.classList.add('active');
                catalogAlphabetBar.classList.remove('hidden');
            }
        }

        // Se houver busca ativa, resetar filtro de letra para mostrar todos os matches correspondentes
        if (query) {
            selectedLetter = 'ALL';
            renderAlphabetBar();
        }

        if (activeCatalogTab === 'popular') {
            // Mostrar os Top Games populares
            let popularList = popularGames[selectConsole.value] || [];
            
            // Mapear no formato esperado pelo catalog render
            let mappedPopular = popularList.map(item => ({
                title: item.title,
                originalNames: [item.boxart],
                console: item.console || selectConsole.value
            }));

            if (query) {
                filteredGames = mappedPopular.filter(game => game.title.toLowerCase().includes(query));
            } else {
                filteredGames = mappedPopular;
            }
        } else {
            // Mostrar todos os jogos A-Z
            let baseList = allGames;

            // Filtrar por letra se não houver busca ativa por texto
            if (!query && selectedLetter !== 'ALL') {
                if (selectedLetter === '#') {
                    baseList = allGames.filter(game => /^[^a-zA-Z]/.test(game.title));
                } else {
                    baseList = allGames.filter(game => game.title.toUpperCase().startsWith(selectedLetter));
                }
            }

            if (query) {
                filteredGames = baseList.filter(game => game.title.toLowerCase().includes(query));
            } else {
                filteredGames = baseList;
            }
        }

        // Atualizar título conforme aba
        if (exploreResultsTitleText) {
            if (query) {
                exploreResultsTitleText.textContent = `Resultados para "${inputSearch.value}"`;
            } else if (activeCatalogTab === 'popular') {
                exploreResultsTitleText.textContent = `Recomendados / Mais Populares`;
            } else {
                exploreResultsTitleText.textContent = selectedLetter === 'ALL' ? 'Catálogo Completo A-Z' : `Jogos com a Letra "${selectedLetter}"`;
            }
        }

        renderCatalogGrid();
    }

    function renderCatalogGrid() {
        if (catalogPage === 1) {
            resultsGrid.innerHTML = '';
        }

        const start = (catalogPage - 1) * 60;
        const end = catalogPage * 60;
        const pageGames = filteredGames.slice(start, end);

        if (filteredGames.length === 0) {
            const query = inputSearch.value.trim();
            const archiveLink = query
                ? `<div style="margin-top:16px;">
                    <p style="color:var(--text-muted);margin-bottom:12px;">Não encontrado no catálogo local. Quer buscar diretamente no Archive.org?</p>
                    <button id="btn-search-archive-direct" class="btn btn-secondary" style="padding:10px 22px;">
                        <i class="fa-solid fa-box-archive"></i> Buscar "${escapeHtml(query)}" no Archive.org
                    </button>
                  </div>`
                : '';
            resultsGrid.innerHTML = `<div style="color:var(--text-muted);grid-column:span 3;text-align:center;padding:20px;">${escapeHtml(query ? `Nenhum resultado local para "${query}".` : 'Nenhum jogo encontrado no catálogo.')}${archiveLink}</div>`;
            if (query) {
                document.getElementById('btn-search-archive-direct')?.addEventListener('click', () => {
                    searchRomsForGame({ title: query, console: selectConsole.value, originalNames: [query] });
                });
            }
            if (btnExploreMore) btnExploreMore.classList.add('hidden');
            return;
        }

        pageGames.forEach(game => {
            const card = document.createElement('div');
            card.className = 'archive-item-card';
            card.style.cursor = 'pointer';

            const eTitle = escapeHtml(game.title);
            
            // Cores e labels de badge — inclui valores específicos (gb, gbc, segaMD…) além dos grupos
            const consoleColors = {
                'nes': '#ff3366',
                'snes': '#8a2be2',
                'gba': '#00dfd8',
                'gb-gbc': '#00ff66', 'gb': '#00ff66', 'gbc': '#00cc55',
                'sega': '#ff9f00', 'segaMD': '#ff9f00', 'segaMS': '#ff7700',
                'segaGG': '#ffcc00', 'gamegear': '#ffcc00',
                'psx': '#0070d2'
            };
            const consoleLabels = {
                'nes': 'NES',
                'snes': 'SNES',
                'gba': 'GBA',
                'gb-gbc': 'GB/GBC', 'gb': 'GB', 'gbc': 'GBC',
                'sega': 'SEGA', 'segaMD': 'GEN', 'segaMS': 'SMS',
                'segaGG': 'GG', 'gamegear': 'GG',
                'psx': 'PS1'
            };
            
            const badgeColor = consoleColors[game.console] || 'var(--accent-purple)';
            const platformBadge = `<span class="search-platform-badge" style="background-color: ${badgeColor};">${consoleLabels[game.console] || game.console.toUpperCase()}</span>`;

            // Obter nome preferido de boxart (com região como USA/Europe/World)
            const boxartName = getBoxartNameForGame(game);
            
            // Mapear console para tipo canonical do Libretro (aceita grupos E valores específicos)
            let playlistConsole = game.console;
            if (game.console === 'gb-gbc') {
                const isGbc = boxartName.toLowerCase().includes('color') || game.originalNames.some(n => n.toLowerCase().includes('color'));
                playlistConsole = isGbc ? 'gbc' : 'gb';
            } else if (game.console === 'sega') {
                const isMs = boxartName.toLowerCase().includes('master system') || game.originalNames.some(n => n.toLowerCase().includes('master system'));
                const isGg = boxartName.toLowerCase().includes('game gear') || game.originalNames.some(n => n.toLowerCase().includes('game gear'));
                playlistConsole = isMs ? 'segaMS' : (isGg ? 'gamegear' : 'segaMD');
            }
            // Se o console já é um valor específico (gbc, segaMD, etc.), usa direto

            const boxartUrl = getGameBoxartUrl(boxartName, playlistConsole);

            card.innerHTML = `
                <div class="archive-thumbnail-wrapper" style="aspect-ratio: 16/10; width: 100%; display: flex; justify-content: center; align-items: center; background: #0b0b14; border-radius: 8px; overflow: hidden; margin-bottom: 15px; border: 1px solid var(--border-color); position: relative;">
                    <img alt="${eTitle}" class="archive-thumb-img" style="width: 100%; height: 100%; object-fit: cover;">
                    <div class="archive-fallback-thumb" style="display: none; font-size: 2.2rem; color: var(--bg-dark-light); width: 100%; height: 100%; align-items: center; justify-content: center;">
                        <i class="fa-solid fa-gamepad" style="color: var(--accent-cyan);"></i>
                    </div>
                    ${platformBadge}
                </div>
                <h4 class="archive-title" style="margin-bottom: 8px;" title="${eTitle}">${eTitle}</h4>
                <button class="btn btn-primary btn-sm" style="margin-top: auto; width: 100%;">
                    <i class="fa-solid fa-magnifying-glass"></i> Buscar ROMs
                </button>
            `;

            const img = card.querySelector('.archive-thumb-img');
            const fallback = card.querySelector('.archive-fallback-thumb');
            if (img && fallback) {
                const variants = getBoxartVariantUrls(boxartName, playlistConsole);
                loadImageWithFallbacks(
                    img, fallback,
                    boxartUrl,
                    getBoxartCdnUrl(boxartUrl),
                    ...variants,
                    ...variants.map(getBoxartCdnUrl).filter(Boolean),
                    getGameTitleScreenUrl(boxartName, playlistConsole),
                    getBoxartDDGUrl(game.title, playlistConsole),
                    getConsoleFallbackUrl(playlistConsole)
                );
            }

            // Clique no card busca ROMs
            card.addEventListener('click', () => {
                const imgEl = card.querySelector('.archive-thumb-img');
                searchRomsForGame({
                    ...game,
                    imageUrl: imgEl ? imgEl.src : null
                });
            });

            resultsGrid.appendChild(card);
        });

        // Controlar exibição do botão "Ver Mais"
        if (btnExploreMore) {
            if (filteredGames.length > end) {
                btnExploreMore.classList.remove('hidden');
                btnExploreMore.disabled = false;
                btnExploreMore.innerHTML = '<i class="fa-solid fa-angles-down"></i> Ver Mais Resultados';
            } else {
                btnExploreMore.classList.add('hidden');
            }
        }
    }

    // Exibe o modal com estado de carregamento (o grid do catálogo permanece intacto)
    function openModalLoading(game) {
        // Configurar a imagem de fundo desfocada (efeito de brilho) no overlay do modal
        if (game.imageUrl) {
            fileContainer.style.setProperty('--modal-bg-image', `url('${game.imageUrl}')`);
        } else {
            fileContainer.style.removeProperty('--modal-bg-image');
        }

        // Configurar a imagem da capa do jogo (boxart) no painel lateral
        const modalBoxart = document.getElementById('modal-game-boxart');
        if (modalBoxart) {
            if (game.imageUrl) {
                modalBoxart.src = game.imageUrl;
                modalBoxart.style.display = 'block';
            } else {
                modalBoxart.src = '';
                modalBoxart.style.display = 'none';
            }
        }

        // Configurar o título do jogo no painel lateral
        const modalTitle = document.getElementById('modal-game-title');
        if (modalTitle) {
            modalTitle.textContent = game.title;
        }

        // Configurar a badge de plataforma/console no painel lateral
        const modalConsole = document.getElementById('modal-game-console');
        if (modalConsole) {
            const consoleNames = {
                'nes': 'NES',
                'snes': 'SNES',
                'gba': 'GBA',
                'gb-gbc': 'GB/GBC',
                'sega': 'SEGA',
                'segaMD': 'Mega Drive',
                'gbc': 'GBC',
                'gb': 'GB'
            };
            const consoleKey = game.console || selectConsole.value;
            modalConsole.textContent = consoleNames[consoleKey] || consoleKey.toUpperCase();
            
            const colors = {
                'nes': '#ff3366',
                'snes': '#8a2be2',
                'gba': '#00dfd8',
                'sega': '#ff9f00',
                'segaMD': '#ff9f00',
                'gb-gbc': '#00ff66',
                'gbc': '#00ff66',
                'gb': '#ffd700'
            };
            modalConsole.style.backgroundColor = colors[consoleKey] || 'var(--accent-purple)';
        }

        fileTitle.innerText = game.title;
        fileFilterInput.value = '';
        filesList.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;padding:40px 20px;">
                    <div style="width:38px;height:38px;border:4px solid rgba(0,240,255,0.15);border-top:4px solid var(--accent-cyan);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 16px;"></div>
                    <p style="color:var(--text-muted);font-size:0.9rem;">Consultando Archive.org…</p>
                </td>
            </tr>
        `;
        fileContainer.classList.remove('hidden');
    }

    // Exibe mensagem de "não encontrado" dentro do modal (sem tocar no grid do catálogo)
    function showModalNoResults(game) {
        const consoleKey = game.console || selectConsole.value;
        filesList.innerHTML = `
            <tr>
                <td colspan="3" style="padding:30px 20px;text-align:center;">
                    <i class="fa-solid fa-circle-info" style="font-size:2rem;color:var(--accent-cyan);display:block;margin-bottom:12px;"></i>
                    <p style="color:var(--text-muted);margin-bottom:18px;max-width:420px;margin-inline:auto;line-height:1.5;">
                        Nenhuma ROM encontrada para <strong style="color:#fff">${escapeHtml(game.title)}</strong> no Archive.org.
                        Você pode baixar o arquivo manualmente e usar <strong>Upload de ROM</strong>.
                    </p>
                    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
                        <a href="https://www.google.com/search?q=${encodeURIComponent(game.title + ' ' + consoleKey + ' rom')}"
                           target="_blank" class="btn btn-secondary btn-sm" style="text-decoration:none;">
                            <i class="fa-brands fa-google"></i> Buscar no Google
                        </a>
                        <a href="https://archive.org/search?query=${encodeURIComponent(game.title)}"
                           target="_blank" class="btn btn-secondary btn-sm" style="text-decoration:none;">
                            <i class="fa-solid fa-box-archive"></i> Archive.org
                        </a>
                        <a href="https://vimm.net/vault" target="_blank" class="btn btn-secondary btn-sm" style="text-decoration:none;">
                            <i class="fa-solid fa-vault"></i> Vimm's Lair
                        </a>
                    </div>
                </td>
            </tr>
        `;
    }

    async function searchRomsForGame(game) {
        // Abrir modal imediatamente com estado de carregamento — o grid do catálogo permanece visível
        openModalLoading(game);

        const archiveConsoleFilters = {
            'nes': ' AND (subject:nes OR subject:"nintendo nes" OR title:"nes")',
            'snes': ' AND (subject:snes OR subject:"super nintendo" OR title:"snes")',
            'gba': ' AND (subject:gba OR subject:"game boy advance" OR title:"gba")',
            'gb-gbc': ' AND (subject:"game boy" OR subject:gbc OR subject:gb OR title:"game boy")',
            'sega': ' AND (subject:genesis OR subject:megadrive OR title:"genesis" OR title:"mega drive" OR subject:"master system" OR subject:"game gear")',
            'psx': ' AND (subject:psx OR subject:playstation OR subject:"playstation 1" OR title:"playstation")'
        };

        const updateModalStatus = (msg) => {
            const statusEl = filesList.querySelector('p');
            if (statusEl) statusEl.textContent = msg;
        };

        try {
            // 1. Busca exata por título
            let archiveQuery = `title:("${game.title}") AND mediatype:software` + (archiveConsoleFilters[game.console] || '');
            let searchUrl = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(archiveQuery)}&fl[]=identifier&fl[]=title&fl[]=description&rows=15&output=json`;

            let response = await fetch(searchUrl);
            let data = await response.json();
            let rawItems = data.response.docs || [];

            // 2. Fallback com busca expandida
            if (rawItems.length === 0) {
                updateModalStatus('Tentando busca expandida…');
                archiveQuery = `"${game.title}" AND mediatype:software` + (archiveConsoleFilters[game.console] || '');
                searchUrl = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(archiveQuery)}&fl[]=identifier&fl[]=title&fl[]=description&rows=15&output=json`;
                response = await fetch(searchUrl);
                data = await response.json();
                rawItems = data.response.docs || [];
            }

            if (rawItems.length === 0) {
                showModalNoResults(game);
                return;
            }

            // 3. Validar metadados dos itens encontrados
            let validatedCount = 0;
            updateModalStatus(`Validando ${rawItems.length} resultados…`);

            const validExtensions = ['.nes', '.smc', '.sfc', '.gba', '.gb', '.gbc', '.zip', '.gen', '.md', '.bin', '.sms', '.gg', '.nds', '.n64', '.z64'];

            const validationPromises = rawItems.map(item =>
                fetch(`https://archive.org/metadata/${item.identifier}`)
                    .then(res => { if (!res.ok) throw new Error(); return res.json(); })
                    .then(meta => {
                        validatedCount++;
                        updateModalStatus(`Validando ROMs: ${validatedCount}/${rawItems.length}…`);
                        if (!meta.files) return null;
                        const romFiles = meta.files.filter(file => {
                            const name = file.name.toLowerCase();
                            if (name.includes('__ia_thumb') || name.endsWith('_meta.xml') || name.endsWith('_files.xml') || name.endsWith('.dat')) return false;
                            return validExtensions.some(ext => name.endsWith(ext));
                        });
                        return romFiles.length ? { ...item, files: romFiles } : null;
                    })
                    .catch(() => { validatedCount++; return null; })
            );

            const items = (await Promise.all(validationPromises)).filter(Boolean);

            if (items.length === 0) {
                showModalNoResults(game);
                return;
            }

            // Encontrou ROMs — atualiza o modal com a lista de arquivos
            loadCollectionFiles(items, game.title);

        } catch (error) {
            filesList.innerHTML = `
                <tr><td colspan="3" style="text-align:center;padding:30px;color:var(--text-muted);">
                    <i class="fa-solid fa-triangle-exclamation" style="color:#ff6b6b;font-size:1.8rem;display:block;margin-bottom:10px;"></i>
                    Erro ao consultar o Archive.org. Verifique sua conexão e tente novamente.
                </td></tr>`;
            console.error(error);
        }
    }

    async function loadCollectionFiles(itemsList, groupTitle) {
        // Modal já está aberto via openModalLoading — apenas atualiza o conteúdo
        filesList.innerHTML = '';
        
        // Inicializar o campo de filtro com vazio para mostrar todos os arquivos
        fileFilterInput.value = '';

        // Já temos todos os arquivos pré-validados e carregados em memória!
        // A abertura do visualizador de arquivos é instantânea, sem requests de rede.
        let allFiles = [];
        itemsList.forEach(item => {
            if (item.files) {
                item.files.forEach(file => {
                    allFiles.push({
                        name: file.name,
                        size: file.size,
                        identifier: item.identifier,
                        collectionTitle: item.title
                    });
                });
            }
        });

        if (allFiles.length === 0) {
            filesList.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:20px;color:var(--text-muted);">Nenhum arquivo de ROM encontrado.</td></tr>`;
            return;
        }

        currentFilesList = allFiles;
        fileTitle.innerText = groupTitle;

        renderFilesTable(currentFilesList, '');
    }

    function renderFilesTable(files, filterText = '') {
        filesList.innerHTML = '';
        const filter = filterText.toLowerCase();

        const filtered = files.filter(f => f.name.toLowerCase().includes(filter));

        if (filtered.length === 0) {
            filesList.innerHTML = '<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">Nenhum arquivo corresponde ao filtro.</td></tr>';
            return;
        }

        filtered.forEach(file => {
            const tr = document.createElement('tr');

            const sizeMB = file.size ? (file.size / (1024 * 1024)).toFixed(2) + ' MB' : 'Desconhecido';
            const romUrl = `https://archive.org/download/${encodeURIComponent(file.identifier)}/${encodeURIComponent(file.name)}`;

            tr.innerHTML = `
                <td>${escapeHtml(file.name)}</td>
                <td>${escapeHtml(sizeMB)}</td>
                <td>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <a href="${escapeHtml(romUrl)}" target="_blank" class="btn btn-secondary btn-sm" download style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                            <i class="fa-solid fa-download"></i> Baixar
                        </a>
                        <button class="btn btn-primary btn-sm btn-play-file">
                            <i class="fa-solid fa-play"></i> Jogar
                        </button>
                    </div>
                </td>
            `;

            tr.querySelector('.btn-play-file').addEventListener('click', () => {
                // Não fechamos o fileContainer aqui, permitindo que o usuário continue navegando se quiser
                // O emulador roda por cima ou em outra camada, não conflitando com a visibilidade do modal.

                const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                let core = getCoreFromExtension(ext);

                // Nome limpo para exibição (sem extensão, underscores → espaços)
                let rawName = file.name;
                if (rawName.includes('/')) rawName = rawName.substring(rawName.lastIndexOf('/') + 1);
                // boxartName preserva região ex: "Super Mario Bros. 3 (USA)" para lookup de capa
                const boxartName = rawName.substring(0, rawName.lastIndexOf('.'));
                const cleanName = boxartName.replace(/_/g, ' ');

                // Se for um arquivo ZIP, tentar auto-detectar o core real por contexto ou perguntar
                if (core === 'zip') {
                    const searchConsoleFilter = document.getElementById('explore-console-select').value;
                    let inferredCore = 'zip';

                    if (searchConsoleFilter !== 'all') {
                        if (searchConsoleFilter === 'gb-gbc') {
                            inferredCore = 'gbc';
                        } else if (searchConsoleFilter === 'sega') {
                            inferredCore = 'segaMD';
                        } else {
                            inferredCore = searchConsoleFilter;
                        }
                    } else {
                        inferredCore = inferCoreFromText(file.name + ' ' + fileTitle.innerText);
                    }

                    if (inferredCore !== 'zip') {
                        core = inferredCore;
                    } else {
                        openZipConsoleSelector(cleanName, romUrl, boxartName);
                        return;
                    }
                }

                if (!core) {
                    alert('Não foi possível reconhecer o console correspondente a este arquivo. Tentaremos carregar como NES (ou tente outro arquivo).');
                    playGame(cleanName, 'Archive.org (NES)', 'nes', romUrl, boxartName);
                } else {
                    const consoleLabels = {
                        'nes': 'NES', 'snes': 'SNES', 'gba': 'GBA',
                        'gb': 'Game Boy', 'gbc': 'Game Boy Color',
                        'segaMD': 'Mega Drive', 'segaMS': 'Master System',
                        'gamegear': 'Game Gear', 'n64': 'Nintendo 64', 'nds': 'Nintendo DS',
                        'psx': 'PlayStation 1'
                    };
                    playGame(cleanName, `Archive.org (${consoleLabels[core] || core.toUpperCase()})`, core, romUrl, boxartName);
                }
            });

            filesList.appendChild(tr);
        });
    }
}

// --- 5. CONFIGURAÇÃO E MAPEAMENTO DE CONTROLES ---
// Mapa de keyCodes para nomes de exibição (baseado no keyMap do EmulatorJS)
const EJS_KEY_DISPLAY = {
    8:'Backspace',9:'Tab',13:'Enter',16:'Shift',17:'Ctrl',18:'Alt',
    19:'Pause',20:'CapsLk',27:'Esc',32:'Space',
    33:'PgUp',34:'PgDn',35:'End',36:'Home',
    37:'←',38:'↑',39:'→',40:'↓',
    45:'Ins',46:'Del',
    48:'0',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',
    65:'A',66:'B',67:'C',68:'D',69:'E',70:'F',71:'G',72:'H',73:'I',74:'J',
    75:'K',76:'L',77:'M',78:'N',79:'O',80:'P',81:'Q',82:'R',83:'S',84:'T',
    85:'U',86:'V',87:'W',88:'X',89:'Y',90:'Z',
    112:'F1',113:'F2',114:'F3',115:'F4',116:'F5',117:'F6',
    118:'F7',119:'F8',120:'F9',121:'F10',122:'F11',123:'F12',
    186:';',187:'=',188:',',189:'-',190:'.',191:'/',192:'`',
    219:'[',220:'\\',221:']',222:"'"
};

const KEY_LABEL_MAP = {
    ' ':'Space',' ':'Space',
    'ArrowUp':'↑','ArrowDown':'↓','ArrowLeft':'←','ArrowRight':'→',
    'Shift':'Shift','Enter':'Enter','Control':'Ctrl','Alt':'Alt',
    'Escape':'Esc','Backspace':'Backspace','Tab':'Tab','CapsLock':'CapsLk',
    'Delete':'Del','Insert':'Ins','Home':'Home','End':'End',
    'PageUp':'PgUp','PageDown':'PgDn','Pause':'Pause',
};

function getKeyDisplayName(val) {
    if (val === null || val === undefined || val === '') return '?';
    // Formato "keyCode;eventKey" — semicolon separa o keyCode (para o emulador) do label real do layout
    if (typeof val === 'string' && val.includes(';')) {
        const sep = val.indexOf(';');
        const k = val.substring(sep + 1);
        if (KEY_LABEL_MAP[k]) return KEY_LABEL_MAP[k];
        if (k.length === 1) return k.toUpperCase();
        if (/^F\d{1,2}$/.test(k)) return k;
        if (k) return k;
        return getKeyDisplayName(parseInt(val.substring(0, sep)));
    }
    // Formato numérico (defaults ou saves antigos)
    const n = typeof val === 'number' ? val : (!isNaN(Number(val)) && String(val) !== '' ? parseInt(val) : null);
    if (n !== null) {
        if (EJS_KEY_DISPLAY[n]) return EJS_KEY_DISPLAY[n];
        const ch = String.fromCharCode(n);
        if (/[\x20-\x7E\xA0-\xFF]/.test(ch)) return ch.toUpperCase();
        return `[${n}]`;
    }
    // Formato legado: string de evento.key
    const s = String(val);
    if (KEY_LABEL_MAP[s]) return KEY_LABEL_MAP[s];
    const lc = s.toLowerCase();
    const legacyLower = {
        'arrowup':'↑','arrowdown':'↓','arrowleft':'←','arrowright':'→',
        'shift':'Shift','enter':'Enter','control':'Ctrl','alt':'Alt',
        'escape':'Esc','backspace':'Backspace','tab':'Tab',
    };
    if (legacyLower[lc]) return legacyLower[lc];
    return s.length === 1 ? s.toUpperCase() : s;
}

function initControlsSettings() {
    // Defaults: keyCodes numéricos alinhados com o keyMap do EmulatorJS
    // 0=B, 1=Y, 2=Select, 3=Start, 4=Up…7=Right, 8=A, 9=X, 10=L, 11=R
    const defaultControls = {
        "0": 90,  // Z  → B
        "1": 65,  // A  → Y
        "2": 16,  // Shift → Select
        "3": 13,  // Enter → Start
        "4": 38,  // ↑
        "5": 40,  // ↓
        "6": 37,  // ←
        "7": 39,  // →
        "8": 88,  // X  → A
        "9": 83,  // S  → X
        "10": 81, // Q  → L
        "11": 87, // W  → R
        "100": 49, // 1 → Salvar Estado
        "101": 50, // 2 → Carregar Estado
        "102": 51, // 3 → Trocar Slot
        "103": 52, // 4 → Avanço Rápido
        "104": 53, // 5 → Câmera Lenta
        "105": 54  // 6 → Retroceder
    };

    const selector = document.getElementById('settings-console-select');
    let currentConsole = selector ? selector.value : 'global';
    let controls = loadStoredControls(currentConsole) ?? loadStoredControls('global') ?? { ...defaultControls };

    // Função para atualizar os rótulos dos botões na tela
    function updateControlsUI() {
        Object.keys(controls).forEach(buttonId => {
            const btn = document.getElementById(`btn-bind-${buttonId}`);
            if (btn) btn.textContent = getKeyDisplayName(controls[buttonId]);
        });
    }

    // Inicializar os botões da UI
    updateControlsUI();

    // Escutar mudanças no selector de console
    if (selector) {
        selector.addEventListener('change', () => {
            currentConsole = selector.value;
            controls = loadStoredControls(currentConsole) ?? loadStoredControls('global') ?? { ...defaultControls };
            updateControlsUI();
        });
    }

    // Adicionar escuta nos botões de bind
    const bindButtons = document.querySelectorAll('.btn-control-bind');
    let activeBindingButton = null;

    bindButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            // Se já tem um botão aguardando, cancela
            if (activeBindingButton) {
                activeBindingButton.classList.remove('waiting');
                const prevId = activeBindingButton.getAttribute('data-button-id');
                activeBindingButton.textContent = getKeyDisplayName(controls[prevId]);
            }

            activeBindingButton = btn;
            btn.classList.add('waiting');
            btn.textContent = 'Aguardando...';

            // Adicionar evento para capturar a próxima tecla
            const keyHandler = (event) => {
                event.preventDefault();
                event.stopPropagation();

                const buttonId = btn.getAttribute('data-button-id');

                // Escape cancela sem salvar
                if (event.key === 'Escape') {
                    btn.classList.remove('waiting');
                    btn.textContent = getKeyDisplayName(controls[buttonId]);
                    activeBindingButton = null;
                    document.removeEventListener('keydown', keyHandler, true);
                    return;
                }

                // F1-F12 são reservadas para atalhos do emulador (F2=salvar, F4=carregar)
                if (event.keyCode >= 112 && event.keyCode <= 123) {
                    btn.textContent = 'F-keys reservadas…';
                    setTimeout(() => { btn.textContent = getKeyDisplayName(controls[buttonId]); btn.classList.remove('waiting'); activeBindingButton = null; }, 1200);
                    document.removeEventListener('keydown', keyHandler, true);
                    return;
                }

                // Formato "keyCode;eventKey": keyCode para o emulador, eventKey para o label de display
                controls[buttonId] = event.keyCode + ';' + event.key;
                const key = currentConsole === 'global' ? 'retroplay_controls' : `retroplay_controls_${currentConsole}`;
                localStorage.setItem(key, JSON.stringify(controls));

                // Atualizar UI
                updateControlsUI();

                // Limpar estados
                btn.classList.remove('waiting');
                activeBindingButton = null;

                // Remover o escutador de eventos
                document.removeEventListener('keydown', keyHandler, true);
            };

            // Adicionar com captura (true) para interceptar antes de outros atalhos do navegador
            document.addEventListener('keydown', keyHandler, true);

            // Permitir cancelar se o usuário clicar fora do botão
            const clickOutsideHandler = () => {
                if (activeBindingButton) {
                    activeBindingButton.classList.remove('waiting');
                    const buttonId = activeBindingButton.getAttribute('data-button-id');
                    activeBindingButton.textContent = getKeyDisplayName(controls[buttonId]);
                    activeBindingButton = null;
                }
                document.removeEventListener('click', clickOutsideHandler);
                document.removeEventListener('keydown', keyHandler, true);
            };

            // Pequeno delay para não capturar o próprio clique
            setTimeout(() => {
                document.addEventListener('click', clickOutsideHandler);
            }, 50);
        });
    });

    // Restaurar padrões
    const restoreBtn = document.getElementById('btn-restore-controls');
    if (restoreBtn) {
        restoreBtn.addEventListener('click', () => {
            const consoleName = currentConsole === 'global' ? 'todos os consoles' : 'o console selecionado';
            if (confirm(`Deseja realmente restaurar os controles padrão para ${consoleName}?`)) {
                const key = currentConsole === 'global' ? 'retroplay_controls' : `retroplay_controls_${currentConsole}`;
                if (currentConsole === 'global') {
                    controls = { ...defaultControls };
                    localStorage.setItem(key, JSON.stringify(controls));
                } else {
                    localStorage.removeItem(key);
                    controls = loadStoredControls('global') ?? { ...defaultControls };
                }
                updateControlsUI();
                
                // Mostrar feedback visual rápido
                restoreBtn.innerHTML = '<i class="fa-solid fa-check"></i> Restaurado!';
                restoreBtn.style.color = 'var(--accent-cyan)';
                setTimeout(() => {
                    restoreBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Restaurar Padrões';
                    restoreBtn.style.color = '';
                }, 2000);
            }
        });
    }
}
