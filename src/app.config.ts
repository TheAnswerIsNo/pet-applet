export default defineAppConfig({
  entryPagePath: 'pages/index/index',
  pages: [
    'pages/login/index',
    'pages/index/index',
    'pages/goodsDetail/index',
    'pages/address/index',
    'pages/submit/index',
    'pages/orderList/index',
    'pages/cancelOrder/index',
    'pages/payment/index',
    'pages/my/index',
    'pages/map/index',
    'pages/cart/index',
    'pages/adopt/index',
    'pages/giveUpAdopt/index',
    'pages/applyAdoptList/index',
    'pages/applyAdoptDetail/index',
    'pages/adoptForm/index',
    'pages/dynamic/index',
    'pages/myDynamic/index',
    'pages/myGiveUpAdopt/index',
    "pages/petMedicalRecords/index"
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  "lazyCodeLoading": "requiredComponents",
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
      pagePath: 'pages/dynamic/index',
      text: '动态'
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
  },
  requiredPrivateInfos: [
    "getLocation",
    "chooseLocation"
  ],
  permission: {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示"
    }
  }
})
