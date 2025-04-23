
import { getData, postData } from "../utils/request";

//获取地址列表
export const getAddressListAPI = async () => {
    return await getData(`/address/list`)
}


//删除地址
export const deleteAddresstAPI = async (id: number) => {
    return await postData(`/address/delete?id=${id}`)
}

//保存地址
export const saveAddressAPI = async (data: any) => {
    return await postData(`/address/save`, data)
}