const { User, Request } = require('../models');
// Import the necessary method for signing token.
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getAllUsers: async () => { 
            return await User.find().populate('helpCircle requests offers');
        },
        getAllRequests: async () => { 
            // Need to populate. Documents are not making use of subdocuments, _id's are being used to reference other documents. 
            return await Request.find().populate('owner participants');
        },
    },

    Mutation: {
        
        signUp: async (_, { firstName, lastName, email, password }) => {
            // Create a new user with details from request.
            const newUser = await User.create({ firstName, lastName, email, password });
            // Generate JWT for the new user using signToken method from auth.js.
            const token = signToken(newUser);
            // Return the token and all the new user's details to front end for storage. Sort info wanted on front end mutation.  
            return { token, newUser};
        }
    }
}

module.exports = resolvers;