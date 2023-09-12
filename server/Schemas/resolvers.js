const { AuthenticationError } = require('apollo-server-express');
const { User, Request } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getAllUsers: async () => { 
            return await User.find().populate('helpCircle requests offers');
        },
        // Get one users based on first and last name.
        getUsersByName: async (_, { firstName, lastName }) => {
            return User.find({ firstName, lastName }).populate('helpCircle requests offers');
        },
        // Get one user based on _id.
        getUserById: async (_, { _id }) => {
            return User.findOne({ _id })
                .populate('helpCircle', '_id firstName lastName')
                .populate({
                    path: 'requests',
                    populate: {
                        path: 'owner participants',
                        select: '_id firstName lastName'
                    }
                })
                .populate({
                    path: 'offers',
                    populate: {
                        path: 'owner participants',
                        select: '_id firstName lastName'
                    }
                });
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
            const foundUser = await User.findOne({ email });

            if(!foundUser) {
                throw new AuthenticationError('User not found.')
            }

            const checkPassword = await foundUser.isPasswordCorrect(password);

            if (!checkPassword) {
                throw new AuthenticationError('Wrong password.');
            }

            const token = signToken(foundUser); 

            return { token, foundUser };
        },
        deleteRequest: async (_, { requestId }, context) => {
            // Use context (authMiddleWare to verify if user is authenticated.)
            if (context.user) {
                // Delete the request tied to the provided ID (By front-end) AND authored by the authenticated user.
                const deletedRequest = await Request.findOneAndDelete({
                    _id: requestId,
                    requestAuthor: context.user.email,
                });
                // update the user's list of requests to remove the deleted request.
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { requests: deletedRequest._id } }
                );
                // Return the details of the deleted request in the case that the front-end needs them.
                return deletedRequest;
            }
            // If no user is authenticated, throw an error.
            throw new AuthenticationError('Unauthorized request.');
        }
    }
}

module.exports = resolvers;