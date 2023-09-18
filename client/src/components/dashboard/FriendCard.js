import React from 'react';

// Images
import User from '../../assets/icons/User';
import Remove from '../../assets/icons/RemoveIcon';
import UserPhoto from '../../assets/user-placeholder.jpg';

const FriendCard = (props) => {
    return (
        <div className='friend-card flex-row flex-center-y'>
            <img src={UserPhoto} alt='User' className='shadow' />
            <h2>Friend Name</h2>
            <User />
            <Remove />
        </div>
    );
}

export default FriendCard;