# 浅拷贝 深拷贝
## 概念
`浅拷贝`和`深拷贝`主要针对的是引用数据类型（数组 对象），基础数据类型不存在深浅拷贝问题。
## 浅拷贝
```js
    const obj1 = {
      name: "小明",
      age: "18",
    };

    const obj2 = obj1;
    obj2.name = "小红";

    console.log(obj1.name); // 小红
    console.log(obj2.name); // 小红
```
这里我们发现，更改了`obj2.name`之后 `obj1.name` 也变成了`小红`，这就是`浅拷贝`。    
原因是因为`obj1`和`obj2`引用的是同一块内存地址,严格意义上都是相等的。
```js
console.log(obj1 === obj2);// true
```
## 深拷贝
不难发现，基础数据类型不会出现`浅拷贝`的情况，而引用数据类型中的属性 例如`obj1.name`就是基础数据类型。   
如果我们这样操作就不会出现`浅拷贝`的情况。   
```js
    const obj1 = {
      name: "小明",
      age: "18",
    };
    const obj2 = {};
    obj2.name = obj1.name;
    obj2.name = "小红";

    console.log(obj1.name); // 小明
    console.log(obj2.name); // 小红

    console.log(obj1 === obj2); // false
```
但是如果一个对象的属性值很多，一个个这样赋值太麻烦了，所以我们手写一个`深拷贝`函数。   
`核心思想`是遍历对象的属性，然后循环赋值。   
首先确定我们的函数接收一个参数，用一个临时变量来拷贝，拷贝完毕之后返回整个临时变量。
```js
    function deepCopy(arg) {
      let temp;
      // do something
      return temp;
    }
```
然后我们需要判断一下需要拷贝的参数是对象还是数组，然后初始化临时变量。
```js
    function deepCopy(arg) {
      let temp;
      if (arg instanceof Object) temp = {};
      if (arg instanceof Array) temp = [];
      return temp;
    }
```
接下来需要用到`Object.keys`方法获取到参数的所有属性值，因为`Object.keys`返回的是一个数组，所以可以直接`forEach`。
```js
    function deepCopy(arg) {
      let temp;
      if (arg instanceof Object) temp = {};
      if (arg instanceof Array) temp = [];

      Object.keys(arg).forEach((item) => {    
        temp[item] = arg[item];
      });
      return temp;
    }
```
看起来我们好像完成了，但是考虑以下情况。
```js
    const obj = {
      name: "小明",
      age: "18",
      book: ["西游记", "红楼梦", "三国演义", "水浒传"],
    };

    const obj1 = deepCopy(obj);
    obj1.book[0] = "小兵张嘎";

    console.log(obj.book[0]); //小兵张嘎
    console.log(obj1.book[0]); //小兵张嘎

    function deepCopy(arg) {
      let temp;
      if (arg instanceof Object) temp = {};
      if (arg instanceof Array) temp = [];

      Object.keys(arg).forEach((item) => {
        temp[item] = arg[item];
      });
      return temp;
    }
```
这里的`obj`的`book`属性是一个数组，还是出现了`浅拷贝`的情况，这个时候需要用到`递归`来解决。
```js
    function deepCopy(arg) {
      let temp;

      if (arg instanceof Object) temp = {};
      if (arg instanceof Array) temp = [];

      Object.keys(arg).forEach((item) => {
        // 这里判断一下如果是对象则递归调用
        if (typeof arg[item] === Object) {
          temp[item] = deepCopy(arg[item]);
        } else {
          temp[item] = arg[item];
        }
      });
      return temp;
    }
```
完整代码测试一下。
```js
    const obj = {
      name: "小明",
      age: "18",
      book: ["西游记", "红楼梦", "三国演义", "水浒传"],
    };

    const obj1 = deepCopy(obj);
    obj1.book[0] = "小兵张嘎";

    console.log(obj.book[0]); // 西游记
    console.log(obj1.book[0]); // 小兵张嘎
    console.log(obj === obj1); // false
    console.log(obj.book === obj1.book); // false

    function deepCopy(arg) {
      let temp;

      if (arg instanceof Object) temp = {};
      if (arg instanceof Array) temp = [];

      Object.keys(arg).forEach((item) => {
        if (typeof arg[item] === "object") {
          temp[item] = deepCopy(arg[item]);
        } else {
          temp[item] = arg[item];
        }
      });
      return temp;
    }
```