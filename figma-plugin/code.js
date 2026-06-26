const BRAND = {
  canvas: { width: 512, height: 512, safeArea: 32 },
  colors: {
    green: "#3BD23D",
    black: "#000000",
    white: "#FFFFFF",
    gray: "#6A6A6A",
    paleGreen: "#B9F4BA"
  },
  templates: {
    "integration-grid": {
      requiredFields: ["headline", "items", "cta"],
      variants: ["four-grid", "dense-grid", "category-grid"],
      limits: { headlineMaxCharsZh: 18, headlineMaxCharsEn: 56, itemsMin: 2, itemsMax: 8 }
    },
    "single-partner": {
      requiredFields: ["headline", "items", "cta"],
      variants: ["logo-pair-panel", "hero-logo", "split-lockup"],
      limits: { headlineMaxCharsZh: 10, headlineMaxCharsEn: 32, itemsMin: 1, itemsMax: 2 }
    },
    "guide-cover": {
      requiredFields: ["headline", "subheadline"],
      variants: ["quote-panel", "lab-cover", "definition-card"],
      limits: { headlineMaxCharsZh: 18, headlineMaxCharsEn: 48, itemsMin: 0, itemsMax: 0 }
    },
    "perps-market": {
      requiredFields: ["headline", "subheadline", "marketPair", "leverage", "cta"],
      variants: ["market-badge", "ticker-panel", "feature-metric"],
      limits: { headlineMaxCharsZh: 28, headlineMaxCharsEn: 64, itemsMin: 0, itemsMax: 0 }
    }
  }
};

const DESIGN_CANVAS = 2048;
const SCALE = BRAND.canvas.width / DESIGN_CANVAS;

function sc(value) {
  return Math.round(value * SCALE * 1000) / 1000;
}

const ONEKEY_LOGOMARK_SVG = `<svg width="288" height="288" viewBox="0 0 288 288" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M144 72C193.706 72 216 94.2944 216 144C216 193.706 193.706 216 144 216C94.2944 216 72 193.706 72 144C72 94.2944 94.2944 72 144 72ZM144 139.783C131.384 139.783 121.157 150.01 121.157 162.626C121.157 175.242 131.384 185.47 144 185.47C156.616 185.47 166.844 175.242 166.844 162.626C166.844 150.01 156.616 139.783 144 139.783ZM144 150.153C150.888 150.153 156.473 155.737 156.473 162.626C156.473 169.514 150.888 175.099 144 175.099C137.112 175.098 131.527 169.514 131.527 162.626C131.527 155.738 137.112 150.154 144 150.153ZM130.476 102.53L126.961 113.156H138.087V135.538H150.505V102.53H130.476Z" fill="black"/></svg>`;

figma.showUI(__html__, { width: 460, height: 620, themeColors: true });

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return {
    r: ((value >> 16) & 255) / 255,
    g: ((value >> 8) & 255) / 255,
    b: (value & 255) / 255
  };
}

function solid(hex) {
  return [{ type: "SOLID", color: hexToRgb(hex) }];
}

function nodeName(parts) {
  return parts.filter(Boolean).join(" / ");
}

function charCount(value) {
  return [...String(value || "")].length;
}

