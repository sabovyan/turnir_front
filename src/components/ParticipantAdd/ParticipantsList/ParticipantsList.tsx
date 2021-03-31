import React from 'react';
import List from '@material-ui/core/List';

import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { PlayerSideSymbol, Side } from '../../../types/main.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/features';
import {
  changePlayersSideStatus,
  deletePlayerFromTournament,
} from 'src/store/features/settingsInfo';
import { PlayersType } from 'src/types/main.types';
import Colors from 'src/styles/colors';

import styles from './ParticipantsInputList.module.css';

type PlayerSideType = {
  value: PlayerSideSymbol;
  side: Side;
};

const PLAYER_SIDES: PlayerSideType[] = [
  { side: Side.left, value: PlayerSideSymbol.left },
  { value: PlayerSideSymbol.neutral, side: Side.neutral },
  { value: PlayerSideSymbol.right, side: Side.right },
];

const ParticipantsList = () => {
  const {
    settingsInfo: { participants, playerType, hasManualCombiner },
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  const handleSideIconClick = (name: string, side: Side) => () => {
    dispatch(changePlayersSideStatus({ name, side }));
  };

  const handleDeleteIconClick = (name: string) => () => {
    const foundPlayers =
      participants && participants.find((player) => player.name === name);
    if (!foundPlayers) return;

    dispatch(deletePlayerFromTournament({ name: foundPlayers.name }));
  };

  return (
    <List
      className={styles.inputList}
      style={{ margin: '1rem', padding: '0 1rem 1rem' }}
    >
      {participants && participants.length
        ? participants.map((participant, idx) => (
            <li className={styles.inputListItem} key={participant.name}>
              <div
                className={styles.inputListItemContext}
                key={participant.name}
              >
                <div style={{ display: 'flex' }}>
                  <span className={styles.inputListDigit}>{idx + 1}.</span>
                  <span>{participant.name}</span>
                </div>

                <IconButton
                  style={{ borderRadius: 0 }}
                  onClick={handleDeleteIconClick(participant.name)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
              <div className={styles.setPlayers}>
                {playerType === PlayersType.DYP && hasManualCombiner
                  ? PLAYER_SIDES.map((button) => (
                      <div
                        key={button.side}
                        className={styles.setPlayersItem}
                        onClick={handleSideIconClick(
                          participant.name,
                          button.side,
                        )}
                        style={{
                          background:
                            participant.side === Side.neutral &&
                            button.side === Side.neutral
                              ? Colors.neutral
                              : participant.side !== Side.neutral &&
                                participant.side === button.side
                              ? Colors.primary
                              : 'white',
                          color:
                            participant.side !== Side.neutral &&
                            participant.side === button.side
                              ? 'white'
                              : 'black',
                        }}
                      >
                        {button.value}
                      </div>
                    ))
                  : null}
              </div>
            </li>
          ))
        : null}
    </List>
  );
};

export default ParticipantsList;
