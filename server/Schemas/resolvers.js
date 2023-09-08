// Require models in order to provide resolver a way to interact with the db.
const { User, Request } = require('../models');
// Define Resolvers (Queries and mutations).
const resolvers = {
    Query: {
        getAllUsers: async () => {
            // Use mongoose model to get all users. 
            return await User.find();
        }
    }
}

module.exports = resolvers;