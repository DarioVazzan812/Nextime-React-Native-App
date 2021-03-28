import { Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const requireContactsPermission = async() => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    } else {
      //TODO: Handle permissions denied
    }
  } else {
    return true;
  }
}

// IOS
export const requestNotificationPermission = async() => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const requestStoragePermissions = async() => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      //TODO: Handle permissions denied
    }
  } else {
    return true;
  }
}

export const requestAudioPermissions = async() => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      //TODO: Handle permissions denied
    }
  } else {
    return true;
  }
}

export const requestPermissions = async() => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, 
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
  }
}