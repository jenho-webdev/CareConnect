import React from "react";
import LoginFrom from "../components/LoginForm";
// 1. import `NextUI/Image` component
import { Image } from "@nextui-org/react";

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Column */}
      <div className="flex-1 bg-gray-200">
        <div className="h-full flex items-center justify-center">
          <div className="max-w-md p-8 space-y-4 bg-white">
            {/* Logo */}
            <div className="flex items-center justify-center">
              <Image src="/logo500.png" alt="Logo" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 bg-teal-400">
        <div className="h-full flex items-center justify-center">
          <LoginFrom />
        </div>
      </div>
    </div>
  );
};

export default Login;
