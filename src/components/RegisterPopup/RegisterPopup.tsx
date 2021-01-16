import React, { useState } from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import FacebookButton from '../Buttons/FacebookButton/FacebookButton';
import GoogleButton from '../Buttons/GoogleButton/GoogleButton';
import LineWidthText from '../LineWithText/LineWidthText';
import RegisterForm from '../RegisterForm/RegisterForm';
import SignCardLeft from '../SignCardLeft/SignCardLeft';

import colors from '../../styles/colors';
import LoginForm from '../LoginForm/LoginForm';
import CustomSnackBar from '../CustomSnackBar/CustomSnackBar';

const RegisterPopup = () => {
  const [isRegisterFormDisplayed, setIsRegisterFormDisplayed] = useState<
    boolean
  >(true);

  const handleFormsToggle = () => {
    setIsRegisterFormDisplayed((state) => !state);
  };

  return (
    <Backdrop
      open={true}
      style={{
        zIndex: 1,
        background: colors.backdropColor,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          background: 'white',
          height: '550px',
        }}
      >
        <SignCardLeft />
        <div
          style={{
            height: '100%',
            width: 450,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: ' 2rem',
            background: 'white',
          }}
        >
          {isRegisterFormDisplayed ? <RegisterForm /> : <LoginForm />}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignSelf: 'flex-end',
                marginTop: '0',
              }}
            >
              {isRegisterFormDisplayed
                ? 'Do you have an Account?'
                : ' Do you want to get registered'}

              <Button
                style={{
                  color: colors.green,
                  margin: 0,
                  padding: 0,
                  lineHeight: 0,
                }}
                onClick={handleFormsToggle}
              >
                {isRegisterFormDisplayed ? 'login in' : ' sign up'}
              </Button>
            </div>

            <LineWidthText text="OR" />
            <GoogleButton />
            <FacebookButton />
          </div>
        </div>
        {/* <CustomSnackBar message={} /> */}
      </div>
    </Backdrop>
  );
};

export default RegisterPopup;
