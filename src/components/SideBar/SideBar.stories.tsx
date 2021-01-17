import React from 'react';

import SideBar from './SideBar';

const main = {
  title: 'sideBar',
  component: SideBar,
};

export default main;

export const bar: React.VFC<{}> = () => (
  <div style={{ display: 'flex' }}>
    <SideBar />
    <section>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed in, quos
      rerum fugiat soluta hic quidem itaque voluptatibus dolores impedit atque
      porro vitae enim eos aliquid sint expedita eum eligendi.
    </section>
  </div>
);
