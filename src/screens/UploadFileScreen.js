import React, { useState } from 'react';
import { Image, View } from 'react-native';
import Upload from 'react-native-background-upload';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';

import { colors, palette } from '../styles/styles';

export function UploadFileScreen() {
  const [image, setImage] = useState(null);

  const uploadImage = () => {
    let data = image;
    data.path = image.path.replace("file://", "");
    Upload.getFileInfo(image.path).then((metadata) => {
      const options = Object.assign(
        {
          url: "http://6b989ea13a26.ngrok.io/upload_multipart",
          type: "raw",
          field: "uploaded_media",
          type: "multipart",
          method: "POST",
          headers: {
            "content-type": metadata.mimeType, // server requires a content-type header
          },
        },
        image
      );

      Upload.startUpload(options)
        .then((uploadId) => {
          console.log(
            `Upload started with options: ${JSON.stringify(options)}`
          );
          Upload.addListener("progress", uploadId, (data) => {
            console.log(`Progress: ${data.progress}%`);
          });
          Upload.addListener("error", uploadId, (data) => {
            console.log(`Error: ${data.error}%`);
          });
          Upload.addListener("completed", uploadId, (data) => {
            console.log("Completed!");
          });
        })
        .catch(function (err) {
          console.log("Upload error!", err);
        });
    });
  };
  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      setImage(image);
    });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {image && (
        <Image
          source={{ uri: image.path }}
          style={{
            width: 400,
            height: 400,
          }}
        ></Image>
      )}
      <Button
        title={image ? "Upload Image" : "Choose Image"}
        raised
        loadingProps={{ color: palette.blackOpacity }}
        onPress={() => {
          image ? uploadImage() : chooseImage();
        }}
        containerStyle={styles.button.container}
        buttonStyle={styles.button.root}
        titleStyle={styles.button.title}
        testID="Choose Image"
      />
    </View>
  );
}

const styles = {
  button: {
    root: {
      height: 65,
      backgroundColor: palette.lightblue,
      shadowOffset: { width: 0, height: 4 },
      shadowColor: colors.shadowColor,
      shadowOpacity: 1,
      shadowRadius: 15,
      borderRadius: 20,
      paddingHorizontal: 20,
    },
    container: {
      marginTop: 15,
    },
    title: {
      color: palette.black,
    },
    disabled: {
      root: {
        opacity: 0.8,
        backgroundColor: palette.lightblueDisabled,
      },
      title: {
        color: palette.blackOpacity,
      },
    },
  },
};
