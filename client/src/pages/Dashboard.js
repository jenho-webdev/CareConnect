import React, { useState, useEffect } from 'react';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyOffers from '../components/dashboard/MyOffers';
import Calendar from '../components/calendar/RequestsCalendar';
import Friends from '../components/dashboard/Friends';

// Images
import UserPhoto from '../assets/user-placeholder.jpg';
import LocationIcon from '../assets/location-icon.jsx';

const Dashboard = () => {
    const [showFriends, setShowFriends] = useState(false);

    const toggleFriendsDisplay = () => {
        setShowFriends(!showFriends);
    };

    useEffect(() => {
        document.title = 'CareConnect | My Dashboard';
    }, []);

    return (
        <div className='dashboard'>
            <Header />

            {showFriends && (
                <div className="overlay" onClick={toggleFriendsDisplay}>
                    <div className="friends-popup">
                        <Friends />
                    </div>
                </div>
            )}

            <main className="full-width">
                <div className="user-banner flex-row flex-center-y">
                    <img src={UserPhoto} alt="User" />
                    <div className='user-details'>
                        <h1>User Name</h1>
                        <div className="flex-row flex-center-y">
                            <LocationIcon />
                            <p>Location</p>
                        </div>
                    </div>
                    <div className='user-friends'>
                        {/* Friends button to view friends list & requests*/}
                        <button onClick={toggleFriendsDisplay}>Friends</button>
                    </div>
                </div>

                <div className='flex-row flex-center-xy'>
                    <div className="dashboard-column-left flex-center-xy">
                        <Calendar />
                    </div>
    
                    <div className="dashboard-column-right flex-center-xy my-offers">
                        <MyOffers />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;