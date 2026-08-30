---
description: Workflow for creating diagrams with Draw.io MCP and exporting SVG / PNG Retina 2x via drawio-cli.
---

# Workflow: Draw.io Diagram Creation & Export

Follow this workflow to create, convert, and embed diagrams into project documentation.

## Step 1: Draw Diagram via Draw.io MCP
1. Analyze existing codebase and documentation to extract entities, components, or flows.
2. Use `drawio` MCP tools (e.g. `open_drawio_mermaid`, `open_drawio_xml`, `set_page`) to generate the diagram.
3. Save the source XML file to `docs/diagrams/<name>.drawio`.

## Step 2: Headless Export to SVG and PNG Retina 2x
Execute `drawio-cli` commands:

```bash
# 1. Export SVG for repository docs
npx -y drawio-cli -x -f svg -o docs/diagrams/<name>.drawio.svg docs/diagrams/<name>.drawio

# 2. Export PNG Retina 2x for Lark Docs
npx -y drawio-cli -x -f png --scale 2 -o docs/diagrams/<name>.png docs/diagrams/<name>.drawio
```

## Step 3: Embed in Documentation
In your Markdown document in `./docs/`:

```markdown
![<Diagram Title>](./diagrams/<name>.png)
[✏️ Open & Edit Diagram in Draw.io](https://app.diagrams.net/?url=https://raw.githubusercontent.com/<org>/<repo>/main/docs/diagrams/<name>.drawio)
```

## Step 4: Sync to Lark Docs
Run Lark sync workflow:
```bash
npx lark-cli docs +update --doc <DOCUMENT_ID> --command overwrite --doc-format markdown --content @./docs/<DOCUMENT_FILE>.md
```
