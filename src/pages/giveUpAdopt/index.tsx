import { View } from '@tarojs/components'
import './index.scss'
import {
  Cell, Tag, Form, Uploader, Input, Picker, InputNumber, Radio, Checkbox, Button, FileItem,
} from '@nutui/nutui-react-taro'
import { petType } from 'src/constant/petType'
import { sexType } from 'src/constant/sexType'
import { giveUpAdopt } from 'src/services/adopt'
import Taro from '@tarojs/taro'
import { useRef, useState } from 'react'


export default function Index() {
  const uploadRef = useRef(null)
  const formData = useRef({})

  // const submitUpload = () => {
  //   uploadRef.current.submit()
  // }

  async function submit(values: any): Promise<void> {
    const res = await giveUpAdopt(values)
    if (res.code === 200) {
      Taro.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })
    }
  }



  return (
    <>
      <Form
        footer={
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Button nativeType="submit" type="primary" >
              提交
            </Button>
            <Button nativeType="reset" style={{ marginLeft: '20px' }}>
              重置
            </Button>
          </View>
        }
        onFinish={(values) => {
          const data = Object.assign(values, {
            sex: values.sex[0],
            type: values.type[0]
          })
          formData.current = data
          console.log(formData.current)
          uploadRef.current.submit()
        }}>
        <Form.Item label="照片" name='photos' required >
          <Uploader url='http://localhost:8081/adopt/give-up'
            headers={{ Authorization: Taro.getStorageSync('token') || '' }}
            name='photos' data={formData.current} ref={uploadRef} autoUpload={false} multiple={true} maxCount={6} />
        </Form.Item>
        <View>
          <Tag type="info"> 宠物信息 </Tag>
          <Form.Item label="昵称" name="nickname" required>
            <Input placeholder="请输入昵称" />
          </Form.Item>
          <Form.Item label="年龄" name="age" required initialValue={0}>
            <InputNumber defaultValue={0} />
          </Form.Item>
        </View>
        <View>
          <Tag type="info"> 宠物现状 </Tag>
          <Form.Item
            required
            label="类别"
            name="type"
            trigger="onConfirm"
            getValueFromEvent={(...args) => args[1]}
            onClick={(event, ref: any) => {
              ref.open()
            }}
          >
            <Picker options={petType}>
              {(value: any) => {
                return (
                  <Cell
                    style={{
                      padding: 0,
                    }}
                    className="nutui-cell--clickable"
                    title={
                      value.length ? petType.filter((po) => po.value === value[0])[0]?.label : 'Please select'
                    }
                    align="center"
                  />
                )
              }}
            </Picker>
          </Form.Item>
          <Form.Item
            required
            label="性别"
            name="sex"
            trigger="onConfirm"
            getValueFromEvent={(...args) => args[1]}
            onClick={(event, ref: any) => {
              ref.open()
            }}
          >
            <Picker options={sexType}>
              {(value: any) => {
                return (
                  <Cell
                    style={{
                      padding: 0,
                    }}
                    className="nutui-cell--clickable"
                    title={
                      value.length ? sexType.filter((po) => po.value === value[0])[0]?.label : 'Please select'
                    }
                    align="center"
                  />
                )
              }}
            </Picker>
          </Form.Item>
          <Form.Item label="疫苗" name="vaccine" required initialValue={"已接种"}>
            <Radio.Group >
              <Radio value="已接种">已接种</Radio>
              <Radio value="接种中">接种中</Radio>
              <Radio value="未接种">未接种</Radio>
              <Radio value="不祥">不祥</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="绝育" name="sterilization" required initialValue={"已绝育"}>
            <Radio.Group>
              <Radio value="已绝育">已绝育</Radio>
              <Radio value="未绝育">未绝育</Radio>
              <Radio value="不祥">不祥</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="驱虫" name="deworming" required initialValue={"已驱虫"}>
            <Radio.Group>
              <Radio value="已驱虫">已驱虫</Radio>
              <Radio value="未驱虫">未驱虫</Radio>
              <Radio value="不祥">不祥</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="来源" name="source" required initialValue={"个人救助"}>
            <Radio.Group>
              <Radio value="个人救助">个人救助</Radio>
              <Radio value="救助站">救助站</Radio>
              <Radio value="家养">家养</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="体型" name="bodyType" required initialValue={"大型"}>
            <Radio.Group>
              <Radio value="大型">大型</Radio>
              <Radio value="中型">中型</Radio>
              <Radio value="小型">小型</Radio>
              <Radio value="迷你">迷你</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="毛发" name="hair" required initialValue={"长毛"}>
            <Radio.Group>
              <Radio value="长毛">长毛</Radio>
              <Radio value="短毛">短毛</Radio>
              <Radio value="卷毛">卷毛</Radio>
              <Radio value="无毛">无毛</Radio>
            </Radio.Group>
          </Form.Item>
        </View>
        <Form.Item label="特点" name="characteristics" required initialValue={"调皮"}>
          <Checkbox.Group>
            <Checkbox label='调皮' value="调皮" />
            <Checkbox label='活动量大' value="活动量大" />
            <Checkbox label='聪明' value="聪明" />
            <Checkbox label='活泼' value="活泼" />
            <Checkbox label='胆小' value="胆小" />
            <Checkbox label='高冷' value="高冷" />
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="描述" name="description" required>
          <Input placeholder="描述宠物" />
        </Form.Item>

      </Form>
    </>

  )
}
