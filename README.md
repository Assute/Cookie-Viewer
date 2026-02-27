# Cookie Viewer & Exporter

一键查看并保存当前网站 Cookie 的 Chrome 浏览器扩展。

## 功能特性

- **自动获取 Cookie** — 点击插件图标，自动读取当前页面的所有 Cookie
- **标准格式输出** — 将 Cookie 格式化为 HTTP 请求头格式（`name=value; name=value`），可直接用于 cURL、Postman 等工具
- **一键复制** — 将 Cookie 字符串快速复制到剪贴板
- **一键下载** — 将 Cookie 导出为 `cookie.txt` 文件，自动保存到默认下载目录
- **全站支持** — 适用于任意 HTTP/HTTPS 网站

## 截图预览

![插件预览](https://upload-bbs.miyoushe.com/upload/2026/02/27/363490070/b8105e957c03e8d84a13d32973c8e220_7312483646035272672.jpeg)

## 安装方法

### 从源码加载（开发者模式）

1. 下载或克隆本仓库到本地
   ```bash
   # GitHub
   git clone https://github.com/Assute/cookie-viewer.git

   # Gitee（国内镜像）
   git clone https://gitee.com/Assute/cookie-viewer.git
   ```
2. 打开 Chrome 浏览器，进入扩展管理页面：`chrome://extensions/`
3. 开启右上角的 **开发者模式**
4. 点击 **加载已解压的扩展程序**
5. 选择本项目文件夹即可

## 使用方法

1. 访问任意网站
2. 点击浏览器工具栏中的扩展图标
3. 弹窗将自动显示当前网站的所有 Cookie
4. 点击 **复制到剪贴板** 复制 Cookie 字符串，或点击 **下载为 cookie.txt** 保存为文件

## 适用场景

- 接口调试时快速获取 Cookie，粘贴到 cURL / Postman / HTTP 客户端中
- 自动化脚本中需要携带 Cookie 进行请求
- 快速检查当前网站存储了哪些 Cookie

## 项目结构

```
├── manifest.json   # 扩展配置文件（Manifest V3）
├── popup.html      # 弹窗页面
├── popup.js        # 核心逻辑
└── README.md
```

## 权限说明

| 权限 | 用途 |
|------|------|
| `cookies` | 读取当前网站的 Cookie |
| `tabs` | 获取当前标签页的 URL |
| `activeTab` | 访问当前活动标签页 |
| `downloads` | 触发文件下载 |
| `<all_urls>` | 允许读取任意网站的 Cookie |

## 技术栈

- Chrome Extension Manifest V3
- 原生 JavaScript（无第三方依赖）

## 开源协议

本项目基于 [CC BY-NC 4.0](LICENSE)（创意共享-署名-非商业性使用 4.0 国际）协议发布。

- 你可以自由查看、使用、修改和分享本项目代码
- **禁止用于商业用途**
- 使用时需注明原作者和出处
