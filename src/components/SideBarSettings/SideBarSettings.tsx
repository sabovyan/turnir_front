import React, { FC } from 'react';

import SideBarProfileSettings from '../SideBarProfileSettings/SideBarProfileSettings';
import SideBarAppSettings from '../SideBarAppSettings/SideBarAppSettings';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import colors from '../../styles/colors';

import Paper from '@material-ui/core/Paper';

import { SettingsContent } from '../../types/main.types';
import useAuth from '../../services/authentication';
import clsx from 'clsx';
import SideBarPlayersSettings from '../SideBarPlayersSettings/SideBarPlayersSettings';

interface ISideBarSettingsProps {
  settingsVisible: boolean;
  handleToggleSettings: () => void;
  settingsContent: SettingsContent;
}

const SideBarSettings: FC<ISideBarSettingsProps> = ({
  settingsVisible,
  handleToggleSettings,
  settingsContent,
}) => {
  const { user } = useAuth();

  return (
    <div
      className={clsx('settings', {
        settings__open: settingsVisible,
        settings__close: !settingsVisible,
      })}
    >
      <CloseButton
        onClick={handleToggleSettings}
        style={{ color: colors.white }}
      />
      <Paper
        elevation={3}
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '10px',
          overflow: 'auto',
        }}
      >
        {settingsContent === 'profile' && user ? (
          <SideBarProfileSettings />
        ) : settingsContent === 'players' && user ? (
          <SideBarPlayersSettings />
        ) : (
          <SideBarAppSettings />
        )}
      </Paper>
    </div>
  );
};

export default SideBarSettings;
