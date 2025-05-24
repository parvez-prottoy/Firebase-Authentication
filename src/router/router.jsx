import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import Login from "../components/Login";
import Register from "../components/Register";

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
        element: <h1>About Page</h1>,
      },
      {
        path: "user",
        element: <h1>User Page</h1>,
      },
      {
        path: "profile",
        element: <h1>Profile Page</h1>,
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
