import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import route from "./routes";
import "./assets/styles/style.css";
import AuthContext from "./hooks/AuthContext";
import SharedData from "./hooks/SharedData";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContext>
      <SharedData>
        <RouterProvider router={route} />
      </SharedData>
    </AuthContext>
  </React.StrictMode>
);
