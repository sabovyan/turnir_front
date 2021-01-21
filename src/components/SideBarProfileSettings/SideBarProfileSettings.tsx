import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useAuth from '../../services/authentication';
import CButton from '../Buttons/CustomButton/CustomButton';
import FormField from '../Input/FormField';
import SideBarChangePassword from '../SideBarChangePassword/SideBarChangePassword';

interface Props {}

const SideBarProfileSettings = (props: Props) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Typography
        color="textSecondary"
        variant="h6"
        component="h3"
        style={{ margin: '1rem 0' }}
      >
        {t('Account')}
      </Typography>
      <FormField disabled label={t('name')} value={user.displayName} />
      <FormField disabled label={t('email')} value={user.email} />
      {user && !user.googleId && !user.facebookId ? (
        <SideBarChangePassword />
      ) : null}

      <Typography
        color="textSecondary"
        variant="h6"
        component="h3"
        style={{ margin: '1rem 0' }}
      >
        {t('logout')}
      </Typography>

      <CButton text={t('logout')} onClick={handleLogout} />
    </>
  );
};

export default SideBarProfileSettings;
