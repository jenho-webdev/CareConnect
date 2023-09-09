const { User, Request } = require('../models');

const resolvers = {
    Query: {
        getAllUsers: async () => { 
            return await User.find().populate('helpCircle requests offers');
        },
        getAllRequests: async () => { 
            // Need to populate. Documents are not making use of subdocuments, _id's are being used to reference other documents. 
            return await Request.find().populate('owner participants');
        }
    }
}

module.exports = resolvers;