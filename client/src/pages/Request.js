import React, { useEffect } from 'react';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

const Request = () => {
    useEffect(() => {
        document.title = 'CareConnect | '; // TODO: Pass in request title
    }, []);

    return (
        <div>
            <Header />
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