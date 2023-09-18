import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyOffers from "../components/dashboard/MyOffers";
import Calendar from "../components/calendar/RequestsCalendar";
import Friends from '../components/dashboard/Friends';

// Utils
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

// Images
import UserPhoto from "../assets/user-placeholder.jpg";
import LocationIcon from "../assets/icons/LocationIcon.jsx";

const Dashboard = () => {
    const [showFriends, setShowFriends] = useState(false);

    const toggleFriendsDisplay = () => {
        setShowFriends(!showFriends);
    };

    useEffect(() => {
        document.title = "CareConnect | My Dashboard";
    }, []);
    const { loading, data } = useQuery(QUERY_ME);

    const user = data?.me || {};

    return (
        <div className="dashboard">
            <Header />

            {showFriends && (
                <div className="overlay" onClick={toggleFriendsDisplay}>
                    <div className="friends-popup shadow-harsh">
                        <Friends />
                    </div>
                </div>
            )}

            <main className="full-width flex-column flex-center-y">
                <div className="user-banner flex-row flex-center-y">
                    <img src={UserPhoto} alt="User" className="shadow"/>
                    <div className="user-details">
                        <h1>{user.firstName} {user.lastName}</h1>
                        <div className="flex-row flex-center-y">
                            <LocationIcon />
                            <p>{user.zip}</p>
                        </div>
                    </div>
                    <div className="user-friends">
                        <button onClick={toggleFriendsDisplay}>Friends</button>
                    </div>
                </div>
                

                <div className="flex-row flex-center-xy">
                    <div className="dashboard-column-left flex-center-xy">
                        <Calendar request={user.requests} />
                    </div>

                    <div className="dashboard-column-right flex-center-xy my-offers shadow">
                        <MyOffers />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
