import React, { useMemo, useContext } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import type { Element } from 'idraw';
import { ConfigContext } from '../config-provider';

const modName = 'base-element-detail-path';

export interface DetailPathProps {
  className?: string;
  style?: CSSProperties;
  element?: Element | null;
  onChange?: (e: Partial<Element>) => void;
  disabled?: boolean;
}

export const DetailPath = (props: DetailPathProps) => {
  const { className, style } = props;
  const { createPrefixName } = useContext(ConfigContext);
  const generateClassName = createPrefixName(modName);
  const rootClassName = generateClassName();

  return useMemo(() => {
    return (
      <div style={style} className={classnames(rootClassName, className)}>
        {/* TODO */}
      </div>
    );
  }, [style, className]);
};
