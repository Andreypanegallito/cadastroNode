// PrivateRoute.tsx
import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import Cookies from 'js-cookie';

type PrivateRouteProps = RouteProps & {
  component: React.ComponentType<any>;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const token = Cookies.get('jwtToken');
  return (
    <Route
      {...rest}
      element={token ? <Component {...rest} /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
