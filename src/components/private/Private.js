import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  } else {
    return <Redirect to="/login" />;
  }
}

export default PrivateRoute;