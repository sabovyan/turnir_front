import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import React, { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import useAuth from '../../services/authentication';
import { setResponseStatus } from '../../store/features/formResponseStatus';
import { ChangePasswordData } from '../../types/main.types';
import CButton from '../Buttons/CustomButton/CustomButton';
import FormField from '../Input/FormField';
import ChangePasswordSchema from './SideBarChangePassword.validate';

interface Props {}

const SideBarChangePassword = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, updatePassword } = useAuth();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values) => {
      const { oldPassword, newPassword } = values;
      try {
        const data: ChangePasswordData = {
          id: user.id,
          oldPassword,
          newPassword,
        };

        const resp = await updatePassword(data);

        const message = resp.data;
        console.log(resp);
        console.log(user);
        dispatch(
          setResponseStatus({
            type: 'success',
            message: t(message),
            open: true,
          }),
        );
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

    const oldPasswordError =
      formik.touched.oldPassword && formik.errors.oldPassword;
    const newPasswordError =
      formik.touched.newPassword && formik.errors.newPassword;
    const repeatNewPasswordError =
      formik.touched.repeatNewPassword && formik.errors.repeatNewPassword;

    if (oldPasswordError) {
      console.log(oldPasswordError);
      dispatch(
        setResponseStatus({
          type: 'error',
          message: t(oldPasswordError),
          open: true,
        }),
      );
    } else if (newPasswordError) {
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
    <div>
      <Typography
        color="textSecondary"
        variant="h6"
        component="h3"
        style={{ margin: '1rem 0' }}
      >
        {t('password')}
      </Typography>
      <form onSubmit={handleChangePasswordForm}>
        <FormField
          name="oldPassword"
          label={t('Current password')}
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.oldPassword && formik.errors.oldPassword
              ? true
              : false
          }
        />
        <FormField
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
        <CButton type="submit" text={t('CHANGE PASSWORD')} />
      </form>
    </div>
  );
};

export default SideBarChangePassword;
