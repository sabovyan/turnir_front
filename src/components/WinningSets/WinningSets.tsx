import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { winningSetsArray } from '../../constants/quantity';
import SettingsListItem from '../SettingsListItem/SettingsListItem';
import SettingsSelect from '../SettingsSelect/SettingsSelect';
import { RootState } from '../../store/features';
import { setWinningSets } from '../../store/features/settingsInfo';

interface Props {}

const WinningSets = (props: Props) => {
  const { t } = useTranslation();

  const { winningSets } = useSelector((state: RootState) => state.settingsInfo);
  const dispatch = useDispatch();

  const handelGoalsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const winningSets = Number(value);
    dispatch(setWinningSets({ winningSets }));
  };
  return (
    <SettingsListItem header={t('Winning Sets')}>
      <SettingsSelect
        array={winningSetsArray}
        label={t('Winning Sets')}
        type={'Sets'}
        value={String(winningSets)}
        onChange={handelGoalsChange}
      />
    </SettingsListItem>
  );
};

export default WinningSets;
