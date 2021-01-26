import React from 'react';
import { useTranslation } from 'react-i18next';
import { goalsDescription } from '../../constants/description';
import { goalsArray } from '../../constants/quantity';
import SettingsListItem from '../SettingsListItem/SettingsListItem';
import SettingsSelect from '../SettingsSelect/SettingsSelect';

interface Props {}

const Goals = (props: Props) => {
  const { t } = useTranslation();
  return (
    <SettingsListItem header={t('Goals')} description={t(goalsDescription)}>
      <SettingsSelect
        label={t('Goals to Win')}
        array={goalsArray}
        type={'Goals'}
        value={goalsArray[6]}
      />
    </SettingsListItem>
  );
};

export default Goals;
