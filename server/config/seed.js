const db = require('./connection');
const { User, Request } = require('../models')

db.once('open', async () => {
    await User.deleteMany();
    const user1 = new User({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "johnpassword123",
        zip: "12345",
        helpCircle: [],
        requests: [],
        offers: [],
        friendRequests: []
    });
    const user2 = new User({
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        password: "janepassword123",
        zip: "54321",
        helpCircle: [],
        requests: [],
        offers: [],
        friendRequests: []
    });
    const user3 = new User({
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        password: "alicepassword123",
        zip: "98765",
        helpCircle: [],
        requests: [],
        offers: [],
        friendRequests: []
    });

    await user1.save();
    await user2.save();
    await user3.save();
    console.log('Successfully seeded users.');

    // Update helpCircle relationships.
    user1.helpCircle.push(user2._id);
    user2.helpCircle.push(user1._id, user3._id);
    user3.helpCircle.push(user2._id);

    // user1 sends a friend request to user3.
    user3.friendRequests.push(user1._id);

    // Save updated users to database.
    await user1.save();
    await user2.save();
    await user3.save();
    console.log('Updated helpCircle relationships and friend requests.');

    await Request.deleteMany();

    const requests = await Request.insertMany([
        {
            requestTitle: "Ride to Appointment",
            requestText: "lsidfgb vsieru bvseirubvs eirub vsirb",
            location: "123 Elm Street, Springfield",
            type: "Ride",
            startTime: "2023-09-15T15:30:00",
            endTime: "2023-09-15T16:30:00",
            status: "Open",
            owner: user1._id,
            participants: [user2._id]
        },
        {
            requestTitle: "Help cooking",
            requestText: "dfrgtrst dfghhdfgny sdgvdf dsg df",
            location: "456 Oak Avenue, Shelbyville",
            type: "Meals",
            startTime: "2023-09-16T12:00:00",
            endTime: "2023-09-16T13:00:00",
            status: "Closed", 
            owner: user2._id, 
            participants: [user1._id, user3._id]
        },
        {
            requestTitle: "Help Logging In",
            requestText: "erg sertgrhbeth sd dfhsrthr serkjgbse",
            location: "789 Pine Place, Capital City",
            type: "Elderly Tech Support",
            startTime: "2023-09-17T10:00:00",
            endTime: "2023-09-17T11:00:00",
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
