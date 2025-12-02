# 🧩 Fviz  
**Engine de visualização para o ecossistema FLAZ / OGDC.**  
Mobile-first • Documentation-first • React / R3F • Dados 3D+t na Web

---

## 📌 Visão Geral

**Fviz** é a camada oficial de **visualização** do pipeline FLAZ / OGDC.  
Seu objetivo é direto:

> **Carregar dados geoespaciais/3D+t estruturados (FLAZ) diretamente da Web e renderizá-los de forma eficiente, fluida e elegante usando React + React Three Fiber.**

O Fviz **não** faz pré-processamento pesado — isso é função do FLAZ (Python).  
Ele é exclusivamente um **visualizador**: rápido, modular, expansível.

A arquitetura geral é:

`FLAZ (Python, ETLVA) → Fviz (JS/TS, Visualização) → FavelaVIZ (Aplicação)`


---

## ✨ Funcionalidades (v0.1)

- 📦 **Leitura binária FLAZ** (`.bin` + `.json`)
- ⚡ **Upload imediato para GPU** via TypedArrays
- 🧭 **Renderização em React Three Fiber**
- 📱 **Design mobile-first**
- 📚 **Fluxo documentation-first** (Docusaurus)
- 🌐 Compatível com **HTTP Range** para futuro streaming por tiles
- 🧱 Arquitetura limpa, moderna e modular

---

## 🎯 Objetivos

### Núcleo (agora)
- Carregar buffers binários do FLAZ pela Web  
- Renderizar nuvens de pontos em R3F  
- Expor uma API estável para aplicações (ex.: FavelaVIZ)

### Curto Prazo
- Suporte a FLAZ Tiles (streaming progressivo)  
- HUD / metadados  
- Colorbars e colormaps (escalas contínuas)  
- Controles de câmera otimizados para mobile  
- Painel de debug e inspeção

### Médio Prazo
- WebGPU experimental  
- Sombreamento avançado (normais, intensidade, altura)  
- Gaussian Splatting  
- Comparação multitemporal 3D+t

---

## 🏗️ Estrutura do Projeto

O Fviz utiliza **Vite + React + TypeScript** como base minimalista e moderna:

```
fviz/
├─ src/
│ ├─ core/ # loaders, leitores binários, utilidades
│ ├─ components/ # <PointCloud />, <Tile />, <Scene />
│ ├─ hooks/ # carregamento assíncrono, câmera, tiles
│ ├─ scenes/ # cenas prontas para uso
│ └─ index.ts
├─ public/
├─ docs/ # documentação-first (Docusaurus)
├─ package.json
├─ vite.config.ts
└─ README.md
```


---

## 🚀 Primeiros Passos

### Instalar

`npm install @fviz/core`


### Rodar localmente


O servidor abre normalmente em: `http://localhost:5173`


Com live-reload incluso.

---

## 🔍 Exemplo de uso: carregando um arquivo FLAZ

```tsx
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { loadFlaz } from "@fviz/core";
import { PointCloud } from "@fviz/components";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadFlaz("https://meu-bucket/sao_remo_2017")
      .then(setData);
  }, []);

  return (
    <Canvas>
      {data && <PointCloud data={data} />}
    </Canvas>
  );
}
```

## 📡 O que é FLAZ?

FLAZ é um formato binário geoespacial criado para:

- Nuvens de pontos massivas
- Dados LiDAR e 3D+t
- Indexação hierárquica (Morton/Hilbert)
- Carregamento rápido na GPU
- Operações HTTP Range
- Streaming por tiles

O Fviz é o visualizador oficial desses arquivos.

## 📘 Documentação

O projeto segue o princípio documentation-first.
A documentação vive em ./docs/ e usa Docusaurus.

Comandos:

```bash
npm run docs
npm run docs:build
```

---

## 🛤️ Roadmap

### v0.2

Tiles FLAZ (streaming progressivo)

LOD dinâmico

Painel de inspeção

### v0.3

WebGPU

Splatting e shaders avançados

Visualização temporal 3D+t

### v1.0

Integração completa com FavelaVIZ

Mobile HUD

Ferramentas de storytelling espacial

## 📄 Licença

O Fviz segue Apache 2.0 para bibliotecas,
com citação obrigatória da autoria do FLAZ e do Fviz.

## 🧪 Status

O Fviz está em desenvolvimento ativo, crescendo junto com
o formato FLAZ e com o aplicativo FavelaVIZ.