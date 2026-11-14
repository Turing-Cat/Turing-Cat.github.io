# Claude Style：按 Anthropic 官方的 brand-guidelines skill 重做界面

按 agent skill **`brand-guidelines`**（来源 `anthropics/skills` → `skills/brand-guidelines/SKILL.md`，Apache-2.0）
给的颜色、字体、用法规则落地。本地副本在 `~/.agents/skills/claude-brand/`，含 LICENSE 与中文补充表。

没有使用 Anthropic 的 logo、插图、文案、商标；只搬设计语言。

分支 `ui/cloud-style`（沿用），基线 `origin/main`。上游主题 `jekyll-theme-chirpy 7.4.1`（gem 安装）。

## 1. skill 给了什么，我怎么用

| skill 条目 | 值 | 落点 |
|---|---|---|
| 深色 | `#141413` | 正文色；暗色模式的页面底色 |
| 浅色 | `#faf9f5` | 页面底色；暗色模式下的文字 |
| 中灰 | `#b0aea5` | 暗色模式的次要文字（8.29:1）；亮色模式只做装饰与图表描边 |
| 浅灰 | `#e8e6dc` | 侧栏底色、图表聚类底色 |
| 橙（主强调） | `#d97757` | 时间线节点、TOC 竖条、hover、图标、图表备注框 |
| 蓝（次强调） | `#6a9bcc` | info 提示图标、图表第二色 |
| 绿（三级） | `#788c5d` | tip 提示图标、图表第三色 |
| 标题字体 | Poppins（回落 Arial） | `h1`–`h6`、站点标题、面板标题、导航与 UI 短文本 |
| 正文字体 | Lora（回落 Georgia） | 文章正文、首页摘要、引用块 |

### skill 没写、但 WCAG 需要的三个反推色

skill 的强调色是给形状和图标用的，当文字会掉到 3:1 以下。按 AA 反推同色相暗版，并记在此处：

| 用途 | 亮色 | 对比度 | 暗色（可直接用原色） |
|---|---|---|---|
| 正文链接 | `#a8502f` | 5.17:1 | `#d97757` 5.90:1 |
| 行内代码 | `#a04b2b` | 4.80:1 | `#e0a184` 7.01:1 |
| 次要文字 | `#5d5a53` | 6.53:1 | `#b0aea5` 8.29:1 |

原始 `#d97757` 在亮底是 2.96:1、白字在橙底是 2.96:1，所以**亮色模式里橙不写正文、不作按钮文字**；实心按钮用 `#141413` 字（5.90:1）。

## 2. 改前 / 改后（真实计算值）

Chromium 156（Playwright 1.65），1440×900 / 375×900，`prefers-color-scheme` 两种。
截图：`/tmp/ui-shots/before/`（改前）、`/tmp/ui-shots/after/`（改后）。

| 观察点 | 改前（Apple 风） | 改后（Claude Style） |
|---|---|---|
| 页面底色 | `#F5F5F7` 冷灰 | `#FAF9F5` 品牌浅色 |
| 侧栏 | `rgba(245,245,247,.78)` | `#E8E6DC` 品牌浅灰（暗色 `#0F0F0E`） |
| 卡片 | 圆角 20px、柔光阴影 | 圆角 10px、`#FFFFFF`、`0 0 0 1px #E3E0D4` |
| 强调色 | `#0071E3` 蓝 | `#D97757` 品牌橙 |
| 标题字体 | 无衬线 400 | **Poppins 600**（中文回落 Noto Sans CJK） |
| 正文字体 | 无衬线 400 | **Lora 400–700**（中文回落 Noto Serif CJK） |
| 文章 h1 | 32px | 44px（移动端 30px） |
| 正文 | 16.48px / 1.78 | 17.5px / 1.8 |
| 引用块 | 左边框 + 圆角底 | 上下发丝线、斜体 Lora、无边无底 |
| 提示框 | 圆角 + 左侧色条 | 1px 发丝描边、8px 圆角、只给图标上色 |
| 代码块 | 下圆角 16px | 8px 圆角、暖灰描边 |
| 系统深色 | 失效 | 生效（`#141413` / `#FAF9F5`） |

### 变量对照（Chirpy 7.4.1 的全部 84 个变量）

