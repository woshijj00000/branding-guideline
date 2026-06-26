import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

const hasFlag = (flag) => args.includes(flag);
const getArg = (name) => {
  const prefix = `${name}=`;
  const value = args.find((arg) => arg.startsWith(prefix));
  return value ? value.slice(prefix.length) : "";
};

const confirm = hasFlag("--confirm");
const skipContent = hasFlag("--skip-content");
const imagePath = getArg("--image");
const figmaUrl = getArg("--figma-url");
const figmaNode = getArg("--figma-node");

const target = {
  fileName: "Social Media",
  fileKey: "Wl5WYHxce4FKlCk4hiWpQm",
  pageName: "社媒品牌规范",
  pageNodeId: "17715:10025",
  sectionName: "产出社媒图",
  sectionNodeId: "17852:1532",
  url: "https://www.figma.com/design/Wl5WYHxce4FKlCk4hiWpQm/Social-Media?node-id=17715-10025"
};

const autoChecks = [];
const reviewChecks = [
  "Figma 落点：生成 frame 必须在 Social Media / 社媒品牌规范 / 产出社媒图 内，不在页面根节点、历史案例区、组件区、产品图区或其他分区。",
  "最终画面：必须检查 Figma 截图或导出图，而不是只看图层坐标。",
  "尺寸：标准社媒图为 512 x 512 px，核心内容在 448 x 448 安全区内。",
  "字体：英文使用 Roobert，中文使用 MiSans；标题、正文、标签使用对应字重。",
  "Logo：使用官方 OneKey logo；App/common 场景正确；背景色变体正确；未裁切、未变形、未重绘；按可见图形对齐。",
  "颜色：仅使用 OneKey 品牌配色和允许的辅助灰；不得出现错误绿色、随手取色、渐变或非品牌色。",
  "文案：主标题、副标题、CTA、标签和说明文字必须对齐到明确视觉轴线；不可漂移、碰撞、溢出或过小。",
  "间距：同一组或重复元素需要均分或保持一致；组间距离必须服务信息层级和阅读顺序。",
  "图片：产品图、截图、token icon、partner logo、照片或抠图元素的大小、裁切、比例、占位和视觉重量必须合适。",
  "信息层级：画面只保留一个主信息、一个关键证明/利益点和一个 CTA/来源 cue；不能信息过载。",
  "C.R.A.P.：Contrast、Repetition、Alignment、Proximity 全部通过。",
  "OneKey 历史风格：整体仍然是 Modern Tech + FinTech editorial，简洁、留白、产品/数据导向。"
];

const addCheck = (ok, label) => {
  autoChecks.push({ ok, label });
};

const readText = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

if (!skipContent) {
  execFileSync("node", [path.join(root, "scripts", "validate-all.mjs")], {
    cwd: root,
    stdio: "inherit"
  });
  addCheck(true, "Content JSON validation passed.");
} else {
  addCheck(true, "Content JSON validation skipped by --skip-content.");
}

const targetFiles = [
  "skills/onekey-social-image-system/SKILL.md",
  "skills/onekey-social-image-system/references/onekey-social-layout-image-style.md",
  "skills/onekey-social-image-system/references/system-map.md",
  "docs/onekey-social-skill-usage-guide.md"
];

for (const relativePath of targetFiles) {
  const text = readText(relativePath);
  const markers = [
    target.fileKey,
    target.pageNodeId,
    target.sectionNodeId,
    target.sectionName
  ];
  const missing = markers.filter((marker) => !text.includes(marker));
  addCheck(
    missing.length === 0,
    missing.length === 0
      ? `${relativePath} includes fixed Figma target markers.`
      : `${relativePath} is missing fixed Figma target marker(s): ${missing.join(", ")}`
  );
}

const qaText = readText("brand-system/specs/qa-checklist.md");
for (const marker of ["Final Visual QA", "Font usage", "OneKey logo usage", "Same-group spacing", "Image elements"]) {
  addCheck(
    qaText.includes(marker),
    qaText.includes(marker)
      ? `QA checklist includes ${marker}.`
      : `QA checklist is missing ${marker}.`
  );
}

if (figmaUrl) {
  addCheck(
    figmaUrl.includes(target.fileKey),
    figmaUrl.includes(target.fileKey)
      ? `Figma URL uses required fileKey: ${figmaUrl}`
      : `Figma URL must use required fileKey ${target.fileKey}: ${figmaUrl}`
  );
} else {
  addCheck(true, "No Figma URL provided; fixed Figma section must be verified manually.");
}

if (figmaNode) {
  addCheck(true, `Figma node recorded for review: ${figmaNode}`);
}

if (imagePath) {
  const resolved = path.resolve(imagePath);
  if (!fs.existsSync(resolved)) {
    addCheck(false, `Image file does not exist: ${resolved}`);
  } else {
    try {
      const output = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", resolved], {
        encoding: "utf8"
      });
      const width = Number(output.match(/pixelWidth:\s*(\d+)/)?.[1] || 0);
      const height = Number(output.match(/pixelHeight:\s*(\d+)/)?.[1] || 0);
      addCheck(
        width === 512 && height === 512,
        width === 512 && height === 512
          ? `Image dimensions are 512 x 512: ${resolved}`
          : `Image dimensions must be 512 x 512, got ${width} x ${height}: ${resolved}`
      );
    } catch {
      addCheck(false, `Could not inspect image dimensions with sips: ${resolved}`);
    }
  }
} else {
  addCheck(true, "No local image provided; inspect Figma screenshot/export manually.");
}

const failed = autoChecks.filter((check) => !check.ok);
const reportLines = [
  "# OneKey Final Review Report",
  "",
  `Generated at: ${new Date().toISOString()}`,
  "",
  "## Fixed Figma Target",
  "",
  `- File: ${target.fileName}`,
  `- URL: ${target.url}`,
  `- fileKey: ${target.fileKey}`,
  `- Page: ${target.pageName} (${target.pageNodeId})`,
  `- Section: ${target.sectionName} (${target.sectionNodeId})`,
  "",
  "## Automatic Checks",
  "",
  ...autoChecks.map((check) => `- ${check.ok ? "[x]" : "[ ]"} ${check.label}`),
  "",
  "## Required Manual Review",
  "",
  ...reviewChecks.map((check) => `- ${confirm ? "[x]" : "[ ]"} ${check}`),
  "",
  "## Result",
  "",
  failed.length
    ? `FAILED: ${failed.length} automatic check(s) failed.`
    : confirm
      ? "PASSED: automatic checks passed and final manual review was confirmed."
      : "PENDING: automatic checks passed, but final manual review has not been confirmed.",
  ""
];

const reportPath = path.join(root, "out", "final-review.md");
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, reportLines.join("\n"));

console.log(reportLines.join("\n"));
console.log(`Review report written to ${reportPath}`);

if (failed.length > 0) {
  process.exit(1);
}

if (!confirm) {
  console.error("Final manual review is required. Re-run with --confirm only after checking the final Figma screenshot/export against every review item.");
  process.exit(1);
}