function validateContent(content) {
  const errors = [];
  const template = BRAND.templates[content.template];
  if (!template) errors.push(`Unknown template: ${content.template}`);
  if (!["zh", "en"].includes(content.language)) errors.push(`language must be zh or en`);
  if (!template) return errors;

  for (const field of template.requiredFields) {
    if (field === "items") {
      if (!Array.isArray(content.items) || !content.items.length) errors.push("items is required");
    } else if (!content[field]) {
      errors.push(`${field} is required`);
    }
  }

  const itemCount = Array.isArray(content.items) ? content.items.length : 0;
  if (template.limits.itemsMin !== undefined && itemCount < template.limits.itemsMin) {
    errors.push(`${content.template} requires at least ${template.limits.itemsMin} item(s)`);
  }
  if (template.limits.itemsMax !== undefined && itemCount > template.limits.itemsMax) {
    errors.push(`${content.template} allows at most ${template.limits.itemsMax} item(s)`);
  }

  const headlineLimit = content.language === "zh" ? template.limits.headlineMaxCharsZh : template.limits.headlineMaxCharsEn;
  if (headlineLimit && charCount(content.headline) > headlineLimit) {
    errors.push(`headline is too long: ${charCount(content.headline)}/${headlineLimit}`);
  }
  if (content.templateVariant && !template.variants.includes(content.templateVariant)) {
    errors.push(`Unknown templateVariant: ${content.templateVariant}`);
  }
  return errors;
}

async function loadFontWithFallback(family, style, warnings) {
  const fonts = await figma.listAvailableFontsAsync();
  const normalize = (value) => String(value).toLowerCase().replace(/[\s-]/g, "");
  const wantedFamily = normalize(family);
  const wantedStyle = normalize(style);
  let match = fonts.find((font) => normalize(font.fontName.family) === wantedFamily && normalize(font.fontName.style) === wantedStyle);

  if (!match && wantedStyle.includes("semi")) {
    match = fonts.find((font) => normalize(font.fontName.family) === wantedFamily && normalize(font.fontName.style).includes("semi"));
  }

  if (!match) {
    match = fonts.find((font) => normalize(font.fontName.family) === "inter" && normalize(font.fontName.style) === wantedStyle);
  }

  if (!match) {
    match = fonts.find((font) => normalize(font.fontName.family) === "inter" && normalize(font.fontName.style).includes("regular"));
  }

  if (!match) {
    throw new Error(`No usable font found for ${family} ${style}. Install brand fonts or Inter.`);
  }

  if (match.fontName.family !== family || normalize(match.fontName.style) !== wantedStyle) {
    warnings.push(`Font fallback used: requested ${family} ${style}, used ${match.fontName.family} ${match.fontName.style}`);
  }

  await figma.loadFontAsync(match.fontName);
  return match.fontName;
}

async function createText(parent, options, fonts) {
  const text = figma.createText();
  parent.appendChild(text);
  text.name = options.name || "Text";
  text.fontName = options.fontName || fonts.body;
  text.characters = String(options.characters || "");
  text.fontSize = sc(options.fontSize);
  text.lineHeight = { unit: "PERCENT", value: options.lineHeight || 110 };
  text.fills = solid(options.color || BRAND.colors.black);
  text.x = sc(options.x);
  text.y = sc(options.y);
  text.resize(sc(options.width), sc(options.height || 300));
  text.textAutoResize = "HEIGHT";
  return text;
}

function createRect(parent, options) {
  const rect = figma.createRectangle();
  parent.appendChild(rect);
  rect.name = options.name || "Rectangle";
  rect.x = sc(options.x);
  rect.y = sc(options.y);
  rect.resize(sc(options.width), sc(options.height));
  rect.fills = solid(options.fill || BRAND.colors.white);
  rect.cornerRadius = sc(options.radius || 0);
  if (options.stroke) {
    rect.strokes = solid(options.stroke);
    rect.strokeWeight = sc(options.strokeWeight || 1);
  }
  return rect;
}

function createFrame(parent, options) {
  const frame = figma.createFrame();
  parent.appendChild(frame);
  frame.name = options.name || "Frame";
  frame.x = sc(options.x);
  frame.y = sc(options.y);
  frame.resize(sc(options.width), sc(options.height));
  frame.fills = solid(options.fill || BRAND.colors.white);
  frame.cornerRadius = sc(options.radius || 0);
  frame.clipsContent = false;
  return frame;
}

function placeTopLevelFrame(frame) {
  const page = figma.currentPage;
  const frames = page.children.filter((node) => "x" in node && "width" in node);
  const rightEdge = frames.length ? Math.max(...frames.map((node) => node.x + node.width)) : 0;
  frame.x = rightEdge + sc(240);
  frame.y = 0;
}

