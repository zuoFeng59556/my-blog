export default {
  title: 'VitePress',
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
          { text: '原型 原型链', link: '/pages/JavaScript/prototype/' },
          { text: 'Promise async  await', link: '/pages/JavaScript/promise/' },
          { text: '事件循环 异步', link: '/pages/JavaScript/eventloop/' },
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