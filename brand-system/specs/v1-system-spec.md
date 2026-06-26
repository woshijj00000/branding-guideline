# OneKey Social AI Image System v1

## Goal

Build a stable, reusable OneKey social image system where AI helps with content structuring, while fixed brand templates control the final visual output.

The system must support two outputs from the same content JSON:

- editable Figma frames saved back into the `Social Media` Figma file
- production PNG exports for social publishing

AI must not create the final image directly.

## Source Of Truth

- Brand tokens: `brand-system/brand.onekey.json`
- Content contract: `brand-system/prompts/ai-output-contract.md`
- Content schema: `brand-system/schemas/social-content.schema.json`
- Template catalog: `brand-system/specs/template-catalog.md`
- Local brand assets: `/Users/jiangjie/Documents/社媒出图系统/brand-assets/OneKey_社媒图AI规范`
- Working renderer: `brand-system/templates/square-social.html`

## Production Flow

1. User provides a marketing brief.
2. AI converts the brief into content JSON only.
3. The JSON is validated against brand, template, and content rules.
4. The same JSON is rendered into:
   - an editable Figma frame in the `04 AI Generated` page
   - a PNG export for publishing review
5. QA checks brand consistency, text fit, logo source, factual claims, and layout integrity.
6. Approved outputs are moved or duplicated into an approved archive page.

## Figma File Structure

Use the existing `Social Media` Figma file as the visual operating system.

Recommended pages:

- `00 Brand Tokens`: colors, type styles, spacing, canvas, logo usage
- `01 Components`: reusable lockups, cards, badges, logo cells, CTA bars
- `02 Templates`: editable master frames for each template and variant
- `03 Approved Examples`: real approved historical examples
- `04 AI Generated`: generated editable drafts grouped by date and campaign
- `99 Rejected QA`: failed or off-brand outputs with notes

## AI Responsibility

AI may:

- choose the best approved template from the brief
- shorten headlines
- normalize CTA text
- structure partner, market, or guide content
- leave uncertain fields empty

AI must not:

- invent partner names, claims, dates, pricing, leverage, or legal statements
- invent colors, fonts, logo files, or template variants
- write final image prompts
- describe photorealistic, cinematic, 3D, gradient, cyberpunk, or illustration styles
- render text or logos inside generated bitmap images

## Template Responsibility

Templates control:

- canvas size
- colors
- typography
- logo placement
- panel geometry
- item count
- type scale
- safe area
- CTA location
- layout variants

The template layer may vary composition, but only through named variants.

## Figma Builder Responsibility

The Figma Builder should create real editable nodes:

- `FRAME` for the fixed 512 x 512 social canvas
- `TEXT` for headline, subheadline, labels, CTA, item names
- `RECTANGLE` or `FRAME` for panels, badges, dividers, and blocks
- official imported logo/image nodes for OneKey and partner assets
- grouped sections named with stable layer names

It must not paste a flattened PNG as the primary editable output.

## Required QA Gates

An output is not publishable until all gates pass:

- content JSON validates
- canvas size is fixed at 512 x 512 px
- approved colors only
- required fonts and weights only
- official OneKey logo asset used
- partner logos are supplied assets or explicit fallbacks
- no text overflow
- no tiny unreadable text
- no overlapping content
- factual claims match the source brief
- generated Figma frame is saved in the expected page

## Versioning

Every generated asset should carry:

- `systemVersion`
- `template`
- `templateVariant`
- `language`
- `campaign`
- `createdAt`
- `sourceBrief`

These fields make outputs traceable and allow future template migrations.
