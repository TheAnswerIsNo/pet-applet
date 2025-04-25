
import { useEffect, useState } from 'react'
import './index.scss'
import {
  Button,
  Card,
  Dialog,
  Form,
  Input,
  Tag,
  Uploader,
  VirtualList,
} from '@nutui/nutui-react-taro'
import { getDynamicList, removeDynamic } from 'src/services/dynamic'
import Taro from '@tarojs/taro'

export default function Index() {
  const [list, setList] = useState<[any]>([{}])
  const [form] = Form.useForm()

  const getData = async () => {

    const res = await getDynamicList(1)
    if (res.code === 200) {
      setList(res.data)
    }
  }

  const submit = (value: any) => {
    Taro.uploadFile({
      url: 'http://localhost:8081/dynamic/add',
      filePath: value.photo[0].url,
      name: 'photo',
      header: { Authorization: Taro.getStorageSync('token') || '' },
      formData: { content: value.content },
      success: () => {
        Taro.showToast({
          title: "发布成功",
          icon: 'success',
          duration: 2000
        })
        getData();
        Dialog.close('dynamic')
      }
    })

  }

  const openDialog = () => {
    Dialog.open('dynamic', {
      title: '发布动态',
      content: <Form form={form} onFinish={submit}>
        <Form.Item
          label="内容"
          name="content"
        >
          <Input placeholder="请输入内容" />
        </Form.Item>
        <Form.Item
          label="图片"
          name="photo"
        >
          <Uploader autoUpload={false} />
        </Form.Item>
      </Form>,
      onConfirm: () => {
        form.submit()
      },
      onCancel: () => {
        Dialog.close('dynamic')
      },
    })
  }

  const deleteDynamic = async (id: string) => {
    const res = await removeDynamic(id)
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
      <Button block type="info" onClick={openDialog} style={{ margin: '3px' }}>
        发布动态
      </Button>
      <Dialog id="dynamic" />
      <VirtualList
        overscan={10}
        itemEqual={false}
        list={list}
        itemRender={(data: any) => {
          return <Card
            style={{ padding: '10px', margin: '1px', background: '#a5a5ef', borderRadius: '20px', width: '93%' }}
            src={data.photo}
            title={data.content}
            tag={<div> {data.likeNum} <Tag round type='primary' onClick={() => deleteDynamic(data.id)}>删除</Tag></div>}
          />
        }}
      />
    </div>

  )

}
