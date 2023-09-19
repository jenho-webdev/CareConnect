const path = require ('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/careconnect') 
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/careconnect') 

module.exports = mongoose.connection;