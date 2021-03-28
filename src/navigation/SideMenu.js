import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { stateUser } from './../graphql/state';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORE_TOKEN } from './../constants/storage-keys';

export const SideMenu = (props) => {

  const signOut = async() => {
    await AsyncStorage.removeItem(STORE_TOKEN);
    stateUser(null);
    props.navigation.navigate("SignIn");
  }

  const navigate = (name) => {
    props.navigation.navigate(name);
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Profile" onPress={() => navigate("Profile")} />
      <DrawerItem label="Storage" onPress={() => navigate("Storage")} />
      <DrawerItem label="Subscription" onPress={() => navigate("Subscription")} />
      <DrawerItem label="How to Use" onPress={() => navigate("HowToUse")} />
      <DrawerItem label="Examples" onPress={() => navigate("Examples")} />
      <DrawerItem label="Terms And Conditions" onPress={() => navigate("TermsAndConditions")} />
      <DrawerItem label="Log out" onPress={signOut} />
    </DrawerContentScrollView>
  )
}