import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

export const UpcomingScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <TouchableOpacity onPress={() => navigation.navigate("Subscription")} style={styles.touchable}>
      <Image source={require('./../assets/images/nextime/locked_logo.webp')} style={styles.image}/>
      <Text style={styles.text}>Please subscribe to see your lock messages</Text>
    </TouchableOpacity>
  </View>
)

const styles = {
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  touchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
  },
  text: {
    textAlign: "center",
  },
  image: {
    height: null,
    width: 120,
    height: 100,
    resizeMode: 'contain',
  }
}