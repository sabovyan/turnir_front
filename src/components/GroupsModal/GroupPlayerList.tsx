import React, {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { PlayerResponse } from '../../types/main.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/features';
import {
  setMultiplePlayers,
  setSinglePlayer,
} from '../../store/features/playersToTransfer.feature';
import DeleteIcon from '@material-ui/icons/Delete';
import groupService from '../../services/groups.service';
import { updatePlayersInGroup } from '../../store/features/groups.feature';

interface Props {
  players: PlayerResponse[];
  isSelectable: boolean;
  isDraggable: boolean;
  deleteButton: boolean;
  groupId: number;
}

const GroupPlayerList = ({
  players,
  isSelectable,
  isDraggable,
  deleteButton,
  groupId,
}: Props) => {
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerResponse[]>();

  const dispatch = useDispatch();

  const handleCheckBoxEvent = (id: number) => (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    if (checked) {
      const foundPlayer = players.find((player) => player.id === id);
      if (foundPlayer) {
        setSelectedPlayers((state) =>
          state ? [...state, foundPlayer] : [foundPlayer],
        );
      }

      return;
    }

    setSelectedPlayers(
      (state) => state && state.filter((player) => player.id !== id),
    );
  };

  const handleDragEvent = (event: DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const currentPlayerId = event.currentTarget.dataset.id;
    if (!Number(currentPlayerId)) return;

    const foundPlayer = players.find(
      (player) => player.id === Number(currentPlayerId),
    );

    if (!foundPlayer) return;

    if (selectedPlayers && selectedPlayers.length) {
      const foundPlayer = selectedPlayers.find(
        (player) => player.id === Number(currentPlayerId),
      );

      if (!foundPlayer) return;

      dispatch(setMultiplePlayers(selectedPlayers));
      return;
    }

    dispatch(setSinglePlayer(foundPlayer));
  };

  const handleGroupPLayerDeleteEvent = (id: number) => async () => {
    const group = await groupService.removePlayerFromGroup({
      groupId,
      playerId: id,
    });
    if (group) {
      dispatch(updatePlayersInGroup(group));
    }
  };

  return (
    <>
      {players.length
        ? players.map((player) => (
            <ListItem
              draggable={isDraggable}
              data-id={player.id}
              onDrag={handleDragEvent}
              style={{
                backgroundColor: grey[100],
                marginBottom: '10px',
                padding: '0',
              }}
              key={player.id}
            >
              {isSelectable && (
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    onChange={handleCheckBoxEvent(player.id)}
                  />
                </ListItemIcon>
              )}

              <ListItemText>{player.name}</ListItemText>
              {deleteButton ? (
                <IconButton
                  style={{ borderRadius: 0 }}
                  onClick={handleGroupPLayerDeleteEvent(player.id)}
                >
                  <DeleteIcon />
                </IconButton>
              ) : null}
            </ListItem>
          ))
        : null}
    </>
  );
};

export default GroupPlayerList;
