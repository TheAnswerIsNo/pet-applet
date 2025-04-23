import { Button, Card, Dialog, Tabs } from "@nutui/nutui-react-taro";
import { useRouter } from "@tarojs/taro";

export default () => {
    const router: any = useRouter();
    const data = JSON.parse(decodeURIComponent(router.params.data))

    const submit = () => {
        Dialog.open('pay', {
            title: '付款',
            content: `总价${data.totalNumber}元,是否确认付款?`,
            onConfirm: () => {
                Dialog.close('pay')
            },
            onCancel: () => {
                Dialog.close('pay')
            },
        })
    }
    return (
        <>
            {data.list.map((val: any) => {
                return <Card
                    src={val.photos[0]}
                    title={val.name}
                    price={val.price}
                    delivery={'厂商配送'}
                    tag={<div> {val.description} </div>}
                />
            })}
            <div style={{ width: '100%', background: '#f7f8f8', position: 'fixed', bottom: '0', height: '60px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <Button type="success" onClick={submit}>
                    提交订单
                </Button>
            </div>
            <Dialog id="pay" /></>
    )
}