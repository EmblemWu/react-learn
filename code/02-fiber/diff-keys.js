// 演示有无 key 的列表重排差异（概念模拟）
const prev = ['A', 'B', 'C'];
const nextNoKey = ['C', 'A', 'B'];
const nextKeyed = ['C', 'A', 'B'];

console.log('无 key 时，React 视为位置对齐：');
prev.forEach((item, idx) => {
  console.log(`旧 ${item} -> 新 ${nextNoKey[idx]} (可能卸载/重建)`);
});

console.log('\n有 key 时，位置可变但 identity 稳定：');
const prevFibers = prev.map((k) => ({ key: k, state: `${k}-state` }));
const keyedMap = new Map(prevFibers.map((f) => [f.key, f]));
nextKeyed.forEach((key, idx) => {
  const reuse = keyedMap.get(key);
  console.log(`新位置 ${idx} 复用 Fiber ${reuse.key}，状态=${reuse.state}`);
});
