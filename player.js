function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = String(s ?? '');
    return d.innerHTML;
}

function showToast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.88);color:#fff;padding:10px 22px;border-radius:8px;font-size:14px;font-family:sans-serif;z-index:9999;border:1px solid rgba(255,255,255,0.12);pointer-events:none;transition:opacity .35s';
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 380); }, 2000);
}

// Criar e adicionar o elemento de Loading na tela
const loaderHTML = `
<div class="loader-container" id="player-loader">
    <div class="spinner"></div>
    <div class="loader-text" id="loader-status">Iniciando...</div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', loaderHTML);

function updateLoaderText(text, isError = false) {
    const status = document.getElementById('loader-status');
    if (status) {
        status.innerHTML = text;
    }
    if (isError) {
        const spinner = document.querySelector('.spinner');
        if (spinner) {
            spinner.style.borderTopColor = '#ff3366';
            spinner.style.animationPlayState = 'paused'; // Pausar a rotação para indicar travamento
        }
    }
}

// --- TRATAMENTO DE ERROS PARA LOG ---
window.addEventListener('error', function(e) {
    updateLoaderText(`<span style="color: #ff3366; font-weight: bold;">Erro de Execução:</span><br><span style="font-size: 0.85rem; text-transform: none; letter-spacing: normal;">${escapeHtml(e.message)}</span>`, true);
});

window.addEventListener('unhandledrejection', function(e) {
    const reason = e.reason ? (e.reason.message || String(e.reason)) : 'Falha desconhecida';
    updateLoaderText(`<span style="color: #ff3366; font-weight: bold;">Erro de Promessa:</span><br><span style="font-size: 0.85rem; text-transform: none; letter-spacing: normal;">${escapeHtml(reason)}</span>`, true);
});

const originalConsoleError = console.error;
console.error = function(...args) {
    originalConsoleError.apply(console, args);
    const msg = args.join(' ');
    if (msg.toLowerCase().includes('failed') || msg.toLowerCase().includes('error') || msg.toLowerCase().includes('exception') || msg.toLowerCase().includes('wasm') || msg.toLowerCase().includes('compile')) {
        updateLoaderText(`<span style="color: #ff3366; font-weight: bold;">Erro do Emulador:</span><br><span style="font-size: 0.8rem; text-transform: none; letter-spacing: normal;">${escapeHtml(msg)}</span>`, true);
    }
};

// Obter parâmetros da Query String
const urlParams = new URLSearchParams(window.location.search);
const core = urlParams.get('core');
const rom = urlParams.get('rom');
const title = urlParams.get('title') || 'Retro Game';

function isSafeUrl(url) {
    try { const u = new URL(url); return u.protocol === 'https:' || u.protocol === 'http:' || u.protocol === 'blob:'; }
    catch { return false; }
}

if (!core || !rom || !isSafeUrl(rom)) {
    updateLoaderText('Erro: parâmetros inválidos ou URL de ROM não permitida.', true);
} else {
    initPlayer();
}

// Registra o SW para substituir qualquer registro obsoleto do EmulatorJS.
// Sem fetch handler no SW, então não precisa bloquear o início do emulador.
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// Helper to load external scripts dynamically
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.body.appendChild(s);
    });
}

function writeVirtualFiles() {
    try {
        const gm = window.EJS_emulator && window.EJS_emulator.gameManager;
        if (!gm) {
            console.warn('[RetroPlay] EJS_emulator.gameManager não encontrado para gravação. Agendando retry...');
            setTimeout(writeVirtualFiles, 100);
            return;
        }
        const FS = gm.FS;
        if (!FS) {
            console.warn('[RetroPlay] FS do emulador não encontrado. Agendando retry...');
            setTimeout(writeVirtualFiles, 100);
            return;
        }

        if (!window.retroplay_virtual_files || Object.keys(window.retroplay_virtual_files).length === 0) {
            return;
        }

        if (window.retroplay_virtual_files_written) {
            return;
        }

        console.log('[RetroPlay] Iniciando escrita de arquivos no FS virtual de Emscripten...');

        // Helper para criar pastas e escrever arquivos de forma recursiva
        const writeToPath = (fs, filePath, fileData) => {
            const parts = filePath.split("/");
            let currentPath = "";
            for (let i = 0; i < parts.length - 1; i++) {
                if (parts[i] === "") continue;
                currentPath += "/" + parts[i];
                if (!fs.analyzePath(currentPath).exists) {
                    console.log(`[RetroPlay] Criando pasta no FS: ${currentPath}`);
                    fs.mkdir(currentPath);
                }
            }
            fs.writeFile(filePath, fileData);
            console.log(`[RetroPlay] Arquivo gravado com sucesso: ${filePath} (${fileData.byteLength} bytes)`);
        };

        for (const [path, data] of Object.entries(window.retroplay_virtual_files)) {
            try {
                writeToPath(FS, path, data);
            } catch (err) {
                console.error(`[RetroPlay] Falha ao gravar no caminho ${path}:`, err);
            }
        }

        window.retroplay_virtual_files_written = true;
        console.log('[RetroPlay] Escrita no FS concluída!');
    } catch (e) {
        console.error('[RetroPlay] Erro geral ao escrever no FS:', e);
    }
}

// --- SISTEMA DE CACHE DE ROMS E SAVES PERMANENTES COM INDEXEDDB ---
const DB_NAME = 'RetroPlayCache';
const DB_VERSION = 2;
const STORE_NAME = 'roms';
const STORE_SAVES = 'states';
const MAX_GAMES = 4; // Limite de jogos salvos localmente (LRU)

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'url' });
                store.createIndex('lastPlayed', 'lastPlayed', { unique: false });
            }
            if (!db.objectStoreNames.contains(STORE_SAVES)) {
                // key composta: 'romUrl_slot'
                db.createObjectStore(STORE_SAVES, { keyPath: 'id' });
            }
        };
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
    });
}

// --- FUNÇÕES DE SAVESTATE PERMANENTE (BROWSER STORAGE) ---
async function getStoredState(gameId, slot) {
    try {
        const db = await openDB();
        return await new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_SAVES, 'readonly');
            const store = tx.objectStore(STORE_SAVES);
            const req = store.get(`${gameId}_slot_${slot}`);
            req.onsuccess = (e) => resolve(e.target.result || null);
            req.onerror = (e) => reject(e.target.error);
        });
    } catch (e) {
        console.error('[Saves] Erro ao buscar save no storage:', e);
        return null;
    }
}

async function saveStoredState(gameId, slot, data, screenshotBlob = null) {
    try {
        const db = await openDB();
        return await new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_SAVES, 'readwrite');
            const store = tx.objectStore(STORE_SAVES);
            const record = {
                id: `${gameId}_slot_${slot}`,
                gameId,
                slot,
                data,
                screenshot: screenshotBlob,
                savedAt: Date.now()
            };
            const req = store.put(record);
            req.onsuccess = () => resolve(record);
            req.onerror = (e) => reject(e.target.error);
        });
    } catch (e) {
        console.error('[Saves] Erro ao gravar save no storage:', e);
        throw e;
    }
}

async function deleteStoredState(gameId, slot) {
    try {
        const db = await openDB();
        return await new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_SAVES, 'readwrite');
            const store = tx.objectStore(STORE_SAVES);
            const req = store.delete(`${gameId}_slot_${slot}`);
            req.onsuccess = () => resolve();
            req.onerror = (e) => reject(e.target.error);
        });
    } catch (e) {
        console.error('[Saves] Erro ao deletar save do storage:', e);
    }
}

async function getCachedRom(url) {
    try {
        const db = await openDB();
        return await new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(url);
            request.onsuccess = (e) => {
                const record = e.target.result;
                if (record) {
                    record.lastPlayed = Date.now();
                    store.put(record); // Atualiza timestamp para controle de LRU
                    resolve(record.data);
                } else {
                    resolve(null);
                }
            };
            request.onerror = (e) => reject(e.target.error);
        });
    } catch (err) {
        console.error('[Cache] Erro ao ler do IndexedDB:', err);
        return null;
    }
}

async function saveRomToCache(url, title, core, data) {
    try {
        const db = await openDB();
        
        // 1. Buscar todos os registros ordenados por lastPlayed para conferir o limite
        const records = await new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const index = store.index('lastPlayed');
            const request = index.getAll();
            request.onsuccess = (e) => resolve(e.target.result || []);
            request.onerror = (e) => reject(e.target.error);
        });

        // 2. Executar deleção (LRU) e inserção numa única transação de escrita
        return await new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            
            // Filtrar o próprio jogo se ele já existia no cache
            const existingIndex = records.findIndex(r => r.url === url);
            let activeRecords = [...records];
            if (existingIndex !== -1) {
                activeRecords.splice(existingIndex, 1);
            }
            
            if (activeRecords.length >= MAX_GAMES) {
                // Ordenar por lastPlayed crescente (mais antigos primeiro)
                activeRecords.sort((a, b) => a.lastPlayed - b.lastPlayed);
                const toDeleteCount = activeRecords.length - MAX_GAMES + 1;
                console.log(`[Cache] Limite atingido (${records.length} jogos). Removendo os ${toDeleteCount} mais antigo(s)...`);
                for (let i = 0; i < toDeleteCount; i++) {
                    store.delete(activeRecords[i].url);
                    console.log(`[Cache] Evictado do cache local: ${activeRecords[i].title}`);
                }
            }

            // Inserir / Atualizar o novo
            const record = {
                url,
                title,
                core,
                data,
                lastPlayed: Date.now(),
                size: data.byteLength
            };
            const request = store.put(record);
            request.onsuccess = () => {
                console.log(`[Cache] Salvo no IndexedDB: ${title} (${(data.byteLength / (1024 * 1024)).toFixed(1)}MB)`);
                resolve();
            };
            request.onerror = (e) => reject(e.target.error);
        });
    } catch (e) {
        console.error('[Cache] Falha ao salvar no IndexedDB:', e);
    }
}

// Ouvir o evento de inicialização de montagem do IndexedDB do emulador
window.addEventListener('saveDatabaseLoaded', () => {
    console.log('[RetroPlay] Capturou saveDatabaseLoaded.');
    writeVirtualFiles();
});

async function initPlayer() {
    let finalRomUrl = rom;
    let finalBiosUrl = null;
    let biosBytes = null;

    // Registrar globais de arquivos virtuais
    window.retroplay_virtual_files = {};
    window.retroplay_virtual_files_written = false;

    // Se for PS1, precisamos da BIOS (scph5501.bin)
    if (core === 'psx') {
        finalBiosUrl = '/bios/scph5501.bin';
        updateLoaderText('Preparando BIOS do PlayStation...');
        
        const loadBios = () => new Promise((resolve) => {
            fetch(finalBiosUrl)
                .then(async (response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status} ao obter BIOS`);
                    }
                    const buf = await response.arrayBuffer();
                    const bytes = new Uint8Array(buf);
                    
                    // Validar se não é um HTML retornado por redirecionamentos ou 404 customizados com status 200
                    const isHtml = bytes.length > 4 && (
                        (bytes[0] === 60 && bytes[1] === 33) || // <!
                        (bytes[0] === 60 && bytes[1] === 104) || // <h
                        (bytes[0] === 123 && bytes[1] === 34) // {"
                    );
                    if (isHtml || bytes.length < 100000) {
                        throw new Error("O arquivo retornado não é uma BIOS de PlayStation válida (HTML/JSON recebido)");
                    }
                    
                    biosBytes = bytes;
                    // Gravar nos caminhos esperados pelo RetroArch / pcsx_rearmed
                    window.retroplay_virtual_files['/system/scph5501.bin'] = biosBytes;
                    window.retroplay_virtual_files['/home/web_user/retroarch/userdata/system/scph5501.bin'] = biosBytes;
                    
                    console.log('[RetroPlay] BIOS baixada e registrada para escrita.');
                    resolve();
                })
                .catch((error) => {
                    console.error('[RetroPlay] Erro ao baixar BIOS:', error);
                    
                    // Exibir aviso detalhado de BIOS ausente
                    const errorHtml = `
                        <div style="background: rgba(255, 51, 102, 0.12); border: 1px solid #ff3366; padding: 22px; border-radius: 12px; max-width: 500px; text-align: left; font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; text-transform: none; text-shadow: none; margin: 15px; line-height: 1.6; color: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
                            <h3 style="color: #ff3366; margin-top: 0; font-size: 1.15rem; font-weight: bold; display: flex; align-items: center; gap: 8px;">
                                ⚠️ BIOS do PS1 Ausente ou Inválida
                            </h3>
                            <p style="font-size: 0.88rem; margin: 10px 0; color: #e5e7eb;">
                                O emulador do PlayStation 1 precisa do arquivo de BIOS <strong>scph5501.bin</strong> para rodar os jogos sem travar. O arquivo local não foi encontrado ou o servidor retornou um erro.
                            </p>
                            <h4 style="color: #f3f4f6; margin: 14px 0 6px 0; font-size: 0.92rem; font-weight: bold;">Como resolver no servidor local:</h4>
                            <ol style="font-size: 0.82rem; padding-left: 20px; margin: 0 0 16px 0; color: #9ca3af; display: flex; flex-direction: column; gap: 4px;">
                                <li>Crie uma pasta chamada <strong style="color: #ff007f;">bios</strong> na raiz do projeto (onde está o index.html).</li>
                                <li>Coloque o arquivo da BIOS <strong>scph5501.bin</strong> (deve ter exatamente 512 KB) dentro dela.</li>
                                <li>O caminho final deve ser: <code style="background:#1e1e2e; color: #f5e0dc; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.8rem;">/bios/scph5501.bin</code></li>
                            </ol>
                            <div style="display: flex; gap: 10px;">
                                <button onclick="window.location.reload()" style="background: #ff3366; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 0.82rem; transition: background 0.2s;">Tentar Novamente</button>
                                <button id="btn-force-play" style="background: #333; color: #ccc; border: 1px solid #555; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.82rem; transition: background 0.2s;">Prosseguir sem BIOS</button>
                            </div>
                        </div>
                    `;
                    updateLoaderText(errorHtml, true);
                    
                    document.getElementById('btn-force-play').addEventListener('click', () => {
                        console.warn('[RetroPlay] Prosseguindo sem BIOS por solicitação do usuário.');
                        const spinner = document.querySelector('.spinner');
                        if (spinner) {
                            spinner.style.borderTopColor = '#ff007f';
                            spinner.style.animationPlayState = 'running';
                        }
                        updateLoaderText('Iniciando emulador sem BIOS...');
                        resolve();
                    });
                });
        });
        
        await loadBios();
    }

    // Se for URL externa, ou se for um Blob local do PS1 (para processamento de ZIP/CUE), carregamos os bytes da ROM
    let romBytes = null;
    if (rom.startsWith('http') || (rom.startsWith('blob:') && core === 'psx')) {
        if (rom.startsWith('blob:')) {
            updateLoaderText('Lendo arquivo de jogo local...');
            try {
                const response = await fetch(rom);
                if (!response.ok) throw new Error(`HTTP ${response.status} ao obter Blob da ROM`);
                const arrayBuf = await response.arrayBuffer();
                romBytes = new Uint8Array(arrayBuf);
            } catch (error) {
                updateLoaderText(`<span style="color: #ff3366; font-weight: bold;">Erro ao ler arquivo local:</span><br><span style="font-size: 0.8rem; text-transform: none; letter-spacing: normal;">${escapeHtml(error.message)}</span>`, true);
                return;
            }
        } else {
            updateLoaderText('Verificando cache local...');
            try {
                romBytes = await getCachedRom(rom);
            } catch (e) {
                console.error('[Cache] Falha ao ler cache:', e);
            }

            if (romBytes) {
                console.log('[Cache] ROM carregada com sucesso do cache IndexedDB.');
                updateLoaderText('ROM carregada do cache local!');
            } else {
                updateLoaderText('Conectando ao servidor...');
                
                // Burlar CORS do Archive.org passando pelo nosso proxy local
                const proxiedUrl = `/api/proxy-rom?url=${encodeURIComponent(rom)}`;

                try {
                    const response = await fetch(proxiedUrl);
                    if (!response.ok) throw new Error(`HTTP ${response.status} ao obter a ROM`);

                    const contentLength = response.headers.get('content-length');
                    const total = contentLength ? parseInt(contentLength, 10) : 0;
                    let loaded = 0;

                    const reader = response.body.getReader();
                    const chunks = [];

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        chunks.push(value);
                        loaded += value.length;

                        if (total > 0) {
                            const percent = Math.round((loaded / total) * 100);
                            updateLoaderText(`Baixando jogo: ${percent}%<br><span style="font-size: 0.75rem; text-shadow: none; color: var(--text-muted);">${(loaded / (1024 * 1024)).toFixed(1)}MB / ${(total / (1024 * 1024)).toFixed(1)}MB</span>`);
                        } else {
                            updateLoaderText(`Baixando jogo...<br><span style="font-size: 0.75rem; text-shadow: none; color: var(--text-muted);">${(loaded / (1024 * 1024)).toFixed(1)}MB baixados</span>`);
                        }
                    }

                    // Concatenar os bytes baixados
                    const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
                    romBytes = new Uint8Array(totalLength);
                    let offset = 0;
                    for (const chunk of chunks) {
                        romBytes.set(chunk, offset);
                        offset += chunk.length;
                    }
                    updateLoaderText('Download concluído! Salvando em cache...');
                    
                    // Salvar no cache assincronamente sem bloquear o boot
                    saveRomToCache(rom, title, core, romBytes).catch(err => {
                        console.error('[Cache] Falha ao salvar jogo em cache:', err);
                    });

                } catch (error) {
                    updateLoaderText(`<span style="color: #ff3366; font-weight: bold;">Erro no Download:</span><br><span style="font-size: 0.8rem; text-transform: none; letter-spacing: normal; line-height: 1.4;">Não foi possível baixar o jogo do repositório.<br>Causa: ${escapeHtml(error.message)}</span>`, true);
                    return;
                }
            }
        }
    }

    // Se for PS1, processamos descompactação ou registro no filesystem
    if (core === 'psx' && romBytes) {
        const isZip = (arr) => {
            return arr.length >= 4 && arr[0] === 0x50 && arr[1] === 0x4B && arr[2] === 0x03 && arr[3] === 0x04;
        };

        const getFilenameFromUrl = (url, defaultName = 'game.bin') => {
            try {
                const u = new URL(url);
                const nestedUrl = u.searchParams.get('url');
                if (nestedUrl) return getFilenameFromUrl(nestedUrl, defaultName);
                const pathname = u.pathname;
                const lastPart = pathname.substring(pathname.lastIndexOf('/') + 1);
                if (lastPart) return decodeURIComponent(lastPart);
            } catch (e) {}
            return defaultName;
        };

        if (isZip(romBytes)) {
            updateLoaderText('Descompactando arquivos do jogo...');
            try {
                // Carregar JSZip se não estiver carregado
                if (typeof JSZip === 'undefined') {
                    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
                }

                const zip = await JSZip.loadAsync(romBytes.buffer);
                const extractedFiles = [];

                for (const [filename, fileObj] of Object.entries(zip.files)) {
                    if (fileObj.dir) continue;
                    const content = await fileObj.async('uint8array');
                    const basename = filename.split('/').pop();
                    extractedFiles.push({ name: basename, content: content });
                }

                // Registrar todos os arquivos extraídos no filesystem virtual
                extractedFiles.forEach(f => {
                    window.retroplay_virtual_files['/' + f.name] = f.content;
                });

                // Tentar localizar um arquivo .cue, .chd ou .pbp
                const cueFile = extractedFiles.find(f => f.name.toLowerCase().endsWith('.cue'));
                const chdFile = extractedFiles.find(f => f.name.toLowerCase().endsWith('.chd'));
                const pbpFile = extractedFiles.find(f => f.name.toLowerCase().endsWith('.pbp'));

                if (cueFile) {
                    const blob = new Blob([cueFile.content], { type: 'text/plain' });
                    finalRomUrl = URL.createObjectURL(blob) + '#' + cueFile.name;
                    console.log(`[RetroPlay] Booting CUE file: ${cueFile.name}`);
                } else if (chdFile) {
                    const blob = new Blob([chdFile.content], { type: 'application/octet-stream' });
                    finalRomUrl = URL.createObjectURL(blob) + '#' + chdFile.name;
                    console.log(`[RetroPlay] Booting CHD file: ${chdFile.name}`);
                } else if (pbpFile) {
                    const blob = new Blob([pbpFile.content], { type: 'application/octet-stream' });
                    finalRomUrl = URL.createObjectURL(blob) + '#' + pbpFile.name;
                    console.log(`[RetroPlay] Booting PBP file: ${pbpFile.name}`);
                } else {
                    // Sem arquivo CUE, mas talvez tenha arquivos .bin
                    const binFiles = extractedFiles.filter(f => f.name.toLowerCase().endsWith('.bin'));
                    if (binFiles.length > 0) {
                        // Ordena por tamanho decrescente para pegar o track principal
                        binFiles.sort((a, b) => b.content.byteLength - a.content.byteLength);
                        const mainBin = binFiles[0];
                        const generatedCue = `FILE "${mainBin.name}" BINARY\n  TRACK 01 MODE2/2352\n    INDEX 01 00:00:00`;
                        const cueData = new TextEncoder().encode(generatedCue);
                        
                        window.retroplay_virtual_files['/game.cue'] = cueData;
                        const blob = new Blob([cueData], { type: 'text/plain' });
                        finalRomUrl = URL.createObjectURL(blob) + '#game.cue';
                        console.log(`[RetroPlay] Gerou arquivo CUE para: ${mainBin.name}`);
                    } else {
                        throw new Error('Nenhum arquivo executável de PlayStation (.cue, .bin, .chd, .pbp) foi encontrado no ZIP.');
                    }
                }
            } catch (err) {
                updateLoaderText(`<span style="color: #ff3366; font-weight: bold;">Erro de Descompactação:</span><br><span style="font-size: 0.8rem; text-transform: none; letter-spacing: normal;">Falha ao extrair o ZIP do jogo.<br>Detalhe: ${escapeHtml(err.message)}</span>`, true);
                return;
            }
        } else {
            // Se não for ZIP, registramos o arquivo único
            const filename = getFilenameFromUrl(rom);
            const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
            const validExts = ['.cue', '.bin', '.chd', '.pbp', '.iso', '.img', '.mdf', '.m3u', '.ccd'];
            if (!validExts.includes(ext)) {
                updateLoaderText(`<span style="color: #ff3366; font-weight: bold;">Formato de Arquivo Inválido:</span><br><span style="font-size: 0.85rem; text-transform: none; letter-spacing: normal; line-height: 1.5;">O arquivo <strong>"${escapeHtml(filename)}"</strong> não é um formato de jogo de PlayStation 1 suportado.<br>Formatos suportados: .cue, .bin, .chd, .pbp, .iso, .img, .mdf, .m3u, .ccd.</span>`, true);
                return;
            }
            window.retroplay_virtual_files['/' + filename] = romBytes;
            const blob = new Blob([romBytes], { type: 'application/octet-stream' });
            finalRomUrl = URL.createObjectURL(blob) + '#' + filename;
            console.log(`[RetroPlay] Booting raw file directly: ${filename}`);
        }
    } else if (romBytes) {
        // Se for outro core, apenas criamos a Blob URL da ROM (comportamento original)
        const blob = new Blob([romBytes]);
        finalRomUrl = URL.createObjectURL(blob);
    }

    // Limpar os parâmetros da query string da URL do iframe.
    // Isso impede que o loader.js do EmulatorJS extraia a URL da ROM original diretamente e tente baixá-la sem o Blob.
    try {
        window.history.replaceState(null, '', window.location.pathname);
    } catch (e) {
        console.warn('replaceState falhou:', e);
    }

    // Interceptar os botões nativos de Save State e Load State da barra do EmulatorJS
    // para abrir diretamente nosso gerenciador de saves no navegador (IndexedDB com 3 slots)
    // ao invés de abrir o diálogo do sistema operacional (Downloads / File Picker).
    window.EJS_onSaveState = function(e) {
        if (typeof window.retroplay_openSaveModal === 'function') {
            window.retroplay_openSaveModal();
        }
        return 1; // Impede o comportamento padrão nativo (download do arquivo no Windows/OS)
    };

    window.EJS_onLoadState = function() {
        if (typeof window.retroplay_openSaveModal === 'function') {
            window.retroplay_openSaveModal();
        }
        return 1; // Impede o comportamento padrão nativo (abrir o explorador de arquivos)
    };

    // Configurar variáveis globais para o EmulatorJS
    window.EJS_player = '#game';
    window.EJS_core = core;
    window.EJS_gameUrl = finalRomUrl;
    window.EJS_gameName = title;
    window.EJS_startOnLoaded = true; // Iniciar a ROM imediatamente
    window.EJS_disableCue = false; // Habilitar geração/uso de arquivos .cue
    
    // Omitimos window.EJS_biosUrl para o PS1 para evitar downloads redundantes / erros
    if (core !== 'psx' && finalBiosUrl) {
        window.EJS_biosUrl = finalBiosUrl;
    }

    window.EJS_ready = function() {
        console.log('[RetroPlay] EJS_ready acionado.');
        writeVirtualFiles();
    };

    // Injetar mapeamento de controles personalizados obtidos do localStorage
    try {
        // Converte um valor salvo nos controles para o formato aceito pelo keyLookup() do EmulatorJS.
        // keyLookup aceita números diretamente (if(number) return t) ou strings presentes no keyMap.
        // Guardar keyCodes numéricos garante funcionamento com qualquer tecla, inclusive ç.
        const toEjsKey = (val) => {
            if (val === null || val === undefined || val === '') return '';
            // Formato "keyCode;eventKey" — extrai só o keyCode para o emulador
            if (typeof val === 'string' && val.includes(';')) {
                return parseInt(val.substring(0, val.indexOf(';')));
            }
            const n = typeof val === 'number' ? val : (!isNaN(Number(val)) && String(val) !== '' ? parseInt(val) : null);
            if (n !== null) return n;  // keyCode numérico — passa direto
            // Formato legado (string event.key) — normaliza para o nome do keyMap
            const s = String(val).toLowerCase();
            const legacy = {
                'arrowup':'up arrow','arrowdown':'down arrow',
                'arrowleft':'left arrow','arrowright':'right arrow',
                ' ':'space','spacebar':'space','shift':'shift','enter':'enter',
                'control':'ctrl','alt':'alt','backspace':'backspace',
                'tab':'tab','capslock':'caps lock','escape':'escape',
                'delete':'delete','insert':'insert','home':'home',
                'end':'end','pageup':'page up','pagedown':'page down',
            };
            return legacy[s] !== undefined ? legacy[s] : s;
        };

        const savedControls = localStorage.getItem('retroplay_controls_' + core) || localStorage.getItem('retroplay_controls');

        // Defaults como keyCodes numéricos (ID 0=B,1=Y,2=Sel,3=Start,4-7=DPad,8=A,9=X,10=L,11=R)
        // Mapeamento ergonômico padrão:
        // Mão Esquerda: W, A, S, D (Cima, Esquerda, Baixo, Direita)
        // Mão Direita: J, K, L, Ç (X, Y, A, B)
        // Ombros: I (L) e O (R)
        const defaultControls = {
            "0":  { value: 186, value2: "BUTTON_2" },  // Ç → B
            "1":  { value: 75,  value2: "BUTTON_4" },  // K → Y
            "2":  { value: 16,  value2: "SELECT"   },  // Shift → Select
            "3":  { value: 13,  value2: "START"    },  // Enter → Start
            "4":  { value: 87,  value2: "DPAD_UP"           }, // W
            "5":  { value: 83,  value2: "DPAD_DOWN"         }, // S
            "6":  { value: 65,  value2: "DPAD_LEFT"         }, // A
            "7":  { value: 68,  value2: "DPAD_RIGHT"        }, // D
            "8":  { value: 76,  value2: "BUTTON_1" },  // L → A
            "9":  { value: 74,  value2: "BUTTON_3" },  // J → X
            "10": { value: 73,  value2: "LEFT_TOP_SHOULDER"  },  // I → L
            "11": { value: 79,  value2: "RIGHT_TOP_SHOULDER" }   // O → R
        };

        let userKeys = savedControls ? JSON.parse(savedControls) : null;
        const ejsControls = {};

        Object.keys(defaultControls).forEach(buttonId => {
            const raw = (userKeys && userKeys[buttonId] !== undefined && userKeys[buttonId] !== null)
                ? userKeys[buttonId]
                : defaultControls[buttonId].value;
            ejsControls[buttonId] = {
                value:  toEjsKey(raw),
                value2: defaultControls[buttonId].value2
            };
        });

        // RetroArch define 30 botões (IDs 0-29). O emulador itera todos os slots
        // de todos os jogadores; entradas undefined causam TypeError. Preenche
        // os botões 12-29 do jogador 0 e cria slots vazios para jogadores 1-3.
        const emptyBtn = { value: '', value2: '' };
        for (let i = 12; i < 30; i++) ejsControls[String(i)] = emptyBtn;

        const emptyPlayer = {};
        for (let i = 0; i < 30; i++) emptyPlayer[String(i)] = emptyBtn;

        window.EJS_defaultControls = {
            0: ejsControls,
            1: Object.assign({}, emptyPlayer),
            2: Object.assign({}, emptyPlayer),
            3: Object.assign({}, emptyPlayer),
        };
    } catch (e) {
        console.warn('Erro ao carregar ou injetar controles customizados:', e);
    }
    
    // Restaurar volume salvo pelo usuário
    const savedVol = localStorage.getItem('retroplay_volume');
    if (savedVol !== null) window.EJS_volume = parseFloat(savedVol);

    // Caminho da CDN estável oficial
    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
    
    // Callback que roda quando o jogo efetivamente começa
    window.EJS_onGameStart = function() {
        const loader = document.getElementById('player-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => { loader.remove(); }, 500);
        }

        // Assegurar mais uma vez que os arquivos foram gravados no FS se por acaso falhou antes
        if (core === 'psx') {
            writeVirtualFiles();
        }

        // Obter mapeamento de atalhos do emulador
        const savedControls = localStorage.getItem('retroplay_controls_' + core) || localStorage.getItem('retroplay_controls');
        let userKeys = null;
        try { if (savedControls) userKeys = JSON.parse(savedControls); } catch(e) {}

        const getHotkeyKeyCode = (id, defaultVal) => {
            const val = (userKeys && userKeys[id] !== undefined && userKeys[id] !== null)
                ? userKeys[id]
                : defaultVal;
            if (typeof val === 'string' && val.includes(';')) {
                return parseInt(val.substring(0, val.indexOf(';')));
            }
            return typeof val === 'number' ? val : parseInt(val);
        };

        const saveKeyCode = getHotkeyKeyCode("100", 49);   // 1
        const loadKeyCode = getHotkeyKeyCode("101", 50);   // 2
        const slotKeyCode = getHotkeyKeyCode("102", 51);   // 3
        const fastKeyCode = getHotkeyKeyCode("103", 52);   // 4
        const slowKeyCode = getHotkeyKeyCode("104", 53);   // 5
        const rewindKeyCode = getHotkeyKeyCode("105", 54); // 6

        let currentSlot = 1;
        const memorySaveSlots = {};
        let isSavingOrLoading = false;

        const performQuickSave = (slot) => {
            if (isSavingOrLoading) return;
            const gm = window.EJS_emulator && window.EJS_emulator.gameManager;
            if (!gm) {
                showToast('Emulador ainda não inicializado.');
                return;
            }
            if (typeof gm.supportsStates === 'function' && !gm.supportsStates()) {
                showToast('Este jogo/núcleo não suporta salvar estados.');
                return;
            }
            isSavingOrLoading = true;
            try {
                const stateData = gm.getState();
                if (stateData && stateData.length > 0) {
                    memorySaveSlots[slot] = stateData;
                    showToast(`Estado salvo no slot ${slot} ✓`);
                } else {
                    showToast(`Falha ao capturar estado no slot ${slot}.`);
                }
            } catch (err) {
                console.error('[RetroPlay] Erro ao salvar estado rápido:', err);
                showToast(`Erro ao salvar no slot ${slot}.`);
            } finally {
                setTimeout(() => { isSavingOrLoading = false; }, 300);
            }
        };

        const performQuickLoad = (slot) => {
            if (isSavingOrLoading) return;
            const gm = window.EJS_emulator && window.EJS_emulator.gameManager;
            if (!gm) {
                showToast('Emulador ainda não inicializado.');
                return;
            }
            const stateData = memorySaveSlots[slot];
            if (!stateData) {
                showToast(`Slot ${slot} está vazio! Salve primeiro.`);
                return;
            }
            isSavingOrLoading = true;
            try {
                gm.loadState(stateData);
                showToast(`Estado carregado do slot ${slot} ✓`);
            } catch (err) {
                console.error('[RetroPlay] Erro ao carregar estado rápido:', err);
                showToast(`Falha ao carregar estado do slot ${slot}.`);
            } finally {
                setTimeout(() => { isSavingOrLoading = false; }, 300);
            }
        };

        const simulateKey = (type, key, keyCode) => {
            const canvas = document.querySelector('canvas') || document.getElementById('game') || document;
            const event = new KeyboardEvent(type, {
                key: key,
                code: key === ' ' ? 'Space' : `Key${key.toUpperCase()}`,
                keyCode: keyCode,
                which: keyCode,
                bubbles: true,
                cancelable: true
            });
            canvas.dispatchEvent(event);
        };

        // Escutador de atalhos personalizados e F2/F4 legado
        document.addEventListener('keydown', function(e) {
            const gm = window.EJS_emulator && window.EJS_emulator.gameManager;
            if (!gm) return;

            // 1. Salvar Estado Rápido
            if (e.keyCode === saveKeyCode) {
                e.preventDefault();
                if (!e.repeat) performQuickSave(currentSlot);
                return;
            }

            // 2. Carregar Estado Rápido
            if (e.keyCode === loadKeyCode) {
                e.preventDefault();
                if (!e.repeat) performQuickLoad(currentSlot);
                return;
            }

            // 3. Trocar Slot
            if (e.keyCode === slotKeyCode) {
                e.preventDefault();
                if (!e.repeat) {
                    currentSlot = (currentSlot % 5) + 1;
                    const hasSave = !!memorySaveSlots[currentSlot];
                    showToast(`Slot alterado para: ${currentSlot} ${hasSave ? '(salvo)' : '(vazio)'}`);
                }
                return;
            }

            // 4. Avanço Rápido (Simula Space)
            if (e.keyCode === fastKeyCode) {
                e.preventDefault();
                if (!e.repeat) simulateKey('keydown', ' ', 32);
                return;
            }

            // 5. Câmera Lenta (Simula E)
            if (e.keyCode === slowKeyCode) {
                e.preventDefault();
                if (!e.repeat) simulateKey('keydown', 'e', 69);
                return;
            }

            // 6. Retroceder (Simula R)
            if (e.keyCode === rewindKeyCode) {
                e.preventDefault();
                if (!e.repeat) simulateKey('keydown', 'r', 82);
                return;
            }

            // Atalhos legados F2 / F4
            if (e.key === 'F2') {
                e.preventDefault();
                if (!e.repeat) {
                    if (e.shiftKey) {
                        openSaveModal();
                    } else {
                        performQuickSave(currentSlot);
                    }
                }
            } else if (e.key === 'F4') {
                e.preventDefault();
                if (!e.repeat) {
                    if (e.shiftKey) {
                        openSaveModal();
                    } else {
                        performQuickLoad(currentSlot);
                    }
                }
            }
        }, true);

        document.addEventListener('keyup', function(e) {
            // 4. Avanço Rápido (Simula Space up)
            if (e.keyCode === fastKeyCode) {
                e.preventDefault();
                simulateKey('keyup', ' ', 32);
                return;
            }

            // 5. Câmera Lenta (Simula E up)
            if (e.keyCode === slowKeyCode) {
                e.preventDefault();
                simulateKey('keyup', 'e', 69);
                return;
            }

            // 6. Retroceder (Simula R up)
            if (e.keyCode === rewindKeyCode) {
                e.preventDefault();
                simulateKey('keyup', 'r', 82);
                return;
            }
        }, true);

        // Persistência do volume — detecta mudanças e salva no localStorage
        let _lastVol = window.EJS_emulator.volume;
        setInterval(() => {
            if (!window.EJS_emulator) return;
            const v = window.EJS_emulator.volume;
            if (v !== _lastVol) { _lastVol = v; localStorage.setItem('retroplay_volume', String(v)); }
        }, 1500);

        // --- SISTEMA DE GESTÃO DE SAVES PERMANENTES NO BROWSER STORAGE ---
        const gameKey = title || rom;
        const modalBackdrop = document.createElement('div');
        modalBackdrop.className = 'save-modal-backdrop';
        modalBackdrop.innerHTML = `
            <div class="save-modal">
                <div class="save-modal-header">
                    <div class="save-modal-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                        Saves no Navegador (Persistente)
                    </div>
                    <button class="save-modal-close" id="btn-close-save-modal">&times;</button>
                </div>
                <div class="save-slots-grid" id="save-slots-container">
                    <!-- Gerado dinamicamente -->
                </div>
            </div>
        `;
        document.body.appendChild(modalBackdrop);

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'storage-btn-toggle';
        toggleBtn.title = 'Gerenciar saves salvos no navegador';
        toggleBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            <span>Saves</span>
        `;
        document.body.appendChild(toggleBtn);

        const updateSaveSlotsUI = async () => {
            const container = document.getElementById('save-slots-container');
            if (!container) return;
            container.innerHTML = '<div style="text-align:center;padding:20px;color:#888;">Carregando slots...</div>';

            const slotsData = await Promise.all([1, 2, 3].map(slot => getStoredState(gameKey, slot)));

            container.innerHTML = '';
            [1, 2, 3].forEach((slot, index) => {
                const save = slotsData[index];
                const card = document.createElement('div');
                card.className = 'save-slot-card';

                const dateStr = save && save.savedAt 
                    ? new Date(save.savedAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
                    : 'Vazio';

                const thumbHtml = save && save.screenshot
                    ? `<img src="${URL.createObjectURL(save.screenshot)}" alt="Slot ${slot}">`
                    : `<span>Vazio</span>`;

                card.innerHTML = `
                    <div class="save-slot-thumb">${thumbHtml}</div>
                    <div class="save-slot-info">
                        <div class="save-slot-label">Slot Permanente ${slot}</div>
                        <div class="save-slot-meta">${dateStr}</div>
                    </div>
                    <div class="save-slot-actions">
                        <button class="btn-slot btn-slot-save" data-action="save" data-slot="${slot}">Salvar</button>
                        <button class="btn-slot btn-slot-load" data-action="load" data-slot="${slot}" ${!save ? 'disabled' : ''}>Carregar</button>
                        <button class="btn-slot btn-slot-del" data-action="del" data-slot="${slot}" ${!save ? 'disabled' : ''} title="Apagar save">✕</button>
                    </div>
                `;

                // Ações dos botões
                card.querySelector('[data-action="save"]').addEventListener('click', async () => {
                    const gm = window.EJS_emulator && window.EJS_emulator.gameManager;
                    if (!gm) return;
                    try {
                        const stateData = gm.getState();
                        let screenshotBlob = null;
                        try {
                            const canvas = document.querySelector('canvas');
                            if (canvas) {
                                screenshotBlob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.8));
                            }
                        } catch(e) {}

                        await saveStoredState(gameKey, slot, stateData, screenshotBlob);
                        showToast(`Progresso salvo no Slot Permanente ${slot} ✓`);
                        updateSaveSlotsUI();
                    } catch(err) {
                        console.error(err);
                        showToast(`Erro ao salvar no slot ${slot}.`);
                    }
                });

                card.querySelector('[data-action="load"]').addEventListener('click', async () => {
                    const gm = window.EJS_emulator && window.EJS_emulator.gameManager;
                    if (!gm || !save) return;
                    try {
                        gm.loadState(save.data);
                        modalBackdrop.classList.remove('open');
                        showToast(`Slot Permanente ${slot} carregado com sucesso ✓`);
                    } catch(err) {
                        console.error(err);
                        showToast(`Erro ao carregar slot ${slot}.`);
                    }
                });

                card.querySelector('[data-action="del"]').addEventListener('click', async () => {
                    if (confirm(`Deseja apagar o save permanente do Slot ${slot}?`)) {
                        await deleteStoredState(gameKey, slot);
                        showToast(`Slot ${slot} apagado.`);
                        updateSaveSlotsUI();
                    }
                });

                container.appendChild(card);
            });
        };

        const openSaveModal = () => {
            updateSaveSlotsUI();
            modalBackdrop.classList.add('open');
        };

        const closeSaveModal = () => {
            modalBackdrop.classList.remove('open');
        };

        window.retroplay_openSaveModal = openSaveModal;

        toggleBtn.addEventListener('click', openSaveModal);
        document.getElementById('btn-close-save-modal').addEventListener('click', closeSaveModal);
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) closeSaveModal();
        });
    };

    // Callback se houver erro ou aviso
    window.EJS_onLoad = function() {
        const status = document.getElementById('loader-status');
        if (status) {
            status.innerText = 'Carregando núcleo RetroArch...';
        }
    };
    
    // Carregar o loader do EmulatorJS dinamicamente
    const loaderScript = document.createElement('script');
    loaderScript.src = 'https://cdn.emulatorjs.org/stable/data/loader.js';
    loaderScript.onerror = function() {
        updateLoaderText('Erro ao carregar o emulador da CDN. Verifique sua conexão.', true);
    };
    document.body.appendChild(loaderScript);
}
