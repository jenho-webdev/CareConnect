// Import Apollo server modules.
const { ApolloServer } = require('apollo-server-express')
// Import typeDefs and resolvers.
// const { typeDefs, resolvers } = require('./schemas')
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

const server = new ApolloServer({
    typeDefs,
    resolvers,
})
// Set up parsing middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// 


// Open connection to db.
db.once('open', () => {
    console.log('Connection to db successful')
    // Start server.
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    }) 
})
