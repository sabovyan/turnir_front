import React, { useEffect, useState } from 'react';

import ParticipantsList from './ParticipantsList/ParticipantsList';

import Card from '@material-ui/core/Card';

import { useTranslation } from 'react-i18next';

import styles from './ParticipantsInput.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { deletePlayerFromTournament } from '../../store/features/settingsInfo';
import ParticipantsInputForm from './ParticipantsInputForm/ParticipantsInputForm';
import { Participant } from '../../types/main.types';
import { RootState } from '../../store/features';
import ViewWrapper from '../common/ViewWrapper/ViewWrapper';
import ParticipantTypeIdentity from './ParticipantTypeIdentity/ParticipantTypeIdentity';

const createNewParticipant = ({ name }: { name: string }) => {
  return {
    name,
    players: [],
  };
};

interface IParticipantsInputProps {
  icon: JSX.Element | null;
  name: string;
  goBackToCards: () => void;
  cardBackgroundColor: string;
}

const ParticipantAdd = ({
  icon,
  name,
  goBackToCards,
  cardBackgroundColor,
}: IParticipantsInputProps) => {
  const {
    settingsInfo: { participants },
  } = useSelector((state: RootState) => state);

  const [playersList, setPlayersList] = useState<Participant[]>(
    participants.map(createNewParticipant),
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleCloseButtonClick = () => {
    goBackToCards();
  };

  const handlePlayerDelete = (name: string) => {
    const foundPlayers =
      playersList && playersList.find((player) => player.name === name);
    if (!foundPlayers) return;

    dispatch(deletePlayerFromTournament({ name: foundPlayers.name }));

    setPlayersList(
      (state) => state && state.filter((player) => player.name !== name),
    );
  };

  useEffect(() => {
    if (playersList.length !== participants.length) {
      setPlayersList(participants.map(createNewParticipant));
    }
  }, [dispatch, participants, playersList]);

  return (
    <ViewWrapper style={{ height: 'calc(100vh - 300px)' }}>
      <Card raised style={{ width: 500 }}>
        <ParticipantTypeIdentity
          bgColor={cardBackgroundColor}
          icon={icon}
          name={name}
          onCloseButtonClick={handleCloseButtonClick}
        />
        <div className={styles.inputContainer}>
          <ParticipantsInputForm />

          <ParticipantsList
            playersList={playersList}
            onDeleteIconClick={handlePlayerDelete}
          />
        </div>
      </Card>
    </ViewWrapper>
  );
};

export default ParticipantAdd;
