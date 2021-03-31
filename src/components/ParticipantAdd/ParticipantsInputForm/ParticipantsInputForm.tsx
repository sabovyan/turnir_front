import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useTranslation } from 'react-i18next';

import InputWithSearch from './InputWithSearch';
import MarkBox from 'src/components/common/MarkBox/MarkBox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/features';
import { PlayersType } from 'src/types/main.types';
import { changeManualSetPlayersStatus } from 'src/store/features/settingsInfo';

const ParticipantsInputForm = () => {
  const { playerType, hasManualCombiner } = useSelector(
    (state: RootState) => state.settingsInfo,
  );
  const dispatch = useDispatch();

  const handleSetPlayerCheckBox = () => {
    dispatch(changeManualSetPlayersStatus(!hasManualCombiner));
  };
  const { t } = useTranslation();

  return (
    <div style={{ margin: '10px', padding: '1rem', position: 'relative' }}>
      <Typography
        color="textSecondary"
        style={{ alignSelf: 'flex-start', margin: '10px 0' }}
      >
        {t('Enter names of the players')}
      </Typography>
      <InputWithSearch />
      {playerType === PlayersType.DYP ? (
        <MarkBox
          label="Set Players"
          checked={hasManualCombiner}
          onChange={handleSetPlayerCheckBox}
          style={{ alignSelf: 'flex-start', margin: 0 }}
        />
      ) : null}
    </div>
  );
};

export default ParticipantsInputForm;
