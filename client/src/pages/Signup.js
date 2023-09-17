import React, { useEffect } from "react";

// Components
import SignupFrom from "../components/SignupForm";

// NextUI components
import { Image } from "@nextui-org/react";

const Signup = () => {
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
        <SignupFrom />
      </div>
    </div>
  );
};

export default Signup;
