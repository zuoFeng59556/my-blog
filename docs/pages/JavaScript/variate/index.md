# `var` `let` `const` 
## `var` 和 `let`
`var`和`let`最大的区别是`var`声明的范围是函数作用域，`let`声明的范围是块作用域。
```javascript
if(true){
  var v = 'var';
  let l = 'let';
}
console.log(v) //var
console.log(l) //l is not defined
// ----------------------------------------

for (var i = 0; i < 5; i++) {}
for (let j = 0; j < 5; j++) {}
console.log(i); //5
console.log(j); //j is not defined
// ----------------------------------------

function ok() {
  var vok = "vok";
  let lok = "lok";
}
ok();
console.log(vok); //vok is not defined
console.log(lok); //lok is not defined
```
还有一点有趣的是`var`声明的变量可以通过window对象访问,而`let`不行。
```js
var v = "var";
let l = "let";
console.log(window.v); //var
console.log(window.l); //undefined
```
## `let` 和 `const`
`let`和`const`作用域相同，唯一不同的是`const`声明时必须赋初值，并且不允许修改。
```js
const name = '小明';
name = '小红'; //TypeError: Assignment to constant variable.
```
如果`const`修饰的是一个对象，修改这个对象的属性是允许的。
```js
const obj = { name: "小明" };
obj.name = "小红";
console.log(obj.name); //小红

const list = [0, 1, 2]; // 众所周知 数组也是对象
list[0] = 1;
console.log(list); //[1,1,2]
```
## 总结
能用`const`就用`const`，确定需要修改的变量用`let`，`var`抛弃不用。