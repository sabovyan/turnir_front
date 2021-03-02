import React, { DragEvent, useState } from 'react';
import List from '@material-ui/core/List';

import ListSubheader from '@material-ui/core/ListSubheader';
import SetupListItem from './SetupListItem';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { SetupPlayer } from '../../types/main.types';
import {
  createGamesAndPlayersForSetup,
  UpdatePlayersOrder,
} from '../../store/features/gamesForSetup';

type DragState = {
  draggedFrom: null | number;
  draggedTo: null | number;
  isDragging: boolean;
  originalOrder: SetupPlayer[] | [];
  updatedOrder: SetupPlayer[] | [];
};

interface Props {
  players: SetupPlayer[];
}

const SetupList = ({ players }: Props) => {
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
      originalOrder: players,
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
    dispatch(
      createGamesAndPlayersForSetup({ players: dragState.updatedOrder }),
    );
    setDragState((state) => ({
      ...state,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    }));
  };

  return (
    <List
      style={{
        boxShadow: '3px 0px 3px #dadada',
        minWidth: '280px',
      }}
    >
      <ListSubheader
        style={{
          display: 'flex',
          gap: '1rem',
        }}
      >
        <span>#</span>
        <span>{t('Participants')}</span>
      </ListSubheader>
      {players.length > 0 &&
        players.map((pl, idx) => (
          <SetupListItem
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            text={pl.name === '' ? '<FAKE>' : pl.name}
            index={idx}
            key={String(pl.id)}
          />
        ))}
    </List>
  );
};

export default SetupList;
