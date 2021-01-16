import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import SignFormBottom from '../SignFormBottom/SignFormBottom';
import CustomSnackBar from '../CustomSnackBar/CustomSnackBar';

interface Props {}

const SignCardRight = (props: Props) => {
  const [isSWitched, setIsSwitched] = useState<boolean>(true);

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
      {/* <CustomSnackBar message={} /> */}
    </>
  );
};

export default SignCardRight;
