import React from 'react';

const FriendCard = (props) => {
    return (
        <div className='friend-card flex-row flex-center-y'>
            <h2>Friend Name</h2>
            <a>(View Profile Button)</a>
        </div>
    );
}

export default FriendCard;