import React, { useEffect } from 'react';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

const Request = () => {

    //! Dummy data
    const request = [
        {
            id: 1,
            title: 'Request 1',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        },
        {
            id: 2,
            title: 'Request 2',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        },
        {
            id: 3,
            title: 'Request 3',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        }
    ];





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