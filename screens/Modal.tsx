import { View, TouchableOpacity, Text, FlatList } from 'react-native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Icon } from '@rneui/themed'
import { RootStackParamList } from '../navigation/RootNavigator'
import { TabStackParamList } from '../navigation/TabNavigator'
import useCustomerOrders from '../hooks/useCustomerOrders'
import DeliveryCard from '../components/DeliveryCard'
import { useTailwind } from 'tailwind-rn/dist'

type ModalNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, 'Modal'>
>

type ModalRouteProp = RouteProp<RootStackParamList, 'Modal'>

const Modal = () => {
  const tw = useTailwind()
  const navigation = useNavigation<ModalNavigationProps>()
  const {
    params: { name, userId },
  } = useRoute<ModalRouteProp>()

  const { loading, error, orders } = useCustomerOrders(userId)

  return (
    <View>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={{ position: 'absolute', right: 10, top: 10, zIndex: 10 }}
      >
        <Icon name='closecircle' type='antdesign' />
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        <View
          style={[tw('py-5'), { borderBottomWidth: 1, borderColor: '#59c1cc' }]}
        >
          <Text
            style={[tw('text-center text-xl font-bold'), { color: '#59c1cc' }]}
          >
            {name}
          </Text>
          <Text style={[tw('text-center italic text-sm')]}>deliveries</Text>
        </View>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(order) => order.trackingId}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </View>
  )
}

export default Modal
