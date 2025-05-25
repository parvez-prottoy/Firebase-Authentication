import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import Login from "../components/Login";
import Register from "../components/Register";
import About from "../components/About";
import User from "../components/User";
import Profile from "../components/Profile";

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
        Component: User,
      },
      {
        path: "profile",
        Component: Profile,
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
