# OneKey Logo Usage Rules

This reference is transcribed and operationalized from the OneKey logo usage sheet provided by the user. Use it whenever producing, reviewing, or editing OneKey social images.

## Core Logo Principle

- The OneKey logo combines a simple modern wordmark with the key icon.
- Prefer the full logo or wordmark when space allows.
- Use the standalone icon only when there is not enough room for the full logo, or when the OneKey brand has already been clearly established in the same image or campaign.
- Use logotype, App icon, common icon, or standalone key variants according to the communication context. Do not substitute one logo style for another only because it visually fits the available space better.
- Never redraw, trace, retype, recolor, stretch, crop, or reconstruct the OneKey logo manually when an official asset exists.

## Asset Source

Use official logo files from:

```text
/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/logos
```

App-specific assets:

```text
/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/logos/logo_图中出现app字样或者界面的时候使用
```

Common company, brand, hardware, education, partnership, and market assets:

```text
/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范/logos/logo_常用
```

Figma reference:

```text
Social Media / 社媒品牌规范 / OneKey 社媒 Figma 组件示例 / Social/Brand Logo
```

Use this Figma component reference to inspect official logotype, icon, and standalone key examples before selecting a logo style.

## Scenario Selection Matrix

Use `logo_图中出现app字样或者界面的时候使用` when the image:

- says `OneKey App`
- announces an app feature
- shows an app UI or app screenshot
- gives app navigation such as `Open OneKey App > Browser`
- asks the user to do something inside the app

Use `logo_常用` when the image is about:

- OneKey as a company or brand
- OneKey hardware products
- education or security content
- partnerships, integrations, events, market announcements, or general brand communication
- a standalone OneKey key mark without App context

If both contexts appear, choose based on the main call to action:

- App CTA or app workflow is primary: use App-specific logo assets.
- Company, hardware, or brand credibility is primary: use common logo assets.

## Background And Color Rules

- Green OneKey logo or green OneKey icon may be used only on black backgrounds.
- On any other background, use a monochrome logo or icon.
- Use black OneKey logo or icon on OneKey Green backgrounds.
- Use black OneKey logo or icon on white backgrounds.
- Use green or white OneKey logo or icon on black backgrounds.
- For any other light-colored background, use a black monochrome logo or icon.
- For any other dark-colored background, use a white monochrome logo or icon.
- Do not place a green logo directly on a green, tinted, photographic, gradient, or busy background.
- Do not sample colors from the logo and apply them manually to recreated shapes. Preserve the official asset colors.

## OneKey Green Background Rule

- When placing a OneKey logo on a OneKey Green background, use the official black App or common logo variant.
- Do not add a white background container behind the logo by default.
- Use a white logo container only when the layout specifically needs a badge, navigation entry, information card, or other deliberate UI/card treatment.
- If a logo needs a container for contrast, first check whether the official black logo variant would solve the issue without adding a container.
- A white container must be treated as a designed layout element, not as a workaround for uncertain logo selection.

## App Versus Company Logo Treatment

For OneKey App use:

- Use the logo or icon with a circular background treatment from the App-specific logo assets.
- App logo/icon may appear as icon-only or icon + OneKey wordmark, depending on available space.
- Do not replace App assets with the common standalone key mark.

For company or hardware product use:

- Use `OneKey` wordmark or standalone key assets from the common logo set.
- Do not use the App circular-background mark unless the image explicitly references the app.

## Exclusion Zone

- The logo and icon exclusion zone equals half the height of the icon, marked as `x` in the logo usage sheet.
- Keep at least this exclusion zone clear on all sides of the logo or standalone icon.
- Do not place text, partner marks, card edges, dividers, or crop boundaries inside the exclusion zone.
- If the exclusion zone cannot be preserved, use a smaller logo, switch to icon-only, or move the logo to a cleaner location.

## Clear Space And Placement

- Keep OneKey marks crisp, centered, and surrounded by generous whitespace.
- Align OneKey marks by the visible logo artwork, not by the SVG viewBox, imported image frame, component bounding box, or transparent padding.
- When an official logo asset has built-in whitespace, position the asset so the visible icon or wordmark edge aligns to the intended grid line, safe-area guide, card edge, or text axis.
- Do not treat an asset's invisible frame as the alignment subject. The frame can extend beyond the alignment guide if needed, as long as the visible logo remains correctly aligned and uncropped.
- For optical alignment, use the visible left/top edge of the icon or full lockup as the anchor. Preserve the official proportions and do not crop the asset to solve alignment.
- Never place important logos near the canvas crop boundary.
- Avoid stacking OneKey and partner logos too tightly; preserve clear visual separation.
- The logo should read as a brand anchor, not compete with the headline unless the logo/product is the main subject.

## UI Color Note

- The green used in UI can differ from the green embedded in official logo assets.
- Do not recolor the official logo to match UI green.
- Do not use the official logo green as a general decorative color unless the brand token or user brief explicitly allows it.
- For social-image backgrounds and layout blocks, follow the active OneKey social brand tokens; for logo rendering, preserve the official logo asset colors.

## Forbidden Logo Handling

Do not:

- redraw OneKey logo or icon with vector paths unless the official SVG path is being inserted exactly from the source asset
- type `OneKey` manually as a replacement for the official wordmark
- crop the logo, icon, or wordmark
- stretch or non-proportionally scale the logo
- rotate, skew, outline, add glow, add gradient, add texture, or apply arbitrary shadows to the logo
- place green logo/icon on non-black backgrounds
- use App circular-background logo for company or hardware-only communications
- use common standalone key mark for explicit App communications
- let an image model render the final OneKey logo

## Required Preflight Before Producing An Image

Before creating or finalizing a OneKey social image, answer these checks:

1. Is this App context or common company/hardware/brand context?
2. Is the selected logo from the correct directory?
3. If unsure which logotype/icon/key variant to use, did you inspect the Figma `Social/Brand Logo` reference?
4. Is the background light, dark, black, white, or another color?
5. Does the logo color variant match the background rule?
6. If the logo is green, is the background strictly black or white?
7. On a OneKey Green or white background, did you use a black logo or icon?
8. If a white logo container is present, is it required by the layout as a badge, navigation entry, or information card?
9. Is the exclusion zone at least half the icon height on all sides?
10. Is the visible logo artwork, not its invisible frame or component bounds, aligned to the intended grid or content axis?
11. Is the OneKey logo scaled proportionally, surrounded by its exclusion zone, and clearly secondary to the main message unless the logo is the subject?
12. Is the logo unmodified, uncropped, and proportionally scaled?
13. Are partner or market logos supplied from source files rather than redrawn?

If any answer is uncertain, stop and inspect the source logo folder or ask for the correct asset before generating the final image.
