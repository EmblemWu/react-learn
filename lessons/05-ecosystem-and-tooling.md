# 第 5 章：生态与工程化

## 1. 打包器与编译
- JSX 需要编译：Babel / SWC / esbuild；新 JSX Transform 通过自动注入 `jsx/jsxs` 函数（而非全局 React）。
- Tree-shaking 依赖 ESModule；生产构建会做常量折叠、Dead Code Elimination。

## 2. 开发体验
- Fast Refresh 依赖模块热替换（HMR）+ 组件边界保存状态。
- Source Map 帮助调试；React DevTools 让你查看 Fiber、Hooks 状态。

## 3. 性能 & 可观测性
- Profiler API：`<Profiler id="..." onRender={...}>`；DevTools 里也有 Profiler 页。
- 常见优化：`useMemo`、`useCallback`、`memo`；但更重要的是避免不必要的状态提升。

## 4. 单元与端到端测试
- 组件测试：Vitest/Jest + React Testing Library；
- 端到端：Playwright/Cypress。理解 React 的异步更新后，更好地写等待逻辑（`await findByText`）。

## 5. 建议的下一步阅读
- React 官方文档、React 18 并发渲染章节。
- Dan Abramov《Build your own React》文章系列（思想相似于本仓库的 mini-react）。
- Scheduler 源码（`packages/scheduler`），理解优先级与小顶堆实现。

工程化的视角能帮助你把“原理”转化为“可维护的生产代码”。
