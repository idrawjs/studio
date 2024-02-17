import React from 'react';
import { IconWrapper } from './util';
import type { IconWrapperProps } from './util';

const Icon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
        <path d="M424.666 448.666H24c-13.254 0-24-10.746-24-24V24C0 10.746 10.746 0 24 0h96c13.254 0 24 10.746 24 24v156.224C235.546 78.558 368.52 14.94 516.35 16.014c273.812 1.988 492.896 223.246 492.314 497.064C1008.082 786.516 786.24 1008 512.666 1008c-128.178 0-244.992-48.626-333.02-128.43-10.198-9.244-10.668-25.108-0.934-34.84l67.934-67.934c8.948-8.948 23.324-9.434 32.802-1.05C341.52 830.672 423.16 864 512.666 864c194.536 0 352-157.432 352-352 0-194.534-157.432-352-352-352-116.992 0-220.56 56.952-284.548 144.666h196.548c13.254 0 24 10.746 24 24v96c0 13.254-10.746 24-24 24z"></path>
      </svg>
    </IconWrapper>
  );
};

export default Icon;
