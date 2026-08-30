# Documentation Management, Diagram & Lark Sync Rules

## 1. Overview & Standard Structure

All project documentation MUST be maintained as Markdown files inside the `./docs/` folder. Diagrams MUST be stored in `./docs/diagrams/`. The standard 8-document architecture is mandatory:

```
./docs/
├── 01-prd.md                     # Product Requirements Document — PRD
├── 02-system-architecture.md     # System Architecture & Design
├── 03-database-design.md         # Database & Data Design
├── 04-codebase-api-reference.md  # Codebase & API Reference
├── 05-development-standards.md  # Development & Code Standards
├── 06-ui-ux-design-system.md     # UI/UX & Design System
├── 07-testing-deployment.md     # Testing & Deployment
├── 08-project-roadmap.md         # Project Roadmap & Management
└── diagrams/                     # Draw.io source, SVG, and PNG files
    ├── <diagram-name>.drawio
    ├── <diagram-name>.drawio.svg
    └── <diagram-name>.png
```

---

## 2. Header Metadata & Version Control Rules

Every Markdown document in `./docs/` MUST start with standard header metadata:

```markdown
---
Title: [Document Title]
Version: v1.0.0
Last Updated: 2026-08-28 17:53:37
Lark Doc ID: [LARK_DOC_ID_OR_NONE]
Status: Draft | In Review | Approved
---
```

### Versioning Rules:
- **Major (v1.0.0 -> v2.0.0)**: Major architectural rewrites, breaking PRD changes.
- **Minor (v1.0.0 -> v1.1.0)**: Adding new use cases, new API endpoints, major section additions.
- **Patch (v1.0.0 -> v1.0.1)**: Typos, formatting fixes, minor parameter updates.
- Every update MUST increment version and log the current timestamp (`YYYY-MM-DD HH:mm:ss`).

---

## 3. Diagram Generation & Export Protocol (Draw.io)

### RULE 3.1: Source of Truth & Accuracy
- All diagrams MUST be generated using `drawio` MCP tools.
- Diagrams MUST be based strictly on existing code and documentation. **NEVER** hallucinate or invent unrelated architecture components.
- Source diagram file MUST be saved as `.drawio` XML format in `docs/diagrams/<name>.drawio`.

### RULE 3.2: CLI Export Engine
Convert `.drawio` source files using the `drawio-cli` Headless Puppeteer engine:

1. **SVG Export (for repository docs)**:
   ```bash
   npx -y drawio-cli -x -f svg -o docs/diagrams/<name>.drawio.svg docs/diagrams/<name>.drawio
   ```
2. **PNG Retina 2x Export (for Lark Docs import)**:
   ```bash
   npx -y drawio-cli -x -f png --scale 2 -o docs/diagrams/<name>.png docs/diagrams/<name>.drawio
   ```

### RULE 3.3: Diagram Embedding & Interactive Links
Every diagram embedded in Markdown documents MUST include both the image preview and a clickable direct edit link:

```markdown
![<Diagram Name>](./diagrams/<name>.png)
[✏️ Edit Diagram in Draw.io](https://app.diagrams.net/?url=https://raw.githubusercontent.com/org/repo/main/docs/diagrams/<name>.drawio)
```

---

## 4. Lark CLI Synchronization Protocol

When syncing documentation to Lark Docs, strictly follow these rules:

### RULE 4.1: Strict Update Preference (NO DUPLICATE CREATION)
- **DO NOT** create a new Lark Doc if the document already exists or has a `Lark Doc ID`.
- **ALWAYS** update existing documents directly using:
  ```bash
  npx lark-cli docs +update --doc <DOCUMENT_ID> --command overwrite --doc-format markdown --content @<FILE_PATH>
  ```
- **ONLY** execute `docs +create` if the file has never existed on Lark Docs (i.e. `Lark Doc ID` is unassigned).
- Immediately update the `Lark Doc ID` field in the local Markdown header after creating a new document.

### RULE 4.2: Media Upload for Lark
When uploading diagrams into Lark Docs via Lark CLI:
- Use `npx lark-cli docs +media-insert` to embed the PNG Retina 2x diagram image.
- Ensure the click-to-edit web link is included immediately below the diagram block.
