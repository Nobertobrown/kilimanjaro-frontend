import { memo } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = memo(({ element, requiresAuth, path }) => {
  const { user } = useSelector((state) => state.reducer);
  
  if (requiresAuth && !user.uid) {
    return <Navigate to="/sign-in" />;
  }

  // Handling redux state loss during page refresh
  if (path === "/sign-in" && user.uid) {
    return <Navigate to="/" />;
  }

  return element;
});

PrivateRoute.displayName = "PrivateRoute";

export default PrivateRoute;