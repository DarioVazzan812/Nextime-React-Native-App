import React, { useState } from 'react';
import { View, SafeAreaView, Text} from 'react-native';
import { Button } from 'react-native-elements';
import { palette, colors } from '../styles/styles';
import { useMutation } from "@apollo/client";
import { STORE_TOKEN } from './../constants/storage-keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VERIFY_PHONE_NUMBER } from './../graphql/mutations/verify-phone-number';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { stateUser } from './../graphql/state';

export const VerificationScreen = ({ route }) => {
  const [value, setValue] = useState('');

  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const [verify, { loading }] = useMutation(VERIFY_PHONE_NUMBER, {
		onCompleted: async(data) => {
      const { token, user } = data.verifyPhoneNumber;
      await AsyncStorage.setItem(STORE_TOKEN, token);
      stateUser(user);
    },
    onError: () => {
      Alert.alert(
        'Invalid code', 
        'Please try again',
        [{ text: 'Ok', onPress: () => {} }],
        { cancelable: false }
      )
    }
  });

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>VERIFICATION CODE</Text>
      <Text style={styles.description}>Enter the 6 digit code sent to your phone</Text>
      <CodeField
        {...props}
        ref={ref}
        value={value}
        onChangeText={setValue}
        cellCount={6}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <Button
        title="Verify"
        raised
        loading={loading}
        loadingProps={{ color: palette.blackOpacity }}
        disabled={value.length !== 6}
        onPress={() => verify({ variables: { userId: route.params.userId, code: value }}) }
        buttonStyle={styles.button.root}
        titleStyle={styles.button.title}
        disabledStyle={styles.button.disabled.root}
        disabledTitleStyle={styles.button.disabled.title}
      />
    </SafeAreaView> 
  )
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: palette.black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    textAlign: 'center', 
    fontSize: 20,
    color: palette.white
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: palette.white
  },
  codeFieldRoot: {
    marginVertical: 50,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: palette.gray,
    borderBottomWidth: 1,
  },
  cellText: {
    color: palette.white,
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: palette.white,
    borderBottomWidth: 2,
  },
  button: {
    root: {
      height: 65,
      width: 250,
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
}