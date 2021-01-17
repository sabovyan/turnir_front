import React, { createContext, FC, useState } from 'react';

import clsx from 'clsx';
import Backdrop from '@material-ui/core/Backdrop';

import SignCard from '../SignCard/SignCard';
import SideBarList from '../SideBarList/SideBarList';
import SideBarSettings from '../SideBarSettings/SideBarSettings';

import './SideBar.css';
import CustomBackdrop from '../CustomBackdrop/CustomBackdrop';

export const SignCardDisplayContext = createContext(false);

const SideBar: FC = () => {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const [isSignIconPressed, setIsSignIconPressed] = useState<boolean>(false);

  const handleToggleSettings = () => {
    if (settingsVisible) {
      setActive((state) => !state);
    } else {
      setActive((state) => !state);
    }
    setSettingsVisible((state) => !state);
  };

  const handleToggleSignCardVisibility = () => {
    setIsSignIconPressed((state) => !state);
  };

  return (
    <div>
      <CustomBackdrop
        onClick={handleToggleSettings}
        open={settingsVisible}
        style={{}}
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
