# FVIZ

Engine de visualização do Ecossistema FLAZ / OGDC

## Organização do código

# 🌐 Estrutura inicial de diretórios — FVIZ

```bash
fviz/
├── apps/
│   └── web/                     # Aplicação principal (Next.js ou Vite + React)
│       ├── public/              # Estáticos (ícones, manifest, assets)
│       ├── src/
│       │   ├── components/
│       │   │   ├── ui/          # Botões, painéis, HUDs, sliders, dropdowns, DaisyUI
│       │   │   ├── layout/      # Navbar, Sidebar, Footer, MobileLayout
│       │   │   ├── scene/       # Componentes 3D (Câmera, Orbit, Cubo, Cena)
│       │   │   │   └── shaders/ # GLSL (point shaders, HAG, MDT, etc.)
│       │   ├── state/
│       │   │   ├── store.ts     # Zustand global (favela, ano, shader, arrowTable...)
│       │   │   └── slices/      # Divisão por fatias (UI, Scene, Data)
│       │   ├── loaders/
│       │   │   ├── loadArrow.ts # Carrega dados Arrow/FLAZ em workers ou fetch
│       │   │   ├── loadFavela.ts
│       │   │   └── workers/     # WebWorkers para parsing pesado
│       │   ├── hooks/
│       │   │   ├── useAutoFit.ts
│       │   │   └── useSceneEvents.ts
│       │   ├── pages/           # No caso de Next.js (ou routes/ no caso do Vite)
│       │   ├── styles/          # Tailwind/DaisyUI configs
│       │   └── lib/             # Funções utilitárias independentes (maths, BB, Morton)
│       ├── package.json
│       └── vite.config.ts / next.config.js
│
├── workers/                     # Cloudflare Workers (API estática + endpoints)
│   ├── api/
│   │   ├── favelas.json         # Exposto como endpoint simples
│   │   └── meta/                # Metadados por favela
│   └── wrangler.toml
│
├── flaz/                         # Futuro: integração leve com o FLAZ (TS reader)
│   └── index.ts
│
├── docs/                         # Documentação (Docusaurus ou markdown solto)
│   ├── adr/
│   │   ├── ADR-0000-manifesto.md
│   │   └── ADR-0001-mobile-first.md
│   └── arquitetura/
│
├── tests/
│   └── e2e/                      # Testes de navegação e carregamento
│
├── .github/
│   └── workflows/               # CI/CD (build, lint, preview)
│
├── package.json
└── README.md
```

## ✨ Filosofia

* **components/ui** → tudo o que é 2D e DaisyUI
* **components/scene** → tudo o que é 3D (R3F + Three.js)
* **state/** → Zustand centralizado e modular
* **loaders/** → carregamento de dados (Arrow, FLAZ)
* **workers/** → API simples e stateless via Cloudflare
* **docs/adr** → decisões arquiteturais documentadas

Essa estrutura já suporta:

* Mobile-first
* Cenas 3D independentes
* Multi-favela
* Multi-shader
* APIs estáticas
* Evolução para o FLAZ/OGDC
