import { useQuery, useReactiveVar } from '@apollo/client';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { memo, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { ConversationModal } from '../modals/ConversationModal';
import { MessageBuilderModal } from '../modals/MessageBuilderModal';
import { InboxScreen } from '../screens/InboxScreen';
import { PendingScreen } from '../screens/PendingScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { UploadFileScreen } from '../screens/UploadFileScreen';
import { ME_QUERY } from './../graphql/queries/me';
import { stateUser } from './../graphql/state';
import { navigationRef } from './../providers/navigator-provider';
import { subscribeToNotifications } from './../providers/notifications-provider';
import { DashboardScreen } from './../screens/DashboardScreen';
import { ExamplesScreen } from './../screens/ExamplesScreen';
import { HowToUseScreen } from './../screens/HowToUseScreen';
import { PasswordRecoveryScreen } from './../screens/PasswordRecoveryScreen';
import { ProfileScreen } from './../screens/ProfileScreen';
import { SignInScreen } from './../screens/SignInScreen';
import { SignUpScreen } from './../screens/SignUpScreen';
import { StorageScreen } from './../screens/StorageScreen';
import { SubscriptionScreen } from './../screens/SubscriptionScreen';
import { TermsAndConditionsScreen } from './../screens/TermsAndConditionsScreen';
import { UpcomingScreen } from './../screens/UpcomingScreen';
import { VerificationScreen } from './../screens/VerificationScreen';
import { palette } from './../styles/styles';
import { BottomTabBar } from './BottomTabBar';
import { HeaderLeft, HeaderTitle } from './Header';
import { SideMenu } from './SideMenu';

const headerOptions = ({ navigation }) => ({
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: palette.black,
  },
  headerLeft: () => (
    <HeaderLeft onPress={() => navigation.navigate("Profile")} />
  ),
  headerTitle: () => (
    <HeaderTitle onPress={() => navigation.navigate("Dashboard")} />
  ),
  headerRight: () => null,
});

const modalOptions = {
  mode: "modal",
  headerShown: false,
  cardOverlayEnabled: false,
  cardStyle: {
    paddingTop: Platform.OS === "ios" ? 24 : 0,
    backgroundColor: "transparent",
    shadowColor: "transparent",
  },
};

const MessageStackTab = createMaterialTopTabNavigator();
const MessageStack = () => (
  <MessageStackTab.Navigator
    initialRouteName="Inbox"
    tabBarOptions={{
      indicatorStyle: {
        backgroundColor: palette.pink,
      },
    }}
    lazy={true}
  >
    <MessageStackTab.Screen name="Inbox" component={InboxScreen} />
    <MessageStackTab.Screen name="Pending" component={PendingScreen} />
    <MessageStackTab.Screen name="Upcoming" component={UpcomingScreen} />
  </MessageStackTab.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerStack = () => (
  <Drawer.Navigator
    initialRouteName="Dashboard"
    drawerContent={(props) => <SideMenu {...props} />}
  >
    <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    <Drawer.Screen name="Messages" component={MessageStack} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Storage" component={StorageScreen} />
    <Drawer.Screen name="HowToUse" component={HowToUseScreen} />
    <Drawer.Screen name="Examples" component={ExamplesScreen} />
    <Drawer.Screen
      name="TermsAndConditions"
      component={TermsAndConditionsScreen}
    />
    <Drawer.Screen name="Subscription" component={SubscriptionScreen} />
  </Drawer.Navigator>
);

const AppStackTab = createBottomTabNavigator();
const AppStack = () => (
  <AppStackTab.Navigator
    headerMode="screen"
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <AppStackTab.Screen name="Drawer" component={DrawerStack} />
  </AppStackTab.Navigator>
);

const RootStack = createStackNavigator();
const RootNavigation = () => {
  const [loading, setLoading] = useState(true);

  useQuery(ME_QUERY, {
    onCompleted: (data) => {
      stateUser(data.me);
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
    },
  });

  const user = useReactiveVar(stateUser);

  // Subscribe to notifications
  useEffect(() => {
    return subscribeToNotifications();
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        {user == null ? (
          <>
            <RootStack.Screen
              name="UploadFile"
              component={UploadFileScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                headerShown: false,
                // animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />

            <RootStack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="Verification"
              component={VerificationScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="PasswordRecovery"
              component={PasswordRecoveryScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name="App"
              component={AppStack}
              options={headerOptions}
            />
            <RootStack.Screen
              name="MessageBuilder"
              component={MessageBuilderModal}
              options={modalOptions}
            />
            <RootStack.Screen
              name="Conversation"
              component={ConversationModal}
              options={modalOptions}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default memo(RootNavigation);
