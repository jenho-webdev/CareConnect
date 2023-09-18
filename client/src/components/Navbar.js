import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

export default function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <Link className="btn btn-lg btn-primary m-2" to="/me">
            My Profile
          </Link>
          <Link
            className="btn btn-lg btn-primary m-2"
            to="/signin"
            onClick={logout}
          >
            Logout
          </Link>
        </>
      ) : (
        // If not logged in, show login button)
        <>
          <Link className="btn btn-lg btn-info m-2" to="/login">
            Login
          </Link>
          <Link className="btn btn-lg btn-light m-2" to="/signup">
            Signup
          </Link>
        </>
      )}
    </div>
  );
}
