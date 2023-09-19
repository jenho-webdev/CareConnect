import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";
// Components
import LoginFrom from "../components/LoginForm";

// NextUI components
import { Image } from "@nextui-org/react";

const Login = () => {
  useEffect(() => {
    document.title = "CareConnect | Login";
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Add a listener to update windowWidth when the screen size changes
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    // Remove the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowWidth < 279) {
    // Display a message when the screen size is less than 300px
    return (
      <div className="flex items-center justify-center h-screen bg-teal-light">
        <h1 className="text-white text-2xl font-bold ">
          The screen size must be over 300px wide.
        </h1>
      </div>
    );
  }
  if (Auth.loggedIn()) return <Navigate replace to="/dashboard" />;

  return (
    <div className="fullscreen flex-center-x">
      {/* Left Column */}
      <div className="hidden md:w-1/2 md:block p-1 flex-center-xy bg-white">
        <Image src="/logo500.png" className="login-logo" alt="Logo" />
      </div>
      {/* Right Column */}
      <div className="w-full flex-center-xy bg-teal-light">
        <LoginFrom />
      </div>
    </div>
  );
};

export default Login;
