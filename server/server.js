// Import Apollo server modules.
const { ApolloServer } = require('apollo-server-express')
// Import typeDefs and resolvers.
const { typeDefs, resolvers } = require('./Schemas')
// Import express module.
const express = require('express')
// Import path module.
const path = require ('path')
// Connect to db.
const db = require('./config/connection')
// Specify server listening port for production and development.
const PORT = process.env.PORT || 3001;
// Initialize a new instance of the Express application.
const app = express();
// create a new instance of the ApolloServer with GraphQL schema. 
const server = new ApolloServer({
    typeDefs,
    resolvers,
})
// Set up parsing middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// 

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
    console.log('Successfully started Apollo server.')
    // Open connection to db.
    db.once('open', () => {
        console.log('Connection to db successful')
        // Start server.
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        }) 
    })
}

// Start the server.
startApolloServer();
