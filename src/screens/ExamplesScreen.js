import React from 'react';
import { Text, Image, ScrollView } from 'react-native';
import { palette } from './../styles/styles';

export const ExamplesScreen = () => (
  <ScrollView style={styles.screen}>
    <Text style={styles.text}>
      <Image source={require('./../assets/images/nextime/lines.png')} style={styles.linesImage} /> 
      ANTICIPATE BIRTHDAYS, ANNIVERSARIES AND SPECIAL DATES
    </Text>
    <Text style={styles.text}>
      <Image source={require('./../assets/images/nextime/lines.png')} style={styles.linesImage} /> 
      RECALL SHOPPING LIST
    </Text>
    <Text style={styles.text}>
      <Image source={require('./../assets/images/nextime/lines.png')} style={styles.linesImage} /> 
      LEAVE YOUR LEGCY
    </Text>
    <Text style={styles.text}>
      <Image source={require('./../assets/images/nextime/lines.png')} style={styles.linesImage} /> 
      PUT AN ALARM ON SOMEONE ELSE
    </Text>
    <Text style={styles.text}>
      <Image source={require('./../assets/images/nextime/lines.png')} style={styles.linesImage} /> 
      LOOK BACK ON THOSE IMPORTANT PICS, VIDEOS, DOCUMENTS OR AUDIOS
    </Text>
    <Text style={styles.text}>
      <Image source={require('./../assets/images/nextime/lines.png')} style={styles.linesImage} /> 
      PREDICT THE FUTURE
    </Text>
    <Text style={styles.text}>
      <Image source={require('./../assets/images/nextime/lines.png')} style={styles.linesImage} /> 
      HELP ALZEHIMER PATIENTS
    </Text>
    <Text style={styles.text}>
      <Image source={require('./../assets/images/nextime/lines.png')} style={styles.linesImage} /> 
      ORGANIZE YOUR CALENDAR
    </Text>
    <Text style={styles.text}>
      <Image source={require('./../assets/images/nextime/lines.png')} style={styles.linesImage} /> 
      ...AND SO MUCH MORE!
    </Text>
  </ScrollView>
)

const styles = {
  screen: {
    flex: 1,
    padding: 30,
  },
  text: {
    fontSize: 19,
    color: palette.pink,
    marginVertical: 10,
  },
  linesImage: {
    height: 15,
    width: 20,
  },
}