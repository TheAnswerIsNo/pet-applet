export default defineAppConfig({
  entryPagePath: 'pages/index/index',
  pages: [
    'pages/login/index',
    'pages/index/index',
    'pages/my/index',
    'pages/cart/index',
    'pages/adopt/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [{
      pagePath: 'pages/index/index',
      text: '首页'
    },
    {
      pagePath: 'pages/adopt/index',
      text: '领养'
    },
    {
      pagePath: 'pages/cart/index',
      text: '购物车'
    },
    {
      pagePath: 'pages/my/index',
      text: '我的'
    },
    ]
  }
})
