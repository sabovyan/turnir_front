import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { User } from '../../types/main.types';

interface IPrivateRouteProps extends RouteProps {
  isAuth: User | false;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({
  isAuth,
  children,
  ...rest
}) => {
  return (
    <Route {...rest}>
      {isAuth === undefined ? (
        <CircularProgress />
      ) : isAuth ? (
        children
      ) : (
        <Redirect to="/" />
      )}
    </Route>
  );
};

export default PrivateRoute;
