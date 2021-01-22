import React, { FC, FormEvent } from 'react';
import CButton from '../../Buttons/CustomButton/CustomButton';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import FormField from '../../Input/FormField';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setResponseStatus } from '../../../store/features/formResponseStatus';
import useAuth from '../../../services/authentication';

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
      console.log(values);
      const resp = await resetPassword(values.email);
      console.log(resp);
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
      changeViewToConfirm();
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
        <CButton
          type="submit"
          text={t('confirm')}
          cssStyles={{ alignSelf: 'center' }}
        />
        <Typography
          color="primary"
          variant="body1"
          component="p"
          onClick={handleBackToLogin}
          style={{
            alignSelf: 'flex-end',
            cursor: 'pointer',
            margin: '1rem 0',
          }}
        >
          {t('back to login')}
        </Typography>
      </form>
    </>
  );
};

export default RequestPasswordForm;
