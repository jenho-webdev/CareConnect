import React, { useEffect } from 'react';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import Offers from '../components/dashboard/Offers';
import Calendar from '../components/calendar/RequestsCalendar';

const Dashboard = () => {

    useEffect(() => {
        document.title = 'CareConnect | My Dashboard';
    }, []);

    return (
        <div>
            <Header />
            <main>
                <h1>User Name</h1>
                <Offers />
                <Calendar />
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;