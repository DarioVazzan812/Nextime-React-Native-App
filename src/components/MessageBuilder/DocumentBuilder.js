import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { palette } from './../../styles/styles';
import { FilePicker } from './../FilePicker';

export const DocumentBuilder = ({ onChange, onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.file}>
        <FilePicker onChange={onChange} />
      </View>
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
  file: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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