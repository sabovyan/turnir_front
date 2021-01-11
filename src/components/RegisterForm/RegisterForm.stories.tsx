import React from 'react';
import RegisterForm from './RegisterForm';

const main = {
  title: 'Form',
  component: RegisterForm
}

export default main

export const Form: React.VFC<{}> = () => <RegisterForm />;

