import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, ...props }) => {
  return (
    <Route>
      {() =>
        loggedIn ? <Route {...props} /> : <Redirect to="/sign-in" />
      }
    </Route>
  )
};

export default ProtectedRoute;