import React, { ChangeEvent, FormEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CButton from '../Buttons/CustomButton/CustomButton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useAuth from '../../services/authentication';
import { useDispatch } from 'react-redux';
import groupService from '../../services/groups.service';
import { addNewGroup } from '../../store/features/groups.feature';

const CreateNewGroupForm = () => {
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim() === '') {
      setError('name is required');
      return;
    }

    if (!user) return;

    try {
      const res = await groupService.createNewGroup({
        name,
        userId: user.id,
      });
      if (res) {
        dispatch(addNewGroup(res));
      }
    } catch (error) {
      setError(error.response.data.error);
    }

    setName('');
  };

  return (
    <form
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: '1rem',
        gap: '1rem',
        alignSelf: 'flex-end',
      }}
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          style={{
            background: 'white',
            borderRadius: '5px',
            marginBottom: '0',
            width: '215px',
          }}
          value={name}
          onChange={handleNameChange}
          variant="outlined"
          placeholder="group name"
        />
        <ErrorMessage
          style={{
            marginBottom: '1rem',
            minHeight: '2rem',
          }}
          message={error}
        />
      </div>
      <CButton
        type="submit"
        text="Add new Group"
        cssStyles={{ padding: '1rem', alignSelf: 'none' }}
      />
    </form>
  );
};

export default CreateNewGroupForm;
