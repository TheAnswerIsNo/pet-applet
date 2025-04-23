import { Image, Text } from "@tarojs/components";
import { Button, Dialog, Swiper, Input, Form, InputNumber, Toast } from '@nutui/nutui-react-taro'
import { pxTransform, useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";

const goodsDetail = () => {
  const [item, setItem] = useState<any>({})
  const router: any = useRouter();
  const data = JSON.parse(decodeURIComponent(router.params.data))
  const [current, setCurrent] = useState(0)

  const openApplyAdopt = () => {
    Taro.navigateTo({
      url: '/pages/applyAdopt/index'
    })
  }

  useEffect(() => {
    Taro.getCurrentInstance().router?.params?.item && handleGetParams()
  }, [])

  const handleGetParams = () => {
    const params = Taro.getCurrentInstance().router?.params?.item
    if (params) {
      // 解码并解析为对象
      const decodedParams = decodeURIComponent(params)
      const parsedItem = JSON.parse(decodedParams)
      setItem(parsedItem)
    }
  }

  return <div >
    <Swiper
      onChange={(e) => {
        setCurrent(e.detail.current)
      }}
      defaultValue={0}
      indicator={
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '85%',
            top: pxTransform(120),
            width: pxTransform(46),
            height: pxTransform(22),
            backgroundColor: 'rgba(0, 0, 0, 0.33)',
            borderRadius: pxTransform(22),
            textAlign: 'center',
            fontSize: pxTransform(14),
            zIndex: 1,
          }}
        >
          <Text style={{ color: '#fff' }}>
            {current + 1}/{data.photos.length}
          </Text>
        </div>
      }
    >
      {data.photos.map((item: any) => (
        <Swiper.Item key={item}>
          <Image style={{ width: '100%', height: '100%' }} src={item} />
        </Swiper.Item>
      ))}
    </Swiper>
    <div style={{ padding: '32px' }}>
      <div style={{ width: '100%', textAlign: 'left', margin: '12px 0' }}><text>名称: </text><text style={{ fontSize: '35px', fontWeight: '400' }}>{data.name}</text></div>
      <div style={{ width: '100%', textAlign: 'left', margin: '12px 0' }}>售价: <text style={{ color: 'red' }}>￥{data.price}</text></div>
      <div style={{ width: '100%', textAlign: 'left', margin: '12px 0' }}> 描述: {data.description}</div>
    </div>
    <div style={{ width: '100%', position: 'fixed', bottom: '12px', display: 'flex', justifyContent: 'center' }}>
      <Button type="success" onClick={openApplyAdopt}>
        申请领养
      </Button>
    </div>
  </div>
}

export default goodsDetail