| # | 变量 | 改前 亮 | 改前 暗 | 改后 亮 | 改后 暗 |
|---|---|---|---|---|---|
| 1 | `--avatar-border-color` | `rgb(255 255 255 / 86%)` | `rgb(255 255 255 / 20%)` | `#e0ddd1` | `#302e29` |
| 2 | `--blockquote-border-color` | `var(--ui-blue)` | `#2997ff` | `#e3e0d4` | `#e3e0d4` |
| 3 | `--blockquote-text-color` | `#515154` | `#d2d2d7` | `#454340` | `#c9c6bc` |
| 4 | `--btn-backtotop-border-color` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#e0ddd1` | `#302e29` |
| 5 | `--btn-backtotop-color` | `#515154` | `#d2d2d7` | `#141413` | `#faf9f5` |
| 6 | `--btn-border-color` | `rgb(0 0 0 / 10%)` | `rgb(255 255 255 / 12%)` | `#e0ddd1` | `#302e29` |
| 7 | `--btn-paginator-hover-color` | `rgb(0 0 0 / 6%)` | `rgb(255 255 255 / 9%)` | `#141413` | `#faf9f5` |
| 8 | `--btn-patinator-text-color` | `#515154` | `#d2d2d7` | `#141413` | `#faf9f5` |
| 9 | `--btn-share-color` | `#86868b` | `#8e8e93` | `#5d5a53` | `#b0aea5` |
| 10 | `--btn-share-hover-color` | `var(--ui-blue)` | `#2997ff` | `#a8502f` | `#d97757` |
| 11 | `--button-bg` | `rgb(255 255 255 / 72%)` | `rgb(44 44 46 / 72%)` | `#ffffff` | `#1f1e1c` |
| 12 | `--card-bg` | `rgb(255 255 255 / 88%)` | `rgb(28 28 30 / 84%)` | `#ffffff` | `#1f1e1c` |
| 13 | `--card-header-bg` | 继承 Chirpy | 继承 Chirpy | `#ffffff` | `#191817` |
| 14 | `--card-hover-bg` | `#fff` | `#1c1c1e` | `#f7f5ef` | `#262521` |
| 15 | `--card-shadow` | `0 1px 2px rgb(0 0 0 / 3%), 0 8px 30px rgb(0 0 0 / 5%)` | `0 1px 0 rgb(255 255 255 / 5%), 0 12px 36px rgb(0 0 0 / 34%)` | `0 1px 2px rgb(20 20 19 / 5%), 0 0 0 1px #e3e0d4` | `0 0 0 1px #302e29` |
| 16 | `--categories-border` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#e3e0d4` | `#302e29` |
| 17 | `--categories-hover-bg` | `rgb(0 0 0 / 4%)` | `rgb(255 255 255 / 7%)` | `#f2f0e7` | `#262521` |
| 18 | `--categories-icon-hover-color` | `var(--ui-blue)` | `#2997ff` | `#a8502f` | `#d97757` |
| 19 | `--checkbox-checked-color` | `var(--ui-blue)` | `#2997ff` | `#a8502f` | `#d97757` |
| 20 | `--checkbox-color` | 继承 Chirpy | 继承 Chirpy | `#b0aea5` | `#6e6b64` |
| 21 | `--clipboard-checked-color` | `#248a3d` | `#30d158` | `#5d6f45` | `#9bb183` |
| 22 | `--code-color` | `#3a3a3c` | `#e5e5ea` | `#141413` | `#faf9f5` |
| 23 | `--code-header-icon-color` | `#86868b` | `#8e8e93` | `#5d5a53` | `#b0aea5` |
| 24 | `--code-header-muted-color` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#d5d1c4` | `#403e38` |
| 25 | `--code-header-text-color` | `#6e6e73` | `#a1a1a6` | `#5d5a53` | `#b0aea5` |
| 26 | `--dash-color` | `rgb(0 0 0 / 16%)` | `rgb(255 255 255 / 20%)` | `#d5d1c4` | `#403e38` |
| 27 | `--filepath-text-color` | 继承 Chirpy | 继承 Chirpy | `#5d5a53` | `#b0aea5` |
| 28 | `--footnote-target-bg` | `rgb(0 113 227 / 10%)` | `rgb(41 151 255 / 16%)` | `#f7ece5` | `#4a2f25` |
| 29 | `--heading-color` | `#1d1d1f` | `#f5f5f7` | `#141413` | `#faf9f5` |
| 30 | `--highlight-bg-color` | `#f0f0f2` | `#1c1c1e` | `#f2f0e7` | `#0f0f0e` |
| 31 | `--highlight-lineno-color` | `#86868b` | `#636366` | `#6a675f` | `#8f8b82` |
| 32 | `--highlighter-rouge-color` | `#0055a6` | `#64d2ff` | `#141413` | `#faf9f5` |
| 33 | `--img-bg` | 继承 Chirpy | 继承 Chirpy | `#e8e6dc` | `#1f1e1c` |
| 34 | `--inline-code-bg` | `rgb(0 0 0 / 5%)` | `rgb(255 255 255 / 8%)` | `#eae7dc` | `#262521` |
| 35 | `--input-focus-border-color` | `var(--ui-blue)` | `#2997ff` | `#d97757` | `#d97757` |
| 36 | `--kbd-bg-color` | `#fff` | `#2c2c2e` | `#ffffff` | `#1f1e1c` |
| 37 | `--kbd-text-color` | `#1d1d1f` | `#f5f5f7` | `#141413` | `#faf9f5` |
| 38 | `--kbd-wrap-color` | `rgb(0 0 0 / 12%)` | `rgb(255 255 255 / 16%)` | `#d5d1c4` | `#403e38` |
| 39 | `--label-color` | `#6e6e73` | `#a1a1a6` | `#5d5a53` | `#b0aea5` |
| 40 | `--language-border-color` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#e3e0d4` | `#302e29` |
| 41 | `--link-color` | `var(--ui-blue)` | `#2997ff` | `#a8502f` | `#d97757` |
| 42 | `--link-underline-color` | `rgb(0 113 227 / 24%)` | `rgb(41 151 255 / 34%)` | `#d9b8a6` | `#6e4635` |
| 43 | `--main-bg` | `#f5f5f7` | `#000` | `#faf9f5` | `#141413` |
| 44 | `--main-border-color` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#e3e0d4` | `#302e29` |
| 45 | `--mask-bg` | 继承 Chirpy | 继承 Chirpy | `#141413` | `#000000` |
| 46 | `--post-list-text-color` | `#515154` | `#d2d2d7` | `#5d5a53` | `#c9c6bc` |
| 47 | `--prompt-danger-bg` | `rgb(255 59 48 / 10%)` | `rgb(255 69 58 / 15%)` | `#f8e9e5` | `#2b1f1c` |
| 48 | `--prompt-danger-icon-color` | `#d70015` | `#ff6961` | `#a8342a` | `#e89a8a` |
| 49 | `--prompt-info-bg` | `rgb(0 122 255 / 10%)` | `rgb(10 132 255 / 15%)` | `#eaf0f5` | `#1b2228` |
| 50 | `--prompt-info-icon-color` | `#007aff` | `#64d2ff` | `#4f6a86` | `#8fb8d4` |
| 51 | `--prompt-text-color` | `rgb(29 29 31 / 82%)` | `rgb(245 245 247 / 86%)` | `#2b2a27` | `#e6e3d9` |
| 52 | `--prompt-tip-bg` | `rgb(52 199 89 / 11%)` | `rgb(48 209 88 / 15%)` | `#eef1e8` | `#1e241a` |
| 53 | `--prompt-tip-icon-color` | `#248a3d` | `#30d158` | `#5d6f45` | `#9bb183` |
| 54 | `--prompt-warning-bg` | `rgb(255 159 10 / 12%)` | `rgb(255 159 10 / 16%)` | `#f8ece3` | `#2b241b` |
| 55 | `--prompt-warning-icon-color` | `#c93400` | `#ffd60a` | `#96581a` | `#e8c07a` |
| 56 | `--search-border-color` | `rgb(0 0 0 / 9%)` | `rgb(255 255 255 / 12%)` | `#e0ddd1` | `#302e29` |
| 57 | `--search-icon-color` | `#86868b` | `#8e8e93` | `#8a877f` | `#8f8b82` |
| 58 | `--search-tag-bg` | `rgb(0 0 0 / 4%)` | `rgb(255 255 255 / 7%)` | `#f2f0e7` | `#191817` |
| 59 | `--shimmer-bg` | 继承 Chirpy | 继承 Chirpy | `linear-gradient(90deg, #e8e6dc 0%, #e3e0d4 50%, #e8e6dc 100%)` | `linear-gradient(90deg, #1f1e1c 0%, #33322f 50%, #1f1e1c 100%)` |
| 60 | `--sidebar-active-color` | `#1d1d1f` | `#fff` | `#141413` | `#ffffff` |
| 61 | `--sidebar-bg` | `rgb(245 245 247 / 78%)` | `rgb(20 20 22 / 78%)` | `#e8e6dc` | `#0f0f0e` |
| 62 | `--sidebar-border-color` | `rgb(0 0 0 / 7%)` | `rgb(255 255 255 / 8%)` | `#ddd9cb` | `#333331` |
| 63 | `--sidebar-btn-bg` | `rgb(255 255 255 / 68%)` | `rgb(44 44 46 / 72%)` | `#faf9f5` | `#1f1e1c` |
| 64 | `--sidebar-btn-color` | `#6e6e73` | `#a1a1a6` | `#5d5a53` | `#b0aea5` |
| 65 | `--sidebar-hover-bg` | `rgb(0 0 0 / 5%)` | `rgb(255 255 255 / 8%)` | `#e3e0d4` | `#1f1e1c` |
| 66 | `--sidebar-muted-color` | `#86868b` | `#8e8e93` | `#454340` | `#b0aea5` |
| 67 | `--site-subtitle-color` | `#6e6e73` | `#a1a1a6` | `#5d5a53` | `#b0aea5` |
| 68 | `--site-title-color` | `#1d1d1f` | `#f5f5f7` | `#141413` | `#faf9f5` |
| 69 | `--tag-border` | `rgb(0 0 0 / 9%)` | `rgb(255 255 255 / 12%)` | `#e0ddd1` | `#302e29` |
| 70 | `--tag-hover` | `rgb(0 113 227 / 9%)` | `rgb(41 151 255 / 14%)` | `#f7ece5` | `#3a2a22` |
| 71 | `--tag-shadow` | `rgb(0 0 0 / 5%)` | `rgb(0 0 0 / 20%)` | `rgb(0 0 0 / 0%)` | `rgb(0 0 0 / 0%)` |
| 72 | `--tb-border-color` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#e3e0d4` | `#302e29` |
| 73 | `--tb-even-bg` | 继承 Chirpy | `transparent` | `#faf9f5` | `#141413` |
| 74 | `--tb-odd-bg` | `rgb(0 0 0 / 2.5%)` | `rgb(255 255 255 / 4%)` | `#ffffff` | `#191817` |
| 75 | `--text-color` | `#1d1d1f` | `#f5f5f7` | `#141413` | `#faf9f5` |
| 76 | `--text-muted-color` | `#6e6e73` | `#a1a1a6` | `#5d5a53` | `#b0aea5` |
| 77 | `--text-muted-highlight-color` | `#515154` | `#d2d2d7` | `#a8502f` | `#ffffff` |
| 78 | `--timeline-color` | `rgb(0 0 0 / 11%)` | `rgb(255 255 255 / 14%)` | `#e3e0d4` | `#302e29` |
| 79 | `--timeline-node-bg` | `var(--ui-blue)` | `#2997ff` | `#d97757` | `#d97757` |
| 80 | `--timeline-year-dot-color` | `#fff` | `#000` | `#faf9f5` | `#141413` |
| 81 | `--toc-highlight` | `var(--ui-blue)` | `#2997ff` | `#a8502f` | `#d97757` |
| 82 | `--toc-popup-border-color` | 继承 Chirpy | 继承 Chirpy | `#e3e0d4` | `#302e29` |
| 83 | `--topbar-bg` | `rgb(245 245 247 / 74%)` | `rgb(0 0 0 / 68%)` | `rgb(250 249 245 / 86%)` | `rgb(20 20 19 / 88%)` |
| 84 | `--topbar-text-color` | `#1d1d1f` | `#f5f5f7` | `#141413` | `#faf9f5` |


