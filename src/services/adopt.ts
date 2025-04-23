import { postData, postFormData } from "src/utils/request";

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
export async function appluAdopt(data: any) {
  const res = await postFormData('/adopt/apply', data)
  return res;
}
