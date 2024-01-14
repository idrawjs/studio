import React, { useContext, useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../config-provider';

const modName = 'base-xxx';

export interface ModProps {
  className?: string;
  style?: CSSProperties;
}

export const Mod = (props: ModProps) => {
  const { className, style } = props;
  const { createPrefixName } = useContext(ConfigContext);
  const generateClassName = createPrefixName(modName);

  return useMemo(() => {
    return (
      <div style={style} className={classnames(generateClassName(), className)}>
        Mod
      </div>
    );
  }, []);
};
