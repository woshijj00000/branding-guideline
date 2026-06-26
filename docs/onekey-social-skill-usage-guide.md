# OneKey 社媒出图 Skill 使用指南

这份文档用于给同事快速安装 OneKey 社媒出图 skill，并把生成结果放到指定 Figma 文件区域。

## 1. 安装 Skill

先用 HTTPS clone 公开仓库：

```bash
git clone https://github.com/woshijj0512/branding-guideline.git
cd branding-guideline
```

仓库已设为 Public，用 HTTPS clone 不需要配置 GitHub SSH Key。

仓库已内置品牌资产文件夹：

```text
brand-assets/OneKey_社媒图AI规范
```

正常情况下，同事 clone 后直接运行：

```bash
chmod +x install.sh
./install.sh
```

如果需要改用其他位置的品牌资产文件夹，安装时再指定路径：

```bash
ONEKEY_BRAND_ASSET_ROOT="/path/to/OneKey_社媒图AI规范" ./install.sh
```

安装完成后重启 Codex。

安装脚本会把以下 skill 复制到 `~/.codex/skills`：

- `onekey-social-image-system`
- `onekey-visual-consistency`

## 2. 连接 Figma MCP

首次使用 Figma 出图前，需要完成 Figma MCP 授权：

```bash
codex mcp add figma --url https://mcp.figma.com/mcp
codex mcp login figma --scopes mcp:connect
```

授权完成后再次重启 Codex。

同事的 Figma 账号需要拥有目标文件的编辑权限，否则 Codex 只能读取或会写入失败。

## 3. 出图到指定 Figma 区域

固定输出位置已经写入 skill，产出的 Figma 图必须放在这里：

- Figma 文件：`Social Media`
- Figma 链接：`https://www.figma.com/design/Wl5WYHxce4FKlCk4hiWpQm/Social-Media?node-id=17715-10025`
- fileKey：`Wl5WYHxce4FKlCk4hiWpQm`
- 页面：`社媒品牌规范`
- page nodeId：`17715:10025`
- 分区：`产出社媒图`
- section nodeId：`17852:1532`

不要把产出图放到页面根节点、历史案例区、组件示例区、产品图区或其他 Figma 文件/分区。

使用时直接描述需求即可，例如：

```text
根据 OneKey 品牌规范生成一张社媒图，并放到 Social Media Figma 指定区域。
```

或提供更完整 brief：

```text
根据 OneKey 品牌规范生成一张 512x512 社媒图，主题是 OneKey Classic 1S has been listed on bitcoin.org，需要出现 OneKey Classic 1S 产品图，并放到 Social Media Figma 指定区域。
```

Codex 会优先在 Figma 中创建可编辑节点，而不是只生成一张本地 PNG。

出图完成后必须进行 Review。Codex 需要检查最终 Figma 截图或导出图，并运行：

```bash
npm run review -- --figma-url=<figma-url> --figma-node=<frame-id> --confirm
```

Review 会检查固定 Figma 落点、字体、logo、品牌色、文案对齐、间距、图片占位和所有 OneKey 规范。没有完成 Review 的图不算交付完成。

## 4. Figma 字体安装与激活

OneKey 社媒规范使用：

- 英文标题：Roobert-Bold
- 英文描述/标签/CTA：Roobert-SemiBold
- 英文正文：Roobert-Regular
- 中文标题：MiSans-Bold
- 中文描述/标签/CTA：MiSans-Semibold
- 中文正文：MiSans-Regular

字体文件位于仓库内品牌资产目录：

```text
brand-assets/OneKey_社媒图AI规范/字体
```

### macOS 推荐安装方式

方式一：用字体册安装

1. 打开 `brand-assets/OneKey_社媒图AI规范/字体`。
2. 进入中文、英文字体目录。
3. 双击需要的 `.ttf` 字体文件。
4. 在字体册中点击安装。

方式二：复制到用户字体目录

```bash
find "brand-assets/OneKey_社媒图AI规范/字体" -name "*.ttf" -exec cp {} "$HOME/Library/Fonts/" \;
```

安装完成后：

1. 重启 Figma。
2. 重启 Codex。
3. 在 Figma 里新建一个文本层，检查字体下拉列表中是否能搜到 `Roobert` 和 `MiSans`。

如果使用 Figma 网页版，还需要确保本机字体服务可用；如果字体仍不可见，优先使用 Figma 桌面版检查。

## 5. 常见问题

如果无法写入 Figma：

- 确认已经执行 `codex mcp login figma --scopes mcp:connect`。
- 确认授权后重启过 Codex。
- 确认 Figma 账号对 `Social Media` 文件有编辑权限。
- 确认请求里明确说明“放到 Social Media Figma 指定区域”。

如果字体不对：

- 确认 Roobert 和 MiSans 已安装到系统。
- 重启 Figma 和 Codex。
- 如果 Figma MCP 仍提示字体不可用，先用 Figma 桌面版手动确认字体是否出现在字体列表中。

如果 logo 或素材路径找不到：

- 优先确认仓库内 `brand-assets/OneKey_社媒图AI规范` 存在。
- 如果使用了外部资产覆盖，再确认 `ONEKEY_BRAND_ASSET_ROOT` 指向正确的 `OneKey_社媒图AI规范` 文件夹。
- 重新运行 `./install.sh`。
- 重启 Codex。
