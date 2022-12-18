# 原型 原型链

## 构造函数
了解原型之前我们需要明白另外一件事情，什么是构造函数。  
`function student(){}` 这是一个函数,我们可以直接调用它`student()`因为它的函数体是空的,所以不会执行任何操作。  
但我们还有另外一种办法调用它 那就是`new let a = new student()`这句代码意思是 创建一个 `student` 类型的对象 `a` 把`student()`函数当构造函数使用。  
其实所有的函数只要使用`new`来调用都是构造函数，反过来说构造函数和函数的区别就是是否用`new`来调用。  
```js
    function student() {}
    let a = new student();
    console.log(a); //student {}
    console.log(a instanceof student); //true
```
下面我们给出一个稍微标准点的构造函数。
```js
    function student(name, age) {
      this.name = name;
      this.age = age;
      this.sayName = function () {
        console.log(this.name);
      };
    }

    const a = new student("小红", "18");
    const b = new student("小明", "20");

    console.log(a.name); // 小红
    a.sayName(); // 小红

    console.log(b.name); // 小明
    b.sayName(); // 小明

    console.log(a.sayName === b.sayName); //false
```
这里我们通过构造函数实例化了两个对象`a`和`b`,但是请注意最后一行，`a.sayName`和`b.sayName`并不是同一个函数，这代表需要在内存中存放两个同样的`sayName`函数，如果我实例化一百个对象，那么就需要存放一百个同样的函数在内存中，这显然是不好的，后面我们会通过原型来优化这个“不好”的构造函数。


## 构造函数的原型
每个函数创建时js就会为这个函数创建一个`prototype`属性，这个属性是一个对象，也就是我们说的原型（原型对象）。  
默认情况下原型对象会自动获得一个`constructor`属性,指回与之关联的构造函数。
```js
    function student() {}
    console.log(student.prototype);// {constructor: ƒ student()}
    console.log(student.prototype.constructor === student); //true
```
现在我们知道了，每个函数都有一个原型（原型对象），其中默认包括一个`constructor`属性，而这个属性指向关联的构造函数，可以理解为 函数的 原型对象 里面的`constructor`属性 指向它自己。

## 实例的原型
除了构造函数之外，被构造函数`new`出来的实例也是有原型对象的，在chrome浏览器中可以通过`__proto__`属性来访问。（注意proto前面和后面是两个下划线）
```js
    function student() {}
    let a = new student();
    console.log(a.__proto__);// {constructor: ƒ student()}
```
这里我们发现`实例`的原型和`构造函数`的原型看起来一样，我们不妨测试一下。
```js
    function student() {}
    let a = new student();
    console.log(a.__proto__ === student.prototype); // true
```
其实`实例`的原型就是从他的`构造函数`那里得来的，所以得出结论;  
1.构造函数有一个原型。   
2.原型中有一个`constructor`属性，指向构造函数本身。  
3.实例的原型是从构造函数得到的，实例的原型===构造函数的原型。

## 原型的作用
我们已经知道原型是一个对象，有一个默认的`constructor`属性，那么如果给原型对象新增一些属性呢？
```js
    function student() {}
    student.prototype.name = "小红";
    student.prototype.age = "18";
    student.prototype.sayName = function () {
      console.log(this.name);
    };

    console.log(student.prototype);// {name:'小红',age:'18',sayName: ƒ (), constructor: ƒ student()}
    student.prototype.sayName();// 小红
```
可以看到，成功添加并且可以使用，下面我们来创建一个实例。
```js
    function student() {}
    student.prototype.name = "小红";
    student.prototype.age = "18";
    student.prototype.sayName = function () {
      console.log(this.name);
    };

    const a = new student()
    console.log(a.name); // 小红
    a.sayName();// 小红
```
这里发现一个问题，我们实例化一个对象`a`但是我们并没有给`a`赋任何属性，但是我们访问`a.name`和`a.sayName()`，却能正常访问，输出的值刚好是原型中对应的值，why?  
因为通过对象访问属性时，会首先搜索`对象本身`有没有这个属性，如果有则返回，如果没有则去搜索对象的`原型`有没有这个属性。  
因此调用`a.name`会发生两步搜索。  
第一步js引擎会问 对象`a`有`name`这个属性吗？ 答案是没有。  
第二步js引擎会问 对象`a`的原型有`name`这个属性吗？ 答案是有，返回原型的`name`属性。  
调用`a.sayName()`时会发生同样的搜索。  

还记得我们那个“不好”的构造函数吗？我们现在利用原型来改造一下。
```js
    function student(name, age) {
      this.name = name;
      this.age = age;
    }
    student.prototype.sayName = function () {
      console.log(this.name);
    };

    const a = new student("小红", "18");
    const b = new student("小明", "20");

    a.sayName(); // 小红
    b.sayName(); // 小明

    console.log(a.sayName === b.sayName); //true
```
问题顺利解决，不管创建多个对象，`sayName`这个函数也只需要在内存中存储一次了。  
这里我们简单理解一下“原型”的意思，原型 就是构造函数实例化对象的模型。

如果我们想知道一个属性到底是属于原型，还是对象本身，我们可以这样做。
```js
    function student() {}
    student.prototype.age = "18";
    const a = new student();
    a.name = " 小红";

    console.log("name" in a); // true
    console.log("age" in a); // true

    console.log(a.hasOwnProperty("name")); // true
    console.log(a.hasOwnProperty("age")); //false
```
`in`操作符判断属性时会包括原型的属性，也就是说在对象本身和原型上只要能找到就会返回`true`，而`hasOwnProperty()`只有在属性属于自身时才会返回`true`。

## 原型链
现在回顾一下上面所说的知识；   
1.构造函数有一个原型，默认有一个属性`constructor`指向构造函数本身。   
2.实例有一个属性`__proto__`指向构造函数的原型。   
那如果一个构造函数的原型是一个实例呢？
```js
    function grandfather() {
      this.name = "小明";
    }
    grandfather.prototype.getName = function () {
      console.log(this.name);
    };

    function father() {}
    father.prototype = new grandfather();
    father.prototype.getName(); // 小明
```
现在父亲函数的原型是爷爷函数的实例，这代表通过父亲的原型对象可以访问到爷爷的`getName`方法。
我们用父亲函数实例化一个对象，这样就简单的实现了继承。
```js
    function grandfather() {
      this.name = "小明";
    }
    grandfather.prototype.getName = function () {
      console.log(this.name);
    };

    function father() {}
    father.prototype = new grandfather();
    const son = new father();
    son.getName(); // 小明
```
其实所有函数的原型都是`Object`的实例，所以原型链的尽头就是`Object`,`Object`的原型是`null`。  
下面我们来感受一下原型链。
```js
    function grandfather() {}
    function father() {}
    father.prototype = new grandfather();
    const son = new father();

    console.log(son.__proto__ === father.prototype); // true
    console.log(son.__proto__.__proto__ === grandfather.prototype); // true
    console.log(son.__proto__.__proto__.__proto__ === Object.prototype); // true
    console.log(son.__proto__.__proto__.__proto__.__proto__ === null); // true
    
```
::: tip
这里补充说明一下，访问一个对象的属性时会优先搜索对象本身，然后搜索他的原型，然后是他原型的原型，按着原型链一直搜索到`Object`的原型为止。
:::