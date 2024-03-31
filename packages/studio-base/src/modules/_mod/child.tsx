import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { generateClassName } from '../../css';

const modName = 'base-xxxxxx';

export interface ChildProps {
  className?: string;
  style?: CSSProperties;
}

export const Child = (props: ChildProps) => {
  const { className, style } = props;
  const rootClassName = generateClassName(modName);

  return useMemo(() => {
    return (
      <div style={style} className={classnames(rootClassName, className)}>
        Nothing
      </div>
    );
  }, [style, className]);
};
