# OneKey Product Image Usage

Use this reference when a OneKey social image needs hardware product renders, device imagery, or product-family visuals.

## Figma Source

- Source Figma file: `Social Media` (`fileKey: Wl5WYHxce4FKlCk4hiWpQm`)
- Source page: `社媒品牌规范` (`nodeId: 17715:10025`)
- Product image section: `OneKey 产品图` (`nodeId: 17979:7763`)

The product section contains official image-fill product renders. Treat these as source assets. Do not redraw them, regenerate them with AI, recolor them, or replace them with generic hardware mockups.

## Available Product Groups

- `OneKey Pro_black` (`17979:7600`): black OneKey Pro, 4 views.
- `OneKey Pro_white` (`17979:7665`): white OneKey Pro, 4 views.
- `BTC-Only` (`17979:7682`): transparent BTC-themed hardware, 4 views.
- `OneKey Classic 1S` (`17979:7703`): black Classic 1S, 4 views.
- `OneKey Classic 1S Pure` (`17979:7724`): white Classic 1S Pure, 4 views.
- `OneKey KeyTag` (`17979:7743`): seed backup / KeyTag product imagery, 4 views.

Each product group is arranged as a row of image-fill rectangles. When working directly in Figma, clone or reuse the product image node/fill from this section instead of exporting from screenshots.

## When To Use Product Images

Use product images when the post is about:

- hardware wallet products
- product launches or product-family promotion
- security, backup, recovery, or self-custody education
- hardware-related features
- product comparison or product selection
- brand trust signals where real product presence matters

Prefer product images over generic illustration when the message depends on a physical OneKey product.

Do not use product images for posts where the product is not relevant, such as pure market/perps launches, partner logo grids, chain support, dApp integrations, or data/ranking posts. Those should use source logos, token icons, product UI, or data modules.

## Product Selection

- Use `OneKey Pro_black` for premium, flagship, technical, security, or high-contrast compositions.
- Use `OneKey Pro_white` for clean, bright, minimal, product-launch, or lifestyle-light compositions.
- Use `BTC-Only` only for Bitcoin-only, BTC custody, transparent-device, or hardware-collector contexts.
- Use `OneKey Classic 1S` for compact hardware wallet, everyday security, entry product, or classic product communication.
- Use `OneKey Classic 1S Pure` for white/minimal/clean hardware communication.
- Use `OneKey KeyTag` for seed phrase, backup, recovery, inheritance, fire/water-resistant backup, or self-custody education.

## View Selection

- Front view: use when the screen, product identity, or feature surface is important.
- Three-quarter front view: use as the default hero angle because it has depth and product presence.
- Side/back view: use only to communicate hardware form, thinness, material, ports, or product lineup variety.
- Flat product accessory view: use for KeyTag and backup-focused compositions.

Use one main product image per social post by default. Use multiple views only for a deliberate product lineup, comparison, or feature breakdown.

## Composition Rules

- Keep the product image secondary to the headline unless the product itself is the campaign hook.
- For 512 x 512 outputs, keep product imagery inside the 448 x 448 safe area.
- For 512 x 512 outputs, product hero size usually sits around 35-50% of the canvas width. Increase only when the product is the main hook and text remains readable.
- Keep enough negative space around the product so the silhouette is readable.
- Align the visible product subject, not the image rectangle bounds or transparent padding.
- Preserve the product's original aspect ratio. Do not stretch, squash, skew, recolor, repaint, or rotate beyond the source angle.
- Avoid cropping through important product identity marks, screen area, buttons, ports, or KeyTag details.
- Use at most two product-family images unless the layout is explicitly a product lineup.
- Do not place product images behind text or logos.

## Background And Contrast

- Black product renders work best on white, light gray, or OneKey Green fields.
- White product renders need enough contrast; use black, OneKey Green, or a controlled light-gray/white panel with visible separation.
- Transparent BTC-themed devices need strong background contrast and should not be placed on busy imagery.
- KeyTag product images are mostly white/light gray; avoid low-contrast white-on-white placement unless the panel, shadow already in the image, or background separation remains visible.

If the product disappears against the background, change the layout background or choose a different official product variant before adding decorative effects.

## Styling Rules

- Product images do not need additional styling by default.
- Do not add extra shadows, strokes, glow, orbit rings, badges, filters, gradients, or artificial reflections to product renders.
- Do not wrap product renders in a decorative container just to make them visible. First choose the correct product variant and background.
- If a panel is needed for layout structure, use the standard OneKey card/panel rules: approved colors, 16 px radius, clear alignment, and no nested-card clutter.
- Keep product renders source-faithful. Do not retouch product color, screen content, brand marks, or physical details.

## Logo Context

Hardware/product posts use the common company or hardware logo rules, not the App-specific logo rules, unless the composition also shows app UI or explicitly talks about OneKey App.

- Company or hardware product context: use common OneKey wordmark or standalone key assets.
- App plus hardware context: choose logo according to the dominant message. If app UI is central, use App logo treatment; if hardware is central, use common/hardware logo treatment.

Always follow `onekey-logo-usage.md` for background color, logo variant, exclusion zone, and visible-artwork alignment.

## Figma Workflow

When creating social images in Figma:

1. Locate `Social Media / 社媒品牌规范 / OneKey 产品图`.
2. Pick the product group and view that matches the brief.
3. Clone or reuse the image-fill rectangle from that section.
4. Place it into the final social frame inside `产出社媒图`.
5. Scale proportionally and align by the visible product silhouette.
6. Verify the screenshot export for contrast, cropping, and overlap.

Do not screenshot the product section and crop from the screenshot unless direct Figma node reuse is blocked.

## QA Checklist

- Is the product relevant to the message?
- Did the product come from the official `OneKey 产品图` section?
- Is the correct product family selected?
- Is the product variant readable against the background?
- Is the product aligned by visible silhouette, not image bounds?
- Is the aspect ratio preserved?
- Are important product details uncropped?
- Are there no added shadows, strokes, glows, filters, or decorative containers by default?
- Is the logo context common/hardware vs App selected correctly?
- Does the final social image still pass OneKey typography, color, layout, safe-area, C.R.A.P., and information hierarchy rules?
