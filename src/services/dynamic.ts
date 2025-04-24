import { getData, postData } from "src/utils/request"

// 获取动态列表
export const getDynamicList = async (type: number) => {
  return await getData(`/dynamic/list`, { type: type })
}

