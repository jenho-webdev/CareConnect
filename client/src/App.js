// import React, { useState } from "react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

import "./App.css";

function App() {
  return (
    // 2. Wrap NextUIProvider at the root of your app
    <NextUIProvider>
      <div className="flex h-screen">
        {/* Left Column */}
        <div className="flex-1 w-1/2 bg-gray-200">
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
        <div className="lg:flex-1 bg-teal-400"></div>
      </div>
    </NextUIProvider>
  );
}

export default App;
