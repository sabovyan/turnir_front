import React, { FC, useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import EliminationIcon from '../icons/elimination/EliminationIcon';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    width: 250,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    transition: 'box-shadow 100ms linear',
  },

  cardContent: {
    color: 'white',
    flexGrow: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  name: {
    color: 'white',
  },

  action: {
    flexGrow: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

interface ICardProps {
  icon: JSX.Element;
  buttonCLick: () => void;
  name: string;
  background: string;
}

const NewGameCard: FC<ICardProps> = ({
  icon,
  buttonCLick,
  name,
  background,
}) => {
  const classes = useStyles();

  const [raised, setRaised] = useState<boolean>(false);

  const cardMouseOver = () => {
    setRaised(true);
  };

  const cardMouseOut = () => {
    setRaised(false);
  };

  return (
    <Card
      onMouseOver={cardMouseOver}
      onMouseOut={cardMouseOut}
      raised={raised}
      className={classes.card}
    >
      <CardContent className={classes.cardContent} style={{ background }}>
        {/* <EliminationIcon
          style={{ fill: 'white', width: 40, alignSelf: 'flex-end' }}
        /> */}
        {icon}
        <Typography className={classes.name} variant="h6">
          {name}
        </Typography>
      </CardContent>
      <CardActions className={classes.action}>
        <IconButton onClick={buttonCLick}>
          <PlayArrowIcon style={{ fontSize: '2rem' }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NewGameCard;
