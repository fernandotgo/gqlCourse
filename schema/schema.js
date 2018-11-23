const graphql = require ('graphql');
const _ = require ('lodash');

//Defines the schema

const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

//list of users

const users = [
    { id: '23', firstName: 'Fernando', age: 38},
    { id: '44', firstName: 'Lisa', age: 35 }
];

//Defines the type and teaches GQL the types of the app
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
});

// Root query receives all the queries for the App
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString }},
            resolve(parentValue, args){
                return _.find(users, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
