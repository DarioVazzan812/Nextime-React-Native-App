import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { palette } from '../styles/styles';
import ProgressBar from 'react-native-progress/Bar';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

export const AudioPlayer = ({ uri }) => {
  const [audioRecorder, setAudioRecorder] = useState(null);
  const [recordLength, setRecordLength] = useState("00:00");
  const [currentPosition, setCurrentPosition] = useState("00:00");
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => { setAudioRecorder(new AudioRecorderPlayer()) }, [])

  const start = async() => {
    await audioRecorder.startPlayer(uri);
    setPlaying(true);
    audioRecorder.addPlayBackListener(async(e) => {
      if(!playing) return;
      
      if (e.current_position >= e.duration) {
        setPlaying(false);
        setCurrentPosition("00:00");
        setProgress(0);
        await audioRecorder.stopPlayer();
      } else {
        setProgress((e.current_position / e.duration).toFixed(2));
        setCurrentPosition(audioRecorder.mmss(Math.floor(e.current_position / 1000)));
        setRecordLength(audioRecorder.mmss(Math.floor(e.duration / 1000)));
      }
    });
  }

  return (
    <View>
      <View style={styles.player}>
        <Icon name='play' type='font-awesome' style={styles.icon} size={20} onPress={start} color={palette.pink} /> 
        <ProgressBar progress={progress} width={200} color={palette.pink} />
      </View>
      <View style={styles.audioDetails}>
        <Text>{currentPosition}</Text>
        <Text>{recordLength}</Text>
      </View>
    </View>
  )
}

const styles = {
  player: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 230
  },
  icon: {
  },
  audioDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 30,
  }
}