import gql from 'graphql-tag';

export const MESSAGES_QUERY = gql`
    query messages($conversationId: ID, $type: String) {
        messages(conversationId: $conversationId, type: $type) {
            id: _id
            from {
                phone
            }
            text
            files {
                key
                url
                type
                name
                mime
            }
            sendAt
            sent
        }
    }
`;