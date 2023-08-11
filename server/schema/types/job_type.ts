import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

const JobType = new GraphQLObjectType({
  name: 'Job',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    category: { type: GraphQLString },
    location: { type: GraphQLString },
    company_name: { type: GraphQLString },
    company: {
      type: new GraphQLObjectType({
        name: 'Logo',
        fields: () => ({
          logo: { type: GraphQLString }
        })
      })
     },
    tags: { type: new GraphQLList(GraphQLString) },
    salary: { type: GraphQLString },
    job_type: { type: GraphQLString },
    publication_date: { type: GraphQLString },
    url: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

export default JobType;