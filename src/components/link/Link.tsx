/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { default as NextLink } from 'next/link';
import ClassNames from '@rogal/classnames';

import styles from './link.module.scss';

const classNames = ClassNames(styles);

type LinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

export const Link = ({
  className = '',
  href,
  children,
  external
}: LinkProps): JSX.Element => {
  const linkClassNames = classNames({
    link: true,
    [className]: className
  });

  if (external) {
    return (
      <a className={linkClassNames} href={href}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href}>
      <a className={linkClassNames}>{children}</a>
    </NextLink>
  );
};
