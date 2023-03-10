import { useState, useLayoutEffect } from 'react'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ActivityIndicator, ScrollView } from 'react-native'
import { RootStackParamList } from '../navigation/RootNavigator'
import { TabStackParamList } from '../navigation/TabNavigator'
import { useTailwind } from 'tailwind-rn'
import { Image, Input } from '@rneui/themed'
import { useQuery } from '@apollo/client'
import { GET_CUSTOMERS } from '../graphql/queries'
import CustomerCard from '../components/CustomerCard'

export type CustomerNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Customers'>,
  NativeStackNavigationProp<RootStackParamList>
>

const Customers = () => {
  const tw = useTailwind()
  const [input, setInput] = useState<string>('')
  const navigation = useNavigation<CustomerNavigationProps>()
  const { loading, error, data } = useQuery(GET_CUSTOMERS)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <ScrollView style={{ backgroundColor: '#59c1cc' }}>
      <Image
        source={{ uri: 'https://links.papareact.com/3jc' }}
        containerStyle={tw('w-full h-64')}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Input
        placeholder='Search by customer'
        value={input}
        onChangeText={setInput}
        containerStyle={tw('bg-white pt-5 pb-0 px-10')}
      />
      {data?.getCustomers
        ?.filter((customer: CustomerList) =>
          customer.value.name.toLowerCase().includes(input.toLowerCase())
        )
        .map(({ name: ID, value: { email, name } }: CustomerResponce) => (
          <CustomerCard key={ID} email={email} name={name} userId={ID} />
        ))}
    </ScrollView>
  )
}

export default Customers
