import React, { useRef, useState } from 'react';
import { ModalContainer } from '../components/ModalContainer';
import { ModalHeader } from "../components/ModalHeader";
import { View, Alert } from 'react-native';
import momentTz from 'moment-timezone';
import ViewPager from '@react-native-community/viewpager';
import { MessageBuilderStepIndicator } from "../components/MessageBuilder/MessageBuilderStepIndicator";
import { MessageBuilderContactSelector } from '../components/MessageBuilder/MessageBuilderContactSelector';
import { MessageBuilderDateTimeSelector } from '../components/MessageBuilder/MessageBuilderDateTimeSelector';
import { MessageBuilderMessage } from '../components/MessageBuilder/MessageBuilderMessage';
import { CREATE_MESSAGE } from '../graphql/mutations/create-message';
import { SIGN_FILE_QUERY } from '../graphql/queries/sign-file';
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { Loader } from './../components/Loader';
import * as Localize from "react-native-localize";
import { palette } from '../styles/styles';
import { directUpload } from './../utils/aws';
import { stateUser } from './../graphql/state';

export const MessageBuilderModal = ({ navigation }) => {
  // User
  const user = useReactiveVar(stateUser);

  // Viewer pages
  const viewPager = useRef(null);
  const [page, setPage] = useState(0);

  // Loader
  const [loading, setLoading] = useState(false);

  // Message details
  const [body, setBody] = useState("");
  const [contacts, setContacts] = useState([]);
  const [datetime, setDatetime] = useState(new Date());

  // Save message mutation
  const [createMessage] = useMutation(CREATE_MESSAGE, {
		onCompleted: (data) => {
      navigation.navigate('App', { screen: "Drawer", params: { screen: 'Messages', params: { screen: 'Pending' }}});
      setLoading(false);
    },
    onError: error => Alert.alert('Error!', 'Failed to create message.', [{ text: 'Ok', onPress: () => {} }], { cancelable: false })
  });

  // Query for signing uploads
  const { refetch: signUpload } = useQuery(SIGN_FILE_QUERY, { skip: true, fetchPolicy: "no-cache" });

  // Validate message details
  const valid = () => {
    if(contacts.length < 1) { 
      Alert.alert('Validation error', 'A sender number is required', [{ text: 'Ok', onPress: () => {} }], { cancelable: false })
      return false;
    } 
    if(!body.text && body.attachments.length < 1) {
      Alert.alert('Validation error', 'A messsage is needed', [{ text: 'Ok', onPress: () => {} }], { cancelable: false })
      return false;
    }
    let localizedNow = momentTz(new Date(), Localize.getTimeZone())
    if(!datetime || datetime < localizedNow.format()) { 
      Alert.alert('Validation error', 'The date needs to be greater than now', [{ text: 'Ok', onPress: () => {} }], { cancelable: false })
      return false;
    }
    return true;
  }

  const uploadFiles = (attachments, type) => {
    return new Promise(async(resolve, reject) => {
      try { 
        let filesIds = [];
        for (const attachment of attachments) {
          const result = await signUpload(attachment);
          const presignedPayload = result.data.signFile;
          await directUpload(attachment.uri, presignedPayload);
          filesIds.push(presignedPayload.file.id);
        }
        resolve(filesIds);
      } catch(error) {
        reject(error);
      }
    })
  }

  // Send message
  const sendMessage = async() => {
    if(!valid()) return;
    setLoading(true);

    try { 
      let filesIds = [];
      if(body.attachments.length > 0) { 
        filesIds = await uploadFiles(body.attachments, body.type);
      }

      const message = {
        receivers: contacts,
        sendAt: datetime,
        text: body.text,
        filesIds,
      }

      createMessage({ variables: message });
    } catch(error) {
      console.log(error);
      setLoading(false);
      Alert.alert('Ooops!', 'Something went wrong', [{ text: 'Ok', onPress: () => {} }], { cancelable: false });
    }
  }

  return (
    <ModalContainer>
      {loading && <Loader visible={true}/>}
      <ModalHeader title="New Message" navigation={navigation} />
      <View style={styles.stepIndicator}>
        <MessageBuilderStepIndicator 
          position={page} 
          onChange={page => { 
            setPage(page);
            viewPager.current.setPage(page)
          }}
        />
      </View>
      <View style={styles.content}>
        <ViewPager ref={viewPager} style={{ flex: 1 }} initialPage={0} onPageSelected={e => setPage(e.nativeEvent.position) }>
          <View key="message">
            <MessageBuilderMessage 
              setMessage={setBody}
              onSubmit={() => viewPager.current.setPage(1)}
            />
          </View>
          <View key="contactPicker">
            <MessageBuilderContactSelector 
              setContacts={setContacts}
              onSubmit={() => viewPager.current.setPage(2)}
            />
          </View>
          <View key="datetimePicker">
            <MessageBuilderDateTimeSelector 
              setDatetime={setDatetime}
              onSubmit={() => sendMessage()}
            />
          </View>
        </ViewPager>
      </View>
    </ModalContainer>
  )
}

const styles = {
  content: {
    flex: 1,
    backgroundColor: palette.gray50
  },
  stepIndicator: {
    marginTop: 10
  }
  
}