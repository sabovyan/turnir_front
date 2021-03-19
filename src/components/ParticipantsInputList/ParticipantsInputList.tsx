import React, {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import List from '@material-ui/core/List';

import styles from './ParticipantsInputList.module.css';
import FormField from '../Input/FormField';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { Player } from '../../types/main.types';

interface Props {
  playersList: Player[] | undefined;
  handleListItemKeyEvent: (
    index: number,
    event: KeyboardEvent<HTMLDivElement>,
  ) => void;
  onListItemClick: (value: string) => void;
  onListItemMouseOver: (value: string) => void;
  onDeleteIconClick: (value: string) => void;
}

const ParticipantsInputList = ({
  playersList,
  handleListItemKeyEvent,
  onListItemClick,
  onListItemMouseOver,
  onDeleteIconClick,
}: Props) => {
  const handleListNavigation = (index: number) => (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    handleListItemKeyEvent(index, event);
  };

  const handleListItemClick = (value: string) => (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    onListItemClick(value);
  };

  const handleListItemMouseOver = (value: string) => () => {
    onListItemMouseOver(value);
  };

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
            <div
              className={styles.inputListItem}
              key={el.name}
              tabIndex={0}
              onKeyDown={handleListNavigation(idx)}
              onClick={handleListItemClick(el.name)}
              onMouseEnter={handleListItemMouseOver(el.name)}
              onMouseOver={handleListItemMouseOver(el.name)}
              ref={el.ref}
              id={String(el.name)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <span className={styles.inputListDigit}>{idx + 1}.</span>
                <span>{el.name}</span>
              </div>
              {el.focus && (
                <div className={styles.inputListItemButtons}>
                  <IconButton
                    style={{ borderRadius: 0 }}
                    onClick={handleDeleteIconClick(el.name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
            </div>
          ))
        : null}
    </List>
  );
};

export default ParticipantsInputList;
