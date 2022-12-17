export default {
  title: 'VitePress',
  description: 'Just playing around.',
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
      { text: '联系我', link: '/guide' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zuoFeng59556' },
    ],
    // sidebar: {
    //   '/open-layers/': OpenLayers,
    //   '/leaflet/': LeafLet,
    // },
    lastUpdatedText: '最近更新时间',

  },
}