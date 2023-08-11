import { gql } from '@apollo/client';

export default gql(`
  query FetchCurrentUser {
    user {
      savedFiles
    }
  }
`);