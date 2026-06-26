# OneKey Brand Rules For Social AI Images

## Assets

- Brand root: `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范`
- Colors: `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/颜色规范.png`
- Reference images: `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/OneKey_社媒图案例`
- Chinese fonts: `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/字体/中文字体`
- English fonts: `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/字体/英文字体`
- Logos: `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/logos`
- Product image source: Figma `Social Media / 社媒品牌规范 / OneKey 产品图` (`fileKey: Wl5WYHxce4FKlCk4hiWpQm`, `nodeId: 17979:7763`)
- Product image usage rules: `/Users/jiangjie/.codex/skills/onekey-social-image-system/references/onekey-product-image-usage.md`

## Core Visual DNA

- Use a fixed 512 x 512 px canvas for OneKey social outputs. Do not use 2048 x 2048, dynamic canvas sizing, or brief-derived dimensions for standard social posts.
- Use a 448 x 448 safe area; keep important text, logos, image elements, and main content blocks inside it.
- For frames with an outer border or framed edge, use a 16 px border by default.
- Use a 16 px corner radius by default for rounded borders, framed edges, cards, panels, badges, and image containers.
- Major layout blocks, borders, inset cards, image areas, logo placement, and text groups should align to clear axes and consistent spacing.
- OneKey green should be a strong first-viewport signal, either as full background, major block, border, or dominant panel.
- Black oversized headline.
- White rounded rectangle panel for structured content.
- Large logomark or wordmark modules with direct labels.
- Short CTA near the bottom.
- Minimal palette and high contrast.
- No decorative complexity unless converted into a controlled template.

## Layout Philosophy

Reference images are inspiration for tone, not layout locks. Do not force every output to mimic a provided image.

Good OneKey social layouts should be:

- simple
- clean
- spacious
- information-first
- easy to understand in 1-2 seconds
- visually consistent through tokens, not repetitive composition

Vary composition based on content:

- Use a large headline when the announcement itself is the hook.
- Use a large logo/product block when a partner, chain, market, or feature is the hook.
- Use a grid only when there are multiple comparable items.
- Use a compact badge or metric block only when the number is important.
- Use one main panel or two clear zones; avoid many floating fragments.

## Exact Tokens

- Green: `#3BD23D`
- Black: `#000000`
- White: `#FFFFFF`
- Secondary gray: `#6A6A6A`
- Pale green only for low-emphasis patterning: `#B9F4BA`
- Chinese title font: MiSans-Bold
- Chinese body/label/CTA font: MiSans-Semibold
- English title font: Roobert-Bold
- English body/label/CTA font: Roobert-SemiBold
- Logo usage: prefer official logomark or wordmark assets.
- Logo usage must follow `/Users/jiangjie/.codex/skills/onekey-social-image-system/references/onekey-logo-usage.md`: choose App or common asset source by context, use black logo/icon on OneKey Green and white backgrounds, use green or white logo/icon on black backgrounds, preserve official asset colors, and keep the exclusion zone clear.
- Product image usage must follow `/Users/jiangjie/.codex/skills/onekey-social-image-system/references/onekey-product-image-usage.md`: use official Figma product renders, choose the correct product family and view, preserve aspect ratio, align by visible product silhouette, and avoid added decorative effects by default.
- Historical visual style must follow `/Users/jiangjie/.codex/skills/onekey-social-image-system/references/onekey-social-visual-style-history.md`: Modern Tech + FinTech editorial, modular cards, generous whitespace, left-aligned efficient reading, data-led hierarchy, product-first imagery, and source-based token/market assets.

## Template Selection

Use `integration-grid` for:

- "Latest dApp integrations"
- "Supported chains"
- "Supported markets"
- "New token support"
- More than two comparable logos/items

Use `single-partner` for:

- One partnership or integration
- One supported project
- One token/market spotlight
- Two-logo relationship posts

Use `guide-cover` for:

- Security Lab covers
- Educational explainers
- "What is ..." posts
- Product education cards

Use `perps-market` for:

- Perpetual contract support announcements
- Leveraged market cards
- Trading pair launch posts
- Market-specific CTA graphics

## AI Image Model Policy

Allowed for AI image generation:

