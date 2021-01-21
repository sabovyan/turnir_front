import React, { FormEvent, useContext } from 'react';

import Typography from '@material-ui/core/Typography';
import CButton from '../../Buttons/CustomButton/CustomButton';
import FormField from '../../Input/FormField';

import { signCardDisplayContext } from '../../SideBar/SideBar';
import loginValidateSchema from './loginForm.validate';
import useAuth from '../../../services/authentication';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { setResponseStatus } from '../../../store/features/formResponseStatus';
import { SignFormData } from '../../../types/main.types';

const initialValues: SignFormData<string> = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const { toggle } = useContext(signCardDisplayContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidateSchema,
    onSubmit: async (values) => {
      try {
        await login(values);
        toggle((state) => !state);
      } catch (err) {
        const {
          response: {
            data: { error },
          },
        } = err;

        dispatch(
          setResponseStatus({ type: 'error', message: t(error), open: true }),
        );
      }
    },
  });

  const submitLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailError = formik.touched.email && formik.errors.email;
    const passwordError = formik.touched.password && formik.errors.password;

    if (emailError) {
      dispatch(
        setResponseStatus({
          type: 'error',
          message: t(emailError),
          open: true,
        }),
      );
    } else if (passwordError) {
      dispatch(
        setResponseStatus({
          type: 'error',
          message: t(passwordError),
          open: true,
        }),
      );
    } else {
      formik.handleSubmit(e);
    }
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
        onSubmit={submitLoginForm}
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
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email && formik.touched.email ? true : false}
          name="email"
          label={t('email')}
        />
        <FormField
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email && formik.touched.email ? true : false}
          name="password"
          type="password"
          label={t('password')}
        />
        <CButton size="large" text={t('Login')} type="submit" />
      </form>
    </div>
  );
};

export default LoginForm;
