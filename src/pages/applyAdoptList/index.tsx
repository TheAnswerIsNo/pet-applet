import { useEffect, useState } from 'react'
import './index.scss'
import {
  Button,
  Card,
  Row,
  SearchBar,
  Tabs,
  Tag,
  Toast,
} from '@nutui/nutui-react-taro'
import Taro, { useDidShow } from '@tarojs/taro'
import { petType } from 'src/constant/petType'
import { petList } from 'src/services/adopt'


export default function Index() {
  const [tabvalue, setTabvalue] = useState<string | number>('0')
  const [list, setList] = useState<Array<any>>([])
  const [similarList, setSimilarList] = useState<Array<string>>([])
  const [showToast, setShowToast] = useState(false)

  const openDetail = (item: any) => {
    // 使用 JSON.stringify 将对象转为字符串a
    item.self = false;
    const params = encodeURIComponent(JSON.stringify(item));
    Taro.navigateTo({
      url: `/pages/applyAdoptDetail/index?item=${params}`
    })
  }
  const changemap = () => {
    Taro.navigateTo({
      url: '/pages/map/index',
    })
  }

  async function getPetList(type: string) {
    const res = await petList(type, 0)
    if (res.code === 200) {
      setList(res.data)
    }
  }

  useEffect(() => {
    getPetList(petType[tabvalue].value)
  }, [tabvalue])


  const handleSearch = (value: string) => {
    // 比对petType中的label值 模糊匹配
    const res = petType.filter((item: any) => item.label.includes(value))
    setTabvalue(res[0].value)
  }

  const Identification = () => {
    Taro.chooseImage({
      count: 1,
      sourceType: ['album'],
      success: function (res) {
        Taro.uploadFile({
          url: 'http://localhost:8081/adopt/identification',
          header: {
            Authorization: Taro.getStorageSync('token') || ''
          },
          filePath: res.tempFilePaths[0],
          name: 'photo',
          success: function (res) {
            const result = JSON.parse(res.data)
            if (result.code === 200) {
              // 比对已经存在的options res = []
              const data = result.data;
              setSimilarList(data)
              const simList = new Array<string>;
              data.map((item: string) => {
                petType.map((pet: any) => {
                  if (item.includes(pet.label) || pet.label.includes(item)) {
                    simList.push(pet.value)
                  }
                })
              })
              setShowToast(true)
              setTabvalue(simList[0])
            }
          }
        })
      }
    })
  }


  return (
    <div className="index">
      <Row type='flex' wrap='nowrap'>
        <SearchBar shape="round" placeholder='请输入搜索的宠物类型' style={{ height: '40px' }} onChange={handleSearch} />
        <Button type='info' style={{ height: '40px', width: '60px', whiteSpace: 'nowrap' }} onClick={Identification}>
          识别
        </Button>
        <Button type='info' style={{ height: '40px', width: '60px', whiteSpace: 'nowrap' }} onClick={changemap}>
          地图
        </Button>
      </Row>
      <Tabs
        value={tabvalue}
        onChange={(value) => {
          console.log(value);

          setTabvalue(value)
          getPetList(petType[value].value)
        }}
      >
        {petType.map((item: any) => {
          return <Tabs.TabPane title={item.label} value={item.value}> {
            list.map(val => {
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
            })
          } </Tabs.TabPane>
        })}
      </Tabs>
      <Toast
        duration={2}
        title="识别结果"
        content={similarList.join(',')}
        visible={showToast}
      />
    </div >
  )
}
