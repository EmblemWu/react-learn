// 闭包对比：直接捕获 vs 函数式更新

function makeCounterPlain() {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
}

function makeCounterFunctional() {
  let count = 0;
  return (update) => {
    count = typeof update === 'function' ? update(count) : update;
    return count;
  };
}

const c1 = makeCounterPlain();
console.log('plain 1:', c1());
console.log('plain 2:', c1());

const c2 = makeCounterFunctional();
console.log('func set 1:', c2((x) => x + 1));
console.log('func set 2:', c2((x) => x + 1));
console.log('func set replace:', c2(0));
