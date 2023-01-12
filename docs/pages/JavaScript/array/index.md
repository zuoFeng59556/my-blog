# Array Map weakMap
## Array
### `forEach`
`forEach`  循环的时候会不会改变原数组要看数组中的值是`原始数据类型`还是`引用数据类型`。
```js
    const arr1 = ["火龙果", "草莓", "车厘子", "橘子"]; 
    arr1.forEach((item) => {
      item = "苹果";
    });
    console.log(arr1); // 原始数据类型 不会改变原数组
  /*
    [
    "火龙果",
    "草莓",
    "车厘子",
    "橘子"
    ]
 */
    const arr2 = [
      { name: "火龙果" },
      { name: "草莓" },
      { name: "车厘子" },
      { name: "橘子" },
    ];
    arr2.forEach((item) => {
      item.name = "苹果";
    });
    console.log(arr2);// 引用数据类型  会改变原数组

/* 
[
    {
        "name": "苹果"
    },
    {
        "name": "苹果"
    },
    {
        "name": "苹果"
    },
    {
        "name": "苹果"
    }
]
*/
```

### `map`
`map` 和`forEach`不同的是会返回一个新的数组，新数组中的值就是`return`出去的值。  
```js
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = arr1.map((item) => {
      return item + 1;
    });

    console.log(arr2); //[2,3,4,5,6]
```

### `filter`
`filter` 和 `map`一样会返回一个数组，不同的是 只有`return`后面的表达式为`true`时才会传入新的数组。  
```js
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = arr1.filter((item) => {
      return item > 2; // 返回大于2的item
    });

    console.log(arr2); // [3,4,5]
```

### `splice`
`splice` 可以实现数组的 删除 插入 替换功能。  
接收的前两个参数，指定元素的下标，要删除元素的数量，其余参数都是要添加进数组的项。   

删除功能
```js
    const arr = ["a", "b", "c", "d", "e"];
    // 这里的意思是从下标 0 的地方 删除一个元素
    arr.splice(0, 1);

    console.log(arr); //['b', 'c', 'd', 'e']
```
插入功能
```js
    const arr = ["a", "b", "c", "d", "e"];
    // 这里的意思是在下标 0 的地方 删除 0个元素 添加 "q"
    arr.splice(0, 0, "q");
    console.log(arr); // ['q', 'a', 'b', 'c', 'd', 'e']

    // 当然我们也可以添加多个
    arr.splice(0, 0, "w", "e", "r");
    console.log(arr); // ['w', 'e', 'r', 'q', 'a', 'b', 'c', 'd', 'e']
```
替换功能  
```js
    const arr = ["a", "b", "c", "d", "e"];
    // 这里的意思是在下标 0 的地方 删除 1个元素 添加 "q" 
    arr.splice(0, 1, "q");
    console.log(arr); // ['q', 'b', 'c', 'd', 'e']
```