import React from 'react';
import { IconWrapper } from './util';
import type { IconWrapperProps } from './util';

const Icon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
        <path d="M256 682.666667a85.333333 85.333333 0 1 0 0 170.666666 85.333333 85.333333 0 0 0 0-170.666666z m-170.666667 85.333333a170.666667 170.666667 0 1 1 341.333334 0 170.666667 170.666667 0 0 1-341.333334 0zM768 170.666667a85.333333 85.333333 0 1 0 0 170.666666 85.333333 85.333333 0 0 0 0-170.666666z m-170.666667 85.333333a170.666667 170.666667 0 1 1 341.333334 0 170.666667 170.666667 0 0 1-341.333334 0z"></path>
        <path d="M707.84 316.16a42.666667 42.666667 0 0 1 0 60.330667l-331.178667 331.178666a42.666667 42.666667 0 0 1-60.330666-60.330666l331.178666-331.178667a42.666667 42.666667 0 0 1 60.330667 0z"></path>
      </svg>
    </IconWrapper>
  );
};

export default Icon;
