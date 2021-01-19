import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setResponseStatus } from '../../store/features/formResponseStatus';
import CButton from '../Buttons/CustomButton/CustomButton';

interface Props {}

const RegisterVerification = (props: Props) => {
  const dispatch = useDispatch();

  const handleBackButtonClick = () => {
    dispatch(
      setResponseStatus({ type: undefined, message: undefined, open: false }),
    );
  };
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
        Please check your email to verify your account.
      </Typography>

      <div style={{ margin: '2rem 0' }}>
        <Typography component="p" variant="body1" color="textSecondary">
          Didn't you receive an Email?
        </Typography>

        <Typography component="p" variant="body1" color="textSecondary">
          Click the resend button to receive a new one.
        </Typography>
      </div>
      <div style={{ alignSelf: 'flex-end', display: 'flex', gap: '1rem' }}>
        <CButton text={'back'} onClick={handleBackButtonClick} />
        <CButton text={'resend'} />
      </div>
    </div>
  );
};

export default RegisterVerification;
