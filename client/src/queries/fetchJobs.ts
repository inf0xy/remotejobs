import { gql } from '@apollo/client';

export default gql(`
  query FetchJobs($page: Int!, $searchTerm: String!, $jobType: String!, $locationFilter: String!) {
    jobs(page: $page, searchTerm: $searchTerm, jobType: $jobType, locationFilter: $locationFilter) {
      jobs {
        id,
        title,
        location,
        category,
        salary,
        job_type,
        company_name,
        company {
          logo
        },
        publication_date
      },
      count
    }
  }
`);