- abstract supporting texture if it remains in the approved palette
- simple non-logo object illustration used inside a white panel
- background-free bitmap asset that will be composed by the template
- a supporting illustration element when the prompt explicitly says `参考 OneKey 插画风格绘制 xx 元素`; it must follow the official OneKey illustration direction and be composed into the final post separately

Not allowed for AI image generation:

- final post image containing text
- OneKey logo
- partner logos
- UI screenshots with readable product claims
- market data, dates, fees, rates, numbers, or legal claims
- full replacement layouts

Generated OneKey-style illustration elements must remain secondary assets: transparent background where possible, no final social copy, no OneKey logo, no partner logo, no fake UI, no factual claims, no uncontrolled gradients/glows, and no style drift away from the approved OneKey social composition rules.

## Content JSON Shape

```json
{
  "template": "integration-grid",
  "language": "en",
  "headline": "The Latest dApp Integrations",
  "subheadline": "",
  "cta": "Learn more in App > Browser",
  "items": [
    { "name": "AAVE", "logo": "" }
  ]
}
```

## Good AI Instruction

```text
Convert this brief into OneKey social image content JSON.
Use only these templates: integration-grid, single-partner, guide-cover.
Keep the headline short.
Do not generate final image prompts.
Do not invent partner names, logos, claims, colors, or dates.
Return JSON only.
```

## Bad AI Instruction

```text
Make a futuristic crypto poster with green gradients, 3D hardware wallet, glowing logo, cinematic lighting, and bold text.
```

Why bad: it introduces gradients, 3D styling, uncontrolled logo rendering, and final text inside the image model.

## Visual QA Checklist

- Has the final Figma screenshot or exported PNG been inspected directly, not only layer names or coordinates?
- Is font usage correct: Roobert for English, MiSans for Chinese, with proper title/body/label weights?
- Is the OneKey logo the correct official asset, App/common context, and background color variant?
- Is the logo proportional, uncropped, aligned by visible artwork, and protected by its exclusion zone?
- Are all colors approved OneKey tokens with no accidental off-brand green, gray, gradient, or sampled color?
- Are headline, subtitle, CTA, labels, and supporting copy aligned to clear visual axes?
- Is same-group spacing equal or consistently following the spacing scale?
- Does group-to-group spacing support hierarchy and reading order instead of mechanically averaging the canvas?
- Are image elements appropriately sized, cropped, and weighted for their role and container?
- Does the canvas look like OneKey within one second?
- Does the image read as Web3 / FinTech / professional / minimal / data-led / international?
- Does it use a modular card or clear information structure where appropriate?
- Is whitespace used intentionally instead of being filled with decoration?
- Are colors limited to approved tokens?
- Is the headline short and dominant?
- Are title and body fonts using the required Bold/SemiBold weights?
- Is the OneKey logomark or wordmark pulled from assets instead of redrawn?
- Is the OneKey logo selected from the correct App/common directory for the context?
- On OneKey Green or white backgrounds, is the OneKey logo/icon black?
- On black backgrounds, is the OneKey logo/icon green or white?
- Is the exclusion zone at least half the icon height on all sides?
- If OneKey hardware/product imagery is used, does it come from the official Figma `OneKey 产品图` section?
- Is the correct product family, color, and view selected for the message?
- Is the product render unmodified, proportionally scaled, readable against the background, and free of added decorative styling by default?
- Are partner logos supplied by source files rather than hallucinated?
- If a source image has a solid-color background and is used as a foreground element, has it been cut out and converted to a transparent PNG?
- Are product screenshots real and inspectable when the post is about app or product features?
- Are people assets used only when the content calls for AMA, KOL, guest, or community-person context?
- If 3D is used, does it feel realistic and product/activity-driven rather than cartoon-like?
- Is the layout based on a known template?
- If the layout varies, does it still feel simple, clean, and easy to scan?
- Is the CTA short and placed away from key visual content?
- Does any text overflow, collide, or become too small?
- Are factual claims traceable to the brief?
- C.R.A.P. check:
  - Contrast: is the visual hierarchy obvious and readable?
  - Repetition: are type, spacing, radius, dividers, badges, and logo treatments consistent?
  - Alignment: do key elements sit on intentional axes or a grid?
  - Proximity: are related and unrelated information groups clearly separated?
