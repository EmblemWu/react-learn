# 第 4 章：调度与并发特性

## 1. `requestIdleCallback` 思想
- 让浏览器在“空闲片段”执行低优任务，若用户交互打断则延后。
- React 17 以前未默认启用；React 18+ 通过自研 Scheduler（基于 MessageChannel）实现更精细的优先级与过期时间。

## 2. React 18/19 并发能力概览
- **可中断渲染**：长列表渲染可暂停，把控制权还给浏览器。
- **优先级**：用户输入优先，低优先级任务（如预渲染）可延后。
- **Transitions**：`startTransition` 标记更新为非紧急；`useTransition` 提供 pending 状态。
- **Selective Hydration**：SSR 片段按需唤醒。

## 3. 教学版调度（在 `mini-react`）
- 使用 `requestIdleCallback(workLoop)` 近似模拟“可中断 diff”。
- `deadline.timeRemaining()` 决定是否让出线程。
- 提交阶段仍一次性同步完成，以保证一致性。

## 4. 练习
- 在弱设备（或 DevTools throttle CPU）打开 `examples/counter.html`，在 `performUnitOfWork` 中插入耗时代码，观察帧率。
- 把 `requestIdleCallback` 换成 `while(nextUnitOfWork) performUnitOfWork(...)`，对比卡顿。
- 思考：如果要支持优先级队列，应在哪里存放不同优先级任务？（提示：官方 Scheduler 单独维护小顶堆）。

并发渲染不是并行；它是“可中断、可恢复、可降级”的调度策略。
