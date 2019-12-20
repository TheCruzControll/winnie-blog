import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getFirebase } from './firebase';

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = props => {
    getFirebase()
      .auth()
      .onAuthStateChanged(function(user) {
        if (user) {
          return children;
        } else {
          return <Redirect to='/login' />;
        }
      });
  };

  return <Route {...rest}>{isAuthenticated()}</Route>;
};

export default PrivateRoute;
