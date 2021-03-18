import React, { ChangeEvent, FormEvent, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FormField from '../../Input/FormField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useTranslation } from 'react-i18next';
import useAuth from 'src/services/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { setResponseStatus } from 'src/store/features/formResponseStatus';
import playerService from 'src/services/players.service';
import {
  addNewPlayerToTournament,
  SettingsInfoPlayers,
} from 'src/store/features/settingsInfo';
import { addNewPlayer } from 'src/store/features/players';
import { RootState } from 'src/store/features';
import { Chip, ListItem, ListItemText } from '@material-ui/core';
import { PlayerResponse } from 'src/types/main.types';
import InputWithSearch from 'src/components/ParticipantsInputList/InputWithSearch';

const findPlayerByName = (value: string) => (
  player: PlayerResponse | SettingsInfoPlayers,
) => player.name.toLowerCase().includes(value.toLowerCase());

const getUniquePlayers = (
  tournamentPlayers: SettingsInfoPlayers[],
  possiblePlayers: PlayerResponse[],
  value: string,
) => {
  const foundPlayersInTournament = tournamentPlayers.filter(
    findPlayerByName(value),
  );

  const possiblePlayersInGeneral = possiblePlayers.filter(
    findPlayerByName(value),
  );

  if (foundPlayersInTournament.length) {
    const players = possiblePlayersInGeneral.filter(
      (player) => !tournamentPlayers.some((pl) => pl.name === player.name),
    );
    return players;
  }

  return possiblePlayersInGeneral;
};

const ParticipantsInputForm = () => {
  const { t } = useTranslation();
  const { players } = useSelector((state: RootState) => state);

  return (
    <div style={{ margin: '10px', padding: '1rem', position: 'relative' }}>
      <Typography
        color="textSecondary"
        style={{ alignSelf: 'flex-start', margin: '10px 0' }}
      >
        {t('Enter names of the players')}
      </Typography>
      <InputWithSearch />
      {/* <div>
        <FormField label="" />
        <div style={{ position: 'absolute', zIndex: 1 }}>

          {players.map((player) => (
            <ListItem
              key={player.id}
              style={{
                borderRadius: 0,
                backgroundColor: 'white',
                textAlign: 'start',
              }}
            >
              <ListItemText>{player.name}</ListItemText>
            </ListItem>
          ))}
        </div> 
      </div>*/}
    </div>
  );
};

export default ParticipantsInputForm;
