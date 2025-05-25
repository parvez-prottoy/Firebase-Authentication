import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import Login from "../components/Login";
import Register from "../components/Register";
import About from "../components/About";
import User from "../components/User";
import Profile from "../components/Profile";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "user",
        element: (
          <PrivateRoute>
            <User />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "signin",
        Component: Login,
      },
      {
        path: "signup",
        Component: Register,
      },
    ],
  },
]);

export default router;
