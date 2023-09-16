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
    zip: {
        type: String,
        required: true,
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

userSchema.pre('save', async function(next) {
    // || this.isModified('password') needed if rest password feature added
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
