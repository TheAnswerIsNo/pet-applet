import Taro, { Chain } from "@tarojs/taro"

// 定义 responseDataType 类
export class ResponseDataType {
  constructor(
    public code?: number,
    public msg?: string,
    public data?: any
  ) { }
}

const addTokenInterceptor = function (chain: Chain) {
  const requestParams = chain.requestParams
  // 往header中添加token
  const token = Taro.getStorageSync('token')
  requestParams.header.authorization = token
  return chain.proceed(requestParams);
}

function getHost(url: string) {
  const host = "http://localhost:8081" + url
  return host;
}

export const getData = async (url: string, params?: object): Promise<ResponseDataType> => {
  const host = getHost(url)
  const result = await Taro.request({
    method: 'GET',
    url: host,
    header: {
      Authorization: Taro.getStorageSync('token') || ''
    },
    data: params,
    fail: function (res) {
      Taro.showToast({ title: res.errMsg, icon: 'error' })
    }
  })
  return new ResponseDataType(
    result.data.code || 0,
    result.data.message || '',
    result.data.data || null
  );
}

export const postData = async (url: string, data?: object): Promise<ResponseDataType> => {
  const host = getHost(url)
  const result = await Taro.request({
    method: 'POST',
    url: host,
    data: data,
    header: {
      'content-type': 'application/json',
      Authorization: Taro.getStorageSync('token') || ''
    },
    success: function (res) {
      if (url.indexOf('/login/wechat') !== -1) {
        // 从响应头中获取 token
        const token = res.header['authorization'];
        Taro.setStorageSync('token', token);
      }
    },
    fail: function (res) {
      Taro.showToast({ title: res.errMsg, icon: 'error' })
    }
  })
  return new ResponseDataType(
    result.data.code || 0,
    result.data.message || '',
    result.data.data || null
  );
}

export const postFormData = async (url: string, data?: object): Promise<ResponseDataType> => {
  const host = getHost(url)
  const result = await Taro.request({
    method: 'POST',
    url: host,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: Taro.getStorageSync('token') || ''
    },
    fail: function (res) {
      Taro.showToast({ title: res.errMsg, icon: 'error' })
    }
  })
  return new ResponseDataType(
    result.data.code || 0,
    result.data.message || '',
    result.data.data || null
  );
}
