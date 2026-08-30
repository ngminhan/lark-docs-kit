# Lark Docs Kit

System for managing technical documentation in Markdown format within Git, creating diagrams via Draw.io MCP, and synchronizing with Lark Docs via Lark CLI (`@larksuite/cli`).

## Document Hierarchy (`./docs/`)

- [`01-prd.md`](./docs/01-prd.md): Product Requirements Document — PRD
- [`02-system-architecture.md`](./docs/02-system-architecture.md): System Architecture & Design
- [`03-database-design.md`](./docs/03-database-design.md): Database & Data Design
- [`04-codebase-api-reference.md`](./docs/04-codebase-api-reference.md): Codebase & API Reference
- [`05-development-standards.md`](./docs/05-development-standards.md): Development & Code Standards
- [`06-ui-ux-design-system.md`](./docs/06-ui-ux-design-system.md): UI/UX & Design System
- [`07-testing-deployment.md`](./docs/07-testing-deployment.md): Testing & Deployment
- [`08-project-roadmap.md`](./docs/08-project-roadmap.md): Project Roadmap & Management
- [`diagrams/`](./docs/diagrams/): `.drawio` source files, `.drawio.svg`, and `.png` (Retina 2x) diagrams.

## Diagram Export Engine (`drawio-cli`)

1. Export SVG for repo docs:
   ```bash
   npx -y drawio-cli -x -f svg -o docs/diagrams/<name>.drawio.svg docs/diagrams/<name>.drawio
   ```
2. Export PNG Retina 2x for Lark Docs import:
   ```bash
   npx -y drawio-cli -x -f png --scale 2 -o docs/diagrams/<name>.png docs/diagrams/<name>.drawio
   ```

## Synchronization Protocol

To update an existing Lark document without creating duplicates:
```bash
npx lark-cli docs +update --doc <DOCUMENT_ID> --command overwrite --doc-format markdown --content @./docs/<FILENAME>.md
```
