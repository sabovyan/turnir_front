import React, { createRef, KeyboardEvent, useEffect, useState } from 'react';

import ParticipantsInputList from '../ParticipantsInputList/ParticipantsInputList';
import Typography from '@material-ui/core/Typography/Typography';
import CloseButton from '../common/Buttons/CloseButton/CloseButton';
import Card from '@material-ui/core/Card';

import { useTranslation } from 'react-i18next';

import styles from './ParticipantsInput.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { deletePlayerFromTournament } from '../../store/features/settingsInfo';
import ParticipantsInputForm from './PartisipantInputForm/ParticipantsInputForm';
import { Participant, Player } from '../../types/main.types';
import { RootState } from '../../store/features';

const createNewParticipant = ({ name }: { name: string }) => {
  return {
    name,
    ref: createRef<HTMLDivElement>(),
    focus: false,
    player: [],
  };
};

interface IParticipantsInputProps {
  icon: JSX.Element | null;
  name: string;
  goBackToCards: () => void;
  cardBackgroundColor: string;
}

const ParticipantInput = ({
  icon,
  name,
  goBackToCards,
  cardBackgroundColor,
}: IParticipantsInputProps) => {
  const {
    settingsInfo: { participants },
  } = useSelector((state: RootState) => state);

  // const [playersList, setPlayersList] = useState<Participant[]>(
  //   participants.map(createNewParticipant),
  // );

  // const dispatch = useDispatch();
  // const { t } = useTranslation();

  // const handleCloseButtonClick = () => {
  //   goBackToCards();
  // };

  // const setFocusedPlayer = (indicator: number) => {
  //   setPlayersList(
  //     (state) =>
  //       state &&
  //       state.map((pl, idx) =>
  //         idx === indicator ? { ...pl, focus: true } : { ...pl, focus: false },
  //       ),
  //   );
  // };

  // const handleListNavigation = (
  //   index: number,
  //   event: KeyboardEvent<HTMLDivElement>,
  // ) => {
  //   if (!playersList) {
  //     return;
  //   }

  //   const next = index + 1;
  //   const prev = index - 1;
  //   const start = 0;
  //   const last = playersList.length - 1;

  //   if (event.key === 'ArrowDown') {
  //     if (playersList[next]) {
  //       playersList[next].ref.current!.focus();
  //       setFocusedPlayer(next);
  //     } else {
  //       playersList[start].ref.current!.focus();
  //       setFocusedPlayer(start);
  //     }
  //   }

  //   if (event.key === 'ArrowUp') {
  //     if (playersList[prev]) {
  //       playersList[prev].ref.current!.focus();
  //       setFocusedPlayer(prev);
  //     } else {
  //       playersList[last].ref.current!.focus();
  //       setFocusedPlayer(last);
  //     }
  //   }
  // };

  // const handleListItemClick = (name: string) => {
  //   setPlayersList(
  //     (state) =>
  //       state &&
  //       state.map((player) =>
  //         player.name === name
  //           ? { ...player, focus: true }
  //           : { ...player, focus: false },
  //       ),
  //   );
  // };

  // const handleListItemMouseOver = (name: string) => {
  //   setPlayersList(
  //     (state) =>
  //       state &&
  //       state.map((player) =>
  //         player.name === name
  //           ? { ...player, focus: true }
  //           : { ...player, focus: false },
  //       ),
  //   );
  // };

  // const handlePlayerDelete = (name: string) => {
  //   const foundPlayers =
  //     playersList && playersList.find((player) => player.name === name);
  //   if (!foundPlayers) return;

  //   dispatch(deletePlayerFromTournament({ name: foundPlayers.name }));

  //   setPlayersList(
  //     (state) => state && state.filter((player) => player.name !== name),
  //   );
  // };

  // useEffect(() => {
  //   if (playersList.length !== participants.length) {
  //     setPlayersList(participants.map(createNewParticipant));
  //   }
  // }, [dispatch, participants, playersList]);

  return (
    <div className={styles.container}>
      <Card raised style={{ minWidth: 500, maxWidth: 500 }}>
        <div
          className={styles.hero}
          style={{
            background: cardBackgroundColor,
          }}
        >
          <CloseButton
            style={{ alignSelf: 'flex-end', color: 'white' }}
            // onClick={handleCloseButtonClick}
          />
          <div className={styles.heroIdentity}>
            {icon}

            <Typography variant="h5" style={{ color: 'white', padding: 10 }}>
              {/* {t(name)} */}
              {name}
            </Typography>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <ParticipantsInputForm />

          {/* <ParticipantsInputList
            playersList={playersList}
            handleListItemKeyEvent={handleListNavigation}
            onListItemClick={handleListItemClick}
            onListItemMouseOver={handleListItemMouseOver}
            onDeleteIconClick={handlePlayerDelete}
          /> */}
        </div>
      </Card>
    </div>
  );
};

export default ParticipantInput;
