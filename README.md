# React 深入原理自学路线

> 目标：一周左右从 JS 底层机制 → React 核心模型 → 关键源码思路，配套可运行的 mini-react + 章节示例代码。

## 路线概览
- **第 0 章：JS 底层必备** — 事件循环、闭包、原型、`this`、模块、DOM & Synthetic Event 基础。
- **第 1 章：React 心智模型** — 声明式 UI、组件与元素的区别、JSX 到 `createElement`。
- **第 2 章：虚拟 DOM & 协调** — VDOM 结构、Diff 策略、Fiber 的出现原因。
- **第 3 章：状态与 Hooks** — `useState`/`useEffect` 设计动机，Hook 调度约束，闭包陷阱。
- **第 4 章：调度与并发特性** — `requestIdleCallback` 思想、优先级、中断/恢复；与 React 18+ 的并发特性类比。
- **第 5 章：生态与工程化** — 打包器、Fast Refresh、Profiler、调试技巧。

## 使用方法
1) 逐章阅读 `lessons/*.md`；每章末尾提到的练习会指向 `code/` 或 `mini-react`。
2) 打开 `examples/counter.html` 在浏览器运行 mini-react，随代码笔记调试。
3) 按章节建议动手实验：改源码或在控制台打印，体会调度/渲染过程。

## 快速开始
```bash
# 任意静态服务器均可（可选）
# npm install -g serve
serve .
# 浏览器访问 http://localhost:3000/examples/counter.html
```

如果不想起服务器，直接双击 `examples/counter.html` 也能跑。

## 目录
- `lessons/`：讲义分章（细致版）。
- `mini-react/`：可运行的教学版 React 核心（VDOM + Fiber + Hooks）。
- `examples/`：示例页面复用 mini-react，便于动手。
- `code/`：每章配套的可运行 JS/HTML 片段，直观验证概念。

## 如何自学与验证理解
- **从输出倒推**：在 `mini-react/core.js` 中加 `console.log`，观察 Fiber 构建 & 提交顺序。
- **对比官方 API**：边看 React 官方文档，边在 mini-react 中找“低配”实现位置。
- **刻意练习**：尝试实现 `useEffect`、支持事件冒泡、增加 Prop 更新对比等。
- **阅读顺序建议**：00 → 跑 `code/00-*` → 01 → 02 → 跑例子 → 改源码 → 03 → 04 → 05。

祝学习顺利，写代码多实践！
