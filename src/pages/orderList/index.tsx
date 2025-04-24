

import { Tabs, Tag } from '@nutui/nutui-react-taro'
import Taro, { useRouter } from '@tarojs/taro'
import { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import { orderListAPI } from 'src/services/order'


export default function Index() {
    const status: any = useRouter().params.status
    const [tabvalue, setTabvalue] = useState<any>(status !== undefined ? (parseInt(status) + 1).toString() : '0')
    console.log(tabvalue)
    const [list, setList] = useState<Array<any>>([])
    const map = new Map([
        [0, '去付款'],
        [1, '送货中'],
        [2, '已送达'],
        [3, '已完成'],
        [4, '已取消'],
    ])
    const tableList = [
        {
            label: '全部订单',
            key: null,
            value: 'QBDD'
        },
        {
            label: '未付款',
            key: 0,
            value: 'WFK'
        }, {
            label: '送货中',
            key: 1,
            value: 'SFZ'
        }, {
            label: '已送达',
            key: 2,
            value: 'YSD'
        }, {
            label: '已完成',
            key: 3,
            value: 'YWC'
        }, {
            label: '取消订单',
            key: 4,
            value: 'DDQX'
        }
    ]


    const orderList = async (status: number | null) => {
        const res = await orderListAPI(status)
        if (res.code === 200) {
            setList(res.data.list)
        }
    }

    const deal = (data: any) => {
        if (data.status === 0) {
            Taro.navigateTo({
                url: '/pages/submit/index?data=' + encodeURIComponent(JSON.stringify(Object.assign(data, { list: data.orderListDetailList }))) + "&orderId=" + data.id,
            })
        }
    }

    useDidShow(() => {
        if (status !== undefined) {
            orderList(status)
        }
        else {
            orderList(null)
        }
    })

    return (
        <div className="index">
            <Tabs
                value={tabvalue}
                onChange={(value) => {
                    const index = value as number - 1
                    setTabvalue(value)
                    orderList(index > -1 ? index : null)
                }}
            >
                {tableList.map((item: any) => {
                    return <Tabs.TabPane title={item.label}> {
                        list.map(val => {
                            return <div style={{ borderRadius: '20px', background: '#f7f8f8', padding: '1px', marginBottom: '15px' }}>
                                {val.orderListDetailList.map((detail: any) => {
                                    return <div style={{ display: 'flex', justifyContent: 'space-around', margin: '12px', borderRadius: '20px', background: '#e6f3f2', whiteSpace: 'nowrap', padding: '12px' }}>
                                        <text>宠物名：{detail.name}</text>
                                        <text>数量：{detail.number}</text>
                                        <text>价格：<text style={{ color: 'red' }}>￥{detail.price}</text></text>
                                    </div>
                                })}
                                <div style={{ display: 'flex', justifyContent: 'space-around', margin: '12px' }}>
                                    <text>总数量：{val.totalNumber}</text>
                                    <text>总价格：<text style={{ color: 'red' }}>￥{val.totalPrice}</text></text>
                                    <Tag onClick={() => deal(val)} type="primary">{map.get(val.status)}</Tag>
                                </div>
                            </div>
                        })
                    } </Tabs.TabPane>
                })}
            </Tabs>
        </div>
    )
}
