import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, Image } from '@rneui/themed'
import { useLayoutEffect, useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import OrderCard from '../components/OrderCard'
import useOrders from '../hooks/useOrders'
import { RootStackParamList } from '../navigation/RootNavigator'
import { TabStackParamList } from '../navigation/TabNavigator'

export type OrdersNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, 'Order'>
>

const Orders = () => {
  const tw = useTailwind()
  const navigation = useNavigation<OrdersNavigationProps>()
  const { loading, error, orders } = useOrders()
  const [acsending, setAcsending] = useState<boolean>(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? '#eb6a7c' : color, fontSize: 10 }}>
          Orders
        </Text>
      ),
    })
  }, [])

  return (
    <ScrollView style={{ backgroundColor: '#eb6a7c' }}>
      <Image
        source={{ uri: 'https://links.papareact.com/m51' }}
        containerStyle={tw('w-full h-64')}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View>
        <Button
          onPress={() => setAcsending(!acsending)}
          color='pink'
          titleStyle={{ color: 'gray', fontWeight: '400' }}
          style={tw('py-2 px-5')}
        >
          {acsending ? 'Showing: Oldest First' : 'Showing: Most Recent First'}
        </Button>
        {orders
          ?.sort((a, b) => {
            if (acsending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
            }
          })
          .map((order) => (
            <OrderCard key={order.trackingId} order={order} />
          ))}
      </View>
    </ScrollView>
  )
}

export default Orders
