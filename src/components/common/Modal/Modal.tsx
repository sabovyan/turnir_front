import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/features';
import Backdrop from '../Backdrop/Backdrop';
import PlayCircle from '@material-ui/icons/PlayCircleFilled';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import FormField from 'src/components/Input/FormField';
import Colors from 'src/styles/colors';
import Button from '@material-ui/core/Button/Button';
import { makeStyles } from '@material-ui/core';
import { setNewTournamentModal } from 'src/store/features/newTournamentModal';
import tournamentService from 'src/services/tournament.service';
import useAuth from 'src/services/authentication';
import { createTournament } from 'src/store/features/tournament.feature';
import { useHistory } from 'react-router-dom';
import { setResponseStatus } from 'src/store/features/formResponseStatus';

const useStyles = makeStyles({
  formField: {
    '& ': {},
  },
});

interface Props {}

const Modal = (props: Props) => {
  const {
    newTournamentModal,
    settingsInfo: { goalsToWin, tables, tournamentType, winningSets },
    gamesForSetup: { firstRoundGames },
  } = useSelector((state: RootState) => state);

  const [name, setName] = useState('');

  const { user } = useAuth();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCancelButtonClick = () => {
    dispatch(setNewTournamentModal(false));
  };

  const handleBackDropClick = (event: any) => {
    if (event.target.dataset.closeable === 'true') {
      dispatch(setNewTournamentModal(false));
    }
  };

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAddNewTournament = async (e: any) => {
    e.preventDefault();
    try {
      if (!user) throw new Error('you are not logged In');

      const tournament = await tournamentService.create({
        games: firstRoundGames,
        goalsToWin,
        tables,
        tournamentTypeId: tournamentType,
        winningSets,
        userId: user.id,
        name: name ? name : new Date().toLocaleDateString(),
      });

      console.log(tournament);

      if (tournament) {
        dispatch(setNewTournamentModal(false));
        dispatch(createTournament(tournament));
        history.push(`/tournament/${tournament.id}`);
      }
    } catch (error) {
      dispatch(
        setResponseStatus({
          type: 'error',
          message: error.response.data.error,
          open: true,
        }),
      );
    }
  };

  return (
    <Backdrop
      open={newTournamentModal.open}
      zIndex={1002}
      onClick={handleBackDropClick}
      data-closeable="true"
    >
      <Card style={{ width: 500, height: 500 }} raised>
        <CardContent
          style={{
            background: Colors.green,
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PlayCircle style={{ color: 'white', fontSize: '5rem' }} />
        </CardContent>
        <CardActions
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '50%',
            alignItems: 'flex-start',
            padding: '1rem',
          }}
        >
          <Typography variant="h5" component="h3" gutterBottom>
            That is one good-looking tournament!
          </Typography>
          <form
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onSubmit={handleAddNewTournament}
          >
            <FormField
              fullWidth
              placeholder={new Date().toLocaleDateString()}
              label="Tournament Name"
              autoFocus
              value={name}
              onChange={handleFieldChange}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                style={{ color: '#888' }}
                onClick={handleCancelButtonClick}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                style={{ color: '#888' }}
                onClick={handleAddNewTournament}
              >
                Start Tournament
              </Button>
            </div>
          </form>
        </CardActions>
      </Card>
    </Backdrop>
  );
};

export default Modal;
