import gql from 'graphql-tag';

export const SIGN_FILE_QUERY = gql`
    query signFile($mime: String!, $type: String!, $name: String, $size: Int!)  {
        signFile(
            mime: $mime 
            type: $type
            name: $name
            size: $size
        ) {
            file {
                id: _id
                mime
            },
            url,
            fields {
                key
                bucket
                algorithm
                credential
                date
                policy
                signature
            }
        }
    }
`;