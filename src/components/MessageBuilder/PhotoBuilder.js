import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { palette } from '../../styles/styles';
import { Camera } from './../Camera';

export const PhotoBuilder = ({ onChange, onSubmit }) => {
  const [attachment, setAttachment] = useState(null);

  return (
    <View style={styles.container}>
      <Camera 
        onChange={attachment => {
          setAttachment(attachment);
          onChange(attachment);
        }}
      />
      {attachment && 
        <Button
          title="Done"
          onPress={onSubmit}
          buttonStyle={styles.button.root}
          titleStyle={styles.button.title}
        />
      }
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    root: {
      marginBottom: 20,
      backgroundColor: palette.lightblue,
      borderRadius: 15,
      width: 200,
    },
    title: {
      color: palette.black,
    }
  }
}