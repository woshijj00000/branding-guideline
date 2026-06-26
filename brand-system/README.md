# OneKey 社媒 AI 出图系统

这套系统的目标是让 AI 出图稳定、可复用、不跑偏。核心做法是把「创意生成」和「最终排版」分开：AI 只生成结构化内容，最终图片由固定品牌模板渲染。

## 推荐工作流

1. 用户给营销 brief。
2. AI 根据 `prompts/ai-output-contract.md` 输出内容 JSON。
3. `scripts/validate-content.mjs` 校验字段、长度、模板、变体、logo 路径和禁用风格词。
4. `scripts/render.mjs` 使用 HTML/CSS 模板渲染 512 x 512 PNG；安全区固定为 448 x 448。
5. 后续 Figma Builder 使用同一份 JSON 生成可编辑 Figma Frame。
6. 人工审核事实、logo 授权、发布文案和 QA 清单。

## 为什么这样稳定

- 颜色、字体、logo、512 x 512 画布和 448 x 448 安全区来自 `brand.onekey.json`，不是每次 prompt 临时描述。标题固定用 Roobert-Bold/MiSans-Bold，正文和 CTA 固定用 Roobert-SemiBold/MiSans-Semibold。
- 模板控制信息层级、留白、圆角、品牌锁定区，AI 无法随意改版式。
- AI 输出 JSON，不在图片里直接生成文字，避免错字、乱码和字体漂移。
- 每种内容类型都有独立模板，例如 `integration-grid`、`single-partner`、`guide-cover`。
- 校验脚本提前拦截超长标题、未知模板、禁用风格词。

## 本地使用

```bash
npm install
npm run validate
npm run render:all
```

输出图片会生成在 `out/` 目录。

## 给团队成员的最快流程

```bash
npm run new -- --template single-partner --language en --name campaign-name
```

然后编辑生成的 `brand-system/content/campaign-name.json`，再运行：

```bash
npm run build
```

更多操作说明见：

- `docs/operator-guide.md`
- `docs/brief-template.md`
- `docs/figma-sharing-plan.md`

## Codex Skill

本机已安装 Codex skill：

```text
$onekey-social-image-system
```

之后可以直接让 Codex 使用它，例如：

```text
Use $onekey-social-image-system to create an English single-partner social image for this brief...
```

skill 位置：

```text
/Users/jiangjie/.codex/skills/onekey-social-image-system
```

## Figma Builder v1

已新增本地 Figma 插件：

```text
figma-plugin/manifest.json
```

安装方式：

1. 打开 `Social Media` Figma 文件。
2. 进入 `Plugins > Development > Import plugin from manifest...`。
3. 选择 `/Users/jiangjie/Documents/社媒出图系统/figma-plugin/manifest.json`。

使用方式：

```bash
npm run figma:prepare -- brand-system/content/example-en.json
```

然后把 `out/figma-json/example-en.figma.json` 的内容粘贴到 Figma 插件里，点击 `Create editable frame`。插件会在 `04 AI Generated` 页面创建可编辑 Frame。

## 目录说明

- `brand.onekey.json`：品牌 token 和模板规则的唯一来源。
- `content/*.json`：每张图的结构化内容。
- `docs/operator-guide.md`：团队成员使用手册。
- `docs/brief-template.md`：社媒图需求 brief 模板。
- `docs/figma-sharing-plan.md`：Figma 文件协作和命名建议。
- `prompts/ai-output-contract.md`：约束 AI 输出的系统提示词。
- `schemas/social-content.schema.json`：内容 JSON 的结构化 schema。
- `specs/v1-system-spec.md`：v1 系统实现规格。
- `specs/template-catalog.md`：v1 模板类型、变体和使用边界。
- `specs/qa-checklist.md`：发布前 QA 检查清单。
- `templates/square-social.html`：固定 512 x 512 方图模板。
- `scripts/validate-content.mjs`：内容校验。
- `scripts/render.mjs`：PNG 渲染。

## 后续扩展

- 增加 Figma Builder：用同一份 JSON 在 `Social Media` 文件中创建可编辑 Frame。
- 增加视觉回归测试：检查颜色比例、文字溢出、画布尺寸和关键区域。
- 增加 partner logo registry：集中管理合作方 logo 来源、授权和 fallback。
- 增加 template variants：在现有模板内扩展版式，而不是复制散乱模板。
