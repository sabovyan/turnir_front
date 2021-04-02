import React from 'react';

import Typography from '@material-ui/core/Typography';

import styles from './Round.module.css';

interface Props {
  children: React.ReactNode;
  roundHeight: number;
  name: string;
}

const Round = ({ children, name, roundHeight }: Props) => {
  return (
    <div className={styles.round}>
      <div className={styles['round__Header']}>
        <Typography color="textSecondary">{name}</Typography>
      </div>
      <div
        className={styles['round__Container']}
        style={{
          height: roundHeight,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Round;
