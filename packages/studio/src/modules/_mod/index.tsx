import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { generateClassName } from '@idraw/studio-base';

const modName = 'mod-xxx';

export interface ModProps {
  className?: string;
  style?: CSSProperties;
}

export const Mod = (props: ModProps) => {
  const { className, style } = props;
  const rootClassName = generateClassName(modName);

  return useMemo(() => {
    return (
      <div style={style} className={classnames(rootClassName, className)}>
        Mod
      </div>
    );
  }, []);
};
