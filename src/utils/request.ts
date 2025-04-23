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

const getTokenInterceptor = function (chain: Chain) {
  const requestParams = chain.requestParams
  return chain.proceed(requestParams)
    .then((res: { header: { [key: string]: any } }) => {
      // 从响应头中获取 token
      if (res.header && res.header['authorization']) {
        const token = res.header['authorization'];
        Taro.setStorageSync('token', token);
      }
    });
}

function getHost(url: string) {
  const host = "http://localhost:8081" + url
  return host;
}

export const getData = async (url: string, params?: object): Promise<ResponseDataType> => {
  const host = getHost(url)
  Taro.addInterceptor(addTokenInterceptor)
  const result = await Taro.request({
    method: 'GET',
    url: host,
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
  Taro.addInterceptor(addTokenInterceptor)
  const result = await Taro.request({
    method: 'POST',
    url: host,
    data: data,
    header: {
      'content-type': 'application/json'
    },
    fail: function (res) {
      Taro.showToast({ title: res.errMsg, icon: 'error' })
    }
  })
  Taro.addInterceptor(getTokenInterceptor)
  return new ResponseDataType(
    result.data.code || 0,
    result.data.message || '',
    result.data.data || null
  );
}

export const postFormData = async (url: string, data?: object): Promise<ResponseDataType> => {
  const host = getHost(url)
  Taro.addInterceptor(addTokenInterceptor)
  const result = await Taro.request({
    method: 'POST',
    url: host,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
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
