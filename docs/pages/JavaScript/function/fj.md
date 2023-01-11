# 防抖
原理：防抖是函数在触发`n`秒后再执行，如果执行前再次触发则重新计时。   
思路：利用计时器来解决，关键思想是`清除`上一个`定时任务`，`重新开启`一个``新的定时任务``。  
```js
    // 防抖函数
    function debounce(fn, delay) {
      let id = null; // 利用闭包让id不会被回收

      return function () { // 这里不能用箭头函数，箭头函数没有arguments
        clearTimeout(id); // 清除上一个定时器
        id = setTimeout(() => {
          fn(...arguments); // 这里如果需要更改this，可以使用apply
        }, delay);
      };
    }

    // 需要执行的函数
    function sayName(name) {
      console.log(name);
    }

    const doSayName = debounce(sayName, 1000); // 创建
    doSayName('小明')// 调用
```
:::tip
记得要先创建再调用
:::
# 节流
原理：节流是指单位时间内触发的函数，只有第一次执行。  
思路：判断`id===null`时才设置定时器，定时器执行完函数后把`id=null`。  
```js
    function throttle(fn, delay) {
      let id = null;// 利用闭包让id不会被回收

      return function () {
        if (id === null) {
          // id为null时设置定时器
          id = setTimeout(() => {
            fn(...arguments);
            id = null; //函数执行完 id赋null
          }, delay);
        }
      };
    }

        // 需要执行的函数
    function sayName(name) {
      console.log(name);
    }

    const doSayName = throttle(sayName, 1000); // 创建
    doSayName('小明')// 调用
```
# 使用场景
防抖一般监听的是没有规律的事件，例如用户输入搜索，需要等待用户操作完毕再执行相应代码。   
节流一般是不需要等待用户操作，第一次就执行。
