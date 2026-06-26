# QA Checklist

Use this checklist before publishing or approving an AI-generated OneKey social image.

The final workflow must end with:

```bash
npm run review -- --figma-url=<figma-url> --figma-node=<frame-id> --confirm
```

Only pass `--confirm` after inspecting the final Figma screenshot or exported PNG against every review item below.

## Content

- The JSON validates with `npm run validate`.
- The template matches the actual content type.
- The headline is short enough for a large social graphic.
- The CTA is direct and not crowded.
- The image keeps only the main message, one key proof/benefit, and one CTA/source cue; secondary explanation has been removed.
- No partner, feature, market, date, fee, leverage, or legal claim was invented.
- Any uncertain source field is blank instead of guessed.

## Brand

- Canvas size is fixed at 512 x 512 px for OneKey social outputs.
- All important text, logos, images, and main content blocks stay inside the 448 x 448 safe area.
- If a frame uses an outer border or framed edge, the border is 16 px by default unless the user specified another value.
- Borders, framed backgrounds, inset cards, image areas, logo placement, and text groups align to clear axes with consistent spacing.
- OneKey green is a strong visual signal.
- Colors stay within approved tokens.
- Chinese text uses MiSans with Bold/Semibold weights.
- English text uses Roobert with Bold/SemiBold weights.
- OneKey logo is from the official asset library.
- Partner logos are source assets, not AI-redrawn logos.

## Final Visual QA

- The final Figma screenshot or exported PNG has been inspected, not only the layer coordinates.
- Font usage is correct: English uses Roobert, Chinese uses MiSans, and title/body/label weights match the brand roles.
- OneKey logo usage is correct: official asset, App/common context, background color variant, proportional scaling, visible-artwork alignment, and exclusion zone.
- Colors are approved OneKey tokens; no off-brand green, accidental gray, gradient, or sampled color appears.
- Copy is aligned to clear visual axes; headline, subtitle, CTA, and labels do not drift or collide.
- Same-group spacing is equal or consistently follows the spacing scale.
- Group-to-group spacing supports visual hierarchy instead of mechanically averaging the canvas.
- Image elements have suitable size, crop, aspect ratio, and visual weight for their container and role.

## Layout

- The result is readable within 1-2 seconds.
- Text does not overflow or collide.
- No text is too small for feed viewing.
- The layout has one dominant message.
- The CTA does not compete with the headline.
- There are no decorative gradients, photo scenes, 3D mascots, or random effects.

## Figma

- The generated draft is an editable Figma frame, not a pasted flat image.
- Layers use stable names.
- The frame is saved to the expected `Social Media / 社媒品牌规范 / 产出社媒图` section.
- The frame name includes campaign, language, template, and date.
- Approved frames are duplicated or moved to the approved examples archive.
- `npm run review` has been run after the final screenshot/export inspection and the generated review report passes.
