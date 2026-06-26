# OneKey Social Image Builder Figma Plugin

This local Figma plugin converts OneKey social content JSON into an editable 512 x 512 Figma frame.

## Install

1. Open the `Social Media` Figma file.
2. Go to `Plugins > Development > Import plugin from manifest...`.
3. Select:

```text
/Users/jiangjie/Documents/社媒出图系统/figma-plugin/manifest.json
```

## Use

1. Run `Plugins > Development > OneKey Social Image Builder`.
2. Paste a validated content JSON file from `brand-system/content`.
3. Keep target page as `04 AI Generated`.
4. Click `Create editable frame`.

The plugin creates real Figma nodes for the canvas, headline, panels, CTA, and item labels.

## Current Limits

- Local logo file paths cannot be read directly by Figma plugins. Use data URLs for image import, or let the plugin create editable fallback marks.
- The OneKey logomark is embedded as official SVG.
- Install Roobert and MiSans locally for exact brand typography. The plugin reports a warning if it must fall back to an available font.
