import { Button } from '@nutui/nutui-react-taro';
import { BaseEventOrig, MapProps, View } from '@tarojs/components';
import Taro from '@tarojs/taro'
import { Map } from '@tarojs/components'
import { useEffect, useState } from 'react';

// 基础使用示例
export default () => {

    const [latitude, setLatitude] = useState(39.9)
    const [longitude, setLongitude] = useState(116.4)
    // 获取当前位置
    const getLocation = async () => {
        try {
            const res = await Taro.getLocation({
                type: 'gcj02' //返回可以用于wx.openLocation的经纬度
            })
            setLatitude(res.latitude)
            setLongitude(res.longitude)
            console.log('当前位置：', res.latitude, res.longitude);
            return res;
        } catch (err) {
            console.error('获取位置失败：', err);
        }
    }

    // 打开地图选择位置
    const chooseLocation = async () => {
        try {
            const res = await Taro.chooseLocation({
                latitude: 39.9,  // 默认纬度
                longitude: 116.4 // 默认经度
            })
            console.log('选择的位置：', res);
            setLatitude(res.latitude)
            setLongitude(res.longitude)

        } catch (err) {
            console.error('选择位置失败：', err);
        }
    }

    useEffect(() => {
        getLocation()
    }, [])

    return (
        <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Button onClick={chooseLocation} type="primary" style={{ margin: 8 }}>
                选择位置
            </Button>
            <Map
                id="map"
                longitude={longitude}
                latitude={latitude}
                scale={16}
                markers={[{
                    id: 1,
                    latitude: latitude,
                    longitude: longitude,
                    iconPath: ''
                }]}
                onTap={() => { console.log('map tap'); }}
                style={{ width: '100%', height: '95vh' }}
                onError={function (event: BaseEventOrig<MapProps.point>): void {
                    throw new Error('Function not implemented.');
                }} />
        </View>
    )
}
