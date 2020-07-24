import * as React from 'react';
import ClassNames from '@rogal/classnames';

import styles from './button.module.scss';

const classNames = ClassNames(styles);

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  as?: React.ElementType;
  icon?: React.ReactNode;
}
export const Button = ({
  as = 'button',
  icon,
  children,
  ...props
}: ButtonProps): JSX.Element => {
  const Component = as;
  return (
    <Component
      className={classNames({ 'button': true, 'button--icon': !children })}
      {...props}
    >
      {icon && <span className={classNames('button__icon')}>{icon}</span>}
      {children && (
        <span className={classNames('button__text')}>{children}</span>
      )}
    </Component>
  );
};
