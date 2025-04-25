import { useEffect, useState } from 'react'
import './index.scss'
import {
  Card,
  Tag,
} from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import { petList } from 'src/services/adopt'


export default function Index() {
  const [list, setList] = useState<Array<any>>([])

  const openDetail = (item: any) => {
    // 使用 JSON.stringify 将对象转为字符串
    const params = encodeURIComponent(JSON.stringify(item));
    Taro.navigateTo({
      url: `/pages/detail/index?item=${params}`
    })
  }

  async function getPetList() {
    const res = await petList('', 1)
    if (res.code === 200) {
      setList(res.data)
    }
  }

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
            <div>
              <Tag>{val.age}</Tag>
              <Tag>{val.sex}</Tag>
              <Tag>{val.type}</Tag>
            </div>
          }
        />
      })}
    </div >
  )
}
