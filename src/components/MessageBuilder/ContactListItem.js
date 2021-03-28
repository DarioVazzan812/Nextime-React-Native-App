import React from 'react';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { palette } from '../../styles/styles';

export const ContactListItem = ({ contact, onSelect }) => (
  contact.phoneNumbers.length > 1 ? 
    <Menu>
      <MenuTrigger>
        <ListItem bottomDivider containerStyle={styles.listItem}>
          {contact.hasThumbnail ? 
            <Avatar containerStyle={styles.avatar} rounded source={{ uri: contact.thumbnailPath }} /> : 
            <Avatar containerStyle={styles.avatar} rounded title={contact.displayName[0]} />
          }
          <ListItem.Content>
            <ListItem.Title>{contact.displayName}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </MenuTrigger>
      <MenuOptions>
        {contact.phoneNumbers.map(number => (
          <MenuOption key={number} onSelect={() => onSelect(contact, number)}>
            <Text style={styles.menuItem}>{number}</Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
    : 
    <ListItem bottomDivider onPress={() => onSelect(contact)} containerStyle={styles.listItem}> 
      {contact.hasThumbnail ? 
        <Avatar containerStyle={styles.avatar} rounded source={{ uri: contact.thumbnailPath }} /> : 
        <Avatar containerStyle={styles.avatar} rounded title={contact.displayName[0]} />
      }
      <ListItem.Content>
        <ListItem.Title>{contact.displayName}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
)

const styles = {
  avatar: {
    backgroundColor: palette.pink
  },
  listItem: {
    backgroundColor: palette.gray50,
  },
  menuItem: {
    paddingVertical: 5,
    paddingLeft: 10,
  }
}