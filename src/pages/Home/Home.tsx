import React, { useCallback, useEffect, MouseEvent } from 'react';

import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import tournamentImg from '../../assets/tournaments.svg';
import CButton from '../../components/common/Buttons/CustomButton/CustomButton';
import { useHistory } from 'react-router-dom';
import HomeTopBar from '../../components/TopBar/HomeTopBar/HomeTopBar';
import useAuth from '../../services/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { setResponseStatus } from '../../store/features/formResponseStatus';
import { getAllTournaments } from 'src/store/features/allTournaments';
import { RootState } from 'src/store/features';
import { AsyncResponseStatus, TournamentType } from 'src/types/main.types';
import LinearProgress from '@material-ui/core/LinearProgress';
import ClickableCard from 'src/components/common/Cards/ClickableCard/ClickableCard';
import Colors from 'src/styles/colors';
import EliminationIcon from 'src/components/icons/elimination/EliminationIcon';
import GroupCardIconStyle from 'src/styles/GroupCardIconStyle';
import LastManStandingIcon from 'src/components/icons/LastManStanding/LastManStanding';
import RoundRobinIcon from 'src/components/icons/roundRobin/RoundRobinIcon';
import { createTournament } from 'src/store/features/tournament.feature';
import tournamentService from 'src/services/tournament.service';

const Home = () => {
  const {
    allTournaments: { data, error, status },
    tournament,
  } = useSelector((state: RootState) => state);

  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useAuth();

  const goToNewTournament = useCallback(() => {
    if (!user) {
      dispatch(
        setResponseStatus({
          type: 'error',
          message: t('you are not logged in'),
          open: true,
        }),
      );
    } else {
      history.push('/new');
    }
  }, [dispatch, history, t, user]);

  const handleShortCuts = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        goToNewTournament();
      }
    },
    [goToNewTournament],
  );

  const handleCardClick = (id: number) => async () => {
    const tournament = await tournamentService.getById({ id });

    dispatch(createTournament(tournament));
    history.push(`/tournament/${id}`);

    // tournamentService.getById({ id }).then((tournament) => {
    //   console.log(tournament);
    //   dispatch(createTournament(tournament));
    //   history.push(`/tournament/${id}`);
    // });
  };

  useEffect(() => {
    if (!user) return;
    document.addEventListener('keypress', handleShortCuts);
    dispatch(getAllTournaments({ id: user.id }));

    return () => {
      document.removeEventListener('keypress', handleShortCuts);
    };
  }, [dispatch, handleShortCuts, user]);

  return (
    <>
      <HomeTopBar />
      {(status === AsyncResponseStatus.loading ||
        status === AsyncResponseStatus.idle) &&
      user ? (
        <LinearProgress />
      ) : status === AsyncResponseStatus.rejected ? (
        <div>{error}</div>
      ) : data && data.length ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: '80vh',
            gap: '2rem',
            flexWrap: 'wrap',
            marginTop: '2rem',
            overflow: 'auto',
          }}
        >
          {data.map(({ name, id, tournamentTypeId }) => (
            <ClickableCard
              key={id}
              color={
                tournamentTypeId === TournamentType.elimination
                  ? Colors.elimination
                  : tournamentTypeId === TournamentType.lastManStanding
                  ? Colors.lastManStanding
                  : Colors.roundRobin
              }
              icon={
                tournamentTypeId === TournamentType.elimination ? (
                  <EliminationIcon style={GroupCardIconStyle} />
                ) : tournamentTypeId === TournamentType.lastManStanding ? (
                  <LastManStandingIcon style={GroupCardIconStyle} />
                ) : (
                  <RoundRobinIcon style={GroupCardIconStyle} />
                )
              }
              name={name}
              onCardClick={handleCardClick(id)}
              isInteractive={true}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '80vh',
            outline: 'none',
          }}
        >
          <img src={tournamentImg} alt="tournament" />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: '20px 0',
            }}
          >
            <Typography component="h2" variant="h4">
              {t('Nothing here, yet')}
            </Typography>
            <Typography
              component="p"
              variant="body2"
              color="textSecondary"
              style={{ margin: '10px 0' }}
            >
              {t('Let’s get started with a new tournament')}
            </Typography>
          </div>
          <CButton
            text={t('NEW TOURNAMENT')}
            cssStyles={{ fontSize: '1.2rem' }}
            onClick={goToNewTournament}
          />
          <div
            style={{
              margin: '1rem 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              component="p"
              variant="h4"
              color="textSecondary"
              style={{ margin: '10px 0' }}
            >
              {t('Press ctrl + Enter')}
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="textSecondary"
              style={{ margin: '10px 0' }}
            >
              {t('to start a new tournament')}
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
