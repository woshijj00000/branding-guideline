---
name: onekey-social-image-system
description: Generate, validate, render, QA, and prepare editable Figma-ready OneKey social media image assets using the local `/Users/jiangjie/Documents/社媒出图系统` brand system. Use when the user asks to create OneKey social images, turn a campaign brief into content JSON, check brand consistency, render PNG social posts, batch produce social assets, share the OneKey social image workflow with teammates, or prepare outputs for the `Social Media` Figma file.
---

# OneKey Social Image System

Use this skill to operate the local OneKey social image production system. The core rule is: AI creates structured content JSON only; fixed templates create the final image.

## Source Paths

- System root: `/Users/jiangjie/Documents/社媒出图系统`
- Brand assets: `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范`
- Brand tokens: `/Users/jiangjie/Documents/社媒出图系统/brand-system/brand.onekey.json`
- Font root: `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/字体`
- English font directory: `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/字体/英文字体`
- Chinese font directory: `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/字体/中文字体`
- Social examples: `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/OneKey_社媒图案例`
- Content files: `/Users/jiangjie/Documents/社媒出图系统/brand-system/content`
- Output PNGs: `/Users/jiangjie/Documents/社媒出图系统/out`
- Required Figma output file: `Social Media` (`https://www.figma.com/design/Wl5WYHxce4FKlCk4hiWpQm/Social-Media?node-id=17715-10025`, `fileKey: Wl5WYHxce4FKlCk4hiWpQm`)
- Required Figma output page: `社媒品牌规范` (`nodeId: 17715:10025`)
- Required Figma output section: `产出社媒图` (`nodeId: 17852:1532`)

Read `references/system-map.md` when you need command details, file roles, or teammate workflow. Read `references/onekey-social-layout-image-style.md` before designing or reviewing a OneKey social post. Read `references/onekey-social-visual-style-history.md` when deriving visual direction from historical OneKey social cases. Read `references/onekey-logo-usage.md` before selecting, placing, or reviewing any OneKey logo or icon. Read `references/onekey-product-image-usage.md` before using OneKey hardware/product images in a social post.

## Non-Negotiables

