import React from 'react';

// Components
import FriendCard from './FriendCard';

const Friends = (props) => {
    return (
        <div>
            <h1>Friends</h1>
            <div className='friends-list'>
                <FriendCard />
                <FriendCard />
                <FriendCard />
                <FriendCard />
                <FriendCard />
            </div>
            <h1>Friend Requests</h1>
            <div className='friend-requests'>
                <FriendCard />
                <FriendCard />
                <FriendCard />
                <FriendCard />
                <FriendCard />
            </div>
        </div>
    );
}

export default Friends;