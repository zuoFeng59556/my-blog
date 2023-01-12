# 对象
## 对象的属性
对象的属性分为两种，数据属性，访问器属性。
### 数据属性
数据属性就是我们最长见的属性。  
```js
    const obj = {
      name: "小明",
      age: 18,
    }

    console.log(obj.name) // 小明
```
### 访问器属性   
访问器属性不同的是它包含一个`getter`和`setter`函数，在访问这个属性和赋值时就会触发。  
访问器属性是通过`Object.defineProperty()`定义,它接收三个参数，目标对象，属性名，和一个包含set get的对象。
```js
    const obj = {
      name: "小明",
      age: 18,
      id_: "007", // 这里加上下划线代表是一个私有属性，不希望外部访问
    };

    Object.defineProperty(obj, "id", {
      get() {// 访问obj.id的时候会触发这个函数。
        console.log("get触发");
        return this.id_;
      },
      set(newValue) { // 这里的newValue就是设置的值，在这个例子里就是'008'
        console.log("set触发");
        this.id_ = newValue;
      },
    });

    console.log(obj.id);
    obj.id = "008";
    /*
      打印结果为：
      get触发
      007
      set触发
    */
```
:::tip
我们可以通过get和set在访问属性和赋值的时候做一些操作，vue2的响应式就是使用defineProperty实现的。
:::
### 使用变量做属性名
```js
    let nameKey = "name";
    const obj = {};
    obj[nameKey] = "小明";
    console.log(obj); // {"name": "小明"}
```
## 常用方法
`Object.keys` 返回一个数组，里面是对象的属性名。  
`Object.values` 返回一个数组，里面是对象的属性值。  
`Object.assign` 返回一个对象，是两个对象的合并结果。(但这里是浅拷贝，具体查看浅拷贝深拷贝章节)
```js
    const obj = {
      name: "小明",
      age: 18,
    };

    console.log(Object.keys(obj)); // ['name', 'age']
    console.log(Object.values(obj)); // ['小明', 18]

    const obj1 = { id: "007" };
    const obj2 = Object.assign(obj, obj1);
    console.log(obj2); // {name: '小明', age: 18, id: '007'}
```
