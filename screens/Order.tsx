import { useLayoutEffect } from 'react'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { RootStackParamList } from '../navigation/RootNavigator'
import { TabStackParamList } from '../navigation/TabNavigator'
import DeliveryCard from '../components/DeliveryCard'

export type OrderNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>

type OrderRouteProp = RouteProp<RootStackParamList, 'Order'>

const Order = () => {
  const tw = useTailwind()
  const navigation = useNavigation<OrderNavigationProps>()
  const {
    params: { order },
  } = useRoute<OrderRouteProp>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTitleStyle: { color: 'black' },
      headerTintColor: '#eb6a7c',
      headerBackTitle: 'Deliveries',
    })
  }, [order])

  return (
    <View style={tw('-mt-2')}>
      <DeliveryCard order={order} fullWidth />
    </View>
  )
}

export default Order
