import React from 'react';

// Components
import Offer from './Offer';

const Offers = (props) => {
    return (
        <div>
            {/* TODO: Pass in list title */}
            <h2>List Title</h2>
            <div>
                {/* TODO: Pass in list title */}
                <Offer />
                <Offer />
                <Offer />
                <Offer />
                <Offer />
            </div>
        </div>
    );
};

export default Offers;
