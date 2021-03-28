import gql from 'graphql-tag';

export const SEND_VERIFICATION_CODE = gql`
    mutation sendVerificationCode($phone: String!) {
      sendVerificationCode(
        phone: $phone
      ) {
        sent
        userId
      }
    }
`;

