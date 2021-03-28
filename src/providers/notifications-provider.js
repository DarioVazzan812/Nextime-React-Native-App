import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from 'react-native';
import { STORE_FIREBASE_TOKEN } from './../constants/storage-keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stateUser, stateUnreadMessagesCount } from './../graphql/state';
import { navigate } from './navigator-provider';
import messaging from '@react-native-firebase/messaging';

const NOTIFICATION_TYPES = {
  INCOMING_MESSAGE: 'incoming_message', // Message received
  UPCOMING_MESSAGE: 'upcoming_message', // Message programmed
}

export const configureNotifications = () => {
  // Configure push notification [PushNotification]
  PushNotification.configure({
    // Called when Token is generated (iOS and Android)
    onRegister: function ({ token }) {
      // Token receive doesn't work on Android. Get it through firebase lib
      if(Platform.OS === 'ios') { 
        messaging().getToken().then(iosToken => {
          console.log(iosToken);
          AsyncStorage.setItem(STORE_FIREBASE_TOKEN, iosToken);
        })
      } else{ 
        AsyncStorage.setItem(STORE_FIREBASE_TOKEN, token);
      }
    },
  
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      let { data, messageType } = notification.data;

      switch(messageType) { 
        case NOTIFICATION_TYPES.INCOMING_MESSAGE: 
          data = JSON.parse(data);
          // If user logged
          if(stateUser) { 
            // Add one to new messages
            stateUnreadMessagesCount(stateUnreadMessagesCount() + 1);
            // Navigate to conversation
            navigate("Conversation", { conversation: data.conversation, type: "inbox" });
          }
          break;
      }

      // (required)
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
  
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  })

  // Create or update nextime channel [PushNotification]
  PushNotification.createChannel(
    {
      channelId: "nextime-channel", // (required)
      channelName: `Nextime channel`, // (required)
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    }
  );

  // Subscribe to background messages [Firebase] (Called when message received while app running in background)
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    //PushNotification.setApplicationIconBadgeNumber(1);
  });
}

// [PushNotification]
const _buildAndroidNotification = (title, message, data = {}, options = {}) => {
    return {
      autoCancel: true,
      largeIcon: options.largeIcon || "ic_launcher",
      smallIcon: options.smallIcon || "ic_launcher",
      bigText: message || "",
      subText: title || "",
      vibrate: options.vibrate || false,
      vibration: options.vibration || 300,
      priority: options.priority || "high",
      importance: options.importance || "high",
      data: data,
    }
}

// [PushNotification]
const _buildIOSNotification = (title, message, data = {}, options = {}) => {
  return {
    alertAction: options.alertAction || "view",
    category: options.category || "",
    userInfo: {
      item: data,
    }
  }
}

// [PushNotification]
export const showNotification = ({ title, message, data = {}, options = {} }) => {
  PushNotification.localNotification({
    ..._buildAndroidNotification(title, message, data, options),
    ..._buildIOSNotification(title, message, data, options),
    channelId: "nextime-channel",
    title,
    message,
    playSound: options.playSound || false,
    soundName: options.soundName || "default",
    userInteraction: false, 
  })
}

// [PushNotification]
const unregisterNotifications = () => {
  PushNotification.unregister();
}

// [Firebase] (Called when message received while app is in foreground)
export const subscribeToNotifications = () => {
  return messaging().onMessage(message => {
    showNotification({
      title: message.notification?.title,
      message: message.notification?.body,
      data: message.data
    });
  });
}
