import React, { useState } from 'react';
import { SafeAreaView, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { palette, colors } from '../styles/styles';
import { useMutation } from "@apollo/client";
import { Fumi } from 'react-native-textinput-effects';
import { SEND_VERIFICATION_CODE } from '../graphql/mutations/send-verification-code';

export const PasswordRecoveryScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');

  const [sendVerificationCode, { loading }] = useMutation(SEND_VERIFICATION_CODE, {
    onCompleted: async(data) => {
      const { sent, userId } = data.sendVerificationCode;
      if(sent) 
        navigation.navigate('Verification', { userId });
      else {
        Alert.alert(
          'Account not found', 
          "Sorry, we couldn't find any account with the given phone. Please try again",
          [{ text: 'Ok', onPress: () => {} }],
          { cancelable: false }
        )
      }
    },
    onError: () => {
      Alert.alert(
        'Ooops...', 
        'Something went wrong',
        [{ text: 'Ok', onPress: () => {} }],
        { cancelable: false }
      )
    }
  });

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.text}>Enter your account phone number and we will send a verification code to login</Text>
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
      <Button
        title="Send code"
        raised
        loading={loading}
        loadingProps={{ color: palette.blackOpacity }}
        disabled={!phone.length}
        onPress={() => sendVerificationCode({ variables: { phone }}) }
        buttonStyle={styles.form.button.root}
        titleStyle={styles.form.button.title}
        disabledStyle={styles.form.button.disabled.root}
        disabledTitleStyle={styles.form.button.disabled.title}
      />
    </SafeAreaView> 
  )
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: palette.black,
    justifyContent: "center",
    minHeight: 450,
    padding: 20,
  },
  form: {
    input: {
      borderRadius: 20,
      marginVertical: 30,
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
  text: {
    color: palette.lightblue,
    textAlign: "center",
    fontSize: 18,
    margin: 20,
  },
}