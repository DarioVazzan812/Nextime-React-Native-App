import gql from 'graphql-tag';

export const STORAGE_QUERY = gql`
    query storage {
      storage {
        used      
      }
    }
`;