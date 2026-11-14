# Claude Style：把站点换成 Claude（Anthropic）的设计语言

暖纸 `#FAF9F5` / 象牙 `#F0EEE6` 两层底色、墨色 `#1A1A19`、唯一强调色陶土 `#D97757`、
衬线大标题、人文无衬线正文、圆角卡片与发丝描边。没有使用其 logo、插图、文案或商标。

分支 `ui/cloud-style`（沿用），基于 `origin/main`。上游主题 `jekyll-theme-chirpy 7.4.1`（gem 安装）。

> 历史：这之前同一分支上做过一版 Cloudflare 风（方角、`#F6821F`、等宽小标签），
> 你确认要 Claude 风后整套替换，Cloudflare 那版留在 git 历史里（`ec9ce74`..`105ea2b`）。

## 1. 改前 / 改后（真实计算值）

Chromium 156（Playwright 1.65），视口 1440×900 / 375×900，`prefers-color-scheme` 两种，整页截图。
截图：`/tmp/ui-shots/before/`（Apple 风基线）、`/tmp/ui-shots/after/`（Claude 风）、`/tmp/ui-shots/claude-preview/`（设计预览）。

| 观察点 | 改前（Apple 风） | 改后（Claude Style） |
|---|---|---|
| 页面底色 | `#F5F5F7` 冷灰 | `#FAF9F5` 暖纸 |
| 侧栏 | `rgba(245,245,247,.78)` | `#F0EEE6` 象牙（暗色 `#191918`） |
| 卡片 | 圆角 20px、`rgba(255,255,255,.88)`、柔光阴影 | 圆角 14px、`#FFFFFF`、`0 1px 2px rgba(26,26,25,.04)` + 1px 发丝描边 |
| 强调色 | `#0071E3` 蓝 | `#D97757` 陶土 |
| 正文链接 | `#0071E3` | `#A8492B`（暗色 `#E08A6B`） |
| 标题字体 | 无衬线 400、字距 −1.12px | **衬线** 500、字距 −0.01em |
| 文章 h1 | 32px | 44px（移动端 30px） |
| 正文 h2 | 24.64px | 30.4px，段前 48px |
| 正文 | 16.48px / 1.78 | 17.5px / 1.8 |
| 标签 | 999px 胶囊、system-ui | 999px 胶囊、无大写、`0.85rem` |
| 代码块 | 下圆角 16px | 12px 圆角、暖灰描边、三点柔和色标 |
| TOC 当前项 | `#0071E3` | `#A8492B` + 2px 陶土竖条 |
| 系统深色 | 失效（暗色截图仍是 `#F5F5F7`） | 生效（`#1F1E1D` / `#F5F3EC`） |
| 变量覆盖 | 82 亮 / 77 暗 | 84 个全部覆盖（每模式 97 条声明） |

### 变量对照（Chirpy 7.4.1 的全部 84 个变量）

