import React, { FC, useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
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
    justifyContent: 'space-between',
  },

  action: {
    flexGrow: 0,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface ICardProps {
  icon: JSX.Element;
  onCardClick: () => void;
  name: string;
  color: string;
}

const NewGameCard: FC<ICardProps> = ({ icon, onCardClick, name, color }) => {
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
      onClick={onCardClick}
    >
      <CardContent
        className={classes.cardContent}
        style={{ background: color }}
      >
        {icon}
      </CardContent>
      <CardActions className={classes.action}>
        <Typography variant="h6" style={{ color }}>
          {name}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default NewGameCard;
