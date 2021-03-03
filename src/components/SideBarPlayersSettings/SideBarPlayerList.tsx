import React from 'react';

import { IconButton, List, ListItem, ListItemText } from '@material-ui/core';

import { grey } from '@material-ui/core/colors';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import PlayerNameEditForm from '../Forms/EditForm/PlayerNameEditForm';
import { useDispatch, useSelector } from 'react-redux';

import useAuth from '../../services/authentication';
import {
  removePlayer,
  updatePlayerEditStatus,
} from '../../store/features/players';

import playerService from '../../services/players.service';
import { PlayerResponse } from '../../types/main.types';
import { RootState } from '../../store/features';

interface Props {
  selectedGroupId: 'all' | number;
}

const SideBarPlayerList = ({ selectedGroupId }: Props) => {
  const dispatch = useDispatch();

  const { user } = useAuth();
  const { groups, players: allPlayers } = useSelector(
    (state: RootState) => state,
  );

  const selectedGroupPlayers =
    selectedGroupId !== 'all' &&
    groups.find((group) => group.id === selectedGroupId)!.players;

  const handleEditIconClick = (id: number) => () => {
    dispatch(updatePlayerEditStatus({ id }));
  };

  const handleDeleteIconClick = (id: number) => async () => {
    if (!user) return;

    const deletedPlayer = await playerService.deletePlayer({ slug: id });
    if (deletedPlayer) {
      dispatch(removePlayer(deletedPlayer));
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0 3px 1px #333333',
        minHeight: '500px',
        minWidth: '200px',
      }}
    >
      <List
        style={{
          overflowY: 'auto',
          width: '100%',
          padding: '1rem',
          height: '500px',
        }}
      >
        {selectedGroupId === 'all'
          ? allPlayers.length &&
            allPlayers.map((player) =>
              !player.isEdit ? (
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
                    onClick={handleEditIconClick(player.id)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    style={{ borderRadius: 0 }}
                    onClick={handleDeleteIconClick(player.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ) : (
                <PlayerNameEditForm
                  value={player.name}
                  key={player.id}
                  id={player.id}
                />
              ),
            )
          : selectedGroupPlayers &&
            selectedGroupPlayers.map((player) => (
              <ListItem
                style={{
                  backgroundColor: grey[100],
                  marginBottom: '10px',
                  padding: '0',
                }}
                key={player.id}
              >
                <ListItemText>{player.name}</ListItemText>
              </ListItem>
            ))}
      </List>
    </div>
  );
};

export default SideBarPlayerList;
