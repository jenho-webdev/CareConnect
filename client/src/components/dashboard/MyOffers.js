import React from 'react';

// Components
import RequestCard from './RequestCard';

const MyOffers = (props) => {
    return (
        <div className='offers-list'>
            {/* TODO: Pass in list title */}
            <h1>My Offers</h1>
            <h3>Accepted Listings</h3>
            <div>
                {/* TODO: Pass in list title */}
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
            </div>
        </div>
    );
};

export default MyOffers;
