import React, { useState } from 'react';
import LoginForm from '../Forms/LoginForm/LoginForm';
import RegisterForm from '../Forms/RegisterForm/RegisterForm';
import SignFormBottom from '../SignFormBottom/SignFormBottom';
import CustomSnackBar from '../CustomSnackBar/CustomSnackBar';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/features';
import { closeAlert } from '../../store/features/formResponseStatus';
import RegisterVerification from '../RegisterVerification/RegisterVerification';

const SignCardRight = () => {
  const [isSWitched, setIsSwitched] = useState<boolean>(true);

  const dispatch = useDispatch();

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
            {isSWitched ? <RegisterForm /> : <LoginForm />}
            <SignFormBottom
              isSwitched={isSWitched}
              handleToggle={handleFormsToggle}
            />
          </>
        )}
      </div>
      <CustomSnackBar
        open={formResponseStatus.open}
        message={formResponseStatus.message}
        type={formResponseStatus.type}
        onClose={() => {
          dispatch(closeAlert());
        }}
      />
    </>
  );
};

export default SignCardRight;
