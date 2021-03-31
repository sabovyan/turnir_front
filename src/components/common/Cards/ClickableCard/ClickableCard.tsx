import React, { FC } from 'react';

import MUICard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import useCardStyles from './ClickableCard.styles';
import ICardProps from './ClickableCard.interface';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import tournamentService from 'src/services/tournament.service';

const ClickableCard: FC<ICardProps> = ({
  icon,
  onCardClick,
  name,
  color,
  isInteractive,
}) => {
  const classes = useCardStyles();

  const handleCardClick = () => {
    onCardClick();
  };

  return (
    <MUICard className={classes.card} onClick={handleCardClick}>
      <CardContent
        className={classes.cardContent}
        style={{ background: color }}
      >
        {icon}
      </CardContent>
      <CardActions
        className={classes.action}
        style={{ justifyContent: isInteractive ? 'space-between' : 'center' }}
      >
        <Typography
          variant="h6"
          style={{ color: !isInteractive ? color : 'inherit' }}
        >
          {name}
        </Typography>
        {isInteractive && (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <EditIcon style={{ color, cursor: 'pointer' }} />
            <DeleteIcon style={{ color, cursor: 'pointer' }} />
          </div>
        )}
      </CardActions>
    </MUICard>
  );
};

export default ClickableCard;
