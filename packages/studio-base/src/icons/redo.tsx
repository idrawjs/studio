import React from 'react';
import { IconWrapper } from './util';
import type { IconWrapperProps } from './util';

const Icon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
        <path d="M1000.65998 0.00002h-94.819998a24 24 0 0 0-23.999999 25.14l8 165.519996A494.83999 494.83999 0 0 0 511.99999 16.00002C238.679995 16.00002 15.8 239.060015 16 512.38001 16.2 786.140005 238.199995 1008 511.99999 1008a494.19999 494.19999 0 0 0 332.359994-127.819997 24 24 0 0 0 0.959999-34.86l-67.999998-67.999998a24 24 0 0 0-32.76-1.1A351.999993 351.999993 0 1 1 804.199984 315.600014l-203.059996-9.74a24 24 0 0 0-25.139999 24v94.819998a24 24 0 0 0 23.999999 23.999999h400.659992a24 24 0 0 0 24-23.999999V24.00002a24 24 0 0 0-24-24z"></path>
      </svg>
    </IconWrapper>
  );
};

export default Icon;
