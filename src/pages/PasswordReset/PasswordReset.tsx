import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import React, { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import CButton from '../../components/Buttons/CustomButton/CustomButton';
import CustomBackdrop from '../../components/CustomBackdrop/CustomBackdrop';
import FormField from '../../components/Input/FormField';
import useAuth from '../../services/authentication';
import { setResponseStatus } from '../../store/features/formResponseStatus';
import passwordValidateSchema from './passwordReset.validate';

interface Props {}

const PasswordReset = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setNewPassword } = useAuth();
  const { token } = useParams<{ token: string }>();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      repeatNewPassword: '',
    },
    validationSchema: passwordValidateSchema,
    onSubmit: async (values) => {
      const password = values.newPassword;

      try {
        const resp = await setNewPassword(password, token);
        const message = resp.data;

        dispatch(
          setResponseStatus({
            type: 'success',
            message: t(message),
            open: true,
          }),
        );
        history.push('/');
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

  const handleChangePasswordForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPasswordError =
      formik.touched.newPassword && formik.errors.newPassword;
    const repeatNewPasswordError =
      formik.touched.repeatNewPassword && formik.errors.repeatNewPassword;

    if (newPasswordError) {
      dispatch(
        setResponseStatus({
          type: 'error',
          message: t(newPasswordError),
          open: true,
        }),
      );
    } else if (repeatNewPasswordError) {
      dispatch(
        setResponseStatus({
          type: 'error',
          message: t(repeatNewPasswordError),
          open: true,
        }),
      );
    } else {
      formik.handleSubmit(e);
    }
  };

  return (
    <CustomBackdrop open={true} zIndex={1}>
      <form
        onSubmit={handleChangePasswordForm}
        style={{
          width: '400px',
          display: 'flex',
          background: 'white',
          flexDirection: 'column',
          padding: '3rem',
          borderRadius: '5px',
          boxShadow: '2px 2px 10px #a3a3a3, -1px -1px 3px #e3e3e3',
        }}
      >
        <Typography
          color="textSecondary"
          variant="h6"
          component="h3"
          style={{ margin: '1rem 0' }}
        >
          {t('password')}
        </Typography>
        <FormField
          type="password"
          name="newPassword"
          label={t('New password')}
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.newPassword && formik.errors.newPassword
              ? true
              : false
          }
        />
        <FormField
          type="password"
          name="repeatNewPassword"
          label={t('Repeat new password')}
          value={formik.values.repeatNewPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.repeatNewPassword && formik.errors.repeatNewPassword
              ? true
              : false
          }
        />
        <CButton
          type="submit"
          text={t('confirm')}
          cssStyles={{ margin: '2rem' }}
        />
      </form>
    </CustomBackdrop>
  );
};

export default PasswordReset;
