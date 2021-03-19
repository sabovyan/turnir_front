import React, { FC, FormEvent } from 'react';
import CButton from '../../common/Buttons/CustomButton/CustomButton';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import FormField from '../../Input/FormField';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setResponseStatus } from '../../../store/features/formResponseStatus';
import useAuth from '../../../services/authentication';
import { setEmail } from '../../../store/features/requestPasswordEmail';
import { Button } from '@material-ui/core';

interface IRequestPasswordForm {
  changeViewToLogin: () => void;
  changeViewToConfirm: () => void;
}

const RequestPasswordForm: FC<IRequestPasswordForm> = ({
  changeViewToLogin,
  changeViewToConfirm,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { resetPassword } = useAuth();

  const handleBackToLogin = () => {
    changeViewToLogin();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .trim()
        .lowercase()
        .email('Invalid email')
        .required('email is required'),
    }),

    onSubmit: async (values) => {
      dispatch(setEmail(formik.values.email));

      try {
        const resp = await resetPassword(values.email);
        const { data } = resp;

        dispatch(
          setResponseStatus({ type: 'success', message: t(data), open: true }),
        );

        changeViewToConfirm();
      } catch (err) {
        console.log(err.response);
        dispatch(
          setResponseStatus({
            type: 'error',
            message: t(err.response.data.error),
            open: true,
          }),
        );
      }
    },
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = formik.touched.email && formik.errors.email;
    if (error) {
      dispatch(
        setResponseStatus({ type: 'error', message: t(error), open: true }),
      );
    } else {
      formik.handleSubmit(e);
    }
  };

  return (
    <>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
        }}
        onSubmit={handleFormSubmit}
      >
        <Typography
          style={{ alignSelf: 'center', margin: '1rem 0' }}
          color="textSecondary"
          variant="h6"
          component="h3"
        >
          {t('Request new password')}
        </Typography>
        <FormField
          label={t('email')}
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email && formik.touched.email ? true : false}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '90%',
          }}
        >
          <Button onClick={handleBackToLogin}>{t('back to login')}</Button>
          <CButton type="submit" text={t('confirm')} />
        </div>
      </form>
    </>
  );
};

export default RequestPasswordForm;