function imageDataUrlToBytes(dataUrl) {
  const match = String(dataUrl).match(/^data:image\/(?:png|jpeg|jpg);base64,(.+)$/);
  if (!match) return null;
  const binary = atob(match[1]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function svgDataUrlToString(dataUrl) {
  const base64Match = String(dataUrl).match(/^data:image\/svg\+xml;base64,(.+)$/);
  if (base64Match) return atob(base64Match[1]);
  const utf8Match = String(dataUrl).match(/^data:image\/svg\+xml,(.+)$/);
  if (utf8Match) return decodeURIComponent(utf8Match[1]);
  return null;
}

function createOfficialLogomark(parent, x, y, size) {
  const node = figma.createNodeFromSvg(ONEKEY_LOGOMARK_SVG);
  parent.appendChild(node);
  node.name = "OneKey Official Logomark";
  node.x = sc(x);
  node.y = sc(y);
  node.resize(sc(size), sc(size));
  return node;
}

async function createImageOrFallback(parent, item, options, fonts, warnings) {
  const container = createFrame(parent, {
    name: nodeName(["Logo", item.name]),
    x: options.x,
    y: options.y,
    width: options.size,
    height: options.size,
    radius: options.radius,
    fill: BRAND.colors.white
  });

  if (item.logo && item.logo.startsWith("data:image/")) {
    const svg = svgDataUrlToString(item.logo);
    if (svg) {
      const svgNode = figma.createNodeFromSvg(svg);
      container.appendChild(svgNode);
      svgNode.name = nodeName(["Imported SVG", item.name]);
      svgNode.x = sc(Math.round(options.size * 0.08));
      svgNode.y = sc(Math.round(options.size * 0.08));
      svgNode.resize(sc(Math.round(options.size * 0.84)), sc(Math.round(options.size * 0.84)));
      return container;
    }

    const bytes = imageDataUrlToBytes(item.logo);
    if (bytes) {
      const image = figma.createImage(bytes);
      container.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash: image.hash }];
      return container;
    }
  }

  if (item.logo) {
    warnings.push(`Logo path could not be imported by Figma plugin: ${item.logo}`);
  }

  container.fills = solid(BRAND.colors.black);
  const initial = [...String(item.name || "O")][0] || "O";
  await createText(container, {
    name: "Fallback Initial",
    characters: initial,
    x: 0,
    y: Math.round(options.size * 0.31),
    width: options.size,
    height: Math.round(options.size * 0.38),
    fontName: fonts.title,
    fontSize: Math.round(options.size * 0.34),
    lineHeight: 100,
    color: BRAND.colors.white
  }, fonts);
  container.children[0].textAlignHorizontal = "CENTER";
  return container;
}

async function createBrandLockup(canvas, fonts) {
  createOfficialLogomark(canvas, 128, 128, 132);
  await createText(canvas, {
    name: "Brand Word",
    characters: "OneKey",
    x: 288,
    y: 158,
    width: 380,
    height: 80,
    fontName: fonts.title,
    fontSize: 58,
    lineHeight: 100
  }, fonts);
}

async function renderIntegrationGrid(canvas, content, fonts, warnings) {
  const panel = createFrame(canvas, { name: "Content Panel", x: 128, y: 748, width: 1792, height: 820, radius: 64 });
  const items = content.items || [];
  const columns = items.length <= 4 ? 4 : 4;
  const size = items.length <= 4 ? 272 : 228;
  const startX = items.length <= 4 ? 148 : 120;
  const startY = items.length <= 4 ? 116 : 96;
  const gapX = items.length <= 4 ? 408 : 318;
  const gapY = 332;

  for (let i = 0; i < items.length; i += 1) {
    const col = i % columns;
    const row = Math.floor(i / columns);
    const x = startX + col * gapX;
    const y = startY + row * gapY;
    await createImageOrFallback(panel, items[i], { x, y, size, radius: size / 2 }, fonts, warnings);
    const label = await createText(panel, {
      name: nodeName(["Item Label", items[i].name]),
      characters: items[i].name,
      x: x - 62,
      y: y + size + 44,
      width: size + 124,
      height: 80,
      fontName: fonts.body,
      fontSize: items.length <= 4 ? 58 : 48,
      lineHeight: 105
    }, fonts);
    label.textAlignHorizontal = "CENTER";
  }
}

