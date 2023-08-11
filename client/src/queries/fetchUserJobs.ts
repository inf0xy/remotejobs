import { gql } from '@apollo/client';

export default gql(`
  query FetchUserJobs($userId:ID!) {
    savedJobs(userId:$userId) {
      id,
      title,
      category,
      location,
      company_name,
      company {
        logo
      },
      tags,
      salary,
      job_type,
      publication_date,
      url,
      description
    }
  }
`);