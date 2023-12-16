import React from 'react';
import { IconWrapper } from './util';
import type { IconWrapperProps } from './util';

const Icon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
        <path d="M592 928H432a48 48 0 1 0 0 96h160a48 48 0 1 0 0-96zM976 0H784a48 48 0 1 0 0 96h144v144.016a48 48 0 1 0 96 0V48a48 48 0 0 0-48-48zM240 928H96v-144a48 48 0 1 0-96 0v192a48 48 0 0 0 48 48h192a48 48 0 1 0 0-96zM48 640a48 48 0 0 0 48-48V432a48 48 0 1 0-96 0v160a48 48 0 0 0 48 48zM240 0H48a48 48 0 0 0-48 48v192a48 48 0 1 0 96 0V96h144a48 48 0 1 0 0-96z m784 592V432a48 48 0 1 0-96 0v160a48 48 0 1 0 96 0zM592 0H432a48 48 0 1 0 0 96h160a48 48 0 1 0 0-96z m384 736a48 48 0 0 0-48 48v144h-144a48 48 0 1 0 0 96h192a48 48 0 0 0 48-48V784a48 48 0 0 0-48-48z"></path>
      </svg>
    </IconWrapper>
  );
};

export default Icon;
