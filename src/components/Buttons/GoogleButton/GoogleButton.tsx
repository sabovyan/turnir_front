import { Button } from '@material-ui/core';
import React from 'react';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../../config/envConstants';
import GoogleSvgIcon from '../../icons/GoogleSvgIcon/GoogleSvgIcon';

const GoogleButton: React.FC = () => {
  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    console.log(response);
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
      Login with Google
    </Button>
  );
};

export default GoogleButton;
/* <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        render={renderProps => }
      /> */
