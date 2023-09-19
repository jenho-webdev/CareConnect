const mongoose = require('mongoose');
const { Schema } = mongoose;
const requestSchema = new Schema({
    requestTitle: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    requestText: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},  {
    timestamps: true
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;