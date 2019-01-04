import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "services/auth-service";

//protected route function
export function ProtectedRoute(props) {
  const { component: Component, ...rest } = props;

  //either render component or direct to login page depend on isAuthenticated
  return (
    <Route
      {...rest}
      render={props =>
        authService.isAuthenticated() ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
}
