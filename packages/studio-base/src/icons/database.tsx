import React from 'react';
import { IconWrapper } from './util';
import type { IconWrapperProps } from './util';

const Icon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
        <path d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32z m-600 72h560v208H232V136z m560 480H232V408h560v208z m0 272H232V680h560v208z"></path>
        <path d="M344 240m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z"></path>
        <path d="M344 512m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z"></path>
        <path d="M344 784m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z"></path>
      </svg>
    </IconWrapper>
  );
};

export default Icon;
