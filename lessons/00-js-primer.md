# 第 0 章：React 前的 JS 底层必备

## 1. 事件循环 & 宏/微任务
- 宏任务：`setTimeout`、DOM 事件、I/O；微任务：`Promise.then`、`queueMicrotask`、`MutationObserver`。
- 顺序：一次宏任务 → 清空所有微任务 → 浏览器渲染 → 下一宏任务。
- React 为什么在 18+ 引入并发渲染？因为可中断/分片的调度需要理解任务切片与优先级。

> 练习：在浏览器控制台写 `Promise.resolve().then(()=>console.log('micro')); setTimeout(()=>console.log('macro')); console.log('sync');`，观察顺序。

## 2. 闭包与状态隔离
- Hook 的核心是“让函数组件跨多次调用保存状态”，依赖闭包里保存的变量。
- 匿名函数捕获外部变量，形成引用而非拷贝；注意 stale closure 问题。

> 练习：写一个自定义 `createCounter`，返回 `increment` 函数，验证闭包保存的 `count`。

## 3. 原型链与 `class`
- React 组件可以是函数，也可以是 class（旧式）。
- 原型链核心：属性查找沿 `obj -> obj.__proto__ -> ...` 直到 `Object.prototype`。
- `new` 做了四件事：创建空对象、绑定原型、执行构造、返回对象。

> 练习：手写 `function myNew(Ctor, ...args) { const obj = Object.create(Ctor.prototype); const ret = Ctor.apply(obj, args); return ret ?? obj; }`。

## 4. `this` 绑定
- 默认/严格模式、隐式绑定、显式绑定（`call/apply/bind`）、new 绑定、箭头函数无 `this`。
- React 早期 class 组件中需 `this.handleClick = this.handleClick.bind(this)`；函数组件避免了此烦恼。

## 5. 模块与打包概念
- ESModule：`import/export` 静态，可摇树优化；CommonJS：`require/module.exports` 动态。
- React 官方包用多个入口：`react` 暴露核心 API；`react-dom`/`react-native` 绑定到不同宿主。

## 6. DOM 与 Synthetic Event
- 原生事件：绑定在具体节点；合成事件：React 在根节点注册，事件冒泡后统一分发，便于一致性与批量更新。
- 了解捕获/冒泡阶段，对应 React 事件名 `onClick`（冒泡）、`onClickCapture`（捕获）。

> 练习：在浏览器写 `div` 嵌套，绑定原生与 React 事件，对比触发顺序。

掌握以上，将大大降低阅读 React 源码的心智负担。
