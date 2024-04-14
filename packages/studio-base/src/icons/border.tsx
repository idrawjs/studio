import React from 'react';
import { IconWrapper } from './util';
import type { IconWrapperProps } from './util';

const Icon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
        <path d="M512 384a42.666667 42.666667 0 1 0-42.666667-42.666667 42.666667 42.666667 0 0 0 42.666667 42.666667z m0 170.666667a42.666667 42.666667 0 1 0-42.666667-42.666667 42.666667 42.666667 0 0 0 42.666667 42.666667z m170.666667 0a42.666667 42.666667 0 1 0-42.666667-42.666667 42.666667 42.666667 0 0 0 42.666667 42.666667z m-170.666667 170.666666a42.666667 42.666667 0 1 0-42.666667-42.666666 42.666667 42.666667 0 0 0 42.666667 42.666666z m341.333333-597.333333H170.666667a42.666667 42.666667 0 0 0-42.666667 42.666667v682.666666a42.666667 42.666667 0 0 0 42.666667 42.666667h682.666666a42.666667 42.666667 0 0 0 42.666667-42.666667V170.666667a42.666667 42.666667 0 0 0-42.666667-42.666667z m-42.666666 682.666667H213.333333V213.333333h597.333334zM341.333333 554.666667a42.666667 42.666667 0 1 0-42.666666-42.666667 42.666667 42.666667 0 0 0 42.666666 42.666667z"></path>
      </svg>
    </IconWrapper>
  );
};

export default Icon;