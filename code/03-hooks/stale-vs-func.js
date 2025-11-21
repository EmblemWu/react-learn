// 模拟 stale closure vs 函数式更新

let state = 0;

function setStateDirect(newVal) {
  state = newVal;
}

function setStateFunctional(updater) {
  state = updater(state);
}

// 模拟一次渲染闭包捕获
const captured = state;
setTimeout(() => {
  // 模拟用户点击多次期间 state 已变化
  setStateDirect(captured + 1); // 使用旧值
  console.log('direct set (stale) ->', state);
}, 0);

setTimeout(() => {
  setStateFunctional((s) => s + 1); // 始终基于最新值
  console.log('functional set ->', state);
}, 0);
