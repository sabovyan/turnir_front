import React from 'react';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { SvgIconProps } from '@material-ui/core';

const TeamsIcon = ({ ...props }: SvgIconProps) => {
  return <GroupAddIcon {...props} />;
};

export default TeamsIcon;
