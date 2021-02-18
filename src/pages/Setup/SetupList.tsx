import React, { DragEvent, useState } from 'react';
import List from '@material-ui/core/List';

import ListSubheader from '@material-ui/core/ListSubheader';
import SetupListItem from './SetupListItem';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/features';
import { Player } from '../../types/main.types';
// import { getPlayers } from '../../store/features/settingsInfo';

interface Props {}

type DragState = {
  draggedFrom: null | number;
  draggedTo: null | number;
  isDragging: boolean;
  originalOrder: Pick<Player, 'name'>[] | [];
  updatedOrder: Pick<Player, 'name'>[] | [];
};

const SetupList = (props: Props) => {
  const { t } = useTranslation();
  // const { players } = useSelector((state: RootState) => state.settingsInfo);
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
      // originalOrder: players,
    }));

    // event.dataTransfer.setData("text/html", '');
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
    // dispatch(getPlayers({ players: dragState.updatedOrder }));
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
        height: '100%',
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
      {/* {players.length > 0 &&
        players.map((pl, idx) => (
          <SetupListItem
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            key={pl.name}
            text={pl.name}
            index={idx}
          />
        ))} */}
    </List>
  );
};

export default SetupList;
