import React, { useMemo, useContext } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../config-provider';

const modName = 'base-xxxxxx';

export interface ChildProps {
  className?: string;
  style?: CSSProperties;
}

export const Child = (props: ChildProps) => {
  const { className, style } = props;
  const { createPrefixName } = useContext(ConfigContext);
  const generateClassName = createPrefixName(modName);
  const rootClassName = generateClassName();

  return useMemo(() => {
    return (
      <div style={style} className={classnames(rootClassName, className)}>
        Nothing
      </div>
    );
  }, [style, className]);
};
