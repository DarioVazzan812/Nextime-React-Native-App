import React from 'react'; 
import { View } from 'react-native';
import { palette } from './../styles/styles';

export const ModalContainer = ({style, ...props}) => (
  <View {...props} style={[styles.screen, style]}/>
)

const styles = {
  screen: { 
    backgroundColor: palette.white,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
  }
}