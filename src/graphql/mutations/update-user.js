import gql from 'graphql-tag';

export const UPDATE_USER = gql`
    mutation updateUser($email: String, $name: String) {
      updateUser(
          email: $email
          name: $name
        ) {
          id: _id
          phone
          name
          email
        }
    }
`;