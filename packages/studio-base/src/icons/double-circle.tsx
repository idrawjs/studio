import React from 'react';
import { IconWrapper } from './util';
import type { IconWrapperProps } from './util';

const Icon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
        <path d="M510.762667 970.666667A458.666667 458.666667 0 1 1 969.429333 512a459.178667 459.178667 0 0 1-458.666666 458.666667z m0-853.333334a394.666667 394.666667 0 1 0 394.666666 394.666667 395.093333 395.093333 0 0 0-394.666666-394.666667z"></path>
        <path d="M512 724.48A212.48 212.48 0 1 1 724.48 512 212.736 212.736 0 0 1 512 724.48z m0-360.96A148.48 148.48 0 1 0 660.48 512 148.608 148.608 0 0 0 512 363.52z"></path>
      </svg>
    </IconWrapper>
  );
};

export default Icon;
