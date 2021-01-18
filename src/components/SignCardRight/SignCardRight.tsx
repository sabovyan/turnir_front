import React, { useState } from 'react';
import LoginForm from '../Forms/LoginForm/LoginForm';
import RegisterForm from '../Forms/RegisterForm/RegisterForm';
import SignFormBottom from '../SignFormBottom/SignFormBottom';
import CustomSnackBar from '../CustomSnackBar/CustomSnackBar';
import CButton from '../Buttons/CustomButton/CustomButton';

interface Props {}

const SignCardRight = (props: Props) => {
  const [isSWitched, setIsSwitched] = useState<boolean>(true);

  const [isResponseStatusDisplayed, setIsResponseStatusDisplayed] = useState<
    boolean
  >(true);

  const handleFormsToggle = () => {
    setIsSwitched((state) => !state);
  };

  return (
    <>
      <div className="sign-right">
        {isSWitched ? <RegisterForm /> : <LoginForm />}
        <SignFormBottom
          isSwitched={isSWitched}
          handleToggle={handleFormsToggle}
        />
      </div>
      {/* TODO change error and message to dynamic inserted */}
      <CustomSnackBar
        open={isResponseStatusDisplayed}
        message={
          "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        }
        type={'success'}
        onClose={() => {
          setIsResponseStatusDisplayed((state) => !state);
        }}
      />
      <CButton
        onClick={() => {
          setIsResponseStatusDisplayed((state) => !state);
        }}
        text="open snackbar"
      />
    </>
  );
};

export default SignCardRight;