- Do not ask an image model to create the final social post.
- Do not let AI redraw the OneKey logo or partner logos.
- If the prompt explicitly says `参考 OneKey 插画风格绘制 xx 元素`, an image model may generate that single supporting illustration element. The generated element must not contain final social text, OneKey logos, partner logos, UI screenshots, numbers, dates, or factual claims, and the final social post must still be composed with OneKey brand rules, typography, logo usage, layout, and C.R.A.P. QA.
- Use content JSON as the source for final outputs.
- Validate before rendering.
- OneKey social output size is fixed at 512 x 512 px. Do not use 2048 x 2048, dynamic canvas sizing, or brief-derived dimensions for standard social posts.
- Use a 448 x 448 safe area inside the 512 x 512 canvas. Keep text, logos, images, and core content inside that safe area.
- If a composition uses an outer border or framed edge, use a 16 px border by default unless the user provides another value.
- If a composition uses an outer border, framed edge, card, panel, badge, or image container with rounded corners, use a 16 px corner radius by default unless the user provides another value.
- The compact green-border / white safe-area structure is one optional layout template, not the default for every formal output. Use it only when it matches the message and reference-case direction.
- When the compact green-border template is selected, use a full 512 x 512 OneKey Green background and a white safe-area panel at `x=16 y=16 w=480 h=480`. The white safe-area panel itself must have `16 px` corner radius and no stroke; the green border is the visible surrounding area, not a stroke on the white panel.
- Use only approved templates from `brand.onekey.json`.
- Use official colors, fonts, and logo assets from the local brand system.
- Extract and prioritize information before designing: keep one dominant message, one key proof/benefit, and one CTA/source cue at most. Move explanatory or background copy out of the image unless the user explicitly asks for it.
- Choose the layout from the message type and historical OneKey examples before placing elements. Formal output may use flexible layouts such as full white, full green, split green/white, large typography, table/list, product-image, co-brand, or photo-led compositions when appropriate.
- Select and place OneKey logos strictly according to `references/onekey-logo-usage.md`.
- Do not force every output into the same layout. The composition may change to fit the message, asset shape, and reading order, as long as brand colors, typography, logo rules, information priority, and C.R.A.P. checks are satisfied.
- Align logos by the visible logo artwork itself, not by the SVG frame, imported image frame, component bounding box, or transparent padding. When an official asset contains built-in whitespace, optically align the visible icon/wordmark edge to the grid or neighboring content.
- Align all elements to a clear visual axis. Equal spacing is for items within the same group or repeated components only; spacing between groups must express information hierarchy, not mechanically average-fill the canvas.
- On OneKey Green and white backgrounds, use official black App/common logo variants; on black backgrounds, use official green or white logo variants. Do not add a white logo container by default unless the layout intentionally needs a badge, navigation entry, or information card.
- If a source image, external logo, market logo, token icon, or screenshot does not fit its container cleanly, re-extract or re-crop the asset from the original source instead of stretching it, clipping key information, or forcing the layout around a bad crop.
- When an image with a solid-color background is used as an element inside the social image, remove the solid background and convert it to a transparent PNG before placing it in Figma or a template.
- When source images, partner logos, market logos, token icons, product screenshots, or cutout PNGs are used as foreground image elements, place the image cleanly without adding decorative styles by default. Do not add extra containers, shadows, strokes, glows, orbit rings, tags, filters, or other visual effects unless the user explicitly asks for that treatment or the source brand guideline requires it.
- For OneKey hardware/product imagery, use official product image nodes from the Figma `OneKey 产品图` section (`nodeId: 17979:7763`) and follow `references/onekey-product-image-usage.md`. Do not redraw, AI-generate, recolor, stretch, or restyle product renders.
- Use language-specific local font directories: English uses Roobert from `字体/英文字体`; Chinese uses MiSans from `字体/中文字体`.
- Follow the layout and image style reference derived from `OneKey_社媒图案例`; preserve OneKey's clean, bold, high-contrast, product-led visual system.
- Use the historical case style reference in `references/onekey-social-visual-style-history.md` to guide visual direction: Modern Tech + FinTech editorial, modular cards, generous whitespace, clear hierarchy, real product/UI assets, and data-led communication.
- Before finalizing any output, run a C.R.A.P. design check: Contrast, Repetition, Alignment, and Proximity must all support the message and OneKey brand system.
- Before delivery, inspect the final Figma screenshot or exported PNG and pass the final visual QA gate: correct Roobert/MiSans font usage, correct official logo asset and variant, approved brand colors only, text aligned to clear axes, same-group spacing consistent, repeated elements evenly spaced, group-to-group spacing hierarchical, and all image elements sized/cropped appropriately for their role and container.
- Figma output location is fixed: all generated OneKey social image frames must be placed inside `Social Media / 社媒品牌规范 / 产出社媒图` (`fileKey: Wl5WYHxce4FKlCk4hiWpQm`, page `17715:10025`, section `17852:1532`). Do not place generated frames on the page root, near reference examples, in product-image/component sections, or in any other Figma file/section unless the user explicitly changes the official skill configuration.
- If the user provides a Figma link and Figma MCP is available, create the final social image directly in that Figma file as editable nodes. Do not stop at a local PNG or plugin JSON unless the user asks for a local-only output or MCP write access fails.

## Font Rules

