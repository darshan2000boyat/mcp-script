# Figma to Next.js Page Generator (Codex + Figma API)

This project automates UI page generation from Figma nodes into Next.js App Router pages.

It is designed for teams that want:
- Faster first-pass UI implementation
- Better fidelity with Figma frame structure
- A reusable generation workflow across multiple projects

## What this solves

Manual Figma-to-code implementation is slow and inconsistent, especially when many screens or revisions are involved.

This generator:
- Fetches selected nodes directly from Figma
- Builds a structured prompt with node details and layout hints
- Uses Codex CLI to generate TSX pages
- Writes output directly to `app/<route>/page.tsx`

In our usage, this reduced initial UI development effort by around **80%** for screen scaffolding and layout pass (before final polish/review).

## Why this is reliable

Reliability comes from explicit structure and deterministic inputs:
- Uses Figma API `/nodes` endpoint with explicit `fileId + node IDs`
- Sends full node summary + derived top-level layout hints (including row grouping)
- Enforces clear prompt rules (preserve layout relationships, keep text, use Tailwind mapping)
- Validates Codex output by checking generated file content
- Supports both Codex behaviors:
  - Writing code directly to disk
  - Returning code via stdout

This avoids brittle “single giant prompt with vague instructions” behavior.

## Why this is flexible

The script is loosely coupled and reusable:
- Configuration is environment-driven (no project hardcoding)
- `FIGMA_NODES` accepts multiple node IDs in one run
- Route generation is derived from frame names
- Works for one or many frames/nodes from the same Figma file
- Output is regular Next.js pages, so teams can refine manually after generation

You can adopt the same script in any Next.js project with minimal changes.

## Prerequisites

You must have all of the following:

1. **Node.js 18+** (recommended: Node 20+)
2. **Codex CLI installed and authenticated**  
   This is required because the generator calls:
   - `codex exec ...`
3. Figma personal access token with access to the target file
4. Project dependencies installed:

```bash
npm install
```

## Environment variables

Create/update `.env` with:

```env
FIGMA_ACCESS_TOKEN=your_figma_token
FIGMA_FILE_ID=your_figma_file_id
FIGMA_NODES=["91-170342","91-170500"]
ALLOW_TAILWIND_DEFAULT_FONT_SIZES=true
```

Notes:
- `FIGMA_NODES` uses `-` separator in env; script converts to `:` for Figma API.
- `ALLOW_TAILWIND_DEFAULT_FONT_SIZES`:
  - `true`: generator may use Tailwind text size classes
  - `false`: generator uses inline `style={{ fontSize }}` for strict control

## Run the generator

Preferred:

```bash
npm run figma:generate
```

Alternative:

```bash
node scripts/generate-from-figma.ts
```

If you use `node` directly, Node may warn about module type. That warning is non-blocking.

## Workflow

1. Read env (`FIGMA_FILE_ID`, `FIGMA_NODES`, token)
2. Fetch selected nodes from Figma API
3. Build reduced-but-structured node summary
4. Build top-level layout hints from `absoluteBoundingBox`
   - Captures child coordinates and dimensions
   - Derives row groupings and left-to-right order
5. Build a strict generation prompt
6. Execute Codex CLI to generate page component
7. Write output to `app/<route>/page.tsx`
8. Validate output includes `export default`

## Multi-frame / multi-node support

`FIGMA_NODES` can include many nodes from the same `FIGMA_FILE_ID`.

Example:

```env
FIGMA_NODES=["91-170342","91-170343","91-170344"]
```

For each node:
- Script resolves route from frame name
- Generates one page file:
  - `app/<derived-route>/page.tsx`

This allows batch generation of multiple screens in one run.

## Coupling and portability

This implementation is intentionally loosely coupled:
- No dependency on internal design system components
- No dependency on a single route map file
- No hardcoded Figma page/frame assumptions
- Prompt and generation logic are isolated inside one script

Porting to another Next.js repository usually requires only:
- Copying `scripts/generate-from-figma.ts`
- Installing deps
- Setting `.env`

## Expected output quality

This generator is optimized for:
- Pixel-close structure
- Correct row/column relationships
- Fast first usable implementation

Recommended team process:
- Generate
- Review against Figma
- Apply final semantic/accessibility and design-system refinements

## Troubleshooting

### `codex output looks invalid`
- Usually caused by CLI mode mismatch or incomplete response.
- Current script already handles direct file-write and stdout modes.
- Ensure Codex CLI is authenticated and working:
  ```bash
  codex --help
  ```

### `Missing FIGMA_*` errors
- Confirm `.env` values are present and valid.

### Network / DNS errors (`EAI_AGAIN`)
- Temporary connectivity issue to `api.figma.com`.
- Retry when network is stable.

### Node module-type warning
- Non-blocking.
- Optional fix: add `"type": "module"` in `package.json`.

## Proposal summary for platform adoption

This generator is a strong candidate for base project inclusion because it provides:
- Significant speedup for UI scaffolding (~80% effort reduction in initial pass)
- Better consistency between Figma and implementation
- A repeatable, low-coupling, environment-driven workflow
- Batch generation support for multi-node screens

## Key script

- `scripts/generate-from-figma.ts`
