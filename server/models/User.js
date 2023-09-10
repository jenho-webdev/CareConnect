const mongoose = require('mongoose');
const { Schema } = mongoose;
// Require bcrypt for password hashing.
const bcrypt = require('bcrypt');

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
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'Request'
    }],
    offers: [{
        type: Schema.Types.ObjectId,
        ref: 'Request'
    }],
    password: {
        type: String,
        required: true,
        minlength: 8
    }
})

// Set up mongoose hooks to hash passwords using bcrypt. Need to pass next as it is a middleware in User creation.
userSchema.pre('save', async function(next) {
    // Mongoose properties check if User document is new or if the password field has been changed since the lat time it was stored. 
    // || this.isModified('password') needed if rest password feature added
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        // Change the password value using bcrypt. Bcrypt itself will take the password provided and do 10 rounds of hashing.
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
