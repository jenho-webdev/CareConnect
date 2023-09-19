import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyOffers from "../components/dashboard/MyOffers";
import Calendar from "../components/calendar/RequestsCalendar";
import Friends from "../components/dashboard/Friends";
import Loading from "../components/dashboard/Loading";
import RequestList from "../components/RequestList";
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

  if (loading) return <Loading />;

  // Destructure the user data from the query
  const user = data?.me || {};
  const requests = data.me.requests || [];
  const offers = data.me.offers || [];
  const combinedEventsArray = [...requests, ...offers];

  // * Sample events array that needed to pass into calendar component
  // Event {
  //   title: string,
  //   start: Date,
  //   end: Date,
  //   allDay?: boolean
  //   resource?: any,
  // }

  //repackage the data from the query into the format that the calendar component needs

  const reqEvents = combinedEventsArray.map((request) => {
    return {
      title: `${request.requestTitle}`,
      start: new Date(request.startTime),
      end: new Date(request.endTime),
      type: request.status,
    };
  });

  return (
    <div className="dashboard">
      <Header />

      {/* Friends List/Friend Request */}
      {showFriends && (
        <div className="overlay" onClick={toggleFriendsDisplay}>
          <div className="friends-popup shadow-harsh">
            <Friends />
          </div>
        </div>
      )}

      <main className="full-width flex-column flex-center-y">
        {/* User Banner */}
        <div className="user-banner flex-row flex-center-y">
          <img src={UserPhoto} alt="User" className="shadow" />
          <div className="user-details">
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <div className="flex-row flex-center-y">
              <LocationIcon />
              <p style={{ marginLeft: "5px" }}>{user.zip}</p>
            </div>
          </div>
          <div className="user-friends">
            <button onClick={toggleFriendsDisplay}>Friends</button>
          </div>
        </div>
        <div className="flex-row py-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-whit">
            My Requests List
          </h1>
        </div>
        <div className="flex-row py-1 m-5">
          <RequestList requests={requests} />
        </div>
        <div className="flex-row py-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-whit">
            My Offer List
          </h1>
        </div>
        <div className="flex-row py-1 m-5">
          <RequestList requests={offers} />
        </div>
        {/* Dashboard Content */}
        <div className="flex-row flex-center-xy ">
          {/* Calendar */}

          <div className="dashboard-column-left flex-center-xy">
            <Calendar events={reqEvents} /> {/* events={reqEvents} */}
          </div>

          {/* My Offers
          <div className="dashboard-column-right flex-center-xy my-offers shadow">
            <MyOffers /> 
          </div> */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
