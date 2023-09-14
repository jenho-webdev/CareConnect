import React, { useEffect } from 'react';

const Request = () => {
    useEffect(() => {
        document.title = 'CareConnect | '; // TODO: Pass in request title
    }, []);

    return (
        <div>
            {/* TODO: 
                Title
                Description
                Other details...
                Sign Up Button (if not creator of request)
            */}
        </div>
    );
};

export default Request;