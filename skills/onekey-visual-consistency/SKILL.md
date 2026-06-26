---
name: onekey-visual-consistency
description: Maintain OneKey brand visual consistency for AI-assisted social media images, campaign graphics, announcement cards, educational covers, partner/integration posts, and image QA. Use when creating, rendering, reviewing, or prompt-engineering OneKey social visuals that must preserve fixed typography, colors, logo usage, layout rules, and brand tone across different topics or themes.
---

# OneKey Visual Consistency

Use this skill as a brand guardrail before creating or reviewing any OneKey social image. The goal is stable visual identity across changing topics while allowing varied, context-appropriate layouts.

## Source Of Truth

Prefer these local sources when available:

- Brand assets: `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范`
- Renderable system: `/Users/jiangjie/Documents/社媒出图系统`
- Brand token file: `/Users/jiangjie/Documents/社媒出图系统/brand-system/brand.onekey.json`
- AI content contract: `/Users/jiangjie/Documents/社媒出图系统/brand-system/prompts/ai-output-contract.md`
- Detailed rules: `references/onekey-brand-rules.md`
- Logo usage rules: `/Users/jiangjie/.codex/skills/onekey-social-image-system/references/onekey-logo-usage.md`
- Product image rules: `/Users/jiangjie/.codex/skills/onekey-social-image-system/references/onekey-product-image-usage.md`
- Historical social visual style: `/Users/jiangjie/.codex/skills/onekey-social-image-system/references/onekey-social-visual-style-history.md`
- Social examples: `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/OneKey_社媒图案例`

If the user is working outside that repo, still read the token file above before making brand decisions.

## Decision Flow

1. Classify the requested asset:
   - `integration-grid`: multiple apps, chains, markets, tokens, partners, features.
   - `single-partner`: one partner/app/project/token/market.
   - `guide-cover`: educational or security explainer cover.
   - `perps-market`: supported perpetual contract market, leveraged market, or trading pair announcement.
   - New template: create when the existing templates cannot express the brief cleanly.
2. Use template rendering for final post images whenever text, logo placement, or brand typography must be reliable.
3. Use image generation only for secondary bitmap assets, backgrounds, or conceptual illustrations that do not contain final text, OneKey logos, partner logos, UI screenshots, prices, dates, or factual claims.
   - If the prompt explicitly says `参考 OneKey 插画风格绘制 xx 元素`, use image generation only for that supporting illustration element. The final social image must still be assembled under OneKey social brand rules.
4. Keep AI output structured. Ask the AI model for JSON content, not a finished image prompt, unless the task is explicitly to generate a non-final supporting visual.
5. Validate content before rendering. In the renderable system, run:

```bash
npm run validate
```

6. Render with fixed templates, then visually inspect the PNG for overflow, missing logos, incorrect fonts, or layout drift.

## Non-Negotiable Brand Rules

