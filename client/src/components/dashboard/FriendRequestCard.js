import React from 'react';

// Images
import AddIcon from '../../assets/icons/AddIcon';
import RemoveIcon from '../../assets/icons/RemoveIcon';
import UserPhoto from '../../assets/user-placeholder.jpg';

const FriendRequestCard = (props) => {
    return (
        <div className='friend-card flex-row flex-center-y'>
            <img src={UserPhoto} alt='User' className='shadow' />
            <h2>Requester Name</h2>
            <AddIcon/>
            <RemoveIcon />
        </div>
    );
}

export default FriendRequestCard;