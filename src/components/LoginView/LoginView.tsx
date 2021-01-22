import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import LoginForm from '../Forms/LoginForm/LoginForm';
import RequestPasswordForm from '../Forms/RequestPasswordForm/RequestPasswordForm';

type LoginView = 'login' | 'request' | 'confirm';

const LoginForms = () => {
  const [loginView, setLoginView] = useState<LoginView>('login');
  const { t } = useTranslation();

  const changeViewToRequest = () => {
    setLoginView('request');
  };

  const changeViewToLogin = () => {
    setLoginView('login');
  };
  const changeViewToConfirm = () => {
    setLoginView('confirm');
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
        <div></div>
      )}
    </div>
  );
};

export default LoginForms;
