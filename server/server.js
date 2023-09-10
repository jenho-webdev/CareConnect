const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./Schemas')
const express = require('express')
const path = require ('path')
const db = require('./config/connection')

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
    console.log('Successfully started Apollo server.')

    db.once('open', () => {
        console.log('Connection to db successful')

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Access Apollo Sandbox at http://localhost:${PORT}${server.graphqlPath}`);
        }) 
    })
};

startApolloServer();
