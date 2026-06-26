import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const brandPath = path.join(root, "brand-system", "brand.onekey.json");
const brand = JSON.parse(fs.readFileSync(brandPath, "utf8"));

const contentPath = process.argv[2];
const allowedFields = new Set([
  "systemVersion",
  "template",
  "templateVariant",
  "language",
  "campaign",
  "createdAt",
  "sourceBrief",
  "headline",
  "subheadline",
  "cta",
  "marketPair",
  "leverage",
  "logo",
  "items"
]);

const forbidden = [
  "gradient",
  "photorealistic",
  "cinematic",
  "3d mascot",
  "cyberpunk",
  "watercolor",
  "illustration style",
  "赛博",
  "电影感",
  "渐变",
  "摄影",
  "水彩",
  "吉祥物"
];

function textFields(value) {
  const fields = [value.headline, value.subheadline, value.cta, value.marketPair, value.leverage];
  for (const item of value.items || []) fields.push(item.name, item.logo);
  return fields.filter(Boolean).join(" ").toLowerCase();
}

function charLimitFor(template, language, key) {
  const limits = brand.templates[template]?.limits || {};
  if (key === "headline" && language === "zh") return limits.headlineMaxCharsZh;
  if (key === "headline" && language === "en") return limits.headlineMaxCharsEn;
  if (key === "subheadline") return limits.subheadlineMaxChars;
  if (key === "cta" && language === "zh") return limits.ctaMaxCharsZh;
  if (key === "cta" && language === "en") return limits.ctaMaxCharsEn;
  return undefined;
}

function localPathExists(value) {
  if (!value) return true;
  if (/^(https?:|file:|data:)/.test(value)) return true;
  return fs.existsSync(path.resolve(root, value));
}

function validateContent(filePath) {
  const absolutePath = path.resolve(filePath);
  const content = JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  const errors = [];

  for (const key of Object.keys(content)) {
    if (!allowedFields.has(key)) errors.push(`Unknown field: ${key}`);
  }

  if (!brand.templates[content.template]) {
    errors.push(`Unknown template: ${content.template}`);
  }

  if (!["zh", "en"].includes(content.language)) {
    errors.push(`language must be "zh" or "en": ${content.language}`);
  }

  if (content.items !== undefined && !Array.isArray(content.items)) {
    errors.push("items must be an array when present");
  }

  const template = brand.templates[content.template];
  if (template) {
    for (const field of template.requiredFields) {
      if (field === "items") {
        if (!Array.isArray(content.items)) {
          errors.push("items is required and must be an array");
        }
      } else if (!content[field]) {
        errors.push(`${field} is required for ${content.template}`);
      }
    }

    const min = template.limits.itemsMin;
    const max = template.limits.itemsMax;
    const itemCount = Array.isArray(content.items) ? content.items.length : 0;
    if (min !== undefined && itemCount < min) {
      errors.push(`${content.template} requires at least ${min} item(s)`);
    }
    if (max !== undefined && itemCount > max) {
      errors.push(`${content.template} allows at most ${max} item(s)`);
    }

    if (content.templateVariant && !template.variants?.includes(content.templateVariant)) {
      errors.push(`Unknown templateVariant for ${content.template}: ${content.templateVariant}`);
    }
  }

  for (const key of ["headline", "subheadline", "cta"]) {
    const limit = charLimitFor(content.template, content.language, key);
    if (limit && content[key] && [...content[key]].length > limit) {
      errors.push(`${key} is too long: ${[...content[key]].length}/${limit}`);
    }
  }

  if (Array.isArray(content.items)) {
    content.items.forEach((item, index) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        errors.push(`items[${index}] must be an object`);
        return;
      }

      const itemFields = Object.keys(item);
      for (const key of itemFields) {
        if (!["name", "logo"].includes(key)) errors.push(`Unknown field in items[${index}]: ${key}`);
      }
      if (!item.name) errors.push(`items[${index}].name is required`);
      if (!("logo" in item)) errors.push(`items[${index}].logo is required; use an empty string when unknown`);
      if (item.logo && !localPathExists(item.logo)) errors.push(`items[${index}].logo path does not exist: ${item.logo}`);
    });
  }

  if (content.logo && !localPathExists(content.logo)) {
    errors.push(`logo path does not exist: ${content.logo}`);
  }

  const combined = textFields(content);
  for (const term of forbidden) {
    if (combined.includes(term.toLowerCase())) {
      errors.push(`Forbidden style term found: ${term}`);
    }
  }

  if (errors.length) {
    console.error(`Validation failed for ${filePath}`);
    for (const error of errors) console.error(`- ${error}`);
    return false;
  }

  console.log(`Validation passed: ${filePath}`);
  return true;
}

if (!contentPath) {
  console.error("Usage: node scripts/validate-content.mjs <content.json>");
  process.exit(1);
}

const ok = validateContent(contentPath);
if (!ok) process.exit(1);
