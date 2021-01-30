import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../services/authentication';
import { RootState } from '../../store/features';
import { setResponseStatus } from '../../store/features/formResponseStatus';

import LoginForm from '../Forms/LoginForm/LoginForm';
import RequestPasswordForm from '../Forms/RequestPasswordForm/RequestPasswordForm';
import ResendMail from '../ResendMail/ResendMail';

type LoginView = 'login' | 'request' | 'confirm';

const LoginForms = () => {
  const requestPasswordEmail = useSelector(
    (state: RootState) => state.requestPasswordEmail,
  );
  const dispatch = useDispatch();

  const [loginView, setLoginView] = useState<LoginView>('login');

  const { t } = useTranslation();
  const { resetPassword } = useAuth();

  const changeViewToRequest = () => {
    setLoginView('request');
  };

  const changeViewToLogin = () => {
    setLoginView('login');
  };
  const changeViewToConfirm = () => {
    setLoginView('confirm');
  };

  /* ANCHOR also add apply the same logic for the requestPassword component  */

  const handleResendButtonCLick = async () => {
    try {
      const resp = await resetPassword(requestPasswordEmail);
      const { data } = resp;

      dispatch(
        setResponseStatus({ type: 'success', message: t(data), open: true }),
      );
    } catch (err) {
      console.log(err.response);
      dispatch(
        setResponseStatus({
          type: 'error',
          message: t(err.response.data.error),
          open: true,
        }),
      );
    }
  };

  const handleBackButtonClick = () => {
    setLoginView('request');
  };

  return (
    <div style={{ width: '100%' }}>
      {loginView === 'login' ? (
        <LoginForm changeViewToRequest={changeViewToRequest} />
      ) : loginView === 'request' ? (
        <RequestPasswordForm
          changeViewToConfirm={changeViewToConfirm}
          changeViewToLogin={changeViewToLogin}
        />
      ) : (
        <ResendMail
          resend={handleResendButtonCLick}
          handleBackButtonClick={handleBackButtonClick}
          email={requestPasswordEmail}
        />
      )}
    </div>
  );
};

export default LoginForms;
