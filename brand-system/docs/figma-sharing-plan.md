# Figma Sharing Plan

The `Social Media` Figma file should be the shared workspace for review, editing, and archive.

## Recommended Pages

- `00 Brand Tokens`
- `01 Components`
- `02 Templates`
- `03 Approved Examples`
- `04 AI Generated`
- `99 Rejected QA`

## Generated Frame Naming

Use this format:

```text
YYYY-MM-DD_campaign_language_template_variant
```

Example:

```text
2026-06-16_kamino-launch_en_single-partner_logo-pair-panel
```

## Review Status Labels

Use simple prefixes:

- `DRAFT /`
- `NEEDS QA /`
- `APPROVED /`
- `REJECTED /`

## What Must Stay Editable

- headline text
- subheadline text
- CTA text
- item names
- panels and badges
- logo/image nodes

Do not use a flattened PNG as the primary editable Figma output.

## Near-Term Workflow

The local Figma Builder v1 is available as a development plugin:

```text
/Users/jiangjie/Documents/社媒出图系统/figma-plugin/manifest.json
```

Use it like this:

1. Generate and validate the content JSON.
2. Prepare a Figma-safe JSON payload:

```bash
npm run figma:prepare -- brand-system/content/example-en.json
```

3. Open the `Social Media` Figma file.
4. Run `Plugins > Development > OneKey Social Image Builder`.
5. Paste `out/figma-json/*.figma.json`.
6. Create the editable frame in `04 AI Generated`.

## Figma MCP Setup

The Figma MCP server is configured in:

```text
/Users/jiangjie/.codex/config.toml
```

Configured server:

```toml
[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
bearer_token_env_var = "FIGMA_OAUTH_TOKEN"
http_headers = { "X-Figma-Region" = "us-east-1" }
```

Before Codex can call Figma MCP tools, the environment that launches Codex must include:

```bash
export FIGMA_OAUTH_TOKEN="<your-figma-oauth-token>"
```

After setting the token, restart Codex so the MCP server and tools are loaded into the next session.

## Builder Requirement

The Figma Builder should use the same content JSON files and create real Figma nodes in `04 AI Generated`.

Minimum node structure:

```text
FRAME 512x512
  Brand Lockup
  Headline
  Content Panel
    Item / Logo / Label
  CTA
```
