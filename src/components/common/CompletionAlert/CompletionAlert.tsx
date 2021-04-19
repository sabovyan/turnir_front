import React from 'react';
import Button from '@material-ui/core/Button/Button';
import Typography from '@material-ui/core/Typography';
import Colors from 'src/styles/colors';

interface Props {
  open: boolean;
  onButtonClick: () => void;
}

const CompletionAlert = ({ open, onButtonClick }: Props) => {
  return open ? (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        justifyContent: 'space-between',
        width: 500,
        background: Colors.orange,
        color: 'white',
        alignItems: 'center',
        padding: 10,
        fontSize: 18,
        borderRadius: 5,
      }}
    >
      <Typography variant="body1">Tournament is completed</Typography>
      <Button style={{ color: 'white' }} onClick={onButtonClick}>
        {' '}
        show Result
      </Button>
    </div>
  ) : null;
};

export default CompletionAlert;
