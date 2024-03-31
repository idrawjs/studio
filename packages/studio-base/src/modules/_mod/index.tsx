import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { generateClassName } from '../../css';

const modName = 'base-xxx';

export interface ModProps {
  className?: string;
  style?: CSSProperties;
}

export const Mod = (props: ModProps) => {
  const { className, style } = props;

  return useMemo(() => {
    return (
      <div style={style} className={classnames(generateClassName(modName), className)}>
        Mod
      </div>
    );
  }, []);
};
