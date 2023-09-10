const { gql } = require('apollo-server-express') 

// signUp resolver returns an object with two properties (token and newUser). This returns an object that aligns with the Auth type definition. Useful for returning both the token and the user. 
const typeDefs = gql`
    type User{
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        helpCircle: [User]
        requests: [Request]
        offers: [Request]
    }

    type Request{
        _id: ID!
        location: String!
        type: String!
        time: String!
        date: String!
        status: String!
        owner: User!
        participants: [User]
    }

    type Query {
        getAllUsers: [User]
        getAllRequests: [Request]
    }

    type Mutation {
        signUp(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    }

    type Auth {
        token: String!
        newUser: User!
    }
`;

module.exports = typeDefs;

