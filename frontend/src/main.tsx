// frontend/src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css"; // <-- ADD THIS LINE

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
