import React, { VFC } from 'react';
import SignCard from './SignCard';

const main = {
  title: 'card',
  component: SignCard,
};

export default main;

export const Sign: VFC<{}> = () => <SignCard handleClose={() => {}} />;
