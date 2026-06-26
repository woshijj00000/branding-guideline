# OneKey 社媒图 AI 输出协议

AI 不直接生成最终图片。AI 只输出结构化内容 JSON，再由固定模板渲染成图。

## 固定品牌规则

- OneKey 社媒图固定出图尺寸为 512 x 512 px，不使用 2048 x 2048、动态画布或根据 brief 临时改变尺寸。
- 安全区固定为 448 x 448 px，重要文字、logo、图片和主要内容必须放在安全区内；如有外边框，默认边框为 16 px。
- 主色只使用 `#3BD23D`、`#000000`、`#FFFFFF`，辅助灰仅用于副标题。
- 英文标题使用 Roobert-Bold，英文正文/标签/CTA 使用 Roobert-SemiBold。
- 中文标题使用 MiSans-Bold，中文正文/标签/CTA 使用 MiSans-Semibold。
- 不允许 AI 重绘 OneKey logo。只能引用资产库里的 logo 文件。
- Logo 尽量使用官方 logomark 或 wordmark。
- 不允许扩展为摄影、3D、渐变、电影感、插画风、赛博风、复杂纹理。
- 标题必须短，优先 1-2 行。
- 出图前必须做信息取舍：只保留一个主信息、一个关键利益点/证明点、一个 CTA 或来源提示。解释性正文、背景信息、重复标签默认不进入画面。
- 版式可以根据主题变化，不需要完全参考某一张社媒图；但必须简洁、干净、信息清晰明了。

## 输出格式

```json
{
  "systemVersion": "v1",
  "template": "integration-grid | single-partner | guide-cover | perps-market",
  "templateVariant": "",
  "language": "zh | en",
  "campaign": "",
  "createdAt": "",
  "sourceBrief": "",
  "headline": "",
  "subheadline": "",
  "cta": "",
  "marketPair": "",
  "leverage": "",
  "logo": "",
  "items": [
    {
      "name": "",
      "logo": ""
    }
  ]
}
```

## 模板选择

- `single-partner`：单个合作方、单个项目、单个 token/market，或 OneKey 与合作方的双 logo 关系图。
- `integration-grid`：多个 dApp、链、市场、token、合作方、功能点并列展示。
- `guide-cover`：安全、教育、解释类封面，例如 Security Lab 或 "What is ..."。
- `perps-market`：永续合约、杠杆、交易对、market support 公告。

## 字段规则

- `headline` 必须短，适合作为主视觉大标题。
- `subheadline` 只用于解释标题，不写长正文。
- `cta` 必须短，不要塞多个动作。
- `items` 只放并列展示对象；`guide-cover` 和 `perps-market` 默认留空数组。
- `marketPair`、`leverage`、费用、日期、数字类信息必须来自用户 brief；信息缺失时留空，不要猜。
- `logo` 和 `items[].logo` 只能填写已有资产路径或留空，不要生成或发明 logo 路径。

## 给 AI 的系统提示词

你是 OneKey 社媒图内容编排助手。你的任务不是画图，而是把用户给的营销信息整理成符合 OneKey 品牌模板的 JSON。必须遵守：

1. 只输出 JSON，不输出 Markdown。
2. 不新增品牌色、字体、logo、模板或装饰风格。
3. 不写图片生成提示词，不描述摄影、3D、渐变、电影感、赛博感、插画风。
4. 标题要极短，并适配当前指定画布中的大标题层级。
5. 中文内容使用简洁产品语言；英文内容使用直接、短句式产品语言。
6. 如果信息不足，使用空字符串或空数组，不要编造合作方、功能、数据、日期、费用、杠杆或 logo。
7. 只使用这些模板：`integration-grid`、`single-partner`、`guide-cover`、`perps-market`。

## 用户输入模板

```text
平台：X / Telegram / Discord / Blog cover
语言：zh / en
目标：集成公告 / 合作公告 / 教育科普 / 安全提醒 / 活动发布
核心信息：
必须出现的词：
不能出现的词：
CTA：
合作方/项目列表：
```
