# 📖 博客使用与维护指南

欢迎使用你的全新 Jekyll Chirpy 个人博客！这篇指南将帮助你快速上手，了解如何发布文章、修改配置以及日常维护。

## 1. 📝 如何写新文章

所有的博客文章都存放在 `_posts` 目录下。

### 步骤
1.  在 `_posts` 文件夹中创建一个新文件。
2.  **文件命名规则**必须严格遵守：`YYYY-MM-DD-文章标题.md`
    *   例如：`2026-01-21-my-first-post.md`
    *   注意：日期必须准确，否则文章可能不会显示。

### 文章格式 (Front Matter)
每篇文章的开头必须包含一段 YAML 配置块（称为 Front Matter），用三根短横线包裹：

```yaml
---
title: 我的新文章标题
date: 2026-01-21 10:00:00 +0800
categories: [技术, 教程]    # 分类：第一个是主分类，第二个是子分类
tags: [jekyll, blog]       # 标签：可以有多个，全小写建议
pin: false                 # 是否置顶：true 或 false
math: true                 # 是否启用数学公式渲染
mermaid: true              # 是否启用流程图渲染
---
```

在配置块下方，你就可以使用标准的 Markdown 语法编写正文了。

### 插入图片
将图片放入 `assets/img/` 文件夹（可以新建子文件夹），然后在文章中使用 Markdown 引用：
```markdown
![图片描述](/assets/img/你的图片名.png)
```

---

## 2. ⚙️ 如何修改配置

### 核心配置 `_config.yml`
文件位置：根目录 `_config.yml`
你可以修改以下内容：
*   **网站标题** (`title`)
*   **副标题** (`tagline`)
*   **描述** (`description`)
*   **作者信息** (`social.name`, `social.email`)
*   **网站 URL** (`url`)

> **注意**：修改 `_config.yml` 后，必须重启本地预览服务器 (`Ctrl+C` 停止，再重新运行) 才能生效。

### 社交链接
文件位置：`_data/contact.yml`
在这里添加或修改侧边栏底部的社交图标链接（如 GitHub, Twitter, Email 等）。

### 侧边栏头像
文件位置：`assets/img/avatar.png`
替换此文件即可更改全站头像。

### 导航栏页面
文件位置：`_tabs/`
*   `about.md`: 关于页面
*   如果你想修改关于页面的内容，直接编辑 `_tabs/about.md` 即可。

---

## 3. 🚀 预览与发布

### 本地预览
在终端中运行以下命令启动本地服务器：
```bash
bundle exec jekyll serve
```
启动成功后，浏览器访问 `http://127.0.0.1:4000` 即可实时查看效果。
*   修改文章内容后，刷新浏览器即可看到变化。
*   修改 `_config.yml` 后，需要重启命令。

### 发布上线
所有修改确认无误后，通过 Git 提交并推送到 GitHub 即可自动发布：

```bash
git add .
git commit -m "新文章: 标题"
git push origin main
```
等待几分钟，GitHub Pages 就会自动构建并更新你的线上网站。

---

## 4. 📂 常用目录结构速查

```text
Turing-Cat.github.io/
├── _config.yml          # 核心配置文件
├── _posts/              # 📝 在这里写文章！
│   └── 2026-01-20-xxx.md
├── _tabs/               # 独立页面（关于、标签、归档）
├── assets/
│   └── img/             # 存放图片
├── _data/
│   └── contact.yml      # 社交链接配置
└── TUTORIAL.md          # 本指南
```
