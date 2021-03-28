import React, { useRef, useState } from 'react';
import { View, Image, Text, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { STORE_TOKEN } from './../constants/storage-keys';
import { Fumi } from 'react-native-textinput-effects';
import { TOKEN_AUTH } from '../graphql/mutations/token-auth';
import { STORE_FIREBASE_TOKEN } from './../constants/storage-keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from "@apollo/client";
import { colors, palette } from '../styles/styles';
import { stateUser } from './../graphql/state';

export const SignInScreen = ({ navigation }) => {
  const passwordInput = useRef(null);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [signInMutation, { loading: signingIn }] = useMutation(TOKEN_AUTH, {
		onCompleted: async(data) => {
      const { token, active, userId, user } = data.tokenAuth;
      if(active) {
        await AsyncStorage.setItem(STORE_TOKEN, token);
        stateUser(user);
      } else {
        navigation.navigate('Verification', { userId });
      }
    },
    onError: () => {
      Alert.alert(
        'Login failed', 
        'Incorrect login credentials',
        [{ text: 'Ok', onPress: () => {} }],
        { cancelable: false }
      )
    }
  });

  const handleSubmit = async() => { 
    const firebaseToken = await AsyncStorage.getItem(STORE_FIREBASE_TOKEN);
    signInMutation({ variables: { phone, password, firebaseToken } }) 
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS == "ios" ? "padding" : null}>
        <View style={styles.screen}>
          <View style={styles.header.wrapper}>
            <Image
              source={require('./../assets/images/nextime/logo.webp')}
              style={styles.header.logo}
            />
          </View>
          <View style={styles.form.root}>
            <Fumi
              label="Phone number"
              value={phone}
              onChangeText={setPhone}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordInput.current.focus()}
              style={styles.form.input}
              selectionColor={palette.black}
              iconClass={Icon}
              iconColor={palette.pink}
              iconName={'mobile'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
            />
            <Fumi
              label="Password"
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              secureTextEntry
              textContentType="password"
              returnKeyType="go"
              ref={passwordInput}
              onSubmitEditing={handleSubmit}
              style={styles.form.input}
              selectionColor={palette.black}
              iconClass={Icon}
              iconColor={palette.pink}
              iconName={'lock'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
            />
            <View style={styles.forgotPassword.wrapper}>
              <TouchableWithoutFeedback onPress={() => navigation.navigate('PasswordRecovery')}>
                <Text style={styles.forgotPassword.text}>Forgot password?</Text>
              </TouchableWithoutFeedback>
            </View>
            <Button
              title="Sign in"
              raised
              loading={signingIn}
              loadingProps={{ color: palette.blackOpacity }}
              disabled={!phone.length || !password.length}
              onPress={handleSubmit}
              buttonStyle={styles.form.button.root}
              titleStyle={styles.form.button.title}
              disabledStyle={styles.form.button.disabled.root}
              disabledTitleStyle={styles.form.button.disabled.title}
            />
          </View>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('SignUp')}>
            <View style={styles.signUpLink.root}>
              <Text style={styles.signUpLink.main}>New to Nextime?</Text>
              <Text style={styles.signUpLink.sub}>Sign up</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: palette.black,
    justifyContent: "flex-end",
    minHeight: 450,
  },
  header: {
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
    }, 
    logo: {
      flex: 1,
      width: '50%',
      height: null,
      resizeMode: 'contain',
    }
  },
  form: {
    root: {
      flex: 2,
      justifyContent: 'flex-end',
      paddingHorizontal: 24,
      position: 'relative',
    },
    input: {
      borderRadius: 20,
      marginBottom: 15,
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
  },
  forgotPassword: {
    wrapper: {
      alignItems: "flex-end",
      marginTop: -5,
      marginBottom: 20,
    },
    text: {
      color: palette.lightblue,
    }
  },
  signUpLink: {
    root: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    main: {
      color: palette.pink,
      fontSize: 22,
      fontWeight: "600",
    },
    sub: {
      color: palette.lightblue,
      fontSize: 20,
    }
  }
}