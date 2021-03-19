import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { SvgIconProps } from '@material-ui/core';

const SingleIcon = ({ ...props }: SvgIconProps) => {
  return <PersonIcon {...props} />;
};

export default SingleIcon;
