import { useLoad } from '@tarojs/taro'
import './index.scss'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { wecahtLogin } from '../../services/user/api'
import { View } from '@tarojs/components'
import { Button } from '@nutui/nutui-react-taro'

export default function Index() {
  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)

  const getphonenumber = (phoneRes: any) => {
    setLoading(true)
    submit(phoneRes)
  }

  const handleAgreePrivacyAuthorization = () => {
    setShow(false)
  }

  const reject = () => {
    getPrivacySetting()
  }

  const getPrivacySetting = () => {
    Taro.getPrivacySetting({
      success: (res) => {
        console.log(res) // 返回结果为: res = { needAuthorization: true/false, privacyContractName: '《xxx隐私保护指引》', errMsg: "getPrivacySetting:ok" }
        if (res.needAuthorization) {
          // 需要弹出隐私协议
          setShow(true)
        } else {
          // 用户已经同意过隐私协议，所以不需要再弹出隐私协议，也能调用已声明过的隐私接口
          setShow(false)
        }
      },
    })

  }
  useLoad(() => {
    getPrivacySetting()
  })

  const submit = (phoneRes: any) => {
    if (phoneRes.detail.errMsg!.includes('ok')) {
      const phoneCode = phoneRes.detail.code
      // 微信登录
      Taro.login({
        success: async function (wechatLoginRes) {
          if (wechatLoginRes.code) {
            const res = await wecahtLogin({ code: wechatLoginRes.code, phoneCode: phoneCode })
            console.log(res);
            if (res.code === 200) {
              setLoading(false)
              Taro.redirectTo({ url: '/pages/index/index' })
              Taro.showToast({ title: res.msg || '', icon: 'success' })
            } else {
              Taro.showToast({ title: res.msg || '', icon: 'error' })
            }
          } else {
            Taro.showToast({ title: "获取微信code失败！", icon: 'error' })
          }
        }
      })
    }
  }

  return (
    <View>
      <Button
        openType={'getPhoneNumber' || 'agreePrivacyAuthorization'}
        onGetPhoneNumber={getphonenumber || handleAgreePrivacyAuthorization}
        loading={loading}>
        手机号登录
      </Button>
    </View >

  )
}
