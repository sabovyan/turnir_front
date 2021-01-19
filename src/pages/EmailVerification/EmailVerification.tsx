import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router';
import { authRequest } from '../../api';

const EmailVerification = () => {
  const [answer, setAnswer] = useState('');
  const [emoji, setEmoji] = useState('🐛');
  const [successMessage, setSuccessMessage] = useState('');
  const token = useParams();

  const history = useHistory();

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    authRequest
      .doPost('email/confirmation', token)
      .then((/* res */) => {
        // console.log(res);
        setEmoji('😁');
        setSuccessMessage(
          'Your email is successfully registered, you can now login',
        );
        timerId = setTimeout(() => {
          history.push('/');
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.error);
        setEmoji(' 😢');
        setAnswer(err.response.data.error);
      });

    return () => {
      clearTimeout(timerId);
    };
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '60%',
      }}
    >
      <Typography variant="h4" component="p">
        {emoji}
      </Typography>
      <Typography variant="h4" component="p">
        {answer}
      </Typography>
      <Typography variant="h4" component="p">
        {successMessage}
      </Typography>
    </div>
  );
};

export default EmailVerification;
