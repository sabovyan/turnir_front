import React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';

interface Props extends TypographyProps {
  message: string;
}

const ErrorMessage = ({ message, ...props }: Props) => {
  return (
    <Typography
      color="secondary"
      style={{ marginBottom: '1rem', minHeight: '2rem' }}
      {...props}
    >
      {message}
    </Typography>
  );
};

export default ErrorMessage;
