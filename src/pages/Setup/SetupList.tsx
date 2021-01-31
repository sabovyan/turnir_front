import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import DragHandleIcon from '@material-ui/icons/DragHandle';

import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/features';
import SetupListItem from './SetupListItem';

interface Props {}

const SetupList = (props: Props) => {
  const { t } = useTranslation();
  const { players } = useSelector((state: RootState) => state.settingsInfo);

  return (
    <List
      style={{
        boxShadow: '3px 0px 3px #dadada',
        height: '100%',
        minWidth: '280px',
      }}
    >
      <ListSubheader
        style={{
          display: 'flex',
          gap: '1rem',
        }}
      >
        <span>#</span>
        <span>{t('Participants')}</span>
      </ListSubheader>
      {players.length > 0 &&
        players.map((pl, idx) => (
          <SetupListItem key={pl.name} text={pl.name} index={idx} />
        ))}
    </List>
  );
};

export default SetupList;
