import axios from 'axios';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import CButton from '../Buttons/CustomButton/CustomButton';
import FacebookButton from '../Buttons/FacebookButton/FacebookButton';
import GoogleButton from '../Buttons/GoogleButton/GoogleButton';
import FormField from '../Input/FormField';
import LineWidthText from '../LineWithText/LineWidthText';

type registrationFormData<T> = {
  [key: string]: T;
};

const RegisterForm: FC = () => {
  const [formData, setFormData] = useState<registrationFormData<string>>({
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
    axios
      .post('http://localhost:7000/api/auth/email/login', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: 250,
      }}
    >
      <form>
        <FormField
          onChange={handleChange}
          name="displayName"
          label="user name"
        />
        <FormField onChange={handleChange} name="email" label="email" />
        <FormField onChange={handleChange} name="password" label="password" />
        <CButton size="large" text="sign up" onClick={submitRegister} />
      </form>
      <LineWidthText text="OR" />
      <GoogleButton />
      <FacebookButton />
    </div>
  );
};

export default RegisterForm;
