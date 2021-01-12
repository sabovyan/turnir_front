import React from 'react';

import SideBar from './SideBar';

const main = {
  title: 'sideBar',
  component: SideBar,
};

export default main;

export const bar: React.VFC<{}> = () => <SideBar />;
