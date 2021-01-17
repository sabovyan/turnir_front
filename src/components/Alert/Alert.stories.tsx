import React from 'react';
import Alert from './Alert';

const main = {
  title: 'FormElements/Alert',
  component: Alert,
};

export default main;

export const ErrorAlert = () => (
  <Alert type="error" message="this is an error Alert" />
);

export const SuccessAlert = () => (
  <Alert type="success" message="this is an success Alert" />
);
