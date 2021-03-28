import Contacts from 'react-native-contacts';
import { stateContacts } from './../graphql/state';

export const fetchContacts = async() => {
  const contacts = await Contacts.getAll(); 
  const filteredContacts = contacts
    .filter(contact => contact.phoneNumbers.length > 0 && (contact.givenName || contact.familyName))
    .map(contact => (
      {
        displayName: `${contact.givenName} ${contact.familyName}`,
        emailAddresses: contact.emailAddresses,
        hasThumbnail: contact.hasThumbnail,
        phoneNumbers: [...new Set(contact.phoneNumbers?.map(pn => pn.number.replace(/[\s-]/g, '')))],
        thumbnailPath: contact.thumbnailPath
      }
  ));
  stateContacts(filteredContacts);
}

export const getContactName = (number) => {
  const contacts = stateContacts();
  const contact = contacts.find(contact => contact.phoneNumbers.includes(number));
  if(contact) return contact.displayName
  return number;
} 