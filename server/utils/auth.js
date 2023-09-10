// Import required packages for signing token and using env variables.
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get JWT secret from environment variables.
const secret = process.env.JWT_SECRET;
// Set token expiration time
const expiration = '1h';

// Throw error if in production and the JWT secret isn't set.
if (process.env.NODE_ENV === 'production' && !secret) {
    throw new Error("JWT_SECRET is not set.");
}

module.exports = {
    // Method to sign a JWT token
  signToken: function ({ email, firstName, lastName, _id }) {
    // Define payload for the JWT token.
    const payload = { email, firstName, lastName, _id };
    // Return the signed JWT token using sign method from jsonwebtoken. Takes payload, secret, and expiration. 
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};