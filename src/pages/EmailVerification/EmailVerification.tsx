import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { authRequest } from '../../api';

interface Props {}

const EmailVerification = (props: Props) => {
  const token = useParams();

  useEffect(() => {
    authRequest.doPost('email/confirmation', { token });
  });

  return (
    <div>
      <h1>here you are</h1>
    </div>
  );
};

export default EmailVerification;
