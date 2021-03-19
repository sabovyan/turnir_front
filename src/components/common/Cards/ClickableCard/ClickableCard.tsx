import React, { FC } from 'react';

import MUICard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import useCardStyles from './ClickableCard.styles';
import ICardProps from './ClickableCard.interface';

const ClickableCard: FC<ICardProps> = ({ icon, onCardClick, name, color }) => {
  const classes = useCardStyles();

  return (
    <MUICard className={classes.card} onClick={onCardClick}>
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
    </MUICard>
  );
};

export default ClickableCard;
