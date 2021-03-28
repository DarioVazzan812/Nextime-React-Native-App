import * as mimeTypes from 'react-native-mime-types';
import { stat } from 'react-native-fs';

export const MessageTypes = {
  Text: "text",
  Image: "image",
  Audio: "audio",
  Video: "video",
  Document: "document"
}

export const fileMetadata = async(uri, type, options={ mime: null, size: null, name: null } ) => {
  let { mime, size, name } = options;
  
  // Mime type
  if(!mime) mime = mimeTypes.lookup(uri);

  // Size
  if(!size) {
    const fileStat = await stat(uri);
    size = fileStat.size;
  }

  return { uri, mime, type, size, name }
}