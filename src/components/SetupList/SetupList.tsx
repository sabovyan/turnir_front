import React, { DragEvent, useState } from 'react';
import List from '@material-ui/core/List';

import SetupListItem from '../SetupListItem/SetupListItem';
import Typography from '@material-ui/core/Typography';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Participant } from '../../types/main.types';
import { setUpGamesAndPlayers } from '../../store/features/gamesForSetup';
import { RootState } from 'src/store/features';
import FAKE_PLAYER from 'src/constants/fakePlayer';
import styles from './SetupList.module.css';

type DragState = {
  draggedFrom: null | number;
  draggedTo: null | number;
  isDragging: boolean;
  originalOrder: Participant[];
  updatedOrder: Participant[];
};

const SetupList = () => {
  const { participants } = useSelector(
    (state: RootState) => state.gamesForSetup,
  );

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [dragState, setDragState] = useState<DragState>({
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
  });

  const handleDragStart = (e: DragEvent<HTMLLIElement>) => {
    const initialPosition = Number(e.currentTarget.dataset.position);

    setDragState((state) => ({
      ...state,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: participants,
    }));
  };

  const handleDragOver = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();

    const initialList = dragState.originalOrder;

    const { draggedFrom } = dragState;

    const draggedTo = Number(e.currentTarget.dataset.position);

    const itemDragged = initialList[draggedFrom!];

    const remainingItems = initialList.filter(
      (_item, index) => index !== draggedFrom,
    );

    const newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragState.draggedTo) {
      setDragState((state) => ({
        ...state,
        updatedOrder: newList,
        draggedTo,
      }));
    }
  };

  const handleDrop = (e: DragEvent<HTMLLIElement>) => {
    dispatch(setUpGamesAndPlayers({ participants: dragState.updatedOrder }));
    setDragState((state) => ({
      ...state,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    }));
  };

  return (
    <List className={styles.list}>
      <Typography color="textSecondary">
        <span style={{ margin: '0 1rem' }}>#</span>
        <span style={{ marginRight: '1rem' }}>{t('Participants')}</span>
      </Typography>

      {participants.length > 0 &&
        participants.map(({ name }, idx) => (
          <SetupListItem
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            text={name === '' ? FAKE_PLAYER : name}
            index={idx}
            key={idx}
          />
        ))}
    </List>
  );
};

export default SetupList;
