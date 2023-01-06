import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { TailwindProvider } from 'tailwind-rn'
import RootNavigator from './navigation/RootNavigator'
import utilities from './tailwind.json'

const client = new ApolloClient({
  uri: 'https://niteroi.stepzen.net/api/illmannered-mandrill/__graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Apikey niteroi::stepzen.net+1000::94e0ac4f39280281567db5bec241564cdb4d6ab50983685b9ba97890724c01fc`,
  },
})

export default function App() {
  return (
    // @ts-ignore
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  )
}
