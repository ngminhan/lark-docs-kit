# 📚 Lark Docs Kit

> Agent-First Documentation & Diagram Automation System. Manages technical documentation in Markdown format, draws architecture diagrams via Draw.io MCP, and automatically synchronizes with Lark Docs via Lark CLI (`@larksuite/cli`).

---

## 🤖 Agent-First Operating Paradigm

**You don't need to learn or run complex CLI commands.** 

`Lark Docs Kit` is powered by the **Antigravity Kit** agent framework in `.agents/`. All operations—creating documents, drawing aesthetic diagrams, compiling high-res assets, and synchronizing with Lark Drive—are handled **autonomously by your AI Coding Agent** (Google Antigravity, Gemini IDE, Claude Code) through natural language prompts.

---

## 🛠️ One-Time Environment Setup

Before issuing prompts to your AI Agent, complete these one-time environment setup steps:

### 1. Install Dependencies
```bash
npm install
```

### 2. Authenticate Lark CLI
Install Lark CLI globally and log in to your Lark / Feishu account:
```bash
npm install -g @larksuite/cli
lark-cli auth login
```

### 3. Register Draw.io MCP Server (For AI Agents)
Add the `drawio` MCP server to your IDE or Agent configuration (e.g. `~/.gemini/antigravity-ide/mcp_config.json` or `.agents/mcp_config.json`):

```json
{
  "mcpServers": {
    "drawio": {
      "command": "npx",
      "args": ["-y", "@drawio/mcp-server"]
    }
  }
}
```

---

## 💬 How to Interact with Your AI Agent (Sample Prompts)

Just give natural language instructions to your AI Agent in chat:

### 🚀 Initialize a New Project on Lark Drive
> *"Agent, initialize all 8 project docs on Lark Drive."*  
*(Or give a folder name/link: "Agent, initialize docs in my Lark folder 'Shiori Docs' or folder URL...")*
- **What Agent Does**: 
  - If a folder URL/name is provided: Automatically searches for the folder token using `lark-cli drive +search` or parses the URL.
  - If no folder is provided: Runs `node scripts/sync.js --init` to **automatically create a new folder** on your Lark Drive, creates all 8 standard documents inside it, and saves the document IDs to `docs/doc-mapping.json`.
  - If OAuth scope approval is needed, presents a verification QR code and login link for one-click confirmation.



### 📝 Write or Update Technical Documentation
> *"Agent, write the Product Requirements Document (PRD) for my new project in `docs/01-prd.md` and sync it to Lark."*
- **What Agent Does**: Fills out `docs/01-prd.md` following standard templates, updates metadata (`Version`, `Last Updated`), and syncs changes to Lark Docs.

### 🎨 Draw Architecture & ERD Diagrams
> *"Agent, draw the System Architecture diagram and Database ERD using Draw.io MCP, export PNG Retina 2x, and update `docs/02-system-architecture.md` and `docs/03-database-design.md`."*
- **What Agent Does**: Uses `drawio` MCP tools to generate XML definitions in `docs/diagrams/`, applies the **Aesthetic Design System** (`classDef` color coding per layer, rounded corners `rx=10, ry=10`), compiles SVG & PNG Retina 2x via `npm run export-diagrams`, embeds interactive edit links, and syncs image blocks in-place on Lark Docs.

### 🔄 Sync All Documentation Changes
> *"Agent, sync all modified documentation files and diagrams to Lark Docs."*
- **What Agent Does**: Executes `npm run sync` to overwrite update all local Markdown files to their corresponding Lark Docs without creating duplicate files.

---

## 📂 Repository Structure & Agent Kit Sitemap

```
lark-docs-kit/
├── .agents/                      # AI Agent Customizations & Kit
│   ├── rules/                    # Core Agent Execution Rules
│   │   ├── primary-workflow.md   # 4-Phase Agent Execution Algorithm
│   │   ├── documentation-management.md # 8-Doc architecture & sync rules
│   │   └── development-rules.md  # Zero-hallucination & verification rules
│   ├── skills/                   # Domain Skills for AI Agents
│   │   ├── lark-docs/SKILL.md    # Lark CLI & sync skill reference
│   │   ├── drawio-diagrams/SKILL.md # Draw.io MCP & diagram export skill
│   │   └── aesthetic/SKILL.md    # Aesthetic UI/UX & diagram design guidelines
│   └── workflows/                # Executable Agent Workflows
│       ├── sync-docs.md          # Doc synchronization workflow
│       ├── draw-diagram.md       # Diagram creation & export workflow
│       └── use-mcp.md            # MCP tool execution workflow
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
├── scripts/                      # Automated Engines for Agents
│   ├── sync.js                   # Node.js sync engine for Lark Docs
│   └── export-diagrams.js        # Node.js export engine for Draw.io diagrams
├── AGENTS.md                     # Agent workspace guidance
└── README.md                     # Project sitemap & prompt guide
```
