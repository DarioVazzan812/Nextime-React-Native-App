import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

import { STORE_TOKEN } from '../constants/storage-keys';

const consoleLink = new ApolloLink((operation, forward) => {
  console.log(`starting request for ${operation.operationName}`);
  return forward(operation).map((data) => {
    console.log(`ending request for ${operation.operationName}`);
    console.log(data);
    return data;
  });
});

const httpLink = new HttpLink({
  uri: Config.API_PATH,
});

const retryLink = new RetryLink({
  attempts: (count, operation, error) => count < 5 && error.statusCode !== 401,
  delay: {
    initial: 1000,
    max: Infinity,
    jitter: true,
  },
});

const authLink = setContext(async (query, context) => {
  const { headers } = context;
  const token = await AsyncStorage.getItem(STORE_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, response }) => {
  console.log("errorLink", errorLink);
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message = null, path = null }) => {
      console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`);
    });
  }
});

export const apolloClient = new ApolloClient({
  link: from([consoleLink, retryLink, errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: __DEV__,
});
