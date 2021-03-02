import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../../services/authentication';
import playerService from '../../../services/players.service';
import { RootState } from '../../../store/features';
import {
  changePlayerName,
  updatePlayerEditStatus,
} from '../../../store/features/players';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import FormField from '../../Input/FormField';

interface Props {
  value: string;
  id: number;
}

const PlayerNameEdit = ({ value, id }: Props) => {
  const [name, setName] = useState<string>(value);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const players = useSelector((state: RootState) => state.players);

  const dispatch = useDispatch();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() !== '') {
      setError('');
    }
    setName(event.target.value);
  };

  const handleNameBlur = (id: number) => () => {
    dispatch(updatePlayerEditStatus({ id }));
  };

  const handleEditNameSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;

    if (name.trim() === '') {
      setError('name is required');
      return;
    }

    const isPlayerExits = players.some((player) => player.name === name);

    if (isPlayerExits) {
      setError("player's name already exits");
      return;
    }

    try {
      const updatedPlayer = await playerService.updatePlayerName({
        name: name,
        id,
        userId: user.id,
      });

      if (updatedPlayer) {
        dispatch(changePlayerName(updatedPlayer));
      }

      setName('');
    } catch (err) {
      if (!err.response) {
        setError('network Error');
      } else {
        setError(err.response.data.error);
      }
    }
  };

  return (
    <form onSubmit={handleEditNameSubmit}>
      <FormField
        label=""
        autoFocus
        value={name}
        onChange={handleNameChange}
        onBlur={handleNameBlur(id)}
        style={{ marginBottom: '0px' }}
      />
      <ErrorMessage
        message={error}
        style={{ marginBottom: '5px', minHeight: '1rem' }}
      />
    </form>
  );
};

export default PlayerNameEdit;
