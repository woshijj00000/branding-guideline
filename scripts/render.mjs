import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentPath = path.resolve(process.argv[2] || "");
const outputPath = path.resolve(process.argv[3] || "out/social.png");

if (!process.argv[2]) {
  console.error("Usage: node scripts/render.mjs <content.json> <output.png>");
  process.exit(1);
}

const brand = JSON.parse(fs.readFileSync(path.join(root, "brand-system", "brand.onekey.json"), "utf8"));
const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
const templatePath = path.join(root, "brand-system", "templates", "square-social.html");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: {
    width: brand.canvas.width,
    height: brand.canvas.height
  },
  deviceScaleFactor: brand.canvas.exportScale
});

await page.goto(`file://${templatePath}`);
await page.evaluate(
  ({ brand, content, root }) => {
    window.renderOneKeySocial({ brand, content, root });
  },
  { brand, content, root }
);
await page.screenshot({ path: outputPath, omitBackground: false });
await browser.close();

console.log(`Rendered ${outputPath}`);
