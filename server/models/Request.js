const mongoose = require('mongoose');
const { Schema } = mongoose;
const requestSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
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
})

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;