import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import RequestsCalendar from "../components/RequestsCalendar"; //where the user will be able to see all requests in a calendar view

const Profile = () => {
  const { username } = useParams();

  useEffect(() => {
    document.title = `CareConnect | ${username}`;
  }, [username]);

  return (
    <div>
      <RequestsCalendar />
    </div>
  );
};

export default Profile;
