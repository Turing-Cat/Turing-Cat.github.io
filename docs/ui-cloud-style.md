# Cloud Style：把站点换成 Cloudflare 的设计语言

只取设计语言：橙 `#F6821F` 作唯一强调色，近黑 `#1D1D1D` 与近白 `#F7F7F7` 作两层底色，
大字号标题，等宽小标签，方角，4px 间距网格，实心方按钮。
没有使用 Cloudflare 的 logo、插图、文案或商标。

分支 `ui/cloud-style`，基于 `origin/main`（`672b9b8`）。上游主题 `jekyll-theme-chirpy 7.4.1`（gem 安装）。

> 说明：本地克隆比远端旧两次提交。远端（也是线上）当时是 `672b9b8 style: refine blog UI with Apple-inspired design`
> —— 圆角卡片、`#0071E3` 蓝色、`#F5F5F7` 底色，而不是本地工作区里那套 Creative Indigo。
> 因此本次的“改前”基线取自 `origin/main`（即线上现状），本地那份 Indigo 没有参与比较。
> 分支建立时先 rebase 到 `origin/main`，`70a1a29` 的文章改动完整保留。

## 1. 改前测量

Chromium 156（Playwright 1.65，`/usr/bin/chromium`），视口 1440×900 / 375×900，
`prefers-color-scheme` 两种，整页截图，同一台机器同一次会话内采集。
截图矩阵：`/tmp/ui-shots/before/` 与 `/tmp/ui-shots/after/`（6 页 × 2 宽 × 2 模式 = 每套 24 张）。

改前的实际计算值（不是读源码）：

| 观察点 | 改前（Apple 风） | 改后（Cloud Style） |
|---|---|---|
| 页面底色 | `#F5F5F7` | `#F7F7F7` |
| 正文文字 | `#1D1D1F` | `#1D1D1D` |
| 首页卡片 | `rgba(255,255,255,.88)`、圆角 `20px`、`0 1px 3px rgba(0,0,0,.03)` | `#FFFFFF`、圆角 `0`、`0 0 0 1px #E3E3E3`，hover 换成 `0 8px 24px` |
| 文章 h1 | 32px / 400 / 字距 −1.12px | 40px / 800 / 字距 0 |
| 正文 h2 | 24.64px / 400 / 段前 59.1px | 28px / 700 / 段前 48px |
| 正文 p | 16.48px，行高 1.78 | 17px，行高 1.85 |
| 代码块 | `#F6F8FA`，下圆角 16px | `#F4F4F4`，四角 0 |
| 标签 | `border-radius: 999px`，system-ui，不转大写 | 方角，等宽字体，`text-transform: uppercase` |
| TOC 当前项 | `#0071E3` | 文字 `#A64A00` + 3px `#F6821F` 竖条 |
| 侧栏底色 | `rgba(245,245,247,.78)` | `#FFFFFF`（暗色 `#141414`） |
| 系统深色模式 | **失效**：暗色截图里底色仍是 `#F5F5F7` | 生效（`#1D1D1D` / `#EDEDED`） |
| 变量覆盖 | 82 条亮色 / 77 条暗色声明，8 个变量未覆盖 | 84 个变量全部覆盖（每模式 97 条声明，含 13 个 `--cf-*` 扩展标记） |

### 变量现值（Chirpy 7.4.1 定义的全部 84 个变量）

