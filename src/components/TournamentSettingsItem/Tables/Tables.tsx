import React, { ChangeEvent } from 'react';

import SettingsSelect from '../../SettingsSelect/SettingsSelect';
import SettingsListItem from '../../SettingsListItem/SettingsListItem';
import { tablesArray } from '../../../constants/quantity';

import { useTranslation } from 'react-i18next';
import { tableDescription } from '../../../constants/description';
import { setTablesQuantity } from '../../../store/features/settingsInfo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/features';

const Tables = () => {
  const { t } = useTranslation();

  const { tables } = useSelector((state: RootState) => state.settingsInfo);
  const dispatch = useDispatch();

  const handleTablesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const tables = Number(value);

    dispatch(setTablesQuantity({ tables }));
  };
  return (
    <SettingsListItem header={t('Tables')} description={t(tableDescription)}>
      <SettingsSelect
        label={t('Number of Tables')}
        array={tablesArray}
        type={'Tables'}
        firstItemType={'Table'}
        value={String(tables)}
        onChange={handleTablesChange}
      />
    </SettingsListItem>
  );
};

export default Tables;
