import React, { useEffect } from 'react';

// Components
import Header from '../components/Header';

const NotFound = () => {
    useEffect(() => {
        document.title = 'CareConnect | Error 404: Page Not Found';
    }, []);

    return (
        <div className='not-found'>
            <Header />
            <div className='flex-center-xy flex-column'>
                <h1>Error 404:</h1>
                <p>The requested page could not be found.</p>
            </div>
        </div>
    );
};

export default NotFound;
