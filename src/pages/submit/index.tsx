import { Button, Card, Dialog, Divider, Tabs, Toast } from "@nutui/nutui-react-taro";
import { useRouter } from "@tarojs/taro";
import { useState } from "react";
import { paymentAPI } from "src/services/order";

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
            },
        })
    }

    const payment = async () => {
        const res = await paymentAPI(orderId)
        if (res.code === 200) {
            setTitle('付款成功')
            setShowToast(true)
            Dialog.close('pay')
        }
        else {
            setTitle('付款失败')
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
                <Button type="success" onClick={submit}>
                    付款
                </Button>
            </div>
            <Dialog id="pay" />
            <Toast
                duration={1}
                title={title}
                visible={showToast}
            />
        </>


    )
}