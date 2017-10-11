import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
// GraphQL
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo'
// Components
import App from './components/App'
// Styles
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
  }),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
