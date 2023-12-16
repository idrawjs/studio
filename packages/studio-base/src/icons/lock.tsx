import React from 'react';
import { IconWrapper } from './util';
import type { IconWrapperProps } from './util';

const Icon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
        <path d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM540 701v53c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-53c-12.1-8.7-20-22.9-20-39 0-26.5 21.5-48 48-48s48 21.5 48 48c0 16.1-7.9 30.3-20 39z m152-237H332V240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224z"></path>
      </svg>
    </IconWrapper>
  );
};

export default Icon;
