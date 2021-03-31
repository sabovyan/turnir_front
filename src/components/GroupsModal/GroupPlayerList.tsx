import React from 'react';
import { IconButton, ListItem, ListItemText } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { PlayerResponse } from '../../types/main.types';
import { useDispatch } from 'react-redux';

import DeleteIcon from '@material-ui/icons/Delete';
import groupService from '../../services/groups.service';
import { updatePlayersInGroup } from '../../store/features/groups.feature';

interface Props {
  players: PlayerResponse[];
  groupId: number;
  currentGroupId?: number;
}

const GroupPlayerList = ({ players, groupId, currentGroupId }: Props) => {
  const dispatch = useDispatch();

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
              style={{
                backgroundColor: grey[100],
                marginBottom: '10px',
                padding: '0',
              }}
              key={player.id}
            >
              <ListItemText>{player.name}</ListItemText>

              <IconButton
                style={{ borderRadius: 0 }}
                onClick={handleGroupPLayerDeleteEvent(player.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))
        : null}
    </>
  );
};

export default GroupPlayerList;
