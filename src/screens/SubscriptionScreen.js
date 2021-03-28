import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { palette } from './../styles/styles';

export const SubscriptionScreen = () => (
  <View style={styles.screen}>
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>FREE</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.item}>
          <Icon name='check' type='font-awesome' size={20} color={palette.green} style={{ marginRight: 5}}/> 
          50GB Free
        </Text>
      </View>
    </View>
  </View>
)

const styles = {
  screen: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "80%",
    height: "80%",
    shadowColor: palette.black,
    backgroundColor: palette.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    borderRadius: 10,
  },
  header: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: palette.blackOpacity,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 30,
    color: palette.pink,
    fontWeight: "600",
  },
  body: {
    padding: 30,
    alignItems: "center",
  },
  item: {
    fontSize: 18,
  }
}