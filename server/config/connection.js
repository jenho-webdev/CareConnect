// Require mongoose modules.
const mongoose = require('mongoose');
// Connect to db using mongoose. Production or local.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/careconnect') 
// Export the the connection process.
module.exports = mongoose.connection;