| # | 变量 | 改前 亮 | 改前 暗 | 改后 亮 | 改后 暗 |
|---|---|---|---|---|---|
| 1 | `--avatar-border-color` | `rgb(255 255 255 / 86%)` | `rgb(255 255 255 / 20%)` | `#e0dcd1` | `#3a3a38` |
| 2 | `--blockquote-border-color` | `var(--ui-blue)` | `#2997ff` | `#d97757` | `#d97757` |
| 3 | `--blockquote-text-color` | `#515154` | `#d2d2d7` | `#55524c` | `#cfcdc5` |
| 4 | `--btn-backtotop-border-color` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#e0dcd1` | `#3a3a38` |
| 5 | `--btn-backtotop-color` | `#515154` | `#d2d2d7` | `#1a1a19` | `#f5f3ec` |
| 6 | `--btn-border-color` | `rgb(0 0 0 / 10%)` | `rgb(255 255 255 / 12%)` | `#e0dcd1` | `#3a3a38` |
| 7 | `--btn-paginator-hover-color` | `rgb(0 0 0 / 6%)` | `rgb(255 255 255 / 9%)` | `#1a1a19` | `#f5f3ec` |
| 8 | `--btn-patinator-text-color` | `#515154` | `#d2d2d7` | `#1a1a19` | `#f5f3ec` |
| 9 | `--btn-share-color` | `#86868b` | `#8e8e93` | `#6b6862` | `#a9a69d` |
| 10 | `--btn-share-hover-color` | `var(--ui-blue)` | `#2997ff` | `#a8492b` | `#e08a6b` |
| 11 | `--button-bg` | `rgb(255 255 255 / 72%)` | `rgb(44 44 46 / 72%)` | `#ffffff` | `#262624` |
| 12 | `--card-bg` | `rgb(255 255 255 / 88%)` | `rgb(28 28 30 / 84%)` | `#ffffff` | `#262624` |
| 13 | `--card-header-bg` | 继承 Chirpy | 继承 Chirpy | `#ffffff` | `#232221` |
| 14 | `--card-hover-bg` | `#fff` | `#1c1c1e` | `#f5f2ea` | `#2e2d2b` |
| 15 | `--card-shadow` | `0 1px 2px rgb(0 0 0 / 3%), 0 8px 30px rgb(0 0 0 / 5%)` | `0 1px 0 rgb(255 255 255 / 5%), 0 12px 36px rgb(0 0 0 / 34%)` | `0 1px 2px rgb(26 26 25 / 4%), 0 0 0 1px #e7e3d8` | `0 0 0 1px #3a3a38` |
| 16 | `--categories-border` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#e7e3d8` | `#3a3a38` |
| 17 | `--categories-hover-bg` | `rgb(0 0 0 / 4%)` | `rgb(255 255 255 / 7%)` | `#f3f1e9` | `#2e2d2b` |
| 18 | `--categories-icon-hover-color` | `var(--ui-blue)` | `#2997ff` | `#a8492b` | `#e08a6b` |
| 19 | `--checkbox-checked-color` | `var(--ui-blue)` | `#2997ff` | `#a8492b` | `#d97757` |
| 20 | `--checkbox-color` | 继承 Chirpy | 继承 Chirpy | `#b6b1a5` | `#6e6b64` |
| 21 | `--clipboard-checked-color` | `#248a3d` | `#30d158` | `#3f6b45` | `#9bc48f` |
| 22 | `--code-color` | `#3a3a3c` | `#e5e5ea` | `#1a1a19` | `#f5f3ec` |
| 23 | `--code-header-icon-color` | `#86868b` | `#8e8e93` | `#6b6862` | `#a9a69d` |
| 24 | `--code-header-muted-color` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#ddd8cc` | `#4a4a47` |
| 25 | `--code-header-text-color` | `#6e6e73` | `#a1a1a6` | `#6b6862` | `#a9a69d` |
| 26 | `--dash-color` | `rgb(0 0 0 / 16%)` | `rgb(255 255 255 / 20%)` | `#d8d4c8` | `#4a4a47` |
| 27 | `--filepath-text-color` | 继承 Chirpy | 继承 Chirpy | `#6b6862` | `#a9a69d` |
| 28 | `--footnote-target-bg` | `rgb(0 113 227 / 10%)` | `rgb(41 151 255 / 16%)` | `#f3e6df` | `#4a2f25` |
| 29 | `--heading-color` | `#1d1d1f` | `#f5f5f7` | `#1a1a19` | `#f5f3ec` |
| 30 | `--highlight-bg-color` | `#f0f0f2` | `#1c1c1e` | `#f6f4ed` | `#191918` |
| 31 | `--highlight-lineno-color` | `#86868b` | `#636366` | `#6f6b63` | `#8f8b83` |
| 32 | `--highlighter-rouge-color` | `#0055a6` | `#64d2ff` | `#1a1a19` | `#f5f3ec` |
| 33 | `--img-bg` | 继承 Chirpy | 继承 Chirpy | `#f0eee6` | `#262624` |
| 34 | `--inline-code-bg` | `rgb(0 0 0 / 5%)` | `rgb(255 255 255 / 8%)` | `#f0ede4` | `#2e2d2b` |
| 35 | `--input-focus-border-color` | `var(--ui-blue)` | `#2997ff` | `#d97757` | `#d97757` |
| 36 | `--kbd-bg-color` | `#fff` | `#2c2c2e` | `#ffffff` | `#262624` |
| 37 | `--kbd-text-color` | `#1d1d1f` | `#f5f5f7` | `#1a1a19` | `#f5f3ec` |
| 38 | `--kbd-wrap-color` | `rgb(0 0 0 / 12%)` | `rgb(255 255 255 / 16%)` | `#d8d4c8` | `#4a4a47` |
| 39 | `--label-color` | `#6e6e73` | `#a1a1a6` | `#6b6862` | `#a9a69d` |
| 40 | `--language-border-color` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#e7e3d8` | `#3a3a38` |
| 41 | `--link-color` | `var(--ui-blue)` | `#2997ff` | `#a8492b` | `#e08a6b` |
| 42 | `--link-underline-color` | `rgb(0 113 227 / 24%)` | `rgb(41 151 255 / 34%)` | `#e3c3b4` | `#6e4635` |
| 43 | `--main-bg` | `#f5f5f7` | `#000` | `#faf9f5` | `#1f1e1d` |
| 44 | `--main-border-color` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#e7e3d8` | `#3a3a38` |
| 45 | `--mask-bg` | 继承 Chirpy | 继承 Chirpy | `#1a1a19` | `#000000` |
| 46 | `--post-list-text-color` | `#515154` | `#d2d2d7` | `#635f58` | `#cfcdc5` |
| 47 | `--prompt-danger-bg` | `rgb(255 59 48 / 10%)` | `rgb(255 69 58 / 15%)` | `#faeae7` | `#2e211e` |
| 48 | `--prompt-danger-icon-color` | `#d70015` | `#ff6961` | `#a6412f` | `#e89a8a` |
| 49 | `--prompt-info-bg` | `rgb(0 122 255 / 10%)` | `rgb(10 132 255 / 15%)` | `#eef1f4` | `#1e2529` |
| 50 | `--prompt-info-icon-color` | `#007aff` | `#64d2ff` | `#3d5a70` | `#8fb8d4` |
| 51 | `--prompt-text-color` | `rgb(29 29 31 / 82%)` | `rgb(245 245 247 / 86%)` | `#2e2c28` | `#e2e0d8` |
| 52 | `--prompt-tip-bg` | `rgb(52 199 89 / 11%)` | `rgb(48 209 88 / 15%)` | `#edf3ea` | `#202b20` |
| 53 | `--prompt-tip-icon-color` | `#248a3d` | `#30d158` | `#3f6b45` | `#9bc48f` |
| 54 | `--prompt-warning-bg` | `rgb(255 159 10 / 12%)` | `rgb(255 159 10 / 16%)` | `#faf0e3` | `#2e2620` |
| 55 | `--prompt-warning-icon-color` | `#c93400` | `#ffd60a` | `#a8681f` | `#e8c07a` |
| 56 | `--search-border-color` | `rgb(0 0 0 / 9%)` | `rgb(255 255 255 / 12%)` | `#e0dcd1` | `#3a3a38` |
| 57 | `--search-icon-color` | `#86868b` | `#8e8e93` | `#8a857b` | `#8f8b83` |
| 58 | `--search-tag-bg` | `rgb(0 0 0 / 4%)` | `rgb(255 255 255 / 7%)` | `#f3f1e9` | `#232221` |
| 59 | `--shimmer-bg` | 继承 Chirpy | 继承 Chirpy | `linear-gradient(90deg, #f0eee6 0%, #e7e3d8 50%, #f0eee6 100%)` | `linear-gradient(90deg, #262624 0%, #33322f 50%, #262624 100%)` |
| 60 | `--sidebar-active-color` | `#1d1d1f` | `#fff` | `#1a1a19` | `#ffffff` |
| 61 | `--sidebar-bg` | `rgb(245 245 247 / 78%)` | `rgb(20 20 22 / 78%)` | `#f0eee6` | `#191918` |
| 62 | `--sidebar-border-color` | `rgb(0 0 0 / 7%)` | `rgb(255 255 255 / 8%)` | `#e4e0d6` | `#333331` |
| 63 | `--sidebar-btn-bg` | `rgb(255 255 255 / 68%)` | `rgb(44 44 46 / 72%)` | `#faf9f5` | `#262624` |
| 64 | `--sidebar-btn-color` | `#6e6e73` | `#a1a1a6` | `#6b6862` | `#a9a69d` |
| 65 | `--sidebar-hover-bg` | `rgb(0 0 0 / 5%)` | `rgb(255 255 255 / 8%)` | `#e7e3d8` | `#262624` |
| 66 | `--sidebar-muted-color` | `#86868b` | `#8e8e93` | `#55524c` | `#a9a69d` |
| 67 | `--site-subtitle-color` | `#6e6e73` | `#a1a1a6` | `#6b6862` | `#a9a69d` |
| 68 | `--site-title-color` | `#1d1d1f` | `#f5f5f7` | `#1a1a19` | `#f5f3ec` |
| 69 | `--tag-border` | `rgb(0 0 0 / 9%)` | `rgb(255 255 255 / 12%)` | `#e0dcd1` | `#3a3a38` |
| 70 | `--tag-hover` | `rgb(0 113 227 / 9%)` | `rgb(41 151 255 / 14%)` | `#f3e6df` | `#3a2e28` |
| 71 | `--tag-shadow` | `rgb(0 0 0 / 5%)` | `rgb(0 0 0 / 20%)` | `rgb(0 0 0 / 0%)` | `rgb(0 0 0 / 0%)` |
| 72 | `--tb-border-color` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#e7e3d8` | `#3a3a38` |
| 73 | `--tb-even-bg` | 继承 Chirpy | `transparent` | `#fbfaf6` | `#1f1e1d` |
| 74 | `--tb-odd-bg` | `rgb(0 0 0 / 2.5%)` | `rgb(255 255 255 / 4%)` | `#ffffff` | `#232221` |
| 75 | `--text-color` | `#1d1d1f` | `#f5f5f7` | `#1a1a19` | `#f5f3ec` |
| 76 | `--text-muted-color` | `#6e6e73` | `#a1a1a6` | `#635f58` | `#a9a69d` |
| 77 | `--text-muted-highlight-color` | `#515154` | `#d2d2d7` | `#a8492b` | `#ffffff` |
| 78 | `--timeline-color` | `rgb(0 0 0 / 11%)` | `rgb(255 255 255 / 14%)` | `#e7e3d8` | `#3a3a38` |
| 79 | `--timeline-node-bg` | `var(--ui-blue)` | `#2997ff` | `#d97757` | `#d97757` |
| 80 | `--timeline-year-dot-color` | `#fff` | `#000` | `#faf9f5` | `#1f1e1d` |
| 81 | `--toc-highlight` | `var(--ui-blue)` | `#2997ff` | `#a8492b` | `#e08a6b` |
| 82 | `--toc-popup-border-color` | 继承 Chirpy | 继承 Chirpy | `#e7e3d8` | `#3a3a38` |
| 83 | `--topbar-bg` | `rgb(245 245 247 / 74%)` | `rgb(0 0 0 / 68%)` | `rgb(250 249 245 / 86%)` | `rgb(31 30 29 / 88%)` |
| 84 | `--topbar-text-color` | `#1d1d1f` | `#f5f5f7` | `#1a1a19` | `#f5f3ec` |


