<div align="center">

# 📸 Vintage Photo Generator

**Transforme suas fotos em quadros instantâneos retrô — com metadados EXIF, localização real e efeitos de filme.**

[![License](https://img.shields.io/badge/licen%C3%A7a-MIT-green?style=flat-square)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-instal%C3%A1vel-5A0FC8?style=flat-square)](https://ruysabino.github.io/vintagephoto/)
[![Privacidade](https://img.shields.io/badge/processamento-100%25%20local-blue?style=flat-square)](#privacidade)

[**→ Abrir o app**](https://ruysabino.github.io/vintagephoto/)

</div>

> **Aviso de marca:** projeto independente, sem afiliação com a Polaroid IP B.V. ou qualquer fabricante de câmeras instantâneas. "Instantânea", "retrô" e "vintage" descrevem apenas o estilo visual.

---

## O que é

Aplicação web de arquivo único que recebe uma foto e gera um quadro instantâneo estilizado, com metadados reais do arquivo (data, câmera, ISO, GPS) e efeitos de filme analógico. Roda inteiramente no navegador — sem servidor, sem upload, sem build step.

Interface em **6 idiomas**: PT · EN · ES · FR · DE · IT.

---

## Funcionalidades

- **Entrada**: drag & drop ou seletor de arquivo
- **EXIF**: data, câmera, lente, ISO, abertura, exposição, focal, GPS
- **Modo WhatsApp**: data inferida do nome do arquivo (`IMG-20240317-WA0001.jpg`), localização omitida
- **Geocodificação reversa** via OpenStreetMap/Nominatim (opcional, pode ser desativada)
- **Presets visuais**: Classic, Scrapbook, Cinema, Summer
- **Efeitos**: sépia, grain, poeira de filme, carimbo retrô
- **Tipografia**: retrô, manuscrita, máquina de escrever, minimalista
- **Orientação**: retrato (1400 × 1700) ou paisagem (1700 × 1400)
- **Exportação**: PNG de alta resolução
- **PWA instalável** com cache offline

---

## Privacidade

- As fotos **nunca saem do dispositivo** — todo o processamento usa a Canvas API local.
- As **fontes são auto-hospedadas** (`fonts/`): nenhuma requisição a `fonts.googleapis.com` / `fonts.gstatic.com`, evitando a transferência de IPs para terceiros (relevante sob o RGPD/GDPR).
- A **biblioteca EXIF é local** (`vendor/`): sem CDN de terceiros e sem versão flutuante.
- A **única** chamada externa possível é ao Nominatim (OpenStreetMap), somente quando a foto tem GPS e a geocodificação está ativada. Selecione "Desativado" para uso 100% offline.

---

## Como usar

```bash
git clone https://github.com/ruysabino/vintagephoto.git
cd vintagephoto
python3 -m http.server 8080   # ou: npx serve .
```

Servir via HTTP local é necessário para o Service Worker funcionar.

---

## Estrutura

```
vintagephoto/
├── index.html                 # App completo (HTML + CSS + JS inline, i18n)
├── sw.js                      # Service Worker (cache same-origin)
├── manifest.webmanifest       # Manifesto PWA
├── favicon.svg · icon-192.png · icon-512.png
├── fonts/                     # Fontes auto-hospedadas + OFL.txt
├── vendor/                    # exifr 7.1.3 (MIT) + licença
├── LICENSE                    # MIT
└── NOTICE                     # Atribuições de terceiros e marcas
```

---

## Licenças de terceiros

| Componente | Licença | Observação |
|---|---|---|
| [exifr 7.1.3](https://github.com/MikeKovarik/exifr) | MIT | Compatível com MIT; cópia local em `vendor/` |
| DM Serif Display, Caveat, Special Elite, Courier Prime | SIL OFL 1.1 | Auto-hospedadas; `fonts/OFL.txt` |
| Nominatim / OpenStreetMap | ODbL 1.0 | Atribuição exibida no rodapé do app |

Detalhes completos em [`NOTICE`](NOTICE).

---

## Licença

[MIT](LICENSE) © 2026 Ruy Sabino Pereira
