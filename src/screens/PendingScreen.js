import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { CONVERSATIONS_QUERY } from './../graphql/queries/conversations';
import { useQuery } from "@apollo/client";
import { palette } from '../styles/styles';
import { ConversationItem } from './../components/ConversationItem';

export const PendingScreen = () => {
  const { loading, data: conversationsQuery, refetch: getConversations } = useQuery(CONVERSATIONS_QUERY, { 
    variables: { type: "pending" }, 
    fetchPolicy: "no-cache" 
  });

  // Fetch messages on focus
  useFocusEffect( useCallback(() => { getConversations() }, []));

  if(loading) return <ActivityIndicator size="large" color={palette.pink} style={styles.loader}/>

  return (
    <View style={styles.screen}>
      <ScrollView style={{flex: 1}}>
        {conversationsQuery.conversations.map((conversation, index) => ( 
          <ConversationItem 
            key={index}
            type="pending"
            index={index}
            conversation={conversation}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = { 
  screen: {
    flex: 1,
  },
  loader: {
    marginTop: 30,
  }
}