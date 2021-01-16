import React, { FC } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

interface IAlert extends AlertProps {
  type: 'success' | 'error';
  message: string;
}

const Alert: FC<IAlert> = ({ type, message, ...props }) => {
  return (
    <MuiAlert
      elevation={6}
      variant="filled"
      {...props}
      severity={type}
      style={{ minWidth: 300 }}
    >
      <AlertTitle>{type === 'error' ? 'Error' : 'Success'}</AlertTitle>
      {message}
    </MuiAlert>
  );
};

export default Alert;
