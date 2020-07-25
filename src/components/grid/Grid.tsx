import React from 'react';
import ClassNames from '@rogal/classnames';

import theme from './grid.module.scss';

const classNames = ClassNames(theme);

const Column = ({
  col,
  columnStart,
  children,
  className = ''
}: {
  col: number;
  children: React.ReactNode;
  columnStart?: number;
  className?: string;
}) => {
  return (
    <div
      className={classNames({
        [`col-${col}`]: col,
        [`col-start-${columnStart}`]: columnStart,
        [className]: className
      })}
    >
      {children}
    </div>
  );
};

export const Grid = ({
  center,
  children,
  className
}: {
  center?: boolean;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={classNames({
        grid: true,
        center: center,
        [className]: className
      })}
    >
      {children}
    </div>
  );
};

Grid.Column = Column;
