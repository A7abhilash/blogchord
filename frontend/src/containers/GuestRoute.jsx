import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function GuestRoute({ component: Component, ...rest }) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Redirect to="/" /> : <Component {...props} />;
      }}
    ></Route>
  );
}

export default GuestRoute;
