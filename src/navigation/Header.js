import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { palette } from './../styles/styles';
import { stateUser } from './../graphql/state';
import { useReactiveVar } from '@apollo/client';

export const HeaderLeft = ({ onPress }) => {
  const user = useReactiveVar(stateUser);

  return (
    <Avatar 
      rounded 
      size='small' 
      title={user?.name[0]} 
      activeOpacity={0.7} 
      onPress={onPress} 
      containerStyle={styles.avatar}
    />
  )
}

export const HeaderTitle = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={require('./../assets/images/nextime/logo.webp')} style={styles.logo} />
  </TouchableOpacity> 
)

const styles = { 
  logo: {
    resizeMode: 'contain',
    width: 90
  },
  avatar: {
    position: 'absolute',
    left: 10,
    backgroundColor: palette.pink,
  }
}