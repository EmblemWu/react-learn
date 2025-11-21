# 第 5 章：生态与工程化

## 1. JSX 编译链路

- Babel/SWC/esbuild 将 JSX 转成 `jsx/jsxs` 调用；React 17+ 不再全局注入 React。
- 生产构建常做：常量折叠、dead code elimination、scope hoisting。
- 代码：`code/01-mental-model/jsx-transform.js` 展示最小 JSX 编译产物。

## 2. 打包与拆包

- 入口拆分：`react` 只包含 API，`react-dom` 负责 DOM，`scheduler` 单独发布供生态使用。
- ESM/CJS 双包：包内 `exports` 字段指向不同构建，工具按需选择。

## 3. 开发体验

- Fast Refresh：保持组件状态，热替换失效边界时才全量刷新。
- Source Map：映射压缩后代码到源码；React DevTools 提供 Fiber/Hook 状态视图。

## 4. 性能与观测

- Profiler：`<Profiler onRender />` 或 DevTools Profiler 量化渲染耗时。
- 优化手段：减少状态提升、`memo/useMemo/useCallback`、列表 key 稳定、避免在 render 内创建重对象。

## 5. 测试

- 单元：Vitest/Jest + React Testing Library（强调用户视角）。
- E2E：Playwright/Cypress，注意等待异步 UI（`findBy*`）。

## 6. 推荐阅读路径

- React 官方文档“深入 React”章节。
- Dan Abramov《Build your own React》系列。
- React Scheduler 源码（`packages/scheduler`）与 RFC。

工程化视角能让你把“原理”真正落到生产可维护性和性能上。
