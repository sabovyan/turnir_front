import React from 'react';
import Typography from '@material-ui/core/Typography';

import './SignCardLeft.css';

const SignCardLeft = () => {
  return (
    <div className="cardLeft">
      <Typography variant="h6" component="h4" style={{ margin: ' 30px 20px' }}>
        Why sign up?
      </Typography>
      <ul className="advantage-list">
        <li className="advantage-list__item">
          Sync your tournaments across devices
        </li>
        <li className="advantage-list__item">Backup your data</li>
        <li className="advantage-list__item">It’s free!</li>
      </ul>
    </div>
  );
};

export default SignCardLeft;
