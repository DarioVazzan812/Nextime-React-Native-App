import gql from 'graphql-tag';

export const ME_QUERY = gql`
    query me {
        me {
            id: _id
            phone
            name
            email
        }
    }
`;