import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    savedJobs: { type: new GraphQLList(GraphQLInt) },
    savedFiles: { type: new GraphQLList(GraphQLString) }
  })
});

export default UserType;