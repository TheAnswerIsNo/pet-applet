import { Button, Dialog, Divider, Form, Input, Toast } from "@nutui/nutui-react-taro"
import Taro, { useRouter } from "@tarojs/taro"
import { useEffect, useState } from "react"
import { deleteAddresstAPI, getAddressListAPI, saveAddressAPI } from "src/services/address"

export default () => {
    const [addressList, setAddressList] = useState([])
    const router: any = useRouter();
    const [form] = Form.useForm()
    const [editForm] = Form.useForm()
    const [showToast, setShowToast] = useState(false)
    const [title, setTitle] = useState('')

    const openDialog = () => {
        Dialog.open('test', {
            title: '新增地址',
            content: <Form
                labelPosition="right"
                form={form}
                onFinish={saveAddress}
            >
                <Form.Item
                    label="姓名"
                    name="name"

                >
                    <Input placeholder="请输入姓名" />
                </Form.Item>
                <Form.Item
                    label="手机号"
                    name="phone"
                >
                    <Input placeholder="请输入手机号" />
                </Form.Item>
                <Form.Item
                    label="地址"
                    name="info"
                >
                    <Input placeholder="请输入地址" />
                </Form.Item>
                <Form.Item
                    label="房间号"
                    name="houseNumber"
                >
                    <Input placeholder="请输入房间号" />
                </Form.Item>
            </Form>,
            onConfirm: () => {
                form.submit()
            },
            onCancel: () => {
                Dialog.close('test')
            },
        })
    }

    const editDialog = (value: any) => {
        editForm.setFieldsValue(value)
        Dialog.open('edit', {
            title: '修改地址',
            content: <>
                <Form
                    labelPosition="right"
                    form={editForm}
                    onFinish={saveAddress}
                >
                    <Form.Item
                        label="id"
                        name="id"
                        style={{ display: 'none' }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="姓名"
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                        name="phone"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="info"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="房间号"
                        name="houseNumber"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </>,
            onConfirm: () => {
                editForm.submit()
            },
            onCancel: () => {
                Dialog.close('edit')
            },
        })
    }

    const selectAddress = (data: any) => {
        Taro.setStorageSync('address', data)
        if (router.params.type && router.params.type === 'change') Taro.navigateBack()
    }

    useEffect(() => {
        getAddressList()
    }, [])

    const getAddressList = async () => {
        const res = await getAddressListAPI()
        console.log(res)
        if (res.code === 200) setAddressList(res.data)
    }


    const saveAddress = async (value: any) => {
        const res = await saveAddressAPI(value)
        if (res.code === 200) {
            setTitle('保存地址成功')
            setShowToast(true)
            Dialog.close('test')
            Dialog.close('edit')
            getAddressList()
        }
    }

    const deleteAddress = async (id: number) => {
        const res = await deleteAddresstAPI(id)
        if (res.code === 200) {
            setTitle('删除地址成功')
            setShowToast(true)
        }
    }

    return (
        <>
            {addressList.map((item: any) => {
                return <div style={{ margin: '16px' }} onClick={() => selectAddress(item)}>
                    <div style={{ display: 'flex', margin: '24px 0', justifyContent: 'space-around', alignItems: 'center' }}>
                        <text>{item.name}</text>
                        <text >{item.phone}</text>
                        <Button type="warning" onClick={(e) => {
                            e.stopPropagation()
                            editDialog(item)
                        }}>修改</Button>
                    </div>
                    <div style={{ display: 'flex', margin: '24px 0', justifyContent: 'space-around', alignItems: 'center' }}>
                        <text >{item.info}</text>
                        <text>{item.houseNumber}</text>
                        <Button type="primary" onClick={(e: any) => {
                            e.stopPropagation()
                            deleteAddress(item.id)
                        }}>删除</Button>
                    </div>
                    <Divider />
                </div>
            })}
            <div style={{ width: '100%', position: 'fixed', bottom: '12px', display: 'flex', justifyContent: 'center' }}>
                <Button type="success" onClick={openDialog}>
                    新增地址
                </Button>
            </div>
            <Dialog id="test" />
            <Dialog id="edit" />
            <Toast
                duration={1}
                title={title}
                visible={showToast}
            />
        </>
    )
}