| # | 变量 | 改前 亮 | 改前 暗 | 改后 亮 | 改后 暗 |
|---|---|---|---|---|---|
| 1 | `--avatar-border-color` | `rgb(255 255 255 / 86%)` | `rgb(255 255 255 / 20%)` | `#f6821f` | `#f6821f` |
| 2 | `--blockquote-border-color` | `var(--ui-blue)` | `#2997ff` | `#f6821f` | `#f6821f` |
| 3 | `--blockquote-text-color` | `#515154` | `#d2d2d7` | `#4a4a4a` | `#c4c4c4` |
| 4 | `--btn-backtotop-border-color` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#d4d4d4` | `#3a3a3a` |
| 5 | `--btn-backtotop-color` | `#515154` | `#d2d2d7` | `#1d1d1d` | `#ededed` |
| 6 | `--btn-border-color` | `rgb(0 0 0 / 10%)` | `rgb(255 255 255 / 12%)` | `#d4d4d4` | `#3a3a3a` |
| 7 | `--btn-paginator-hover-color` | `rgb(0 0 0 / 6%)` | `rgb(255 255 255 / 9%)` | `#1d1d1d` | `#ededed` |
| 8 | `--btn-patinator-text-color` | `#515154` | `#d2d2d7` | `#1d1d1d` | `#ededed` |
| 9 | `--btn-share-color` | `#86868b` | `#8e8e93` | `#5c5c5c` | `#a8a8a8` |
| 10 | `--btn-share-hover-color` | `var(--ui-blue)` | `#2997ff` | `#a64a00` | `#f6821f` |
| 11 | `--button-bg` | `rgb(255 255 255 / 72%)` | `rgb(44 44 46 / 72%)` | `#ffffff` | `#262626` |
| 12 | `--card-bg` | `rgb(255 255 255 / 88%)` | `rgb(28 28 30 / 84%)` | `#ffffff` | `#262626` |
| 13 | `--card-header-bg` | 继承 Chirpy | 继承 Chirpy | `#ffffff` | `#2a2a2a` |
| 14 | `--card-hover-bg` | `#fff` | `#1c1c1e` | `#fff7ef` | `#2e2e2e` |
| 15 | `--card-shadow` | `0 1px 2px rgb(0 0 0 / 3%), 0 8px 30px rgb(0 0 0 / 5%)` | `0 1px 0 rgb(255 255 255 / 5%), 0 12px 36px rgb(0 0 0 / 34%)` | `0 0 0 1px #e3e3e3` | `0 0 0 1px #333333` |
| 16 | `--categories-border` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#e3e3e3` | `#3a3a3a` |
| 17 | `--categories-hover-bg` | `rgb(0 0 0 / 4%)` | `rgb(255 255 255 / 7%)` | `#f0f0f0` | `#2e2e2e` |
| 18 | `--categories-icon-hover-color` | `var(--ui-blue)` | `#2997ff` | `#a64a00` | `#f6821f` |
| 19 | `--checkbox-checked-color` | `var(--ui-blue)` | `#2997ff` | `#a64a00` | `#f6821f` |
| 20 | `--checkbox-color` | 继承 Chirpy | 继承 Chirpy | `#8a8a8a` | `#6b6b6b` |
| 21 | `--clipboard-checked-color` | `#248a3d` | `#30d158` | `#0b6b3a` | `#6ee7a8` |
| 22 | `--code-color` | `#3a3a3c` | `#e5e5ea` | `#1d1d1d` | `#ededed` |
| 23 | `--code-header-icon-color` | `#86868b` | `#8e8e93` | `#5c5c5c` | `#a8a8a8` |
| 24 | `--code-header-muted-color` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#d9d9d9` | `#4a4a4a` |
| 25 | `--code-header-text-color` | `#6e6e73` | `#a1a1a6` | `#5c5c5c` | `#a8a8a8` |
| 26 | `--dash-color` | `rgb(0 0 0 / 16%)` | `rgb(255 255 255 / 20%)` | `#c9c9c9` | `#4a4a4a` |
| 27 | `--filepath-text-color` | 继承 Chirpy | 继承 Chirpy | `#5c5c5c` | `#a8a8a8` |
| 28 | `--footnote-target-bg` | `rgb(0 113 227 / 10%)` | `rgb(41 151 255 / 16%)` | `#ffe8d1` | `#5a3212` |
| 29 | `--heading-color` | `#1d1d1f` | `#f5f5f7` | `#1d1d1d` | `#ffffff` |
| 30 | `--highlight-bg-color` | `#f0f0f2` | `#1c1c1e` | `#f4f4f4` | `#191919` |
| 31 | `--highlight-lineno-color` | `#86868b` | `#636366` | `#6b6b6b` | `#8a8a8a` |
| 32 | `--highlighter-rouge-color` | `#0055a6` | `#64d2ff` | `#1d1d1d` | `#ededed` |
| 33 | `--img-bg` | 继承 Chirpy | 继承 Chirpy | `#f0f0f0` | `#262626` |
| 34 | `--inline-code-bg` | `rgb(0 0 0 / 5%)` | `rgb(255 255 255 / 8%)` | `#f0edea` | `#2e2e2e` |
| 35 | `--input-focus-border-color` | `var(--ui-blue)` | `#2997ff` | `#f6821f` | `#f6821f` |
| 36 | `--kbd-bg-color` | `#fff` | `#2c2c2e` | `#ffffff` | `#262626` |
| 37 | `--kbd-text-color` | `#1d1d1f` | `#f5f5f7` | `#1d1d1d` | `#ededed` |
| 38 | `--kbd-wrap-color` | `rgb(0 0 0 / 12%)` | `rgb(255 255 255 / 16%)` | `#c9c9c9` | `#4a4a4a` |
| 39 | `--label-color` | `#6e6e73` | `#a1a1a6` | `#5c5c5c` | `#a8a8a8` |
| 40 | `--language-border-color` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#e3e3e3` | `#333333` |
| 41 | `--link-color` | `var(--ui-blue)` | `#2997ff` | `#a64a00` | `#f6821f` |
| 42 | `--link-underline-color` | `rgb(0 113 227 / 24%)` | `rgb(41 151 255 / 34%)` | `#f6821f` | `#8a4a12` |
| 43 | `--main-bg` | `#f5f5f7` | `#000` | `#f7f7f7` | `#1d1d1d` |
| 44 | `--main-border-color` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#e3e3e3` | `#333333` |
| 45 | `--mask-bg` | 继承 Chirpy | 继承 Chirpy | `#1d1d1d` | `#000000` |
| 46 | `--post-list-text-color` | `#515154` | `#d2d2d7` | `#5c5c5c` | `#c4c4c4` |
| 47 | `--prompt-danger-bg` | `rgb(255 59 48 / 10%)` | `rgb(255 69 58 / 15%)` | `#fdebea` | `#3a1512` |
| 48 | `--prompt-danger-icon-color` | `#d70015` | `#ff6961` | `#b3261e` | `#ff8a80` |
| 49 | `--prompt-info-bg` | `rgb(0 122 255 / 10%)` | `rgb(10 132 255 / 15%)` | `#e9f1fb` | `#122436` |
| 50 | `--prompt-info-icon-color` | `#007aff` | `#64d2ff` | `#0b5bb5` | `#7cb8ff` |
| 51 | `--prompt-text-color` | `rgb(29 29 31 / 82%)` | `rgb(245 245 247 / 86%)` | `#2e2e2e` | `#e0e0e0` |
| 52 | `--prompt-tip-bg` | `rgb(52 199 89 / 11%)` | `rgb(48 209 88 / 15%)` | `#eaf6ef` | `#12301f` |
| 53 | `--prompt-tip-icon-color` | `#248a3d` | `#30d158` | `#0b6b3a` | `#6ee7a8` |
| 54 | `--prompt-warning-bg` | `rgb(255 159 10 / 12%)` | `rgb(255 159 10 / 16%)` | `#fff1e0` | `#33230f` |
| 55 | `--prompt-warning-icon-color` | `#c93400` | `#ffd60a` | `#a64a00` | `#f6a24c` |
| 56 | `--search-border-color` | `rgb(0 0 0 / 9%)` | `rgb(255 255 255 / 12%)` | `#d4d4d4` | `#3a3a3a` |
| 57 | `--search-icon-color` | `#86868b` | `#8e8e93` | `#6b6b6b` | `#8a8a8a` |
| 58 | `--search-tag-bg` | `rgb(0 0 0 / 4%)` | `rgb(255 255 255 / 7%)` | `#f0f0f0` | `#2a2a2a` |
| 59 | `--shimmer-bg` | 继承 Chirpy | 继承 Chirpy | `linear-gradient(90deg, #f0f0f0 0%, #e4e4e4 50%, #f0f0f0 100%)` | `linear-gradient(90deg, #262626 0%, #333333 50%, #262626 100%)` |
| 60 | `--sidebar-active-color` | `#1d1d1f` | `#fff` | `#1d1d1d` | `#ffffff` |
| 61 | `--sidebar-bg` | `rgb(245 245 247 / 78%)` | `rgb(20 20 22 / 78%)` | `#ffffff` | `#141414` |
| 62 | `--sidebar-border-color` | `rgb(0 0 0 / 7%)` | `rgb(255 255 255 / 8%)` | `#e3e3e3` | `#333333` |
| 63 | `--sidebar-btn-bg` | `rgb(255 255 255 / 68%)` | `rgb(44 44 46 / 72%)` | `#ffffff` | `#262626` |
| 64 | `--sidebar-btn-color` | `#6e6e73` | `#a1a1a6` | `#5c5c5c` | `#a8a8a8` |
| 65 | `--sidebar-hover-bg` | `rgb(0 0 0 / 5%)` | `rgb(255 255 255 / 8%)` | `#f0f0f0` | `#262626` |
| 66 | `--sidebar-muted-color` | `#86868b` | `#8e8e93` | `#4a4a4a` | `#a8a8a8` |
| 67 | `--site-subtitle-color` | `#6e6e73` | `#a1a1a6` | `#5c5c5c` | `#a8a8a8` |
| 68 | `--site-title-color` | `#1d1d1f` | `#f5f5f7` | `#1d1d1d` | `#ffffff` |
| 69 | `--tag-border` | `rgb(0 0 0 / 9%)` | `rgb(255 255 255 / 12%)` | `#d4d4d4` | `#4a4a4a` |
| 70 | `--tag-hover` | `rgb(0 113 227 / 9%)` | `rgb(41 151 255 / 14%)` | `#ffe8d1` | `#3a2a18` |
| 71 | `--tag-shadow` | `rgb(0 0 0 / 5%)` | `rgb(0 0 0 / 20%)` | `rgb(0 0 0 / 0%)` | `rgb(0 0 0 / 0%)` |
| 72 | `--tb-border-color` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 10%)` | `#e3e3e3` | `#333333` |
| 73 | `--tb-even-bg` | 继承 Chirpy | `transparent` | `#fafafa` | `#1f1f1f` |
| 74 | `--tb-odd-bg` | `rgb(0 0 0 / 2.5%)` | `rgb(255 255 255 / 4%)` | `#ffffff` | `#242424` |
| 75 | `--text-color` | `#1d1d1f` | `#f5f5f7` | `#1d1d1d` | `#ededed` |
| 76 | `--text-muted-color` | `#6e6e73` | `#a1a1a6` | `#5c5c5c` | `#a8a8a8` |
| 77 | `--text-muted-highlight-color` | `#515154` | `#d2d2d7` | `#1d1d1d` | `#ffffff` |
| 78 | `--timeline-color` | `rgb(0 0 0 / 11%)` | `rgb(255 255 255 / 14%)` | `#e3e3e3` | `#3a3a3a` |
| 79 | `--timeline-node-bg` | `var(--ui-blue)` | `#2997ff` | `#1d1d1d` | `#ededed` |
| 80 | `--timeline-year-dot-color` | `#fff` | `#000` | `#f6821f` | `#f6821f` |
| 81 | `--toc-highlight` | `var(--ui-blue)` | `#2997ff` | `#a64a00` | `#f6821f` |
| 82 | `--toc-popup-border-color` | 继承 Chirpy | 继承 Chirpy | `#e3e3e3` | `#3a3a3a` |
| 83 | `--topbar-bg` | `rgb(245 245 247 / 74%)` | `rgb(0 0 0 / 68%)` | `rgb(247 247 247 / 88%)` | `rgb(29 29 29 / 88%)` |
| 84 | `--topbar-text-color` | `#1d1d1f` | `#f5f5f7` | `#1d1d1d` | `#ededed` |

