import gql from 'graphql-tag';

export const CREATE_MESSAGE = gql`
    mutation createMessage($receivers: [String!], $sendAt: Date!, $filesIds: [ID], $text: String) {
      createMessage(
        message: {
            receivers: $receivers
            sendAt: $sendAt
            filesIds: $filesIds
            text: $text
          }
        ) {
          _id
        }
    }
`;