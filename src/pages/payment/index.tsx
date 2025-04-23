import { Button, Card, Toast } from "@nutui/nutui-react-taro";
import Taro, { useDidShow } from "@tarojs/taro";
import { useRouter } from "@tarojs/taro";
import { useState } from "react";
import { submitOrderAPI } from "src/services/order";

export default () => {
    const router: any = useRouter();
    const [address, setAddress] = useState<any>('')
    const data = JSON.parse(decodeURIComponent(router.params.data))
    const [showToast, setShowToast] = useState(false)

    const submitOrder = async () => {
        const res = await submitOrderAPI({
            addressId: address.id,
            orderSubmitDetailList: data.list,
            cartIds: data.idList
        })
        if (res.code === 200) {
            Taro.navigateTo({
                url: '/pages/submit/index?data=' + encodeURIComponent(JSON.stringify(data)) + "&orderId=" + res.data.orderId
            })
        }
        else {
            setShowToast(true)
        }
    }

    useDidShow(() => {
        setAddress(Taro.getStorageSync('address') || '')
    })
    return (
        <>
            {address ? <div style={{ margin: '16px', padding: '1px' }} onClick={() => Taro.navigateTo({
                url: '/pages/address/index?type=change'
            })}>
                <div style={{ display: 'flex', margin: '24px 0', justifyContent: 'space-around', alignItems: 'center' }}>
                    <text>{address.name}</text>
                    <text >{address.phone}</text>
                </div>
                <div style={{ display: 'flex', margin: '24px 0', justifyContent: 'space-around', alignItems: 'center' }}>
                    <text >{address.info}</text>
                    <text>{address.houseNumber}</text>
                </div>
            </div> :

                <div onClick={() => Taro.navigateTo({
                    url: '/pages/address/index?type=change'
                })}

                    style={{
                        margin: '16px',
                        textAlign: 'center',
                        fontSize: '16px',
                        borderRadius: '20px',
                        background: '#f7f8f8',
                        height: ' 60px',
                        lineHeight: ' 60px',
                    }}
                >
                    暂无地址,请前往保存
                </div >
            }
            {data.list.map((val: any) => {
                return <Card
                    style={{ margin: '16px' }}
                    src={val.photos[0]}
                    title={val.name}
                    price={val.price}
                    tag={<div>数量: {val.number} {val.description} </div>}
                />
            })}
            <div style={{ width: '100%', background: '#f7f8f8', position: 'fixed', bottom: '0', height: '60px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <text> 总数量: <text style={{ color: 'red' }}>{data.totalNumber}</text></text><text> 总价: <text style={{ color: 'red' }}>￥{data.totalPrice}</text></text>
                <Button type="success" onClick={submitOrder}>
                    提交订单
                </Button>
            </div>
            <Toast
                duration={1}
                title={'提交订单失败'}
                visible={showToast}
            />
        </>
    )
}