import "dotenv/config";
import fs from "fs-extra";
import path from "path";
import fetch from "node-fetch";
import { spawnSync } from "child_process";
import os from "os";

// ─── Env ─────────────────────────────────────────────────────────────────────

const {
  FIGMA_ACCESS_TOKEN,
  FIGMA_FILE_ID,
  FIGMA_NODES,
  ALLOW_TAILWIND_DEFAULT_FONT_SIZES,
} = process.env;

if (!FIGMA_ACCESS_TOKEN) throw new Error("Missing FIGMA_ACCESS_TOKEN");
if (!FIGMA_FILE_ID)      throw new Error("Missing FIGMA_FILE_ID");
if (!FIGMA_NODES)        throw new Error("Missing FIGMA_NODES");

// ─── Parse node IDs  (env stores "-" separator, Figma API needs ":") ─────────

const RAW_IDS: string[] = JSON.parse(FIGMA_NODES);
const FIGMA_IDS = RAW_IDS.map((id) => id.replace(/-/g, ":"));

// ─── Figma fetch ──────────────────────────────────────────────────────────────

interface FigmaNode     { document: Record<string, any> }
interface FigmaResponse { nodes: Record<string, FigmaNode> }

async function fetchFigmaNodes(): Promise<FigmaResponse> {
  const ids = FIGMA_IDS.join(",");
  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_ID}/nodes?ids=${encodeURIComponent(ids)}`;

  console.log(`\n→ Fetching Figma nodes: ${ids}`);

  const res  = await fetch(url, { headers: { "X-Figma-Token": FIGMA_ACCESS_TOKEN! } });
  const json: any = await res.json();

  if (!res.ok || json.err) throw new Error(`Figma API error: ${JSON.stringify(json)}`);
  return json as FigmaResponse;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function frameNameToRoute(name: string): string {
  return name
    .toLowerCase()
    .replace(/^\d+\s*/, "")
    .replace(/\s+v\d+$/i, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function summariseNode(node: Record<string, any>, depth = 0): Record<string, any> {
  const SKIP = new Set([
    "scrollBehavior", "interactions", "complexStrokeProperties",
    "layoutVersion", "absoluteRenderBounds", "effects",
    "blendMode", "clipsContent", "layoutGrids",
  ]);

  const out: Record<string, any> = {};

  for (const [k, v] of Object.entries(node)) {
    if (SKIP.has(k)) continue;
    if (k === "children" && Array.isArray(v)) {
      out.children = depth < 5
        ? v.map((c: any) => summariseNode(c, depth + 1))
        : v.map((c: any) => ({ id: c.id, name: c.name, type: c.type }));
      continue;
    }
    out[k] = v;
  }
  return out;
}

type BBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function getAbsoluteBox(node: Record<string, any>): BBox | null {
  const box = node?.absoluteBoundingBox ?? node?.absoluteRenderBounds;
  if (!box) return null;
  if (
    typeof box.x !== "number" ||
    typeof box.y !== "number" ||
    typeof box.width !== "number" ||
    typeof box.height !== "number"
  ) {
    return null;
  }
  return { x: box.x, y: box.y, width: box.width, height: box.height };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function buildTopLevelLayoutHints(doc: Record<string, any>): Record<string, any> {
  const children = Array.isArray(doc?.children) ? doc.children : [];

  const nodesWithBox = children
    .map((child: any) => {
      const box = getAbsoluteBox(child);
      if (!box) return null;
      return {
        id: child.id,
        name: child.name,
        type: child.type,
        layoutMode: child.layoutMode ?? null,
        x: round2(box.x),
        y: round2(box.y),
        width: round2(box.width),
        height: round2(box.height),
      };
    })
    .filter(Boolean) as Array<Record<string, any>>;

  const sorted = [...nodesWithBox].sort((a, b) => (a.y - b.y) || (a.x - b.x));

  // Group children into row bands using vertical center proximity.
  const rows: Array<{
    rowTop: number;
    rowBottom: number;
    centerY: number;
    children: Array<Record<string, any>>;
  }> = [];
  const ROW_CENTER_THRESHOLD = 12;

  for (const node of sorted) {
    const nodeCenter = node.y + node.height / 2;

    let matchedRow = rows.find((row) => {
      const overlap = Math.max(0, Math.min(node.y + node.height, row.rowBottom) - Math.max(node.y, row.rowTop));
      const minHeight = Math.min(node.height, row.rowBottom - row.rowTop);
      const overlapRatio = minHeight > 0 ? overlap / minHeight : 0;
      return Math.abs(nodeCenter - row.centerY) <= ROW_CENTER_THRESHOLD || overlapRatio >= 0.5;
    });

    if (!matchedRow) {
      matchedRow = {
        rowTop: node.y,
        rowBottom: node.y + node.height,
        centerY: nodeCenter,
        children: [],
      };
      rows.push(matchedRow);
    }

    matchedRow.children.push(node);
    matchedRow.rowTop = Math.min(matchedRow.rowTop, node.y);
    matchedRow.rowBottom = Math.max(matchedRow.rowBottom, node.y + node.height);
    matchedRow.centerY = round2((matchedRow.rowTop + matchedRow.rowBottom) / 2);
  }

  const rowHints = rows
    .sort((a, b) => a.rowTop - b.rowTop)
    .map((row, index) => ({
      rowIndex: index,
      yRange: [round2(row.rowTop), round2(row.rowBottom)],
      childIdsLeftToRight: row.children
        .sort((a, b) => a.x - b.x)
        .map((child) => child.id),
    }));

  return {
    topLevelChildren: nodesWithBox,
    rows: rowHints,
  };
}

// ─── Task prompt builder ──────────────────────────────────────────────────────

function buildTaskPrompt(
  nodeId: string,
  doc: Record<string, any>,
  outputPath: string
): string {
  const summary  = summariseNode(doc);
  const layoutHints = buildTopLevelLayoutHints(doc);
  const allowSizes = ALLOW_TAILWIND_DEFAULT_FONT_SIZES === "true";

  return `
