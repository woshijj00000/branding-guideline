#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CODEX_HOME="${CODEX_HOME:-"$HOME/.codex"}"
SKILLS_DIR="$CODEX_HOME/skills"
ASSET_ROOT="${ONEKEY_BRAND_ASSET_ROOT:-"$REPO_ROOT/brand-assets/OneKey_社媒图AI规范"}"

mkdir -p "$SKILLS_DIR"

for skill in onekey-social-image-system onekey-visual-consistency; do
  rm -rf "$SKILLS_DIR/$skill"
  cp -R "$REPO_ROOT/skills/$skill" "$SKILLS_DIR/$skill"
done

python3 - "$REPO_ROOT" "$SKILLS_DIR" "$ASSET_ROOT" <<'PY'
from pathlib import Path
import sys

repo_root = Path(sys.argv[1]).resolve()
skills_dir = Path(sys.argv[2]).resolve()
asset_root = Path(sys.argv[3]).resolve()
old_root = "/Users/jiangjie/Documents/社媒出图系统"
old_skills = "/Users/jiangjie/.codex/skills"
old_assets = "/Users/jiangjie/Documents/OneKey_社媒图AI规范"

for skill in ["onekey-social-image-system", "onekey-visual-consistency"]:
    skill_dir = skills_dir / skill
    for path in skill_dir.rglob("*"):
        if path.is_file() and path.suffix in {".md", ".yaml", ".yml", ".mjs"}:
            text = path.read_text()
            text = text.replace(old_root, str(repo_root))
            text = text.replace(old_skills, str(skills_dir))
            text = text.replace(old_assets, str(asset_root))
            path.write_text(text)
PY

echo "Installed OneKey Codex skills to $SKILLS_DIR"
echo "Using OneKey brand asset root: $ASSET_ROOT"
echo "Restart Codex to load the updated skills."
