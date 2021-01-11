import React from 'react';
import GoogleButton from './GoogleButton/GoogleButton';
import CButton from './CustomButton/CustomButton';
import FacebookButton from './FacebookButton/FacebookButton'

const main = {
  title: 'button',
  component: GoogleButton
}

export default main

export const Google: React.VFC<{}> = () => <GoogleButton />;
export const Button: React.VFC<{}> = () => <CButton text="click me" />;
export const Facebook: React.VFC<{}> = () => <FacebookButton />;

