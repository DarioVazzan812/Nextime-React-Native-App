import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import { palette } from '../styles/styles';
import { navigate } from './../providers/navigator-provider';
import { getContactName } from './../utils/contacts';
import { stateUser } from './../graphql/state';

export const ConversationItem = ({index, conversation, type}) => {
  const odd = index % 2 === 0;

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
    <TouchableWithoutFeedback onPress={() => navigate("Conversation", { conversation, type })}>
      <View style={[styles.root, odd ? styles.evenColor : styles.oddColor]}>
        <View>
          <Icon
            name={conversation.unreadMessages ? 'envelope' : 'envelope-open'}
            type='font-awesome'
            color={conversation.unreadMessages ? palette.purple : palette.pink}
          />
          {conversation.unreadMessages > 0 &&
            <Badge
              value={conversation.unreadMessages}
              containerStyle={styles.badge.container}
              badgeStyle={styles.badge.badge}
            />
          }
        </View>
        <Text style={[styles.text, conversation.unreadMessages ? styles.unreadColor : styles.readColor]}>{title()}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = {
  root: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: 30,
    paddingVertical: 10,
    alignItems: "center",
  },
  badge: {
    container: {
      position: 'absolute', 
      top: -5, 
      right: -8 
    },
    badge: {
      backgroundColor: palette.pink
    }
  },
  evenColor: {
    backgroundColor: palette.gray,
  },
  oddColor: {
    backgroundColor: palette.gray50,
  },
  text: {
    marginLeft: 10,
    fontWeight: "bold",
  },
  readColor: {
    color: palette.pink
  },
  unreadColor: {
    color: palette.purple
  }
}