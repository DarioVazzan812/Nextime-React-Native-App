import { makeVar } from '@apollo/client';

export const stateUser = makeVar(null);

export const stateContacts = makeVar([]);

export const stateUnreadMessagesCount = makeVar(0);