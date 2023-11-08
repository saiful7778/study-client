import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Assignments from "./pages/assignment/Assignments";
import Create from "./pages/assignment/Create";
import Preview from "./pages/assignment/Preview";
import PrivateRoute from "./pages/PrivateRoute";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/assignments",
        children: [
          {
            index: true,
            element: <Assignments />,
          },
          {
            path: "create_new",
            element: (
              <PrivateRoute>
                <Create />
              </PrivateRoute>
            ),
          },
          {
            path: ":assignmentID",
            element: (
              <PrivateRoute>
                <Preview />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default route;
