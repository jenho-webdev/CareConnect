import React from 'react';

// Images
import AddIcon from '../../assets/icons/AddIcon';
import RemoveIcon from '../../assets/icons/RemoveIcon';

const FriendRequestCard = (props) => {
    return (
        <div className='friend-card flex-row flex-center-y'>
            <h2>Requester Name</h2>
            <AddIcon/>
            <RemoveIcon />
        </div>
    );
}

export default FriendRequestCard;