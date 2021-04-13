import React from 'react';
import AndroidIcon from '@material-ui/icons/Android';
import { SvgIconProps } from '@material-ui/core';

const Monster = ({ ...props }: SvgIconProps) => {
  return <AndroidIcon {...props} />;
};

export default Monster;
