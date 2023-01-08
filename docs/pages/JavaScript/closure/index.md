# 闭包
## 概念
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
## 示例
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
上面代码实现了一个计数功能，变量`i`成为私有变量，外部可以使用但不能修改，因为js的垃圾回收机制，`i`一直不会被回收。  
闭包就是作用域链自然产生的结果，了解作用域链和垃圾回收机制，闭包就理解了。