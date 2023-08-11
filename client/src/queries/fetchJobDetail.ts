import { gql } from '@apollo/client';

export default gql(`
  query FetchJobDetail($id: ID!) {
    job(id: $id) {
      id,
      title,
      location,
      category,
      job_type,
      salary,
      company_name,
      company {
        logo
      },
      tags,
      publication_date,
      url,
      description
    }
  }
`);


