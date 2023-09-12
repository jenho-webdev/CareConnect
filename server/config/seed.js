const db = require('./connection');
const { User, Request } = require('../models')

db.once('open', async () => {
    await User.deleteMany();  
    // Created user instances instead as the pre hook only works with the save method.
    const user1 = new User({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "johnpassword123",
        helpCircle: [],
        requests: [],
        offers: []
    });
    const user2 = new User({
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        password: "janepassword123",
        helpCircle: [],
        requests: [],
        offers: []
    });
    const user3 = new User({
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        password: "alicepassword123",
        helpCircle: [],
        requests: [],
        offers: []
    });

    // Save users (this will invoke the pre('save') middleware and hash the passwords)
    await user1.save();
    await user2.save();
    await user3.save();
    console.log('Successfully seeded users.');

    await Request.deleteMany();

    const requests = await Request.insertMany([
        {
            location: "123 Elm Street, Springfield",
            type: "Ride",
            time: "15:30",
            date: "2023-09-15",
            status: "Open",
            owner: user1._id,
            participants: []
        },
        {
            location: "456 Oak Avenue, Shelbyville",
            type: "Meals",
            time: "12:00",
            date: "2023-09-16",
            status: "Closed", 
            owner: user2._id, 
            participants: [user1._id, user3._id]
        },
        {
            location: "789 Pine Place, Capital City",
            type: "Elderly Tech Support",
            time: "10:00",
            date: "2023-09-17",
            status: "Open",
            owner: user3._id, 
            participants: []
        },
    ])
    console.log('Successfully seeded requests.');

    process.exit();
})
