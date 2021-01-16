import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import useFacebookLogin from '../../../hooks/useFacebookLogin';
import { authRequest } from '../../../api/axios';

const FacebookButton = () => {
  const { userInfo, login } = useFacebookLogin();

  const handleFacebookLogin = () => {
    login();
  };

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      // authRequest
      //   .doPost('facebook', userInfo)
      //   .then(console.log)
      //   .catch((err) => console.log(err.response));
    }
  }, [userInfo]);

  return (
    <Button
      style={{ padding: 9, margin: '10px 0' }}
      startIcon={<FacebookIcon color="primary" />}
      fullWidth
      variant="outlined"
      onClick={handleFacebookLogin}
    >
      login with Facebook
    </Button>
  );
};

export default FacebookButton;
