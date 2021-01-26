import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import React from 'react';

interface ISettingsListItemProps extends ListItemProps {
  header: string;
}

const SettingsListItem = ({ children, header }: ISettingsListItemProps) => {
  return (
    <ListItem style={{ display: 'flex', flexDirection: 'column' }}>
      <ListSubheader style={{ alignSelf: 'flex-start' }}>
        {header}
      </ListSubheader>
      {children}
    </ListItem>
  );
};

export default SettingsListItem;
