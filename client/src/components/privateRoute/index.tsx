// PrivateRoute.tsx
import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import Cookies from 'js-cookie';

export type PrivateRouteProps = RouteProps & {
  // remove the `component` property
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ ...rest }) => {
  const token = Cookies.get('jwtToken');
  return (
    <Route
      {...rest}
      element={token ? <Navigate to="/login" /> : null}
    />
  );
};


export default PrivateRoute;