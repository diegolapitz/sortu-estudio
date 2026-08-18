# Graph Report - .  (2026-08-17)

## Corpus Check
- 7 files · ~7,957 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 42 nodes · 39 edges · 8 communities (6 shown, 2 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Handoff, identidad y releases
- Interacciones de la landing
- Manifiesto de Vite
- Portfolio y modal de reels
- Scripts de desarrollo
- Video y cursor del portfolio
- Hero y paleta responsive
- Formulario Formspree

## God Nodes (most connected - your core abstractions)
1. `scripts` - 4 edges
2. `safePlay()` - 4 edges
3. `Diseño aprobado por clienta` - 4 edges
4. `Reels publicados del portfolio` - 3 edges
5. `vite` - 2 edges
6. `observeVideos()` - 2 edges
7. `setupPortfolioCursor()` - 2 edges
8. `setupProjectDialog()` - 2 edges
9. `Handoff de la landing Sortu` - 2 edges
10. `Colaboración sin sorpresas` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Diseño aprobado por clienta` --references--> `Manual de identidad de Sortu`  [EXTRACTED]
  docs/LLM_HANDOFF.md → Manual de Identidad SORTU ESTUDIO (1).pdf
- `Contacto Formspree` --implements--> `Envío AJAX del formulario`  [EXTRACTED]
  docs/LLM_HANDOFF.md → src/main.js
- `Reels publicados del portfolio` --shares_data_with--> `Modal de reels`  [EXTRACTED]
  index.html → src/main.js
- `Diseño aprobado por clienta` --references--> `Tokens del sistema de diseño`  [EXTRACTED]
  docs/LLM_HANDOFF.md → README.md
- `Diseño aprobado por clienta` --implements--> `Paridad visual entre fundadoras`  [EXTRACTED]
  docs/LLM_HANDOFF.md → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Sistema visual aprobado de Sortu** — docs_llm_handoff_approved_design, manual_sortu_identity, manual_sortu_organic_language, readme_design_tokens, src_styles_responsive_hero [EXTRACTED 1.00]
- **Ciclo seguro de publicación** — docs_llm_handoff_safe_collaboration, docs_release_workflow_preview_gate, docs_release_workflow_master_production [EXTRACTED 1.00]

## Communities (8 total, 2 thin omitted)

### Community 0 - "Handoff, identidad y releases"
Cohesion: 0.22
Nodes (9): Diseño aprobado por clienta, Colaboración sin sorpresas, Handoff de la landing Sortu, Master representa producción, Puerta de aprobación Preview, Manual de identidad de Sortu, Lenguaje visual orgánico, Tokens del sistema de diseño (+1 more)

### Community 2 - "Manifiesto de Vite"
Cohesion: 0.25
Nodes (7): devDependencies, vite, name, private, type, version, vite

### Community 3 - "Portfolio y modal de reels"
Cohesion: 0.50
Nodes (4): Contrato de portfolio publicado, Estructura de la landing, Reels publicados del portfolio, Modal de reels

### Community 4 - "Scripts de desarrollo"
Cohesion: 0.50
Nodes (4): scripts, build, dev, preview

### Community 5 - "Video y cursor del portfolio"
Cohesion: 0.50
Nodes (4): observeVideos(), safePlay(), setupPortfolioCursor(), setupProjectDialog()

### Community 6 - "Hero y paleta responsive"
Cohesion: 0.67
Nodes (3): Paleta clara permanente, Forzado de paleta clara, Hero responsive por composición

## Knowledge Gaps
- **18 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `scripts` connect `Scripts de desarrollo` to `Manifiesto de Vite`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._