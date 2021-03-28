import React from 'react';
import { Badge, Icon } from 'react-native-elements';
import { View, Image, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { palette } from './../styles/styles';
import { useQuery, useReactiveVar } from "@apollo/client";
import { stateUnreadMessagesCount } from './../graphql/state';
import { UNREAD_MESSAGES_COUNT_QUERY } from './../graphql/queries/unread-messages-count';

export const BottomTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  const unreadMessagesCount = useReactiveVar(stateUnreadMessagesCount);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  useQuery(UNREAD_MESSAGES_COUNT_QUERY, { 
    fetchPolicy: "no-cache",
    onCompleted: (data) => stateUnreadMessagesCount(data.unreadMessagesCount.count) 
  });
  
  return (
    <View style={styles.container}>
      <Icon
        name='sliders'
        type='font-awesome'
        iconStyle={styles.icon}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />

      <View style={styles.sendIconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("MessageBuilder")} style={styles.sendIconTouchable}>
          <Image source={require('./../assets/images/nextime/icon_white.webp')} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>

      <View>
        <Icon
          name='envelope'
          type='font-awesome'
          iconStyle={styles.icon}
          onPress={() => navigation.navigate('Messages')}
        />
        {unreadMessagesCount > 0 && 
          <Badge value={unreadMessagesCount} containerStyle={styles.badge.container} badgeStyle={styles.badge.badge} />
        }
      </View>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    backgroundColor: palette.gray,
    height: 60,
    alignItems: "center",
    justifyContent: "space-around",
  },
  icon: {
    color: palette.white,
    padding: 20,
  },
  sendIconContainer: {
    position: "relative",
  },
  sendIconTouchable: {
    flex: 1
  },
  sendIcon: {
    flex: 1,
    height: null,
    width: 50,
    resizeMode: 'contain',
  },
  badge: {
    container: {
      position: 'absolute', 
      top: 15, 
      right: 10, 
    },
    badge: {
      backgroundColor: palette.pink
    }
  },
}