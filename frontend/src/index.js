// src/index.js

import React from "react";
import ReactDOM from "react-dom/client"; // 'react-dom/client' for React 18
import App from "./App";

// Create the root and render the app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Use root.render() to render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
