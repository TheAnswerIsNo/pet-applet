import { useLoad } from '@tarojs/taro'
import './index.scss'
import Taro from '@tarojs/taro'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })


  const addressManage = () => {
    Taro.navigateTo({
      url: '/pages/address/index',
    })
  }

  return (
    <div className="index">
      <div onClick={addressManage}>
        地址管理
      </div>

    </div>
  )
}
