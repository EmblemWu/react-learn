# 第 3 章：状态与 Hooks

## 1. Hook 的核心约束

- **顺序一致性**：同一组件每次渲染 Hook 调用顺序必须相同，才能用“数组位置”找回旧状态。
- **只能在顶层调用**：禁止在条件/循环中调用，否则顺序错乱。
- **只能在 React 调度中调用**：确保当前有活动的 wipFiber。

## 2. `useState` 工作流（教学版）

1. 读取旧 Fiber 对应位置的 Hook，得到旧 `state` 与待处理的 `queue`。
2. 把 queue 里的 action 依次应用，得到新 state。
3. 返回 `[state, setState]`。
4. `setState`：把 action push 到 queue，重建新的 `wipRoot` 从根开始调度（触发重新渲染）。

## 3. stale closure 与函数式更新

- 直接捕获的 `count` 可能是旧值；函数式更新 `setCount(c => c + 1)` 使用最新值。
- 代码：`node code/03-hooks/stale-vs-func.js`，观察两个按钮的差异。

## 4. `useEffect` 思维模型（留作练习实现）

- 依赖数组 `deps` 决定是否重复执行。
- 执行时机：commit 之后异步触发；清理函数在下次 effect 前或卸载时执行。
- 实现提示：在 Fiber 上收集 effect list，提交阶段统一运行。

## 5. 其他常用 Hook 的设计感

- `useReducer` = 把 `setState` 的“函数式更新”模式标准化，并自带 `dispatch`。
- `useMemo`/`useCallback` = 通过缓存结果/函数引用来控制子组件重渲染。
- `useRef` = 获得一个“跨渲染稳定的盒子”。

## 6. 代码导航

- `mini-react/core.js` 的 `useState` 是最小可用实现。
- `code/03-hooks/poor-mans-useEffect.js` 提供一个极简版 `useEffect`，帮助你动手对照真实实现。

## 7. 练习

- 在 `mini-react` 中加入 `useEffect`：保存 `deps`，提交阶段比对并执行。
- 实现 `useRef`：返回 `{ current: initial }`，保持引用。

掌握 Hook 顺序约束和 state 队列，就能读懂 React Hook 源码中的大部分逻辑。
