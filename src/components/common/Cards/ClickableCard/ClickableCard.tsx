import React, { ChangeEvent, FC, FormEvent, MouseEvent, useState } from 'react';

import MUICard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import useCardStyles from './ClickableCard.styles';
import ICardProps from './ClickableCard.interface';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import FormField from 'src/components/Input/FormField';
import tournamentService from 'src/services/tournament.service';
import { useDispatch } from 'react-redux';
import { setResponseStatus } from 'src/store/features/formResponseStatus';
import {
  deleteTournamentById,
  updateTournamentName,
} from 'src/store/features/allTournaments';
import { CloseButton } from '../../Buttons';

const ClickableCard: FC<ICardProps> = ({
  icon,
  onCardClick,
  name,
  color,
  isInteractive,
  tournamentId,
  date,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [draft, setDraft] = useState(name);

  const dispatch = useDispatch();
  const classes = useCardStyles();

  const handleCardClick = () => onCardClick();

  const handleEditIconClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsEdit(true);
  };

  const handleDeleteIconClick = async (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!tournamentId) return;

    try {
      const tournament = await tournamentService.deleteById({
        id: tournamentId,
      });

      if (!tournament) {
        dispatch(
          setResponseStatus({
            type: 'error',
            message: 'tournament is not defined',
            open: true,
          }),
        );
        return;
      }

      dispatch(deleteTournamentById({ id: tournament.id }));
    } catch (err) {
      dispatch(
        setResponseStatus({
          type: 'error',
          message: err.response.data.error,
          open: true,
        }),
      );
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setDraft(value);
  };

  const handleFieldBlur = () => {
    setIsEdit(false);
    setDraft(name);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!tournamentId) return;

    if (!draft) {
      dispatch(
        setResponseStatus({
          type: 'error',
          message: 'name should not be empty',
          open: true,
        }),
      );
      return;
    }

    try {
      const tournament = await tournamentService.changeNameById({
        id: tournamentId,
        data: { name: draft },
      });
      if (!tournament) {
        dispatch(
          setResponseStatus({
            type: 'error',
            message: 'tournament is not defined',
            open: true,
          }),
        );
        return;
      }

      dispatch(
        updateTournamentName({ id: tournament.id, name: tournament.name }),
      );

      setIsEdit(false);
    } catch (err) {
      dispatch(
        setResponseStatus({
          type: 'error',
          message: err.response.data.error,
          open: true,
        }),
      );
    }
  };

  return (
    <MUICard
      className={classes.card}
      onClick={handleCardClick}
      data-card="yes"
      style={{
        width: !isInteractive ? 250 : 350,
        height: !isInteractive ? 200 : 220,
      }}
    >
      <CardContent
        className={classes.cardContent}
        style={{ background: color, cursor: 'pointer', position: 'relative' }}
      >
        {icon}
        {isInteractive && (
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexDirection: 'column',
              position: 'absolute',
              top: 5,
              right: 5,
            }}
          >
            <CloseButton
              onClick={handleDeleteIconClick}
              style={{ color: 'white', cursor: 'pointer' }}
            />
          </div>
        )}
      </CardContent>

      <CardActions
        className={classes.action}
        style={{
          justifyContent: isInteractive ? 'space-between' : 'center',
          width: '100%',
          alignItems: 'flex-start',
        }}
        onClick={(event: MouseEvent<HTMLElement>) => event.stopPropagation()}
      >
        {!isEdit ? (
          <>
            <div>
              <Typography
                variant={!isInteractive ? 'h6' : 'body1'}
                style={{
                  color: !isInteractive ? color : 'inherit',
                  fontWeight: !isInteractive ? 'inherit' : 'bold',
                }}
              >
                {name}
              </Typography>
              {isInteractive && (
                <Typography
                  onClick={(event: MouseEvent<HTMLElement>) =>
                    event.stopPropagation()
                  }
                  align="left"
                  variant="body2"
                  color="textSecondary"
                  style={{ margin: '10px 0' }}
                >
                  {date &&
                    new Date(date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                </Typography>
              )}
            </div>
            {isInteractive && (
              <IconButton
                onClick={handleEditIconClick}
                style={{ margin: 5, padding: 0 }}
              >
                <EditIcon style={{ color, cursor: 'pointer' }} />
              </IconButton>
            )}
          </>
        ) : (
          <form
            style={{ width: '100%' }}
            onClick={(event: MouseEvent<HTMLFormElement>) =>
              event.stopPropagation()
            }
            onSubmit={handleFormSubmit}
          >
            <FormField
              fullWidth
              value={draft}
              onChange={handleNameChange}
              onBlur={handleFieldBlur}
              autoFocus
            />
          </form>
        )}
      </CardActions>
    </MUICard>
  );
};

export default ClickableCard;
