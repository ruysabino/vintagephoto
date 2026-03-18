<div align="center">

# 📸 Polaroid Generator

**Transforme suas fotos em memórias retrô — com metadados EXIF, localização real e efeitos de filme.**

[![HTML](https://img.shields.io/badge/HTML-99.1%25-orange?style=flat-square)](https://github.com/ruysabino/vintagephoto)
[![JavaScript](https://img.shields.io/badge/JavaScript-0.9%25-yellow?style=flat-square)](https://github.com/ruysabino/vintagephoto)
[![PWA](https://img.shields.io/badge/PWA-instalável-5A0FC8?style=flat-square)](https://ruysabino.github.io/vintagephoto/)
[![License](https://img.shields.io/badge/licença-livre-green?style=flat-square)](#licença)

[**→ Abrir o app**](https://ruysabino.github.io/vintagephoto/)

</div>

---

## O que é isso?

O **Polaroid Generator** é uma aplicação web que recebe qualquer foto e a transforma em uma moldura polaroid personalizada, completa com metadados reais extraídos do arquivo (data, câmera, ISO, GPS) e efeitos visuais de filme analógico. Tudo roda no navegador — sem servidor, sem upload, sem dependências externas além de duas fontes e uma biblioteca EXIF.

---

## Funcionalidades

### Entrada de imagem
- **Drag & drop** direto na área de soltar
- **Upload via seletor** de arquivo (`input type="file"`)
- **Link do Google Photos** — suporte a links diretos e links de compartilhamento, com resolução automática via `og:image`
- **Proxy CORS configurável** para contornar restrições de cross-origin

### Metadados EXIF
A biblioteca `exifr` extrai automaticamente os seguintes campos do arquivo de imagem:

| Campo | Descrição |
|---|---|
| Data | `DateTimeOriginal`, `CreateDate` ou `ModifyDate` |
| Câmera | Fabricante e modelo do dispositivo |
| Lente | Modelo da lente, quando disponível |
| ISO | Sensibilidade da captura |
| Abertura | Valor f-stop formatado (ex.: `f/1.8`) |
| Exposição | Tempo de exposição (ex.: `1/250s`) |
| Focal | Comprimento focal em mm |
| GPS | Coordenadas brutas latitude/longitude |
| Localização | Endereço resolvido via geocodificação reversa |

### Modo WhatsApp
Ativa ao marcar "Foto vinda do WhatsApp". Neste modo:
- A data é inferida a partir do **nome do arquivo** (`IMG-20240317-WA0001.jpg`)
- A localização é omitida (marcada como desconhecida)
- Compatível com os padrões de nomenclatura do WhatsApp para Android e iOS

### Geocodificação reversa
Converte coordenadas GPS em endereço legível, com dois provedores à escolha:
- **OpenStreetMap / Nominatim** — gratuito, sem chave de API
- **Google Maps Geocoding API** — requer chave, retorna resultados mais precisos

Três formatos de exibição: curto (`Cidade, Estado, País`), médio (inclui bairro) e completo (endereço inteiro).

### Presets visuais

| Preset | Estilo | Efeitos |
|---|---|---|
| **Classic** | Warm ivory, Default retrô | Fita decorativa, inclinação suave |
| **Scrapbook** | Soft cream, Handwriting | Fita + grain + poeira de filme |
| **Cinema** | Dark frame, Typewriter | Sépia + grain + stamp + poeira |
| **Summer** | Classic white, Minimal | Sépia leve + fita |

### Efeitos opcionais
- **Filtro sépia** — processa pixel a pixel com matriz de conversão clássica
- **Textura de desgaste (grain)** — ruído aleatório aplicado sobre o canvas
- **Poeira de filme** — pontos brancos semi-transparentes espalhados pela imagem
- **Carimbo retrô** — selo "VINTAGE" em vermelho envelhecido, inclinado

### Tipografia
Quatro estilos de fonte para o texto da polaroid:

- `Default retrô` — título em Special Elite + corpo em Patrick Hand
- `Handwriting` — tudo em Patrick Hand (caligrafia)
- `Typewriter` — tudo em Special Elite (máquina de escrever)
- `Minimal clean` — tudo em Inter (contemporâneo)

### Orientação e moldura
- **Retrato** (1400 × 1700 px) — layout vertical clássico de polaroid
- **Paisagem** (1700 × 1400 px) — layout horizontal com painel lateral de texto
- **Tom da moldura:** Warm ivory, Classic white, Soft cream ou Dark frame

### Exportação
- Download direto em **PNG de alta resolução** (canvas nativo)
- Nome do arquivo gerado automaticamente a partir do título da polaroid e da orientação

### PWA — instalável
O app inclui `manifest.webmanifest` e `sw.js` com suporte a Service Worker. Pode ser instalado como app nativo em Android, iOS e desktop via Chrome/Edge, com ícones nos tamanhos 192 × 192 e 512 × 512.

---

## Como usar

Nenhuma instalação necessária. Acesse diretamente:

```
https://ruysabino.github.io/vintagephoto/
```

Ou rode localmente:

```bash
git clone https://github.com/ruysabino/vintagephoto.git
cd vintagephoto
# Abra index.html em qualquer navegador moderno
open index.html
```

> Recomenda-se servir via servidor local para que o Service Worker funcione corretamente:
> ```bash
> npx serve .
> # ou
> python3 -m http.server 8080
> ```

---

## Estrutura do projeto

```
vintagephoto/
├── index.html                          # App completo (HTML + CSS + JS inline)
├── sw.js                               # Service Worker para cache offline
├── manifest.webmanifest                # Manifesto PWA
├── favicon.svg                         # Favicon vetorial
├── icon-192.png                        # Ícone PWA 192 × 192
├── icon-512.png                        # Ícone PWA 512 × 512
├── polaroid_metadata_github_pages_index.html   # Versões anteriores / protótipos
├── polaroid_metadata_github_pages_index (1).html
├── polaroid_metadata_github_pages_index (2).html
└── README.md
```

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 Canvas API | Renderização da polaroid em tempo real |
| [exifr](https://github.com/MikeKovarik/exifr) | Leitura de metadados EXIF/GPS do arquivo |
| [Google Fonts](https://fonts.google.com) | Inter, Patrick Hand, Special Elite |
| Nominatim / OpenStreetMap | Geocodificação reversa gratuita |
| Google Maps Geocoding API | Geocodificação alternativa (opcional) |
| Service Worker + Web App Manifest | Suporte a PWA e uso offline |
| DOMParser | Extração de `og:image` de páginas do Google Photos |

Nenhum framework JavaScript. Sem build step. Um único arquivo HTML autocontido.

---

## Testes embutidos

O app executa uma bateria de `console.assert` na inicialização para validar funções críticas:

```
✓ Detecção de link direto vs. link compartilhado
✓ Formatação de data simples
✓ Parse de data a partir de nome de arquivo WhatsApp
✓ Dimensões corretas do canvas em retrato e paisagem
```

---

## Feito com

💙 por [ruysabino](https://github.com/ruysabino) — com auxílio de IA generativa.

---

## Licença

Uso livre. Sem licença formal definida — faça bom uso.
