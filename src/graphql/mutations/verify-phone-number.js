import gql from 'graphql-tag';

export const VERIFY_PHONE_NUMBER = gql`
    mutation verifyPhoneNumber($userId: ID!, $code: String!) {
      verifyPhoneNumber(
        userId: $userId
        code: $code
      ) {
        token
        user {
          id: _id
          phone
          name
          email
        }
      }
    }
`;