async function renderSinglePartner(canvas, content, fonts, warnings) {
  const panel = createFrame(canvas, { name: "Content Panel", x: 128, y: 536, width: 1792, height: 940, radius: 64 });
  const items = content.items || [];
  const count = Math.max(items.length, 1);
  const size = count === 1 ? 460 : 372;
  const totalWidth = count === 1 ? size : size * count + 300 * (count - 1);
  const startX = (1792 - totalWidth) / 2;

  for (let i = 0; i < items.length; i += 1) {
    const x = startX + i * (size + 300);
    const y = count === 1 ? 180 : 230;
    await createImageOrFallback(panel, items[i], { x, y, size, radius: 64 }, fonts, warnings);
    const label = await createText(panel, {
      name: nodeName(["Item Label", items[i].name]),
      characters: items[i].name,
      x: x - 80,
      y: y + size + 54,
      width: size + 160,
      height: 100,
      fontName: fonts.body,
      fontSize: 72,
      lineHeight: 105
    }, fonts);
    label.textAlignHorizontal = "CENTER";
  }
}

async function renderGuideCover(canvas, content, fonts) {
  const panel = createFrame(canvas, { name: "Guide Panel", x: 128, y: 700, width: 1792, height: 1030, radius: 64 });
  const pattern = await createText(panel, {
    name: "Controlled Binary Pattern",
    characters: "0101  0101  0101  0101  0101",
    x: 128,
    y: 78,
    width: 1540,
    height: 360,
    fontName: fonts.body,
    fontSize: 118,
    lineHeight: 162,
    color: BRAND.colors.paleGreen
  }, fonts);
  pattern.opacity = 0.58;
  await createText(panel, {
    name: "Quote Mark",
    characters: "“",
    x: 128,
    y: 370,
    width: 300,
    height: 180,
    fontName: fonts.title,
    fontSize: 226,
    lineHeight: 60,
    color: BRAND.colors.green
  }, fonts);
  await createText(panel, {
    name: "Subheadline",
    characters: content.subheadline,
    x: 128,
    y: 560,
    width: 1400,
    height: 220,
    fontName: fonts.body,
    fontSize: 72,
    lineHeight: 116
  }, fonts);
}

async function renderPerpsMarket(canvas, content, fonts, warnings) {
  const panel = createFrame(canvas, { name: "Perps Market Panel", x: 128, y: 700, width: 1792, height: 820, radius: 64 });
  await createText(panel, {
    name: "Eyebrow",
    characters: content.language === "zh" ? "OneKey App 现已支持" : "OneKey App now supports",
    x: 128,
    y: 120,
    width: 760,
    height: 66,
    fontName: fonts.body,
    fontSize: 44,
    lineHeight: 100
  }, fonts);
  const pairParts = String(content.marketPair || "").split("/");
  await createText(panel, {
    name: "Market Pair",
    characters: pairParts[0] && pairParts[1] ? `${pairParts[0]}/${pairParts[1]}` : content.marketPair,
    x: 128,
    y: 230,
    width: 920,
    height: 150,
    fontName: fonts.title,
    fontSize: 118,
    lineHeight: 96
  }, fonts);
  createRect(panel, { name: "Subtitle Accent", x: 128, y: 430, width: 10, height: 120, fill: BRAND.colors.green });
  await createText(panel, {
    name: "Market Subtitle",
    characters: content.subheadline,
    x: 166,
    y: 426,
    width: 850,
    height: 140,
    fontName: fonts.body,
    fontSize: 48,
    lineHeight: 116
  }, fonts);
  await createText(panel, {
    name: "Leverage",
    characters: content.leverage,
    x: 128,
    y: 610,
    width: 360,
    height: 160,
    fontName: fonts.title,
    fontSize: 168,
    lineHeight: 90,
    color: BRAND.colors.green
  }, fonts);
  await createImageOrFallback(panel, { name: content.marketPair || "MKT", logo: content.logo || "" }, {
    x: 1160,
    y: 150,
    size: 520,
    radius: 260
  }, fonts, warnings);
}

