import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router';
import { authRequest } from '../../api';

const EmailVerification = () => {
  const [answer, setAnswer] = useState('');
  const [emoji, setEmoji] = useState('🐛');
  const [successMessage, setSuccessMessage] = useState('');

  const token = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    authRequest
      .doPost('email/confirmation', token)
      .then((res) => {
        console.log(res);
        setEmoji('😁');
        setAnswer('Your email is successfully registered, you can now login');
        setSuccessMessage('Success');
      })
      .catch((err) => {
        setEmoji('😢');
        setAnswer(err.response.data.error);
        setSuccessMessage('Error');
      });
  }, [token]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60%',
      }}
    >
      <div
        style={{
          width: 800,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          gap: '1rem',
          boxShadow: '2px 2px 5px grey, -1px -1px 10px #cacaca',
          borderRadius: 5,
          color: 'white',
          background: successMessage === 'Error' ? '#f54f4f' : '#67bf67',
        }}
      >
        <Typography variant="h4" component="p">
          {t(successMessage)}
        </Typography>
        <Typography variant="h4" component="p">
          {emoji}
        </Typography>

        <Typography variant="h4" component="p">
          {t(answer)}
        </Typography>
      </div>
    </div>
  );
};

export default EmailVerification;
