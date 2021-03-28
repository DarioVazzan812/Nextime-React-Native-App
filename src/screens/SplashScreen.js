import React from 'react';
import { View, Image } from 'react-native';
import { palette } from '../styles/styles';

export const SplashScreen = () => {
  return (
    <View style={styles.screen}>
      <Image
        source={require('./../assets/images/nextime/logo.webp')}
        style={styles.logo}
      />
    </View> 
  )
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: palette.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    width: '50%',
    height: null,
    resizeMode: 'contain',
  },
}