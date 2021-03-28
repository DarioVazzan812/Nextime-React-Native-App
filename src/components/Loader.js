import React from 'react'; 
import { View, ActivityIndicator, Modal } from 'react-native';
import { palette } from './../styles/styles';

export const Loader = () => (
  <Modal transparent>
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={palette.pink} />
    </View>
  </Modal>
)

const styles = {
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    backgroundColor: palette.blackOpacity80,
  }
}