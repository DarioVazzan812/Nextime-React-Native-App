import React from 'react';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { View, Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { palette } from '../../styles/styles';

export const ContactSelectedItem = ({ contact, number, onRemove }) => (
  <ListItem bottomDivider containerStyle={styles.listItem}>
    <Avatar containerStyle={styles.avatar} rounded icon={{ name: 'check' }} onPress={() => onRemove(number)}/>
    <Text style={styles.title}>{contact.displayName} ({number})</Text>
  </ListItem>
)

const styles = {
  listItem: {
    backgroundColor: palette.gray50,
  },
  title: {
    marginLeft: 10,
  },
  avatar: {
    backgroundColor: palette.green
  },
  menuItem: {
    color: palette.red,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingVertical: 5, 
  }
}