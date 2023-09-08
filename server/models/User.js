// Require mongoose modules.
const mongoose = require('mongoose');
// Require schema module from mongoose.
const { Schema } = mongoose;
// Define User schema.
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    helpCircle: [{
        // Expects _id of other user.
        type: Schema.Types.ObjectId,
        // Specifies User model.
        ref: 'User'
    }],
    requests: [{
        // Expects _id of other requests made by the user.
        type: Schema.Types.ObjectId,
        // Specifies Request model.
        ref: 'Request'
    }],
    offers: [{
        // Expects _id of requests made by other users.
        type: Schema.Types.ObjectId,
        // Specifies Request model.
        ref: 'Request'
    }],
    password: {
        type: String,
        required: true,
        minlength: 8
    }
})
// Compile User schema into model.
const User = mongoose.model('User', userSchema);
// Export model.
module.exports = User;
