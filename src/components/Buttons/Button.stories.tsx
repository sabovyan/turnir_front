import React from 'react';
import GoogleButton from './GoogleButton/GoogleButton';
import CButton from './CustomButton/CustomButton';
import FacebookButton from './FacebookButton/FacebookButton';
import CloseButton from './CloseButton/CloseButton';

const main = {
  title: 'FormElements/button',
  component: GoogleButton,
};

export default main;

export const Google: React.VFC<{}> = () => <GoogleButton />;
export const Button: React.VFC<{}> = () => <CButton text="click me" />;
export const Facebook: React.VFC<{}> = () => <FacebookButton />;
export const Close: React.VFC<{}> = () => <CloseButton />;
