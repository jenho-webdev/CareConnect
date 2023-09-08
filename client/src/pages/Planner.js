import React, { useEffect } from 'react';

// Components
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';
import RequestToolbar from '../components/RequestToolbar';
import DateDisplay from '../components/DateDisplay';
import Footer from '../components/Footer';

const Planner = () => {
    useEffect(() => {
        document.title = 'CareConnect | Planner';
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <Filter />
                <RequestToolbar />
            </div>
            <DateDisplay />
            <main>
            </main>
            <Footer />
        </div>
    );
};

export default Planner;
