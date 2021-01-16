import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import SignFormBottom from '../SignFormBottom/SignFormBottom';
import CustomSnackBar from '../CustomSnackBar/CustomSnackBar';

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
      <CustomSnackBar
        open={isResponseStatusDisplayed}
        message={
          "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        }
        type={'error'}
        onClose={() => {
          setIsResponseStatusDisplayed((state) => !state);
        }}
      />
    </>
  );
};

export default SignCardRight;
