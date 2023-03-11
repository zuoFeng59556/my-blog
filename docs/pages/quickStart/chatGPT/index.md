# 三分钟拥有自己的 chat-gpt (开发到上线)
- 首先你需要有一个 `laf` 账号，如果你还不知道 `laf` 是什么，参考 [三分钟学会Laf](https://zuofeng59556.github.io/my-blog/pages/quickStart/laf/)
- 然后你还需要有一个 `chat-gpt` 的账号并且生成一个 `apiKey` (这一步可以问 `Google` )
  
<font color=#42b883>下面我们开始计时</font>，三分钟时间用 Laf 实现一个自己的 ChatGPT！
  
## 云函数
具备了上面这两个条件我们就可以开始啦。   
点击 `NPM` 依赖右边的加号
![alt 属性文本](./image/1.png)   
搜索 `chatgpt` 找到对应的 `npm` 包 保存并重启应用。
![alt 属性文本](./image/2.png)   
然后就可以像我一样新建一个云函数 名字叫`send`并写入以下内容（记得更换 apiKey）
```js
import cloud from '@lafjs/cloud'

export async function main(ctx: FunctionContext) {
  const { ChatGPTAPI } = await import('chatgpt')
  const data = ctx.body

  // 这里需要把 api 对象放入 cloud.shared 不然无法追踪上下文
  let api = cloud.shared.get('api')
  if (!api) {
    api = new ChatGPTAPI({ apiKey: "这里需要换成你自己的apiKey哦" })
    cloud.shared.set('api', api)
  }

  let res
  // 这里前端如果传过来 parentMessageId 则代表需要追踪上下文
  if (!data.parentMessageId) {
    res = await api.sendMessage(data.message)
  } else {
    res = await api.sendMessage(data.message, { parentMessageId: data.parentMessageId })
  }
  return res
}
```

## 前端
前端项目中老三样 
```js
// 安装 laf sdk
 npm install laf-client-sdk 

// 引入
import { Cloud } from "laf-client-sdk"; 

// 创建 cloud 对象 这里换掉appid
const cloud = new Cloud({
  baseUrl: "https://这里换成自己的appid.laf.dev",
  getAccessToken: () => "",
});

```
这里我们看一下前端的核心代码，非常的简单，就是把提问的内容和上下文 `id` 传入云函数就可以了。
```js
async function send() {

// 我们提问的内容
const message = question.value;

let res;
// 与云函数逻辑一样，有上下文 id 就传入
if (!parentMessageId.value) {
  res = await cloud.invoke("send", { message });
} else {
  res = await cloud.invoke("send", { message, parentMessageId: parentMessageId.value });
}

// 回复我们的内容在 res.text 

// 这个是上下文 id
parentMessageId.value = res.id;
}
```
到这一步 我们已经可以发信息给 `chatgpt` 并且拿到回复的消息了。  
我们只要稍微加 <font color=#42b883>亿点点</font> 细节，就可以变成这样。   
![alt 属性文本](./image/3.png)   
加完这点细节之后，基本开发工作就完成了，接下来就是把项目上线分享给你的朋友，顺便装个杯。  
说到上线我们现在应该要去 买一台服务器 安装`nginx` 配置`nginx` 解析域名  绑定域名...    
### NO NO NO 我不允许你浪费年轻而美好的生命，life is short, you need laf :)

## 上线
打开你的 `laf` 点击存储界面->点击上方加号->创建一个权限为 readonly 的存储桶（名字随意）
![alt 属性文本](./image/4.png)   
创建完之后 在你的前端项目中运行打包命令 我这里是 `npm run build`,打包完毕之后找到打包好的 `dist` 文件夹。   
像我一样把 `dist` 文件里面的所有东西都上传到我们刚刚创建的存储桶里面，记住是原封不动的上传哦，文件就是文件，文件夹就是文件夹。
![alt 属性文本](./image/5.png)   
上传完毕之后，发现右上角有一个 “开启网站托管” 点一下。
![alt 属性文本](./image/6.png)   
点完之后出来一个链接，我们点击一下访问看看是啥东西。
![alt 属性文本](./image/7.png)   
#### 哦！我的老天鹅呀 这不就是我刚刚开发的项目吗？？？
![alt 属性文本](./image/8.png)   
恭喜 到这里你的项目已经上线了，快分享给你的好朋友吧！    
点击[这里](https://jyf6wk-chat-gpt.site.laf.dev/)查看我的 chatGPT    
点击[这里](https://github.com/zuoFeng59556/chatGPT)查看项目源码（样式部分是从 chatGPT 官网复制过来的有些乱）