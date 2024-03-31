import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import type { Element } from 'idraw';
import { generateClassName } from '../../css';

const modName = 'base-element-detail-rect';

export interface DetailRectProps {
  className?: string;
  style?: CSSProperties;
  element?: Element | null;
  onChange?: (e: Partial<Element>) => void;
  disabled?: boolean;
}

export const DetailRect = (props: DetailRectProps) => {
  const { className, style } = props;
  const rootClassName = generateClassName(modName);

  return useMemo(() => {
    return (
      <div style={style} className={classnames(rootClassName, className)}>
        {/* TODO */}
      </div>
    );
  }, [style, className]);
};