## 2. 改法：变量 + 覆盖层

`assets/css/jekyll-theme-chirpy.scss` 一个文件，结构不变：

| 段 | 内容 |
|---|---|
| Tokens light / dark | 84 个 Chirpy 变量 + 13 个 `--cf-*` 扩展标记 |
| 1. Typography | `@font-face` 自托管 Source Serif 4、正文 17.5px/1.8、h1–h5 衬线阶梯、链接、选区、焦点环 |
| 2. Blockquote, tables, prompts | 2px 陶土竖条 + 象牙底的引用块、四种提示框 |
| 3. Inline code and code blocks | 行内代码、12px 圆角代码块、三点色标、Rouge 配色（亮暗各一套） |
| 4. Home page cards | 14px 圆角卡片、发丝描边、hover 抬阴影、两行标题、日期/分类/标签一行 |
| 5. Sidebar and topbar | 象牙侧栏、圆形头像、胶囊导航、胶囊搜索框 |
| 5b/5c. Panel headings, list titles | 面板标题回到衬线；列表标题墨色、橙色只做 hover |
| 6–9. TOC, tags, categories, archive, pagination, footer | 2px 竖条、胶囊标签与分页、圆形时间点 |
| 10–11. Mermaid, misc | 图表容器、`prefers-reduced-motion` |

