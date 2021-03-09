import React, {
  ChangeEvent,
  createRef,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';

import ParticipantsInputList from '../ParticipantsInputList/ParticipantsInputList';
import Typography from '@material-ui/core/Typography/Typography';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import Card from '@material-ui/core/Card';

import { useTranslation } from 'react-i18next';

import styles from './ParticipantsInput.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { setResponseStatus } from '../../store/features/formResponseStatus';
import {
  addNewPlayer,
  deletePlayerByName,
  editPlayerName,
  getPlayers,
} from '../../store/features/settingsInfo';
import ParticipantsInputForm from './PartisipantInputForm/ParticipantsInputForm';
import { Player } from '../../types/main.types';
import { generateId } from '../ParticipantsInputList/ParticipantsInput.util';
import { RootState } from '../../store/features';

const getPlayerId = generateId();

const createNewPlayer = ({ name }: { name: string }) => {
  return {
    name: name.trim(),
    ref: createRef<HTMLDivElement>(),
    focus: false,
    edit: false,
    id: getPlayerId(),
  };
};

interface IParticipantsInputProps {
  icon: JSX.Element | null;
  name: string;
  goBackToCards: () => void;
  cardBackgroundColor: string;
  selectedGroup: number | false;
}

const ParticipantInput = ({
  icon,
  name,
  goBackToCards,
  cardBackgroundColor,
  selectedGroup,
}: IParticipantsInputProps) => {
  const {
    settingsInfo: { players },
  } = useSelector((state: RootState) => state);

  const [currentPlayerName, setCurrentPlayerName] = useState<string>('');
  const [playersList, setPlayersList] = useState<Player[]>(
    players.map(createNewPlayer),
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleCloseButtonClick = () => {
    goBackToCards();
  };

  const handleNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCurrentPlayerName(value);
  };

  const handleNameInputSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (!currentPlayerName.length) {
      dispatch(
        setResponseStatus({
          type: 'error',
          message: "Please fill in the player's name",
          open: true,
        }),
      );
      return;
    }

    const isPLayerExists =
      playersList !== undefined &&
      playersList.some((el) => el.name === currentPlayerName.trim());
    if (isPLayerExists) {
      dispatch(
        setResponseStatus({
          type: 'error',
          message: 'Names of the players should be different',
          open: true,
        }),
      );
      return;
    }

    dispatch(addNewPlayer({ name: currentPlayerName.trim() }));

    setCurrentPlayerName('');
  };

  /* players list control zone */

  const setFocusedPlayer = (indicator: number) => {
    setPlayersList(
      (state) =>
        state &&
        state.map((pl, idx) =>
          idx === indicator && !pl.edit
            ? { ...pl, focus: true }
            : { ...pl, focus: false },
        ),
    );
  };

  const handleListNavigation = (
    index: number,
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (!playersList) {
      return;
    }

    const next = index + 1;
    const prev = index - 1;
    const start = 0;
    const last = playersList.length - 1;

    if (event.key === 'ArrowDown') {
      if (playersList[next]) {
        playersList[next].ref.current!.focus();
        setFocusedPlayer(next);
      } else {
        playersList[start].ref.current!.focus();
        setFocusedPlayer(start);
      }
    }

    if (event.key === 'ArrowUp') {
      if (playersList[prev]) {
        playersList[prev].ref.current!.focus();
        setFocusedPlayer(prev);
      } else {
        playersList[last].ref.current!.focus();
        setFocusedPlayer(last);
      }
    }

    if (event.key === 'Enter') {
      setPlayersList(
        (state) =>
          state &&
          state.map((pl, idx) =>
            idx === index
              ? { ...pl, edit: !pl.edit, draft: pl.name }
              : { ...pl, edit: false },
          ),
      );
    }
  };

  const handlePlayerNameEdit = (
    id: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;

    setPlayersList(
      (state) =>
        state &&
        state.map((pl) => (id === pl.id ? { ...pl, draft: value } : pl)),
    );
  };

  const applyEditedNameOfPlayer = (
    id: number,
    value: string | undefined,
    name: string,
  ) => {
    if (!playersList || !playersList.length) {
      return;
    }

    if (!value) {
      dispatch(editPlayerName({ prevName: name, newName: name }));
      setPlayersList(
        (state) =>
          state &&
          state.map((player) =>
            player.id === id ? { ...player, edit: false } : player,
          ),
      );
      return;
    }

    const isPlayerExists = playersList.some(
      (pl) => id !== pl.id && pl.name === value.trim(),
    );

    if (isPlayerExists) {
      dispatch(
        setResponseStatus({
          type: 'error',
          message: 'Names of the players should be different',
          open: true,
        }),
      );
      return;
    }

    dispatch(editPlayerName({ prevName: name, newName: value }));

    setPlayersList(
      (state) =>
        state &&
        state.map((player) =>
          player.id === id ? { ...player, edit: false, name: value } : player,
        ),
    );

    const currentIndex = playersList.findIndex((player) => player.id === id);

    const next = currentIndex + 1;

    if (currentIndex >= 0) {
      if (next > playersList.length - 1) {
        playersList[0].ref.current!.focus();
        setFocusedPlayer(0);
      } else {
        playersList[next].ref.current!.focus();
        setFocusedPlayer(next);
      }
    }
  };

  const handlePlayerEditFormSubmit = (
    id: number,
    value: string | undefined,
  ) => {
    applyEditedNameOfPlayer(id, value, name);
  };

  const handlePlayerNameBlur = (
    id: number,
    value: string | undefined,
    name: string,
  ) => {
    applyEditedNameOfPlayer(id, value, name);
  };

  const handleListItemClick = (id: number) => {
    setPlayersList(
      (state) =>
        state &&
        state.map((player) =>
          player.id === id
            ? { ...player, focus: true }
            : { ...player, focus: false, edit: false },
        ),
    );
  };

  const handleEditIconClick = (id: number) => {
    setPlayersList(
      (state) =>
        state &&
        state.map((player) =>
          player.id === id
            ? { ...player, edit: true, draft: player.name }
            : player,
        ),
    );
  };

  const handleListItemMouseOver = (id: number) => {
    setPlayersList(
      (state) =>
        state &&
        state.map((player) =>
          player.id === id
            ? { ...player, focus: true }
            : { ...player, focus: false },
        ),
    );
  };

  const handlePlayerDelete = (id: number) => {
    const foundPlayers =
      playersList && playersList.find((player) => player.id === id);
    if (!foundPlayers) return;

    dispatch(deletePlayerByName({ name: foundPlayers.name }));

    setPlayersList(
      (state) => state && state.filter((player) => player.id !== id),
    );
  };

  useEffect(() => {
    /* [B.U.G.]: needs different solution */
    if (playersList.length !== players.length) {
      setPlayersList(players.map(createNewPlayer));
    }
    // if (selectedGroup) {
    //   setPlayersList(players.map(createNewPlayer));
    // }
  }, [dispatch, players, playersList, selectedGroup]);

  return (
    <div className={styles.container}>
      <Card raised style={{ minWidth: 500 }}>
        <div
          className={styles.hero}
          style={{
            background: cardBackgroundColor,
          }}
        >
          <CloseButton
            style={{ alignSelf: 'flex-end', color: 'white' }}
            onClick={handleCloseButtonClick}
          />
          <div className={styles.heroIdentity}>
            {icon}

            <Typography variant="h5" style={{ color: 'white', padding: 10 }}>
              {t(name)}
            </Typography>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <ParticipantsInputForm
            currentPlayerName={currentPlayerName}
            handleNameInputChange={handleNameInputChange}
            handleNameInputSubmit={handleNameInputSubmit}
          />
          <ParticipantsInputList
            playersList={playersList}
            handleListItemKeyEvent={handleListNavigation}
            onPlayerNameChange={handlePlayerNameEdit}
            OnPlayerNameBlur={handlePlayerNameBlur}
            onEditFormSubmit={handlePlayerEditFormSubmit}
            onListItemClick={handleListItemClick}
            onEditIconClick={handleEditIconClick}
            onListItemMouseOver={handleListItemMouseOver}
            onDeleteIconClick={handlePlayerDelete}
          />
        </div>
      </Card>
    </div>
  );
};

export default ParticipantInput;
