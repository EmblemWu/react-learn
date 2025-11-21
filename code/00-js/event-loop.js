// 使用 node 运行：node event-loop.js

console.log('sync start');

setTimeout(() => {
  console.log('macro: setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('micro: promise then');
});

queueMicrotask(() => {
  console.log('micro: queueMicrotask');
});

console.log('sync end');
