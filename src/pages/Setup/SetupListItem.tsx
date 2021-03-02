import React, { DragEvent } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import DragHandleIcon from '@material-ui/icons/DragHandle';

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
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <Typography variant="body1" component="span" color="textSecondary">
        {index + 1}
      </Typography>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography
          variant="body1"
          component="span"
          color={text === '<FAKE>' ? 'textSecondary' : 'textPrimary'}
        >
          {text}
        </Typography>

        <DragHandleIcon />
      </div>
    </ListItem>
  );
};

export default SetupListItem;
