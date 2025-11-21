# 第 0 章：React 前的 JS 底层必备

> 目标：把 React 源码里最容易绊脚的 JS/浏览器点一次讲透，配套可运行示例在 `code/00-js/`。

## 1. 事件循环、宏/微任务与渲染序

- 顺序：一次宏任务 → 清空全部微任务队列 → 浏览器渲染 → 下一次宏任务。
- 常见来源：
  - 宏任务：`setTimeout`、UI 事件、XHR、MessageChannel（macrotask）。
  - 微任务：`Promise.then`、`queueMicrotask`、`MutationObserver`、`await` 之后的续体。
- React 18 的并发调度依赖“把协调阶段切成可让步的片”，先理解这里的让步。
- 代码：`node code/00-js/event-loop.js`，观察 `sync -> micro -> macro` 的打印顺序。

## 2. 闭包：Hook 状态的数学基础

- 闭包 = 函数 + 其词法作用域的变量引用。
- 函数组件每次渲染都是一次调用，但 Hook 能跨调用保存状态靠的就是闭包 + 外部数组。
- 污点：旧值被捕获导致 stale 问题，React 提供函数式更新规避。
- 代码：`node code/00-js/closure-counter.js`，对比不同写法的计数表现。

## 3. 原型链与 `class`

- 查找路径：`obj -> obj.__proto__ -> ... -> Object.prototype -> null`。
- `new` 关键字做四件事：创建空对象、绑定原型、运行构造、返回实例（或构造显式返回对象）。
- React class 组件里常见的 `this.handleClick = this.handleClick.bind(this)` 是为了解决方法丢失 `this`。
- 代码：`node code/00-js/myNew.js`，手写 `myNew` 并断言与原生行为对齐。

## 4. `this` 绑定五规则

- 默认绑定（非严格）指向全局；严格模式下为 `undefined`。
- 隐式绑定：`obj.fn()` → `fn` 内的 `this` 为 `obj`。
- 显式绑定：`call/apply/bind`。
- new 绑定：构造函数内 `this` 指向新对象。
- 箭头函数无 `this`，取决于定义时外层作用域。

## 5. 模块与打包

- ESM：编译期可分析，利于 tree-shaking；CommonJS：运行时解析。
- React 官方包：`react` 纯 API，`react-dom` 绑定 DOM，`react-native` 绑定原生。
- 代码：`node code/01-mental-model/jsx-transform.js` 观察 JSX 编译后的对象形态。

## 6. DOM vs Synthetic Event

- React 根上只挂一组事件监听，靠事件冒泡统一分发，收益：
  - 兼容性封装（不同浏览器事件差异）。
  - 批量更新、可中断调度的入口（事件触发 → 更新队列 → 调度）。
- 想要深入可查看 React DOM 事件系统源码：`packages/react-dom/src/events/`。

## 小结

- 事件循环决定“何时”运行；闭包/原型/this 决定“如何”保存状态与调用；模块化让 React 可移植。
- 建议先跑 `code/00-js/*`，确认输出符合预期，再进入下一章。
