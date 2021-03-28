import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { TypeSelector } from './TypeSelector';
import { MessageTypes } from './../../utils/file-helper';
import { TextBuilder } from './TextBuilder';
import { PhotoBuilder } from './PhotoBuilder';
import { VideoBuilder } from './VideoBuilder';
import { AudioBuilder } from './AudioBuilder';
import { DocumentBuilder } from './DocumentBuilder';
 
export const MessageBuilderMessage = ({ setMessage, onSubmit }) => {
  const [ type, setType ] = useState(MessageTypes.Text);
  const [ textMessage, setTextMessage ] = useState(""); 
  const [ picture, setPicture ] = useState(null);
  const [ video, setVideo ] = useState(null);
  const [ audio, setAudio ] = useState(null);
  const [ file, setFile ] = useState(null);

  useEffect(() => {
    // Message object
    let message = {
      text: null,
      attachments: [],
      type,
    }

    // Set details based on type
    switch(type) {
      case MessageTypes.Text: {
        message.text = textMessage;
        break;
      }
      case MessageTypes.Image: {
        message.attachments.push(picture);
        break;
      }
      case MessageTypes.Video: {
        message.attachments.push(video);
        break;
      }
      case MessageTypes.Audio: {
        message.attachments.push(audio);
        break;
      }
      case MessageTypes.Document: {
        message.attachments.push(file);
        break;
      }
    }

    // Send to parent
    setMessage(message);
  }, [type, textMessage, picture, video, audio, file])

  const renderTypeComponent = () => {
    switch(type) {
      case MessageTypes.Text: {
        return <TextBuilder onChange={setTextMessage} onSubmit={onSubmit} />
      }
      case MessageTypes.Image: {
        return <PhotoBuilder onChange={setPicture} onSubmit={onSubmit} />
      }
      case MessageTypes.Video: {
        return <VideoBuilder onChange={setVideo} onSubmit={onSubmit} />
      }
      case MessageTypes.Audio: {
        return <AudioBuilder onChange={setAudio} onSubmit={onSubmit} />
      }
      case MessageTypes.Document: {
        return <DocumentBuilder onChange={setFile} onSubmit={onSubmit} />
      }
    }
  }

  return(
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.componentWrapper} behavior="height">
        {renderTypeComponent()}
      </KeyboardAvoidingView>
      <TypeSelector type={type} setType={setType} />
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  componentWrapper: {
    flex: 1,
  },
}