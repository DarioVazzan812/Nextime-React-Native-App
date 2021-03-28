import React, { useEffect, useRef, useState } from 'react';
import { Icon } from 'react-native-elements'
import { View, Alert, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { palette } from './../styles/styles';
import CameraRoll from "@react-native-community/cameraroll";
import * as ImagePicker from 'react-native-image-picker';
import { requestStoragePermissions } from './../utils/permissions';
import { Avatar } from 'react-native-elements';
import Video from 'react-native-video';
import { MessageTypes, fileMetadata } from './../utils/file-helper';

export const Camera = ({ onChange, type="photo" }) => {
  const camera = useRef(null);

  const [file, setFile] = useState(null);
  const [backCamera, setBackCamera] = useState(true);
  const [loading, setLoading] = useState(false);
  const [galleryPreview, setGalleryPreview] = useState(null);
  const [recording, setRecording] = useState(false);

  const handleChange = async(file) => {
    if(!file) {
      onChange(null);
      return;
    }
  
    const attachmentType = type === 'photo' ? MessageTypes.Image : MessageTypes.Video;
    const attachment = await fileMetadata(file, attachmentType)
    onChange(attachment) 
  } 

  // Trigger change whenever file change
  useEffect(() => { handleChange(file) }, [file]);

  const takeSnapshot = async() => {
    if (camera.current && !loading) {
      setLoading(true);

      try {
        const data = await camera.current.takePictureAsync({ quality: 1 });
        setFile(data.uri);
      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
      } finally {
        setLoading(false);
      }
    }
  };

  const record = async() => {
    if (camera.current && !recording) {
      setRecording(true);

      try {
        const data = await camera.current.recordAsync({ quality: 1 });
        setFile(data.uri);
      } catch (err) {
        Alert.alert('Error', 'Failed to record video: ' + (err.message || err));
      } finally {
        setLoading(false);
      }
    }
  };

  const onPress = () => {
    if(type === 'photo') {
      takeSnapshot();
    } else if(recording) { 
      if(recording) {
        camera.current.stopRecording();
        setRecording(false);
      }
    } else {
      record();
    }
  }

  const launchImageLibrary = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: type }, 
      response => {
        if (response.didCancel || response.error) return
        const uri = response.uri
        setFile(uri);
      }
    )
  }

  const getFirstGalleryFile = async() => {
    await requestStoragePermissions();
    const photosResponse = await CameraRoll.getPhotos({
      first: 1, 
      assetType: type === "photo" ? "Photos" : "Videos"
    });
    if(photosResponse?.edges[0]?.node?.image) setGalleryPreview(photosResponse.edges[0].node.image.uri)
  }

  useEffect(() => { getFirstGalleryFile() }, [])

  return ( 
    <View style={styles.screen}>
      {!file && 
        <RNCamera 
          ref={camera}
          captureAudio={false}
          style={styles.camera.camera}
          type={ backCamera ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front }
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }} 
        >
          <Icon
            reverse
            name='sync'
            type='font-awesome-5'
            size={20}
            color={palette.pink}
            containerStyle={styles.camera.rotateIcon}
            onPress={() => setBackCamera(!backCamera)}
          />
          <Icon
            name='circle'
            type='font-awesome'
            size={70}
            color={recording ? palette.red : palette.white}
            onPress={onPress}
          />
          <Avatar 
            rounded 
            size="medium" 
            source={{ uri: galleryPreview }} 
            containerStyle={styles.camera.galleryPreview} 
            onPress={launchImageLibrary}
          />      
        </RNCamera>
      }
      {file &&
        <View style={styles.file.background}>
          <Icon
            name='times'
            type='font-awesome-5'
            size={30}
            color={palette.white}
            containerStyle={styles.file.cancelIcon}
            onPress={() => setFile(null)}
          />
          {type === 'photo' ? 
            <Image source={{ uri: file }} style={{ flex: 1 }} /> :
            <Video source={{ uri: file }} style={styles.video.background} resizeMode="contain" />
          }   
        </View>
      }
    </View>
    
  )
}

const styles = {
  screen: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  camera: {
    rotateIcon: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    camera: {
      flex: 1,
      justifyContent: "flex-end",
    },
    galleryPreview: {
      position: "absolute",
      left: 5,
      bottom: 5,
      borderColor: palette.white, 
      borderWidth: 2,
    }
  },
  file: {
    background: {
      flex: 1,
      backgroundColor: palette.white,
      position: "relative",
    },
    cancelIcon: {
      position: "absolute", 
      top: 10,
      right: 15,
      zIndex: 2,
    }
  },
  video: {
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }
  }
}