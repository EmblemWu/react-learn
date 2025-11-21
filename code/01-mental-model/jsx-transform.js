// 用最小的 createElement 模拟 JSX 编译输出
// 运行：node jsx-transform.js

function createElement(type, props, ...children) {
  return { type, props: { ...props, children } };
}

const jsxLike = createElement(
  'div',
  { id: 'app' },
  createElement('h1', null, 'Hello'),
  createElement('p', null, 'JSX is just objects')
);

console.log(JSON.stringify(jsxLike, null, 2));
