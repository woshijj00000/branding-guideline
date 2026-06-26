import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const brand = JSON.parse(fs.readFileSync(path.join(root, "brand-system", "brand.onekey.json"), "utf8"));

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];
    if (!value.startsWith("--")) continue;
    const key = value.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function usage() {
  console.log(`Usage:
  npm run new -- --template single-partner --language en --name campaign-name

Options:
  --template   ${Object.keys(brand.templates).join(" | ")}
  --language   zh | en
  --name       output file name without .json
  --variant    optional template variant
`);
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5-]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  usage();
  process.exit(0);
}

const template = args.template;
const language = args.language;
const name = slugify(args.name);
const variant = args.variant;

const errors = [];
if (!brand.templates[template]) errors.push(`Unknown template: ${template || ""}`);
if (!["zh", "en"].includes(language)) errors.push(`language must be zh or en: ${language || ""}`);
if (!name) errors.push("--name is required");
if (variant && !brand.templates[template]?.variants?.includes(variant)) {
  errors.push(`Unknown variant for ${template}: ${variant}`);
}

if (errors.length) {
  for (const error of errors) console.error(error);
  usage();
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const defaultVariant = variant || brand.templates[template].variants?.[0] || "";

const content = {
  systemVersion: "v1",
  template,
  templateVariant: defaultVariant,
  language,
  campaign: name,
  createdAt: today,
  sourceBrief: "",
  headline: "",
  subheadline: "",
  cta: "",
  marketPair: "",
  leverage: "",
  logo: "",
  items: []
};

if (template === "single-partner") {
  content.cta = language === "zh" ? "在 OneKey App 中了解更多" : "Open OneKey App";
  content.items = [{ name: "", logo: "" }];
}

if (template === "integration-grid") {
  content.cta = language === "zh" ? "在 App > 浏览器了解更多" : "Learn more in App > Browser";
  content.items = [
    { name: "", logo: "" },
    { name: "", logo: "" }
  ];
}

if (template === "guide-cover") {
  content.subheadline = language === "zh" ? "OneKey Security Lab" : "OneKey Security Lab";
}

if (template === "perps-market") {
  content.cta = language === "zh" ? "打开 OneKey App" : "Open OneKey App";
}

const outputPath = path.join(root, "brand-system", "content", `${name}.json`);
if (fs.existsSync(outputPath)) {
  console.error(`Refusing to overwrite existing file: ${outputPath}`);
  process.exit(1);
}

fs.writeFileSync(outputPath, `${JSON.stringify(content, null, 2)}\n`);
console.log(`Created ${outputPath}`);

