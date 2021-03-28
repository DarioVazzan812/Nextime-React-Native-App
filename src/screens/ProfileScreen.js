import React, { useState } from 'react';
import { Avatar } from 'react-native-elements';
import { View } from 'react-native';
import { stateUser } from './../graphql/state';
import { useReactiveVar } from '@apollo/client';
import { palette } from '../styles/styles';
import { DetailRow } from './../components/DetailRow';
import { Loader } from './../components/Loader';
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from './../graphql/mutations/update-user';


export const ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  
  const user = useReactiveVar(stateUser);

  const [updateUser] = useMutation(UPDATE_USER, {
		onCompleted: (data) => {
      setLoading(false);
      stateUser(data.updateUser);
    },
    onError: error => { 
      setLoading(false);
      Alert.alert('Ooops!', 'Something went wrong, try again later.', [{ text: 'Ok', onPress: () => {} }], { cancelable: false })
    },
  });

  const handleUpdate = (name, value) => { 
    setLoading(true);
    updateUser({variables: { [name]: value }});
  }

  return (
    <View style={styles.screen}>
      {loading && <Loader />}
      <Avatar size="large" containerStyle={styles.avatar} rounded title={user?.name[0]} />
      <DetailRow icon="user" title="name" name="name" value={user?.name} editable onChange={handleUpdate} />
      <DetailRow icon="smartphone" title="phone number" value={user?.phone} />
      <DetailRow icon="mail" title="e-mail" name="email" value={user?.email} editable onChange={handleUpdate} />
    </View>
  )
}

const styles = {
  screen: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 30,
  },
  avatar: {
    backgroundColor: palette.pink,
    marginBottom: 40,
  }
}