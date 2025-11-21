# 第 4 章：调度与并发特性

## 1. 为什么要可中断

- 主线程需要在 16ms 内完成 JS + 样式 + 布局 + 绘制才能 60fps。
- 大量节点 diff 会占满时间片，用户输入（如滚动、输入）被延迟，体验掉帧。

## 2. requestIdleCallback 思想简化版

- 浏览器在“空闲”时调用回调，回调得到 `timeRemaining()` 判断还能干多久。
- 教学版 `mini-react` 用此能力在 render 阶段切片；提交仍一次性同步。
- 代码：`node code/04-scheduling/ric-vs-while.js`，感受是否可打断。

## 3. React 18/19 的 Scheduler（概念）

- 使用 `MessageChannel` 驱动 macrotask，配合小顶堆管理优先级任务。
- 每个任务有 `priorityLevel` 与 `expirationTime`；过期后提升优先级确保尽快执行。
- `startTransition` 将更新标为“非紧急”，可被更高优先级打断。

## 4. 并发特性清单

- **可中断渲染**：长列表渲染可暂停，优先响应用户输入。
- **Transitions**：把状态更新标记为低优先级（如搜索建议）。
- **Suspense**：在数据未就绪时显示占位，支持串联多个异步源。
- **Selective Hydration**：SSR 场景按需唤醒重要岛屿。

## 5. 练习

- 打开 `examples/counter.html`，在 DevTools 调 slow 4x CPU，切换大列表，观察帧率。
- 在 `mini-react` 中为 `requestIdleCallback` 回退写一个基于 `setTimeout` 的 polyfill（已实现），对比行为。
- 思考：如果要实现优先级，你会把任务队列放在哪里？（提示：独立 scheduler 层）。

理解调度后，你能解释“React 并发并非并行”，并能读懂 `scheduler` 包。
