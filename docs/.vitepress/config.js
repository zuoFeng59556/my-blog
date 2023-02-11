export default {
  title: '左风的博客',
  description: 'Just playing around.',
  base: '/my-blog/',
  head: [
    [
      'link',
      { rel: 'icon', href: '/image/code.png' },
      //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ],
  ],
  themeConfig: {
    logo: '/image/code.png',
    siteTitle: 'Hello World',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    markdown: {
      theme: 'material-palenight',
      lineNumbers: true
    },
    nav: [
      {
        text: '联系我',
        items: [
          { text: '595563214@qq.com', link: '' },
        ]
      },
    ],
    sidebar: [
      {
        text: ' 开始',
        items: [
          { text: '起步', link: '/pages/start/' },
        ]
      },
      {
        text: ' JavaScript',
        collapsible: true,
        items: [
          { text: 'var let const', link: '/pages/JavaScript/variate/' },
          { text: '函数', link: '/pages/JavaScript/function/' },
          { text: '对象', link: '/pages/JavaScript/object/' },
          { text: '数组', link: '/pages/JavaScript/array/' },
          { text: '防抖 节流', link: '/pages/JavaScript/function/fj.md' },
          { text: '原型 原型链', link: '/pages/JavaScript/prototype/' },
          { text: 'Promise async  await', link: '/pages/JavaScript/promise/' },
          { text: '事件循环 异步', link: '/pages/JavaScript/eventloop/' },
          { text: '浅拷贝 深拷贝', link: '/pages/JavaScript/copy/' },
        ]
      },
      {
        text: ' 三分钟学会系列',
        collapsible: true,
        items: [
          { text: '为什么是三分钟', link: '/pages/quickStart/preface/' },
          { text: '三分钟学会 laf', link: '/pages/quickStart/laf/' },
          { text: '三分钟部署 laf(win版本)', link: '/pages/quickStart/deployLaf/' },
          { text: '三分钟学会参与开源，提交 pr', link: '/pages/quickStart/pr/' },
          { text: '三分钟学会 React', link: '/pages/quickStart/react/' },
          { text: '三分钟学会 Next.js', link: '/pages/quickStart/next/' },
          { text: '三分钟学会 React Router ', link: '/pages/quickStart/reactRouter/' },
          { text: '三分钟学会 Chakra-UI ', link: '/pages/quickStart/chakra/' },
          { text: '三分钟学会 tailwind Css ', link: '/pages/quickStart/tailwind/' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zuoFeng59556/my-blog' },
    ],
    // sidebar: {
    //   '/open-layers/': OpenLayers,
    //   '/leaflet/': LeafLet,
    // },
    lastUpdatedText: '最近更新时间',

  },

}