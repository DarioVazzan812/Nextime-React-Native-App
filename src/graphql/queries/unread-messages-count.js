import gql from 'graphql-tag';

export const UNREAD_MESSAGES_COUNT_QUERY = gql`
    query unreadMessagesCount {
      unreadMessagesCount {
        count      
      }
    }
`;