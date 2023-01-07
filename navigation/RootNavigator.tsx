import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import Modal from '../screens/Modal'
import Order from '../screens/Order'

export type RootStackParamList = {
  Main: undefined
  Modal: { userId: string; name: string }
  Order: { order: Order }
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name='Main' component={TabNavigator} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen
          name='Modal'
          component={Modal}
          options={{ headerShown: false }}
        />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen name='Order' component={Order} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default RootNavigator
