import React, { ChangeEvent, useContext, useState } from 'react';

import { signCardDisplayContext } from '../../SideBar/SideBar';
import CButton from '../../Buttons/CustomButton/CustomButton';
import FormField from '../../Input/FormField';

import Typography from '@material-ui/core/Typography';

import { SignFormData } from '../../../types/main.types';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../services/authentication';

const LoginForm = () => {
  const [formData, setFormData] = useState<SignFormData<string>>({
    email: 'sako558@gmail.com',
    password: 'Sako727447*',
  });

  const { toggle } = useContext(signCardDisplayContext);

  const { t } = useTranslation();
  const { login } = useAuth();

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { value, name } = e.target;
    setFormData((state) => {
      state[name] = value;
      return state;
    });
  };
  const submitRegister = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    await login(formData);
    toggle((state) => !state);
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
          {t('Log In For Tournaments')}
        </Typography>

        <FormField
          value={formData.email}
          onChange={handleChange}
          name="email"
          label={t('email')}
        />
        <FormField
          onChange={handleChange}
          name="password"
          label={t('password')}
          value={formData.password}
        />
        <CButton size="large" text={t('Login')} onClick={submitRegister} />
      </form>
    </div>
  );
};

export default LoginForm;
