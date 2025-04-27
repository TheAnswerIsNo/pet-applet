
import { useEffect, useState } from 'react'
import './index.scss'
import {
  Button,
  Dialog,
  Form,
  Input,
  VirtualList,
} from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import { getPetMedicalRecordsList, removePetMedicalRecords, savePetMedicalRecords } from 'src/services/petMedicalRecords'
import { View } from '@tarojs/components'

export default function Index() {
  const [list, setList] = useState<[any]>([{}])
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)

  const getData = async () => {
    const res = await getPetMedicalRecordsList()
    if (res.code === 200) {
      setList(res.data)
    }
  }

  const submit = async (value: any) => {
    const res = await savePetMedicalRecords(value)
    if (res.code === 200) {
      Taro.showToast({
        title: "添加成功",
        icon: 'success',
        duration: 2000
      })
      getData()
      Dialog.close('petMedicalRecords')
    }
  }

  const openDialog = () => {
    Dialog.open('petMedicalRecords', {
      title: '添加宠物医疗记录',
      content: <Form form={form} onFinish={submit}>
        <Form.Item
          label="地址"
          name="address"
        >
          <Input placeholder="请输入地址" />
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
        >
          <Input placeholder="请输入描述" />
        </Form.Item>
      </Form>,
      onConfirm: () => {
        form.submit()
      },
      onCancel: () => {
        Dialog.close('petMedicalRecords')
      },
    })
  }

  const deletePetMedicalRecords = async (id: string) => {
    const res = await removePetMedicalRecords(id)
    if (res.code === 200) {
      Taro.showToast({
        title: "删除成功",
        icon: 'success',
        duration: 2000
      })
      getData()
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <View>
        <Button type="info" onClick={openDialog} style={{ margin: '3px' }}>
          添加宠物医疗记录
        </Button>
        <Button type="info" onClick={() => { setVisible(true) }} style={{ margin: '3px' }}>
          医疗服务热线
        </Button>
      </View>
      <Dialog id="petMedicalRecords" />
      <Dialog
        content='联系电话: 18859825783'
        visible={visible}
        footer={null}
        onClose={() => {
          setVisible(false)
        }}
      />
      <VirtualList
        overscan={10}
        itemEqual={false}
        list={list}
        itemRender={(data: any) => {
          return <div style={{ margin: '8px' }}>
            <View style={{ margin: '8px' }}>
              地址：{data.address}
            </View>
            <View style={{ margin: '8px' }}>
              描述：{data.description}
            </View>
            <Button onClick={() => deletePetMedicalRecords(data.id)} type='info'>
              删除
            </Button>
          </div>
        }}
      />
    </div>

  )

}
