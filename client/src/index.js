import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service_worker.js")
    .then((registration) => {
      console.log("SW Registered!");
    })
    .catch((error) => {
      console.log("SW Registration Failed");
    });
} else {
  console.log("Not supported");
}
