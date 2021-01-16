import React, { createContext, FC, useState } from 'react';

import clsx from 'clsx';
import Backdrop from '@material-ui/core/Backdrop';

import SignCard from '../SignCard/SignCard';
import SideBarList from '../SideBarList/SideBarList';
import SideBarSettings from '../SideBarSettings/SideBarSettings';

import './SideBar.css';

export const SignCardDisplayContext = createContext(false);

const SideBar: FC = () => {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(true);
  const [active, setActive] = useState<string>('settings');

  const [isSignIconPressed, setIsSignIconPressed] = useState<boolean>(true);

  const handleToggleSettings = () => {
    if (settingsVisible) {
      setActive('none');
    } else {
      setActive('settings');
    }
    setSettingsVisible((state) => !state);
  };

  const handleToggleSignCardVisibility = () => {
    setIsSignIconPressed((state) => !state);
  };

  return (
    <div>
      <Backdrop
        onClick={handleToggleSettings}
        open={settingsVisible}
        style={{
          justifyContent: 'flex-start',
        }}
      />
      <div
        className={clsx('sidebar__container', {
          sideBar__withSettings: settingsVisible,
        })}
      >
        <SideBarSettings
          handleToggleSettings={handleToggleSettings}
          settingsVisible={settingsVisible}
        />

        <SideBarList
          activeSettings={active}
          handleToggleSettings={handleToggleSettings}
          personIconClick={handleToggleSignCardVisibility}
        />
      </div>
      <SignCardDisplayContext.Provider value={isSignIconPressed}>
        <SignCard handleClose={handleToggleSignCardVisibility} />
      </SignCardDisplayContext.Provider>
    </div>
  );
};

export default SideBar;
