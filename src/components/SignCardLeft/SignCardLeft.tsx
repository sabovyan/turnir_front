import React from 'react';
import Typography from '@material-ui/core/Typography';

import './SignCardLeft.css';
import { useTranslation } from 'react-i18next';

const SignCardLeft = () => {
  const { t } = useTranslation();
  return (
    <div className="cardLeft">
      <Typography variant="h6" component="h4" style={{ margin: ' 30px 20px' }}>
        {t('Why sign up?')}
      </Typography>
      <ul className="advantage-list">
        <li className="advantage-list__item">
          {t('Sync your tournaments across devices')}
        </li>
        <li className="advantage-list__item">{t('Backup your data')}</li>
        <li className="advantage-list__item">{t('It’s free!')}</li>
      </ul>
    </div>
  );
};

export default SignCardLeft;
