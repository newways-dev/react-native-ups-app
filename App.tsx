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
  uri: 'http://localhost:5001/api/illmannered-mandrill',
  cache: new InMemoryCache(),
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
