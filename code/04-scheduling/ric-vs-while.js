// 对比 requestIdleCallback 风格切片 vs 同步 while

function heavy(n) {
  let s = 0;
  for (let i = 0; i < n * 1e5; i++) s += i;
  return s;
}

function syncLoop() {
  console.time('sync');
  for (let i = 0; i < 20; i++) {
    heavy(200);
  }
  console.timeEnd('sync');
}

function idleLoop() {
  console.time('idle-sim');
  let i = 0;
  function work(deadline) {
    while (i < 20 && deadline.timeRemaining() > 1) {
      heavy(200);
      i++;
    }
    if (i < 20) requestIdleCallback(work);
    else console.timeEnd('idle-sim');
  }
  requestIdleCallback(work);
}

console.log('Run in browser DevTools console to feel jank difference');
// syncLoop();
// idleLoop();
