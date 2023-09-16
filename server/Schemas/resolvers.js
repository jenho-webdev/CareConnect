const { AuthenticationError } = require('apollo-server-express');
const { User, Request } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getAllUsers: async () => { 
            return await User.find().populate('helpCircle requests offers');
        },
        getUsersByName: async (_, { firstName, lastName }) => {
            return User.find({ firstName, lastName }).populate('helpCircle requests offers');
        },
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
        getRequestById: async (_, { requestId }) => {
            return Request.findOne({ _id: requestId })
                .populate('owner', '_id firstName lastName')
                .populate('participants', '_id firstName lastName');
        },
        getAllRequests: async () => {  
            return await Request.find().populate('owner participants');
        },
        me: async (_, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('helpCircle requests offers');
              }
              throw new AuthenticationError('User not found.')
        }
    },

    Mutation: {
        
        signUp: async (_, { firstName, lastName, email, zip, password }) => {
            try {
                const newUser = await User.create({ firstName, lastName, email, zip, password });
                const token = signToken(newUser);
                return { token, newUser};
            } catch (error) {
                console.log(error)
            }
            
        },
        login: async (_, { email, password }) => {
            const foundUser = await User.findOne({ email });

            if(!foundUser) {
                throw new AuthenticationError('User not found.');
            }

            const checkPassword = await foundUser.isPasswordCorrect(password);

            if (!checkPassword) {
                throw new AuthenticationError('Wrong password.');
            }

            const token = signToken(foundUser); 

            return { token, foundUser };
        },
        deleteRequest: async (_, { requestId }, context) => {
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
        },
        createRequest: async (_, { requestTitle, location, type, startTime, endTime, requestText }, context) => {
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
        },
        offerHelp: async (_, { requestId }, context) => {
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
        },
        cancelHelp: async (_, { requestId }, context) => {
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
        },
    }
}

module.exports = resolvers;