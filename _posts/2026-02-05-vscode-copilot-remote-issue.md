---
title: VSCode远程连接无法使用Copilot的解决方案
date: 2026-02-05 11:00:00 +0800
categories: [踩坑]
tags: [VSCode, Copilot, WSL]
math: true
mermaid: true
---

# vscode远程连接到wsl或者服务器github copilot无法使用的问题
## 问题描述
在github copilot的chat框中聊天，出现如下问题，完全无法使用
```text
Chat took too long to get ready. Please ensure you are signed in to GitHub and that the extension GitHub.copilot-chat is installed and enabled. Click restart to try again if this issue persists.
```
## 解决方案
在Vscode的User的settings.json,添加如下配置即可解决
```json
    "remote.extensionKind": {
        "GitHub.copilot": ["ui"],
        "GitHub.copilot-chat": ["ui"],
    }
```
