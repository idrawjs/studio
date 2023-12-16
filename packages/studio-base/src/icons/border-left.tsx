import React from 'react';
import { IconWrapper } from './util';
import type { IconWrapperProps } from './util';

const Icon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
        <path d="M554.666667 469.333333v85.333334h-85.333334v-85.333334z m85.333333 0v85.333334h85.333333v-85.333334z m170.666667 0v85.333334h85.333333v-85.333334z m0 170.666667v85.333333h85.333333v-85.333333z m-512-170.666667v85.333334h85.333333v-85.333334z m170.666666-341.333333v85.333333h85.333334V128z m170.666667 0v85.333333h85.333333V128z m170.666667 0v85.333333h85.333333V128z m0 170.666667v85.333333h85.333333v-85.333333zM469.333333 640v85.333333h85.333334v-85.333333z m0-341.333333v85.333333h85.333334v-85.333333zM128 128v768h85.333333V128z m170.666667 0v85.333333h85.333333V128z m170.666666 682.666667v85.333333h85.333334v-85.333333z m170.666667 0v85.333333h85.333333v-85.333333z m170.666667 0v85.333333h85.333333v-85.333333z m-512 0v85.333333h85.333333v-85.333333z"></path>
      </svg>
    </IconWrapper>
  );
};

export default Icon;