import { getData, postData } from "src/utils/request"

// 获取动态列表
export const getDynamicList = async (type: number) => {
  return await getData(`/dynamic/list`, { type: type })
}


// 删除动态
export const removeDynamic = async (id: string) => {
  return await getData(`/dynamic/delete`, { id: id })
}

// 点赞
export const like = async (id: string) => {
  return await postData(`/dynamic/like/${id}`)
}


