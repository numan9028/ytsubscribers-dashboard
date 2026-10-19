import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuth } from 'src/Redux/helpers/auth';

const PrivateRoute = ({ component: Component }) => {
  return isAuth() ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
