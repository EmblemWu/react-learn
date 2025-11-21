# 第 3 章：状态与 Hooks

## 1. Hook 的设计动机
- 函数组件天然没有实例字段，无法跨渲染保存状态。
- Hook 让我们在“多次调用同一个函数”之间保存独立的状态与副作用信息。
- 规则：只在组件顶层调用、只在 React（或自家 Hook）中调用，保证调用顺序稳定。

## 2. `useState` 的核心思想
- 用数组按顺序存储 Hook；每次渲染 hookIndex 从 0 开始递增。
- 取旧 Fiber 的同序 Hook 作为 `alternate`，把队列中的更新依次应用。
- `setState` 触发：构造新的 `wipRoot`，从当前树的根重新开始调度。

## 3. 闭包陷阱与函数式更新
- 由于 `setState` 异步批量，直接捕获旧值可能过时。
- 函数式更新 `setState(prev => prev + 1)` 使用最新值，可避免 stale closure。

## 4. `useEffect` vs `useLayoutEffect`（概念）
- `useEffect` 在 commit 后、浏览器绘制后异步调用；不会阻塞 UI。
- `useLayoutEffect` 在 DOM 变更后、绘制前同步触发，常用于同步布局测量。
- mini-react 未实现 Effect，留给你练习。

## 5. 练习
- 打开 `examples/counter.html`，连续调用 `setCount(count + 1)` vs `setCount(c => c + 1)`，观察差异。
- 在 `mini-react` 中尝试实现一个极简 `useEffect`：
  - 保存 deps 数组，比较是否变化；
  - 将回调存储在 fiber 的 effect list，提交阶段再调用。

Hooks 的魅力在于把“组件状态机”抽象到一组独立的、可组合的函数式工具。