## 2. 改法：变量 + 覆盖层，不 fork 主题

仍然是 `assets/css/jekyll-theme-chirpy.scss` 一个文件：

| 行 | 段 | 内容 |
|---|---|---|
| 27 | Tokens: light | 84 个 Chirpy 变量 + 13 个 `--cf-*` 扩展标记 |
| 151 | Tokens: dark | 同上（暗色） |
| 311 | 1. Typography | 字体栈补 `"Noto Sans SC"` 与系统中文字体、正文 17px/1.85、h1–h5 阶梯与段前距、链接下划线、选区、焦点环 |
| 428 | 2. Blockquote, tables, prompts | 引用块 4px 竖条 + 灰底、表头等宽小标签、四种提示框方角 + 左侧色条 |
| 480 | 3. Inline code and code blocks | 行内代码、代码块方角、代码块头部（三个橙方块 + 等宽大写字标签）、Rouge 配色（亮暗各一套，对比度实测） |
| 806 | 4. Home page cards | 方角描边卡片、hover 只改阴影、标题两行、摘要两行、日期/分类/标签一行 |
| 895 | 5. Sidebar and topbar | 侧栏描边、方角头像橙框、顶栏下划线、搜索框方角等宽 |
| 962 | 5b. Panel headings | “最近更新 / 热门标签”改等宽小标签 |
| 976 | 5c. List titles | 归档/标签/分类列表标题保持墨色，橙色只做 hover |
| 1001 | 6. TOC | 当前项 3px 橙色竖条 + 加粗 |
| 1046 | 7. Tags | 胶囊改方角等宽标签，hover 反白 |
| 1081 | 8. Categories, archive timeline | 分类卡片方角、时间线方点、去掉渐变条纹 |
| 1158 | 9. Pagination, buttons, footer | 分页方按钮（当前页实心）、回顶方按钮、页脚等宽 |
| 1217 | 10. Mermaid | 图表容器去底色、可横向滚动、桌面端缩放适配 |
| 1241 | 11. Misc | kbd、分隔线、图片、搜索标签、`prefers-reduced-motion` |

