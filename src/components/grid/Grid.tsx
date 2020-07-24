import React from 'react';
import ClassNames from '@rogal/classnames';

import theme from './grid.module.scss';

const classNames = ClassNames(theme);

const Column = ({
  col,
  children
}: {
  col: number;
  children: React.ReactNode;
}) => {
  return <div className={classNames({ [`col-${col}`]: col })}>{children}</div>;
};

export const Grid = ({
  center,
  children
}: {
  center?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className={classNames({ grid: true, center: center })}>{children}</div>
  );
};

Grid.Column = Column;
