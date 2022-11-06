import React from 'react';
import GroupSettings from 'src/components/SideBarPlayersSettings/GroupSettings';
import HomeTopBar from 'src/components/TopBar/HomeTopBar/HomeTopBar';

interface Props {}

const Players = (props: Props) => {
  return (
    <>
      <HomeTopBar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        <GroupSettings />
      </div>
    </>
  );
};

export default Players;
