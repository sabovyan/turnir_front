import React, { MouseEvent } from 'react';

import ScoreBoardHeader from 'src/components/ScoreBoard/ScoreBoardHeader';
import { Button, ButtonGroup } from '@material-ui/core';
import Backdrop from '../Backdrop/Backdrop';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/features';
import ScorePicker from 'src/components/DigitBoard/ScorePicker';
import { closeScoreModal } from 'src/store/features/scoreBoard.feature';

interface Props {}

const UpdateScoreModal = ({}: Props) => {
  const {
    tournament: { data: tournamentData },
    scoreBoard: { open, data: game, sets, winningPoints },
  } = useSelector((state: RootState) => state);

  // console.log(tournamentData);

  const dispatch = useDispatch();

  const handleResultPageClose = () => {
    dispatch(closeScoreModal());
  };

  return open ? (
    <Backdrop
      open={open}
      zIndex={1002}
      onClick={handleResultPageClose}
      data-closeable="true"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 0 2px 1px #00000088',
          borderRadius: '3px',
          background: '#363636',
          padding: '2rem',
        }}
        onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ScoreBoardHeader
            name1={game && game.participant1?.name}
            name2={game && game.participant2?.name}
          />
          <div style={{ maxHeight: 420, overflow: 'auto' }}>
            {sets.map((el, idx) => (
              <ScorePicker
                left={el.left}
                right={el.right}
                key={idx}
                winningPoints={winningPoints}
                pointer={idx}
              />
            ))}
          </div>
        </div>

        <ButtonGroup style={{ color: 'white', alignSelf: 'flex-end' }}>
          <Button style={{ color: '#aaa' }}>Cancel</Button>
          <Button style={{ color: '#ddd' }}>Submit</Button>
        </ButtonGroup>
      </div>
    </Backdrop>
  ) : null;
};

export default UpdateScoreModal;
