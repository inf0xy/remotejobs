import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} from 'graphql';
import UserType from './types/user_type';
import AuthService from '../services/auth';
import { updateJobList, updateUserFiles } from '../databases';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        return AuthService.logout(req)
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      }
    },
    updateSavedJobs: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        jobId: { type: GraphQLInt }
      },
      resolve(parentValue, { id, jobId }, req) {
        return updateJobList(id, jobId);
      }
    },
    updateSavedFiles: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        fileUrl: { type: GraphQLString }
      },
      resolve(parentValue, { id, fileUrl }, req) {
        return updateUserFiles(id, fileUrl);
      }
    }
  }
});

export default mutation;