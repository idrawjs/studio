import React from 'react';
import { IconWrapper } from './util';
import type { IconWrapperProps } from './util';

const Icon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
        <path d="M935.253333 111.786667a42.666667 42.666667 0 0 0-23.04-23.04A42.666667 42.666667 0 0 0 896 85.333333h-256a42.666667 42.666667 0 0 0 0 85.333334h153.173333L170.666667 793.173333V640a42.666667 42.666667 0 0 0-85.333334 0v256a42.666667 42.666667 0 0 0 3.413334 16.213333 42.666667 42.666667 0 0 0 23.04 23.04A42.666667 42.666667 0 0 0 128 938.666667h256a42.666667 42.666667 0 0 0 0-85.333334H230.826667L853.333333 230.826667V384a42.666667 42.666667 0 0 0 85.333334 0V128a42.666667 42.666667 0 0 0-3.413334-16.213333z"></path>
      </svg>
    </IconWrapper>
  );
};

export default Icon;
