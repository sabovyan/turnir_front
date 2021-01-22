import React from 'react';
import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';

const main = {
  title: 'Form',
};

export default main;

export const Register: React.VFC<{}> = () => <RegisterForm />;
export const Login: React.VFC<{}> = () => (
  <LoginForm changeViewToRequest={() => {}} />
);
