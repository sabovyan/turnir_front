import Typography from '@material-ui/core/Typography';
import React from 'react';
import Colors from 'src/styles/colors';

interface Props {
  name1: string;
  name2: string;
}

const ScoreBoardHeader = ({ name1, name2 }: Props) => {
  return (
    <div
      style={{
        width: '100%',
        background: Colors.sideColor,
        color: Colors.white,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h6"
        style={{
          flexGrow: 1,
          textAlign: 'center',
          padding: '1rem',
          color: Colors.secondaryWhite,
        }}
      >
        {name1}
      </Typography>
      <Typography
        variant="h6"
        style={{
          flexGrow: 1,
          textAlign: 'center',
          padding: '1rem',
          color: Colors.secondaryWhite,
        }}
      >
        {name2}
      </Typography>
    </div>
  );
};

export default ScoreBoardHeader;
