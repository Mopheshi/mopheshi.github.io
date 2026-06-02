#!/usr/bin/env node
// Force-publish dist/ to origin/main as an orphan commit.
// Mirrors what .github/workflows/deploy.yml does, so we can ship without CI
// (e.g. while GitHub Actions is blocked on billing).

import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const DIST = resolve(ROOT, "dist");

function run(cmd, cwd = ROOT) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { cwd, stdio: "inherit" });
}

function capture(cmd, cwd = ROOT) {
  try {
    return execSync(cmd, { cwd }).toString().trim();
  } catch {
    return "";
  }
}

const remote = capture("git config --get remote.origin.url");
if (!remote) {
  console.error("No origin remote configured. Run `git remote add origin <url>` first.");
  process.exit(1);
}

const sha = capture("git rev-parse --short HEAD") || "unknown";
const name = capture("git config user.name") || "deploy";
const email = capture("git config user.email") || "deploy@local";

console.log(`Deploying master ${sha} to ${remote} (branch: main)\n`);

run("npm run build");

if (existsSync(resolve(DIST, ".git"))) {
  rmSync(resolve(DIST, ".git"), { recursive: true, force: true });
}

run("git init -b main", DIST);
run("git add -A", DIST);
run(
  `git -c user.email="${email}" -c user.name="${name}" commit -m "Deploy from local: master ${sha}"`,
  DIST,
);
run(`git remote add origin ${remote}`, DIST);
run("git push origin main --force", DIST);

rmSync(resolve(DIST, ".git"), { recursive: true, force: true });

console.log("\nDeployed. Live at https://mopheshi.github.io within a minute or two.");
