const { User, Request } = require('../models');

const resolvers = {
    Query: {
        getAllUsers: async () => {
            // Use mongoose model to get all users. 
            return await User.find();
        }
    }
}

module.exports = resolvers;