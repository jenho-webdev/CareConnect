import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { User, Link } from "@nextui-org/react";

//import components

//import queries
import { QUERY_USER_INFO, QUERY_ME } from "../utils/queries";

//import auth/helper function
import Auth from "../utils/auth";

const Profile = () => {
  const { userId } = useParams();
  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(userId ? QUERY_USER_INFO : QUERY_ME, {
    variables: { _id: userId },
  });

  useEffect(() => {
    document.title = `CareConnect | ${data.firstName}}`;
  }, [data]);

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_USER_INFO` query
  const user = data?.me || data?.user || {};

  // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
  if (!Auth.loggedIn()) {
    return <Navigate to="/signin" />;
  }

  if (loading) {
    return (
      <button type="button" class="bg-indigo-500 ..." disabled>
        <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
        Loading...
      </button>
    );
  }

  return (
    <div>
      {/* showing logged-in user's own profile card */}
      <User
        name={`${user.firstName} ${user.lastName}`}
        description={
          <Link
            href={`https://www.google.com/maps/place/${user.location}`}
            size="sm"
            isExternal
          >
            {user.location}
          </Link>
        }
        avatarProps={`
          src: "https://i.pravatar.cc/150?u=${user._id}"
        `}
      />
      {/* a table of some sort to show a list of users */}
    </div>
  );
};

export default Profile;