- Canvas: OneKey social output size is fixed at 512 x 512 px. Do not use 2048 x 2048, dynamic canvas sizing, or brief-derived dimensions for standard social posts.
- Safe area: use a 448 x 448 safe area and keep all important text, logos, and images inside it.
- Border: when a layout uses an outer border or framed edge, use a 16 px border by default.
- Corner radius: when using an outer border, framed edge, card, panel, badge, or image container with rounded corners, use a 16 px radius by default.
- Standard compact green-border frame: this is one optional template, not the default output style. When selected, use a full 512 x 512 OneKey Green background and a white safe-area panel at `x=16 y=16 w=480 h=480`; the white panel must have 16 px radius and no stroke.
- Layout selection must happen before composition. Choose from historical case patterns according to copy type: list/table, typographic poster, feature block, metric-first, product-led, co-brand, education/security, launch/status, or lifestyle/image-led. Do not force unrelated briefs into the green-border white-card template.
- Colors: use `#3BD23D`, `#000000`, `#FFFFFF`; gray only for secondary text if needed.
- Fonts: English titles use Roobert-Bold; English body, labels, and CTA use Roobert-SemiBold. Chinese titles use MiSans-Bold; Chinese body, labels, and CTA use MiSans-Semibold.
- Font source paths are language-specific: Roobert lives in `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/字体/英文字体`; MiSans lives in `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/字体/中文字体`.
- Use the case-derived style from `/Users/jiangjie/.codex/skills/onekey-social-image-system/references/onekey-social-layout-image-style.md`: bold typography, strong green/black/white contrast, generous spacing, official logos, real product/UI assets, and one dominant message.
- Use the historical case analysis in `/Users/jiangjie/.codex/skills/onekey-social-image-system/references/onekey-social-visual-style-history.md`: Modern Tech + FinTech editorial, modular card layouts, large whitespace, left-aligned information flow, data-led communication, product screenshots, source token icons, rare people imagery, and realistic non-cartoon 3D only when appropriate.
- OneKey-style generated illustration elements are allowed only when explicitly requested by wording such as `参考 OneKey 插画风格绘制 xx 元素`; they must stay logo-free, text-free, claim-free, and secondary to the social post hierarchy.
- Logo: never let an AI image model redraw the OneKey logo. Prefer official logomark or wordmark assets from the local logo files.
- Logo selection and placement must follow `/Users/jiangjie/.codex/skills/onekey-social-image-system/references/onekey-logo-usage.md`: App vs common context, background color variant, green-logo restriction, circular App treatment, proportional scaling, and exclusion zone.
- Logo alignment must use the visible logo artwork as the anchor, not the SVG viewBox, imported image frame, component bounding box, or transparent padding. Offset the asset frame when needed so the visible icon or wordmark edge aligns to the intended grid, safe area, card edge, or text axis.
- Alignment and spacing must support hierarchy: every element needs a clear visual axis; equal spacing applies only within the same group or repeated elements, while group-to-group spacing should express importance and reading order.
- On OneKey Green and white backgrounds, use official black App/common logo variants; on black backgrounds, use official green or white logo variants. Do not add a white logo container by default unless the composition intentionally needs a badge, navigation entry, information card, or similar UI/card treatment.
- If a source image, external logo, market logo, token icon, or screenshot does not fit its container cleanly, re-extract or re-crop the asset from the original source before resizing or redesigning the container. Do not stretch, hide edges, or crop away important marks/text just to fit the existing layout.
- OneKey hardware/product images must use official product renders from the Figma `OneKey 产品图` section when available. Do not redraw, AI-generate, recolor, stretch, restyle, or add decorative effects to product renders by default.
- When an image with a solid-color background is used as a foreground element, remove the solid background and convert it to a transparent PNG before placement, unless that solid background is deliberately part of the composition.
- Foreground source images, partner logos, market logos, token icons, product screenshots, and cutout PNGs should be placed cleanly without additional decorative styling by default. Do not add cards, circular containers, shadows, strokes, glows, orbit rings, tags, filters, or other effects unless the user explicitly asks for them or the source brand guideline requires them.
- Layout: allow varied compositions. Do not copy reference-image layouts by default. Keep the result simple, clean, spacious, and immediately understandable.
- Layouts may change across outputs. Choose the composition from the message hierarchy, asset shape, and reading path instead of forcing every post into one fixed template.
- Information extraction: every image must choose the strongest message before layout. Keep one primary headline, one key benefit/proof, and one CTA/source cue at most; remove secondary explanations, background context, and repeated labels from the visual.
- Text: keep headlines short enough for 1-2 lines. Avoid dense body copy in the image.
- Tone: direct, product-led, minimal, technical, confident.
- C.R.A.P. check: every generated or reviewed image must pass Contrast, Repetition, Alignment, and Proximity before delivery.
- Final visual QA gate: inspect the actual final Figma screenshot or exported PNG before delivery. Confirm correct Roobert/MiSans font usage, correct official OneKey logo asset and background variant, approved brand colors, aligned copy, consistent same-group spacing, hierarchy-driven group spacing, and appropriately sized/cropped image elements.
- Final review workflow: after the final screenshot/export inspection, run `npm run review -- --figma-url=<figma-url> --figma-node=<frame-id> --confirm` from `/Users/jiangjie/Documents/社媒出图系统`. Do not consider the output complete until this review script passes.

## Layout Freedom

Vary the layout to fit the message while preserving brand consistency. Acceptable variations include:

- Full green background with one white content panel.
- White background with strong green blocks or frames.
- Large headline-first composition.
- Logo or product-first composition.
- Split information layout when comparison or pairing is important.
- Centered, left-aligned, or asymmetrical layouts if hierarchy stays clear.

Always preserve:

