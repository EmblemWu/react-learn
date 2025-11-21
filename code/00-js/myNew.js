// 手写 new 操作符，验证原型绑定

function myNew(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype);
  const ret = Ctor.apply(obj, args);
  return ret && (typeof ret === 'object' || typeof ret === 'function') ? ret : obj;
}

function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function () {
  return `hi ${this.name}`;
};

const p = myNew(Person, 'Ada');
console.log(p instanceof Person); // true
console.log(p.sayHi());            // hi Ada