变量层用 `@mixin` + 四段选择器表达四种状态：`html[data-mode=light]`、`html[data-mode=dark]`、
`@media (prefers-color-scheme: light) html:not([data-mode])`、`@media (prefers-color-scheme: dark) html:not([data-mode])`。
这样系统深色真正生效，手动切换仍然优先。

## 3. 从 gem 复制的文件

只有一个，来自 `jekyll-theme-chirpy 7.4.1`：

| 文件 | 为什么必须复制 |
|---|---|
| `_layouts/home.html` | Chirpy 首页卡片只输出日期和分类，没有标签；要满足“日期与标签一行”，只能在模板里插 `<span class="card-tags">`。CSS 无法生成标签内容。其余部分与 gem 逐行一致，升级时 diff 这一个文件即可。 |

`_includes/metadata-hook.html` 是 Chirpy 官方留的自定义 head 挂载点（gem 里只有一行注释），属于受支持的扩展位置；
`assets/js/cf-mermaid.js` 是本仓库新增文件。

## 4. 对比度实测（真实页面，浏览器计算值 + 逐级回溯背景色）

HEAD
cat /tmp/ui-shots/contrast-table.md
cat <<'MID'

门槛：正文 4.5:1，大字（≥24px 或 ≥18.66px 且 700）与图标 3:1。全部通过，0 项失败。

