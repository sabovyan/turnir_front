import React from 'react';
import List from '@material-ui/core/List';

import styles from './ParticipantsInputList.module.css';

import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { Participant } from '../../../types/main.types';

interface Props {
  playersList: Participant[] | undefined;
  onDeleteIconClick: (value: string) => void;
}

const ParticipantsList = ({ playersList, onDeleteIconClick }: Props) => {
  const handleDeleteIconClick = (value: string) => () => {
    onDeleteIconClick(value);
  };

  return (
    <List
      className={styles.inputList}
      style={{ margin: '1rem', padding: '0 1rem 1rem' }}
    >
      {playersList && playersList.length
        ? playersList.map((el, idx) => (
            <div className={styles.inputListItem} key={el.name}>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <span className={styles.inputListDigit}>{idx + 1}.</span>
                <span>{el.name}</span>
              </div>

              <IconButton
                style={{ borderRadius: 0 }}
                onClick={handleDeleteIconClick(el.name)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))
        : null}
    </List>
  );
};

export default ParticipantsList;
