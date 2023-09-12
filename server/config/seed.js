const db = require('./connection');
const { User, Request } = require('../models')

db.once('open', async () => {
    await User.deleteMany();
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

    await user1.save();
    await user2.save();
    await user3.save();
    console.log('Successfully seeded users.');

    // Update helpCircle relationships.
    user1.helpCircle.push(user2._id);
    user2.helpCircle.push(user1._id, user3._id);
    user3.helpCircle.push(user2._id);

    // Save updated users to database
    await user1.save();
    await user2.save();
    await user3.save();
    console.log('Updated helpCircle relationships.');

    await Request.deleteMany();

    const requests = await Request.insertMany([
        {
            location: "123 Elm Street, Springfield",
            type: "Ride",
            time: "15:30",
            date: "2023-09-15",
            status: "Open",
            owner: user1._id,
            participants: [user2._id]
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
            participants: [user1._id]
        },
    ])
    console.log('Successfully seeded requests.');

    // Update user requests array.
    for (let request of requests) {
        let user = await User.findById(request.owner);
        user.requests.push(request._id);
        await user.save();
    }
    console.log('Updated user requests.');

    // Update user offers array.
    for (let request of requests) {
        for (let participantId of request.participants) {
            let user = await User.findById(participantId);
            user.offers.push(request._id);
            await user.save();
        }
    }
    console.log('Updated user offers.');



    process.exit();
})
