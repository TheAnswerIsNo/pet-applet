import './index.scss'
import { Cell, Row, Image, Tag } from '@nutui/nutui-react-taro'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import adoptImage from '../../static/领养.png'
import giveUpImage from '../../static/送养.png'

export default function Index() {

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
        <Image src={adoptImage} height={200} />
      </Cell>
      <Cell>
        <View onClick={giveUpAdopt}>
          <Tag type="info" style={{ width: '50px', height: '50px' }}>
            送养
          </Tag>
        </View>
        <Image src={giveUpImage} height={200} />
      </Cell>
    </Row>

  )
}
