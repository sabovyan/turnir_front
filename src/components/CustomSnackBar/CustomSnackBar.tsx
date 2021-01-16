import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../Alert/Alert';

interface ISnackbarProps {
  message: string;
  type: 'error' | 'success';
  open: boolean;
  onClose: () => void;
}

const CustomSnackbar: FC<ISnackbarProps> = ({
  message,
  type,
  open,
  onClose,
}) => {
  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={3000}
        onClose={onClose}
      >
        <Alert type={type} message={message} />
      </Snackbar>
    </div>
  );
};
export default CustomSnackbar;
