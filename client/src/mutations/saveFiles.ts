import { gql } from '@apollo/client';

export default gql(`
  mutation SaveFile($id:ID!, $fileUrl:String!) {
    updateSavedFiles(id:$id, fileUrl:$fileUrl) {
      savedFiles
    }
  }
`);