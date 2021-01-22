import React, { useState } from 'react';

import LoginForms from '../LoginView/LoginView';
import RegisterForm from '../Forms/RegisterForm/RegisterForm';
import SignFormBottom from '../SignFormBottom/SignFormBottom';
import RegisterVerification from '../RegisterVerification/RegisterVerification';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/features';

const SignCardRight = () => {
  const [isSWitched, setIsSwitched] = useState<boolean>(false);

  const formResponseStatus = useSelector(
    (state: RootState) => state.formResponseStatus,
  );

  const handleFormsToggle = () => {
    setIsSwitched((state) => !state);
  };

  return (
    <>
      <div className="sign-right" style={{ minWidth: 400 }}>
        {formResponseStatus.message === 'Email is sent' &&
        formResponseStatus.type === 'success' ? (
          <RegisterVerification />
        ) : (
          <>
            {isSWitched ? <RegisterForm /> : <LoginForms />}
            <SignFormBottom
              isSwitched={isSWitched}
              handleToggle={handleFormsToggle}
            />
          </>
        )}
      </div>
    </>
  );
};

export default SignCardRight;
