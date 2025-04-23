import { useEffect, useRef, useState } from 'react'
import { Button, Card, Cell, Checkbox, Dialog, Price, Toast } from '@nutui/nutui-react-taro'
import { deleteCartAPI, getCartAPI } from 'src/services/home'
import Taro, { useDidShow } from '@tarojs/taro'

export default function Index() {
  const [list, setList] = useState<Array<any>>([])
  const [controlledGroup, setControlledGroup] = useState<Array<any>>([])
  const [selected, setSelected] = useState(false)
  const [totalNumber, setTotalNumber] = useState(0)
  const [disabled, setDisabled] = useState(true)
  const checkboxgroup2Ref = useRef(null)
  const [showToast, setShowToast] = useState(false)

  const selectAll = () => {
    if (selected) {
      (checkboxgroup2Ref.current as any).toggle(false)
      setSelected(false)
    }
    else {
      (checkboxgroup2Ref.current as any).toggle(true)
      setSelected(true)
    }
  }

  const onChange = (value: Array<string>) => {
    setControlledGroup(value)
    getTotalNumber(value)
    if (value.length === list.length) setSelected(true)
    if (value.length === 0) setSelected(false)
  }

  const getTotalNumber = (val: Array<string>) => {
    const sum = list.reduce((prev, item) => {
      if (val.includes(item.id)) {
        return prev + item.price * item.number
      }
      return prev
    }, 0)
    sum == 0 ? setDisabled(true) : setDisabled(false)
    setTotalNumber(sum)
  }

  const payment = () => {
    const data = () => {
      const temp: any = []
      let number = 0
      list.forEach((item: any) => {
        if (controlledGroup.includes(item.id)) {
          temp.push(item)
          number += item.number
        }
      })
      return { goodsList: temp, number }
    }
    const { goodsList, number } = data()
    Taro.navigateTo({
      url: '/pages/payment/index?data=' + encodeURIComponent(JSON.stringify({
        list: goodsList,
        totalNumber: number,
        totalPrice: totalNumber
      }))
    })

  }

  const deleteGood = (id: string) => {
    deleteGoods(id)
  }

  //列表
  const getCartList = async () => {
    const res = await getCartAPI()
    if (res.code === 200) setList(res.data)
  }

  const deleteGoods = async (id: string) => {
    const res = await deleteCartAPI(id)
    if (res.code === 200) {
      setShowToast(true)
      getCartList()
    }
  }

  useDidShow(() => {
    getCartList()
  })

  return (
    <>
      <Cell className="nut-cell">
        <Checkbox.Group
          ref={checkboxgroup2Ref}
          labelPosition="left"
          value={controlledGroup}
          onChange={(value) => onChange(value)}
        >
          {list.map(val => {
            return (
              <Checkbox
                style={{ width: '150%' }}
                value={val.id}
                label={val.name}
              >
                <Card
                  key={val.id}
                  src={val.photos[0]}
                  title={val.name}
                  price={val.price}
                  delivery={'厂商配送'}
                  tag={<div> {val.description}
                  </div>}
                  extra={<div style={{ color: 'red' }} onClick={(e) => {
                    e.stopPropagation()
                    deleteGood(val.id)
                  }}>删除</div>}
                />
              </Checkbox>
            )
          })}
        </Checkbox.Group>
      </Cell>
      <div style={{ width: '100%', background: '#f7f8f8', position: 'fixed', bottom: '0', height: '60px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Button style={{ width: '100px' }} type="primary" onClick={selectAll}>
          {selected ? '取消全选' : '全选'}
        </Button>
        <text>合计: ￥{totalNumber}</text>
        <Button disabled={disabled} type="success" onClick={payment}>
          去结算
        </Button>
      </div>
      <Toast
        duration={1}
        title={'删除成功'}
        visible={showToast}
      />
    </>
  )
}
