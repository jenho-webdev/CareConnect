import React from 'react';

// Components
import Offer from './Offer';

const OffersList = (props) => {
    return (
        <div>
            {/* TODO: Pass in list title */}
            <h2>List Title</h2>
            <div>
                {/* TODO: Pass in list title */}
                <OffersList />
                <OffersList />
                <OffersList />
                <OffersList />
                <OffersList />
            </div>
        </div>
    );
};

export default OffersList;
