import React, { ChangeEvent, FC, useState } from 'react';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import CButton from '../../Buttons/CustomButton/CustomButton';
import FormField from '../../Input/FormField';

import { SignFormData } from '../../../types/main.types';
import { useTranslation } from 'react-i18next';

const RegisterForm: FC = () => {
  const [formData, setFormData] = useState<SignFormData<string>>({
    displayName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<null | string>(null);

  const { t } = useTranslation();

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
          {t('Sign up for Tournaments')}
        </Typography>
        <FormField
          onChange={handleChange}
          name="displayName"
          label={t('name')}
        />
        <FormField onChange={handleChange} name="email" label={t('email')} />
        <FormField
          onChange={handleChange}
          name="password"
          label={t('password')}
        />
        <CButton size="large" text={t('Sign up')} onClick={submitRegister} />
      </form>
    </div>
  );
};

export default RegisterForm;
