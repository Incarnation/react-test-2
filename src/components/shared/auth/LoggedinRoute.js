import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "services/auth-service";

//protected route function
export function LoggedinRoute(props) {
  const { component: Component, ...rest } = props;

  //either render component or direct to login page depend on isAuthenticated
  return (
    <Route
      {...rest}
      render={props =>
        authService.isAuthenticated() ? (
          <Redirect to={{ pathname: "/rentals" }} />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
}
