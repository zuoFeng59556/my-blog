# promise async  await 
## 状态
`promise` 的状态分为三种  
* `初始状态(pending) `
* `成功状态(fulfilled) `
* `失败状态(rejected)  `  
  一个`promise`一定处于这三种状态，不可能是其他状态。

## 构造函数
 创建一个`promise`需要通过构造函数 
 ```js
    new Promise((resolve, reject) => {});
 ```
构造函数接收一个函数作为参数，而这个函数的参数`resolve`，`reject` 都是函数。
调用`resolve` 可以使这个`promise`的状态从 `初始状态(pending) `变为 `成功状态(fulfilled)`。
调用`reject` 可以使这个`promise`的状态从 `初始状态(pending) `变为 `失败状态(rejected)  `。

 ```js
     console.log(
      new Promise((resolve, reject) => { resolve() })
    );
    /*打印结果
    [[Prototype]]: promise
    [[promiseState]]: "fulfilled" 注意看这里的状态
    [[promiseResult]]: undefined
    */
    console.log(
      new Promise((resolve, reject) => { reject() })
    );
    /*打印结果
    [[Prototype]]: promise
    [[promiseState]]: "rejected"  注意看这里的状态
    [[promiseResult]]: undefined
    */
 ```
::: tip
`resolve()` 和 `reject()` 可以接收任何形式的参数，具体作用往下看
:::

## then
一个`promise`对象有一个`.then`方法，在`promise`对象的状态改变后触发。 `then`方法接收两个函数参数，分别对应 `成功状态(fulfilled) `和 `失败状态(rejected)  `。   

 ```js
    new Promise((resolve, reject) => {
      resolve();
    }).then(
      (value) => {}, // 成功状态执行这个函数 value 就是 resolve 传来的参数
      (reason) => {} // 失败状态执行这个函数 reason 就是 reject 传来的参数
    );
 ```
 举个栗子  
 ```js
     new Promise((resolve, reject) => {
      resolve("成功");
    }).then(
      (value) => {
        console.log(value); // 成功
      },
      (reason) => {
        console.log(reason); // 这里不会执行 因为调用的是resolve promise是成功状态
      }
    );

    new Promise((resolve, reject) => {
      reject("失败");
    }).then(
      (value) => {
        console.log(value); // 这里不会执行 因为调用的是reject promise是失败状态
      },
      (reason) => {
        console.log(reason); // 失败
      }
    );
 ```
 下面我们写一个正儿八经的`promise`  
```js
    new Promise((resolve, reject) => {
      //这里假装发起一个网络请求
      const res = request('123')
      if (res.ok) {
        resolve(res.data);// 成功返回数据
      } else {
        reject(res.error);// 失败返回错误
      }
    }).then(
      (value) => {
        console.log(value); // 成功拿到数据
      },
      (reason) => {
        console.log(reason); // 失败抛出错误
      }
    );
 ```
 `.then`方法的返回值还是一个`promise`，返回值的状态等于调用者的状态，上代码。  
 ```js
    const res1 = new Promise((resolve, reject) => {
      resolve("成功"); // 变成成功状态
    }).then((value) => {
      console.log(value);
    });

    const res2 = new Promise((resolve, reject) => {
      reject("失败"); // 变成失败状态
    }).then((value) => {
      console.log(value);
    });

    const res3 = new Promise((resolve, reject) => {
      // 什么都不做
    }).then((value) => {
      console.log(value);
    });

    console.log(res1); // [[promiseState]]: "fulfilled"
    console.log(res2); // [[promiseState]]: "rejected"
    console.log(res3); // [[promiseState]]: "pending"
 ```
 那么根据每个`promise`都有`.then`方法的定理，我们就可以实现链式调用。
 ```js
     const res1 = new Promise((resolve, reject) => {
      resolve("成功"); 
    })
    .then((value) => {}) //第一步处理
    .then((value) => {}) //第一步处理
    .then((value) => {}) //第三步处理
 ```

 ## finally 
 `finally` 人如其名 不管`promise`的状态是变为成功还是失败它总会执行。
 ```js
     new Promise((resolve, reject) => {
      resolve("成功");
    }).finally(() => {
      console.log("finally"); // finally
    });

    new Promise((resolve, reject) => {
      reject("失败");
    }).finally(() => {
      console.log("finally"); // finally
    });
 ```

## async await 
`async` 标识符写在函数的最开头，标识这个函数为异步函数。  
`await` 写在一个`promise`前面，作用有两个，暂停当前代码执行，并返回`resolve`返回的值，话不多说上代码。
:::tip
`async` `await`必须成对使用。
:::
```js
    async function ok() {
      const p = new Promise((resolve, reject) => {
        resolve("成功了");
      });

      const res = await p;
      console.log(res); // 成功了
    }
```
这里要注意，`await`会暂停当前函数内的代码执行，如果`promise`的状态没有变为成功，则会一直等待下面的代码不会执行。

```js
    async function ok() {
      const p = new Promise((resolve, reject) => {});

      const res = await p;
      console.log("okok"); // 不会执行
    }
```

```js
    async function ok() {
      const p = new Promise((resolve, reject) => {reject()});

      const res = await p;
      console.log("okok"); // 不会执行
    }
```
通过`promise`和`async` `await`组合，我们可以顺序发起网络请求。

```js
    async function ok() {
      // 假装 request()是接口
      const res1 = await request();
      const res2 = await request(res1);
      const res3 = await request(res2);
    }
```
:::tip
Promise构造函数是同步函数立即执行，then 和 finally 方法是 异步微任务。
:::