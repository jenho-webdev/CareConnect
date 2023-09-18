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
            <Calendar events={calEvents} />
          </div>

          {/* <div className="flex-row flex-center-xy">
            <div className="dashboard-column-left flex-center-xy">
              <RequestList requests={user.requests} />
            </div>
          </div> */}

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
