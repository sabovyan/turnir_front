import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { pointsArray } from 'src/constants/quantity';
import { RootState } from 'src/store/features';
import {
  setPointsForDraw,
  setPointsForWin,
} from 'src/store/features/settingsInfo';
import SettingsListItem from '../SettingsListItem/SettingsListItem';
import SettingsSelect from '../SettingsSelect/SettingsSelect';

interface Props {}

type PointsType = 'win' | 'draw';

const Points = (props: Props) => {
  const { t } = useTranslation();

  const { pointsForWin, pointsFoDraw } = useSelector(
    (state: RootState) => state.settingsInfo,
  );
  const dispatch = useDispatch();

  const handlePointsChange = (type: PointsType) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    const points = Number(value);

    if (type === 'win') {
      dispatch(setPointsForWin({ pointsForWin: points }));
    } else {
      dispatch(setPointsForDraw({ pointsFoDraw: points }));
    }
  };
  return (
    <SettingsListItem
      header="Points"
      description={
        "The 'points for scarce matches' setting allows points to be awarded, to the loser of a game, that has a scarce goal difference. For multiple sets or disciplines, all goals of that matches are added."
      }
    >
      <SettingsSelect
        array={pointsArray}
        label={t('Points for Win')}
        type={'Points'}
        value={String(pointsForWin)}
        onChange={handlePointsChange('win')}
      />
      <SettingsSelect
        array={pointsArray}
        label={t('Points for Draw')}
        type={'Points'}
        value={String(pointsFoDraw)}
        onChange={handlePointsChange('draw')}
        disabled
      />
    </SettingsListItem>
  );
};

export default Points;
