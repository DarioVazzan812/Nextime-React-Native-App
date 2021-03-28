import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import { MessageTypes, fileMetadata } from './../utils/file-helper';

export const FilePicker = ({ onChange }) => {
  const [file, setFile] = useState(null);

  const handleClick = async() => {
    try { 
      const document = await DocumentPicker.pick({ type: [DocumentPicker.types.allFiles] });
      const attachment = await fileMetadata(document.uri, MessageTypes.Document, { mime: document.type, size: document.size, name: document.name })
      onChange(attachment);
      setFile(res.name)
    } catch(error) {}
  }

  return (
    <View style={styles.root}>
      <Icon
        reverse
        name='file'
        type='font-awesome'
        color='#517fa4'
        onPress={handleClick}
      />
      <Text>{file}</Text>
    </View>
  )
}

const styles = {
  root: {
    alignItems: "center"
  }
}