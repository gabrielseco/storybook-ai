import * as React from 'react';

import styles from './panel.module.scss';

export const Panel = ({
  children
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <div className={styles.panel}>{children}</div>;
};
