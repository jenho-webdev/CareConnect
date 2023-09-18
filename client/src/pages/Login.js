import React, { useEffect } from "react";
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
  if (Auth.loggedIn()) return <Navigate replace to="/dashboard" />;

  return (
    <div className="fullscreen flex-center-x">
      {/* Left Column */}
      <div className="width-50 flex-center-xy bg-white">
        <Image src="/logo500.png" className="login-logo" alt="Logo" />
      </div>

      {/* Right Column */}
      <div className="width-50 flex-center-xy bg-teal-light">
        <LoginFrom />
      </div>
    </div>
  );
};

export default Login;
