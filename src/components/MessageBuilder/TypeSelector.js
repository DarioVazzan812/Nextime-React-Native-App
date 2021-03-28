import React from 'react';
import { Icon } from 'react-native-elements'
import { View } from 'react-native';
import { palette } from '../../styles/styles';
import { MessageTypes } from './../../utils/file-helper';

export const TypeSelector = ({type, setType}) => (
  <View style={styles.typeSelector}>
    <Icon
      name='align-left'
      type='font-awesome'
      iconStyle={styles.action}
      color={type === MessageTypes.Text ? palette.lightblue : palette.white}
      onPress={() => setType(MessageTypes.Text)}
    />
    <Icon
      name='camera'
      type='font-awesome'
      iconStyle={styles.action}
      color={type === MessageTypes.Image ? palette.lightblue : palette.white}
      onPress={() => setType(MessageTypes.Image)}
    />
    <Icon
      name='paperclip'
      type='font-awesome'
      iconStyle={styles.action}
      color={type === MessageTypes.Document ? palette.lightblue : palette.white}
      onPress={() => setType(MessageTypes.Document)}
    />
    <Icon
      name='microphone'
      type='font-awesome'
      iconStyle={styles.action}
      color={type === MessageTypes.Audio ? palette.lightblue : palette.white}
      onPress={() => setType(MessageTypes.Audio)}
    />
    <Icon
      name='video'
      type='font-awesome-5'
      iconStyle={styles.action}
      color={type === MessageTypes.Video ? palette.lightblue : palette.white}
      onPress={() => setType(MessageTypes.Video)}
    />
  </View>
)

const styles = {
  typeSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: palette.gray,
  },
  action: {
    padding: 20
  }
}