# 第 2 章：虚拟 DOM、Diff 与 Fiber

## 1. 虚拟 DOM 的本质

- 不是性能银弹，而是“跨平台的最小变更计划器”。
- 描述层（VDOM 对象）与宿主层（真实 DOM / 原生 View）解耦，React DOM/Nativ e/Canvas 均可复用协调逻辑。

## 2. Diff 策略细节

- 同层对比：不跨层移动节点。
- 类型不同：直接删旧建新。
- Key 的作用：在同级列表中稳定标识节点，避免不必要的卸载/重建（保状态）。
- 代码：`node code/02-fiber/diff-keys.js`，对比有无 key 的重排差异。

## 3. Fiber：把递归栈改成可中断的链表

- 设计动机：避免长任务阻塞（>16ms）导致掉帧。
- 结构（教学版字段）：
  ```ts
  type Fiber = {
    type;
    props;
    dom;
    parent;
    child;
    sibling;
    alternate;
    effectTag;
    hooks;
  };
  ```
- 遍历顺序：深度优先，优先 child，再 sibling，最后回到父亲的 sibling。

## 4. 协调（render phase）流程复盘

1. 根元素封装成 `wipRoot`，`nextUnitOfWork = wipRoot`。
2. `workLoop` 在空闲时间片执行 `performUnitOfWork`。
3. `performUnitOfWork`：
   - 函数组件：调用组件得到 children 元素数组。
   - Host 组件：创建 DOM（首渲染时）。
   - `reconcileChildren`：与旧 Fiber 对比，打上 `PLACEMENT/UPDATE/DELETION`。
   - 返回下一个工作单元（child → sibling → 回溯）。
4. 时间片不足时让出（`deadline.timeRemaining()`），下次继续。

## 5. 提交（commit phase）

- 前序递归遍历 effect list，对 DOM 执行增删改。
- 删除必须从最近的有 DOM 的祖先开始，函数组件自身没有 DOM 需往下找 child。

## 6. 代码导航

- `mini-react/core.js`: `performUnitOfWork`、`reconcileChildren`、`commitWork`。
- `code/02-fiber/trace-workloop.js`: 在教学版基础上插桩，打印 Fiber 构建/提交顺序。

## 7. 练习

- 在 `reconcileChildren` 中加入 key 对比逻辑：当 `element.key !== oldFiber.key` 时视为不同类型。
- 把 `requestIdleCallback` 改为同步 while 循环，感受卡顿与不可中断。

把 Fiber 想成“任务切片 + 双缓冲树”，理解它后看 Scheduler 更轻松。
