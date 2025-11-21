// 极简 useEffect 思路演示（无 DOM，纯数据流）

function createEffectRunner() {
  let lastDeps = undefined;
  let cleanup = null;
  return function useEffectMock(effect, deps) {
    const changed = !lastDeps || deps.some((d, i) => d !== lastDeps[i]);
    if (changed) {
      if (typeof cleanup === 'function') cleanup();
      cleanup = effect();
      lastDeps = deps;
    }
  };
}

const useEffect = createEffectRunner();
let count = 0;

function render() {
  useEffect(() => {
    console.log('effect run, count =', count);
    return () => console.log('cleanup when deps change');
  }, [count]);
}

render();
count = 1;
render();
count = 1;
render();
count = 2;
render();
