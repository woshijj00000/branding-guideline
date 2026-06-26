# OneKey Social Skill

This repository packages the OneKey social image Codex skills and the local renderable brand system.

## Install

```bash
chmod +x install.sh
./install.sh
```

Restart Codex after installation.

The installer copies these skills into `~/.codex/skills`:

- `onekey-social-image-system`
- `onekey-visual-consistency`

It also rewrites the installed skill paths so they point to this cloned repository.

The OneKey brand asset folder is included in this repository:

```text
brand-assets/OneKey_社媒图AI规范
```

If you need to override it with another local asset folder, install with:

```bash
ONEKEY_BRAND_ASSET_ROOT="/path/to/OneKey_社媒图AI规范" ./install.sh
```

## Figma MCP

For Figma output, connect Figma MCP once:

```bash
codex mcp add figma --url https://mcp.figma.com/mcp
codex mcp login figma --scopes mcp:connect
```

Restart Codex again after authorization.

## Usage

Ask Codex directly, for example:

```text
根据 OneKey 品牌规范生成一张社媒图，并放到 Social Media Figma 指定区域。
```

The local render system lives in `brand-system/`. The standard output size is fixed at `512 x 512`.

For the full teammate setup and Figma output workflow, see:

- [OneKey 社媒出图 Skill 使用指南](docs/onekey-social-skill-usage-guide.md)
