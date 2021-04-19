import React from 'react';
import Colors from 'src/styles/colors';
import { ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import RoundListItem from './RoundListItem';

interface Props {}

const LSMRounds = (props: Props) => {
  return (
    <div
      style={{
        boxShadow: '0 0 5px 2px #c7c7c7',
        flexGrow: 1,
      }}
    >
      <div
        style={{
          height: 60,
          background: Colors.sideColor,
        }}
      ></div>
      <div>
        <RoundListItem name={'Round 1'} player1={'1111'} player2="2222" />

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
