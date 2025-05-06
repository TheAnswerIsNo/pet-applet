import { useEffect, useState } from 'react'
import './index.scss'
import {
  Card,
  Tag,
} from '@nutui/nutui-react-taro'
import Taro, { useDidShow } from '@tarojs/taro'
import { petList } from 'src/services/adopt'
import { petType } from 'src/constant/petType'


export default function Index() {
  const [list, setList] = useState<Array<any>>([])

  const openDetail = (item: any) => {
    // 使用 JSON.stringify 将对象转为字符串
    item.self = true;
    const params = encodeURIComponent(JSON.stringify(item));
    Taro.navigateTo({
      url: `/pages/applyAdoptDetail/index?item=${params}`
    })
  }

  async function getPetList() {
    const res = await petList('', 1)
    if (res.code === 200) {
      setList(res.data)
    }
  }

  useDidShow(() => {
    console.log(111111);
    getPetList()
  })

  useEffect(() => {
    getPetList()
  }, [])

  return (
    <div className="index">
      {list.map(val => {
        return <Card
          onClick={() => openDetail(val)}
          src={val.photos[0]}
          title={val.nickname}
          tag={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Tag type='success' style={{ margin: '3px' }}>年龄: {val.age}</Tag>
              <Tag type='warning' style={{ margin: '3px' }}>性别: {val.sex}</Tag>
              <Tag type='info' style={{ margin: '3px' }}>类型: {petType[val.type].label}</Tag>
            </div>
          }
        />
      })}
    </div >
  )
}
