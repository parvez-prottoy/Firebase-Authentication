import { Children, use } from "react";
import { Navigate, useLocation } from "react-router";
import AuthContext from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, observerLoading } = use(AuthContext);
  const location = useLocation();

  if (observerLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" state={location.pathname} replace />;
  }

  return children; // Redirect to home if user is authenticated
}
