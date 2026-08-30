# 📚 Lark Docs Kit

> System for managing technical documentation in Markdown format, drawing architecture diagrams via Draw.io MCP, and automatically synchronizing with Lark Docs via Lark CLI (`@larksuite/cli`).

---

## 🌟 Overview & Key Features

- **Standard 8-Document Architecture**: Pre-defined structure (`01-prd.md` to `08-project-roadmap.md`) covering business requirements, architecture, database ERD, API specs, code standards, UI/UX design, testing/CI-CD, and project roadmap.
- **Draw.io MCP Diagram Protocol**: Automatically draw system architecture, ERDs, sequence, and component diagrams strictly grounded in codebase & docs.
- **Automated CLI Export**: Export `.drawio` files to `.drawio.svg` (for Git repo) and **PNG Retina 2x** (for crisp rendering on Lark Docs).
- **Zero-Duplication Overwrite Sync**: Strict sync rules using `docs +update --command overwrite` to ensure documents are updated in place without creating duplicate files on Lark Drive.
- **Auto Mapping & Init**: Single-command initialization for new projects (`node scripts/sync.js --init <FOLDER_TOKEN>`) and one-command batch sync (`npm run sync`).

---

## 🤖 AI Agent Integration & Skills Usage

This repository is built with the **Antigravity Kit** structure in `.agents/`. AI Coding Agents (such as Google Antigravity, Gemini, and Claude) automatically discover and activate specialized domain skills when executing tasks:

### 🧩 Available Agent Skills

| Skill Name | Path | Description & Agent Capability |
| :--- | :--- | :--- |
| **`lark-docs`** | [`.agents/skills/lark-docs/SKILL.md`](./.agents/skills/lark-docs/SKILL.md) | Complete lookup reference for Lark CLI (`@larksuite/cli`) commands across 7 categories, and automated sync script usage (`scripts/sync.js`, `doc-mapping.json`). |
| **`drawio-diagrams`** | [`.agents/skills/drawio-diagrams/SKILL.md`](./.agents/skills/drawio-diagrams/SKILL.md) | Step-by-step guide for generating architecture/ERD/flow diagrams via Draw.io MCP, exporting SVG/PNG Retina 2x via `drawio-cli`, and embedding interactive edit links. |

### 💬 Sample Prompts for AI Agents

- **Create System Architecture Diagram**:
  > *"Agent, generate the System Container diagram using Draw.io MCP, export PNG Retina 2x, and update `docs/02-system-architecture.md`."*
- **Initialize a New Project on Lark**:
  > *"Agent, initialize all 8 project docs into Lark Drive folder token `fldcnXXXXXXXXX` and save the mapping."*
- **Update Documentation & Sync**:
  > *"Agent, update the API reference in `docs/04-codebase-api-reference.md` and sync changes to Lark Docs."*

---

## 📂 Repository Structure

```
lark-docs-kit/
├── .agents/                      # Antigravity Kit AI Agent Configuration
│   ├── rules/                    # Documentation management & execution rules
│   │   ├── documentation-management.md
│   │   ├── development-rules.md
│   │   └── primary-workflow.md
│   ├── skills/                   # Domain Skills for AI Agents
│   │   ├── lark-docs/SKILL.md    # Lark CLI & Sync skill
│   │   └── drawio-diagrams/SKILL.md # Draw.io MCP & diagram export skill
│   └── workflows/                # Executable Agent Workflows
│       ├── sync-docs.md          # Doc synchronization workflow
│       └── draw-diagram.md       # Diagram creation & export workflow
├── docs/                         # Technical Documentation Source (Markdown)
│   ├── 01-prd.md                 # Product Requirements Document — PRD
│   ├── 02-system-architecture.md # System Architecture & Design
│   ├── 03-database-design.md     # Database & Data Design
│   ├── 04-codebase-api-reference.md # Codebase & API Reference
│   ├── 05-development-standards.md # Development & Code Standards
│   ├── 06-ui-ux-design-system.md # UI/UX & Design System
│   ├── 07-testing-deployment.md # Testing & Deployment
│   ├── 08-project-roadmap.md     # Project Roadmap & Management
│   ├── doc-mapping.json          # Centralized Lark Document ID mapping
│   └── diagrams/                 # Draw.io source files (.drawio, .drawio.svg, .png)
├── scripts/                      # Automation Scripts
│   ├── sync.js                   # Node.js sync engine for Lark Docs
│   └── export-diagrams.sh        # Bash script for batch Draw.io diagram export
├── AGENTS.md                     # Agent workspace guidance
└── README.md                     # Project sitemap & guide
```

---

## 🚀 Quick Start Guide

### 1. Initialize a New Project on Lark Drive
Create a parent folder on Lark Drive for your project, copy its `FOLDER_TOKEN` (e.g. `fldcnXXXXXXXXX`), and run:

```bash
node scripts/sync.js --init <FOLDER_TOKEN>
```
*This automatically creates all 8 documents inside your Lark folder, extracts their Document IDs, and saves them to `docs/doc-mapping.json` & Markdown headers.*

---

### 2. Update & Synchronize Documentation
When updating local Markdown files in `./docs/`:

```bash
# Sync all modified documents to Lark Docs (overwrite in place)
npm run sync

# Or sync a single document (e.g., PRD)
node scripts/sync.js --doc 01-prd
```

---

### 3. Draw & Export Diagrams
1. Create/edit diagrams in `docs/diagrams/<name>.drawio` using Draw.io MCP.
2. Batch export all diagrams to SVG and PNG Retina 2x:
```bash
npm run export-diagrams
```
3. Embedded format in Markdown:
```markdown
![System Architecture](./diagrams/system-architecture.png)
[✏️ Edit Diagram in Draw.io](https://app.diagrams.net/?url=https://raw.githubusercontent.com/<org>/<repo>/main/docs/diagrams/system-architecture.drawio)
```

---

## 🛠️ Lark CLI Command Reference

For raw Lark CLI operations, refer to [`.agents/skills/lark-docs/SKILL.md`](./.agents/skills/lark-docs/SKILL.md):

| Category | CLI Command Syntax | Description |
| :--- | :--- | :--- |
| **Content Update** | `npx lark-cli docs +update --doc <DOC_ID> --command overwrite --doc-format markdown --content @<PATH>` | Overwrite document content in place |
| **Content Create** | `npx lark-cli docs +create --folder-token <FOLDER_ID> --doc-format markdown --content @<PATH>` | Create new document in folder |
| **Media Upload** | `npx lark-cli docs +media-insert --doc <DOC_ID> --file <PATH> --type image` | Embed image into document |
| **Permissions** | `npx lark-cli drive +member-add --token <DOC_ID> --member-type email --member-id user@company.com --perm edit` | Grant access permission |
