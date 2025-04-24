import { Button, Card, Dialog, Divider, Tabs, Toast } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import { useRouter } from "@tarojs/taro";
import { useState } from "react";
import { cancelAPI, paymentAPI } from "src/services/order";

export default () => {
    const router: any = useRouter();
    const data = JSON.parse(decodeURIComponent(router.params.data))
    const orderId = router.params.orderId
    const [showToast, setShowToast] = useState(false)
    const [title, setTitle] = useState('')
    const submit = () => {
        Dialog.open('pay', {
            title: '付款',
            content: `总价${data.totalPrice}元,是否确认付款?`,
            onConfirm: () => {
                payment()
            },
            onCancel: () => {
                Dialog.close('pay')
                cancel()
            },
        })
    }

    const payment = async () => {
        const res = await paymentAPI(orderId)
        if (res.code === 200) {
            setTitle('付款成功')
            setShowToast(true)
            Dialog.close('pay')
            Taro.reLaunch({
                url: '/pages/orderList/index?status=1'
            })
        }
        else {
            setTitle('付款失败')
            setShowToast(true)
        }
    }

    const openCancelDialog = async () => {
        Dialog.open('cancel', {
            title: '取消订单',
            content: `是否确认取消订单?`,
            onConfirm: () => {
                cancelOrder()
            },
            onCancel: () => {
                Dialog.close('cancel')
            },
        })
    }

    const cancel = async () => {
        Taro.reLaunch({
            url: '/pages/orderList/index?status=0'
        })
    }

    const cancelOrder = async () => {
        const res = await cancelAPI(orderId)
        if (res.code === 200) {
            Taro.reLaunch({
                url: '/pages/orderList/index?status=4'
            })
        }
        else {
            setTitle('取消订单失败')
            setShowToast(true)
        }
    }


    return (
        <>
            {
                data.list.map((val: any) => {
                    return <Card
                        style={{ margin: '16px' }}
                        src={val.photos[0]}
                        title={val.name}
                        price={val.price}
                        tag={<div>数量: {val.number} {val.description} </div>}
                    />
                })
            }
            <div style={{ width: '100%', background: '#f7f8f8', position: 'fixed', bottom: '0', height: '60px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <text> 总数量: <text style={{ color: 'red' }}>{data.totalNumber}</text></text><text> 总价: <text style={{ color: 'red' }}>￥{data.totalPrice}</text></text>
                <Button type="success" onClick={openCancelDialog}>
                    取消订单
                </Button>
                <Button type="success" onClick={submit}>
                    付款
                </Button>
            </div>
            <Dialog id="pay" />
            <Dialog id="cancel" />
            <Toast
                duration={1}
                title={title}
                visible={showToast}
            />
        </>


    )
}