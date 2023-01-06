import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import useCustomerOrders from '../hooks/useCustomerOrders'
import { CustomerNavigationProps } from '../screens/Customers'
import { Card, Icon } from '@rneui/themed'

type CustomerCardProps = {
  userId: string
  name: string
  email: string
}

const CustomerCard = ({ name, email, userId }: CustomerCardProps) => {
  const { loading, error, orders } = useCustomerOrders(userId)
  const tw = useTailwind()
  const navigation = useNavigation<CustomerNavigationProps>()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Modal', { name, userId })}
    >
      <Card containerStyle={tw('p-5')}>
        <View>
          <View style={tw('flex-row justify-between')}>
            <View>
              <Text style={[tw('text-2xl'), { fontWeight: 'bold' }]}>
                {name}
              </Text>
              <Text style={[tw('text-sm'), { color: '#59c1cc' }]}>
                ID: {userId}
              </Text>
            </View>
            <View style={tw('flex-row items-center justify-end')}>
              <Text style={{ color: '#59c1cc' }}>
                {loading ? 'Loading...' : `${orders.length} x`}
              </Text>
              <Icon
                style={tw('mb-5 ml-auto')}
                name='box'
                type='entypo'
                color='#59c1cc'
                size={50}
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  )
}

export default CustomerCard
