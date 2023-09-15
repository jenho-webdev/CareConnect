import React, { useEffect } from 'react';

const Request = () => {
    useEffect(() => {
        document.title = 'CareConnect | '; // TODO: Pass in request title
    }, []);

    return (
        <div>
            <Header />
            {/* TODO: 
                Title
                Description
                Other details...
                Sign Up Button (if not creator of request)
            */}
            <main>
                <h1>{request.title}</h1>
                <p>{request.description}</p>
                {/* Other request details */}
                <button type="button">
                    Sign Up
                </button>
            </main>
            <Footer />
        </div>
    );
};

export default Request;