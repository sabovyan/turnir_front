import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  PlayerResponse,
  PlayerWithInputValue,
  Side,
} from 'src/types/main.types';
import { addNewPlayerToTournament } from 'src/store/features/settingsInfo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/features';
import playerService from 'src/services/players.service';
import useAuth from 'src/services/authentication';
import { setResponseStatus } from 'src/store/features/formResponseStatus';
import { useTranslation } from 'react-i18next';
import { addNewPlayer } from 'src/store/features/players';
import { getAvailablePlayers } from '../ParticipantsList/ParticipantsInput.util';

const emptyValue: PlayerResponse = {
  id: -1,
  name: '',
  tournamentId: -1,
  userId: -1,
};

export default function InputWithSearch() {
  const {
    players,
    settingsInfo: { draftParticipants },
  } = useSelector((state: RootState) => state);
  const [value, setValue] = React.useState<PlayerResponse | null>(null);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useAuth();

  const handleAutoCompleteChange = async (
    _event: ChangeEvent<{}>,
    newValue: string | PlayerWithInputValue | null,
  ) => {
    if (!newValue || !user) return;
    /* TODO  create a new player also with string */
    if (typeof newValue === 'string') {
      setValue(emptyValue);
    } else if (newValue) {
      if (newValue.id === 0) {
        if (!newValue.inputValue) return;
        try {
          const res = await playerService.createNewPlayer({
            name: newValue.inputValue.trim(),
            userId: user.id,
          });
          if (res) {
            dispatch(
              addNewPlayerToTournament({
                name: res.name,
                players: [{ id: res.id }],
                side: Side.neutral,
              }),
            );
            dispatch(addNewPlayer(res));
            setValue(emptyValue);
          }
        } catch (error) {
          dispatch(
            setResponseStatus({
              type: 'error',
              message: t(error.response.data.error),
              open: true,
            }),
          );
          setValue(emptyValue);
        }
      } else {
        dispatch(
          addNewPlayerToTournament({
            name: newValue.name,
            players: [{ id: newValue.id }],
            side: Side.neutral,
          }),
        );
        setValue(emptyValue);
      }
    }
    setValue(emptyValue);
  };

  return (
    <Autocomplete
      value={value}
      key={123}
      fullWidth
      onChange={handleAutoCompleteChange}
      filterOptions={(options, params) => {
        const availablePlayers = getAvailablePlayers(
          draftParticipants,
          players,
          params.inputValue,
        );

        const existingPlayer = players.some(
          (player) => player.name === params.inputValue,
        );

        if (!existingPlayer && params.inputValue.trim() !== '') {
          availablePlayers.push({
            id: 0,
            name: `Add "${params.inputValue}"`,
            inputValue: params.inputValue,
            tournamentId: 0,
            userId: 0,
          });
        }

        return availablePlayers;
      }}
      selectOnFocus
      clearOnBlur
      clearText="clear"
      options={players}
      renderOption={(option) => option.name}
      getOptionLabel={(option) => ''}
      freeSolo
      renderInput={(params) => <TextField {...params} />}
    />
  );
}
