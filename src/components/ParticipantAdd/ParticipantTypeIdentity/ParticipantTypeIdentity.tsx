import React from 'react';
import DrawYourPartnerIcon from 'src/components/icons/DrawYourPartnerIcon/DrawYourPartnerIcon';
import CloseButton from 'src/components/common/Buttons/CloseButton/CloseButton';
import SingleIcon from 'src/components/icons/Single/SingleIcon';
import TeamsIcon from 'src/components/icons/Teams/TeamsIcon';
import Typography from '@material-ui/core/Typography';

import { changePlayerType } from 'src/store/features/settingsInfo';
import { PlayersType } from 'src/types/main.types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'src/store/features';

import personCardIconStyle from 'src/styles/personCardIconStyle';
import styles from './ParticipantTypeIdentity.module.css';
import Colors from 'src/styles/colors';
import Monster from 'src/components/icons/monster/Monster';

const ParticipantTypeIdentity = () => {
  const { playerType } = useSelector((state: RootState) => state.settingsInfo);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleCloseButtonClick = () => {
    dispatch(changePlayerType(PlayersType.none));
  };

  return (
    <div
      className={styles.container}
      style={{
        background:
          playerType === PlayersType.single
            ? Colors.single
            : playerType === PlayersType.team
            ? Colors.teams
            : playerType === PlayersType.DYP || playerType === PlayersType.DYP2
            ? Colors.DrawYourPartner
            : playerType === PlayersType.MDYP
            ? Colors.monster
            : 'black',
      }}
    >
      <CloseButton
        style={{ alignSelf: 'flex-end', color: 'white' }}
        onClick={handleCloseButtonClick}
      />
      <div className={styles.iconWrapper}>
        {playerType === PlayersType.single ? (
          <SingleIcon style={personCardIconStyle} />
        ) : playerType === PlayersType.team ? (
          <TeamsIcon style={personCardIconStyle} />
        ) : playerType === PlayersType.DYP ||
          playerType === PlayersType.DYP2 ? (
          <DrawYourPartnerIcon style={personCardIconStyle} />
        ) : playerType === PlayersType.MDYP ? (
          <Monster style={personCardIconStyle} />
        ) : null}
        <Typography variant="h5" style={{ color: 'white', padding: 10 }}>
          {playerType === PlayersType.single
            ? t('Single')
            : playerType === PlayersType.team
            ? t('Team')
            : playerType === PlayersType.DYP || playerType === PlayersType.DYP2
            ? t('Draw your partner')
            : playerType === PlayersType.MDYP
            ? t('MonsterDYP')
            : null}
        </Typography>
      </div>
    </div>
  );
};

export default ParticipantTypeIdentity;
