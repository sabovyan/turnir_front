import React, { ChangeEvent, createRef, useState, RefObject } from 'react';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';

import { setResponseStatus } from '../../store/features/formResponseStatus';
import { checkIfPlayersNameExist } from './ParticipantsInput.util';
import { RootState } from '../../store/features';
import {
  addNewEmptyRow,
  removeLastRow,
  removePlayersWithEmptyNames,
  setPlayers,
} from '../../store/features/players';

import styles from './ParticipantsInputList.module.css';

interface Props {}

const ParticipantsInputList = (props: Props) => {
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.players);
  const [refs, setRefs] = useState<RefObject<HTMLDivElement>[]>(
    Array(players.length).fill(createRef()),
  );

  const handleFormFieldChange = (id: number, index: number) => (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    const targetedValue = value.trim();

    dispatch(setPlayers({ id, value: value }));

    if (targetedValue) {
      if (index === players.length - 1) {
        dispatch(addNewEmptyRow());
        setRefs((state) => [...state, createRef()]);
      }
    } else {
      if (index === players.length - 2) {
        dispatch(removeLastRow());
        setRefs((state) => {
          const newState = state.slice(0, -1);
          return newState;
        });
      }
    }
  };

  const handleFormFieldKeyPress = (index: number) => (e: any) => {
    const next = index + 1;
    const prev = index - 1;

    const isNameInUse = checkIfPlayersNameExist(players, index, e.target.value);

    if (isNameInUse) {
      dispatch(
        setResponseStatus({
          type: 'error',
          message: 'the name is already in use',
          open: true,
        }),
      );

      return;
    }

    if (e.key === 'Enter' && players[next]) {
      dispatch(removePlayersWithEmptyNames());

      refs[next].current!.focus();
    }

    if (e.key === 'ArrowDown' && players[next]) {
      dispatch(removePlayersWithEmptyNames());
      refs[next].current!.focus();
    }

    if (e.key === 'ArrowUp' && players[prev]) {
      dispatch(removePlayersWithEmptyNames());
      refs[prev].current!.focus();
    }
  };

  const handleTextFiledClick = () => {
    dispatch(removePlayersWithEmptyNames());
  };

  return (
    <List className={styles.inputList}>
      {players.map((el, idx) => (
        <div className={styles.inputListItem} key={el.id}>
          <span className={styles.inputListDigit} style={{}}>
            {idx + 1}.
          </span>
          <TextField
            fullWidth
            value={el.name}
            onChange={handleFormFieldChange(el.id, idx)}
            inputRef={refs[idx]}
            onKeyDown={handleFormFieldKeyPress(idx)}
            onClick={handleTextFiledClick}
          />
        </div>
      ))}
    </List>
  );
};

export default ParticipantsInputList;
