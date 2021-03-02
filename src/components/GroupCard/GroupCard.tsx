import React from 'react';
import Card, { CardProps } from '@material-ui/core/Card';

interface Props extends CardProps {
  cssStyles?: React.CSSProperties;
}

const GroupCard = ({ children, cssStyles, ...props }: Props) => {
  return (
    <Card
      style={{
        minWidth: '370px',
        minHeight: 500,
        boxShadow: '0 0 1px 1px #c8c8c8',
        ...cssStyles,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default GroupCard;
