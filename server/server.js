// Import express module.
const express = require('express')
// Import path module.
const path = require ('path')
// Require connection to MongoDB through Mongoose.
const db = require('./config/connection')
// Specify server listening port for production and development.
const PORT = process.env.PORT || 3001;
// Initialize a new instance of the Express application.
const app = express();
// Set up parsing middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// app.get('/test', (req, res) => {
//     res.json({ working: true })
// })

// Open connection to db.
db.once('open', () => {
    console.log('Connection to db successful')
    // Start server.
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    }) 
})
