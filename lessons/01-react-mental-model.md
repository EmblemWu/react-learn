# 第 1 章：React 的心智模型

## 1. 元素 vs 组件
- **元素**：轻量的描述对象（type + props）。JSX 编译后就是 `React.createElement(type, props, ...children)` 的返回值。
- **组件**：函数或 class，接收 props，返回元素树。
- 渲染 = 把元素树转为 UI（DOM、原生视图、Canvas...）。

## 2. 声明式 UI
- 你描述“结果”，React 负责“过程”。
- 状态变化 → 重新执行组件函数 → 产生新元素树 → 协调差异 → 最小化真实 DOM 更新。

## 3. JSX 到 createElement
- JSX 不是必需；核心是 `createElement(type, props, ...children)`。
- React 18 仍保留 `React.createElement`；在 `mini-react` 中我们自己实现了同名函数。

## 4. 单向数据流
- 父 -> 子 props；子要改父状态需调用父提供的回调。
- 这降低了调试复杂度，也方便时间旅行/回放。

## 5. render 流程的概览
1) **创建元素树**（同步，纯函数）：组件返回的对象结构。
2) **协调**（diff）：找出需要变动的节点；Fiber 让 diff 可中断。
3) **提交**（commit）：批量更新宿主环境（DOM）。

## 6. 练习与思考
- 观察 `mini-react/core.js` 中的 `createElement` 与 `render`，对照官方 API。
- 改一改 `examples/counter.html`：在组件里返回嵌套结构，理解元素树结构。

理解这些基本概念后，再去看 Fiber 架构就不容易迷路。
