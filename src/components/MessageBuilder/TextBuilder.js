import React from 'react';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { palette } from '../../styles/styles';

export const TextBuilder = ({ onChange, onSubmit }) => {
  return (
    <View style={styles.container}>
      <AutoGrowingTextInput 
        style={styles.input} 
        placeholder="New message.."
        onChangeText={onChange}
      />
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
  input: {
    backgroundColor: palette.white,
    borderRadius: 15,
    textAlignVertical: 'top',
    padding: 10,
    marginBottom: 10,
    maxHeight: "80%",
    width: "90%",
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