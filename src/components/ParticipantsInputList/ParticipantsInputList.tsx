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
  onPlayerNameChange: (
    id: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;

  OnPlayerNameBlur: (
    id: number,
    value: string | undefined,
    name: string,
  ) => void;
  onEditFormSubmit: (id: number, value: string | undefined) => void;
  onListItemClick: (id: number) => void;
  onEditIconClick: (id: number) => void;
  onListItemMouseOver: (id: number) => void;
  onDeleteIconClick: (id: number) => void;
}

const ParticipantsInputList = ({
  playersList,
  handleListItemKeyEvent,
  onPlayerNameChange,
  OnPlayerNameBlur,
  onEditFormSubmit,
  onListItemClick,
  onEditIconClick,
  onListItemMouseOver,
  onDeleteIconClick,
}: Props) => {
  const handleListNavigation = (index: number) => (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    handleListItemKeyEvent(index, event);
  };

  const handlePlayerNameChange = (id: number) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onPlayerNameChange(id, event);
  };

  const handlePlayerNameBlur = (
    id: number,
    value: string | undefined,
    name: string,
  ) => (event: FocusEvent<HTMLInputElement>) => {
    OnPlayerNameBlur(id, value, name);
  };

  const handleListItemClick = (id: number) => (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    onListItemClick(id);
  };

  const handleEditIconClick = (id: number) => () => {
    onEditIconClick(id);
  };

  const handleListItemMouseOver = (id: number) => () => {
    onListItemMouseOver(id);
  };

  const handleDeleteIconClick = (id: number) => () => {
    onDeleteIconClick(id);
  };

  return (
    <List
      className={styles.inputList}
      style={{ margin: '1rem', padding: '0 1rem 1rem' }}
    >
      {playersList && playersList.length
        ? playersList.map((el, idx) =>
            !el.edit ? (
              <div
                className={styles.inputListItem}
                key={el.name}
                tabIndex={0}
                onKeyDown={handleListNavigation(idx)}
                onClick={handleListItemClick(el.id)}
                onMouseEnter={handleListItemMouseOver(el.id)}
                onMouseOver={handleListItemMouseOver(el.id)}
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
                      onClick={handleDeleteIconClick(el.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )}
              </div>
            ) : (
              <form
                key={el.id}
                className={styles.playerNameEditForm}
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();

                  onEditFormSubmit(el.id, el.draft);
                }}
              >
                <span className={styles.inputListDigit}>{idx + 1}.</span>
                <FormField
                  label=""
                  value={el.draft}
                  autoFocus
                  fullWidth
                  style={{ fontSize: '1.1rem' }}
                  onBlur={handlePlayerNameBlur(el.id, el.draft, el.name)}
                  onChange={handlePlayerNameChange(el.id)}
                />
              </form>
            ),
          )
        : null}
    </List>
  );
};

export default ParticipantsInputList;
