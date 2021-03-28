import gql from 'graphql-tag';

export const CONVERSATIONS_QUERY = gql`
    query conversations($type: String) {
        conversations(type: $type) {
            id: _id
            participants {
                phone
            }
            unreadMessages
        }
    }
`;