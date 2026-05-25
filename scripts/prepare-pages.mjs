import { copyFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve("dist/public");
copyFileSync(resolve(distDir, "index.html"), resolve(distDir, "404.html"));
writeFileSync(resolve(distDir, ".nojekyll"), "");
console.log("Prepared GitHub Pages fallback files.");
