import Taro, { useDidShow } from '@tarojs/taro'
// 全局样式
import './app.scss'

function App(props) {

  useDidShow(() => {
    const loginPath = '/pages/login/index'
    const token = Taro.getStorageSync('token')
    // 如果没有登录，重定向到 login
    if (!token && location.pathname !== loginPath) {
      Taro.redirectTo({
        url: loginPath
      })
    }

  })

  return props.children
}

export default App
