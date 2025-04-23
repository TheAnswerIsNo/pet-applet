import './index.scss'
import { Tabs, Card } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { getGoodsCategoryListAPI, getShopListAPI } from 'src/services/home'

export default function Index() {
  const [tabvalue, setTabvalue] = useState<string | number>('0')
  const [tabList, setTabList] = useState<Array<any>>([])
  const [list, setList] = useState<Array<any>>([])

  //标签分类
  const getTabList = async () => {
    const res = await getGoodsCategoryListAPI()
    if (res.code === 200) {
      setTabList(res.data)
      getShopList(res.data[tabvalue].id)
    }
  }
  //分类列表
  const getShopList = async (id: number) => {
    const res = await getShopListAPI(id)
    if (res.code === 200) setList(res.data.list)
  }

  const changeToGoodsDetail = (item: any) => {
    Taro.navigateTo({
      url: '/pages/goodsDetail/index?data=' + encodeURIComponent(JSON.stringify(item)),
    })
  }


  useEffect(() => {
    getTabList()
  }, [])

  return (
    <div className="index">
      <Tabs
        value={tabvalue}
        onChange={(value) => {
          setTabvalue(value)
          getShopList(tabList[value].id)
        }}
      >
        {tabList.map((item: any) => {
          return <Tabs.TabPane title={item.label}> {
            list.map(val => {
              return <Card
                onClick={() => changeToGoodsDetail(val)}
                src={val.photos[0]}
                title={val.name}
                price={val.price}
                delivery={'厂商配送'}
                tag={<div> {val.description} </div>}
              />
            })
          } </Tabs.TabPane>
        })}
      </Tabs>
    </div>
  )
}
