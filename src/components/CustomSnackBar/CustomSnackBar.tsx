import React, { FC } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { useTranslation } from 'react-i18next';
import MuiAlert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

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
  const { t } = useTranslation();

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={9000}
        onClose={onClose}
      >
        <MuiAlert variant="filled" severity={type} style={{ minWidth: 300 }}>
          <AlertTitle>
            {type === 'error' ? t('Error') : t('Success')}
          </AlertTitle>
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
export default CustomSnackbar;
