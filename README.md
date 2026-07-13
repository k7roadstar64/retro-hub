# RetroPlay Hub 🎮

Um hub de retrogames moderno e responsivo rodando diretamente no seu navegador, desenvolvido sobre o projeto de código aberto **EmulatorJS** (com núcleos compilados em WebAssembly/RetroArch).

## 🚀 Recursos

- **Visual Gamer Premium:** Interface escura estilizada com tons neon (pink, fuchsia, cyan e purple), transições fluidas e efeitos de fundo dinâmicos.
- **Isolamento de Emulador:** O emulador roda dentro de um `iframe` seguro, evitando vazamentos de memória WebAssembly e conflito de escopo global.
- **Upload de ROM Local:** Aceita arquivos descompactados (`.nes`, `.smc`, `.gba`, `.md`, etc.) com auto-detecção instantânea ou arquivos compactados (`.zip`), exibindo um seletor visual interativo de console para carregar o emulador correto.
- **Buscador Online (Archive.org):** Faça buscas de jogos diretamente no banco de dados livre do Internet Archive, liste os arquivos de ROMs e jogue com um único clique.
- **Biblioteca de Favoritos:** Salve seus clássicos preferidos no seu navegador para acesso rápido offline (persistido via `localStorage`).
- **Controles & Save States:** Customização de controles internos, suporte a gamepads USB/Bluetooth e save states rápidos embutidos no painel do emulador.

## 📂 Estrutura do Projeto

- `index.html`: Página principal contendo o Hub de jogos, buscador e favoritos.
- `style.css`: Estilização principal e responsiva do Hub.
- `app.js`: Lógica de gerenciamento do estado da aplicação, upload local e integração com a API do Archive.org.
- `player.html`: Executável estático do emulador carregado pelo iframe de forma isolada.
- `player.css`: Estilização e carregador (spinner neon) do emulador.
- `player.js`: Configuração do EmulatorJS e hooks de controle.

## 🖥️ Como Executar

Para rodar a aplicação localmente e evitar restrições de CORS ao carregar arquivos locais, execute um servidor estático simples na pasta do projeto:

```bash
# Usando http-server do NodeJS:
npx http-server -p 3000

# Ou usando Python:
python3 -m http.server 3000
```

Abra o seu navegador em [http://localhost:3000](http://localhost:3000).

---
*RetroPlay Hub foi desenvolvido em parceria com Antigravity.*
