import React, { useEffect } from 'react';

const NotFound = () => {
    useEffect(() => {
        document.title = 'CareConnect | Error 404: Page Not Found';
    }, []);

    return (
        <main>
            <h1>Error 404:</h1>
            <p>The requested page could not be found.</p>
        </main>
    );
};

export default NotFound;
