import Divider from '@material-ui/core/Divider';
import React, { FC } from 'react';

interface IPropsOfLine {
  text: string;
}

const LineWidthText: FC<IPropsOfLine> = ({ text }) => {
  return (
    <div style={{ display: 'flex', width: '100%', margin: '10px 0' }}>
      <hr style={{ width: '100%' }} />
      <span>{text}</span>
      <hr style={{ width: '100%' }} />
    </div>
  );
};

export default LineWidthText;
