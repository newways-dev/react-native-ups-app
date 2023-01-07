import { Card, Divider, Icon } from '@rneui/themed'
import { Text, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'

type DeliveryCardProps = {
  order: Order
}

const DeliveryCard = ({ order }: DeliveryCardProps) => {
  const tw = useTailwind()

  return (
    <Card
      containerStyle={[
        tw('my-2'),
        {
          padding: 0,
          paddingTop: 14,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          backgroundColor: '#59c1cc',
        },
      ]}
    >
      <View>
        <Icon name='box' type='entypo' color='white' size={50} />
        <View>
          <Text
            style={tw('text-sm text-center uppercase text-white font-bold')}
          >
            {order.carrier} - {order.trackingId}
          </Text>
          <Text style={[tw('text-white text-center font-bold text-lg mb-2')]}>
            Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
          <Divider color='white' />
        </View>
        <View style={[tw('mx-auto')]}>
          <Text style={tw('text-base text-center text-white font-bold mt-5')}>
            Address
          </Text>
          <Text style={tw('text-sm text-center text-white')}>
            {order.Address}, {order.City}
          </Text>
          <Text style={tw('text-sm text-white text-center italic')}>
            Shipping Cost: ${order.shippingCost}
          </Text>
        </View>
      </View>
      <Divider color='white' />
      <View style={tw('p-5')}>
        {order.trackingItems.items.map((item) => (
          <View style={tw('flex-row justify-between items-center')}>
            <Text style={tw('text-sm italic text-white')}>{item.name}</Text>
            <Text style={tw('text-white text-xl')}>x {item.quantity}</Text>
          </View>
        ))}
      </View>
    </Card>
  )
}

export default DeliveryCard
