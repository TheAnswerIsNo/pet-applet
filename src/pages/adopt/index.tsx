import './index.scss'
import { Cell, Row, Image, Tag } from '@nutui/nutui-react-taro'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'



export default function Index() {

  const src =
    'https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'

  const giveUpAdopt = () => {
    Taro.navigateTo({
      url: '/pages/giveUpAdopt/index'
    })
  }

  const applyAdopt = () => {
    Taro.navigateTo({
      url: '/pages/applyAdoptList/index'
    })
  }

  return (
    <Row>
      <Cell>
        <View onClick={applyAdopt}>
          <Tag type="info" style={{ width: '50px', height: '50px' }}>
            领养
          </Tag>
        </View>
        <Image src={src} height={200} />
      </Cell>
      <Cell>
        <View onClick={giveUpAdopt}>
          <Tag type="info" style={{ width: '50px', height: '50px' }}>
            送养
          </Tag>
        </View>
        <Image src={src} height={200} />
      </Cell>
    </Row>

  )
}
