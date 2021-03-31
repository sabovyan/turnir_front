import React, { DragEvent } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import FAKE_PLAYER from 'src/constants/fakePlayer';
import styles from './SetupListItem.module.css';

interface ISetupListItemProps {
  index: number;
  text: string;
  onDragStart: (e: DragEvent<HTMLLIElement>) => void;
  onDragOver: (e: DragEvent<HTMLLIElement>) => void;
  onDrop: (e: DragEvent<HTMLLIElement>) => void;
}

const SetupListItem = ({
  index,
  text,
  onDragStart,
  onDragOver,
  onDrop,
}: ISetupListItemProps) => {
  const handleDragStart = (e: DragEvent<HTMLLIElement>) => {
    onDragStart(e);
  };

  const handleDragOver = (e: DragEvent<HTMLLIElement>) => {
    onDragOver(e);
  };

  const handleDrop = (e: DragEvent<HTMLLIElement>) => {
    onDrop(e);
  };

  return (
    <ListItem
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      data-position={index}
      className={styles.listItem}
    >
      <Typography variant="body1" component="span" color="textSecondary">
        {index + 1}
      </Typography>
      <div className={styles.textWrapper}>
        <Typography
          variant="body1"
          component="span"
          color={text === FAKE_PLAYER ? 'textSecondary' : 'textPrimary'}
        >
          {text}
        </Typography>

        <DragHandleIcon />
      </div>
    </ListItem>
  );
};

export default SetupListItem;
