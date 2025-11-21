# 第 2 章：虚拟 DOM、Diff 与 Fiber

## 1. 为什么需要虚拟 DOM
- 真正慢的不是 DOM API 本身，而是**在不知道改哪的情况下**做无差别操作。
- VDOM 让我们用 JS 对象描述 UI，先 diff 再最小化操作，便于跨平台（DOM/Native/Canvas）。

## 2. 经典 Diff（O(n^3) → O(n)）
- React 的启发式：同层比较、不同类型直接替换、通过 key 识别节点。
- 线性时间换取“一些场景”下的额外操作成本，但大幅提升可用性。

## 3. Fiber 解决什么问题
- 16ms 一帧限制（60fps），一次性递归 diff 会阻塞主线程。
- Fiber 把递归转为链表迭代，每个节点是一个 Fiber 单元，可在空闲时间片执行（`requestIdleCallback` 思想）。
- 支持优先级、中断、恢复与复用，React 18 的并发特性基于此。

## 4. Fiber 结构（教学版抽象）
```ts
interface Fiber {
  type: string | Function
  dom: Node | null
  parent: Fiber | null
  child: Fiber | null
  sibling: Fiber | null
  props: { children: FiberElement[]; [k: string]: any }
  alternate?: Fiber | null // 上一次提交的对应 Fiber
  effectTag?: 'PLACEMENT' | 'UPDATE' | 'DELETION'
  hooks?: Hook[]
}
```

## 5. 协调流程（简化版）
1) `render` 把根元素包成 `wipRoot`，将 `nextUnitOfWork` 指向它。
2) `workLoop` 使用 `requestIdleCallback`：时间片内不停执行 `performUnitOfWork`，时间不足时让出线程。
3) `performUnitOfWork`：
   - 为当前 Fiber 创建 DOM（或跳过函数组件）。
   - `reconcileChildren`：基于 `alternate`（旧 Fiber）生成新 Fiber 链表，并打上 effectTag。
   - 返回下一个工作单元：优先 child，其次 sibling，再回到叔辈。
4) 当 `nextUnitOfWork` 为空且 `wipRoot` 存在时，进入提交阶段。

## 6. 提交阶段（commit）
- 递归遍历新 Fiber 树，依 effectTag 执行 DOM 插入/更新/删除。
- 与调度解耦：协调可被打断，提交必须一次性完成以保证一致性。

## 7. 练习
- 在 `mini-react/core.js` 中搜索 `reconcileChildren`、`performUnitOfWork`，打 `console.log(fiber.type?.name || fiber.type)`，观察构建顺序。
- 改用 `setTimeout(workLoop, 0)` 代替 `requestIdleCallback`，体会卡顿与无法被高优任务打断的区别。

理解 Fiber 的“可中断 diff + 一次性提交”双相模型，是吃透 React 18+ 的核心。
