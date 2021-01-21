import React, { createContext, FC, useState } from 'react';

import clsx from 'clsx';

import SignCard from '../SignCard/SignCard';
import SideBarList from '../SideBarList/SideBarList';
import SideBarSettings from '../SideBarSettings/SideBarSettings';
import CustomBackdrop from '../CustomBackdrop/CustomBackdrop';
import { SettingsContent } from '../../types/main.types';

import useAuth from '../../services/authentication';

import './SideBar.css';
import { Settings } from '@material-ui/icons';

export const SignCardDisplayContext = createContext(false);

const SideBar: FC = () => {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [settingsContent, setSettingsContent] = useState<SettingsContent>(
    'app',
  );
  const [isSignIconPressed, setIsSignIconPressed] = useState<boolean>(false);

  const { user } = useAuth();

  const handleSettingsIconClick = () => {
    /* to open app settings */
    if (settingsVisible) {
      setActive(true);
      setSettingsContent('app');
    } else if (!settingsVisible) {
      setActive(true);
      setSettingsContent('app');
      setSettingsVisible(true);
    }

    /* to close the side bar settings */
    if (settingsVisible && settingsContent === 'app') {
      setSettingsVisible(false);
      setActive(false);
    }
  };

  const handleAccountIconClick = () => {
    if (user) {
      setActive(false);

      /* to open profile settings */
      if (settingsVisible) {
        setSettingsContent('profile');
      } else if (!settingsVisible) {
        setSettingsContent('profile');
        setSettingsVisible(true);
      }
      /* to close the side bar settings */
      if (settingsVisible && settingsContent === 'profile') {
        setSettingsVisible(false);
        setActive(false);
      }
    } else {
      setIsSignIconPressed((state) => !state);
    }
  };

  const handleToggleSignCardVisibility = () => {
    setIsSignIconPressed((state) => !state);
  };

  const handleToggleSettings = () => {
    setSettingsVisible(false);
    setActive(false);
  };

  return (
    <div>
      <CustomBackdrop
        onClick={handleToggleSettings}
        open={settingsVisible}
        zIndex={1}
      />
      <div
        className={clsx('sidebar__container', {
          sideBar__withSettings: settingsVisible,
        })}
      >
        <SideBarSettings
          handleToggleSettings={handleToggleSettings}
          settingsVisible={settingsVisible}
          settingsContent={settingsContent}
        />

        <SideBarList
          activeSettings={active}
          handleSettingsIconClick={handleSettingsIconClick}
          personIconClick={handleAccountIconClick}
        />
      </div>
      <SignCardDisplayContext.Provider value={isSignIconPressed}>
        <SignCard handleClose={handleToggleSignCardVisibility} />
      </SignCardDisplayContext.Provider>
    </div>
  );
};

export default SideBar;
