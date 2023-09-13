const { gql } = require('apollo-server-express') 

// signUp resolver returns an object with two properties (token and User). This returns an object that aligns with the Auth type definition. Useful for returning both the token and the user. Can make everything "user" to only need one type of auth. Client has to provide the items inside the types.
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

    type Request {
        _id: ID!
        requestTitle: String!
        requestText: String!
        owner: User!
        location: String!
        type: String!
        startTime: String!
        endTime: String!  
        createdAt: String!
        status: String!
        participants: [User]
    }

    type Query {
        getAllUsers: [User]
        getAllRequests: [Request]
        getUsersByName(
            firstName: String!, 
            lastName: String!
        ): [User]
        getUserById(
            _id: ID!
        ): User
        getRequestById(
            requestId: ID!
        ): Request
    }

    type Mutation {
        signUp(
            firstName: String!, 
            lastName: String!, 
            email: String!, 
            password: String!
        ): AuthSignUp
        login(
            email: String!, 
            password: String!
        ): AuthLogin
        deleteRequest(
            requestId: ID!
        ): Request
        createRequest(
            requestTitle: String!, 
            location: String!, 
            type: String!, 
            startTime: String!, 
            endTime: String!, 
            requestText: String!
        ): Request
    }

    type AuthSignUp {
        token: String!
        newUser: User!
    }

    type AuthLogin {
        token: String!
        foundUser: User!
    }
`;

module.exports = typeDefs;

