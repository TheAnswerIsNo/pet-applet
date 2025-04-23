import { Button, Form, Input, InputNumber, Radio, Toast } from '@nutui/nutui-react-taro'
import './index.scss'
import { View } from '@tarojs/components'
import { appluAdopt } from 'src/services/adopt'
import { useState } from 'react'
import Taro from '@tarojs/taro'


export default function Index() {
  const [showToast, setShowToast] = useState(false)
  const [title, setTitle] = useState('')


  const submit = async (values: any): Promise<void> => {
    const res = await appluAdopt(values);
    if (res.code === 200) {
      setTitle('申请成功')
      setShowToast(true)
      // 返回领养列表
      Taro.navigateBack({ delta: 2 })
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
            <Button nativeType="submit" type="primary">
              提交
            </Button>
            <Button nativeType="reset" style={{ marginLeft: '20px' }}>
              重置
            </Button>
          </View>
        }
        onFinish={(values) => submit(values)}>
        <Form.Item label="性别" name="sex" required>
          <Radio.Group>
            <Radio value="女神">女神</Radio>
            <Radio value="男神">男神</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="年龄" name="age" required>
          <InputNumber defaultValue={0} />
        </Form.Item>
        <Form.Item label="养宠经验" name="experience" required>
          <Radio.Group>
            <Radio value="有">有</Radio>
            <Radio value="无">无</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="婚姻状况" name="marriage" required>
          <Radio.Group>
            <Radio value="单身">单身</Radio>
            <Radio value="恋爱中">恋爱中</Radio>
            <Radio value="已婚">已婚</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="住房情况" name="housing" required>
          <Radio.Group>
            <Radio value="自有住房">自有住房</Radio>
            <Radio value="整租">整租</Radio>
            <Radio value="合租">合租</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="职业" name="job" required>
          <Input placeholder="请输入职业" />
        </Form.Item>
        <Form.Item label="地址" name="address" required>
          <Input placeholder="请输入地址" />
        </Form.Item>
        <Form.Item label="手机号" name="phone" required>
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item label="给送养人的话" name="words" required>
          <Input placeholder="请输入给送养人的话" />
        </Form.Item>
      </Form>
      <Toast
        duration={1} // 提示时间
        title={title}  //提示语
        visible={showToast}
      />

    </>
  )
}
