import React, { useEffect } from 'react';
import { apolloClient } from './providers/apollo-provider';
import { MenuProvider } from 'react-native-popup-menu';
import { ApolloProvider } from '@apollo/client';
import RootNavigation from './navigation/RootNavigation';
import { fetchContacts } from './utils/contacts';
import { requestPermissions } from './utils/permissions';

export default function App() {

  useEffect(() => { 
    requestPermissions();
    fetchContacts();
  }, [])

  return (
    <ApolloProvider client={apolloClient}>
      <MenuProvider>
        <RootNavigation />
      </MenuProvider>
    </ApolloProvider>
  );
};
