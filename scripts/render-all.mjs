import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "brand-system", "content");
const outDir = path.join(root, "out");

const files = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith(".json"))
  .sort()
  .map((file) => path.join(contentDir, file));

if (!files.length) {
  console.error(`No content files found in ${contentDir}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  execFileSync("node", [path.join(root, "scripts", "validate-content.mjs"), file], {
    cwd: root,
    stdio: "inherit"
  });

  const basename = path.basename(file, ".json");
  const outputPath = path.join(outDir, `${basename}.png`);
  execFileSync("node", [path.join(root, "scripts", "render.mjs"), file, outputPath], {
    cwd: root,
    stdio: "inherit"
  });
}

console.log(`Rendered ${files.length} image(s) to ${outDir}`);

