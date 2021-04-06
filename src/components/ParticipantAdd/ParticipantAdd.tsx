import React from 'react';

import ParticipantTypeIdentity from './ParticipantTypeIdentity/ParticipantTypeIdentity';
import ParticipantsInputForm from './ParticipantsInputForm/ParticipantsInputForm';
import ViewWrapper from 'src/components/common/ViewWrapper/ViewWrapper';
import ParticipantsList from './ParticipantsList/ParticipantsList';
import Card from '@material-ui/core/Card';
import { RootState } from 'src/store/features';
import { useSelector } from 'react-redux';
import { PlayersType } from 'src/types/main.types';
import ParticipantsCombine from './ParticipantsCombine/ParticipantsCombine';

import styles from './ParticipantsInput.module.css';

const ParticipantAdd = () => {
  const {
    settingsInfo: { playerType },
  } = useSelector((state: RootState) => state);

  return (
    <ViewWrapper>
      <Card raised style={{ minWidth: 500 }}>
        <ParticipantTypeIdentity />
        <div className={styles.inputContainer}>
          {playerType === PlayersType.DYP2 ? (
            <ParticipantsCombine />
          ) : (
            <>
              <ParticipantsInputForm />
              <ParticipantsList />
            </>
          )}
        </div>
      </Card>
    </ViewWrapper>
  );
};

export default ParticipantAdd;
