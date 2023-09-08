// Require Apollo Express to make typeDefs.
const { gql } = require('apollo-server-express') 
// Define typeDefs.
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
        owner: User
        participants: [User]
    }
`;
// Export typeDefs
module.exports = typeDefs;

