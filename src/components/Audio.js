import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements'
import { Text, View, TouchableOpacity } from 'react-native';
import { palette } from './../styles/styles';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { requestStoragePermissions, requestAudioPermissions } from './../utils/permissions';
import { MessageTypes, fileMetadata } from './../utils/file-helper';

export const Audio = ({ onChange }) => {
  const [audioRecorder, setAudioRecorder] = useState(null);

  const [file, setFile] = useState(null);

  const [recordLength, setRecordLength] = useState("00:00");
  const [currentPosition, setCurrentPosition] = useState("00:00");
  const [playing, setPlaying] = useState(false);

  useEffect(() => { setAudioRecorder(new AudioRecorderPlayer()) }, [])


  const handleChange = async(file) => {
    if(!file) {
      onChange(null);
      return;
    }
    
    const attachment = await fileMetadata(file, MessageTypes.Audio, { mime: 'audio/mp4' })
    onChange(attachment) 
  } 

  // Trigger change whenever file change
  useEffect(() => { handleChange(file) }, [file]);

  const onStartRecord = async() => {
    await requestStoragePermissions();
    await requestAudioPermissions();
    await audioRecorder.startRecorder();
    audioRecorder.addRecordBackListener((e) => {
      setRecordLength(audioRecorder.mmss(Math.floor(e.current_position / 1000)))
      return;
    });
  };
   
  const onStopRecord = async () => {
    const result = await audioRecorder.stopRecorder();
    audioRecorder.removeRecordBackListener();
    setFile(result);
  };
   
  const onPlayPause = async () => {
    if(playing) {
      audioRecorder.pausePlayer();
      setPlaying(false);
    } else {
      setPlaying(true);
      await audioRecorder.startPlayer();
      audioRecorder.addPlayBackListener(async(e) => {
        if (e.current_position === e.duration) {
          await audioRecorder.stopPlayer();
          setPlaying(false);
        }
        setCurrentPosition(audioRecorder.mmss(Math.floor(e.current_position / 1000)));
        return;
      });
    }
  };
  
  return ( 
    <View style={styles.screen}>
      {file ?
        <>
          <Icon
            reverse
            name={playing ? 'pause' : 'play'}
            type='font-awesome-5'
            size={25}
            onPress={onPlayPause}
            color={palette.pink}
          />
          <Text style={styles.timer}>{currentPosition} - {recordLength}</Text>
        </>
        :
        <>
          <TouchableOpacity onPressIn={onStartRecord} onPressOut={onStopRecord} >
            <Icon
              reverse
              name='microphone'
              type='font-awesome-5'
              size={25}
              color={palette.pink}
            />
          </TouchableOpacity>
          <Text style={styles.timer}>{recordLength}</Text>
        </>
      }
    </View>
  )
}

const styles = {
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
  },
}