import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "brand-system", "content");
const files = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith(".json"))
  .sort()
  .map((file) => path.join(contentDir, file));

if (!files.length) {
  console.error(`No content files found in ${contentDir}`);
  process.exit(1);
}

for (const file of files) {
  execFileSync("node", [path.join(root, "scripts", "validate-content.mjs"), file], {
    cwd: root,
    stdio: "inherit"
  });
}

console.log(`Validated ${files.length} content file(s).`);

