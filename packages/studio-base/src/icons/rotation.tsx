import React from 'react';
import { IconWrapper } from './util';
import type { IconWrapperProps } from './util';

const Icon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
        <path d="M128 128h64v389.312A384.32 384.32 0 0 1 506.688 832H896v64H192a64 64 0 0 1-64-64V128z m313.6 704A320.384 320.384 0 0 0 192 582.4V832h249.6z"></path>
      </svg>
    </IconWrapper>
  );
};

export default Icon;
