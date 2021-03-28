import React from 'react';
import Player from 'react-native-video-controls';
import { Modal, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { palette } from '../styles/styles';

export const VideoPlayer = ({visible, uri, onRequestClose}) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onRequestClose}  
    >
      <TouchableOpacity style={styles.closeIcon} onPress={onRequestClose}>
        <Icon name='times' type='font-awesome' size={25} color={palette.white} />
      </TouchableOpacity>
      <Player 
        source={{ uri }}
        disableBack
        disableFullscreen
      />
    </Modal>
  )
}

const styles = {
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 2,
  }
}