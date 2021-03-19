import React, { ChangeEvent, FormEvent, useState } from 'react';

import { useDispatch } from 'react-redux';

import useAuth from '../../../services/authentication';

import Typography from '@material-ui/core/Typography';
import CButton from '../../common/Buttons/CustomButton/CustomButton';
import FormField from '../../Input/FormField';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import playerService from '../../../services/players.service';
import { addNewPlayer } from '../../../store/features/players';

const AddNewPlayerForm = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  const dispatch = useDispatch();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() !== '') {
      setError('');
    }
    setName(event.target.value);
  };

  const handleAddNameSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim() === '') {
      setError('name is required');
      return;
    }

    if (!user) return;

    try {
      const res = await playerService.createNewPlayer({
        name,
        userId: user.id,
      });
      if (res) {
        dispatch(addNewPlayer(res));
        setName('');
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <form
      style={{
        marginTop: '3rem',
        boxShadow: '0 0 3px 1px #333333',
        padding: '1rem',
      }}
      onSubmit={handleAddNameSubmit}
    >
      <Typography color="textSecondary" style={{ marginBottom: '1rem' }}>
        Add new Player
      </Typography>
      <FormField
        label="name"
        value={name}
        onChange={handleNameChange}
        style={{ marginBottom: 0 }}
      />
      <ErrorMessage message={error} />
      <CButton
        type="submit"
        text="submit"
        cssStyles={{ padding: 5 }}
        fullWidth
      />
    </form>
  );
};

export default AddNewPlayerForm;
