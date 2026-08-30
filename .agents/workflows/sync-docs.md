---
description: Workflow for updating and syncing local Markdown docs to Lark Docs via Lark CLI.
---

# Workflow: Sync Documentation to Lark Docs

Follow this workflow to update local documentation in `./docs/` and synchronize changes with Lark Docs using Lark CLI (`@larksuite/cli`).

## Step 1: Pre-flight Check
1. Verify document path inside `./docs/`.
2. Ensure file contains standard header metadata:
   ```markdown
   ---
   Title: <Document Title>
   Version: v<MAJOR>.<MINOR>.<PATCH>
   Last Updated: YYYY-MM-DD HH:mm:ss
   Lark Doc ID: <DOCUMENT_ID_OR_NONE>
   ---
   ```

## Step 2: Timestamp & Version Log
1. Increment version string (`Version: v1.0.1` -> `v1.1.0`).
2. Update timestamp using `date "+%Y-%m-%d %H:%M:%S"`.
3. Add changelog entry in the document section.

## Step 3: Synchronize via Lark CLI

### Case A: Document Already Exists (Has `Lark Doc ID`)
Execute direct overwrite update:
```bash
npx lark-cli docs +update --doc <DOCUMENT_ID> --command overwrite --doc-format markdown --content @./docs/<FILENAME>.md
```

### Case B: Document Does Not Exist Yet (No `Lark Doc ID`)
Execute document creation:
```bash
npx lark-cli docs +create --folder-token <FOLDER_ID> --doc-format markdown --content @./docs/<FILENAME>.md
```
Save returned document ID to `Lark Doc ID` in `./docs/<FILENAME>.md`.

## Step 4: Verification
Confirm sync success output from Lark CLI.
