import React, { useRef, useCallback } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { ModalContainer } from '../components/ModalContainer';
import { useFocusEffect } from '@react-navigation/native';
import { ModalHeader } from "../components/ModalHeader";
import { palette } from '../styles/styles';
import { useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { getContactName } from './../utils/contacts';
import { MESSAGES_QUERY } from './../graphql/queries/messages';
import { MARK_AS_READ } from './../graphql/mutations/mark-as-read';
import { MessageBubble } from './../components/MessageBubble';
import { stateUser, stateUnreadMessagesCount } from './../graphql/state';

export const ConversationModal = ({ route, navigation }) => {
  const scrollViewRef = useRef(null);
  const { type, conversation } = route.params;
  const user = useReactiveVar(stateUser);

  const { loading, data } = useQuery(MESSAGES_QUERY, { 
    variables: { conversationId: conversation.id, type },
    fetchPolicy: "no-cache"
  });

  const [markAsRead] = useMutation(MARK_AS_READ, { 
    variables: { id: conversation.id },
    onCompleted: data => { 
      const { count } = data.markAsRead;
      stateUnreadMessagesCount(stateUnreadMessagesCount() - count);
    }
  });

  useFocusEffect( useCallback(() => { if(type === "inbox") markAsRead() }, []));

  const title = () => {
    // User phone
    const userPhone = stateUser().phone;

    // Remove user phone
    let participants = conversation.participants.filter(participant => participant.phone !== userPhone)

    // If no participants, assume conversation with itself
    if(participants.length < 1) {
      participants = [ { phone: userPhone } ]
    }

    return participants.map(participant => getContactName(participant.phone)).join(', ');
  }

  return (
    <ModalContainer>
      <ModalHeader title={title()} navigation={navigation} />
      <ScrollView 
        ref={scrollViewRef} 
        style={styles.conversation}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {loading ? 
          <ActivityIndicator size="large" color={palette.pink} style={styles.loader}/>
          :
          data?.messages.map(message => (
            <MessageBubble key={message.id} message={message} sender={user.phone === message.from.phone}/>
          ))
        }
      </ScrollView>
    </ModalContainer>
  )
}

const styles = {
  conversation: {
    flex: 1,
    backgroundColor: palette.gray50,
  },
  loader: {
    marginTop: 30
  }
}