## 3. 改法：变量 + 覆盖层

`assets/css/jekyll-theme-chirpy.scss` 一个文件，结构不变：

| 段 | 内容 |
|---|---|
| Tokens light / dark | 84 个 Chirpy 变量 + 13 个 `--cf-*` 扩展标记 |
| @font-face | Poppins 500/600、Lora 400–700 与 Lora 斜体，latin 子集自托管（共 80 KB） |
| 1. Typography | 字体分工：UI 与标题 Poppins，长文 Lora；h1–h5 阶梯、链接、选区、焦点环 |
| 2. Blockquote, tables, prompts | 上下发丝线的引用块；表格发丝线表头；提示框 1px 描边、只上色图标 |
| 3. Inline code and code blocks | 行内代码、8px 圆角代码块、Rouge 配色（亮暗各一套，全部 ≥ 4.8:1） |
| 4. Home page cards | 10px 圆角、发丝描边、hover 抬阴影、两行标题、日期/分类/标签一行 |
| 5. Sidebar and topbar | 品牌浅灰侧栏、圆形头像、胶囊导航、胶囊搜索框 |
| 5b/5c. Panel headings, list titles | 面板标题 Poppins 600；列表标题墨色、橙只做 hover |
| 6–9. TOC, tags, categories, archive, pagination, footer | 2px 竖条、胶囊标签与分页、圆形时间点 |
| 10–11. Mermaid, misc | 图表容器、`prefers-reduced-motion` |

