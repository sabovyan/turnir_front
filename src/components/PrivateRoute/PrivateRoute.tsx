import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { User } from '../../types/main.types';

interface IPrivateRouteProps extends RouteProps {
  isAuth: User | false | undefined;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({
  isAuth,
  children,
  ...rest
}) => {
  return (
    <Route {...rest}>
      {isAuth === false ? (
        <Redirect to="/" />
      ) : isAuth ? (
        children
      ) : (
        <CircularProgress />
      )}
    </Route>
  );
};

export default PrivateRoute;
