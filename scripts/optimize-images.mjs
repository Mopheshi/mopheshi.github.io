#!/usr/bin/env node
// One-shot image optimizer: generates resized .webp variants in src/imports/.
// Run with: npm run optimize:images

import sharp from "sharp";
import { existsSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(HERE, "../src/imports");

const targets = [
  { in: "vancus.png", out: "vancus.webp", maxWidth: 1200, quality: 82 },
  { in: "vaultsplit.png", out: "vaultsplit.webp", maxWidth: 1200, quality: 82 },
  { in: "paysphere.png", out: "paysphere.webp", maxWidth: 1200, quality: 82 },
  { in: "workspace.jpg", out: "workspace.webp", maxWidth: 1200, quality: 80 },
  { in: "ndachimya.JPG", out: "ndachimya.webp", maxWidth: 720, quality: 85 },
];

const kb = (b) => (b / 1024).toFixed(0);

console.log(`Optimising images in ${SRC}\n`);

for (const t of targets) {
  const input = resolve(SRC, t.in);
  const output = resolve(SRC, t.out);

  if (!existsSync(input)) {
    console.log(`skip ${t.in} (not found)`);
    continue;
  }

  const before = statSync(input).size;
  await sharp(input)
    .resize({ width: t.maxWidth, withoutEnlargement: true })
    .webp({ quality: t.quality, effort: 6 })
    .toFile(output);
  const after = statSync(output).size;
  const pct = Math.round((1 - after / before) * 100);
  console.log(`${t.in.padEnd(18)} → ${t.out.padEnd(18)}  ${kb(before).padStart(5)} KB → ${kb(after).padStart(5)} KB  (-${pct}%)`);
}

console.log("\nDone. Update imports to reference the .webp files.");
