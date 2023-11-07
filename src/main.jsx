import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import route from "./routes";
import "./assets/styles/style.css";
import AuthContext from "./hooks/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContext>
      <RouterProvider router={route} />
    </AuthContext>
  </React.StrictMode>
);
