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
    if (!Auth.loggedIn()) return <Navigate replace to="/login" />;

    if (loading) return <div>Loading...</div>;

    const user = data?.me || {};
    const requests = data.me.requests || [];
    const offers = data.me.offers || [];

    //sample events array that needed to pass into calendar component
    // Event {
    //   title: string,
    //   start: Date,
    //   end: Date,
    //   allDay?: boolean
    //   resource?: any,
    // }

    const calEvents = requests.map((request) => {
        return {
        title: `${request.requestTitle}`,
        start: new Date(request.startTime),
        end: new Date(request.endTime),
        type: request.status,
        };
    });

    console.log(calEvents);

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
                            <LocationIcon/>
                            <p style={{ marginLeft: '5px' }}>{user.zip}</p>
                        </div>
                    </div>
                    <div className="user-friends">
                        <button onClick={toggleFriendsDisplay}>Friends</button>
                    </div>
                </div>
                

                <div className="flex-row flex-center-xy">
                    <div className="dashboard-column-left flex-center-xy">
                        <Calendar events={calEvents} />
                    </div>

        {/* <div className="flex-row flex-center-xy">
            <div className="dashboard-column-left flex-center-xy">
            <RequestList requests={user.requests} />
            </div>
        </div> */}

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
