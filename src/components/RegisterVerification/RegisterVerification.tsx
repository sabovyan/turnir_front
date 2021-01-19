import React, { useEffect, useState } from 'react';

import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setResponseStatus } from '../../store/features/formResponseStatus';
import CButton from '../Buttons/CustomButton/CustomButton';
import { useTranslation } from 'react-i18next';
import { authRequest } from '../../api';
import { RootState } from '../../store/features';
import CircularProgress from '@material-ui/core/CircularProgress';
import { orange } from '@material-ui/core/colors';

const RegisterVerification = () => {
  const RegisterFormData = useSelector(
    (state: RootState) => state.RegisterFormData,
  );

  const [isResendButtonDisabled, setIsResendButtonDisabled] = useState(false);

  const [count, setCount] = useState(30);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleBackButtonClick = () => {
    dispatch(
      setResponseStatus({ type: undefined, message: undefined, open: false }),
    );
  };

  const handleResendButtonClick = () => {
    setIsResendButtonDisabled(true);
    authRequest.doPost('email/resend', RegisterFormData).catch(() => {
      dispatch(
        setResponseStatus({
          type: 'error',
          message:
            'Your email is either already registered or you have start from the beginning',
          open: true,
        }),
      );
    });
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isResendButtonDisabled) {
      timerId = setInterval(() => {
        setCount((state) => state - 1);
        if (count <= 1) {
          setIsResendButtonDisabled(false);
          setCount(30);
          clearInterval(timerId);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [count, isResendButtonDisabled]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <Typography component="h3" variant="h5">
        {t('Please check your email to verify your account')}
      </Typography>

      <div style={{ margin: '2rem 0' }}>
        <Typography component="p" variant="body1" color="textSecondary">
          {t("Didn't you receive an Email?")}
        </Typography>

        <Typography component="p" variant="body1" color="textSecondary">
          {t('Click the resend button to receive a new one')}
        </Typography>
      </div>
      <div style={{ alignSelf: 'flex-end', display: 'flex', gap: '1rem' }}>
        <CButton text={t('Back')} onClick={handleBackButtonClick} />
        <div style={{ minWidth: 200 }}>
          {isResendButtonDisabled ? (
            <div
              style={{
                position: 'relative',
                width: 40,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <CircularProgress style={{ color: orange[800] }} />
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {count}
              </span>
            </div>
          ) : (
            <CButton
              disabled={isResendButtonDisabled}
              text={t('Resend')}
              onClick={handleResendButtonClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterVerification;
