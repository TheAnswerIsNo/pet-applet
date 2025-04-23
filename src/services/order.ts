
import {postData } from "../utils/request";




//提交订单
export const submitOrderAPI = async (data: any) => {
    return await postData(`/order/submit`, data)
}

//付款
export const paymentAPI = async (orderId: any) => {
    return await postData(`/order/pay/${orderId}`)
}