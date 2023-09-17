import React, { useEffect } from 'react';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import List from '../components/dashboard/List';

const Dashboard = () => {
    useEffect(() => {
        document.title = 'CareConnect | My Dashboard';
    }, []);

    return (
        <div>
            <Header />
            <main>
                <h1>My Dashboard</h1>
                <List title="My Offers" offers={offers} />
                <List title="My Requests" requests={requests} />
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;