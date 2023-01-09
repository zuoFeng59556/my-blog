# 函数
## 参数
每个函数中都有一个`arguments`对象，它是一个数组保存调用时传入的参数，还可以通过它的`length`判断传入了几个参数。    
```js
    function ok() {
      console.log(arguments[0], arguments[1], arguments.length);
    }

    ok(1, 2);// 打印结果 1 2 2
```
:::tip
这里要注意箭头函数并没有arguments
:::

## `this`
普通函数中的`this`指向调用者，也就是运行时确定。  
```js
    function sayName() {
      console.log(this.name);
    }

    window.name = "小红";
    sayName(); // 小红 全局调用指向window

    const obj = { name: "小明" };
    obj.sayName = sayName;
    obj.sayName(); // 小明 obj调用指向obj
```
箭头函数中的`this`指向当前上下文，也就是说编译时确定。   
```js
    const sayName = () => {
      console.log(this.name);
    };

    window.name = "小红";
    sayName(); // 小红

    const obj = { name: "小明" };
    obj.sayName = sayName;
    obj.sayName(); // 这里还是小红 因为sayName函数定义时的上下文是window
```
:::tip
我们经常在回调函数中使用箭头函数的原因就是可以确定this的指向。
:::
## `call` `apply`
函数有两个方法，`call`和`apply`，具体作用是指定`this`的值来调用函数。  
`call`接收两个参数，第一个值是`this`，第二个值是函数的参数，上代码。  
```js
    const obj = { name: "小明" };

    function sayName(age, gender) {
      console.log(this.name, age, gender);
    }

    sayName.call(obj, 18, "男"); // 小明 18 男
```
`apply`和`call`作用一样，只是参数传递的形式变了，第一个参数还是接收`this`，第二个参数可以是数组，也可以是函数的`arguments`。
```js
    const obj = { name: "小明" };

    function sayName(age, gender) {
      console.log(this.name, age, gender);
    }

    sayName.apply(obj, [18,'男']); // 小明 18 男
```

## 闭包

`闭包`是指一个函数对周围状态的引用捆绑在一起，简单说就是内层函数引用外层函数的变量。
```js
// 下面这段代码就形成了一个闭包。
function fn (){
  const a = '123'
  function ok(){
    console.log(a) // 这里使用了外层函数 fn的变量a
  }
}
```
下面代码实现了一个计数功能，变量`i`成为私有变量，外部可以使用但不能修改，因为js的垃圾回收机制，`i`一直不会被回收。
```js
function count (){
  let i = 0
  return function ok(){
      i++
      console.log(i)
    }
}

const fn = count()

fn()
```
闭包就是作用域链自然产生的结果，了解作用域链和垃圾回收机制，闭包就理解了。