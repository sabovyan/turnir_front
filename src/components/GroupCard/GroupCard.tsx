import React from 'react';
import Card, { CardProps } from '@material-ui/core/Card';

interface Props extends CardProps {
  cssStyles?: React.CSSProperties;
}

const GroupCard = ({ children, cssStyles, ...props }: Props) => {
  return (
    <Card
      style={{
        minWidth: '500px',
        minHeight: 450,
        boxShadow: '5px 5px 10px 5px #cfcfcf, -5px -5px 15px 10px #e9e9e9',
        ...cssStyles,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default GroupCard;
