import React from 'react';
import FacebookLogin from 'react-facebook-login';

import './facebook-button.css';

const FacebookButton = () => {
  const responseFacebook = (response: any) => {
    console.log(response);
  };
  return (
    <div>
      <FacebookLogin
        appId="1088597931155576"
        autoLoad={true}
        fields="name,email"
        callback={responseFacebook}
        icon="fa-facebook"
        buttonStyle={{
          fontSize: '16px',
          padding: '13px 20px',
          width: '100%',
          borderRadius: 3,
        }}
        containerStyle={{
          width: '100%',
        }}
      />
    </div>
  );
};

export default FacebookButton;
