import { getData, postData, postFormData } from "src/utils/request";

/**
 * 发布宠物信息
 */
export async function giveUpAdopt(data: any) {
  const res = await postFormData('/adopt/give-up', data)
  return res;
}

/**
 * 申请领养
 */
export async function applyAdopt(data: any) {
  const res = await postData('/adopt/apply', data)
  return res;
}

/**
 * 删除已发布宠物信息
 */
export async function deleteAdopt(id: string) {
  const res = await getData('/adopt/give-up/delete', { id: id })
  return res;
}

/**
 * 申请领养
 */
export async function petList(type: string, self: number) {
  const res = await getData('/adopt/list', { type: type, self: self })
  return res;
}

