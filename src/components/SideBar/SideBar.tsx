import React, { FC, useState } from 'react';
/* MAterial ui */
import clsx from 'clsx';
import Backdrop from '@material-ui/core/Backdrop';

/* components */
import SignCard from '../RegisterPopup/SignCard';
import SideBarList from '../SideBarList/SideBarList';
import SideBarSettings from '../SideBarSettings/SideBarSettings';

import './SideBar.css';

const SideBar: FC = () => {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(true);
  const [active, setActive] = useState<string>('settings');

  const handleToggleSettings = () => {
    if (settingsVisible) {
      setActive('none');
    } else {
      setActive('settings');
    }
    setSettingsVisible((state) => !state);
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
          active={active}
          handleToggleSettings={handleToggleSettings}
        />
      </div>
      <SignCard />
    </div>
  );
};

export default SideBar;
