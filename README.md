# TypeFlow - 沉浸式打字练习系统 (Immersive Typing Practice)

**TypeFlow** 是一个现代化的、专注于视觉反馈与心流体验的 Web 打字练习应用。它旨在通过多样化的练习模式、精致的 UI 设计和即时的按键反馈，帮助用户提升打字速度与准确率。

当前版本: **v1.7**

## ✨ 核心功能 (Features)

### 1. 多样化练习模式
*   **Level 1: 基础键位 (Muscle Memory)**
    *   专注于指法训练，从基准键位开始逐步扩展。
    *   提供虚拟键盘实时高亮，引导正确指法。
*   **Level 2: 雨滴游戏 (Reflex Training)**
    *   游戏化体验，字符从屏幕上方下落。
    *   训练快速反应能力和盲打信心。
    *   随着时间推移难度（下落速度/生成频率）自动提升。
*   **Level 3: 心流模式 (Flow Mode)**
    *   长篇文章/段落输入。
    *   模拟真实写作场景，提供 WPM 和 进度 实时反馈。
    *   支持回退修改 (Backspace) 和 错误高亮。

### 2. 极致的视觉与交互体验
*   **虚拟键盘**: 75% ANSI 布局，按下即时响应 (0延迟)，释放时优雅淡出。
*   **多主题支持**:
    *   🌑 **Dark Mode**: 默认深色极客风。
    *   🌿 **Eye Care**: 护眼豆沙绿配色。
*   **响应式设计**: 完美适配桌面端、iPad 和 手机竖屏 (自动调整键盘布局)。

### 3. 数据统计与持久化
*   **实时分析**: 计算 WPM (Words Per Minute) 和 Accuracy (准确率)。
*   **本地存储**: 自动保存历史最高记录 (Personal Best)，刷新纪录时会有徽章奖励。
*   **结算面板**: 每次练习结束后展示详细数据分析。

---

## 🚀 快速开始 (Quick Start)

本项目是一个纯静态 Web 应用 (HTML/CSS/JS)，无需复杂的后端环境。

### 方法 1: 直接运行 (推荐)
如果你安装了 VS Code 的 `Live Server` 插件，或者 Python:

1.  在项目根目录打开终端。
2.  运行 HTTP 服务器:
    ```bash
    # Python 3
    python -m http.server 8080
    ```
3.  浏览器访问 `http://localhost:8080`

### 方法 2: 双击打开
直接双击 `index.html` 在浏览器中打开 (注意: 由于 ES Modules 的安全限制，某些浏览器可能阻止从 `file://` 协议加载模块，建议使用方法 1)。

---

## 📂 项目结构 (Project Structure)

```text
typeflow/
├── index.html          # 入口文件 (包含 DOM 骨架)
├── css/
│   ├── style.css       # 全局样式、变量、主题定义
│   ├── components.css  # 通用组件 (虚拟键盘、按钮)
│   └── levels.css      # 各个关卡的特定样式
└── js/
    ├── main.js         # 主程序入口 (路由分发、全局初始化)
    ├── config.js       # 全局配置 (版本号、常量)
    ├── data.js         # 练习数据 (课程内容、文章库)
    ├── keyboard.js     # 虚拟键盘核心逻辑 (DOM缓存、高亮)
    ├── utils.js        # 通用工具函数
    ├── utils/
    │   ├── stats.js    # 统计计算 (WPM/Acc)
    │   └── storage.js  # LocalStorage 封装
    ├── ui/
    │   └── results.js  # 结算面板 UI
    └── levels/
        ├── level1.js   # Level 1 逻辑实现
        ├── level2.js   # Level 2 逻辑实现 (包含游戏循环)
        └── level3.js   # Level 3 逻辑实现
```

---

## 🛠️ 技术实现与扩展指南 (Developer Guide)

如果你想了解代码细节或为 TypeFlow 贡献新功能，请阅读以下内容。

### 1. 架构设计

TypeFlow 采用了 **原生 ES Modules (ESM)** 进行模块化开发，没有使用 Webpack/Vite 等构建工具，保持了极致的轻量化。

*   **状态管理**: 每个 Level 模块 (`levelX.js`) 内部维护自己的 `state` 对象，互不干扰 (Singleton Pattern)。
*   **DOM 操作**:
    *   **性能优化**: 核心高频操作（如键盘高亮）使用了 `Map` 缓存 DOM 节点 (`js/keyboard.js`)，避免 O(N) 查询。
    *   **游戏循环**: Level 2 使用 `requestAnimationFrame` 实现高性能动画循环，并将布局查询移出循环体。
*   **样式系统**: 使用 CSS Variables (`var(--bg-color)`) 实现动态换肤。

### 2. 如何增加一个新的关卡 (Level 4)?

假设你要增加一个 "代码练习模式":

1.  **创建文件**: 在 `js/levels/` 下创建 `level4.js`。
    *   必须导出 `init(container)` 函数。
    *   实现 `renderMenu()` 和 `startLevel()` 逻辑。
2.  **注册模块**:
    *   在 `index.html` 的导航栏添加按钮 `<button data-level="4">Code</button>`。
    *   在 `js/main.js` 中导入模块: `import * as Level4 from './levels/level4.js';`。
    *   在 `switchLevel` 函数的 `switch` 语句中添加 `case '4': Level4.init(...)`。
3.  **添加样式**: 在 `css/levels.css` 中添加 `.level4-stage` 相关样式。

### 3. 如何修改/增加练习内容?

*   打开 `js/data.js`。
*   **Level 1**: 修改 `LEVEL1_LESSONS` 数组。
*   **Level 3**: 修改 `LEVEL3_ARTICLES` 数组。
*   内容结构清晰，直接添加 JSON 对象即可。

### 4. 调试技巧 (Debug)

*   **全局状态**: 在控制台输入 `window.TypeFlowState` (如果暴露了的话) 或直接在代码中添加 `console.log`。
*   **布局调试**: 给元素添加 `border: 1px solid red` 查看边界。
*   **性能分析**: 使用 Chrome DevTools 的 Performance 面板，关注 `Scripting` 和 `Rendering` 耗时。

---

## 📝 待办事项 (To-Do)

*   [ ] 增加用户注册/登录系统 (对接后端)。
*   [ ] 增加更多编程语言 (Python, JS) 的代码练习模式。
*   [ ] 增加多人对战模式 (WebSocket)。

---

*Made with ❤️ by TypeFlow Team*