变量层用 `@mixin` + 四段选择器表达四种状态；系统深浅色与手动切换都生效。

### 字体

Claude 用的是 Anthropic 自有的 Tiempos / Copernicus，不能使用。这里自托管 **Source Serif 4**
（SIL OFL 1.1，latin 子集，122 KB，`font-display: swap`，并在 head 里 `preload`），中文标题回落到
系统衬线（Noto Serif CJK SC / Songti SC / SimSun）。正文保持系统中立无衬线，不加载额外字体。

## 3. 从 gem 复制的文件

仍然只有一个，来自 `jekyll-theme-chirpy 7.4.1`：

| 文件 | 为什么必须复制 |
|---|---|
| `_layouts/home.html` | 首页卡片只输出日期和分类，没有标签；"日期与标签一行"必须改模板。其余与 gem 逐行一致。 |

`_includes/metadata-hook.html` 是 Chirpy 官方自定义 head 挂载点；`assets/js/cf-mermaid.js` 与
`assets/fonts/source-serif-4-latin.woff2` 是本仓库新增文件。

## 4. 对比度实测（真实页面）

HEAD
cat /tmp/ui-shots/contrast-table.md
cat <<'MID'

门槛：正文 4.5:1，大字与图标 3:1。23 项全部 PASS，0 失败。

