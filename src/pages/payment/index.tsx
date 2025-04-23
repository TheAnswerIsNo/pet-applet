import { Button, Card } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import { useRouter } from "@tarojs/taro";
import './index.scss'

export default () => {
  const router: any = useRouter();
  const data = JSON.parse(decodeURIComponent(router.params.data))
  const submit = () => {
    Taro.navigateTo({
      url: '/pages/payment/index?data=' + encodeURIComponent(JSON.stringify(data))
    })
  }
  return (
    <>
      {data.list.map((val: any) => {
        return <Card
          style={{ margin: '16px' }}
          src={val.photos[0]}
          title={val.name}
          price={val.price}
          tag={<div>数量: {val.number} {val.description} </div>}
        />
      })}
      <div style={{ width: '100%', background: '#f7f8f8', position: 'fixed', bottom: '0', height: '60px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <text> 总数量: <text style={{ color: 'red' }}>{data.totalNumber}</text></text><text> 总价: <text style={{ color: 'red' }}>￥{data.totalPrice}</text></text>
        <Button type="success" onClick={submit}>
          提交订单
        </Button>
      </div>
    </>
  )
}
