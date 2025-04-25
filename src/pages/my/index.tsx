import { useLoad } from '@tarojs/taro'
import './index.scss'
import Taro from '@tarojs/taro'
import { Avatar, Cell } from '@nutui/nutui-react-taro'

export default function Index() {

  const user = Taro.getStorageSync('user')
  useLoad(() => {
    console.log('Page loaded.')
  })


  const addressManage = () => {
    Taro.navigateTo({
      url: '/pages/address/index',
    })
  }

  const myDynamicManage = () => {
    Taro.navigateTo({
      url: '/pages/myDynamic/index',
    })
  }

  const myGiveUpAdopt = () => {
    Taro.navigateTo({
      url: '/pages/myGiveUpAdopt/index',
    })
  }

  const orderListManage = () => {
    Taro.navigateTo({
      url: '/pages/orderList/index',
    })
  }

  return (
    <div className="index">
      <div style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
        <Avatar color="rgb(245, 106, 0)" style={{ background: 'rgb(253, 227, 207)' }}>U</Avatar>
        <text style={{ marginLeft: '12px' }}>{user.nickname || '游客'}</text>
      </div>
      <div>
        <Cell title="地址管理" onClick={addressManage} />
        <Cell title="订单管理" onClick={orderListManage} />
        <Cell title="我的领养" onClick={addressManage} />
        <Cell title="我的送养" onClick={myGiveUpAdopt} />
        <Cell title="我的动态" onClick={myDynamicManage} />
      </div>

    </div>
  )
}