## 5. 可访问性与构建

| 检查 | Apple 基线 | Claude Style |
|---|---|---|
| axe（7 页 × 2 宽 × 2 模式 = 28 次） | 1 critical + 每页 1–3 serious | **0 critical，0 serious** |
| Lighthouse 无障碍 首页 | 100 | 100 |
| Lighthouse 无障碍 文章页 | 93 | 96 |
| Lighthouse 性能 首页（3 次中位数） | 96 | 93 |
| Lighthouse 性能 文章页 | 80 | 78 |
| `jekyll b` + `htmlproofer --disable-external` | — | 退出码 0 |

性能差 2–3 分，在 5 分以内；主要成本是新增的 122 KB 衬线字体（已 preload）。

## 6. 真实页面点过

12 个 Mermaid 全部渲染并随亮暗换色（节点改成 6px 圆角、配色改为陶土/暖灰）；4 处公式正常；
代码块复制按钮、行号、TOC 高亮、胶囊分页（当前页实心）、标签/分类/归档页、亮暗切换、
手机侧栏抽屉均正常。

## 7. 部署

Actions 仍被账号 billing lock 挡住，Pages 的构建源是 `gh-pages` 静态分支：

```bash
tools/deploy.sh
```

## 8. 没动的东西

permalink、`paginate`、`defaults`、`_plugins/posts-lastmod-hook.rb`、全部文章正文、
搜索/评论/分享行为、PWA 开关。没有引入 npm / Tailwind / PostCSS / 构建步骤。

## 9. 视觉变了什么 / 故意没变

变了：整体色温（冷灰 → 暖纸）、强调色（蓝 → 陶土）、标题字体（无衬线 → 衬线）、
卡片与按钮圆角、代码块头部、TOC、标签、分页、侧栏、页脚、Mermaid、暗色模式。

没变：栏目结构与 URL、文章正文、摘要截断、分页密度、交互行为。
