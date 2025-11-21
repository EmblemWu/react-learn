# 第 1 章：React 的心智模型

## 1. 元素是什么

- JSX 编译后得到的就是“元素对象”：`{ type, props }`，轻量描述 UI。
- 元素是不可变快照，React 通过对比新旧元素树决定 DOM 变更。
- 代码：`node code/01-mental-model/element-vs-component.js`，打印 JSX 转换产物。

## 2. 组件是什么

- 组件 = 接收 props，返回元素的函数（或 class）。
- 可以组合、可复用；每次渲染就是组件函数的再次调用。

## 3. 声明式 vs 命令式

- 命令式：手动操作 DOM，直接描述过程。
- 声明式：描述目标状态，由框架计划过程。
- 价值：可预测性、减少样板、便于调试。

## 4. 渲染三阶段（高层视角）

1. 渲染（render）：从根组件返回元素树。
2. 协调（reconcile）：找差异，生成 Effect 列表。Fiber 让它可中断。
3. 提交（commit）：一次性执行 DOM/宿主更新，触发布局 & 绘制。

## 5. JSX 到 createElement

- Babel/SWC 把 `<div id="app">hi</div>` 变成 `jsx("div", { id: "app", children: "hi" })`。
- 在教学版 `mini-react` 中我们实现了 `createElement`，与官方 API 对齐接口。
- 代码：`node code/01-mental-model/jsx-transform.js` 查看转换结果；`mini-react/core.js` 查阅实现。

## 6. 单向数据流

- 数据只从父到子，子要影响父通过回调冒泡事件。
- 好处：定位状态来源、减少“幽灵”更新。

## 7. 练习

- 修改 `examples/counter.html`：给 `Counter` 传递不同 props，或嵌套组件观察元素树形态。
- 在 `mini-react/core.js` 里给 `createElement` 增加输入校验，体验声明式数据结构的严谨性。

理解“元素 → 组件 → 渲染阶段”的链条，是后续 Fiber 和 Hooks 的地基。
