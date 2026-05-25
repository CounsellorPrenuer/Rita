import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(".");
const distDir = resolve("dist/public");

if (!existsSync(resolve(distDir, "index.html"))) {
  console.error("Missing dist/public build. Run: npm run build:static");
  process.exit(1);
}

for (const name of readdirSync(root)) {
  if (name === "assets" && existsSync(resolve(root, "assets"))) {
    rmSync(resolve(root, "assets"), { recursive: true, force: true });
  }
}

for (const name of readdirSync(distDir)) {
  const from = resolve(distDir, name);
  const to = resolve(root, name);
  cpSync(from, to, { recursive: true });
}

console.log("Deployed static artifacts to repository root.");
