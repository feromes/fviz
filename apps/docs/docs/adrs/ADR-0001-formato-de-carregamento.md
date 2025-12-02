---
id: ADR-0001-formato-de-carregamento
title: ADR-0001 — Formato de Carregamento
sidebar_label: ADR-0001
---

# ADR-0001 — Formato de carregamento do FLAZ no Fviz (v0.1)

**Data:** 2025-12-02  
**Status:** Aceita  
**Decisão:** Implementada  

---

## 🎯 Contexto

O Fviz é a camada de visualização do ecossistema FLAZ/OGDC.  
Ele precisa carregar dados geoespaciais massivos (milhões de pontos) diretamente da Web de forma eficiente, estável e compatível com dispositivos móveis.

Formatos como Parquet/Arrow são excelentes para ETL, mas não para renderização no navegador sem WASM pesado.  
Logo, o Fviz necessita de um formato binário otimizado para leitura direta via TypedArrays.

---

## 🧩 Decisão

O Fviz irá adotar o formato **FLAZ binário (v0.1)** como padrão de carregamento:

- `arquivo.bin` contendo os arrays contínuos (X, Y, Z, classificação, etc.)
- `arquivo.json` contendo metadados (offsets, tipos, tamanhos)
- Carregamento via `fetch(url).arrayBuffer()`
- Interpretação direta via TypedArrays (zero-cópia)
- Upload imeditado para GPU (BufferGeometry / R3F)

---

## 📦 Estrutura do FLAZ (v0.1)

`[ X ][ Y ][ Z ][ Classification ]`

Metadados exemplo:

```json
{
  "version": "flaz-0.1",
  "schema": {
    "X": { "dtype": "float32", "offset": 0, "length": 1048576 },
    "Y": { "dtype": "float32", "offset": 4194304, "length": 1048576 },
    "Z": { "dtype": "float32", "offset": 8388608, "length": 1048576 },
    "Classification": { "dtype": "uint16", "offset": 12582912, "length": 1048576 }
  }
}
```

## 💡 Alternativas Consideradas

### ❌ Parquet / Arrow IPC no navegador

- Requer WASM pesado
- Parsing lento
- Não suporta streaming granular

### ❌ PLY / LAS / LAZ

- Estrutura rígida
- LAZ requer LASzip/WASM
- Sem alinhamento com pipeline ETLVA

### ✔️ FLAZ binário (escolhido)

- Simples
- Rápido
- Zero parsing
- Zero cópia
- GPU-friendly
- Compatível com HTTP Range
- Ideal para futura evolução com tiles

## 🔍 Consequências

### Positivas

- Carregamento extremamente rápido
- Upload instantâneo para GPU
- Código simples e sustentável
- Base para futura arquitetura de tiles (FLAZ-Tile)
- Perfeito para mobile

### Negativas

- Requer geração prévia pelo backend (FLAZ-Python)

## 🔮 Próximos Passos

- Definir FLAZ Tile v0.1
- Implementar stream incremental no Fviz
- Suporte a Morton 3D e LOD