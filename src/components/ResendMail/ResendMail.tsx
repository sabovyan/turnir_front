import React, { FC, useEffect, useState } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import CButton from '../common/Buttons/CustomButton/CustomButton';
import Typography from '@material-ui/core/Typography';
import { orange } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

import { useTranslation } from 'react-i18next';

interface IResendMail {
  resend: () => void;
  email: string;
  handleBackButtonClick: () => void;
}

const ResendMail: FC<IResendMail> = ({
  resend,
  handleBackButtonClick,
  email,
}) => {
  const [isResendButtonDisabled, setIsResendButtonDisabled] = useState(false);

  const [count, setCount] = useState(30);

  const { t } = useTranslation();

  const handleResendButtonClick = () => {
    setIsResendButtonDisabled(true);
    resend();
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
      <Typography component="h3" variant="h6" color="textSecondary">
        {t('A verification link has been sent to')}
        {email ? ` ${email}` : ` ${t('your email account')}`}
      </Typography>
      <Typography component="p" variant="body1" color="textSecondary">
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
        <Button onClick={handleBackButtonClick} style={{ minWidth: 200 }}>
          {t('Back')}
        </Button>

        <div>
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

export default ResendMail;
