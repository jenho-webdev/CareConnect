const jwt = require('jsonwebtoken');
const path = require ('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const secret = process.env.JWT_SECRET;

if (!secret) {
  console.log('Not loading')
}

const expiration = '1h';

if (process.env.NODE_ENV === 'production' && !secret) {
    throw new Error("JWT_SECRET is not set.");
}

module.exports = {
  signToken: function ({ email, firstName, lastName, _id }) {
    const payload = { email, firstName, lastName, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  authMiddleware: function ({req}) {
    // Extract token from request. Determine on front-end how token will be sent  
    let token = req.body.token || req.query.token || req.headers.authorization;
    // If using request headers, modify token to correct format.
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    if (!token) {
        return req;
    }

    try {
    // jwt method verifies and decodes token and stores it in data.
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    // Attach decoded data (payload) to request so that handlers have access to data. For example, adding a request can make use of this method through context and both approve a user adding a request and can use { data } to assign a user _id to the request.
    req.user = data;
    } catch {
    console.log('Invalid token');
    }

    return req;
  }
};