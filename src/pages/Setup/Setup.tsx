import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import SetupTopBar from 'src/components/TopBar/SetuptopBar/SetupTopBar';
import SetupList from '../../components/SetupList/SetupList';

import { RootState } from '../../store/features';

import Rounds from 'src/components/Rounds/Rounds';

interface Props {}

const Setup = (props: Props) => {
  const { participants, rounds } = useSelector(
    (state: RootState) => state.gamesForSetup,
  );

  const history = useHistory();

  // const renderRounds = deepCopyArray(rounds).reverse();

  useEffect(() => {
    if (participants.length < 1) {
      history.push('/');
    }
  }, [history, participants.length]);

  return (
    <>
      <SetupTopBar />
      <div
        style={{
          display: 'flex',
        }}
      >
        <SetupList />
        <Rounds rounds={rounds} isGameStarted={false} scale={false} />
      </div>
    </>
  );
};

export default Setup;