变量层用 `@mixin` + 四段选择器表达四种状态；系统深浅色与手动切换都生效。

### 按 skill 的 craft 规则删掉的东西

`claude-design` skill（同样取自公开 skill，`jiji262/claude-design-skill`）把
"圆角卡片 + 左侧强调色条" 列为 AI 设计通病，所以引用块改成上下发丝线，
提示框只保留 1px 描边 + 图标上色；卡片半径从 14px 收到 10px。

## 4. 从 gem 复制的文件

仍然只有一个，来自 `jekyll-theme-chirpy 7.4.1`：

| 文件 | 为什么必须复制 |
|---|---|
| `_layouts/home.html` | 首页卡片只输出日期和分类，没有标签；"日期与标签一行"必须改模板。其余与 gem 逐行一致。 |

`_includes/metadata-hook.html` 是 Chirpy 官方自定义 head 挂载点；`assets/js/cf-mermaid.js` 与
`assets/fonts/*.woff2` 是本仓库新增文件。

## 5. 对比度实测（真实页面）

HEAD
cat /tmp/ui-shots/contrast-table.md
cat <<'MID'

门槛：正文 4.5:1，大字与图标 3:1。23 项全部 PASS，0 失败。

## 6. 可访问性与构建

| 检查 | 改前 | 现在 |
|---|---|---|
| axe（7 页 × 2 宽 × 2 模式 = 28 次） | 1 critical + 每页 1–3 serious | **0 critical，0 serious** |
| Lighthouse 无障碍 首页 / 文章页 | 100 / 93 | 100 / 96 |
| Lighthouse 性能 首页（3 次中位数） | 96 | 95 |
| Lighthouse 性能 文章页 | 80 | 76 |
| Lighthouse best-practices / SEO | 100 / 100 | 100 / 100 |
| `jekyll b` + `htmlproofer --disable-external` | — | 退出码 0 |

