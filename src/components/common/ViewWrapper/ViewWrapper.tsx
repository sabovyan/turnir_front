import React from 'react';
import styles from './ViewWrapper.module.css';

const ViewWrapper = ({
  children,
  ...props
}: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div className={styles.wrapper} {...props}>
      {children}
    </div>
  );
};

export default ViewWrapper;
