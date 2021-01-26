import React from 'react';

import SettingsSelect from '../SettingsSelect/SettingsSelect';
import SettingsListItem from '../SettingsListItem/SettingsListItem';
import { tablesArray } from '../../constants/quantity';

import { useTranslation } from 'react-i18next';
import { tableDescription } from '../../constants/description';

const Tables = () => {
  const { t } = useTranslation();
  return (
    <SettingsListItem header={t('Tables')} description={t(tableDescription)}>
      <SettingsSelect
        label={t('Number of Tables')}
        array={tablesArray}
        type={'Tables'}
        value={tablesArray[0]}
      />
    </SettingsListItem>
  );
};

export default Tables;
