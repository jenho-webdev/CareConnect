const { AuthenticationError, ApolloError } = require('apollo-server-express');
const { User, Request } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getAllUsers: async () => {
            try {
                return await User.find().populate('helpCircle requests offers');
            } catch (error) {
                throw new ApolloError(`Error fetching all users: ${error.message}.`);
            }
        },
        getUsersByName: async (_, { firstName, lastName }) => {
            try {
                return await User.find({ firstName, lastName }).populate('helpCircle requests offers');
            } catch (error) {
                throw new ApolloError(`Error fetching users by name: ${error.message}.`);
            }
        },
        getUserById: async (_, { _id }) => {
            try {
                return await User.findOne({ _id })
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
            } catch (error) {
                throw new ApolloError(`Error fetching user by id: ${error.message}.`);
            }
        },
        getRequestById: async (_, { requestId }) => {
            try {
                return await Request.findOne({ _id: requestId })
                    .populate('owner', '_id firstName lastName')
                    .populate('participants', '_id firstName lastName');
            } catch (error) {
                throw new ApolloError(`Error fetching request by id: ${error.message}.`);
            }
        },
        getAllRequests: async () => {
            try {
                return await Request.find().populate('owner participants');
            } catch (error) {
                throw new ApolloError(`Error fetching all requests: ${error.message}.`);
            }
        },
        getMyRequests: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to view your requests.');
            }
            try {
                return await Request.find({ owner: context.user._id })
                    .populate('owner', '_id firstName lastName')
                    .populate('participants', '_id firstName lastName');
            } catch (error) {
                throw new ApolloError(`Error fetching requests: ${error.message}.`);
            }
        },
        getMyHelpCircle: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to view your help circle.');
            }
            try {
                return await User.findOne({ _id: context.user._id })
                    .populate('helpCircle', '_id firstName lastName email zip');
            } catch (error) {
                throw new ApolloError(`Error fetching help circle: ${error.message}.`);
            }
        },
        getMyOffers: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to view your offers.');
            }
            try {
                return await Request.find({ participants: context.user._id })
                    .populate('owner', '_id firstName lastName zip')
                    .populate('participants', '_id firstName lastName zip');
            } catch (error) {
                throw new ApolloError(`Error fetching request by id: ${error.message}.`);
            }
        },
        me: async (_, args, context) => {
            try {
                if (context.user) {
                    return await User.findOne({ _id: context.user._id }).populate('helpCircle requests offers');
                }
            } catch (error) {
                throw new ApolloError(`Error fetching user: ${error.message}.`);
            }
        }
    },
    Mutation: {
        signUp: async (_, { firstName, lastName, email, zip, password }) => {
            try {
                const newUser = await User.create({ firstName, lastName, email, zip: String(zip), password });
                const token = signToken(newUser);
                return { token, newUser };
            } catch (error) {
                throw new ApolloError(`Error creating user: ${error.message}.`);
            }
        },
        login: async (_, { email, password }) => {
            try {
                const foundUser = await User.findOne({ email });
        
                if (!foundUser) {
                    throw new AuthenticationError('User not found.');
                }
        
                const checkPassword = await foundUser.isPasswordCorrect(password);
        
                if (!checkPassword) {
                    throw new AuthenticationError('Wrong password.');
                }
        
                const token = signToken(foundUser);
                return { token, foundUser };
            } catch (error) {
                throw new ApolloError(`Error during login: ${error.message}.`);
            }
        },
        deleteRequest: async (_, { requestId }, context) => {
            try {
                if (context.user) {
                    const deletedRequest = await Request.findOneAndDelete({
                        _id: requestId,
                        requestAuthor: context.user.email,
                    });
        
                    await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { requests: deletedRequest._id } }
                    );
                    return deletedRequest;
                }
                throw new AuthenticationError('Unauthorized request.');
            } catch (error) {
                throw new ApolloError(`Error deleting request: ${error.message}.`);
            }
        },
        createRequest: async (_, { requestTitle, location, type, startTime, endTime, requestText }, context) => {
            try {
                if (context.user) {
                    const createRequest = await Request.create({
                        requestTitle,
                        location,
                        type,
                        startTime,
                        endTime,
                        status: "available",
                        requestText,
                        owner: context.user._id
                    });
        
                    await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $push: { requests: createRequest._id } }
                    );
                    return createRequest;
                }
                throw new AuthenticationError('Unauthorized request.');
            } catch (error) {
                throw new ApolloError(`Error creating request: ${error.message}.`);
            }
        },
        offerHelp: async (_, { requestId }, context) => {
            try {
                if (context.user) {
                    const addOffer = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $push: { offers: requestId } }
                    );
        
                    await Request.findByIdAndUpdate(
                        { _id: requestId },
                        { $push: { participants: context.user._id } }
                    )
                    return addOffer;
                }
                throw new AuthenticationError('Unauthorized request.');
            } catch (error) {
                throw new ApolloError(`Error offering help: ${error.message}.`);
            }
        },
        cancelHelp: async (_, { requestId }, context) => {
            try {
                if (context.user) {
                    const removeOffer = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { offers: requestId } }
                    );
        
                    await Request.findByIdAndUpdate(
                        { _id: requestId },
                        { $pull: { participants: context.user._id } }
                    )
                    return removeOffer;
                }
                throw new AuthenticationError('Unauthorized request.');
            } catch (error) {
                throw new ApolloError(`Error canceling help: ${error.message}.`);
            }
        }
    }
}

module.exports = resolvers;