import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import LoginFrom from "../components/loginForm";

// NextUI components
import { Image } from "@nextui-org/react";

const Login = () => {
  useEffect(() => {
    document.title = "CareConnect | Login";
  }, []);

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
