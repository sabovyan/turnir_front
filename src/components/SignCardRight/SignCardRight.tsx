import React, { useState } from 'react';
import LoginForm from '../Forms/LoginForm/LoginForm';
import RegisterForm from '../Forms/RegisterForm/RegisterForm';
import SignFormBottom from '../SignFormBottom/SignFormBottom';
import CustomSnackBar from '../CustomSnackBar/CustomSnackBar';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/features';
import { closeAlert } from '../../store/features/formResponseStatus';
import CButton from '../Buttons/CustomButton/CustomButton';

interface Props {}

const SignCardRight = (props: Props) => {
  const [isSWitched, setIsSwitched] = useState<boolean>(true);

  const dispatch = useDispatch();

  const formResponseStatus = useSelector(
    (state: RootState) => state.formResponseStatus,
  );

  const handleFormsToggle = () => {
    setIsSwitched((state) => !state);
  };

  return formResponseStatus.message === 'Email is sent' &&
    formResponseStatus.type === 'success' ? (
    <>
      <div>here we are </div>
      <CButton text={'resend'} />
    </>
  ) : (
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
