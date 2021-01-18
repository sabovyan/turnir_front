import { Button } from '@material-ui/core';
import React from 'react';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from 'react-google-login';
import { useTranslation } from 'react-i18next';
import { authRequest } from '../../../api/axios';
import { GOOGLE_CLIENT_ID } from '../../../config/envConstants';
import GoogleSvgIcon from '../../icons/GoogleSvgIcon/GoogleSvgIcon';

type RequestData = {
  googleId: string;
  imageUrl: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
  tokenId: string;
};

type GoogleResponse = GoogleLoginResponse | GoogleLoginResponseOffline;

const GoogleButton: React.FC = () => {
  const { t } = useTranslation();

  const responseGoogle = async (response: GoogleResponse) => {
    const googleResponse = response as GoogleLoginResponse;

    const requestData: RequestData = {
      tokenId: googleResponse.tokenId,
      ...googleResponse.profileObj,
    };

    const apiResponse = await authRequest.doPost('google', requestData);

    console.log(requestData);
  };

  const { signIn } = useGoogleLogin({
    clientId: GOOGLE_CLIENT_ID,
    onSuccess: responseGoogle,
    onFailure: responseGoogle,
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
