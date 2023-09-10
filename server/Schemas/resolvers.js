const { AuthenticationError } = require('apollo-server-express');
const { User, Request } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getAllUsers: async () => { 
            return await User.find().populate('helpCircle requests offers');
        },
        getAllRequests: async () => {  
            return await Request.find().populate('owner participants');
        },
    },

    Mutation: {
        
        signUp: async (_, { firstName, lastName, email, password }) => {
            const newUser = await User.create({ firstName, lastName, email, password });
            const token = signToken(newUser);
            return { token, newUser};
        },
        login: async (_, { email, password }) => {
            // Find user with details from request.
            const foundUser = await User.findOne({ email });

            if(!foundUser) {
                throw new AuthenticationError('User not found.')
            }
            // Mongoose method will check if password passed in matches. Needs to be defined in User model.
            const checkPassword = await foundUser.isPasswordCorrect(password);

            if (!checkPassword) {
                throw new AuthenticationError('Wrong password.');
            }

            // Generate JWT for the found user using signToken method from auth.js.
            const token = signToken(foundUser);
            // Return the token and all the found user's details to front end for storage. Sort info wanted on front end mutation.  
            return { token, foundUser };
        }
    }
}

module.exports = resolvers;