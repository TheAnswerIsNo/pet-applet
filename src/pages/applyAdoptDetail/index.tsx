import { Image, Text } from "@tarojs/components";
import { Button, Dialog, Swiper } from '@nutui/nutui-react-taro'
import { pxTransform, useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { petType } from "src/constant/petType";
import { deleteAdopt } from "src/services/adopt";

const goodsDetail = () => {
  const [item, setItem] = useState<any>({})
  const router: any = useRouter();
  const data = JSON.parse(decodeURIComponent(router.params.item))
  const [current, setCurrent] = useState(0)

  const openApplyAdopt = () => {
    const data = {
      giveUpAdoptRecordId: item.giveUpAdoptRecordId,
      petId: item.id
    }
    const params = encodeURIComponent(JSON.stringify(data));
    Taro.navigateTo({
      url: `/pages/adoptForm/index?item=${params}`
    })
  }

  const oepnDeleteDialog = () => {
    Dialog.open('delete', {
      title: '删除提示',
      content: '删除已发布的送养信息',
      onConfirm: async () => {
        const res = await deleteAdopt(item.giveUpAdoptRecordId)
        if (res.code === 200) {
          Dialog.close('delete')
          Taro.showToast({
            title: "删除成功",
            icon: 'success',
            duration: 2000
          })
          Taro.navigateBack({
            delta: 1,
          })
        } else {
          Taro.showToast({
            title: res.data.msg,
            icon: 'error',
            duration: 2000
          })
        }
      },
      onCancel: () => {
        Dialog.close('delete')
      },
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
      <div style={{ width: '100%', textAlign: 'left', margin: '12px 0' }}>昵称: <text >{data.nickname}</text></div>
      <div style={{ width: '100%', textAlign: 'left', margin: '12px 0' }}>年龄: <text >{data.age}</text></div>
      <div style={{ width: '100%', textAlign: 'left', margin: '12px 0' }}>类别: <text >{petType[data.type].label}</text></div>
      <div style={{ width: '100%', textAlign: 'left', margin: '12px 0' }}>性别: <text >{data.sex}</text></div>
      <div style={{ width: '100%', textAlign: 'left', margin: '12px 0' }}>疫苗: <text >{data.vaccine}</text></div>
      <div style={{ width: '100%', textAlign: 'left', margin: '12px 0' }}>绝育: <text >{data.sterilization}</text></div>
      <div style={{ width: '100%', textAlign: 'left', margin: '12px 0' }}>驱虫: <text >{data.deworming}</text></div>
      <div style={{ width: '100%', textAlign: 'left', margin: '12px 0' }}>来源: <text >{data.source}</text></div>
      <div style={{ width: '100%', textAlign: 'left', margin: '12px 0' }}>体型: <text >{data.bodyType}</text></div>
      <div style={{ width: '100%', textAlign: 'left', margin: '12px 0' }}>毛发: <text >{data.hair}</text></div>
      <div style={{ width: '100%', textAlign: 'left', margin: '12px 0' }}>特点: <text >{data.characteristics}</text></div>
      <div style={{ width: '100%', textAlign: 'left', margin: '12px 0' }}>描述: <text >{data.description}</text></div>
    </div>
    <div style={{ width: '100%', position: 'fixed', bottom: '12px', display: 'flex', justifyContent: 'center' }}>
      {data.self ? (
        <Button type='primary' onClick={oepnDeleteDialog}>
          删除
        </Button>
      ) : (
        <Button type="success" onClick={openApplyAdopt}>
          申请领养
        </Button>
      )}

    </div>
    <Dialog id="delete" />
  </div >
}

export default goodsDetail
