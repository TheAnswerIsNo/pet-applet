
import { useState } from 'react'
import './index.scss'
import {
  Card,
  Tabs,
} from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'


export default function Index() {
  const [list, setList] = useState<Array<any>>([])

  const openDetail = (item: any) => {
    // 使用 JSON.stringify 将对象转为字符串
    const params = encodeURIComponent(JSON.stringify(item));
    Taro.navigateTo({
      url: `/pages/detail/index?item=${params}`
    })
  }


  return (
    <Tabs> {
      list.map(val => {
        return <Card
          onClick={() => openDetail(val)}
          src={val.photos[0]}
          title={val.name}
          price={val.price}
          delivery={'厂商配送'}
          tag={<div> {val.description} </div>}
        />
      })
    } </Tabs>
  )
}
