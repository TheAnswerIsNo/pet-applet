
import { getData, postData } from "../utils/request";

//订单列表
export const orderListAPI = async (status: number | null) => {
    if (status !== null)
        return await getData(`/order/list?page=-1&status=${status}`)
    return await getData(`/order/list`)
}


//提交订单
export const submitOrderAPI = async (data: any) => {
    return await postData(`/order/submit`, data)
}

//付款
export const paymentAPI = async (orderId: any) => {
    return await postData(`/order/pay/${orderId}`)
}

//取消订单
export const cancelAPI = async (orderId: any) => {
    return await postData(`/order/cancel/${orderId}`)
}