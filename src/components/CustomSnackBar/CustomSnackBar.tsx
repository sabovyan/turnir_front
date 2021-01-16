import React, { SyntheticEvent } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../Alert/Alert';

interface ISnackbarProps {
  message: string;
  type: 'error' | 'success';
  open: boolean;
}

export default function CustomSnackbar({
  message,
  type,
  open,
}: ISnackbarProps) {
  return (
    <div>
      <Button variant="outlined">Open success snackbar</Button>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity={type}>{message}</Alert>
      </Snackbar>
    </div>
  );
}
