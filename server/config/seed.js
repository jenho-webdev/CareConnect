// Connect to db.
const db = require('./connection');
// Import models.
const { User, Request } = require('../models')
// Open connection to db.
db.once('open', async () => {
    // Delete all User documents.
    await User.deleteMany();
    // Insert users. Assign to variable so that it is accessible when seeding requests.  
    const users = await User.insertMany([
        {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            password: "johnpassword123",
            helpCircle: [],
            requests: [],
            offers: []
        },
        {
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            password: "janepassword123",
            helpCircle: [],
            requests: [],
            offers: []
        },
        {
            firstName: "Alice",
            lastName: "Johnson",
            email: "alice.johnson@example.com",
            password: "alicepassword123",
            helpCircle: [],
            requests: [],
            offers: []
        },
    ]);
    console.log('Successfully seeded users.');

    await Request.deleteMany();

    const requests = await Request.insertMany([
        {
            location: "123 Elm Street, Springfield",
            type: "Ride",
            time: "15:30",
            date: "2023-09-15",
            status: "Open",
            owner: users[0]._id,
            participants: []
        },
        {
            location: "456 Oak Avenue, Shelbyville",
            type: "Meals",
            time: "12:00",
            date: "2023-09-16",
            status: "Closed",
            // Access users variable to assign owners and participants. 
            owner: users[1]._id, 
            participants: [users[0]._id, users[2]._id]
        },
        {
            location: "789 Pine Place, Capital City",
            type: "Elderly Tech Support",
            time: "10:00",
            date: "2023-09-17",
            status: "Open",
            owner: users[2]._id, 
            participants: []
        },
    ])
    console.log('Successfully seeded requests.');
    // Exit seeding.
    process.exit();
})