- one dominant message
- clear reading order
- generous spacing
- no decorative clutter
- no tiny text
- no more than 2-3 information groups unless the template is a grid; fewer is better when the main message is already clear
- brand colors, fonts, and logomark/wordmark rules

## C.R.A.P. Visual QA

Use these four principles as a mandatory final pass for every OneKey social image:

- Contrast: create a clear hierarchy between headline, support text, CTA, logo, and imagery. OneKey green, black, and white must separate roles instead of flattening everything into equal weight.
- Repetition: reuse the same brand tokens, type roles, spacing rhythm, radius style, line weight, badge style, and logo treatment within the image. Do not introduce one-off decorative styles.
- Alignment: anchor major elements to a deliberate grid or shared axis. Text edges, logo edges, panel edges, dividers, and CTA placement should look intentionally connected.
- Proximity: group related content tightly enough to read as one unit, and separate unrelated groups enough to avoid false relationships. Keep no more than 2-3 information groups unless using a grid template.
- Equal spacing: use equal gaps only for same-level or repeated items. Do not average-fill the canvas; social images should feel ordered, not table-like or evenly scattered.

If any principle fails, adjust the layout before delivery; do not explain the failure away as a stylistic choice.

Also verify historical style fit: the output should read as Web3, FinTech, professional, minimal, data-led, and international. It should use modular structure, strong whitespace, controlled copy length, and source-based product or token imagery when relevant.

## Final Visual QA Gate

Before approving or delivering the final image, inspect the final Figma screenshot or exported PNG and verify:

- Font: Roobert is used for English and MiSans is used for Chinese, with the correct title/body/label weights.
- Logo: OneKey logo is the correct official App/common asset, correct color variant for the background, proportional, uncropped, and aligned by visible artwork.
- Color: colors are limited to approved OneKey brand tokens and no off-brand green, gray, gradient, or accidental sampled color appears.
- Copy alignment: headline, subtitle, CTA, labels, and supporting copy align to clear visual axes and remain readable.
- Spacing: equal spacing is used only within the same group or repeated elements; group-to-group spacing supports hierarchy and reading order.
- Image placement: every photo, product render, screenshot, partner logo, market logo, token icon, or cutout has appropriate scale, crop, aspect ratio, and visual weight for its container and role.

If any item fails, adjust the design before delivery.

After all manual checks pass, record the review by running:

```bash
cd /Users/jiangjie/Documents/社媒出图系统
npm run review -- --figma-url=<figma-url> --figma-node=<frame-id> --confirm
```

## Forbidden Directions

Reject or rewrite requests that push final OneKey social visuals toward:

- photorealistic scenes
- cinematic lighting
- gradient backgrounds
- 3D mascots
- random decorative blobs
- cyberpunk or neon atmospheres
- hand-drawn, watercolor, collage, or editorial illustration styles
- AI-generated OneKey logos or fake partner logos
- final text rendered by diffusion/image models

## Recommended Implementation Pattern

For a new post:

1. Convert the brief into content JSON following the AI content contract.
2. Save it under `/Users/jiangjie/Documents/社媒出图系统/brand-system/content/`.
3. Run `node scripts/validate-content.mjs <content.json>`.
4. Render with `node scripts/render.mjs <content.json> out/<name>.png`.
5. Inspect the PNG. If it fails visually, adjust the JSON or template, not the brand rules.

For a new recurring visual type:

1. Add the template name and limits to `brand.onekey.json`.
2. Add the layout branch to `brand-system/templates/square-social.html`.
3. Add one example JSON.
4. Render at least one Chinese and one English sample.
5. Prefer adding layout variants inside a template over cloning the exact layout of a reference image.

For reviewing an AI-generated image:

1. Compare against `references/onekey-brand-rules.md`.
2. Compare logo usage against `/Users/jiangjie/.codex/skills/onekey-social-image-system/references/onekey-logo-usage.md`.
3. List concrete violations: color, type, logo, layout, text, factual/brand risk.
4. Prefer giving a corrected structured JSON or template change over vague prompt advice.

## Prompt Boundary

When asking an AI model to help, use this boundary:

> You are not creating the final image. Output only structured content for a OneKey fixed template. Do not invent colors, fonts, logos, layout styles, partner claims, or rendered text effects.

Read `references/onekey-brand-rules.md` when the task involves detailed prompt writing, template expansion, or visual QA.
