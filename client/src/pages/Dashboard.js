import React, { useEffect } from "react";
import { QUERY_ME } from "../utils/queries";
// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyOffers from "../components/dashboard/MyOffers";
import Calendar from "../components/calendar/RequestsCalendar";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { Navigate } from "react-router-dom";
import RequestList from "../components/RequestList";

// Images
import UserPhoto from "../assets/user-placeholder.jpg";
import LocationIcon from "../assets/location-icon.jsx";

const Dashboard = () => {
  useEffect(() => {
    document.title = "CareConnect | My Dashboard";
  }, []);
  const { loading, data } = useQuery(QUERY_ME);
  if (!Auth.loggedIn()) return <Navigate replace to="/login" />;

  if (loading) return <div>Loading...</div>;

  //destructure the user data from the query
  const user = data?.me || {};
  const requests = data.me.requests || [];
  const offers = data.me.offers || [];
  const combinedEventsArray = [...requests, ...offers];

  //sample events array that needed to pass into calendar component
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
      <main className="full-width">
        <div className="user-banner flex-row flex-center-y">
          <img src={UserPhoto} alt="User" />
          <div className="user-details">
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <div className="flex-row flex-center-y">
              <LocationIcon />
              <p>{user.zip}</p>
            </div>
          </div>
          <div className="user-friends">
            {/* Friends button to view friends list & requests*/}
            <button>Friends</button>
          </div>
        </div>

        <div className="flex-row flex-center-xy">
          <div className="dashboard-column-left flex-center-xy">
            {/* <Calendar events={reqEvents} /> */}
            <RequestList requests={requests} />
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