性能差 1–4 分，在 5 分以内；字体总计 80 KB（两族四个 latin 子集，两处 preload）。

## 7. 真实页面点过

12 个 Mermaid 全部渲染并随亮暗换色（节点 6px 圆角、描边与连线用中灰、备注框用橙）；
4 处公式正常；代码块复制按钮、TOC 高亮、胶囊分页（当前页实心）、标签/分类/归档页、
亮暗切换、手机侧栏抽屉均正常。

## 8. 部署

Actions 仍被账号 billing lock 挡住，Pages 的构建源是 `gh-pages` 静态分支：

```bash
tools/deploy.sh
```

## 9. 没动的东西

permalink、`paginate`、`defaults`、`_plugins/posts-lastmod-hook.rb`、全部文章正文、
搜索/评论/分享行为、PWA 开关。没有引入 npm / Tailwind / PostCSS / 构建步骤。

## 10. 想换回去的话

- 中文正文不想用宋体：把 `$cf-body` 里的 `'Noto Serif CJK SC', 'Noto Serif SC'` 换成
  `'Noto Sans CJK SC', 'Noto Sans SC'`，一处改动。
- 标题不够"品牌"：`h1`–`h6` 已是 Poppins 600，可试 500（更接近 Claude 官网的轻量标题）。
- 圆角：卡片 10px / 代码 8px，都在覆盖层里，改两行即可。
