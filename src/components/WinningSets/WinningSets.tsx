import React from 'react';
import { useTranslation } from 'react-i18next';
import { winningSetsArray } from '../../constants/quantity';
import SettingsListItem from '../SettingsListItem/SettingsListItem';
import SettingsSelect from '../SettingsSelect/SettingsSelect';

interface Props {}

const WinningSets = (props: Props) => {
  const { t } = useTranslation();
  return (
    <SettingsListItem header={t('Winning Sets')}>
      <SettingsSelect
        array={winningSetsArray}
        label={t('Winning Sets')}
        type={'Sets'}
        value={winningSetsArray[0]}
      />
    </SettingsListItem>
  );
};

export default WinningSets;
