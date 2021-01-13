import Button from '@material-ui/core/Button';
import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import useFacebookLogin from '../../../hooks/useFacebookLogin';

const FacebookButton = () => {
  const { userInfo, login } = useFacebookLogin();

  const handleFacebookLogin = () => {
    login();
    // console.log(userInfo);
  };

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
