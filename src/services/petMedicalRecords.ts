import { getData, postData } from "src/utils/request"

// 获取医疗记录
export const getPetMedicalRecordsList = async () => {
  return await getData(`/petMedicalRecords/list`)
}


// 删除医疗记录
export const removePetMedicalRecords = async (id: string) => {
  return await getData(`/petMedicalRecords/delete`, { id: id })
}

// 保存
export const savePetMedicalRecords = async (data: any) => {
  return await postData(`/petMedicalRecords/save`, data)
}