- English title text: Roobert-Bold from `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/字体/英文字体/英文_主标题字体/Roobert-Bold.ttf`.
- English description, labels, and CTA: Roobert-SemiBold from `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/字体/英文字体/英文_描述文字字体/Roobert-SemiBold.ttf`.
- English body text: Roobert-Regular from `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/字体/英文字体/英文_正文字体/Roobert-Regular.ttf`.
- Chinese title text: MiSans-Bold from `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/字体/中文字体/中文_主标题字体/MiSans-Bold.ttf`.
- Chinese description, labels, and CTA: MiSans-Semibold from `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/字体/中文字体/中文_描述文字字体/MiSans-Semibold.ttf`.
- Chinese body text: MiSans-Regular from `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/字体/中文字体/中文_正文字体/MiSans-Regular.ttf`.
- For local HTML/PNG rendering, load these `.ttf` files with `@font-face`; do not use web fonts as substitutes.
- For Figma MCP generation, call `figma.listAvailableFontsAsync()` and load the matching Figma font names before creating or editing text. If Roobert or MiSans is unavailable in the Figma environment, complete the layout with a fallback only after reporting that the exact brand font is unavailable and needs to be installed/activated in Figma for final brand parity.

## Logo Rules

- For common company, hardware, brand, partnership, education, and market posts, use logos from `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/logos/logo_常用`.
- For posts that mention OneKey App, show app UI, show an app screenshot, or include app/browser instructions, use logos from `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/logos/logo_图中出现app字样或者界面的时候使用`.
- On light backgrounds use the `logomark_浅色背景使用` assets. On dark backgrounds use the `logomark_深色背景使用` assets.
- Green OneKey logo or icon may be used only on black backgrounds; on OneKey Green and white backgrounds use a black logo or icon.
- For OneKey App use, use logo/icon assets with the circular-background treatment from the App-specific logo folder. For company or hardware product use, use the common OneKey wordmark or standalone key assets.
- Preserve the logo exclusion zone: at least half the icon height clear on all sides.
- Align the logo from its visible artwork edge. Ignore transparent padding, SVG viewBox whitespace, and component bounds when setting alignment to a card edge, safe-area guide, or text axis.
- Never recreate OneKey logos manually when an official SVG exists.

## Common Workflows

### Create A New Social Image

1. Read the user brief.
2. Choose a template: `single-partner`, `integration-grid`, `guide-cover`, or `perps-market`.
3. Create a draft content file:

```bash
cd /Users/jiangjie/Documents/社媒出图系统
npm run new -- --template single-partner --language en --name campaign-name
```

4. Edit the generated JSON with the brief content.
5. Run:

```bash
npm run build
```

6. Inspect the rendered PNG in `out/`.

### Create Directly In Figma

Use this path whenever the user gives a target Figma URL and Figma MCP tools are available.

1. Load the Figma write guidance before calling `use_figma`.
2. Use the fixed target: `Social Media` (`https://www.figma.com/design/Wl5WYHxce4FKlCk4hiWpQm/Social-Media?node-id=17715-10025`, `fileKey: Wl5WYHxce4FKlCk4hiWpQm`), page `社媒品牌规范` (`17715:10025`), section `产出社媒图` (`17852:1532`). This is not a loose default; all OneKey social output frames must be children of this section unless the official skill configuration is updated.
3. Before inserting a logo, read `references/onekey-logo-usage.md`, classify the image as App or common brand context, then choose the correct logo directory and background variant.
4. Create a 512 x 512 editable frame inside the `产出社媒图` section. Use OneKey brand colors, official logo assets, approved template structure, the 448 x 448 safe area, and clear alignment axes.
5. Place new frames within the `产出社媒图` section bounds, preferably after the rightmost existing output with consistent spacing. Do not place generated frames on the page root, outside the section bounds, near historical examples, in product-image/component/reference sections, or in another page/file.
6. Keep text, panels, badges, and decorative shapes as editable Figma nodes. Use image fills only for external partner/project logos or product screenshots that should not be redrawn.
7. Return the created frame ID and verify it with `get_screenshot`.
8. Run the fixed final review workflow after inspecting the screenshot. Use `npm run review -- --figma-url=<figma-url> --figma-node=<frame-id> --confirm` only after checking every review item: fixed Figma section, font, logo, brand colors, copy alignment, spacing, image sizing/crop, C.R.A.P., and all OneKey rules.
9. Optionally render a local PNG as a preview/export, but treat the Figma frame as the source of truth.