# Task: Generate a Next.js 14 page from a Figma node

## Output file
Write the completed component to EXACTLY this path (create parent directories if needed):
${outputPath}

## Rules
1. Output ONLY valid TypeScript/TSX — no markdown fences, no commentary.
2. First line must be: // AUTO-GENERATED from Figma — do not edit manually
3. Use Next.js 14 App Router conventions (default export). Add "use client" only if hooks are needed.
4. Use Tailwind CSS for all styling.
   ${allowSizes ? "- You MAY use Tailwind font-size classes." : "- Do NOT use Tailwind font-size classes — use style={{ fontSize }} instead."}
5. Preserve Figma spatial layout exactly:
   - Keep each top-level child in the same visual row/column relationship as Figma.
   - If siblings are in the same row in Figma, they MUST be in the same row in output.
   - Use row wrappers ('flex flex-row') for siblings that share a row; do not fake row alignment with large left margins.
   - If a parent uses Auto Layout, follow it. If not, use a 'relative' parent + precise offsets from bounding boxes.
6. Map Figma layout to Tailwind:
   - layoutMode HORIZONTAL            → flex flex-row
   - layoutMode VERTICAL              → flex flex-col
   - primaryAxisAlignItems CENTER     → justify-center
   - counterAxisAlignItems CENTER     → items-center
   - padding values                   → p-* / px-* / py-* or inline style
   - itemSpacing                      → gap-*
7. Use 'absoluteBoundingBox' coordinates and sizes as source of truth for placement when Auto Layout is absent.
8. Convert Figma colors (r,g,b in 0–1 range) to hex: multiply each by 255 and convert.
9. For IMAGE fills, render a <div> with matching aspect ratio and neutral bg color.
10. Preserve all "characters" field text exactly.
11. Wrap the whole page in: <main className="w-full max-w-[1440px] mx-auto overflow-hidden">

