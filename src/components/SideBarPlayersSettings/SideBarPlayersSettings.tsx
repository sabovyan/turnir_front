import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store/features';
import { useSelector } from 'react-redux';

import AddNewPlayerForm from '../Forms/AddNewPlayerForm/AddNewPlayerForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import SideBarPlayerList from './SideBarPlayerList';
import SideBarGroupSettings from './SideBarGroupSettings';
import FormField from '../Input/FormField';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import GroupIcon from '@material-ui/icons/Group';

const SideBarPlayersSettings = () => {
  const { t } = useTranslation();

  const { groups, players } = useSelector((state: RootState) => state);

  const [groupsValue, setGroupsValue] = useState<number | 'all'>('all');
  const [listAnchorEl, setListAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );

  const [groupModalDisplayed, setGroupModalDisplayed] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setListAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setListAnchorEl(null);
  };

  const handleManageGroupEventClick = () => {
    handleClose();
    setGroupModalDisplayed(true);
  };

  const handleGroupsModalClose = () => {
    setGroupModalDisplayed(false);
  };

  const handleGroupChangeField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let currentValue: number | 'all';

    if (event.target.value === 'all') {
      currentValue = event.target.value;
    } else {
      currentValue = Number(event.target.value);
    }

    setGroupsValue(currentValue);
  };

  return !groups.length || !players.length ? (
    <CircularProgress />
  ) : (
    <>
      <SideBarGroupSettings
        open={groupModalDisplayed}
        onCloseIconClick={handleGroupsModalClose}
      />
      <div
        style={{
          width: '100%',
          padding: '5px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            color="textSecondary"
            variant="h6"
            component="h3"
            style={{ margin: '1rem 0' }}
          >
            {t('Players and Groups')}
          </Typography>
          <IconButton
            style={{
              alignSelf: 'flex-end',
              padding: 0,
              display: 'flex',
              alignItems: 'flex-end',
              margin: '1rem 0',
            }}
            onClick={handleClick}
          >
            <MoreHorizIcon
              style={{ fontSize: '2rem', alignSelf: 'flex-end' }}
            />
          </IconButton>
        </div>

        <Menu
          id="simple-menu"
          anchorEl={listAnchorEl}
          keepMounted
          open={Boolean(listAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={handleManageGroupEventClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <GroupIcon /> Manage Groups
          </MenuItem>
        </Menu>
      </div>

      <div>
        <FormField
          select
          label="choose the group"
          value={groupsValue}
          style={{ marginBottom: '1rem' }}
          onChange={handleGroupChangeField}
        >
          <MenuItem value="all">All</MenuItem>

          {groups &&
            groups.length &&
            groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
        </FormField>

        <SideBarPlayerList selectedGroupId={groupsValue} />

        <AddNewPlayerForm />
      </div>
    </>
  );
};

export default SideBarPlayersSettings;
