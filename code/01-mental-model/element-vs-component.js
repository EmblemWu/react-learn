// JSX -> createElement 的产物示例
// 运行：node element-vs-component.js

function createElement(type, props, ...children) {
  return { type, props: { ...props, children } };
}

function Hello(props) {
  return createElement('div', null, `Hello ${props.name}`);
}

const element = createElement(Hello, { name: 'React' });
console.log('Component element:', JSON.stringify(element, null, 2));

const rendered = Hello({ name: 'React' });
console.log('Rendered child element:', JSON.stringify(rendered, null, 2));
