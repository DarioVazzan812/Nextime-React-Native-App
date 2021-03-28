import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { palette } from '../../styles/styles';
import { Audio } from './../Audio';

export const AudioBuilder = ({ onChange, onSubmit }) => {

  return (
    <View style={styles.container}>
      <Audio onChange={onChange} />
      <Button
        title="Done"
        onPress={onSubmit}
        buttonStyle={styles.button.root}
        titleStyle={styles.button.title}
      />
    </View>
  )
}

const styles = {
  container: {
    margin: 20,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    root: {
      backgroundColor: palette.lightblue,
      borderRadius: 15,
      width: 200,
    },
    title: {
      color: palette.black,
    }
  }
}