### Validate Existing Content

Run:

```bash
cd /Users/jiangjie/Documents/社媒出图系统
npm run validate
```

If validation fails, fix the JSON or the source asset path. Do not weaken the brand rules unless the user explicitly asks to change the system.

### Batch Render All Posts

Run:

```bash
cd /Users/jiangjie/Documents/社媒出图系统
npm run render:all
```

This validates each content file before rendering.

### Review Brand Consistency

Compare the output against:

- `/Users/jiangjie/Documents/社媒出图系统/brand-system/specs/qa-checklist.md`
- `/Users/jiangjie/Documents/社媒出图系统/brand-system/specs/template-catalog.md`
- `/Users/jiangjie/Documents/社媒出图系统/brand-system/prompts/ai-output-contract.md`

Report concrete violations: template mismatch, color drift, text overflow, missing logo source, factual risk, invented claims, or off-brand visual style.

Also run the C.R.A.P. design check every time:

- Contrast: the dominant headline, CTA, logo, and supporting copy must have clear visual hierarchy and sufficient black/white/green contrast.
- Repetition: repeated type weights, spacing, radii, badge styles, dividers, and logo treatment must feel intentional and consistent with OneKey references.
- Alignment: text, logos, panels, badges, dividers, and CTA must align to a clear grid or axis; avoid accidental centering, drifting edges, or optical imbalance.
- Proximity: related items must be grouped together, unrelated groups must have enough separation, and the layout should not create ambiguous relationships.
- Alignment and spacing discipline: verify every element belongs to a visible axis; equal spacing is used within groups or repeated elements, while group-to-group spacing supports hierarchy rather than making the image feel like a table.
- Information priority: remove secondary facts, explanatory sentences, repeated labels, and low-value CTAs until the image has one clear reading path.
- Logo usage: verify App/common context, background color variant, green-logo restriction, official source asset, proportional scaling, and exclusion zone from `references/onekey-logo-usage.md`.
- Historical style fit: verify the image still reads as Web3 / FinTech / professional / minimal / data-led / international, with card-like modularity, strong whitespace, and real product or source assets where relevant.
- Final visual QA gate: verify the actual final screenshot/export, not only layer names or coordinates. Confirm the font is the correct Roobert/MiSans role, the logo is the correct official asset and background variant, colors are approved OneKey tokens, text is aligned and readable, same-group spacing is equal/consistent, group spacing supports hierarchy, and every image element has appropriate scale, crop, aspect ratio, and visual weight.

Then run the fixed review script:

```bash
cd /Users/jiangjie/Documents/社媒出图系统
npm run review -- --figma-url=<figma-url> --figma-node=<frame-id> --confirm
```

For local PNG-only checks, pass the exported image:

```bash
npm run review -- --image=out/example.png --confirm
```

Do not mark an output complete until this review step has passed.

## Figma Builder

The system includes a local Figma development plugin:

```text
/Users/jiangjie/Documents/社媒出图系统/figma-plugin/manifest.json
```

Prepare a Figma-safe JSON payload with:

```bash
cd /Users/jiangjie/Documents/社媒出图系统
npm run figma:prepare -- brand-system/content/example-en.json
```

Then open the `Social Media` Figma file, run `Plugins > Development > OneKey Social Image Builder`, paste the generated `out/figma-json/*.figma.json`, and create the editable frame in the fixed `社媒品牌规范 / 产出社媒图` section. Do not create the frame elsewhere.

When Figma MCP tools are available, use the Figma skills first and create real editable nodes, not a pasted flattened PNG.

Figma MCP is configured in `/Users/jiangjie/.codex/config.toml` as `mcp_servers.figma`. It requires `FIGMA_OAUTH_TOKEN` in the environment that launches Codex, followed by a Codex restart. If Figma MCP tools are still unavailable, check the token and restart state before falling back to the local plugin.
