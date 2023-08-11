import { gql } from '@apollo/client';

export default gql(`
  mutation SaveJob($id:ID!, $jobId:Int!) {
    updateSavedJobs(id:$id, jobId:$jobId) {
      savedJobs
    }
  }
`);