## 5. 可访问性与构建

| 检查 | 改前 | 改后 |
|---|---|---|
| axe（7 页 × 2 宽 × 2 模式 = 28 次） | 1 个 critical（`/categories/` 的无效 `aria-expanded`），每页 1–3 个 serious（对比度、滚动区焦点等） | **0 critical，0 serious**；仅剩 2 类 moderate（主题层：移动端 h1 被隐藏、两个 aside 无独立名称） |
| Lighthouse 无障碍 首页（3 次中位数） | 100 | 100 |
| Lighthouse 无障碍 文章页 | 93 | 96 |
| Lighthouse 性能 首页 | 96 | 95 |
| Lighthouse 性能 文章页 | 80 | 79 |
| `bundle exec jekyll b` + `htmlproofer --disable-external` | — | 退出码 0（43 个文件、138 条内链） |

性能跌幅 1 分，在 5 分以内。

## 6. 真实页面逐个点过

| 项 | 结果 |
|---|---|
| Mermaid 图 | 全站 12 个 ```mermaid 代码块（RAG 5、learn-how-to-think 5、langgraph 1、hello-world 1）全部渲染，0 错误；配色随亮暗切换；小屏保持字号横向滚动 |
| 公式 | `$$` 共 2 篇 4 处（RAG 1 块 + hello-world 1 行内），MathJax 正常，无横向溢出 |
| 代码块 | 行号、语言标签、复制按钮实测可点（点击后按钮进入 `timeout` 状态），复制内容正确 |
| TOC | 滚动后当前项变橙加粗并出现 3px 竖条 |
| 分页 | 本站 10 篇文章、`paginate: 10`，实际不产生第二页；分页样式用注入的等价 DOM 验证（见对比度表“分页”两行） |
| 标签页 / 分类页 / 归档页 | 已截图并点击 |
| 亮暗切换 | 切换按钮生效，图表同步换色 |
| 手机侧栏抽屉 | 汉堡打开、点遮罩关闭正常 |

## 7. PWA：手机上的旧缓存能拿到新样式

Chirpy 每次构建生成新的 `cacheName`（`chirpy-<时间戳>`），但 `sw.min.js` 本身字节不变，
浏览器不会重装 Service Worker，也就不会重新读 `swconf.js`，旧机可能一直吃旧 CSS。

修法：`assets/js/cf-mermaid.js` 在页面被 Service Worker 接管时，比对缓存里的样式表与服务器当前的样式表
（ETag / Content-Length），不一致就清掉 `chirpy-*` 缓存并强制刷新一次（每会话最多一次，避免循环；
离线或没有 Cache API 时不动）。

实测：本地生产构建 + 真实 Service Worker，访问→缓存→改动 CSS 模拟新部署→刷新，页面拿到新样式
（背景色从 `rgb(247,247,247)` 变为新值），无需手动清缓存。

## 8. 没动的东西

- permalink 结构、`_config.yml` 的 `paginate` 与 `defaults`、`_plugins/posts-lastmod-hook.rb`
- 10 篇文章的正文一个字没改（含未跟踪的 `_posts/2026-06-01-langgraph.md`）
- 没有引入 npm / Tailwind / PostCSS / 任何构建步骤；线上仍由 GitHub Pages 直接跑 Jekyll
- `Gemfile` 只补了 Ruby 3.4 不再默认携带的 `erb`/`csv`/`base64`/`bigdecimal`/`logger`（本机编译需要，CI 的 Ruby 3.3 不受影响）

## 9. 视觉上变了什么 / 故意没变

变了：底色分区、卡片从圆角柔光变成方角描边、标题字阶与字重、正文 17px/1.85、
代码块头部与配色、TOC 高亮、标签胶囊改方角等宽、分页与回顶按钮、侧栏/顶栏/页脚、
归档时间线、分类卡片、Mermaid 配色、系统深色模式从失效变为生效。

故意没变：栏目结构与 URL、文章正文与图片、摘要截断长度、`paginate: 10` 的密度、
搜索行为、评论/分享按钮的功能、PWA 开关状态。
