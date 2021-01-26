import React from 'react';

import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import AccordionHeader from '../AccordionHeader/AccordionHeader';

interface ISettingsListItemProps extends ListItemProps {
  header: string;
  description?: string;
}

const SettingsListItem = ({
  children,
  header,
  description,
}: ISettingsListItemProps) => {
  return (
    <ListItem style={{ display: 'flex', flexDirection: 'column' }}>
      <AccordionHeader header={header} description={description} />

      {children}
    </ListItem>
  );
};

export default SettingsListItem;
