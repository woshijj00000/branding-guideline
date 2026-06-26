# OneKey Social Image System Map

## Key Files

- `brand-system/README.md`: main entry for the local system.
- `brand-system/docs/operator-guide.md`: teammate operation guide.
- `brand-system/docs/brief-template.md`: brief template for request intake.
- `brand-system/docs/figma-sharing-plan.md`: Figma page, frame naming, and review-status plan.
- `brand-system/specs/v1-system-spec.md`: architecture and responsibility boundaries.
- `brand-system/specs/template-catalog.md`: approved template types and variants.
- `brand-system/specs/qa-checklist.md`: publish/review checklist.
- `brand-system/schemas/social-content.schema.json`: JSON structure contract.
- `brand-system/prompts/ai-output-contract.md`: prompt contract for AI-generated JSON.
- `brand-system/brand.onekey.json`: brand tokens, template rules, limits, variants.
- `scripts/new-content.mjs`: create a content JSON draft.
- `scripts/validate-content.mjs`: validate one content JSON file.
- `scripts/validate-all.mjs`: validate all content JSON files.
- `scripts/render.mjs`: render one PNG.
- `scripts/render-all.mjs`: validate and render all PNGs.
- `scripts/prepare-figma-json.mjs`: pack local logo paths into data URLs for the Figma plugin.
- `figma-plugin/manifest.json`: local Figma development plugin entry.

## Commands

Run commands from `/Users/jiangjie/Documents/社媒出图系统`.

```bash
npm install
npm run new -- --template single-partner --language en --name campaign-name
npm run validate
npm run render:all
npm run build
npm run figma:prepare -- brand-system/content/example-en.json
npm run review -- --figma-url=<figma-url> --figma-node=<frame-id> --confirm
```

## Template Selection

- `single-partner`: one partner, project, token, chain, or two-logo relationship.
- `integration-grid`: multiple comparable apps, chains, partners, tokens, markets, or features.
- `guide-cover`: educational, security, or explainer cover.
- `perps-market`: trading pair, leverage, perpetual contract, or market support announcement.

## Content Editing Pattern

Use `npm run new` to create a skeleton, then fill:

- `headline`
- `subheadline` when relevant
- `cta`
- `items`
- `marketPair` and `leverage` for `perps-market`
- `logo` and `items[].logo` only with existing asset paths or empty strings

Never invent factual claims, market numbers, dates, fees, leverage, partner names, or logo paths.

## Validation First

Always run `npm run validate` before rendering or sharing. Validation checks:

- unknown fields
- unknown templates and variants
- required fields
- headline, subheadline, and CTA length
- item count limits
- local logo path existence
- forbidden visual style terms

## Sharing With Teammates

Point teammates to:

1. `brand-system/docs/operator-guide.md`
2. `brand-system/docs/brief-template.md`
3. `brand-system/docs/figma-sharing-plan.md`

The shortest teammate command sequence is:

```bash
npm install
npm run new -- --template single-partner --language en --name campaign-name
npm run build
```

## Editable Figma Builder

Install the local Figma plugin from:

```text
/Users/jiangjie/Documents/社媒出图系统/figma-plugin/manifest.json
```

Prepare plugin input:

```bash
npm run figma:prepare -- brand-system/content/example-en.json
```

Paste the generated `out/figma-json/*.figma.json` into the plugin. The output location is fixed: create or move the editable nodes into `Social Media / 社媒品牌规范 / 产出社媒图` (`fileKey: Wl5WYHxce4FKlCk4hiWpQm`, page `17715:10025`, section `17852:1532`). Do not place generated social frames on the page root, in reference/example areas, or in another section.

After creating or updating the final frame, inspect the Figma screenshot/export and run:

```bash
npm run review -- --figma-url=<figma-url> --figma-node=<frame-id> --confirm
```

The review step must pass before the output is considered complete.

## Figma MCP

Figma MCP is configured in `/Users/jiangjie/.codex/config.toml`:

```toml
[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
bearer_token_env_var = "FIGMA_OAUTH_TOKEN"
http_headers = { "X-Figma-Region" = "us-east-1" }
```

It is only usable after `FIGMA_OAUTH_TOKEN` is present in the environment that launches Codex and Codex has been restarted.
