import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import { useMutation } from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORE_TOKEN, STORE_FIREBASE_TOKEN } from '../constants/storage-keys';
import { CREATE_USER } from './../graphql/mutations/create-user';
import { colors, palette } from '../styles/styles';

export const SignUpScreen = ({ navigation }) => {

  const [ phone, setPhone ] = useState('');
  const nameInput = useRef(null);
  const [ name, setName ] = useState('');
  const emailInput = useRef(null);
  const [ email, setEmail ] = useState('');
  const passwordInput = useRef(null);
  const [ password, setPassword ] = useState('');

  const handleError = error => {
    let errorMsg = "Unable to process sign up";
    if(error && error.message) {
      const matches = error.message.match(/\['(.*)'\]/);
      if(matches && matches[1]) errorMsg = matches[1]
    }

    Alert.alert(
      'Sign up failed', 
      errorMsg,
      [{ text: 'Ok', onPress: () => {} }],
      { cancelable: false }
    )
  }

  const [createUser, { loading: creatingUser }] = useMutation(CREATE_USER, {
		onCompleted: (data) => { 
      const { id: userId } = data.createUser
      if(userId) navigation.navigate('Verification', { userId });
    },
    onError: error => handleError(error)
  });

  const handleSubmit = async() => { 
    await AsyncStorage.removeItem(STORE_TOKEN);
    const firebaseToken = await AsyncStorage.getItem(STORE_FIREBASE_TOKEN);
    createUser({ variables: { phone, name, email, password, firebaseToken } }) 
  }

  const commonInputProps = {
    autoCorrect: false,
    blurOnSubmit: false,
    selectionColor: palette.blackOpacity,
    inputPadding: 16,
    returnKeyType: "next",
    style: styles.form.input
  }

  return (
    <View style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
          <View style={styles.form.root}> 
            <TextInput 
              placeholder="Phone number"
              onChangeText={setPhone}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              onSubmitEditing={() => nameInput.current.focus()}
              {...commonInputProps}
            />
            <TextInput 
              placeholder="Name"
              ref={nameInput}
              onChangeText={setName}
              textContentType="name"
              onSubmitEditing={() => emailInput.current.focus()}
              {...commonInputProps}
            />
            <TextInput 
              placeholder="Email"
              ref={emailInput}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              onSubmitEditing={() => passwordInput.current.focus()}
              {...commonInputProps}
            />
            <TextInput 
              placeholder="Password"
              ref={passwordInput}
              onChangeText={setPassword}
              autoCapitalize="none"
              secureTextEntry
              textContentType="password"
              onSubmitEditing={handleSubmit}
              returnKeyType="go"
              {...commonInputProps}
            />
            <Button
              title="Sign up"
              raised
              loading={creatingUser}
              loadingProps={{ color: palette.blackOpacity }}
              disabled={!phone.length || !name.length || !email.length || !password.length}
              onPress={handleSubmit}
              containerStyle={styles.button.container}
              buttonStyle={styles.button.root}
              titleStyle={styles.button.title}
              disabledStyle={styles.button.disabled.root}
              disabledTitleStyle={styles.button.disabled.title}
              testID="signin-button"
            />
            <TouchableWithoutFeedback onPress={() => navigation.navigate('SignIn')}>
              <View style={styles.backLink.root}>
                <Text style={styles.backLink.text}>Go back</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: palette.gray50,
  },
  form: {
    root: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
      position: 'relative',
    },
    input: {
      backgroundColor: palette.white,
      borderRadius: 20,
      fontWeight: '400',
      padding: 15,
      marginVertical: 10,
    },
  },
  button: {
    root: {
      height: 65,
      backgroundColor: palette.lightblue,
      shadowOffset: { width: 0, height: 4 },
      shadowColor: colors.shadowColor,
      shadowOpacity: 1,
      shadowRadius: 15,
      borderRadius: 20,
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
      }
    }
  },
  backLink: {
    root: {
      marginTop: 10,
      alignItems: "center",
    },
    text: {
      color: palette.pink,
      fontSize: 22,
      fontWeight: "600",
    },
  },
}