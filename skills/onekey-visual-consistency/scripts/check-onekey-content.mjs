import fs from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node check-onekey-content.mjs <content.json>");
  process.exit(1);
}

const content = JSON.parse(fs.readFileSync(file, "utf8"));
const errors = [];
const allowedTemplates = new Set(["integration-grid", "single-partner", "guide-cover", "perps-market"]);
const allowedLanguages = new Set(["zh", "en"]);
const forbiddenTerms = [
  "gradient",
  "cinematic",
  "photorealistic",
  "cyberpunk",
  "3d mascot",
  "watercolor",
  "赛博",
  "电影感",
  "渐变",
  "摄影",
  "水彩",
  "吉祥物"
];

if (!allowedTemplates.has(content.template)) errors.push(`Unknown template: ${content.template}`);
if (!allowedLanguages.has(content.language)) errors.push(`Unknown language: ${content.language}`);
if (!content.headline) errors.push("Missing headline");
if (content.template === "perps-market") {
  if (!content.marketPair) errors.push("Missing marketPair");
  if (!content.leverage) errors.push("Missing leverage");
}

const headlineLength = [...(content.headline || "")].length;
if (content.language === "zh" && headlineLength > 18) errors.push(`Chinese headline too long: ${headlineLength}/18`);
if (content.language === "en" && headlineLength > 56) errors.push(`English headline too long: ${headlineLength}/56`);

const combined = [
  content.headline,
  content.subheadline,
  content.cta,
  ...(content.items || []).flatMap((item) => [item.name, item.logo])
]
  .filter(Boolean)
  .join(" ")
  .toLowerCase();

for (const term of forbiddenTerms) {
  if (combined.includes(term.toLowerCase())) errors.push(`Forbidden style term: ${term}`);
}

if (errors.length) {
  console.error("OneKey content check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`OneKey content check passed: ${file}`);
