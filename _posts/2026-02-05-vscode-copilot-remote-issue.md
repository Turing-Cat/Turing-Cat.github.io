---
title: VSCode远程连接无法使用Copilot的解决方案
date: 2026-02-05 11:00:00 +0800
categories: [踩坑]
tags: [VSCode, Copilot, WSL]
math: true
mermaid: true
---

# vscode远程连接到wsl或者服务器Github Copilot Chat无法使用的问题
## 问题描述
在Github Copilot Chat框中聊天，出现如下问题，完全无法使用
```text
Chat took too long to get ready. Please ensure you are signed in to GitHub and that the extension GitHub.copilot-chat is installed and enabled. Click restart to try again if this issue persists.
```
## 解决方案1
在vscode的User的settings.json,添加如下配置即可解决
```json
    "remote.extensionKind": {
        "GitHub.copilot": ["ui"],
        "GitHub.copilot-chat": ["ui"],
    }
```

## 解决方案2
降级vscode和Github Copilot Chat到之前的版本

[vscode旧版地址](https://code.visualstudio.com/updates)


## 总结
解决方案1会导致vscode非常卡顿，不推荐使用，解决方案2是目前最好的解决方案。