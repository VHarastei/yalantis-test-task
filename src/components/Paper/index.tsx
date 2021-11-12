import React from 'react';
import styles from './Paper.module.scss';

type PropTypes = {
  title: string;
};

export const Paper: React.FC<PropTypes> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
