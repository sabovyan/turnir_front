import React, { MouseEvent } from 'react';

import ScoreBoardHeader from 'src/components/ScoreBoard/ScoreBoardHeader';
import { Button, ButtonGroup } from '@material-ui/core';
import Backdrop from '../Backdrop/Backdrop';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/features';
import ScorePicker from 'src/components/DigitBoard/ScorePicker';
import {
  closeScoreModal,
  removeSet,
} from 'src/store/features/scoreBoard.feature';
import { CloseButton } from '../Buttons';
import Colors from 'src/styles/colors';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { setResponseStatus } from 'src/store/features/formResponseStatus';
import tournamentService from 'src/services/tournament.service';
import { getTournamentById } from 'src/store/features/tournament.feature';

const UpdateScoreModal = () => {
  const {
    scoreBoard: {
      open,
      data: game,
      sets,
      winningPoints,
      hasWinner,
      winningSets,
      tournamentId,
    },
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  const handleResultPageClose = () => {
    dispatch(closeScoreModal());
  };

  const handleDeleteIconClick = (index: number) => () => {
    dispatch(removeSet({ id: index }));
  };

  const handleScoreboardSubmit = async () => {
    if (!hasWinner) {
      dispatch(
        setResponseStatus({
          message: 'the score is not final',
          open: true,
          type: 'error',
        }),
      );
      return;
    }

    const score = sets.reduce<{
      firstParticipantScore: number[];
      secondParticipantScore: number[];
    }>(
      (acc, set) => {
        acc.firstParticipantScore.push(set.left);
        acc.secondParticipantScore.push(set.right);

        return acc;
      },
      {
        firstParticipantScore: [],
        secondParticipantScore: [],
      },
    );

    if (!game) return;
    try {
      const data = await tournamentService.updateTournamentScore({
        gameId: game.id,
        tournamentId,
        ...score,
      });
      if (data) {
        dispatch(getTournamentById({ id: tournamentId }));
        dispatch(closeScoreModal());
        // setTimeout(() => {
        // }, 1000);
      }
    } catch (err) {
      console.log(err.response.data.error);
    }
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
              <div style={{ display: 'flex' }} key={idx}>
                <ScorePicker
                  left={el.left}
                  right={el.right}
                  winningPoints={winningPoints}
                  pointer={idx}
                />
                {idx >= winningSets ? (
                  <IconButton
                    style={{ color: Colors.secondaryWhite }}
                    onClick={handleDeleteIconClick(idx)}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <ButtonGroup style={{ color: 'white', alignSelf: 'flex-end' }}>
          <Button style={{ color: Colors.secondaryWhite }}>Cancel</Button>
          <Button
            style={{
              color: Colors.white,
              background: hasWinner ? Colors.orange : 'none',
            }}
            onClick={handleScoreboardSubmit}
          >
            Submit
          </Button>
        </ButtonGroup>
      </div>
    </Backdrop>
  ) : null;
};

export default UpdateScoreModal;
