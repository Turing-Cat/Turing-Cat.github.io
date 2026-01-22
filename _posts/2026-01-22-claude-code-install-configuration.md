---
title: Claude Code 安装与配置指南
date: 2026-01-22 19:50:00 +0800
categories: [技术, 教程]
tags: [claude, ai, devtools]
pin: false
math: false
mermaid: false
---
# claude code安装配置
## 安装
Linux/MacOS安装
```bash
curl -fsSL https://claude.ai/install.sh | bash
```
Windows安装
- Powershell
```bash
irm https://claude.ai/install.ps1 | iex
```
- CMD
```bash
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```
## 使用第三方模型
推荐使用[CC-Switch](https://github.com/farion1231/cc-switch)，选择供应商填写对应的API KEY即可。

![CC-Switch](https://raw.githubusercontent.com/farion1231/cc-switch/main/assets/screenshots/main-en.png)

![CC-Switch Add](https://raw.githubusercontent.com/farion1231/cc-switch/main/assets/screenshots/add-en.png)
### 配置跳过claude code的登录
在HOME目录下的.claude.json中添加
```json
{
  "hasCompletedOnboarding": true
}
```