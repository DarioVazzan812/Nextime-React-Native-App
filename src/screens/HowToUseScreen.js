import React from 'react';
import { View, Text, Linking } from 'react-native';
import { palette } from './../styles/styles';
import { Icon } from 'react-native-elements'

export const HowToUseScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>How to use</Text>
    <Icon 
      name='play-circle' 
      type='font-awesome' 
      size={80} 
      color={palette.pink} 
      style={styles.icon}
      onPress={() => Linking.openURL("https://www.youtube.com/watch?v=VHkn5u1Xuec")}
    />
  </View>
)

const styles = {
  screen: {
    flex: 1,
    padding: 30,
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: palette.pink,
    marginVertical: 10,
  },
  icon: {
    marginTop: 30,
  },
}