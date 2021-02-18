import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { goalsDescription } from '../../constants/description';
import { goalsArray } from '../../constants/quantity';
import SettingsListItem from '../SettingsListItem/SettingsListItem';
import SettingsSelect from '../SettingsSelect/SettingsSelect';
import { RootState } from '../../store/features';
import { setGoalsQuantity } from '../../store/features/settingsInfo';

interface Props {}

const Goals = (props: Props) => {
  const { t } = useTranslation();

  const { goalsToWin } = useSelector((state: RootState) => state.settingsInfo);
  const dispatch = useDispatch();

  const handelGoalsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const goalsToWin = Number(value);
    dispatch(setGoalsQuantity({ goalsToWin }));
  };

  return (
    <SettingsListItem header={t('Goals')} description={t(goalsDescription)}>
      <SettingsSelect
        label={t('Goals to Win')}
        array={goalsArray}
        type={'Goals'}
        value={String(goalsToWin)}
        onChange={handelGoalsChange}
      />
    </SettingsListItem>
  );
};

export default Goals;
