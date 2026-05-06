---
title: Tmux 终端复用器使用指南
date: 2026-05-06 18:00:00 +0800
categories: [工具]
tags: [工具, 终端, 效率]
math: true
mermaid: true
---

## 为什么需要 Tmux？

在终端里工作时，你大概率遇到过这些场景：

- SSH 连上远程服务器跑任务，网络一断，任务也挂了
- 同时开着四五个终端窗口，来回 Alt+Tab 切到眼花
- 和同事结对调试，想共享同一个终端会话

**Tmux** 正是解决这些问题的利器。它是一个终端复用器（Terminal Multiplexer），核心能力就三个：

1. **会话保持** — 断开 SSH 后任务继续跑，重连即恢复
2. **窗口管理** — 一个终端里分屏、多窗口，告别窗口地狱
3. **协作共享** — 多人实时共享同一个终端会话

---

## 安装

```bash
# Ubuntu / Debian
sudo apt install tmux

# macOS
brew install tmux

# 验证
tmux -V
```

---

## 核心概念

Tmux 有三层结构，理解它们才能用好：

```
Session（会话）
  └── Window（窗口）—— 类似浏览器标签页
        └── Pane（窗格）—— 窗口内的分屏
```

| 概念 | 类比 | 特点 |
|------|------|------|
| Session | 一个项目工作区 | 可 attach / detach，持久运行 |
| Window | 浏览器标签页 | 每个窗口全屏，可切换 |
| Pane | 编辑器分屏 | 同一窗口内多个终端 |

---

## 会话管理

```bash
# 创建新会话
tmux new -s myproject

# 列出所有会话
tmux ls

# 脱离当前会话（会话中的任务继续运行）
# 快捷键: Ctrl+b d

# 重新接入已有会话
tmux attach -t myproject

# 杀死会话
tmux kill-session -t myproject

# 重命名会话
tmux rename-session -t myproject myapp
```

**最常用的工作流：**
```bash
ssh user@server
tmux new -s dev          # 创建开发会话
# ... 干活 ...
# Ctrl+b d               # 下班断开
# 第二天：
ssh user@server
tmux attach -t dev       # 恢复，一切如初
```

---

## 窗口操作

默认前缀键是 **Ctrl+b**，按下后松开再按后续按键。

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+b c` | 创建新窗口 |
| `Ctrl+b ,` | 重命名当前窗口 |
| `Ctrl+b n` | 切换到下一个窗口 |
| `Ctrl+b p` | 切换到上一个窗口 |
| `Ctrl+b 0-9` | 切换到指定编号窗口 |
| `Ctrl+b w` | 列表选择窗口 |
| `Ctrl+b &` | 关闭当前窗口 |

---

## 窗格（分屏）操作

这是日常使用频率最高的部分：

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+b %` | 垂直分屏（左右） |
| `Ctrl+b "` | 水平分屏（上下） |
| `Ctrl+b 方向键` | 切换到相邻窗格 |
| `Ctrl+b Ctrl+方向键` | 调整窗格大小（按住不放） |
| `Ctrl+b x` | 关闭当前窗格 |
| `Ctrl+b z` | 当前窗格全屏 / 恢复 |
| `Ctrl+b {` | 与上一个窗格交换位置 |
| `Ctrl+b }` | 与下一个窗格交换位置 |
| `Ctrl+b !` | 将当前窗格提升为独立窗口 |

**典型布局：**
```
# 左边编辑，右边跑命令
┌──────────────┬──────────┐
│              │          │
│   vim        │  shell   │
│              │          │
│              ├──────────┤
│              │   logs   │
└──────────────┴──────────┘
```

---

## 复制模式与滚动

默认模式下鼠标滚轮不能直接滚动。进入复制模式即可：

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+b [` | 进入复制模式（可上下翻页） |
| `Ctrl+b ]` | 粘贴复制的文本 |
| `q` | 退出复制模式 |

**启用鼠标支持**（推荐配置后直接用鼠标滚轮滚动）：

```bash
# 在 ~/.tmux.conf 中配置
set -g mouse on
```

---

## 推荐配置

创建 `~/.tmux.conf`，以下是一个实用配置：

```bash
# 启用鼠标支持
set -g mouse on

# 将前缀键从 Ctrl+b 改为 Ctrl+a（更顺手，类似 screen）
set -g prefix C-a
unbind C-b
bind C-a send-prefix

# 更直观的分屏快捷键
bind | split-window -h -c "#{pane_current_path}"   # Ctrl+a | 垂直分屏
bind - split-window -v -c "#{pane_current_path}"   # Ctrl+a - 水平分屏

# 窗格切换（vim 风格）
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# 窗格调整大小
bind -r H resize-pane -L 5
bind -r J resize-pane -D 5
bind -r K resize-pane -U 5
bind -r L resize-pane -R 5

# 256 色支持
set -g default-terminal "screen-256color"

# 状态栏美化
set -g status-bg colour237
set -g status-fg white
set -g status-left '#[fg=green]#S '
set -g status-right '#[fg=yellow] %Y-%m-%d %H:%M '

# 窗口编号从 1 开始（而不是 0）
set -g base-index 1
setw -g pane-base-index 1
```

生效配置：
```bash
tmux source-file ~/.tmux.conf
```

---

## 实用技巧

### 1. 嵌套 Tmux 会话

当你 SSH 到一台机器，这台机器上也有 tmux 时，内层 tmux 的快捷键会被外层截获。解决方法：**按两次前缀键再按内层按键**。

### 2. 脚本化启动工作区

创建一个脚本 `dev-session.sh`，一键启动完整开发环境：

```bash
#!/bin/bash
tmux new-session -d -s dev
tmux rename-window -t dev:1 'editor'
tmux send-keys -t dev:editor 'cd ~/project && vim .' C-m
tmux new-window -t dev -n 'server'
tmux send-keys -t dev:server 'cd ~/project && npm run dev' C-m
tmux new-window -t dev -n 'shell'
tmux split-window -h -t dev:shell
tmux attach -t dev
```

### 3. 会话共享（结对编程）

```bash
# A 创建共享会话
tmux new -s pair

# B 以只读方式加入
tmux attach -t pair -r

# B 以读写方式加入（需要 tmux 版本支持）
# 或者使用 socket 共享：
# A: tmux -S /tmp/pair new -s shared
# B: tmux -S /tmp/pair attach -t shared
```

### 4. 命令面板（插件推荐）

安装 [tpm](https://github.com/tmux-plugins/tpm) 管理插件，推荐必备插件：

```bash
# 在 ~/.tmux.conf 中
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'      # 基础优化
set -g @plugin 'tmux-plugins/tmux-resurrect'     # 保存/恢复 tmux 环境
set -g @plugin 'tmux-plugins/tmux-continuum'     # 自动保存

# 初始化 tpm（放在配置文件末尾）
run '~/.tmux/plugins/tpm/tpm'
```

---

## 速查表

```
前缀键（默认 Ctrl+b）

会话:
  d         脱离会话
  s         列出并切换会话
  $         重命名会话

窗口:
  c         新建窗口
  ,         重命名窗口
  n / p     下/上一个窗口
  0-9       跳转窗口
  &         关闭窗口

窗格:
  %         垂直分屏
  "         水平分屏
  方向键     切换窗格
  x         关闭窗格
  z         全屏/恢复
  { / }     交换窗格位置

其他:
  [         进入复制/滚动模式
  ]         粘贴
  ?         查看所有快捷键
```

掌握这些，你就能把终端用得飞起。