async function createSocialFrame(content, requestedFrameName, requestedPageName) {
  const errors = validateContent(content);
  if (errors.length) throw new Error(errors.join("\n"));

  const warnings = [];
  let page = figma.root.children.find((candidate) => candidate.name === requestedPageName);
  if (!page) {
    page = figma.createPage();
    page.name = requestedPageName;
  }
  if (figma.setCurrentPageAsync) {
    await figma.setCurrentPageAsync(page);
  } else {
    figma.currentPage = page;
  }

  const titleFamily = content.language === "zh" ? "MiSans" : "Roobert";
  const bodyFamily = content.language === "zh" ? "MiSans" : "Roobert";
  const fonts = {
    title: await loadFontWithFallback(titleFamily, "Bold", warnings),
    body: await loadFontWithFallback(bodyFamily, "Semibold", warnings)
  };

  const canvas = figma.createFrame();
  canvas.name = requestedFrameName || nodeName([
    content.createdAt || new Date().toISOString().slice(0, 10),
    content.campaign,
    content.language,
    content.template,
    content.templateVariant
  ]);
  canvas.resize(BRAND.canvas.width, BRAND.canvas.height);
  canvas.fills = solid(BRAND.colors.green);
  canvas.clipsContent = false;
  placeTopLevelFrame(canvas);
  page.appendChild(canvas);

  if (content.template !== "single-partner") {
    await createBrandLockup(canvas, fonts);
  }

  await createText(canvas, {
    name: "Headline",
    characters: content.headline,
    x: 128,
    y: content.template === "single-partner" ? 210 : 360,
    width: 1680,
    height: content.language === "zh" ? 260 : 320,
    fontName: fonts.title,
    fontSize: content.language === "zh" ? 220 : 142,
    lineHeight: content.language === "zh" ? 100 : 105
  }, fonts);

  if (content.template === "integration-grid") await renderIntegrationGrid(canvas, content, fonts, warnings);
  if (content.template === "single-partner") await renderSinglePartner(canvas, content, fonts, warnings);
  if (content.template === "guide-cover") await renderGuideCover(canvas, content, fonts, warnings);
  if (content.template === "perps-market") await renderPerpsMarket(canvas, content, fonts, warnings);

  if (content.cta) {
    await createText(canvas, {
      name: "CTA",
      characters: content.cta,
      x: 128,
      y: 1842,
      width: 1720,
      height: 90,
      fontName: fonts.body,
      fontSize: 56,
      lineHeight: 110
    }, fonts);
  }

  figma.currentPage.selection = [canvas];
  figma.viewport.scrollAndZoomIntoView([canvas]);
  return { frameId: canvas.id, frameName: canvas.name, warnings };
}

figma.ui.onmessage = async (message) => {
  if (message.type !== "create-frame") return;
  try {
    const result = await createSocialFrame(message.content, message.frameName, message.pageName || "04 AI Generated");
    const suffix = result.warnings.length ? ` Warnings: ${result.warnings.join(" | ")}` : "";
    figma.ui.postMessage({ status: `Created ${result.frameName}.${suffix}` });
  } catch (error) {
    figma.ui.postMessage({ status: `Error: ${error.message}` });
  }
};
