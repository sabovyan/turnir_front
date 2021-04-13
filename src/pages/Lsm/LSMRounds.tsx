import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Colors from 'src/styles/colors';
import { ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ScorePicker from '../TestScreen/ScorePicker';

interface Props {}

const LSMRounds = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openScoreBoard = () => {
    setIsOpen((state) => !state);
  };

  return (
    <div
      style={{
        margin: 16,
        boxShadow: '0 0 5px 2px #c7c7c7',
      }}
    >
      <div
        style={{
          height: 60,
          background: Colors.sideColor,
        }}
      ></div>
      <div>
        <div>
          <Typography
            style={{ margin: '10px 1rem' }}
            color={'textSecondary'}
            variant="body2"
          >
            Round 1
          </Typography>
          <div
            style={{
              height: !isOpen ? 40 : '100%',
              transition: 'height 100ms linear',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                style={{ margin: '10px 1rem', flexGrow: 1 }}
                variant="body2"
                align="center"
              >
                1111
              </Typography>
              <Button
                style={{
                  color: Colors.secondaryWhite,
                  background: isOpen ? Colors.sideColor : Colors.white,
                  boxShadow: 'none',
                  border: 'none',
                  width: 200,
                }}
                onClick={openScoreBoard}
              >
                ENTER RESULTS
              </Button>
              <Typography
                style={{ margin: '10px 1rem 0', flexGrow: 1 }}
                variant="body2"
                align="center"
              >
                2222
              </Typography>
            </div>
            <ScorePicker goalsToWin={7} />
          </div>
        </div>
        <ButtonGroup
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1rem',
          }}
        >
          <Button
            style={{
              color: Colors.secondaryWhite,
              boxShadow: 'none',
              border: 'none',
            }}
          >
            show Result
          </Button>
          <Button
            style={{
              color: Colors.secondaryWhite,
              boxShadow: 'none',
              border: 'none',
            }}
          >
            New Round
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default LSMRounds;
