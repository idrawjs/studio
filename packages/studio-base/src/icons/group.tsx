import React from 'react';
import { IconWrapper } from './util';
import type { IconWrapperProps } from './util';

const Icon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
        <path d="M0.00592 521.157814v-103.646801l430.267025 235.101281c36.191582 13.567843 70.207188 15.615819 111.870706 0.191998l440.986902-258.365013v103.614802l-435.386966 258.877007c-42.175512 18.303788-91.326944 18.303788-126.398539 0L0.00592 521.157814z"></path>
        <path d="M0.00592 743.651242v-104.798789l406.427301 221.43744c17.2798 9.439891 40.511532 17.599797 65.119247 20.383764h27.999676c32.511624-5.023942 47.103455-10.207882 67.615218-22.943735l415.931191-258.173014v98.974855l-430.875018 268.95689c-42.111513 17.439798-95.806892 18.079791-130.878487 0.575994L0.00592 743.619242zM20.069688 246.024995L399.073306 20.971598c41.279523-26.303696 90.430954-27.967677 133.342458-4.35195l421.083131 198.621703c35.743587 17.599797 37.18357 61.311291 2.655969 81.151062l-414.043212 226.205384a165.758083 165.758083 0 0 1-133.374458 4.415949L22.725657 327.208057C9.157814 318.664155 0.90191 303.56033 0.229917 285.000545c-0.607993-18.911781 10.719876-32.159628 19.807771-38.94355z"></path>{' '}
      </svg>
    </IconWrapper>
  );
};

export default Icon;