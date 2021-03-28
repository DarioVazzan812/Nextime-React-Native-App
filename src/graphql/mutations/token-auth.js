import gql from 'graphql-tag';

export const TOKEN_AUTH = gql`
    mutation tokenAuth($phone: String!, $password: String!, $firebaseToken: String) {
        tokenAuth(
            phone: $phone
            password: $password
            firebaseToken: $firebaseToken
        ) {
            token
            userId
            active
            user {
                id: _id
                phone
                name
                email
            }
        }
    }
`;