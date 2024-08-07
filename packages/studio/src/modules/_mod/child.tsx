import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { generateClassName } from '@idraw/studio-base';

const modName = 'mod-xxxxxx';

export interface ChildProps {
  className?: string;
  style?: CSSProperties;
  parentModName: string;
}

export const Child = (props: ChildProps) => {
  const { className, style, parentModName } = props;
  const rootClassName = generateClassName(parentModName, modName);

  return useMemo(() => {
    return (
      <div style={style} className={classnames(rootClassName, className)}>
        Nothing
      </div>
    );
  }, [style, className]);
};
