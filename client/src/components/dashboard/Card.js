import React from 'react';

const Card = (props) => {
    const { title, description } = props;

    // Cut long descriptions and add ellipsis
    const truncateDescription = (text, maxLength) => {
        if (text.length <= maxLength) return text;

        const truncatedText = text.substr(0, maxLength);

        // Make sure last character isn't a space
        if (truncatedText[truncatedText.length - 1] === ' ') {
            return truncatedText.substr(0, truncatedText.lastIndexOf(' ')) + '...';
        } else {
            return truncatedText + '...';
        }
    };

    return (
        <div>
            <h2>{title}</h2>
            <p>{truncateDescription(description, 100)}</p> {/* Truncate description to 100 characters */}
        </div>
    );
}

export default Card;
