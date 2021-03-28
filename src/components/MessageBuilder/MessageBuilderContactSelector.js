import React, { useEffect, useState } from 'react';
import { SearchBar } from '../SearchBar';
import { ActivityIndicator, View, Text, FlatList } from 'react-native';
import { stateContacts } from './../../graphql/state';
import { useReactiveVar } from '@apollo/client';
import { palette } from '../../styles/styles';
import { ContactListItem } from './ContactListItem';
import { ContactSelectedItem } from './ContactSelectedItem';

export const MessageBuilderContactSelector = ({ setContacts, onSubmit }) => {
  const contacts = useReactiveVar(stateContacts);

  // List & Search
  const [ query, setQuery ] = useState('');
  const [ filteredContacts, setFilteredContacts ] = useState([]);

  // Selected contact & number
  const [ selectedContacts, setSelectedContacts ] = useState([]);

  // Handle changes
  useEffect(() => {
    setContacts(selectedContacts.map(contact => contact.selectedNumber));
  }, [selectedContacts])


  // Filter Contacts
  useEffect(() => {  
    const filtered = contacts.filter(c => c.displayName.includes(query))
    setFilteredContacts(filtered);
  }, [contacts, query])


  // On select
  const handleNumberSelection = (contact, selectedNumber=null) => {
    // Set phone number from contact if unique
    if(!selectedNumber) selectedNumber = contact.phoneNumbers[0];

    // Don't insert duplicates
    if(!selectedContacts.find(contact => contact.selectedNumber === selectedNumber)) {
      setSelectedContacts([...selectedContacts, { contact, selectedNumber }]);
    }
  }

  // Remove from selection
  const onRemove = (selectedNumber) => {
    setSelectedContacts(selectedContacts.filter(contact => contact.selectedNumber !== selectedNumber));
  }


  // Render contact list item
  const renderContactItem = ({ item }) => (
    <ContactListItem contact={item} onSelect={handleNumberSelection}/>
  )


  // Render selected contact item
  const renderSelectedItem = ({ item }) => (
    <ContactSelectedItem contact={item.contact} number={item.selectedNumber} onRemove={onRemove} />
  )

  return (
    <View style={{flex: 1}}>
      <View style={styles.content}>
        { selectedContacts.length > 0 &&
          <View style={styles.body}>
            <FlatList 
              data={selectedContacts}
              renderItem={renderSelectedItem}
              keyExtractor={(item) => item.selectedNumber}
            />
          </View>
        }
        <SearchBar onSetQuery={setQuery} />
        <View style={styles.body}>
          { contacts.length < 1 && <ActivityIndicator size="large" color={palette.pink} /> }
          { contacts.length > 0 &&
            <FlatList 
              data={filteredContacts}
              renderItem={renderContactItem}
              keyExtractor={(item) => item.phoneNumbers[0]}
            />
          }
        </View>
      </View>
    </View>
  )
}

const styles = { 
  content: {
    flex: 1
  },
  body: {
    flex: 1,
    justifyContent: "center",
  },
  selectedContacts: {
    content: {
      flex: 1,
      margin: 20,
      borderRadius: 30,
    },
    title: {
      fontWeight: "bold",
      fontSize: 20,
      marginBottom: 10
    }
  },
}
