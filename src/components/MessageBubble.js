import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Moment from 'react-moment';
import { palette } from '../styles/styles';
import ImageView from "react-native-image-viewing";
import { Icon } from 'react-native-elements'
import Video from 'react-native-video';
import { VideoPlayer } from './VideoPlayer';
import { AudioPlayer } from './AudioPlayer';
import { MessageTypes } from './../utils/file-helper';

export const MessageBubble = ({ message, sender=false }) => {
  const [loadingAsset, setLoadingAsset] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  // Hack for video player bug (https://github.com/react-native-video/react-native-video/issues/1979)
  const [videoPaused, setVideoPaused] = useState(false);

  const download = (file) => {
    const options = {
      fileCache: true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        title: file.key,
        // path: `${RNFetchBlob.fs.dirs.DocumentDir}/${file.key}`, // this is the path where your downloaded file will live in
        mime: file.mime,
        description : 'Downloading file'
      }
    }
    RNFetchBlob.config(options).fetch('GET', file.url).then((res) => {
      console.log(res.path());
    });
  }

  return (
    <View key={message.id} style={[styles.root, sender ? styles.senderPosition : styles.receiverPosition ]}>

      {/* Image Modal */}
      <ImageView
        images={[{uri: previewImage}]}
        imageIndex={0}
        visible={previewImage ? true : false}
        onRequestClose={() => setPreviewImage(null)}
      />
      
      {/* Video Modal */}
      <VideoPlayer 
        visible={previewVideo ? true : false}
        uri={previewVideo}
        onRequestClose={() => setPreviewVideo(null)}
      />

      {/* Loading */}
      { loadingAsset && <ActivityIndicator style={styles.loader} size="small" color={palette.pink} />}


      {/* Text */}
      {message.text && <Text>{message.text}</Text>}
      
      {/* File Previews */}
      {message.files.map((file, index) => {
        switch(file.type) {
          case MessageTypes.Image: 
            return (
              <TouchableOpacity key={index} onPress={() => setPreviewImage(file.url)}>
                <Image 
                  style={styles.filePreview} 
                  resizeMode="cover"
                  source={{ uri: file.url }} 
                  onLoadStart={() => setLoadingAsset(true)} 
                  onLoadEnd={() => setLoadingAsset(false)}
                />
              </TouchableOpacity>
            );
          case MessageTypes.Video: 
            return (
              <TouchableOpacity key={index} onPress={() => setPreviewVideo(file.url)}>
                <View style={styles.playIcon} >
                  {!loadingAsset && <Icon reverse name='play' type='font-awesome' size={30} color={palette.pink} /> }
                </View>
                <Video 
                  source={{ uri: file.url }} 
                  style={styles.filePreview} 
                  resizeMode="cover"
                  paused={videoPaused}
                  onLoadStart={() => setLoadingAsset(true)} 
                  onReadyForDisplay={() => {
                    setVideoPaused(true);
                    setLoadingAsset(false);
                  }}
                />
              </TouchableOpacity>
            )
          case MessageTypes.Audio: 
            return <AudioPlayer key={index} uri={file.url} />
          case MessageTypes.Document: 
            return (
              <Icon 
                key={index}
                reverse 
                name='file-download' 
                type='font-awesome-5' 
                size={30} 
                color={palette.pink} 
                onPress={() => download(file)}
              />
            )
        }
      })}
      <Moment style={styles.date} date={message.sendAt} element={Text} format="D MMM YYYY HH:mm"/>
    </View>
  )
}

const styles = {
  root: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: palette.white,
    borderRadius: 8,
    minWidth: 140,
    position: "relative",
    paddingBottom: 30,
  },
  senderPosition: {
    alignSelf:"flex-end",
    justifyContent: "flex-end",
  },
  receiverPosition: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },
  date: {
    position: "absolute",
    bottom: 5,
    right: 10,
    color: palette.gray110,
  },
  filePreview: {
    flex: 1,
    height: 150,
    width: 150,
  },
  playIcon: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}