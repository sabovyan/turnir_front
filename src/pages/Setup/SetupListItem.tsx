import React from 'react';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import DragHandleIcon from '@material-ui/icons/DragHandle';

interface ISetupListItemProps extends ListItemProps {
  index: number;
  text: string;
}

const SetupListItem = ({ index, text, ...props }: ISetupListItemProps) => {
  return (
    <ListItem
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
      }}
      // {...props}
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
        <Typography variant="body1" component="span" color="textPrimary">
          {text}
        </Typography>

        <DragHandleIcon />
      </div>
    </ListItem>
  );
};

export default SetupListItem;
