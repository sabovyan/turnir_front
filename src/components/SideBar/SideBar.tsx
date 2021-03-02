import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from 'react';

import SideBarSettings from '../SideBarSettings/SideBarSettings';
import CustomSnackBar from '../CustomSnackBar/CustomSnackBar';
import CustomBackdrop from '../CustomBackdrop/CustomBackdrop';
import SideBarList from '../SideBarList/SideBarList';
import SignCard from '../SignCard/SignCard';

import { closeAlert } from '../../store/features/formResponseStatus';
import { activeSideBarIcon, SettingsContent } from '../../types/main.types';
import { useSelector, useDispatch } from 'react-redux';
import useAuth from '../../services/authentication';
import { RootState } from '../../store/features';

import clsx from 'clsx';
import './SideBar.css';

export const signCardDisplayContext = createContext<{
  state: boolean;
  toggle: Dispatch<SetStateAction<boolean>>;
}>({ state: false, toggle: () => {} });

const SideBar: FC = () => {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const [active, setActive] = useState<activeSideBarIcon>(
    activeSideBarIcon.none,
  );
  const [settingsContent, setSettingsContent] = useState<SettingsContent>(
    'app',
  );
  const [isSignIconPressed, setIsSignIconPressed] = useState<boolean>(false);

  const { user } = useAuth();

  const formResponseStatus = useSelector(
    (state: RootState) => state.formResponseStatus,
  );
  const dispatch = useDispatch();

  const handleSettingsIconClick = () => {
    /* to open app settings */
    if (settingsVisible) {
      setActive(activeSideBarIcon.settings);
      setSettingsContent('app');
    } else if (!settingsVisible) {
      setActive(activeSideBarIcon.settings);
      setSettingsContent('app');
      setSettingsVisible(true);
    }

    /* to close the side bar settings */
    if (settingsVisible && settingsContent === 'app') {
      setSettingsVisible(false);
      setActive(activeSideBarIcon.none);
    }
  };

  const handlePlayersIconClick = () => {
    if (user) {
      if (active !== activeSideBarIcon.players) {
        setActive(activeSideBarIcon.players);
        setSettingsContent('players');
        setSettingsVisible(true);
      } else {
        setActive(activeSideBarIcon.none);
        setSettingsVisible(false);
        setSettingsContent('app');
      }
    }
  };

  const handleAccountIconClick = () => {
    if (user) {
      setActive(activeSideBarIcon.none);

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
        setActive(activeSideBarIcon.none);
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
    setActive(activeSideBarIcon.none);
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
          activeSidebarIcon={active}
          handleSettingsIconClick={handleSettingsIconClick}
          personIconClick={handleAccountIconClick}
          handlePlayersIconClick={handlePlayersIconClick}
        />
      </div>
      <signCardDisplayContext.Provider
        value={{ state: isSignIconPressed, toggle: setIsSignIconPressed }}
      >
        <SignCard handleClose={handleToggleSignCardVisibility} />
      </signCardDisplayContext.Provider>
      <CustomSnackBar
        open={formResponseStatus.open}
        message={formResponseStatus.message}
        type={formResponseStatus.type}
        onClose={() => {
          dispatch(closeAlert());
        }}
      />
    </div>
  );
};

export default SideBar;
