# OneKey Social Image Operator Guide

This guide is for teammates who need to produce OneKey social images without changing the underlying design system.

## What This System Does

The system turns a structured content JSON file into a branded OneKey social image.

The operator controls:

- message
- language
- template choice
- CTA
- partner/project names
- approved logo paths

The system controls:

- canvas size
- colors
- typography
- spacing
- logo rules
- layout limits
- brand QA checks

## Golden Rule

Do not ask AI to generate the final social image.

Use AI only to convert a marketing brief into content JSON. The template renderer creates the final image.

## Quick Start

From `/Users/jiangjie/Documents/社媒出图系统`:

```bash
npm install
npm run new -- --template single-partner --language en --name kamino-launch
npm run validate
npm run render:all
```

Generated PNG files are saved in `out/`.

## Codex Skill

This workstation includes a Codex skill for the same workflow:

```text
$onekey-social-image-system
```

Example prompt:

```text
Use $onekey-social-image-system to create a validated OneKey social image from this campaign brief.
```

The skill is installed at:

```text
/Users/jiangjie/.codex/skills/onekey-social-image-system
```

## Editable Figma Output

The system includes a local Figma plugin:

```text
/Users/jiangjie/Documents/社媒出图系统/figma-plugin/manifest.json
```

Install it in Figma:

1. Open the `Social Media` Figma file.
2. Go to `Plugins > Development > Import plugin from manifest...`.
3. Select the manifest above.

Prepare JSON for the plugin:

```bash
npm run figma:prepare -- brand-system/content/example-en.json
```

Paste the generated file from `out/figma-json/*.figma.json` into the plugin and click `Create editable frame`.

This creates editable Figma nodes for the canvas, headline, panels, CTA, item labels, and imported data URL logos.

## Step-By-Step Workflow

1. Fill out `brand-system/docs/brief-template.md`.
2. Ask AI to convert the brief into JSON using `brand-system/prompts/ai-output-contract.md`.
3. Create a new content file:

```bash
npm run new -- --template integration-grid --language en --name latest-integrations
```

4. Paste or edit the JSON in `brand-system/content/<name>.json`.
5. Run:

```bash
npm run validate
```

6. If validation passes, render:

```bash
npm run render:all
```

7. Review the PNG with `brand-system/specs/qa-checklist.md`.
8. Save the editable Figma version in the `Social Media` file once the Figma Builder is connected.

## Template Choices

Use `single-partner` for one partner, one app, one chain, one project, or a two-logo relationship.

Use `integration-grid` for multiple comparable apps, chains, partners, tokens, markets, or features.

Use `guide-cover` for education, security, or explainer covers.

Use `perps-market` for trading pairs, leverage, perpetual contract, or market support announcements.

See `brand-system/specs/template-catalog.md` for exact limits.

## Content File Rules

Keep these files human-readable. Use short values.

Required defaults:

- `systemVersion`: `v1`
- `language`: `zh` or `en`
- `template`: one approved template
- `headline`: short main message
- `items`: array, even when empty

Logo fields:

- Use an approved local path when available.
- Use an empty string when no logo file is available.
- Never invent logo paths.

## Common Validation Fixes

`headline is too long`: shorten the headline instead of reducing font size.

`Unknown template`: use one of the approved template names.

`Unknown templateVariant`: choose a variant listed in `brand.onekey.json`.

`items allows at most 0`: remove items from templates like `guide-cover` or `perps-market`.

`logo path does not exist`: fix the path or leave it empty.

`Forbidden style term found`: remove image-model style language such as gradient, cinematic, 3D, cyberpunk, or photorealistic.

## When To Ask A Designer

Ask a designer before publishing if:

- the content needs a new template type
- the post has unusual legal or financial claims
- the brand hierarchy feels unclear
- the partner logo source is uncertain
- text keeps failing because the message is too complex
