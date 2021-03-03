import React, { ChangeEvent, useState } from 'react';
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { PlayerResponse } from '../../types/main.types';

interface Props {
  players: (PlayerResponse & { isEdit: boolean })[];
}

const GroupPlayerList = ({ players }: Props) => {
  const [selectedPlayers, setSelectedPlayers] = useState<
    (PlayerResponse & {
      isEdit: boolean;
    })[]
  >();

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

  return (
    <>
      {players.length
        ? players.map((player) => (
            <ListItem
              draggable
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
                  //  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  onChange={handleCheckBoxEvent(player.id)}
                  //  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>

              <ListItemText>{player.name}</ListItemText>
            </ListItem>
          ))
        : null}
    </>
  );
};

export default GroupPlayerList;