## Figma node
Node ID   : ${nodeId}
Frame name: ${doc.name}

## Top-level layout hints (derived from absoluteBoundingBox)
${JSON.stringify(layoutHints, null, 2)}

## Full node summary
${JSON.stringify(summary, null, 2)}
`.trim();
}

// ─── Codex runner ─────────────────────────────────────────────────────────────

async function runCodex(taskPrompt: string, outputPath: string): Promise<void> {
  // Write prompt to a temp file — avoids all shell-escaping issues with quotes/newlines
  const tmpFile = path.join(os.tmpdir(), `figma-task-${Date.now()}.md`);
  fs.writeFileSync(tmpFile, taskPrompt, "utf8");
  const hadOutputFile = await fs.pathExists(outputPath);
  const beforeFileContent = hadOutputFile ? await fs.readFile(outputPath, "utf8") : "";

  console.log(`  ↳ Running codex → ${outputPath}`);

  const result = spawnSync(
    "codex",
    [
      "-a", "never",
      "--sandbox", "workspace-write",
      "exec",
      `Read the task description in the file ${tmpFile} and complete it exactly.`,
    ],
    {
      stdio: ["ignore", "pipe", "pipe"],
      encoding: "utf8",
      cwd: process.cwd(),
    }
  );

  fs.removeSync(tmpFile);

  if (result.status !== 0) {
    const err = result.stderr?.trim() || result.stdout?.trim() || "unknown error";
    throw new Error(`codex exited ${result.status}: ${err}`);
  }

  // Newer Codex flows may write directly to outputPath and print only a status message.
  if (await fs.pathExists(outputPath)) {
    const afterFileContent = await fs.readFile(outputPath, "utf8");
    const fileLooksValid = afterFileContent.includes("export default");
    const fileChanged = !hadOutputFile || afterFileContent !== beforeFileContent;

    if (fileLooksValid) {
      if (fileChanged) {
        console.log(`  ✓ Written by codex: ${outputPath}`);
      } else {
        console.log(`  ✓ Verified existing output: ${outputPath}`);
      }
      return;
    }
  }

  // Codex prints generated code to stdout — capture, clean, and write to disk
  const raw = (result.stdout ?? "").trim();
  const code = raw
    .replace(/^```(?:tsx?|jsx?|typescript)?\n?/i, "")
    .replace(/\n?```$/i, "")
    .trim();

  if (!code.includes("export default")) {
    const stderrPreview = (result.stderr ?? "").trim().slice(0, 300);
    throw new Error(
      `codex output looks invalid. Stdout preview: ${code.slice(0, 300)}${stderrPreview ? ` | Stderr preview: ${stderrPreview}` : ""}`
    );
  }

  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, code, "utf8");
  console.log(`  ✓ Written: ${outputPath}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== Figma → Next.js (via Codex CLI) ===");
  console.log(`File ID : ${FIGMA_FILE_ID}`);
  console.log(`Nodes   : ${FIGMA_IDS.join(", ")}\n`);

  const { nodes } = await fetchFigmaNodes();

  for (const figmaId of FIGMA_IDS) {
    const nodeData = nodes[figmaId];

    if (!nodeData) {
      console.warn(`⚠  Node ${figmaId} not found — skipping.`);
      continue;
    }

    const doc        = nodeData.document;
    const route      = frameNameToRoute(doc.name);
    const outputPath = path.join(process.cwd(), "app", route, "page.tsx");

    console.log(`\n[${figmaId}] "${doc.name}" → app/${route}/page.tsx`);

    try {
      const prompt = buildTaskPrompt(figmaId, doc, outputPath);
      await runCodex(prompt, outputPath);
    } catch (err) {
      console.error(`✗ Failed for ${figmaId}:`, err);
    }
  }

  console.log("\n=== Done ===");
}

main();
