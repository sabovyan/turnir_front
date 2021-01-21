import React, { useContext } from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import Button from '@material-ui/core/Button';

import { setResponseStatus } from '../../../store/features/formResponseStatus';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../services/authentication';
import { signCardDisplayContext } from '../../SideBar/SideBar';
import { useDispatch } from 'react-redux';

const FacebookButton = () => {
  const { loginWithFacebook } = useAuth();

  const { toggle } = useContext(signCardDisplayContext);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleFacebookLogin = async () => {
    try {
      await loginWithFacebook();
      toggle((state) => !state);
    } catch (err) {
      dispatch(
        setResponseStatus({ type: 'error', message: err.message, open: true }),
      );
    }
  };

  return (
    <Button
      style={{ padding: 9, margin: '10px 0' }}
      startIcon={
        <FacebookIcon style={{ color: '#3d68a6', fontSize: '1.5rem' }} />
      }
      fullWidth
      variant="outlined"
      onClick={handleFacebookLogin}
    >
      {t('Login With Facebook')}
    </Button>
  );
};

export default FacebookButton;
