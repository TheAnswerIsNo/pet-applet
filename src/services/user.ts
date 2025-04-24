import { getData, postData } from "../utils/request";

/**
 * 获取用户信息
 */
export async function getUserInfo() {
  const res = await getData('/user/getUserInfo')
  return res;
}

/**
 * 微信登录
 */
export async function wecahtLogin(data: any) {
  const res = await postData('/login/wechat', data)
  return res;
}
