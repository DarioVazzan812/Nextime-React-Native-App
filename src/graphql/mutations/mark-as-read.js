import gql from 'graphql-tag';

export const MARK_AS_READ = gql`
    mutation markAsRead($id: ID!) {
      markAsRead(id: $id) {
        count
      }
    }
`;