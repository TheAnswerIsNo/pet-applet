
import { useEffect, useState } from 'react'
import './index.scss'
import {
  Card,
  Tabs,
  Tag,
} from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import { petType } from 'src/constant/petType'
import { petList } from 'src/services/adopt'


export default function Index() {
  const [tabvalue, setTabvalue] = useState<string | number>('0')
  const [list, setList] = useState<Array<any>>([])

  const openDetail = (item: any) => {
    // 使用 JSON.stringify 将对象转为字符串
    const params = encodeURIComponent(JSON.stringify(item));
    Taro.navigateTo({
      url: `/pages/detail/index?item=${params}`
    })
  }

  async function getPetList(type: string) {
    const res = await petList(type)
    if (res.code === 200) {
      setList(res.data)
    }
  }

  useEffect(() => {
    getPetList(petType[tabvalue].value)
  }, [])


  return (
    <div className="index">
      <Tabs
        value={tabvalue}
        onChange={(value) => {
          setTabvalue(value)
          getPetList(petType[value].value)
        }}
      >
        {petType.map((item: any) => {
          return <Tabs.TabPane title={item.label}> {
            list.map(val => {
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
            })
          } </Tabs.TabPane>
        })}
      </Tabs>
    </div>
  )
}
