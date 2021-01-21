import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { GOOGLE_CLIENT_ID } from '../../../config/envConstants';
import useAuth from '../../../services/authentication';
import { setResponseStatus } from '../../../store/features/formResponseStatus';
import { GoogleResponse } from '../../../types/main.types';
import GoogleSvgIcon from '../../icons/GoogleSvgIcon/GoogleSvgIcon';
import { signCardDisplayContext } from '../../SideBar/SideBar';

const GoogleButton: React.FC = () => {
  const { t } = useTranslation();
  const { loginWithGoogle } = useAuth();

  const { toggle } = useContext(signCardDisplayContext);
  const dispatch = useDispatch();

  const login = async (response: GoogleResponse) => {
    await loginWithGoogle(response);
    toggle(false);
  };

  const fail = (response: any) => {
    dispatch(
      setResponseStatus({
        type: 'error',
        message: response.message,
        open: true,
      }),
    );
  };

  const { signIn } = useGoogleLogin({
    clientId: GOOGLE_CLIENT_ID,
    onSuccess: login,
    onFailure: fail,
  });

  return (
    <Button
      style={{ padding: 9, margin: '10px 0' }}
      variant="outlined"
      startIcon={<GoogleSvgIcon width="20" />}
      onClick={signIn}
      fullWidth
    >
      {t('Login With Google')}
    </Button>
  );
};

export default GoogleButton;
