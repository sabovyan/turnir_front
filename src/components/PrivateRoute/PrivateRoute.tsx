import { LinearProgress } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import useAuth from '../../services/authentication';
import { setResponseStatus } from '../../store/features/formResponseStatus';
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
        <h1>loading</h1>
      ) : isAuth ? (
        children
      ) : (
        <Redirect to="/" />
      )}
    </Route>
  );
};

export default PrivateRoute;
