import React from 'react';
import { IconWrapper } from './util';
import type { IconWrapperProps } from './util';

const Icon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
        <path d="M145 96l66 746.6L511.8 928l299.6-85.4L878.7 96H145z m610.9 700.6l-244.1 69.6-245.2-69.6-56.7-641.2h603.8l-57.8 641.2z"></path>
        <path d="M281 249l1.7 24.3 22.7 253.5h206.5v-0.1h112.9l-11.4 118.5L511 672.9v0.2h-0.8l-102.4-27.7-6.5-73.2h-91l11.3 144.7 188.6 52h1.7v-0.4l187.7-51.7 1.7-16.3 21.2-242.2 3.2-24.3H511v0.2H389.9l-8.2-94.2h352.1l1.7-19.5 4.8-47.2L742 249H511z"></path>
      </svg>
    </IconWrapper>
  );
};

export default Icon;
