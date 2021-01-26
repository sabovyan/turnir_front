import React from 'react';

import SettingsSelect from '../SettingsSelect/SettingsSelect';
import SettingsListItem from '../SettingsListItem/SettingsListItem';
import { tablesArray } from '../../constants/quantity';

import { useTranslation } from 'react-i18next';

const Tables = () => {
  const { t } = useTranslation();
  return (
    <SettingsListItem header={t('Tables')}>
      <SettingsSelect
        label={t('Number of Tables')}
        array={tablesArray}
        type={t('Tables')}
        value={tablesArray[0]}
      />
    </SettingsListItem>
  );
};

export default Tables;
