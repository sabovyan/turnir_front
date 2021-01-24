import React, { useState } from 'react';

import LoginView from '../LoginView/LoginView';
import RegisterForm from '../Forms/RegisterForm/RegisterForm';
import SignFormBottom from '../SignFormBottom/SignFormBottom';
import ResendMail from '../ResendMail/ResendMail';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/features';
import useAuth from '../../services/authentication';
import { useTranslation } from 'react-i18next';
import { setResponseStatus } from '../../store/features/formResponseStatus';

const SignCardRight = () => {
  const {
    formResponseStatus,
    RegisterFormData,
    requestPasswordEmail,
  } = useSelector((state: RootState) => state);

  const [isSWitched, setIsSwitched] = useState<boolean>(false);

  const { resendRegisterMail } = useAuth();
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleFormsToggle = () => {
    setIsSwitched((state) => !state);
  };

  const handleBackButtonClick = () => {
    dispatch(
      setResponseStatus({ type: undefined, message: undefined, open: false }),
    );
  };

  const handleResendButtonClick = async () => {
    try {
      await resendRegisterMail({
        email: RegisterFormData.email!,
        displayName: RegisterFormData.displayName!,
        password: RegisterFormData.password!,
      });
    } catch (err) {}
  };

  return (
    <>
      <div className="sign-right" style={{ minWidth: 400 }}>
        {formResponseStatus.message === t('Email is sent') &&
        formResponseStatus.type === 'success' ? (
          <ResendMail
            resend={handleResendButtonClick}
            handleBackButtonClick={handleBackButtonClick}
            email={requestPasswordEmail}
          />
        ) : (
          <>
            {isSWitched ? <RegisterForm /> : <LoginView />}
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
