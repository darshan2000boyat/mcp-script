import "dotenv/config";
import OpenAI from "openai";
import fs from "fs-extra";
import path from "path";
import fetch from "node-fetch";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const {
  FIGMA_ACCESS_TOKEN,
  FIGMA_FILE_ID,
  ALLOW_TAILWIND_DEFAULT_FONT_SIZES,
} = process.env;

async function fetchFigma() {
  const res = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE_ID}`,
    {
      headers: {
        "X-Figma-Token": FIGMA_ACCESS_TOKEN!,
      },
    }
  );

  const json: any = await res.json();

  // Extract only top-level frames (reduces tokens massively)
  const pages = json.document.children;

  const frames: any[] = [];

  for (const page of pages) {
    for (const node of page.children) {
      if (node.type === "FRAME") {
        frames.push({
          name: node.name,
          layoutMode: node.layoutMode,
          children: node.children?.map((c: any) => ({
            type: c.type,
            name: c.name,
          })),
        });
      }
    }
  }

  return frames;
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function generatePage(frame: any) {
  const prompt = `
Generate Next.js 14 App Router page.

Frame:
${JSON.stringify(frame)}

Tailwind font rule:
ALLOW_DEFAULT = ${ALLOW_TAILWIND_DEFAULT_FONT_SIZES}

Output ONLY:

// FILE: app/<route>/page.tsx
...code...
`;

  const res = await openai.responses.create({
    model: "gpt-4o-mini", // cheaper model
    input: prompt,
    max_output_tokens: 1500,
  });

  return res.output_text;
}

async function writeFiles(output: string) {
  const regex =
    /\/\/ FILE:\s*(.+?)\n([\s\S]*?)(?=\/\/ FILE:|$)/g;

  let match;

  while ((match = regex.exec(output)) !== null) {
    const filePath = match[1].trim();
    const content = match[2];

    const fullPath = path.join(process.cwd(), filePath);

    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, content);

    console.log("Created:", filePath);
  }
}

async function main() {
  console.log("Fetching Figma...");
  const frames = await fetchFigma();

  for (const frame of frames) {
    console.log("Generating:", frame.name);

    const output = await generatePage(frame);

    if (output) {
      await writeFiles(output);
    }
  }

  console.log("Done.");
}

main();