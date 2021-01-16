import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { SignFormData } from '../../types/main.types';
import CButton from '../Buttons/CustomButton/CustomButton';
import FormField from '../Input/FormField';

const LoginForm = () => {
  const [formData, setFormData] = useState<SignFormData<string>>({
    displayName: '',
    email: '',
    password: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { value, name } = e.target;
    console.log(formData);
    setFormData((state) => {
      state[name] = value;
      return state;
    });
  };
  const submitRegister = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    // axios
    //   .post('http://localhost:7000/api/auth/email/login', formData)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error.response);
    //   });
  };

  return (
    <div style={{ width: '100%' }}>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <Typography
          style={{ alignSelf: 'center' }}
          color="textSecondary"
          variant="h6"
          component="h2"
        >
          Log In For Tournaments
        </Typography>

        <FormField onChange={handleChange} name="email" label="email" />
        <FormField onChange={handleChange} name="password" label="password" />
        <CButton size="large" text="sign In" onClick={submitRegister} />
      </form>
    </div>
  );
};

export default LoginForm;