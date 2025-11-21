// 在 mini-react 思想上插桩，打印 Fiber 遍历顺序（不直接依赖 DOM）

function performUnitOfWorkMock(fiber) {
  console.log('enter', fiber.name);
  // mock child/sibling traversal
  if (fiber.child) return fiber.child;
  let next = fiber;
  while (next) {
    if (next.sibling) return next.sibling;
    next = next.parent;
  }
  return null;
}

// 构造一棵示例 Fiber 树
const root = { name: 'App' };
const a = { name: 'A', parent: root };
const b = { name: 'B', parent: root };
const a1 = { name: 'A1', parent: a };
const a2 = { name: 'A2', parent: a };
root.child = a;
a.child = a1;
a1.sibling = a2;
a.sibling = b;

let nextUnit = root;
while (nextUnit) {
  nextUnit = performUnitOfWorkMock(nextUnit);
}
