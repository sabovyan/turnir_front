import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import { grey } from '@material-ui/core/colors';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import PlayerNameEditForm from '../Forms/EditForm/PlayerNameEditForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/features';
import authStorage from '../../services/storage';
import useAuth from '../../services/authentication';
import {
  removePlayer,
  updatePlayerEditStatus,
} from '../../store/features/players';
import { setPlayers } from '../../store/features/players';
import playerService from '../../services/players.service';
import { PlayerResponse } from '../../types/main.types';
import Checkbox from '@material-ui/core/Checkbox';

interface Props {
  isEditable: boolean;
  view: 'groups' | 'sideBar';
}

const SideBarPlayerList = ({ isEditable, view }: Props) => {
  const playersState = useSelector((state: RootState) => state.players);

  const [selectedPlayers, setSelectedPlayers] = useState<
    (PlayerResponse & {
      isEdit: boolean;
    })[]
  >();

  const dispatch = useDispatch();

  const { user } = useAuth();

  const handleDeleteIconClick = (id: number) => async () => {
    if (!user) return;

    const deletedPlayer = await playerService.deletePlayer({ slug: id });

    if (deletedPlayer) {
      dispatch(removePlayer(deletedPlayer));
    }
  };

  const handleEditIconClick = (id: number) => () => {
    dispatch(updatePlayerEditStatus({ id }));
  };

  const handleCheckBoxEvent = (id: number) => (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    if (checked) {
      const foundPlayer = playersState.find((player) => player.id === id);
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

  useEffect(() => {
    if (!user) return;

    playerService
      .fetchAllPlayers({ userId: user.id })
      .then((res: PlayerResponse[] | undefined) => {
        if (res) {
          dispatch(setPlayers(res));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, dispatch, selectedPlayers]);

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
        {playersState.length &&
          playersState.map((player) =>
            !player.isEdit ? (
              <ListItem
                draggable
                style={{
                  backgroundColor: grey[100],
                  marginBottom: '10px',
                  padding: '0',
                }}
                key={player.id}
              >
                {view === 'groups' ? (
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      //  checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      onChange={handleCheckBoxEvent(player.id)}
                      //  inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                ) : null}

                <ListItemText>{player.name}</ListItemText>

                {isEditable ? (
                  <>
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
                  </>
                ) : null}
              </ListItem>
            ) : (
              <PlayerNameEditForm
                value={player.name}
                key={player.id}
                id={player.id}
              />
            ),
          )}
      </List>
    </div>
  );
};

export default SideBarPlayerList;
