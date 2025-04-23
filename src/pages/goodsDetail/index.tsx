import { Image, Text } from "@tarojs/components";
import { Button, Dialog, Swiper, Input, Form, InputNumber, Toast } from '@nutui/nutui-react-taro'
import { pxTransform, useRouter } from "@tarojs/taro";
import { useState } from "react";
import { addToCartAPI } from "src/services/home";

const goodsDetail = () => {
    const router: any = useRouter();
    const data = JSON.parse(decodeURIComponent(router.params.data))
    const [form] = Form.useForm()
    const [current, setCurrent] = useState(0)

    const [showToast, setShowToast] = useState(false)


    const openDialog = () => {
        Dialog.open('test', {
            title: '加入购物车',
            content: <Form
                labelPosition="right"
                form={form}
                onFinish={addToCart}
            >
                <Form.Item
                    label="数量"
                    name="number"
                >
                    <InputNumber />
                </Form.Item>
            </Form>,
            onConfirm: () => {
                form.submit()
                Dialog.close('test')
            },
            onCancel: () => {
                Dialog.close('test')
            },
        })
    }

    const addToCart = async (val: { number: number }) => {
        const res = await addToCartAPI({
            goodsId: data.id,
            name: data.name,
            number: val.number || 1,
            price: data.price
        })
        if (res.code === 200) {
            setShowToast(true)
            setShowToast(true)
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
            {data.photos.map((item) => (
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
            <Button type="success" onClick={openDialog}>
                加入购物车
            </Button>
        </div>
        <Dialog id="test" />
        <Toast
            duration={1}
            title={'加入购物车成功'}
            visible={showToast}
        />
    </div>
}

export default goodsDetail