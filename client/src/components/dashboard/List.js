import React from 'react';

// Components
import Card from './Card';

const List = (props) => {
    return (
        <div>
            <h2>{props.title}</h2>

            {/* List 10 cards max */}
            <div>
                {props.requests.slice(0, 10).map((request) => (
                    <Card key={request.id} request={request} />
                ))}
            </div>
        </div>
    );
};

export default List;
