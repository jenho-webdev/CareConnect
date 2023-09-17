import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//change to register() if you want the app to work offline and load faster. Note this don't work if app is served over CDN.
//change to unregister() if you don't want the app to work offline.
serviceWorker.register();
