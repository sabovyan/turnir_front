import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import CButton from '../../Buttons/CustomButton/CustomButton';
import FormField from '../../Input/FormField';

import { SignFormData } from '../../../types/main.types';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import RegisterSchema from './Register.validate';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import CustomSnackbar from '../../CustomSnackBar/CustomSnackBar';
import { setResponseStatus } from '../../../store/features/formResponseStatus';
import { authRequest } from '../../../api';

const initialValues: SignFormData<string> = {
  displayName: '',
  email: '',
  password: '',
};

const RegisterForm: FC = (): JSX.Element => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      authRequest
        .doPost('email', { ...values })
        .then((res) => {
          console.log(res.status);
          dispatch(
            setResponseStatus({
              type: 'success',
              message: res.data.message,
              open: true,
            }),
          );
        })
        .catch((err) => {
          if (!err.response) {
            dispatch(
              setResponseStatus({
                type: 'error',
                message: err.message,
                open: true,
              }),
            );
            return;
          }

          const {
            response: {
              data: { error },
            },
          } = err;
          dispatch(
            setResponseStatus({ type: 'error', message: error, open: true }),
          );
        });
    },
  });

  const handleSubmitRegisterForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameError = formik.touched.displayName && formik.errors.displayName;
    const emailError = formik.touched.email && formik.errors.email;
    const passwordError = formik.touched.password && formik.errors.password;

    if (nameError) {
      dispatch(
        setResponseStatus({
          type: 'error',
          message: t(nameError),
          open: true,
        }),
      );
    } else if (emailError) {
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
        onSubmit={handleSubmitRegisterForm}
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
          name="displayName"
          label={t('name')}
          onChange={formik.handleChange}
          value={formik.values.displayName}
          onBlur={formik.handleBlur}
          error={
            formik.touched.displayName && formik.errors.displayName
              ? true
              : false
          }
        />
        <FormField
          type="email"
          name="email"
          label={t('email')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email ? true : false}
        />
        <FormField
          type="password"
          name="password"
          label={t('password')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={
            formik.touched.password && formik.errors.password ? true : false
          }
        />
        <CButton type="submit" size="large" text={t('Sign up')} />
      </form>
    </div>
  );
};

export default RegisterForm;
