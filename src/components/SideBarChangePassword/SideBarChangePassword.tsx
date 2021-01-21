import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CButton from '../Buttons/CustomButton/CustomButton';
import FormField from '../Input/FormField';

interface Props {}

const SideBarChangePassword = (props: Props) => {
  const { t } = useTranslation();
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
      <form>
        <FormField label={t('Current password')} />
        <FormField label={t('New password')} />
        <FormField label={t('Repeat new password')} />
        <CButton type="submit" text={t('CHANGE PASSWORD')} />
      </form>
    </div>
  );
};

export default SideBarChangePassword;
