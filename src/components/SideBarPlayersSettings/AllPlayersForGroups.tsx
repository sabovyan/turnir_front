import React, { ChangeEvent, DragEvent } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/features';

import SideBarGroupCard from './SideBarGroupCard';

import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import { grey } from '@material-ui/core/colors';

import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  nullifyTransfer,
  setMultiplePlayers,
  setSinglePlayer,
} from 'src/store/features/playersToTransfer.feature';
import {
  removePlayer,
  setAllPlayersCheckStatus,
  setSinglePlayerCheckStatus,
  updatePlayerEditStatus,
} from 'src/store/features/players';
import playerService from 'src/services/players.service';
import { deletePlayerFromTournament } from 'src/store/features/settingsInfo';
import useAuth from 'src/services/authentication';
import PlayerNameEditForm from '../Forms/EditForm/PlayerNameEditForm';

const AllPlayersForGroups = () => {
  const { players } = useSelector((state: RootState) => state);
  const { user } = useAuth();

  const dispatch = useDispatch();

  const handleCheckBoxEvent = (id: number) => (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    if (id === 0) {
      dispatch(setAllPlayersCheckStatus(checked));
      return;
    }

    dispatch(setSinglePlayerCheckStatus({ checked, id }));
  };

  const handleDragEvent = (event: DragEvent<HTMLLIElement>) => {
    event.stopPropagation();
    const currentPlayerId = event.currentTarget.dataset.id;
    if (!Number(currentPlayerId)) return;

    const selectedPlayers = players.filter((pl) => pl.isChecked);

    if (selectedPlayers && selectedPlayers.length) {
      const foundPlayer = selectedPlayers.find(
        (player) => player.id === Number(currentPlayerId),
      );

      if (!foundPlayer) {
        dispatch(nullifyTransfer(null));
        return;
      }

      dispatch(setMultiplePlayers(selectedPlayers));
      return;
    }

    const foundPlayer = players.find(
      (player) => player.id === Number(currentPlayerId),
    );

    if (!foundPlayer) return;
    dispatch(setSinglePlayer(foundPlayer));
  };

  const handleEditIconClick = (id: number) => () => {
    dispatch(updatePlayerEditStatus({ id }));
  };

  const handleDeleteIconClick = (id: number) => async () => {
    if (!user) return;

    const deletedPlayer = await playerService.deletePlayer({ slug: id });
    if (deletedPlayer) {
      dispatch(removePlayer(deletedPlayer));
      dispatch(deletePlayerFromTournament({ name: deletedPlayer.name }));
    }
  };

  if (!players.length) {
    return <div>there are no players</div>;
  }

  return (
    <SideBarGroupCard
      groupId={0}
      isEdit={false}
      groupName="All Players"
      isEditable={false}
      onDelete={() => {}}
      onEdit={() => {}}
      AddItemForm={<div>hello</div>}
    >
      <FormControlLabel
        control={<Switch onChange={handleCheckBoxEvent(0)} color="primary" />}
        label="All"
      />
      <div>
        {players.map((player) =>
          !player.isEdit ? (
            <ListItem
              draggable={true}
              data-id={player.id}
              onDragStart={handleDragEvent}
              style={{
                backgroundColor: grey[100],
                marginBottom: '10px',
                padding: '0',
              }}
              key={player.id}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                  checked={player.isChecked}
                  color="primary"
                  onChange={handleCheckBoxEvent(player.id)}
                />
              </ListItemIcon>

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
        )}
      </div>
    </SideBarGroupCard>
  );
};

export default AllPlayersForGroups;
