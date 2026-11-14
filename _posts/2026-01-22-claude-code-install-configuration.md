---
title: Pi 安装与配置指南：用 magpie 接管模型切换
date: 2026-01-22 19:50:00 +0800
categories: [技术, 教程]
tags: [pi, magpie, claude, ai, devtools]
pin: false
math: false
mermaid: false
---
# Pi 安装与配置

一句话：**编码 agent 从 Claude Code 换成 Pi，模型切换从 CC-Switch 换成 magpie。**

> Claude Code 仍然能用，CC-Switch 也没坏。下面第 6 节保留了旧方案，
> 只是新装机器不用再走那一套。

## 为什么换

| 对比项 | Claude Code | Pi |
|---|---|---|
| 定位 | Anthropic 官方 agent，开箱即用 | 最小可扩展 harness，自己拼 |
| 扩展方式 | 内置 plan mode、sub-agent | 扩展、技能、提示模板、主题 |
| 供应商 | 绑定 Anthropic 接口 | 任意 OpenAI 兼容 provider |
| 体积 | 全功能，装完就能用 | 默认很薄，缺的自己装 |

| 对比项 | CC-Switch | magpie |
|---|---|---|
| 形态 | Tauri 桌面应用 | 托盘 + 窗口 + TUI + 命令行 |
| 切换方式 | 改写配置里的关键字段 | agent 指向本地网关 `127.0.0.1:3425` |
| 协议 | 路由模式下转换格式 | 四种协议互转（Chat / Responses / Messages / Gemini） |
| 订阅登录 | Beta：Copilot、ChatGPT 等 | Claude、ChatGPT、Copilot、Gemini、Antigravity |
| 配额 | 每个工具一条失败转移队列 | 一个模型挂多个账号，用完自动换 |
| 支持的 agent | 12 个 | 20 多个，含 Pi |

两件事的实际区别：**magpie 把"用哪个模型"从每个工具各自的配置文件里抽出来，放到一个地方管**；
Pi 则把"agent 本身"做成可以按需拼装的东西。合起来就是：换模型不用改 JSON，换习惯不用换工具。

## 1. 安装 Pi

Linux / macOS：

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

Windows（PowerShell）：

```powershell
powershell -c "irm https://pi.dev/install.ps1 | iex"
```

用 npm 装（不锁传递依赖，需要 Node.js **22.19+**）：

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

装完在项目目录里直接 `pi`。升级用 `pi update`。

## 2. 安装 magpie

```bash
curl -fsSL https://usemagpie.ai/install.sh | sh
```

macOS / Windows 也可以从 [usemagpie.ai](https://usemagpie.ai) 下桌面版。几点要知道：

- Linux 上脚本装桌面版；没有图形会话的服务器会装终端版，也可以显式指定 `--tui`。
- 走代理：`curl -fsSL https://usemagpie.ai/install.sh | sh -s -- --proxy http://127.0.0.1:7890`。
- 卸载：`curl -fsSL https://usemagpie.ai/install.sh | sh -s -- --uninstall`，
  它会把各个 agent 的配置**还原成接入前的样子**，再删掉自己装的东西。

## 3. 把 Pi 接到 magpie

图形界面三步：

1. **Providers → Add provider**：粘 API key，或点订阅磁贴登录（Claude / ChatGPT / Copilot / Gemini）。
2. **Agents** 页找到 Pi 那一行，点模型，选一个 `magpie` 下的模型。
3. 重开 `pi`。配置是启动时读的，旧会话不会变。

命令行做同样的事：

```bash
magpie provider add deepseek sk-…            # 预设供应商只要 key
magpie pi deepseek/deepseek-v4-pro           # 指定 Pi 用哪个模型
magpie pi                                    # 看 Pi 现在用什么
magpie pi default                            # 撤销，回到 magpie 接管之前
magpie quota                                 # 各个套餐还剩多少
magpie tui                                   # 整个 magpie，在终端里
```

### 它到底写了什么

看懂这一步，出问题就不用猜：

| 文件 | 变化 |
|---|---|
| `~/.pi/agent/models.json` | 增加一个 provider `magpie`：网关地址、它自己的 key、你选的那些模型 |
| `~/.pi/agent/settings.json` | `defaultProvider`、`defaultModel`、`defaultThinkingLevel` |
| `~/.pi/agent/extensions/magpie.ts` | magpie 的决策模型和图像模型，供 codemode 用 |

首次写入前，两个 JSON 都会备份成 `.before-magpie`；你自己加的 provider 不动，
Pi 的模型列表里 magpie 的模型会和你的并排出现。`Ctrl+P` 在这些模型之间循环。

## 4. 第三方模型为什么不用再折腾

Claude Code 只会说 Anthropic Messages，Codex 只会说 OpenAI Responses，这是以前必须用 CC-Switch
或路由器的根本原因。magpie 在本机 `127.0.0.1:3425` 起了个网关，四种协议互相翻译（流式和
tool call 都包含），于是：

- DeepSeek、Kimi、GLM、Qwen、MiniMax、OpenRouter、Ollama、LM Studio 都能直接给 Pi 用；
- 你已经在付钱的 Claude Pro/Max、ChatGPT、Copilot 订阅，也能跨 agent 用；
- 同一个模型后面可以挂多个账号或额度，用完自动换，agent 看不到报错。

Pi 里跑的 codex 模型、claude 模型，和你直接在 Claude Code 里跑，走的是同一个网关。

## 5. 常见问题

**装完提示找不到 `pi`**：安装脚本把二进制放进 `~/.local/bin` 一类目录，重新登录或把它加进 `PATH`。

**还想留着 Claude Code**：可以。magpie 走 Claude 订阅时请求仍然由本机装的 Claude Code 发出，
所以别把 Claude Code 卸了。两个工具可以同时在，各自在 magpie 里选模型。

**改了模型没生效**：agent 只在启动时读配置，关掉重开。

**防火墙 / 无 GitHub 访问**：安装脚本和 `magpie update` 都吃 `--proxy`，
`HTTPS_PROXY`、`ALL_PROXY` 也认。

## 6. 旧方案留档：Claude Code + CC-Switch

给还在用这套的机器。先把 CC-Switch 装上（[farion1231/cc-switch](https://github.com/farion1231/cc-switch)），
在界面里选供应商、填 API KEY：

![CC-Switch](https://raw.githubusercontent.com/farion1231/cc-switch/main/assets/screenshots/main-en.png)

![CC-Switch Add](https://raw.githubusercontent.com/farion1231/cc-switch/main/assets/screenshots/add-en.png)

Claude Code 本体：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### 跳过 Claude Code 的登录

在 HOME 目录的 `.claude.json` 里加：

```json
{
  "hasCompletedOnboarding": true
}
```

### 第三方模型打不中缓存

在 `.claude` 目录的 `settings.json` 里加：

```json
{
  "env": {
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0"
  }
}
```

这两处都是 Claude Code 自己的毛病，换成 Pi 之后不再需要。
