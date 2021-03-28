import gql from 'graphql-tag';

export const CREATE_USER = gql`
    mutation createUser($email: String!, $name: String!, $password: String!, $phone: String!, $firebaseToken: String) {
      createUser(
          user: {
            email: $email
            name: $name
            phone: $phone
            password: $password
            firebaseToken: $firebaseToken
          }
        ) {
          id: _id
          phone
          name
          email
        }
    }
`;