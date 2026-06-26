import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentPath = process.argv[2] ? path.resolve(process.argv[2]) : "";

if (!contentPath) {
  console.error("Usage: node scripts/prepare-figma-json.mjs <content.json>");
  process.exit(1);
}

execFileSync("node", [path.join(root, "scripts", "validate-content.mjs"), contentPath], {
  cwd: root,
  stdio: "inherit"
});

function mimeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  return "";
}

function toDataUrl(value) {
  if (!value || /^(https?:|file:|data:)/.test(value)) return value;
  const absolute = path.resolve(root, value);
  if (!fs.existsSync(absolute)) return value;
  const mime = mimeFor(absolute);
  if (!mime) return value;
  const encoded = fs.readFileSync(absolute).toString("base64");
  return `data:${mime};base64,${encoded}`;
}

const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
const packed = structuredClone(content);

if (packed.logo) packed.logo = toDataUrl(packed.logo);
if (Array.isArray(packed.items)) {
  packed.items = packed.items.map((item) => ({
    ...item,
    logo: toDataUrl(item.logo)
  }));
}

const outDir = path.join(root, "out", "figma-json");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `${path.basename(contentPath, ".json")}.figma.json`);
fs.writeFileSync(outPath, `${JSON.stringify(packed, null, 2)}\n`);
console.log(`Prepared Figma JSON: ${outPath}`);

