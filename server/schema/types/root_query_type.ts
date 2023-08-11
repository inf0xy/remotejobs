import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';
import UserType from './user_type';
import JobType from './job_type';
import {
  getJobs,
  getJobDetail,
  fetchSaveJobs
} from '../../databases';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    jobs: {
      type: new GraphQLObjectType({
        name: 'Jobs',
        fields: () => ({
          jobs: { type: new GraphQLList(JobType) },
          count: { type: GraphQLInt }
        })
      }),
      args: {
        page: { type: GraphQLInt },
        searchTerm: { type: GraphQLString },
        jobType: { type: GraphQLString },
        locationFilter: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const { page, searchTerm, jobType, locationFilter } = args;
        return getJobs(page, searchTerm, jobType, locationFilter);
      }
    },
    job: {
      type: JobType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) }},
      resolve(parentValue, { id }) {
        return getJobDetail(id);
      }
    },
    savedJobs: {
      type: new GraphQLList(JobType),
      args: { userId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { userId }) {
        return fetchSaveJobs(userId);
      }
    },
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    }
  })
});

export default RootQueryType;