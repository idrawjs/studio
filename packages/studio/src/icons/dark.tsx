import React, { useMemo } from 'react';
import classnames from 'classnames';
import { useIconClassName } from './util';
import type { IconProps } from './util';

const Dark = (props: IconProps) => {
  const { className, style } = props;
  const { iconClassName } = useIconClassName();
  // https://github.com/facebook/react/issues/15156
  return useMemo(() => {
    return (
      <span className={classnames([iconClassName, className])} style={style}>
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
          <path d="M516.266667 938.666667h-38.4c-234.666667-21.333333-405.333333-230.4-384-465.066667 17.066667-204.8 179.2-366.933333 384-384 17.066667 0 34.133333 8.533333 42.666666 21.333333 8.533333 12.8 8.533333 34.133333-4.266666 46.933334-85.333333 115.2-59.733333 273.066667 55.466666 358.4 89.6 68.266667 213.333333 68.266667 302.933334 0 12.8-8.533333 29.866667-12.8 46.933333-4.266667 12.8 8.533333 21.333333 25.6 21.333333 42.666667-8.533333 115.2-64 217.6-153.6 290.133333-81.066667 59.733333-174.933333 93.866667-273.066666 93.866667zM396.8 187.733333c-123.733333 42.666667-213.333333 153.6-221.866667 290.133334-17.066667 187.733333 119.466667 354.133333 307.2 371.2 89.6 8.533333 179.2-17.066667 247.466667-76.8 46.933333-38.4 81.066667-89.6 102.4-145.066667-106.666667 38.4-226.133333 21.333333-320-46.933333-119.466667-93.866667-166.4-251.733333-115.2-392.533334z"></path>
        </svg>
      </span>
    );
  }, [iconClassName]);
};

export default Dark;
