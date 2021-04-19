import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ScorePicker from 'src/components/DigitBoard/ScorePicker';
import Colors from 'src/styles/colors';

interface Props {
  name: string;
  player1: string;
  player2: string;
}

const winningSets = 1;

const RoundListItem = ({ name, player1, player2 }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openScoreBoard = () => {
    setIsOpen((state) => !state);
  };
  return (
    <div>
      <Typography
        style={{ margin: '10px 1rem' }}
        color={'textSecondary'}
        variant="body2"
      >
        {name}
      </Typography>
      <div
        style={{
          height: !isOpen ? 40 : `${150 * winningSets}px`,
          transition: 'height 200ms ease-in',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
        >
          <Typography
            style={{ margin: '10px 1rem', flexGrow: 1 }}
            variant="body2"
            align="center"
          >
            {player1}
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
            {player2}
          </Typography>
        </div>
        <ScorePicker winningPoints={7} left={-1} right={-1} pointer={0} />
      </div>
    </div>
  );
};

export default RoundListItem;
