import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import useAuth from '../../../services/authentication';
import groupService from '../../../services/groups.service';

import {
  updateGroupEditStatus,
  updateGroupNameById,
} from '../../../store/features/groups.feature';
import { updatePlayerEditStatus } from '../../../store/features/players';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

interface Props {
  value: string;
  id: number;
}

const PlayerNameEdit = ({ value, id }: Props) => {
  const [name, setName] = useState<string>(value);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const dispatch = useDispatch();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() !== '') {
      setError('');
    }
    setName(event.target.value);
  };

  const handleNameBlur = (id: number) => () => {
    dispatch(updateGroupEditStatus({ id }));
  };

  const handleEditNameSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;

    if (name.trim() === '') {
      setError('name is required');
      return;
    }

    try {
      const updatedGroup = await groupService.updateGroupNameById({
        name: name,
        groupId: id,
        userId: user.id,
      });

      if (updatedGroup) {
        dispatch(updateGroupNameById(updatedGroup));
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
    <form style={{ padding: '1rem' }} onSubmit={handleEditNameSubmit}>
      <TextField
        label=""
        autoFocus
        value={name}
        onChange={handleNameChange}
        onBlur={handleNameBlur(id)}
        style={{ marginBottom: '0px' }}
        variant="outlined"
        fullWidth
      />
      <ErrorMessage
        message={error}
        style={{ marginBottom: '5px', minHeight: '1rem' }}
      />
    </form>
  );
};

export default PlayerNameEdit;
