import React from 'react';

const Offer = () => {
    // const { title, description } = props;

    // Cut long descriptions and add ellipsis
    /* const truncateDescription = (text, maxLength) => {
        if (typeof text !== 'string' || text.length <= maxLength) {
            return text;
        }
        
        const truncatedText = text.substr(0, maxLength);
        
        // Make sure the last character isn't a space
        if (truncatedText[truncatedText.length - 1] === ' ') {
            return truncatedText.substr(0, truncatedText.lastIndexOf(' ')) + '...';
        } else {
            return truncatedText + '...';
        }
    };
    */

    return (
        <div className='my-offers-request'>
            <h2>Request User</h2>
            <p>Request Title</p>
        </div>
    );
}

export default Offer;
