import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const isUser = user && isAuthenticated;

  // <Route
  //   {...rest}
  //   render={() => (isUser ? children : <Redirect to="/login" />)}
  // ></Route>

  if (!isUser) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default PrivateRoute;
